import type { Project } from "../types/project";
import { createElement, mustGetElement } from "../utils/dom";

export interface FilterState {
  /** Free-text search, matched against title, description and tags. */
  query: string;
  /** A single active tag, or `null` when no tag filter is applied. */
  tag: string | null;
}

/** Keeps only the projects that match both the query and the active tag. */
export function filterProjects(projects: Project[], state: FilterState): Project[] {
  const query = state.query.trim().toLowerCase();

  return projects.filter((project) => {
    if (state.tag !== null && !project.tags.includes(state.tag)) return false;
    if (query === "") return true;

    const haystack = [project.title, project.description, ...project.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

/**
 * Wires up the search input and the tag buttons (built from the project data)
 * and reports every change through `onChange`.
 */
export function initProjectFilters(
  projects: Project[],
  onChange: (state: FilterState) => void,
): FilterState {
  const search = mustGetElement<HTMLInputElement>("project-search");
  const tagFilters = mustGetElement<HTMLDivElement>("tag-filters");

  const tags = [...new Set(projects.flatMap((project) => project.tags))].sort(
    (a, b) => a.localeCompare(b),
  );

  const state: FilterState = { query: "", tag: null };
  const emit = (): void => onChange({ ...state });

  const buttons = tags.map((tag) => {
    const button = createElement("button", "tag-filter", tag);
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      // Clicking the active tag again clears the filter.
      state.tag = state.tag === tag ? null : tag;
      for (const other of tagFilters.querySelectorAll("button")) {
        other.setAttribute("aria-pressed", String(other === button && state.tag === tag));
      }
      emit();
    });
    return button;
  });

  tagFilters.append(...buttons);

  search.addEventListener("input", () => {
    state.query = search.value;
    emit();
  });

  return { ...state };
}
