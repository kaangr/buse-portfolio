"use client";

import { RenderLightbox } from "@/components/projects/RenderLightbox";
import { GalleryFrame } from "@/components/ui/GalleryFrame";
import { ProjectPdfDialog } from "@/components/projects/ProjectPdfDialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { Project } from "@/data/projects";
import { copy, getWorkItem } from "@/content/copy";
import { FileText } from "lucide-react";

type ProjectDetailSheetProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectDetailSheet({
  project,
  open,
  onOpenChange,
}: ProjectDetailSheetProps) {

  if (!project) return null;

  const item = getWorkItem(project.id);
  const title = item?.title ?? project.title;
  const location = item?.location ?? project.location;
  const description = item?.description ?? project.description;
  const detail = item?.detail ?? description;
  const highlights = item?.highlights ?? [];
  const category =
    copy.work.categories[project.category] ?? project.category;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-gallery-black/10 bg-gallery-offwhite p-0 sm:max-w-lg"
      >
        <SheetHeader className="border-gallery-black/10 space-y-1 border-b px-6 py-5 text-left">
          <p className="text-gallery-black/45 text-[10px] tracking-[0.28em] uppercase">
            {category} · {project.year}
          </p>
          <SheetTitle className="font-heading text-gallery-black text-3xl font-normal">
            {title}
          </SheetTitle>
          <SheetDescription className="text-gallery-black/55 text-sm">
            {location}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-6 py-6">
          <GalleryFrame aspectClassName="aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.cover}
              alt={title}
              className="size-full object-cover"
            />
          </GalleryFrame>

          <div>
            <p className="text-gallery-black/45 mb-2 text-xs tracking-[0.28em] uppercase">
              {copy.work.detailOverview}
            </p>
            <p className="text-gallery-black/70 text-sm leading-relaxed">
              {detail}
            </p>
          </div>

          {highlights.length > 0 ? (
            <div>
              <p className="text-gallery-black/45 mb-3 text-xs tracking-[0.28em] uppercase">
                {copy.work.detailHighlights}
              </p>
              <ul className="text-gallery-black/65 flex flex-col gap-2 text-sm leading-relaxed">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="border-gallery-black/10 border-l-2 pl-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.renders.length > 0 ? (
            <div>
              <p className="text-gallery-black/45 mb-1 text-xs tracking-[0.28em] uppercase">
                {copy.work.detailRenders}
              </p>
              <RenderLightbox images={project.renders} projectTitle={title} />
            </div>
          ) : null}

          {project.pdf ? (
            <ProjectPdfDialog
              project={project}
              trigger={
                <button
                  type="button"
                  className="border-gallery-black/20 text-gallery-black hover:bg-gallery-black/5 inline-flex w-full items-center justify-center gap-2 border py-3.5 text-xs tracking-[0.2em] uppercase transition-colors"
                >
                  <FileText className="size-3.5" />
                  {copy.work.previewPdf}
                </button>
              }
            />
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  );
}
