"use client";

import { useEffect, useState } from "react";

const sections = ["about", "experience", "projects"] as const;

// Section links for the sticky left column; the active one grows a longer accent line.
export default function Nav() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.35;
      let current: string = sections[0];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      // At the very bottom the last section may never reach the midline.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) current = sections.at(-1)!;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="In-page" className="mt-16 hidden lg:block">
      <ul className="space-y-1">
        {sections.map((id) => {
          const on = active === id;
          return (
            <li key={id}>
              <a href={`#${id}`} className="group flex items-center py-3" aria-current={on ? "true" : undefined}>
                <span
                  className={`mr-4 h-px transition-all duration-300 ${
                    on ? "w-16 bg-accent" : "w-8 bg-faint group-hover:w-16 group-hover:bg-fg"
                  }`}
                />
                <span
                  className={`font-ui text-sm capitalize transition-colors ${
                    on ? "text-fg" : "text-faint group-hover:text-fg"
                  }`}
                >
                  {id}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
