"use client";

import { PdfViewer } from "@/components/ui/pdf-viewer";
import { TextShuffle } from "@/components/text/TextShuffle";
import { MagneticGlowButton } from "@/components/ui/MagneticGlowButton";
import type { MagneticGlowVariant } from "@/components/ui/magnetic-glow-presets";
import { CV_PDF } from "@/data/projects";
import { copy } from "@/content/copy";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";

type CvPreviewDialogProps = {
  trigger?: ReactNode;
  triggerLabel?: string;
  glowVariant?: MagneticGlowVariant;
  shuffleLabel?: boolean;
};

export function CvPreviewDialog({
  trigger,
  triggerLabel,
  glowVariant = "cv",
  shuffleLabel = false,
}: CvPreviewDialogProps) {
  const [open, setOpen] = useState(false);
  const label = triggerLabel ?? copy.hero.previewCv;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <MagneticGlowButton variant={glowVariant}>
            {shuffleLabel ? (
              <TextShuffle text={label} playOnMount />
            ) : (
              label
            )}
          </MagneticGlowButton>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-h-[92vh] w-[min(96vw,920px)] max-w-[920px] gap-0 overflow-hidden border-gallery-black/10 bg-gallery-offwhite p-0 sm:max-w-[920px]"
        showCloseButton
      >
        <DialogHeader className="border-gallery-black/10 border-b px-6 py-4">
          <DialogTitle className="font-heading text-gallery-black text-xl">
            {copy.cv.title}
          </DialogTitle>
          <DialogDescription className="text-gallery-black/60">
            {copy.cv.description}
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          {open ? (
            <PdfViewer
              url={CV_PDF}
              title="Buse Arıca · CV"
              downloadUrl={CV_PDF}
              downloadFilename="buse-arica-cv.pdf"
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
