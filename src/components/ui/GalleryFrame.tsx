"use client";

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type GalleryFrameProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  aspectClassName?: string;
  label?: string;
} & ComponentPropsWithoutRef<"div">;

/**
 * Museum-style mat and frame for project SVGs and cover images.
 */
export function GalleryFrame({
  children,
  className,
  innerClassName,
  aspectClassName = "aspect-[16/10]",
  label,
  ...props
}: GalleryFrameProps) {
  return (
    <div
      className={cn(
        "bg-[#f3f2ee] p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.85)_inset,0_14px_36px_rgba(26,26,26,0.07)] ring-1 ring-gallery-black/12 md:p-3.5",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-white ring-1 ring-gallery-black/10",
          aspectClassName,
          innerClassName,
        )}
      >
        {children}
        {label ? (
          <span className="text-gallery-black/40 absolute bottom-2 left-2 text-[9px] tracking-[0.22em] uppercase">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}
