---
kind: note
title: axe diagram - JSDOM and browser contrast checks
url: https://github.com/dequelabs/axe-core
author: Codex source inspection
publisher: Local research
published: 2026-09-12
collected: 2026-09-12
status: complete
---

The axe-core README, Supported Browsers section, retrieved 2026-09-12, states that JSDOM support is limited and the color-contrast rule is known not to work with JSDOM. The README describes axe as an engine that integrates automated rule checks into existing tests. It also distinguishes incomplete findings requiring manual review. Source: https://github.com/dequelabs/axe-core#supported-browsers

The local Claw & Chew app/checkout/CheckoutForm.dom.test.ts explicitly asserts no violations AND that results.incomplete includes color-contrast. It injects the shop stylesheet before scanning the checkout notice. This green test intentionally demonstrates an incomplete contrast evaluation, not proof of sufficient contrast.

The preceding checkout evidence records the real Chromium contrast pass and deliberate defect failure. The new diagram explains this specific additional browser capability, not a universal guarantee of complete audits or all rules passing in a browser. It is an explanatory generated illustration, not a screenshot of test results. The illustrative checkout button represents low-contrast text; the real test targets the demo-shop notice.
