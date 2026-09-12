# TACON presenter guide

The deck is in German. Slides 1–29 contain 40 minutes of material and the question period. Slides 30–33 are backups. Every slide has speaker notes with timing and sources.

## Start the presentation

From this repository:

```sh
pnpm dev
```

Open the address printed by Slidev. Press `p` for presenter mode. Use Space or the right arrow for reveals. The notes include click cues. Open the shop in a second browser tab before the audience arrives.

From `/Users/alexanderopalic/Projects/opensource/claw-and-chew`:

```sh
pnpm dev
```

The shop is at `http://127.0.0.1:3080`. The optional interactive testing lab is at `/learn`. Checkout is simulated. The original PWA's suite distribution and reported timings are not measurements of this shop.

## Timing

| Slides | Minutes | Topic |
| --- | --- | --- |
| 1–3 | 0–4 | Shop and false confidence |
| 4–6 | 4–9 | Black-box strategy and original case study |
| 7–10 | 9–14 | Browser Mode and blocked-button demonstration |
| 11–16 | 14–24 | Purchase flow, scope, validation, pure logic |
| 17–20 | 24–30 | Factory and page object |
| 21–23 | 30–34 | Accessible names, focus, contrast |
| 24–26 | 34–37 | Screenshot comparison |
| 27–29 | 37–40 | Application boundary and adoption |
| 29 | 40–45 | Questions |

## Preflight

Install dependencies and Chromium before the event. Product images, slide images, and embedded videos are local. Prepare the demo terminal in the shop directory with a large font. Disable notifications. Stop Vitest watchers before applying a defect.

```sh
pnpm demo status
pnpm exec vitest run --config talk/vitest.tacon.config.ts
pnpm exec vitest run --project browser app/components/Shop.browser.test.ts
pnpm exec vitest run --project browser app/checkout/CheckoutForm.browser.test.ts
```

Do not run a build or another suite concurrently with the source-mutating scenario verifier.

## Blocked button, slide 10

Run these commands separately so the audience sees each result:

```sh
pnpm demo blocked-button
pnpm exec vitest run --project jsdom app/catalog/ProductCard.dom.test.ts
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
pnpm demo reset
pnpm exec vitest run --project browser app/catalog/ProductCard.browser.test.ts
```

Expected sequence is jsdom pass, browser failure due to intercepted pointer input, restored browser pass. The source mutation changes `.product-decoration` from `pointer-events: none` to `pointer-events: auto`. The tests stay unchanged. Never force the click. Run reset before moving on, including after an interrupted demonstration.

For an automated rehearsal with saved evidence:

```sh
node scripts/verify-scenarios.mjs blocked-button
```

If a live run becomes distracting, explain the CSS difference and use the saved output from `artifacts/scenarios/`. The embedded focus video and screenshot evidence continue without a running shop. The add-to-bag video in `public/shop/` shows working behavior, not the failing test.

## Factories and page objects, slides 16–20

Open `talk/tacon/shipping.unit.test.ts`, `cart-line.ts`, `purchase.browser.test.ts`, and `shop-page.ts` in the shop checkout. The slide snippets match these examples. The original longer purchase test remains in `app/components/Shop.browser.test.ts`.

```sh
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project unit
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project browser
```

Explain the fixture's intentionally narrow shape. It creates one plush line with a configurable quantity. It is not a generic cart builder. Explain that the page object groups actions while the test keeps its assertion.

## Screenshot comparison, slides 24–26

The deck already contains the actual baseline, changed render, and diff. Use those images for the timed presentation. For a rehearsal, follow `talk/tacon/README.md` in the shop. The deliberate pink button change produces a screenshot mismatch while the interaction test still passes. Restore the CSS and rerun. Do not update the reference to accept the deliberate defect.

```sh
pnpm exec vitest run --config talk/vitest.tacon.config.ts --project visual
```

## Application boundary, slide 27

Use the prepared explanation and saved experiment evidence. Avoid rebuilding Nuxt during the 90-second section. The rehearsal command below rebuilds as needed and restores the scenario:

```sh
pnpm demo:verify:hydration
```

The expected broken-state result is a Browser Mode pass and a Playwright failure. Both use Chromium. Browser Mode mounts `Shop.vue`, while Playwright visits the built Nuxt app.

## If time runs short

Keep the screenshot and accessibility sections because the abstract promises both. Skip the factory implementation detail on slide 18 and the page-object implementation detail on slide 20. Explain each pattern from its calling test. Use the already captured screenshot diff instead of a live rerun. Finish the content at minute 40.

## Sources and asset provenance

Research sources are linked in each slide's speaker notes and indexed in `research/wiki/index.md`. Shop file paths in notes are relative to the Claw & Chew checkout. The original 70/20/10 distribution and timing figures come from the 2025 Vue PWA article. The source capture uses Vitest 4.1.11 documentation; executable shop examples use its installed Vitest 5.0.0 and renderer 3.1.0.

`public/shop/storefront.jpg`, `checkout.jpg`, `add-to-bag.*`, and `keyboard-focus.*` are unmodified copies of Claw & Chew's prepared media. `plush-card.png`, `plush-card-actual.png`, and `plush-card-diff.png` come from the new visual test. These are browser screenshots, not generated mockups.
