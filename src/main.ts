import "./style.css";

import { projects } from "./data/projects";
import { filterProjects, initProjectFilters } from "./ui/filters";
import type { FilterState } from "./ui/filters";
import { createProjectCard } from "./ui/projectCard";
import { mustGetElement } from "./utils/dom";
import type { Project } from "./types/project";

const projectList = mustGetElement<HTMLUListElement>("project-list");
const projectCount = mustGetElement<HTMLParagraphElement>("project-count");
const emptyState = mustGetElement<HTMLParagraphElement>("no-projects");
const year = mustGetElement<HTMLSpanElement>("year");

// Featured projects first; the authored order is preserved otherwise.
const sortedProjects: Project[] = [...projects].sort(
  (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
);

function render(visible: Project[]): void {
  projectList.replaceChildren(...visible.map(createProjectCard));
  projectList.hidden = visible.length === 0;
  emptyState.hidden = visible.length > 0;
  projectCount.textContent = `Showing ${visible.length} of ${sortedProjects.length} projects`;
}

function applyFilters(state: FilterState): void {
  render(filterProjects(sortedProjects, state));
}

const initialState = initProjectFilters(sortedProjects, applyFilters);
applyFilters(initialState);

year.textContent = String(new Date().getFullYear());
