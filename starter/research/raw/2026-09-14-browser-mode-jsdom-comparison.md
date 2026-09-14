---
kind: note
title: Browser Mode versus jsdom comparison from the Reka migration
url: unknown
author: Alexander Opalic and Codex
publisher: local TACON workspace
published: 2026-09-14
collected: 2026-09-14
status: complete
---

# Request and source inspection

User requests one comparison slide, emphasizing benefits and slightly slower execution as the displayed drawback.

Rechecked local `/Users/alexanderopalic/Projects/reka-ui-bench-mark`:

- `FINDINGS.tsv`, Slider mutation entry: deleting production `setPointerCapture` made the browser test fail while jsdom passed because its `hasPointerCapture` mock returned truthy. This is recorded historical mutation evidence, not a new execution.
- `packages/core/src/Slider/Slider.test.ts` mocks `hasPointerCapture`; `Slider.browser.test.ts` uses native geometry, held mouse input and keyboard actions without those browser-emulation mocks.
- `packages/core/src/Tabs/Tabs.browser.test.ts` sends ArrowRight to the focused element through `userEvent.keyboard`.
- `PERFORMANCE.md` and the existing complete capture `2026-09-13-reka-click-performance.md`: historical 2026-08-19 medians, jsdom 10.75 seconds versus Chromium 12.10 seconds, 87 paired files plus two browser harness files. Increase = 12.56%, rounded to 13%. Individual file and interaction overhead varies; no new benchmark was run.
- Existing capture `2026-09-13-axe-rule-scope.md` supports browser contrast checking; DOM-based axe checks already work in jsdom. Browser execution does not prove complete accessibility.

Primary documentation checked 2026-09-14:

- https://github.com/jsdom/jsdom : jsdom performs no layout or visual rendering.
- https://main.vitest.dev/guide/browser/why : native browser execution improves browser fidelity; visible UI and browser debugging are available.
- https://main.vitest.dev/guide/browser/ : provider-backed interactions use browser automation rather than direct synthetic event dispatch.

# Editorial scope

Insert the comparison after the three-contract recap and before the testing-strategy recommendation. Keep the existing table style. The slide shows runtime as the requested drawback; it does not assert that setup, migration or provider limitations never exist. Existing backup boundaries remain applicable. Geometry and screenshot comparison are capabilities, not a claim that the simple AspectRatio migration test itself contains a screenshot assertion.
