"use client";

import { copy } from "@/content/copy";
import { useWindowScrollY } from "@/hooks/useWindowScrollY";
import { cn } from "@/lib/utils";

const linkKeys = [
  { href: "#work", key: "work" as const },
  { href: "#process", key: "process" as const },
  { href: "#about", key: "about" as const },
  { href: "#portfolio", key: "portfolio" as const },
  { href: "#contact", key: "contact" as const },
];

export function Navbar() {
  const scrollY = useWindowScrollY();
  const visible = scrollY > 80;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 px-6 py-5 transition-all duration-300 md:px-12",
        visible
          ? "pointer-events-auto border-gallery-black/8 border-b bg-gallery-offwhite/75 backdrop-blur-md"
          : "pointer-events-none border-transparent bg-transparent opacity-0",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between",
          !visible && "pointer-events-none",
        )}
        aria-label="Main"
      >
        <a
          href="#"
          className="font-heading text-gallery-black text-sm tracking-[0.28em] uppercase"
        >
          Buse
        </a>
        <ul className="flex items-center gap-8 md:gap-12">
          {linkKeys.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-gallery-black/70 hover:text-gallery-black text-xs tracking-[0.2em] uppercase transition-colors"
              >
                {copy.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
