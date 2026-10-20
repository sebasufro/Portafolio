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
    id: "muebles",
    title: "M.U - Muebles",
    description:
      "Pagina principal para el negocio de muebles 'M.U - Muebles'.",
    tags: ["Vue", "HTML", "PostgreSQL", "JavaScript"],
    status: "completado",
    links: [
      { label: "Código Fuente", url: "https://github.com/Azulgamer303/m.u-muebles" },
    ],
  },
  {
    id: "genomica",
    title: "Genomica Dashboard",
    description:
      "Un Dashboard de organización de insumos y productos químicos y bioquímicos realizado para el equipo de Genomica de Bioren de la Universidad de la Frontera.",
    tags: ["Next.js", "HTML", "Firebase"],
    status: "completado",
    featured: true,
    links: [
      { label: "Código Fuente", url: "https://github.com/sebasufro/genomica" },
    ],
  },
  {
    id: "rutasegura",
    title: "Ruta Segura",
    description:
      "Aplicación móvil para mejorar las guias de rutas y ayudar a mejorar la comunicación en servicios de voluntariado",
    tags: ["Flutter", "Android", "Typescript", "PostgreSQL"],
    status: "completado",
    links: [
      { label: "Código Fuente", url: "https://github.com/sebasufro/RutaSegura" }
    ],
  },
];
