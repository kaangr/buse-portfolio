"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export type PdfViewerContentProps = {
  url: string;
  className?: string;
  title?: string;
  downloadUrl?: string;
  downloadFilename?: string;
};

const HORIZONTAL_PADDING = 48;

export function PdfViewerContent({
  url,
  className,
  title,
  downloadUrl,
  downloadFilename,
}: PdfViewerContentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<{ cancel: () => void } | null>(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pdfRef = useRef<import("pdfjs-dist").PDFDocumentProxy | null>(null);

  const getFitScale = useCallback(
    (pageWidth: number) => {
      const containerWidth = viewportRef.current?.clientWidth ?? 0;
      if (containerWidth <= 0) return 1;
      const available = containerWidth - HORIZONTAL_PADDING;
      return Math.min(Math.max(available / pageWidth, 0.25), 2.5);
    },
    [],
  );

  const renderPage = useCallback(
    async (pageNum: number) => {
      const pdf = pdfRef.current;
      const canvas = canvasRef.current;
      if (!pdf || !canvas) return;

      renderTaskRef.current?.cancel();

      const pdfPage = await pdf.getPage(pageNum);
      const base = pdfPage.getViewport({ scale: 1 });
      const scale = getFitScale(base.width);
      const viewport = pdfPage.getViewport({ scale });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${Math.floor(viewport.width)}px`;
      canvas.style.height = `${Math.floor(viewport.height)}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const task = pdfPage.render({
        canvasContext: ctx,
        viewport,
        canvas,
      });
      renderTaskRef.current = task;
      await task.promise;
    },
    [getFitScale],
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      renderTaskRef.current?.cancel();
      pdfRef.current = null;
      setNumPages(0);
      setPage(1);

      try {
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.min.mjs",
          import.meta.url,
        ).toString();

        const pdf = await pdfjs.getDocument(url).promise;
        if (cancelled) return;

        pdfRef.current = pdf;
        setNumPages(pdf.numPages);
        await renderPage(1);
        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError(
            "PDF could not be loaded. Check that the file exists in /public.",
          );
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      pdfRef.current = null;
    };
  }, [url, renderPage]);

  useEffect(() => {
    if (!loading && pdfRef.current) {
      renderPage(page).catch(() => {});
    }
  }, [page, loading, renderPage]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || loading) return;

    const observer = new ResizeObserver(() => {
      if (pdfRef.current) renderPage(page).catch(() => {});
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [page, loading, renderPage]);

  const fileHref = downloadUrl ?? url;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-gallery-black/60 text-xs tracking-[0.2em] uppercase">
          {title ?? "Document"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {fileHref ? (
            <Button variant="outline" size="sm" asChild>
              <a
                href={fileHref}
                download={downloadFilename}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="size-3.5" />
                {copy.pdf.download}
              </a>
            </Button>
          ) : null}
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </Button>
          <span className="text-gallery-black/70 min-w-16 text-center text-xs tabular-nums">
            {loading ? "—" : `${page} / ${numPages}`}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            disabled={page >= numPages || loading}
            onClick={() => setPage((p) => Math.min(numPages, p + 1))}
            aria-label="Next page"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <ScrollArea
        data-scroll-lock
        className="bg-gallery-black/5 h-[min(72vh,760px)] w-full rounded-md border border-gallery-black/10"
      >
        <div
          ref={viewportRef}
          className="relative flex min-h-80 items-center justify-center p-6"
        >
          {loading && (
            <div className="absolute inset-6 z-10 flex w-full max-w-md flex-col gap-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="aspect-[3/4] w-full max-w-sm" />
            </div>
          )}
          {error ? (
            <p className="text-gallery-black/55 max-w-sm p-8 text-center text-sm">
              {error}
            </p>
          ) : (
            <canvas
              ref={canvasRef}
              className={cn(
                "mx-auto block max-w-full shadow-sm",
                loading ? "opacity-0" : "opacity-100",
              )}
            />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
