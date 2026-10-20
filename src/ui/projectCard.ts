import type { Project, ProjectLink, ProjectStatus } from "../types/project";
import { createElement } from "../utils/dom";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  completado: "Completado",
  "en-progreso": "En progreso",
  archivado: "Archivado",
};

/** Builds a single project card (<li>) from a typed project entry. */
export function createProjectCard(project: Project): HTMLLIElement {
  const card = createElement("li", "project-card");
  if (project.featured === true) card.classList.add("project-card--featured");

  if (project.image !== undefined) {
    const image = createElement("img", "project-card__image");
    image.src = project.image;
    image.alt = project.imageAlt ?? "";
    image.loading = "lazy";
    card.append(image);
  }

  const header = createElement("div", "project-card__header");
  header.append(
    createElement("h3", "project-card__title", project.title),
    createElement(
      "span",
      `status status--${project.status}`,
      STATUS_LABELS[project.status],
    ),
  );
  card.append(header);

  card.append(createElement("p", "project-card__description", project.description));

  const tagList = createElement("ul", "project-card__tags");
  for (const tag of project.tags) {
    tagList.append(createElement("li", "tag", tag));
  }
  card.append(tagList);

  if (project.links.length > 0) {
    const links = createElement("div", "project-card__links");
    for (const link of project.links) {
      links.append(createProjectLink(link));
    }
    card.append(links);
  }

  return card;
}

function createProjectLink(link: ProjectLink): HTMLAnchorElement {
  const anchor = createElement("a", "button-link", link.label);
  anchor.href = link.url;
  anchor.target = "_blank";
  anchor.rel = "noreferrer noopener";
  return anchor;
}
