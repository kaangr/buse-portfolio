"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789·—";

type TextShuffleProps = {
  text: string;
  className?: string;
  durationMs?: number;
  playOnMount?: boolean;
};

export function TextShuffle({
  text,
  className,
  durationMs = 480,
  playOnMount = false,
}: TextShuffleProps) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const runShuffle = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    startRef.current = null;

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(1, elapsed / durationMs);
      const resolvedCount = Math.floor(progress * text.length);

      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < resolvedCount) return char;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

      setDisplay(next);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [durationMs, text]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    if (playOnMount) runShuffle();
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [playOnMount, runShuffle]);

  return (
    <span
      className={cn("inline-block tabular-nums", className)}
      onMouseEnter={runShuffle}
      onFocus={runShuffle}
    >
      {display}
    </span>
  );
}
