---
kind: note
title: Verification of the hydration fixture teaching example
url: https://playwright.dev/docs/test-fixtures
author: Codex
publisher: local workspace
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Official sources inspected

- https://playwright.dev/docs/test-fixtures#automatic-fixtures — automatic fixtures use the tuple option `auto: true`; fixture setup precedes the test and teardown follows `use`. Adaptation: register a console listener, run the test, detach and assert the collected diagnostics.
- https://playwright.dev/docs/navigations#hydration — a page can be visible before event listeners are attached. Controls should remain disabled until ready where early actions would otherwise be lost. Adaptation: a test needs meaningful client readiness and an observed interactive result; `domcontentloaded` or a visible SSR heading alone cannot prove hydration completion.
- https://nuxt.com/docs/4.x/guide/concepts/rendering — universal rendering supplies HTML from the server and hydrates it on the client. The slide describes the server-rendered demo, not every Nuxt rendering mode.

# Scope and interpretation

The main slide is a Vue/Nuxt console-diagnostic guard, not a cross-framework detector or a complete runtime-error monitor. For React/Astro React islands, match the framework's actual messages and consider `pageerror` as well. Framework/build/version-dependent diagnostics mean an empty collection does not prove all markup correct. Detached listeners cover only the observed test interval and its requested page, not arbitrary later lazy hydration or popups.

The manuscript's `goto(..., { waitUntil: 'hydration' })` is a project helper, not a standard Playwright page.goto option. Do not introduce that option without implementing its readiness contract. The proposed fixture uses standard Playwright APIs.

The supplied article is kept verbatim separately. Its production-defect certainty, majority-of-bugs statements, exhaustive npmx settings coverage and blanket full-page replacement description are not adopted. A browser-only global on the server may throw before hydration; this is not itself a hydration mismatch.

# Local fixture probe

Executed the exact slide fixture in an isolated temporary directory using the existing shop Playwright installation. A clean page passed. A second test emitted `Hydration completed but contains mismatches.` through the browser console and failed specifically in the fixture teardown with `Keine Hydration-Mismatches`. This proves listener setup and automatic assertion behavior, not a new SSR/hydration run against the shop. No dependency or external shop source was changed.
