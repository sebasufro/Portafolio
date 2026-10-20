type TagName = keyof HTMLElementTagNameMap;

/**
 * Creates an element with an optional class name and text content.
 * Keeps card templates readable without string concatenation or innerHTML.
 */
export function createElement<K extends TagName>(
  tag: K,
  className?: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className !== undefined) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/** Looks up an element by id and fails fast when the markup is missing it. */
export function mustGetElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (element === null) {
    throw new Error(`Missing required element with id "${id}"`);
  }
  return element as T;
}
