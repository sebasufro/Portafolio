/**
 * Smoke test for the portfolio: loads the production bundle from dist/ into a
 * happy-dom document and checks that rendering, search and tag filters behave.
 *
 * Run with `npm test` (it builds first). Expectations are derived from
 * src/data/projects.ts, so editing your projects never breaks the test.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { Window } from "happy-dom";

import { projects } from "../src/data/projects.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distAssets = path.join(root, "dist", "assets");

if (!fs.existsSync(distAssets)) {
  console.error("dist/ not found — run `npm run build` first (or use `npm test`).");
  process.exit(1);
}

// --- Arrange a DOM from index.html -----------------------------------------
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const bodyHtml = html
  .match(/<body>([\s\S]*)<\/body>/)[1]
  .replace(/<script[\s\S]*?<\/script>/g, "");

const window = new Window();
const { document } = window;
document.body.innerHTML = bodyHtml;

globalThis.window = window;
globalThis.document = document;
globalThis.Event = window.Event;
globalThis.HTMLElement = window.HTMLElement;
globalThis.Node = window.Node;

// --- Load the built bundle --------------------------------------------------
const bundle = fs.readdirSync(distAssets).find((file) => file.endsWith(".js"));
await import(pathToFileURL(path.join(distAssets, bundle)).href);

// --- Helpers ----------------------------------------------------------------
const all = (selector) => [...document.querySelectorAll(selector)];
const cardCount = () => all("#project-list > li").length;
const uniqueTags = [...new Set(projects.flatMap((project) => project.tags))].sort(
  (a, b) => a.localeCompare(b),
);
const matching = (query, tag) =>
  projects.filter((project) => {
    if (tag !== null && !project.tags.includes(tag)) return false;
    const haystack = [project.title, project.description, ...project.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  }).length;

let failed = false;
const assert = (condition, message) => {
  if (condition) console.log(`ok: ${message}`);
  else {
    failed = true;
    console.error(`FAIL: ${message}`);
  }
};

// --- Assertions -------------------------------------------------------------
assert(cardCount() === projects.length, `renders one card per project (${projects.length})`);
assert(
  document.getElementById("project-count").textContent ===
    `Showing ${projects.length} of ${projects.length} projects`,
  "project counter text is correct",
);
assert(
  all("#tag-filters button").length === uniqueTags.length,
  `builds one filter button per unique tag (${uniqueTags.length})`,
);
assert(
  all("#tag-filters button").map((button) => button.textContent).join("|") === uniqueTags.join("|"),
  "tag buttons are sorted alphabetically",
);
assert(
  all(".project-card__links a").length ===
    projects.reduce((total, project) => total + project.links.length, 0),
  "renders every project link",
);
assert(
  all('.project-card__links a[target="_blank"]').every((link) =>
    link.rel.includes("noopener"),
  ),
  "external links use rel=noopener",
);

const firstFeatured = projects.find((project) => project.featured === true);
if (firstFeatured !== undefined) {
  assert(
    document.querySelector(".project-card")?.querySelector(".project-card__title")?.textContent ===
      firstFeatured.title,
    "featured project is pinned to the top",
  );
}

// Tag filter: pick a tag from the data, toggle it on, then off.
const tag = projects[0].tags[0];
const tagButton = all("#tag-filters button").find((button) => button.textContent === tag);
tagButton.click();
assert(cardCount() === matching("", tag), `tag filter "${tag}" narrows the list correctly`);
assert(tagButton.getAttribute("aria-pressed") === "true", "active tag exposes aria-pressed=true");
tagButton.click();
assert(cardCount() === projects.length, "clicking the active tag clears the filter");

// Search: match, then no match, then clear.
const search = document.getElementById("project-search");
const type = (value) => {
  search.value = value;
  search.dispatchEvent(new window.Event("input"));
};

const seed = projects[0].title;
type(seed);
assert(cardCount() === matching(seed, null), `search "${seed}" filters the list correctly`);

type("definitely-not-a-project");
assert(cardCount() === 0, "search with no matches empties the list");
assert(document.getElementById("no-projects").hidden === false, "empty state becomes visible");
assert(document.getElementById("project-list").hidden === true, "list is hidden when empty");

type("");
assert(cardCount() === projects.length, "clearing the search restores every project");

assert(/^\d{4}$/.test(document.getElementById("year").textContent), "footer year is filled in");

console.log(failed ? "SMOKE TEST FAILED" : "SMOKE TEST PASSED");
process.exit(failed ? 1 : 0);
