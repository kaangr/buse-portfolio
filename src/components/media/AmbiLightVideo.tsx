"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type AmbiLightVideoProps = {
  src?: string;
  poster?: string;
  className?: string;
};

export function AmbiLightVideo({
  src = "/media/hero-ambient.mp4",
  poster,
  className,
}: AmbiLightVideoProps) {
  const mainRef = useRef<HTMLVideoElement>(null);
  const glowRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const main = mainRef.current;
    const glow = glowRef.current;
    if (!main || !glow || !hasVideo) return;

    const sync = () => {
      if (Math.abs(glow.currentTime - main.currentTime) > 0.2) {
        glow.currentTime = main.currentTime;
      }
    };

    const onPlay = () => {
      setPlaying(true);
      glow.play().catch(() => {});
    };
    const onPause = () => {
      setPlaying(false);
      glow.pause();
    };

    main.addEventListener("timeupdate", sync);
    main.addEventListener("play", onPlay);
    main.addEventListener("pause", onPause);
    if (!main.paused) onPlay();

    return () => {
      main.removeEventListener("timeupdate", sync);
      main.removeEventListener("play", onPlay);
      main.removeEventListener("pause", onPause);
    };
  }, [hasVideo]);

  if (!hasVideo) {
    return (
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden rounded-sm",
          className,
        )}
        aria-hidden
      >
        <div
          className="absolute inset-[-30%] animate-pulse opacity-80 blur-[80px]"
          style={{
            background:
              "conic-gradient(from 120deg, #c4a574, #8a9a8a, #d4cfc4, #c4a574)",
          }}
        />
      </div>
    );
  }

  const glowOpacity = playing ? 1 : 0.55;

  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-visible",
        className,
      )}
    >
      {/* Layered glow for stronger AmbiLight color bleed */}
      <video
        ref={glowRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.2] object-cover transition-opacity duration-500"
        style={{
          filter: "blur(72px) saturate(2.2) brightness(1.65) contrast(1.15)",
          opacity: glowOpacity,
        }}
        onError={() => setHasVideo(false)}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(196,165,116,0.35), transparent 70%)",
          opacity: glowOpacity,
          mixBlendMode: "multiply",
        }}
      />
      <div className="relative z-10 overflow-hidden rounded-sm shadow-xl ring-1 ring-gallery-black/10">
        <video
          ref={mainRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="block h-full w-full object-cover"
          onLoadedData={() => setPlaying(true)}
          onError={() => setHasVideo(false)}
        />
      </div>
    </div>
  );
}
