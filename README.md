# sohumgoel.github.io

Personal site. Next.js + Tailwind, static export, deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

- **Edit text:** `content/site.ts` (all copy lives there).
- **Preview:** `npm install`, then `npm run dev` → http://localhost:3000
- **Update the resume:** export the Word doc to PDF, drop it in `resume/` under any name (newest wins), then run `npm run update-resume`.
  It strips the phone number (real removal, plus tel: links and metadata), refuses to publish if any number survives,
  writes `public/Sohum-Goel-Resume.pdf`, commits it, and pushes. `resume/` is gitignored, so the unredacted PDF never leaves this machine.
