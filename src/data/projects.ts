import type { Project } from "../types/project";

/**
 * Single source of truth for the portfolio content.
 *
 * Add, remove or reorder entries here: the cards, tag filters and project
 * counts on the page are all derived from this array. Featured projects are
 * automatically pinned to the top.
 */
export const projects: Project[] = [
  {
    id: "taskflow",
    title: "TaskFlow",
    description:
      "A keyboard-first task manager with offline support, drag-and-drop boards and instant search across thousands of items.",
    tags: ["TypeScript", "Vite", "IndexedDB", "PWA"],
    status: "completed",
    featured: true,
    links: [
      { label: "Live demo", url: "https://example.com/taskflow" },
      { label: "Source", url: "https://github.com/your-username/taskflow" },
    ],
  },
  {
    id: "weather-lens",
    title: "Weather Lens",
    description:
      "Forecast dashboard that merges several public APIs into a single, glanceable view with hourly charts and severe-alert notifications.",
    tags: ["TypeScript", "REST API", "SVG", "CSS"],
    status: "completed",
    links: [
      { label: "Live demo", url: "https://example.com/weather-lens" },
      { label: "Source", url: "https://github.com/your-username/weather-lens" },
    ],
  },
  {
    id: "devnotes",
    title: "DevNotes",
    description:
      "Markdown notebook for developers with syntax highlighting, tags and full-text search — currently adding end-to-end sync.",
    tags: ["TypeScript", "Markdown", "Web Workers"],
    status: "in-progress",
    links: [{ label: "Source", url: "https://github.com/your-username/devnotes" }],
  },
  {
    id: "legacy-portfolio",
    title: "First Portfolio",
    description:
      "The static HTML/CSS site I started with. Kept online to show where everything began.",
    tags: ["HTML", "CSS"],
    status: "archived",
    links: [{ label: "Source", url: "https://github.com/your-username/first-portfolio" }],
  },
];
