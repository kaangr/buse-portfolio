export type MagneticGlowPreset = {
  glowColor: string;
  outerGlowColor: string;
  innerColor: string;
  textColor: string;
  enableGlass?: boolean;
  glassColor?: string;
};

export const magneticGlowPresets = {
  cv: {
    glowColor: "#00e8d4",
    outerGlowColor: "rgba(0, 232, 212, 0.35)",
    innerColor: "#0d1214",
    textColor: "#f0fffd",
    enableGlass: true,
    glassColor: "rgba(8, 20, 22, 0.55)",
  },
  coral: {
    glowColor: "#ff6b6b",
    outerGlowColor: "rgba(255, 107, 107, 0.32)",
    innerColor: "#1a1010",
    textColor: "#fff5f5",
    enableGlass: true,
    glassColor: "rgba(26, 12, 12, 0.5)",
  },
  amber: {
    glowColor: "#f5b942",
    outerGlowColor: "rgba(245, 185, 66, 0.3)",
    innerColor: "#141108",
    textColor: "#fffaf0",
    enableGlass: true,
    glassColor: "rgba(22, 16, 6, 0.52)",
  },
  violet: {
    glowColor: "#a78bfa",
    outerGlowColor: "rgba(167, 139, 250, 0.35)",
    innerColor: "#110f18",
    textColor: "#f5f3ff",
    enableGlass: true,
    glassColor: "rgba(16, 12, 28, 0.52)",
  },
  mint: {
    glowColor: "#34d399",
    outerGlowColor: "rgba(52, 211, 153, 0.3)",
    innerColor: "#0a1410",
    textColor: "#ecfdf5",
    enableGlass: true,
    glassColor: "rgba(8, 22, 16, 0.5)",
  },
} as const satisfies Record<string, MagneticGlowPreset>;

export type MagneticGlowVariant = keyof typeof magneticGlowPresets;

/** Map project ids to glow color variants */
export const projectGlowVariant: Record<string, MagneticGlowVariant> = {
  helia: "coral",
  tekel: "amber",
  "organic-market": "mint",
  "portfolio-website": "violet",
};
