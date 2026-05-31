"use client";

import { GalleryFrame } from "@/components/ui/GalleryFrame";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog as DialogPrimitive } from "radix-ui";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type RenderLightboxProps = {
  images: string[];
  projectTitle: string;
  className?: string;
};

export function RenderLightbox({
  images,
  projectTitle,
  className,
}: RenderLightboxProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const current = images[index];

  const goPrev = useCallback(() => {
    setIndex((i) => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  if (images.length === 0) return null;

  function openAt(i: number) {
    setIndex(i);
    setOpen(true);
  }

  return (
    <>
      <p className="text-gallery-black/40 mb-3 text-[10px] tracking-[0.2em] uppercase">
        {copy.work.clickRenderEnlarge}
      </p>
      <div
        className={cn(
          "grid gap-4",
          images.length > 1 ? "sm:grid-cols-2" : "grid-cols-1",
          className,
        )}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => openAt(i)}
            className="group block w-full text-left transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gallery-black/40"
            aria-label={`${copy.work.enlargeRender} ${i + 1}`}
          >
            <GalleryFrame
              aspectClassName="aspect-[4/3]"
              label={String(i + 1).padStart(2, "0")}
              className="transition-shadow duration-300 group-hover:shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_20px_48px_rgba(26,26,26,0.12)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${projectTitle} — ${copy.work.detailRenders} ${i + 1}`}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </GalleryFrame>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay className="bg-gallery-black/80 backdrop-blur-sm" />
          <DialogPrimitive.Content
            className="fixed top-1/2 left-1/2 z-50 flex max-h-[96vh] w-[min(96vw,1200px)] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 overflow-hidden rounded-xl border border-gallery-black/10 bg-gallery-offwhite text-sm shadow-2xl outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
          <div className="border-gallery-black/10 flex items-center justify-between gap-4 border-b px-4 py-3 md:px-5">
            <div className="min-w-0">
              <DialogTitle className="font-heading text-gallery-black truncate text-lg font-normal">
                {projectTitle}
              </DialogTitle>
              <DialogDescription className="text-gallery-black/50 text-xs tracking-[0.18em] uppercase">
                {copy.work.detailRenders} · {index + 1} / {images.length}
              </DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-gallery-black/60 hover:text-gallery-black shrink-0 p-2 transition-colors"
              aria-label={copy.work.closeLightbox}
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#ebeae6] p-4 md:p-8">
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="bg-gallery-offwhite/90 text-gallery-black hover:bg-gallery-offwhite absolute left-2 z-10 rounded-full p-2 shadow-md transition-colors md:left-4"
                  aria-label={copy.work.prevRender}
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-gallery-offwhite/90 text-gallery-black hover:bg-gallery-offwhite absolute right-2 z-10 rounded-full p-2 shadow-md transition-colors md:right-4"
                  aria-label={copy.work.nextRender}
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}

            {current ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={current}
                alt={`${projectTitle} — ${copy.work.detailRenders} ${index + 1}`}
                className="max-h-[min(72vh,820px)] w-auto max-w-full object-contain"
              />
            ) : null}
          </div>
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>
    </>
  );
}
