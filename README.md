# Portafolio

A minimal, typed portfolio template to showcase your projects. Built with
[Vite](https://vite.dev) + vanilla TypeScript — no framework, no CMS, just edit
one data file and deploy the static build.

## Features

- ⚡ Instant dev server and fast static builds (Vite)
- 🔒 Strict TypeScript: projects are validated by a `Project` interface
- 🔎 Client-side search + tag filters generated from your data
- 🌓 Light/dark theme that follows the system preference
- ♿ Accessible markup (skip link, focus states, `aria-pressed`, live region)
- 📱 Responsive card grid

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

The smoke test loads the production bundle into a
[happy-dom](https://github.com/capricorn86/happy-dom) document and verifies
rendering, search and tag filters. Its expectations come from
`src/data/projects.ts`, so it keeps working after you edit your projects.

## Adding your projects

Everything shown in the projects section comes from
[`src/data/projects.ts`](src/data/projects.ts). Add an entry like this:

```ts
{
  id: "my-project",
  title: "My Project",
  description: "One or two sentences about what it does and why it matters.",
  tags: ["TypeScript", "Vite"],
  status: "completed", // "completed" | "in-progress" | "archived"
  featured: true,       // optional: pin it to the top of the grid
  image: "/projects/my-project.png", // optional, put the file in public/
  imageAlt: "Screenshot of My Project dashboard",
  links: [
    { label: "Live demo", url: "https://my-project.example.com" },
    { label: "Source", url: "https://github.com/you/my-project" },
  ],
}
```

The tag buttons, the "Showing X of Y projects" counter and the filtering are
all derived from this array — nothing else to update.

## Customizing the site

- **Name, bio, contact links** → [`index.html`](index.html) (marked with comments)
- **Colors, spacing, radius** → the `:root` tokens in [`src/style.css`](src/style.css)
- **Project card layout** → [`src/ui/projectCard.ts`](src/ui/projectCard.ts)
- **Search/filter behaviour** → [`src/ui/filters.ts`](src/ui/filters.ts)
- **Project type shape** → [`src/types/project.ts`](src/types/project.ts)

## Project structure

```
index.html              # page shell: header, hero, sections, footer
public/                 # static assets (favicon, project screenshots)
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
- **GitHub Pages** — publish the `dist/` folder with any Actions workflow
- **Any static host** — upload the contents of `dist/`
