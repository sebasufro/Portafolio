export type ProjectStatus = "completado" | "en-progreso" | "iniciando";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  /** Stable identifier, also handy as a React/Vue key if you ever migrate. */
  id: string;
  title: string;
  /** Short text shown on the card. */
  description: string;
  /** Free-form technologies/topics, used to build the tag filter buttons. */
  tags: string[];
  status: ProjectStatus;
  /** Featured projects are pinned to the top of the list. */
  featured?: boolean;
  /** Optional card image, relative to the `public/` folder (e.g. "/projects/app.png"). */
  image?: string;
  /** Required whenever `image` is set and the image carries meaning. */
  imageAlt?: string;
  /** Demo, source code, case study, ... rendered as buttons on the card. */
  links: ProjectLink[];
}
