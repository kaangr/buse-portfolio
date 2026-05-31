# Buse Arıca — Interior Design Portfolio

Editorial portfolio site built with Next.js 16, Tailwind CSS, and TypeScript.

## Features

- Project showcase with detail panel and render lightbox
- PDF previews (CV and project documents)
- 3D magazine section (lazy-loaded)
- Ambient hero video and magnetic PDF buttons

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Deploy (Vercel — free tier)

1. Push this repo to GitHub.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Framework preset: **Next.js** (auto-detected).
4. Deploy — no environment variables required for the static portfolio.

Or use the CLI:

```bash
npx vercel --prod
```

## Content

- Copy: `src/content/copy.ts`
- Projects & assets: `src/data/projects.ts`, `public/projects/`
- Magazine pages: `public/portfolio/magazine/`
