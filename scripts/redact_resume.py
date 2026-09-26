"""Strip phone numbers from the PDF dropped in resume/ (any name; newest wins) and write public/Sohum-Goel-Resume.pdf.

Redaction removes the underlying text (not a cosmetic box), drops tel: links and
document metadata, then re-reads the output and fails if any phone number survives.
The contact line that held the number is redrawn centered without it
("email | phone | linkedin" -> "email | linkedin"), keeping font, colors, underlines, and links.
"""

import re
import sys
from pathlib import Path

import fitz  # PyMuPDF

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "resume"
OUT = ROOT / "public" / "Sohum-Goel-Resume.pdf"
TIMES = Path("/System/Library/Fonts/Supplemental/Times New Roman.ttf")

# Optional +1 / 1 country code, then 3-3-4 digits with optional (), space, dot or dash separators.
PHONE = re.compile(r"(?:\+?1[\s.-]*)?\(?\d{3}\)?[\s.-]*\d{3}[\s.-]*\d{4}")


def phones_in(page: fitz.Page) -> list[str]:
    return [m.group() for m in PHONE.finditer(page.get_text())]


def rgb(color: int) -> tuple[float, float, float]:
    return ((color >> 16) & 255) / 255, ((color >> 8) & 255) / 255, (color & 255) / 255


def plan_contact_line(page: fitz.Page) -> dict | None:
    """Find the "|"-separated line holding a phone number; return what to redraw without it."""
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            spans = line["spans"]
            text = "".join(s["text"] for s in spans)
            if "|" not in text or not PHONE.search(text):
                continue

            # Split on "|" while remembering each piece's color and size.
            parts, chars = [], []
            for s in spans + [{"text": "|", "color": 0, "size": 0}]:
                for ch in s["text"]:
                    if ch == "|":
                        piece = "".join(c for c, _, _ in chars).strip()
                        if piece and not PHONE.search(piece):
                            first = next(x for x in chars if not x[0].isspace())
                            size = max(x[2] for x in chars)
                            parts.append({"text": piece, "color": first[1], "size": size})
                        chars = []
                    else:
                        chars.append((ch, s["color"], s["size"]))

            bbox = fitz.Rect(line["bbox"])
            links = [lk for lk in page.get_links() if fitz.Rect(lk["from"]).intersects(bbox)]
            for part in parts:
                for lk in links:
                    uri = lk.get("uri") or ""
                    target = uri.removeprefix("mailto:").rstrip("/")
                    if target and (target in part["text"] or part["text"].rstrip("/") in uri):
                        part["uri"] = uri
            return {
                "bbox": bbox,
                "links": links,
                "parts": parts,
                "baseline": spans[0]["origin"][1],
                "size": max(p["size"] for p in parts) if parts else spans[0]["size"],
            }
    return None


def draw_contact_line(page: fitz.Page, plan: dict) -> None:
    if TIMES.exists():
        font, fontname = fitz.Font(fontfile=str(TIMES)), "TNR"
        page.insert_font(fontname=fontname, fontfile=str(TIMES))
    else:
        font, fontname = fitz.Font("tiro"), "tiro"

    size, y, sep = plan["size"], plan["baseline"], " | "
    pieces = []
    for i, part in enumerate(plan["parts"]):
        if i:
            pieces.append({"text": sep, "color": 0})
        pieces.append(part)
    total = sum(font.text_length(p["text"], fontsize=size) for p in pieces)
    x = (page.rect.width - total) / 2

    for p in pieces:
        width = font.text_length(p["text"], fontsize=size)
        page.insert_text((x, y), p["text"], fontname=fontname, fontsize=size, color=rgb(p["color"]))
        if p.get("uri"):
            page.draw_line((x, y + 1.3), (x + width, y + 1.3), color=rgb(p["color"]), width=0.45)
            page.insert_link({"kind": fitz.LINK_URI, "from": fitz.Rect(x, y - size, x + width, y + 2), "uri": p["uri"]})
        x += width


def main() -> int:
    pdfs = sorted(INBOX.glob("*.pdf"), key=lambda f: f.stat().st_mtime)
    if not pdfs:
        print("No PDF in resume/. Export the resume to PDF and drop it there.")
        return 1
    src = pdfs[-1]
    print(f"Using {src.name}")

    doc = fitz.open(src)
    found = 0
    for page in doc:
        plan = plan_contact_line(page)
        if plan:
            # Wipe the whole line (plus its underlines) so it can be redrawn centered.
            page.add_redact_annot(plan["bbox"] + (-3, -1, 3, 2), fill=(1, 1, 1))
            for lk in plan["links"]:
                page.delete_link(lk)
        for number in phones_in(page):
            rects = page.search_for(number)
            if not rects:
                print(f"Page {page.number + 1}: found a number in the text but could not locate it on the page.")
                return 1
            for rect in rects:
                page.add_redact_annot(rect, fill=(1, 1, 1))
            found += 1
        for link in page.get_links():
            if link.get("uri", "").lower().startswith("tel:"):
                page.delete_link(link)
        page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE, graphics=fitz.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
        if plan:
            draw_contact_line(page, plan)

    # Zero hits usually means the number is in a format the pattern misses, not that it's absent.
    if found == 0 and "--no-phone-ok" not in sys.argv:
        print("No phone number found. If the resume really has none, rerun with --no-phone-ok.")
        return 1

    doc.set_metadata({})
    doc.del_xml_metadata()
    OUT.parent.mkdir(exist_ok=True)
    doc.save(OUT, garbage=4, deflate=True, clean=True)
    doc.close()

    # Verify from the saved file, not the in-memory copy.
    check = fitz.open(OUT)
    leftovers = [n for page in check for n in phones_in(page)]
    tel_links = [l for page in check for l in page.get_links() if l.get("uri", "").lower().startswith("tel:")]
    check.close()
    if leftovers or tel_links:
        OUT.unlink()
        print("Phone number still present after redaction. Deleted the output; nothing was published.")
        return 1

    print(f"Redacted {found} phone number(s) -> {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
