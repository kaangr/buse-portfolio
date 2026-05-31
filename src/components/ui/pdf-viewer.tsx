"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import type { PdfViewerContentProps } from "@/components/ui/pdf-viewer-content";

const PdfViewerLazy = dynamic(
  () =>
    import("@/components/ui/pdf-viewer-content").then(
      (m) => m.PdfViewerContent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[min(72vh,760px)] w-full" />
      </div>
    ),
  },
);

export type PdfViewerProps = PdfViewerContentProps;

export function PdfViewer(props: PdfViewerProps) {
  return <PdfViewerLazy {...props} />;
}
