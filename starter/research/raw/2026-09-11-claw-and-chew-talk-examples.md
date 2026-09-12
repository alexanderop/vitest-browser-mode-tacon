---
kind: note
title: Claw & Chew TACON example evidence
url: unknown
author: Codex
publisher: local workspace
published: 2026-09-11
collected: 2026-09-11
status: complete
---

# Claw & Chew TACON example evidence

This is a local inspection and execution record, not an external publication. The user selected `/Users/alexanderopalic/Projects/opensource/claw-and-chew` as the talk example.

The shop README identifies it as a Nuxt demonstration shop with simulated checkout. Its package.json has Vitest 5.0.0 and vitest-browser-vue 3.1.0. The full-shop browser test mounts Shop.vue directly. The application tests use the built Nuxt server.

The existing `app/components/Shop.browser.test.ts` covers purchase, quantity changes, empty-cart behavior, native form validation, and focus restoration. The existing checkout browser test runs axe-core's color-contrast rule and checks violations, incomplete results, and a completed passing rule.

The new talk examples live under `talk/tacon/` with the separate configuration `talk/vitest.tacon.config.ts`. They exercise a narrow cart-line factory, a small shop page object, and a product-card screenshot comparison. The unit and browser tests passed. The first visual run generated a reference and requested review. After inspection, all three tests passed.

A temporary scoped `.add-button { background: #ff6bed; }` rule in ProductCard.vue produced a screenshot failure with 10,598 changed pixels, ratio 0.11. During that change, the original product-card click test passed. The rule was removed and the talk examples passed again. The source is restored. Reference, actual, and diff screenshots were copied into the deck's public/shop directory.

`node scripts/verify-scenarios.mjs blocked-button` verified baseline jsdom and browser passes, a broken-state jsdom pass and browser failure, and restored passes in both environments. The verifier restored the source.

Source files in the shop:

- README.md
- package.json
- app/components/Shop.browser.test.ts
- app/catalog/ProductCard.browser.test.ts
- app/checkout/CheckoutForm.browser.test.ts
- app/cart/cart.ts
- talk/tacon/cart-line.ts
- talk/tacon/shipping.unit.test.ts
- talk/tacon/shop-page.ts
- talk/tacon/purchase.browser.test.ts
- talk/tacon/product-card.visual.test.ts
- talk/vitest.tacon.config.ts
- artifacts/scenarios/matrix.json

The current visual-testing documentation was also consulted at https://vitest.dev/guide/browser/visual-regression-testing.html. It describes screenshot comparison, platform-specific references, and controlled rendering environments. The local execution above supplies the evidence for the slides' concrete visual example.
