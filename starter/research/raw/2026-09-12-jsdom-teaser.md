---
kind: note
title: Shop first, JSDOM false-green teaser, explanation later
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# User direction

Show the shop first, then all existing JSDOM false-positive cases as a teaser. Explain later how Vitest Browser Mode helps prevent those gaps.

# Inspected local evidence

Source checkout: `/Users/alexanderopalic/Projects/opensource/claw-and-chew`.
Read `talk/testing.md`, `app/customizer/ShirtCustomizer.dom.test.ts`, `app/checkout/CheckoutForm.dom.test.ts`, and `artifacts/scenarios/matrix.json` on 2026-09-12. This is source inspection, not a new execution of the scenarios. The current matrix records blocked-button baseline pass/pass, broken jsdom pass/browser fail, restored pass/pass on 2026-09-11.

The local comparison documentation describes five paired scenarios: blocked-button, missing pointer capture, fixed-preview-width, unscrollable-bag, low-contrast-notice. Pointer and geometry cases depend on permissive or stale mocks. The contrast test explicitly expects both no violations and an incomplete color-contrast result; green is not evidence of successful contrast evaluation.

ARIA snapshots and screenshot differences are separate contracts, not additional demonstrated JSDOM false greens. Nuxt hydration and production artwork are server-boundary examples where a direct Browser Mode mount also passes; retain them in the architecture chapter.

# Editorial decision

Slides 3–5 group all five existing cases by customer action. Slide 6 leaves an open question. Browser Mode explanation, the original real JSDOM test, interactive blocked-button reconstruction and terminal comparison follow in the behavior chapter. Preserve the later accessibility, visual and architecture chapters. This is a revised time allocation, not a rehearsed duration.
