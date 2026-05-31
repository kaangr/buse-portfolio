"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const HOVER_TRANSITION = {
  duration: 0.4,
  ease: [0.44, 0, 0.56, 1] as const,
};

const hoverBackground: Record<SocialVariant, string> = {
  instagram:
    "linear-gradient(135deg, rgb(255, 198, 77) 8%, rgb(247, 57, 145) 25%, rgb(167, 54, 208) 63%, rgb(127, 67, 225) 92%)",
  linkedin:
    "linear-gradient(89deg, rgb(0, 123, 184) 0%, rgb(0, 102, 208) 46%, rgb(0, 68, 233) 100%)",
  pinterest:
    "linear-gradient(146deg, rgb(241, 15, 62) 0%, rgb(251, 55, 61) 100%)",
};

export type SocialVariant = "instagram" | "linkedin" | "pinterest";

type SocialIconButtonProps = {
  href: string;
  label: string;
  variant: SocialVariant;
  icon: ReactNode;
  iconHover: ReactNode;
};

export function SocialIconButton({
  href,
  label,
  variant,
  icon,
  iconHover,
}: SocialIconButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl shadow-[0_1px_1px_-1.25px_rgba(0,0,0,0.18),0_2px_2px_-2.5px_rgba(0,0,0,0.16),0_10px_10px_-3.75px_rgba(0,0,0,0.06)] md:size-20"
      initial={false}
      whileHover={{
        background: hoverBackground[variant],
      }}
      transition={HOVER_TRANSITION}
    >
      <span className="relative size-[42%] transition-opacity duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:opacity-0 [&_svg]:size-full">
        {icon}
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.44,0,0.56,1)] group-hover:opacity-100">
        <span className="relative size-[42%] text-white [&_svg]:size-full">
          {iconHover}
        </span>
      </span>
    </motion.a>
  );
}
