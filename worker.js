/**
 * Financing Calculator — Cloudflare Worker (Sites static site)
 *
 * Serves the static site from env.ASSETS (the Worker's sites assets bucket).
 * The page is a single self-contained HTML file with inline custom CSS +
 * dynamic logic; its only external dependencies are:
 *   - Tailwind CSS (CDN, cdn.tailwindcss.com)
 *   - Google Fonts (CDN) — Inter + JetBrains Mono for tabular financial text
 *
 * The financial card PNG (the Generate Card popup) is drawn with the browser's
 * Canvas API, so it needs no extra library. To publish a fully offline version, inline those two
 * assets into the page and remove the external references (see README.md
 * section "Offline self-contained build").
 */
export default {
  async fetch(request, env) {
    // Serve the static site from the Workers Sites assets bucket.
    return env.ASSETS.fetch(request);
  },
};
