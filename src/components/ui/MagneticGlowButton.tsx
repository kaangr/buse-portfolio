"use client";

import {
  magneticGlowPresets,
  type MagneticGlowPreset,
  type MagneticGlowVariant,
} from "@/components/ui/magnetic-glow-presets";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  forwardRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

export type MagneticGlowButtonProps = {
  text?: string;
  children?: ReactNode;
  variant?: MagneticGlowVariant;
  preset?: Partial<MagneticGlowPreset>;
  animationStyle?: "spotlight" | "spin";
  spotlightSize?: number;
  spinSpeed?: number;
  borderWidth?: number;
  radius?: number;
  paddingX?: number;
  paddingY?: number;
  showOuterGlow?: boolean;
  glowOffsetY?: number;
  glowBlur?: number;
  className?: string;
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  disabled?: boolean;
  "aria-label"?: string;
};

/**
 * Ported from Framer MagneticGlowButton
 * https://framer.com/m/MagneticGlowButton-XJy4BG.js@4HnMRMzeRVj0WxxZPbPy
 */
export const MagneticGlowButton = forwardRef<
  HTMLButtonElement,
  MagneticGlowButtonProps
>(function MagneticGlowButton(
  {
    text,
    children,
    variant = "cv",
    preset: presetOverride,
    animationStyle = "spotlight",
    spotlightSize = 150,
    spinSpeed = 3,
    borderWidth = 1.5,
    radius = 100,
    paddingX = 28,
    paddingY = 14,
    showOuterGlow = true,
    glowOffsetY = 12,
    glowBlur = 32,
    className,
    onClick,
    disabled,
    "aria-label": ariaLabel,
  },
  ref,
) {
  const base = magneticGlowPresets[variant];
  const colors = { ...base, ...presetOverride };
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spotlightBackground = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${colors.glowColor}, transparent 100%)`;

  function handlePointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const innerRadius = Math.max(0, radius - borderWidth);

  return (
    <motion.button
      ref={ref}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn("relative max-w-full cursor-pointer border-0 bg-transparent p-0", className)}
      style={{
        padding: borderWidth,
        borderRadius: radius,
        overflow: "hidden",
        boxShadow: showOuterGlow
          ? `0px ${glowOffsetY}px ${glowBlur}px 0px ${colors.outerGlowColor}`
          : "none",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {animationStyle === "spin" ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: spinSpeed, ease: "linear" }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[2000px] w-[2000px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, ${colors.glowColor} 20%, transparent 50%)`,
          }}
          aria-hidden
        />
      ) : null}

      {animationStyle === "spotlight" ? (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: spotlightBackground }}
          aria-hidden
        />
      ) : null}

      <span
        className="relative z-[1] flex items-center justify-center text-xs tracking-[0.2em] uppercase"
        style={{
          background: colors.enableGlass ? colors.glassColor : colors.innerColor,
          backdropFilter: colors.enableGlass ? "blur(20px)" : undefined,
          WebkitBackdropFilter: colors.enableGlass ? "blur(20px)" : undefined,
          borderRadius: innerRadius,
          padding: `${paddingY}px ${paddingX}px`,
          color: colors.textColor,
          whiteSpace: "nowrap",
        }}
      >
        {children ?? text}
      </span>
    </motion.button>
  );
});
