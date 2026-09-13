---
kind: note
title: Nuxt test boundaries through the shop startup path
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Accepted direction

The user approved replacing the abstract Nuxt/SPA comparison with five connected slides: direct Shop.vue mount, user URL entry, the two test entry points, a concrete hydration mismatch, and a concise SPA transfer. Use a recurring Hamcrab server/browser illustration with editable labels and test paths. Keep speaker guidance in presenter.md.

# Current local source inspection

Read-only inspection of `/Users/alexanderopalic/Projects/opensource/claw-and-chew/scripts/scenarios.mjs` on 2026-09-13 confirms the prepared `hydration-mismatch` scenario changes:

```ts
const category = ref('All the good stuff')
```

to:

```ts
const category = ref(typeof window === 'undefined' ? 'Wearables' : 'All the good stuff')
```

It identifies `app/components/Shop.browser.test.ts` and `tests/e2e/hydration.spec.ts` as the paired tests, with expected failure evidence `Hydration completed but contains mismatches`.

The inspected E2E test registers console and pageerror listeners before `page.goto('/')`, adds the plush, opens the bag, asserts the dialog and quantity, then checks that both uncaught errors and hydration mismatch diagnostics are absent. The slide's red result refers specifically to the hydration assertion. It does not claim that every mismatch breaks the purchase flow.

The prior execution is recorded in the 2026-09-11 wiki log and the 2026-09-12 SPA/Nuxt source inspection. This task does not rerun or mutate the external shop's scenario. Slide results are an explanatory model of that prepared defect, not a live execution record.

# Interpretation and visual treatment

The server-to-browser path describes the server-rendered demo shop, not every Nuxt deployment mode. Directly mounting its client does not exercise the initial server HTML and hydration path. A SPA root mount can integrate client workflows; native reload, persistence, offline startup and built assets still require suitable checks according to the product's promises. The hypothetical SPA shop is an architecture transfer, not a newly implemented application.

The new illustration is generated using the built-in image generation tool with the existing Hamcrab migration artwork as a style reference. It is not an actual application screenshot. Labels, reveal steps and colored test paths are implemented in `starter/components/NuxtTestBoundary.vue`. The exact prompt is saved in `output/imagegen/hamcrab-nuxt-server-browser-prompt.md`.
