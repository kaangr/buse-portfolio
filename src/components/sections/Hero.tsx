"use client";

import { CvPreviewDialog } from "@/components/CvPreviewDialog";
import { AmbiLightVideo } from "@/components/media/AmbiLightVideo";
import { ProTextType } from "@/components/text/ProTextType";
import { TextShuffle } from "@/components/text/TextShuffle";
import { copy } from "@/content/copy";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col justify-end px-6 pb-20 pt-28 md:min-h-screen md:px-12 md:pb-28 md:pt-32"
    >
      <div className="mx-auto w-full max-w-7xl text-center md:text-left">
        <p className="text-gallery-black/50 mb-6 text-xs tracking-[0.35em] uppercase">
          {copy.hero.tagline}
        </p>

        <h1 className="font-heading text-gallery-black mx-auto max-w-3xl text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.15] font-normal tracking-tight md:max-w-4xl">
          {copy.hero.headline}
        </h1>

        <div className="mx-auto mt-10 flex max-w-3xl justify-center md:mt-14">
          <AmbiLightVideo className="w-full" />
        </div>

        <ProTextType
          as="p"
          className="font-heading text-gallery-black/70 mx-auto mt-10 max-w-2xl text-center leading-snug md:mt-12 md:text-left"
          text={[...copy.hero.typing]}
          textColors={["#1a1a1a", "rgba(26,26,26,0.65)", "#1a1a1a"]}
          sizingMode="fluid"
          minFont={16}
          maxFont={28}
          fluidVw={2.8}
          typingSpeed={45}
          deletingSpeed={28}
          pauseDuration={2400}
          startOnVisible
          loop
          showCursor
          cursorCharacter="|"
          cursorColor="#1a1a1a"
        />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:justify-start">
          <a
            href="#work"
            className="bg-gallery-black text-gallery-offwhite inline-flex items-center px-8 py-3.5 text-xs tracking-[0.22em] uppercase transition-opacity hover:opacity-85"
          >
            <TextShuffle text={copy.hero.viewProjects} playOnMount />
          </a>
          <CvPreviewDialog
            triggerLabel={copy.hero.previewCv}
            glowVariant="cv"
            shuffleLabel
          />
        </div>
      </div>
    </section>
  );
}
