/**
 * 3D magazine assets — replace page images when portfolio PDF pages are exported.
 * PDF target: public/projects/portfolio-website/docs/case-study.pdf
 */
export const PORTFOLIO_MAGAZINE_PDF =
  "/projects/portfolio-website/docs/case-study.pdf";

const cover =
  "https://framerusercontent.com/images/Y7mY2oDZzgAYS8RjwXBm2XyxKsw.png?scale-down-to=512&width=1000&height=1000";

/** Placeholder spreads (2:3). Swap for /portfolio/magazine/page-01.webp etc. */
export const portfolioMagazineImages = {
  coverFront: cover,
  coverBack:
    "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg",
  pages: [
    "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg",
    "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg",
    "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg",
    "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg",
  ],
} as const;
