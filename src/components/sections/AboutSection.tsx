"use client";

import { CvPreviewDialog } from "@/components/CvPreviewDialog";
import { PROFILE_IMAGE, contact, softwareSkills } from "@/data/projects";
import { copy } from "@/content/copy";
import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-gallery-offwhite px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[240px_1fr] md:gap-20 lg:grid-cols-[280px_1fr]">
        <div className="flex flex-col items-center md:items-start">
          <div className="border-gallery-black/15 relative size-52 shrink-0 overflow-hidden rounded-full border-2 shadow-[0_8px_32px_rgba(26,26,26,0.08)] ring-4 ring-gallery-offwhite md:size-60">
            <Image
              src={PROFILE_IMAGE}
              alt="Buse Arıca"
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
          <p className="text-gallery-black/45 mt-5 text-center text-xs tracking-[0.2em] uppercase md:text-left">
            {contact.location}
          </p>
        </div>

        <div>
          <p className="text-gallery-black/45 mb-3 text-xs tracking-[0.3em] uppercase">
            {copy.about.eyebrow}
          </p>
          <h2 className="font-heading text-gallery-black text-4xl md:text-5xl">
            Buse Arıca
          </h2>
          <p className="text-gallery-black/65 mt-8 text-base leading-relaxed md:text-lg">
            {copy.about.bio}
          </p>

          <div className="mt-10">
            <p className="text-gallery-black/45 mb-4 text-xs tracking-[0.28em] uppercase">
              {copy.about.software}
            </p>
            <ul className="flex flex-wrap gap-2">
              {softwareSkills.map((skill) => (
                <li
                  key={skill}
                  className="border-gallery-black/15 text-gallery-black/80 border px-3 py-1.5 text-xs tracking-wide"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#work"
              className="bg-gallery-black text-gallery-offwhite inline-flex px-8 py-4 text-xs tracking-[0.22em] uppercase transition-opacity hover:opacity-90"
            >
              {copy.about.viewProjects}
            </a>
            <CvPreviewDialog
              triggerLabel={copy.about.previewCv}
              glowVariant="mint"
              shuffleLabel
            />
          </div>

          <a
            href={`mailto:${contact.email}`}
            className="text-gallery-black/70 hover:text-gallery-black mt-10 inline-block text-sm tracking-wide transition-colors"
          >
            {contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
