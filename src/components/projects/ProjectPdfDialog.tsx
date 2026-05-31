"use client";

import { PdfViewer } from "@/components/ui/pdf-viewer";
import { MagneticGlowButton } from "@/components/ui/MagneticGlowButton";
import {
  projectGlowVariant,
  type MagneticGlowVariant,
} from "@/components/ui/magnetic-glow-presets";
import { PORTFOLIO_MAGAZINE_PDF } from "@/data/portfolio-magazine";
import type { Project } from "@/data/projects";
import { copy, getWorkItem } from "@/content/copy";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { useState, type ReactNode } from "react";

type ProjectPdfDialogProps = {
  project: Project;
  trigger?: ReactNode;
  triggerLabel?: string;
  glowVariant?: MagneticGlowVariant;
};

export function ProjectPdfDialog({
  project,
  trigger,
  triggerLabel,
  glowVariant,
}: ProjectPdfDialogProps) {
  const [open, setOpen] = useState(false);
  const label = triggerLabel ?? copy.work.previewPdf;
  const variant = glowVariant ?? projectGlowVariant[project.id] ?? "violet";
  const item = getWorkItem(project.id);
  const title =
    project.pdf === PORTFOLIO_MAGAZINE_PDF
      ? copy.portfolioMagazine.pdfTitle
      : (item?.title ?? project.title);
  const location = item?.location ?? project.location;

  if (!project.pdf) return null;

  const filename = `${project.slug}.pdf`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <MagneticGlowButton
            variant={variant}
            className="mt-6"
            paddingX={22}
            paddingY={12}
          >
            <span className="inline-flex items-center gap-2">
              <FileText className="size-3.5 shrink-0 opacity-90" />
              {label}
            </span>
          </MagneticGlowButton>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-h-[92vh] w-[min(96vw,920px)] max-w-[920px] gap-0 overflow-hidden border-gallery-black/10 bg-gallery-offwhite p-0 sm:max-w-[920px]"
        showCloseButton
      >
        <DialogHeader className="border-gallery-black/10 border-b px-6 py-4">
          <DialogTitle className="font-heading text-gallery-black text-xl">
            {title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-gallery-black/60">
            <FileText className="size-3.5 shrink-0" />
            <span>
              {location} · {project.year}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          {open ? (
            <PdfViewer
              url={project.pdf}
              title={title}
              downloadUrl={project.pdf}
              downloadFilename={filename}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
