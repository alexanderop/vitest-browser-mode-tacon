---
kind: note
title: Equal SPA and Nuxt cases and deliberate test contracts
url: unknown
author: Alexander Opalic and Codex
publisher: local workspace
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# Equal SPA and Nuxt cases and deliberate test contracts

## Accepted user direction

The user requested equal importance for the Workout Tracker SPA and Nuxt e-commerce examples. A pure SPA can choose Vitest Browser Mode for functional UI testing without requiring a separate Playwright E2E runner. Mount App.vue for behavior-driven feature workflows. Focus smaller component tests on their own technical contracts. Discuss overlap honestly. Place visual regression deliberately in the application's own core UI library rather than capturing every stage of every workflow.

Public technical contracts versus private implementation details is an editorial clarification. These are strategy recommendations, not measured universal guarantees.

## Local source inspection, 2026-09-12

Workout root: `/Users/alexanderopalic/Projects/active/workoutTracker`.

- `src/__tests__/helpers/createTestApp.ts` renders App.vue with the production router factory using createMemoryHistory, i18n and the Effect runtime plugin. It supplies a mocked reload callback. It does not execute main.ts.
- `src/__tests__/setup.ts` imports fake-indexeddb/auto and application CSS.
- `src/__tests__/integration/isometric-exercise.spec.ts` constructs a Plank workout through page objects, fills 60 seconds, blurs the input, completes the set and checks its completed state. This does not prove native persistence across a real reload.
- `vitest.config.ts` configures the Playwright browser provider and includes a Node unit project. The provider is distinct from the standalone Playwright runner.
- `test/e2e/workout-persistence.spec.ts` uses Playwright for an additional application journey. The current repository is not evidence of an exclusively Browser Mode suite.

Shop root: `/Users/alexanderopalic/Projects/opensource/claw-and-chew`.

- `app/components/Shop.browser.test.ts` directly renders the shop client. Its workflows are documented in the existing shop evidence record.
- `tests/e2e/hydration.spec.ts` registers console and pageerror listeners, visits `/`, adds a plush, opens the bag, checks the dialog and quantity, then asserts no uncaught errors or hydration mismatch diagnostics. The slide excerpt retains interaction before the diagnostic assertion.
- The prepared hydration defect and previous execution evidence are recorded separately in `2026-09-11-claw-and-chew-talk-examples.md` and the research log. No application suites were rerun for this source inspection.

## Editorial interpretation and limits

A root mount integrates a large share of SPA client behavior. A Nuxt client mount does not cover the initial server request, server rendering and hydration. Server rules and endpoints merit appropriate server tests; visiting the running application covers the server/client path. This is not a claim that Vitest cannot test Nuxt servers.

Without another E2E runner, the team still decides how to check any promised native persistence, real reload, service worker, offline startup and built assets. The inspected direct mount supplies no such proof.

Both broad and narrow tests can test observable behavior. Root tests express user goals; component tests express public props/events, keyboard and focus contracts. Repeated button execution is normal. Repeating the same detailed assertions across every consumer increases maintenance; deliberate overlap can still protect different boundaries.

The proposed visual strategy starts with selected core UI variants and focus/error states. Screen screenshots are added for independent composition and layout risks. ProductCard demonstrates a component-composition check; it is not a primitive UI library. This recommendation does not imply the current Workout suite already implements every part of it.
