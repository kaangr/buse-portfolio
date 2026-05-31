"use client";

import { ProjectDetailSheet } from "@/components/projects/ProjectDetailSheet";
import { ProjectPdfDialog } from "@/components/projects/ProjectPdfDialog";
import { GalleryFrame } from "@/components/ui/GalleryFrame";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { copy, getWorkItem } from "@/content/copy";
import { useState } from "react";

export function ProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  function openProject(project: Project) {
    setSelectedProject(project);
    setSheetOpen(true);
  }

  return (
    <section
      id="work"
      className="relative bg-gallery-offwhite px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <header className="mb-16 md:mb-20">
          <p className="text-gallery-black/45 mb-3 text-xs tracking-[0.3em] uppercase">
            {copy.work.eyebrow}
          </p>
          <h2 className="font-heading text-gallery-black text-4xl md:text-5xl">
            {copy.work.title}
          </h2>
          <p className="text-gallery-black/55 mt-4 text-sm leading-relaxed">
            {copy.work.subtitle}
          </p>
        </header>

        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, index) => {
            const item = getWorkItem(project.id);
            const title = item?.title ?? project.title;
            const location = item?.location ?? project.location;
            const description = item?.description ?? project.description;
            const category =
              copy.work.categories[project.category] ?? project.category;

            return (
              <article
                key={project.id}
                className="border-gallery-black/10 border-t pt-12 first:border-t-0 first:pt-0"
              >
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <span className="text-gallery-black/45 text-[10px] tracking-[0.25em] uppercase">
                      {category} · {project.year}
                    </span>
                    <h3 className="font-heading text-gallery-black mt-2 text-3xl md:text-4xl">
                      {title}
                    </h3>
                    <p className="text-gallery-black/50 mt-1 text-sm">
                      {location}
                    </p>
                  </div>
                  <span className="font-heading text-gallery-black/15 text-5xl">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="group mb-2 block w-full text-left transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gallery-black/40"
                  aria-label={`${copy.work.clickImage}: ${title}`}
                >
                  <GalleryFrame className="transition-shadow duration-300 group-hover:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_20px_48px_rgba(26,26,26,0.12)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.cover}
                      alt={title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </GalleryFrame>
                </button>
                <p className="text-gallery-black/40 mb-6 text-[10px] tracking-[0.2em] uppercase">
                  {copy.work.clickImage}
                </p>

                <p className="text-gallery-black/60 text-sm leading-relaxed">
                  {description}
                </p>

                {project.pdf ? (
                  <ProjectPdfDialog project={project} />
                ) : null}
              </article>
            );
          })}
        </div>
      </div>

      <ProjectDetailSheet
        project={selectedProject}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </section>
  );
}
