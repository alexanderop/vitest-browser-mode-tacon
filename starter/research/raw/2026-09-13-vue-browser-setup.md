---
kind: note
title: Interactive Browser Mode setup from a fresh Vue Vite project
url: https://vitest.dev/guide/browser/
author: Alexander Opalic and Codex
publisher: Local source inspection and execution
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Accepted direction

Add a brief, interactive setup sequence immediately after the provider diagram. Use the existing code-editor layout, file tabs and Shiki Magic Move. Begin with a fresh Vue TypeScript Vite starter, install dependencies, construct the Vitest configuration, then run a first component test. This is a clickable code walkthrough; terminal blocks display commands and do not execute them inside Slidev.

# Primary references checked

- https://vite.dev/guide/ — create-vite and the vue-ts template.
- https://vitest.dev/guide/browser/ — manual installation, enabled, provider and Chromium instances.
- https://vitest.dev/api/browser/vue.html — awaited Vue rendering and locator assertions.
- Local pinned Vitest documentation: `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest/docs/config/index.md`, lines 55–65, demonstrates mergeConfig with an existing Vite configuration. See the [pinned source record](2026-08-18-vitest-4-1-11-browser-mode-documentation.md).
- https://sli.dev/features/shiki-magic-move — click-driven transitions and line highlights.

# Execution evidence

Created a fresh create-vite vue-ts project in a temporary directory, installed the dependencies shown on the slide, extracted the final configuration and test verbatim from slides.md, installed Chromium and ran `pnpm exec vitest run --browser.headless`.

Resolved versions: Vite 8.3.0, Vue 3.5.42, Vitest and @vitest/browser-playwright 5.0.0, vitest-browser-vue 3.1.0, Playwright 1.63.0. These are observed verification versions, not package pins added to the presentation repository.

The current HelloWorld.vue has no msg prop and renders `Count is 0`. Clicking changes its visible text to `Count is 1`. The final slide uses this exact expected string. Result: 1 test file passed, 1 test passed, 801 ms. A Vite plugin-hook warning remains upstream; it did not fail the test. No demo dependencies were added to the deck repository.

Chromium checks confirmed the JSDOM highlight sequence and the configuration's automatic file switch from vite.config.ts to vitest.config.ts. The setup examples were visually inspected at 1440 × 810.
