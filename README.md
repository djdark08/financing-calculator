# Financing Calculator (Philippine Peso, ₱)

A self-contained single-page financing calculator for Philippine peso installment
models. It runs entirely in the browser with no server or build step: edit the HTML
file, open it in any modern browser, and it works. It was built from the attached
`financing_calculator.html` document.

## Features

- Two calculation directions:
  - **Calculate from purchase price** (forward): total price -> monthly installment.
  - **Estimate price from monthly budget** (reverse): target monthly payment -> maximum
    purchase price.
- Purchase quantity / device stepper, plus total price and unit price inputs.
- Installment duration: quick term buttons for 3/6/12/18/24/36 months and a custom slider.
- Synchronized financing charge controls. Four interchangeable ways to express the
  additional cost; the others update automatically:
  - Flat percentage over the entire term (Flat %)
  - Monthly add-on percentage (Mo %)
  - Annual percentage rate (Yr %)
  - Fixed monthly peso add-on (Mo ₱)
  - Fixed total extra peso charge (Tot ₱)
- Quick presets (Preset 1: ₱100K @ 24m, Preset 2: ₱200K @ 24m, Preset 3: ₱300K @ 36m).
- "Reset to 11.16% Flat" and a "16.8k ref" snap to set the total extra cost to ₱16,800.
- Live summary card: monthly installment, per-device amount (when quantity > 1),
  principal vs financing charge bar, and the key totals.
- Installment estimate breakdown table with a reconciliation check and an
  equivalent simple annual rate.
- Copy Summary: copies a text summary of the estimate to the clipboard.
- Save Photo: renders the 540x810 portrait summary card to a PNG and downloads it.

## Run it locally

The site is a static HTML file with no build step. It needs no dependencies and
loads CSS/JS from public CDN URLs only, so it works by simply opening the file.

```bash
# Option 1: open the file directly
open financing_calculator.html

# Option 2: use the included Node static server
npm install
npm run dev
# then open http://localhost:4321
```

The HTML file also references external resources that must be reachable from the
browser:

- Tailwind CSS: https://cdn.tailwindcss.com
- html2canvas: https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js
- Google Fonts (Inter and JetBrains Mono): https://fonts.googleapis.com / fonts.gstatic.com

These work normally when you have internet access. There is no backend, database,
or API key required.

## Files

| File | Purpose |
| ---- | ------- |
| `public/index.html` | The calculator as served at the site root. |
| `public/financing_calculator.html` | The calculator file (also serves as the source for the site root). |
| `worker.js` | Cloudflare Worker that serves the static site assets. |
| `deploy.json` | Deployment manifest for Freebuff Sites. |
| `wrangler.toml` | Local Wrangler configuration. |
| `server.mjs` | Zero-dependency Node static dev server. |
| `package.json` | Minimal package manifest and scripts. |
| `.gitignore` | Ignored paths. |

## Publish to Freebuff Sites (optional)

If you want a deployed URL:

```bash
# requirements: Bun or Node, and the wrangler CLI
npm install
npx wrangler login
wrangler sites create <site-name>
wrangler sites deploy <site-name> --env preview
wrangler sites deploy <site-name> --env production
```

The site is static; no API or database is needed. The deployment injects the
`ASSETS` binding automatically.

## Model notes

- The calculator uses a flat additional charge over the entire term (no compounding).
- "Equivalent simple annual rate" is shown as monthly flat rate x 12. It is the
  simple annual equivalent, not an effective annual yield.
- It always reconciles with no rounding error: total repayment / months = monthly
  installment, displayed to two decimals.

## Screenshots

The screenshots below were captured from the deployed calculator at
`https://site-f0478a2ff41c4a889d1b4c5b2086477b.freebuff.page/`. Use them as a visual
reference for the UI; the app runs exactly the same locally.

### Calculator UI (with summary card, breakdown table, and Save Photo button)

![Calculator UI with summary card, breakdown table, and Save Photo button](financing_Calculator_UI.png)

The main layout is a two-column dashboard:

- The dark navy header shows the title, subtitle, author credit, and the quick presets
  (₱100K/24m, ₱200K/24m, ₱300K/36m, Reset to Defaults).
- The left column holds three stacked cards: the price/quantity inputs, the
  installment-duration presets, and the synchronized financing charge controls.
- The right column holds the monthly installment amount card, the estimates
  breakdown table, the “Copy Summary” and “Save Photo” actions, and the
  reconciliation check with the equivalent simple annual rate.
- The charge-mode banner (“Fixed Monthly Add-on”) is the active anchor so the
  highlighted card follows the click.

### Portrait summary export card (Save Photo output)

![Portrait summary export card](financing-Card.png)

This is the 540x810 portrait card that the “Save Photo” button renders and downloads.
It contains the estimate summary with:

- The header purchase price and the monthly installment amount.
- The duration and total payable on the same line, separated by a dot.
- The breakdown rows (original price, financing charge, and total repayment).
- The per-mode rates in an indented list so the user can see which charge mode is
  active and what each equivalent rate equals.

Both screenshots were taken from the deployed site; they reflect the current,
fully working build. If you prefer, replace them with your own captures at any
state or preset.

## Notes for use

- The calculator stays private to your browser; nothing is sent to a server.
- All edits are saved to the browser's localStorage so your last inputs survive a reload.
- The portrait export card downloads a PNG sized 540x810 (portrait), ideal for
  sharing on messaging apps.

## Note on CDN dependencies

All three external resources (Tailwind CSS, html2canvas, Google Fonts) are loaded
from their public CDN URLs. If you need the app to work with no network access, you
must download those assets and serve them locally, or inline them into this file.

