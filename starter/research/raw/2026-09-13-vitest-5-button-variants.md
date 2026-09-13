---
kind: note
title: Vitest 5 visual regression for a Vue button gallery
url: https://main.vitest.dev/guide/browser/visual-regression-testing
author: Vitest contributors and Codex
publisher: Official Vitest documentation and local teaching example
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Source verification

Checked the official development documentation on 2026-09-13:
- https://main.vitest.dev/guide/browser/visual-regression-testing
- https://main.vitest.dev/api/browser/assertions#tomatchscreenshot

The guide documents native `await expect(locator).toMatchScreenshot(name)`, reviewable baseline images, reference/actual/diff output, and `--update`. A diff image requires equal screenshot dimensions with the default comparator. The matcher has screenshot stabilization; environmental consistency still matters. The existing [Vitest 5 setup execution](2026-09-13-vue-browser-setup.md) records the installed 5.0.0 browser environment. This task adds slides, not a new executed Vitest test or a package migration.

# User-supplied article

See [the preserved pasted article](visual-regression-testing-vue-vitest-user-article.md). Its useful design is a gallery of explicitly chosen component stories: props, slots and states rendered in one container. Its old configuration and future-native-comparison claim are historical. The screenshot-path truthiness assertion only checks that a path was returned; it does not compare appearance. Base64 text snapshots lack the image comparator's tolerance and visual diff facilities.

# Editorial application

Three slides follow the ProductCard matcher example: a 3-by-4 button gallery, the gallery fixture plus native matcher, and a schematic missing-variant comparison. Primary, secondary and outline each show small, medium, large and disabled. The teaching components render editable real HTML buttons; the comparison is explicitly schematic and is not claimed as a Vitest execution artifact. Its fixed-size cells make the missing outline-disabled button easy to locate.

A baseline can reveal that previously captured content disappeared or changed. It cannot infer a variant that never appeared in the reviewed fixture. Small curated galleries are useful for base components; this is not a recommendation to multiply every state of every application screen. Actual images, when present, need loading/decode synchronization in addition to fonts. Keep browser, OS, viewport and rendering settings consistent. Behavior and accessibility assertions remain separate.
