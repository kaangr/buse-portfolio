export type ProjectCategory =
  | "restaurant"
  | "industrial"
  | "exhibition"
  | "digital";

export type Project = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  year: string;
  cover: string;
  renders: string[];
  pdf?: string;
  description: string;
};

export const PROFILE_IMAGE = "/media/profile.png";

export const BIO =
  "I'm currently pursuing my Bachelor's degree in Interior Design at Beykent University. With a passion for creating harmonious and functional spaces, I combine innovative design principles with practical solutions. My expertise in various design software allows me to bring creative visions to life, while my attention to detail ensures each project meets the highest standards of aesthetic and functionality.";

export const softwareSkills = [
  "AutoCAD",
  "3DS Max",
  "SketchUp",
  "Rhino",
  "Photoshop",
] as const;

export const contact = {
  email: "bbusearcc@gmail.com",
  location: "Istanbul, TR",
} as const;

/** Update with real profile URLs */
export const socialLinks = {
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/in/",
  pinterest: "https://www.pinterest.com/",
} as const;

export const projects: Project[] = [
  {
    id: "helia",
    slug: "helia-restaurant",
    title: "Helia",
    location: "Greece · Restaurant",
    category: "restaurant",
    year: "2025",
    cover: "/projects/helia-restaurant/cover.svg",
    renders: [
      "/projects/helia-restaurant/renders/render-01.png",
      "/projects/helia-restaurant/renders/render-02.png",
    ],
    pdf: "/projects/helia-restaurant/docs/project.pdf",
    description:
      "Mediterranean dining atmosphere — warm stone, olive light, and intimate seating rhythm.",
  },
  {
    id: "tekel",
    slug: "tekel-tobacco",
    title: "Tekel Tobacco Warehouse",
    location: "Adaptive Reuse · Industrial",
    category: "industrial",
    year: "2024",
    cover: "/projects/tekel-tobacco/cover.svg",
    renders: ["/projects/tekel-tobacco/renders/render-01.png"],
    pdf: "/projects/tekel-tobacco/docs/project.pdf",
    description:
      "Heritage warehouse conversion balancing raw structure, circulation, and exhibition zones.",
  },
  {
    id: "organic-market",
    slug: "organic-market",
    title: "Organic Market",
    location: "Exhibition Stand",
    category: "exhibition",
    year: "2024",
    cover: "/projects/organic-market/cover.svg",
    renders: [
      "/projects/organic-market/renders/render-01.png",
      "/projects/organic-market/renders/render-2.png",
    ],
    pdf: "/projects/organic-market/docs/project.pdf",
    description:
      "Modular stand system for organic produce — tactile materials and clear visitor flow.",
  },
  {
    id: "portfolio-website",
    slug: "portfolio-website",
    title: "Portfolio Website",
    location: "UI · UX",
    category: "digital",
    year: "2025",
    cover: "/projects/portfolio-website/cover.svg",
    renders: ["/projects/portfolio-website/renders/render-01.png"],
    pdf: "/projects/portfolio-website/docs/case-study.pdf",
    description:
      "Editorial portfolio experience — scroll choreography, project PDFs, and gallery presentation.",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  restaurant: "Restaurant",
  industrial: "Industrial",
  exhibition: "Exhibition",
  digital: "Digital",
};

export const processSteps = [
  {
    step: "01",
    title: "Concept",
    description:
      "Spatial narrative, material mood boards, and client brief synthesis.",
  },
  {
    step: "02",
    title: "Sketch",
    description:
      "Hand-drawn plans, sectional studies, and proportional refinement.",
  },
  {
    step: "03",
    title: "3D Render",
    description:
      "Photoreal visualization, lighting calibration, and presentation assets.",
  },
] as const;

export const CV_PDF = "/cv.pdf";
