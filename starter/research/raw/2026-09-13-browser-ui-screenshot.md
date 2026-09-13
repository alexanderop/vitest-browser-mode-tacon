---
kind: note
title: Claw & Chew in the Vitest Browser UI
url: unknown
author: Codex and user-supplied visual references
publisher: local workspace
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Supplied references

The user supplied two images: the existing “Wo läuft was?” Node.js/browser architecture diagram and a Vitest Browser UI screenshot with a rendered cube, test navigation, and a passing report. The request was to show the equivalent for Claw & Chew, preferably by running it and adding an image to the deck.

# Local execution and capture

Checkout: `/Users/alexanderopalic/Projects/opensource/claw-and-chew`.
Installed Vitest, @vitest/ui and @vitest/browser-playwright: 5.0.0.
Test: `app/catalog/ProductCard.browser.test.ts`.
Result: one test file passed, one test passed in Chromium.

Reproduce the interactive view from the shop root:

```sh
pnpm exec vitest --watch --project browser app/catalog/ProductCard.browser.test.ts --browser.headless=false
```

The screenshot was captured from the actual Playwright provider's page after running this same test with Vitest's startVitest API. The capture used a 400 × 650 component viewport, a 1440 × 650 UI viewport and the UI's dark color scheme. The selected file's Report tab shows “All tests passed in this file”; the rendered ProductCardHost shows the Hamcrab product and “1 items in bag”. No test results or interface elements were fabricated. Application sources and tests were not changed.

Asset: `starter/public/shop/vitest-browser-ui.png`.
The slide “Claw & Chew im Browser Mode” follows “Wo läuft was?” and adds editable labels above the screenshot for test selection, rendered component, and report. This is evidence for this installed Vitest 5 UI, not a claim that all Vitest versions have an identical layout.
