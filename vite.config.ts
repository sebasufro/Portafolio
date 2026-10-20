import { defineConfig } from "vite";

export default defineConfig({
  // Relative asset URLs so the production build works from any path
  // (root domain, GitHub Pages project site, a subfolder, ...).
  base: "./",
});
