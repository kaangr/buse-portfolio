"use client";

import { buildPortfolioMagazineProps } from "@/components/magazine/ThreeDMagazine";
import { ProjectPdfDialog } from "@/components/projects/ProjectPdfDialog";
import { PORTFOLIO_MAGAZINE_PDF } from "@/data/portfolio-magazine";
import { projects } from "@/data/projects";
import { copy } from "@/content/copy";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const MagazineCanvas = dynamic(
  () =>
    import("@/components/magazine/ThreeDMagazine").then((m) => ({
      default: m.ThreeDMagazine,
    })),
  {
    ssr: false,
    loading: () => <MagazineLoading />,
  },
);

function MagazineLoading() {
  return (
    <div className="bg-gallery-black/5 flex h-[min(72vh,720px)] w-full animate-pulse items-center justify-center text-xs tracking-[0.2em] uppercase text-gallery-black/40">
      {copy.portfolioMagazine.loading}
    </div>
  );
}

export function PortfolioMagazineSection() {
  const magazineProps = useMemo(() => buildPortfolioMagazineProps(), []);
  const portfolioProject = projects.find((p) => p.id === "portfolio-website");

  return (
    <section
      id="portfolio"
      className="border-gallery-black/8 relative border-t bg-gallery-offwhite px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-gallery-black/45 mb-3 text-xs tracking-[0.3em] uppercase">
              {copy.portfolioMagazine.eyebrow}
            </p>
            <h2 className="font-heading text-gallery-black text-4xl md:text-5xl">
              {copy.portfolioMagazine.title}
            </h2>
            <p className="text-gallery-black/55 mt-4 max-w-lg text-sm leading-relaxed">
              {copy.portfolioMagazine.subtitle}
            </p>
          </div>
          {portfolioProject?.pdf ? (
            <ProjectPdfDialog
              project={{
                ...portfolioProject,
                pdf: PORTFOLIO_MAGAZINE_PDF,
              }}
              triggerLabel={copy.portfolioMagazine.previewPdf}
              glowVariant="violet"
            />
          ) : null}
        </header>

        <div className="bg-gallery-black/[0.03] ring-gallery-black/10 h-[min(72vh,720px)] w-full overflow-hidden rounded-sm ring-1">
          <MagazineCanvas {...magazineProps} className="h-full w-full" />
        </div>

        <p className="text-gallery-black/40 mt-6 text-center text-[10px] tracking-[0.22em] uppercase md:text-left">
          {copy.portfolioMagazine.hint}
        </p>
      </div>
    </section>
  );
}
