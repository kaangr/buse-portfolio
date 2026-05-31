"use client";

import { SocialLinks } from "@/components/social/SocialLinks";
import { contact } from "@/data/projects";
import { copy } from "@/content/copy";

export function Footer() {

  return (
    <footer
      id="contact"
      className="bg-gallery-black text-gallery-offwhite relative px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-gallery-offwhite/50 mb-4 text-xs tracking-[0.3em] uppercase">
              {copy.footer.contact}
            </p>
            <h2 className="font-heading text-4xl md:text-5xl">
              {copy.footer.headline}
            </h2>
          </div>
          <div className="flex flex-col gap-8 md:items-end">
            <SocialLinks className="md:text-right" />
            <div className="flex flex-col gap-3 text-sm md:text-right">
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-gallery-offwhite/80 transition-colors"
              >
                {contact.email}
              </a>
              <a
                href="#work"
                className="hover:text-gallery-offwhite/80 transition-colors"
              >
                {copy.footer.viewProjects}
              </a>
              <span className="text-gallery-offwhite/45 text-xs tracking-[0.2em] uppercase">
                {contact.location}
              </span>
            </div>
          </div>
        </div>
        <div className="border-gallery-offwhite/15 text-gallery-offwhite/40 mt-16 flex flex-col gap-4 border-t pt-8 text-xs tracking-[0.18em] uppercase md:flex-row md:justify-between">
          <span>{copy.footer.copyright}</span>
          <span>{copy.footer.credit}</span>
        </div>
      </div>
    </footer>
  );
}
