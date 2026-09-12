---
kind: note
title: Interactive shop URLs replace recorded videos
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# User direction

Use iframes instead of videos. The shop needs exact demo URLs so the speaker can interact immediately and easily.

# Implementation

The shop adds `/demo/blocked-button`, `/demo/missing-pointer-capture`, `/demo/fixed-preview-width`, `/demo/unscrollable-bag`, and `/demo/low-contrast-notice`. All render the real Shop.vue and its existing components. They initialize the relevant product, cart contents or checkout. No local imitation from `/learn` is embedded.

Defect flags use a Vue injection scoped to the demo component instance. Normal `/` has no injection. Multiple demo frames can coexist without rewriting source. Default URLs activate the defect; `?state=working` selects working behavior. Reset remounts the initial state. The resize control changes the real preview width to 280 pixels, while the broken calculation uses 400 pixels. Demo dialogs allow the external demo controls to remain usable; ordinary shop dialogs retain modal behavior.

Slides 3–7 embed these routes. A separate button reveals the previously recorded JSDOM result image, clearly a saved source-mutation comparison rather than a live test of the URL. Prior MP4 artifacts are no longer referenced by the deck. Browser Mode explanation stays later.

# Sources and validation locations

- Shop implementation: `app/demo/shopDemo.ts`, `app/pages/demo/[scenario].vue`, Shop.vue and existing product/cart/checkout components.
- Route behavior: `tests/e2e/demo.spec.ts`.
- Talk wrapper: `starter/components/ShopDemoFrame.vue`.
- Historical JSDOM evidence: [recorded comparison](2026-09-12-shop-incident-recordings.md).
