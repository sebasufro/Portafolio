# Portafolio

A minimal, typed portfolio template to showcase your projects. Built with
[Vite](https://vite.dev) + vanilla TypeScript

## Getting started

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
```

Other scripts:

| Script              | What it does                                          |
| ------------------- | ----------------------------------------------------- |
| `npm run dev`       | Dev server with hot module reload                     |
| `npm run build`     | Type-check and build to `dist/`                       |
| `npm run preview`   | Serve the production build locally                    |
| `npm run typecheck` | Only run the TypeScript compiler                      |
| `npm test`          | Build, then run the DOM smoke test (`tests/smoke.mjs`)|

## Project structure

```
index.html              # page shell: header, hero, sections, footer
public/                 # static assets (favicon, CV.pdf, project screenshots)
src/
  main.ts               # boots the app: sorts, renders, wires filters
  style.css             # design tokens + all styles
  data/projects.ts      # ← your content lives here
  types/project.ts      # Project interface
  ui/projectCard.ts     # builds one <li> card
  ui/filters.ts         # search + tag filter logic
  utils/dom.ts          # tiny DOM helpers
tests/
  smoke.mjs            # DOM smoke test run by `npm test`
vite.config.ts
tsconfig.json
```

> The test imports `src/data/projects.ts` directly, which relies on Node's
> built-in TypeScript stripping — use **Node 22.18 or newer**.

## Deploy

The build is fully static (`npm run build` → `dist/`) and uses relative asset
paths (`base: "./"`), so it works anywhere:

- **Netlify / Vercel / Cloudflare Pages** — build command `npm run build`, output `dist`
- **GitHub Pages** — included: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
  builds, tests and deploys `dist/` on every push to `main`/`develop`.
  One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
  Site: `https://sebasufro.github.io/Portafolio/`
- **Any static host** — upload the contents of `dist/`
