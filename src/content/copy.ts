export const copy = {
  nav: {
    work: "Work",
    process: "Process",
    about: "About",
    portfolio: "Portfolio",
    contact: "Contact",
  },
  hero: {
    tagline: "Buse Arıca · Interior Design",
    headline:
      "I design interiors where people feel calm, capable, and truly at home.",
    typing: [
      "Harmonious spaces through material and light.",
      "Interior design rooted in proportion and detail.",
      "Crafting emotion in every spatial narrative.",
    ] as const,
    viewProjects: "View My Projects",
    previewCv: "Preview CV",
  },
  work: {
    eyebrow: "Selected Work",
    title: "Projects",
    subtitle: "Four interior and digital studies — tap an image for the full story.",
    previewPdf: "Preview PDF",
    clickImage: "Tap image for project details",
    clickRenderEnlarge: "Tap a render to enlarge",
    enlargeRender: "Enlarge render",
    closeLightbox: "Close",
    prevRender: "Previous render",
    nextRender: "Next render",
    detailOverview: "About this project",
    detailHighlights: "Focus areas",
    detailRenders: "Renders",
    categories: {
      restaurant: "Restaurant",
      industrial: "Industrial",
      exhibition: "Exhibition",
      digital: "Digital",
    },
    items: {
      helia: {
        title: "Helia",
        location: "Greece · Restaurant",
        description:
          "Mediterranean dining atmosphere — warm stone, olive light, and intimate seating rhythm.",
        detail:
          "Helia explores how hospitality can feel both festive and intimate. The layout guides guests through layered seating zones while stone, plaster, and olive-toned light keep the space grounded in its Mediterranean context.",
        highlights: [
          "Warm material palette with stone and plaster textures",
          "Layered seating for varied group sizes",
          "Lighting design tuned for evening atmosphere",
        ],
      },
      tekel: {
        title: "Tekel Tobacco Warehouse",
        location: "Adaptive Reuse · Industrial",
        description:
          "Heritage warehouse conversion balancing raw structure, circulation, and exhibition zones.",
        detail:
          "This adaptive reuse study preserves the warehouse's industrial character while inserting clear circulation, exhibition pockets, and moments of pause. The goal is to honour memory without freezing the building in time.",
        highlights: [
          "Exposed structure as the primary spatial gesture",
          "Flexible exhibition and gathering zones",
          "Circulation that reveals the building's scale",
        ],
      },
      "organic-market": {
        title: "Organic Market",
        location: "Exhibition Stand",
        description:
          "Modular stand system for organic produce — tactile materials and clear visitor flow.",
        detail:
          "A compact exhibition stand designed for clarity and touch. Modular display units, natural finishes, and a straightforward path help visitors understand the brand within seconds of arrival.",
        highlights: [
          "Modular units for quick assembly",
          "Natural, tactile material language",
          "Visitor flow optimized for trade fairs",
        ],
      },
      "portfolio-website": {
        title: "Portfolio Website",
        location: "UI · UX",
        description:
          "Editorial portfolio experience — scroll choreography, project PDFs, and gallery presentation.",
        detail:
          "An editorial portfolio built to feel like a gallery visit: restrained typography, project PDFs on demand, and a 3D magazine section that invites exploration without overwhelming the work.",
        highlights: [
          "Gallery-inspired layout and typography",
          "On-demand PDF presentations per project",
          "Interactive 3D magazine showcase",
        ],
      },
    },
  },
  process: {
    eyebrow: "Method",
    title: "From concept sketches to calibrated renders.",
    steps: [
      {
        title: "Concept",
        description:
          "Spatial narrative, material mood boards, and client brief synthesis.",
      },
      {
        title: "Sketch",
        description:
          "Hand-drawn plans, sectional studies, and proportional refinement.",
      },
      {
        title: "3D Render",
        description:
          "Photoreal visualization, lighting calibration, and presentation assets.",
      },
    ],
  },
  about: {
    eyebrow: "Profile",
    software: "Software",
    viewProjects: "View My Projects",
    previewCv: "Preview CV",
    bio: "I'm currently pursuing my Bachelor's degree in Interior Design at Beykent University. With a passion for creating harmonious and functional spaces, I combine innovative design principles with practical solutions. My expertise in various design software allows me to bring creative visions to life, while my attention to detail ensures each project meets the highest standards of aesthetic and functionality.",
  },
  portfolioMagazine: {
    eyebrow: "Portfolio",
    title: "3D Magazine",
    subtitle:
      "Click pages to turn. Full PDF presentation will replace placeholder spreads — add exports under public/portfolio/magazine/",
    previewPdf: "Preview PDF",
    loading: "Loading magazine…",
    hint: "Drag to orbit · Click edge to flip",
    pdfTitle: "Portfolio · Full PDF",
  },
  footer: {
    contact: "Contact",
    headline: "Let's shape space together.",
    viewProjects: "View My Projects",
    social: "Social",
    copyright: "© 2026 Buse Arıca — Interior Design",
    credit: "Beykent University · Portfolio",
  },
  cv: {
    title: "Curriculum Vitae",
    description: "Buse Arıca — Curriculum Vitae",
  },
  pdf: {
    download: "Download",
  },
} as const;

export type WorkItemId = keyof typeof copy.work.items;

export function getWorkItem(id: string) {
  if (id in copy.work.items) {
    return copy.work.items[id as WorkItemId];
  }
  return undefined;
}
