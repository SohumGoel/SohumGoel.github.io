"use client";

// Shows "user [at] domain [dot] tld" and only assembles the real address on click,
// so the full address and a mailto: link never appear in the page's HTML.
export default function Email({ user, domain, className }: { user: string; domain: string; className?: string }) {
  const shown = `${user} [at] ${domain.split(".").join(" [dot] ")}`;
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${user}@${domain}`;
      }}
      className={className}
    >
      {shown}
    </a>
  );
}
