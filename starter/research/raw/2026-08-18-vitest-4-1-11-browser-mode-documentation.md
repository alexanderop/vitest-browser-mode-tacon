---
kind: file
title: Vitest 4.1.11 Browser Mode documentation
url: https://github.com/vitest-dev/vitest/tree/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs
author: Vitest contributors
publisher: Vitest
published: 2026-08-18
collected: 2026-09-11
status: complete
---

# Vitest 4.1.11 Browser Mode documentation

This source records the Browser Mode documentation included in the local Vitest checkout at `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest`.

- Git commit: `9bd8d464e6328c567c2dbcd8fdd977d57a9425c2`
- Git branch: `pinned/4.1.11`
- Release commit date: 2026-08-18
- Upstream repository: `https://github.com/vitest-dev/vitest.git`

The commit pins every document below. Follow a link to read the exact source captured for this research entry.

## Guides

- [Why Browser Mode](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/why.md)
- [Browser Mode setup, configuration, compatibility, and limitations](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/index.md)
- [Component testing](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/component-testing.md)
- [Multiple browser setups](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/multiple-setups.md)
- [ARIA snapshots](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/aria-snapshots.md)
- [Visual regression testing](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/visual-regression-testing.md)
- [Trace view](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/guide/browser/trace-view.md)

## Browser APIs

- [Browser context](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/context.md)
- [Locators](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/locators.md)
- [Interactions](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/interactivity.md)
- [Assertions](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/assertions.md)
- [Commands](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/commands.md)
- [Vue renderer](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/vue.md)
- [React renderer](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/react.md)
- [Svelte renderer](https://github.com/vitest-dev/vitest/blob/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/api/browser/svelte.md)

## Configuration reference

The [`docs/config/browser` directory](https://github.com/vitest-dev/vitest/tree/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2/docs/config/browser) contains the reference pages for providers, instances, browser selection, headless mode, the browser UI, viewports, traces, locators, commands, screenshot output, isolation, and the browser API server.

## Evidence selected for the talk

- Browser Mode runs tests in a native browser and exposes browser globals such as `window` and `document`.
- Vitest requires a browser provider. The `preview` provider simulates events and is not for continuous integration. The guide recommends Playwright or WebdriverIO for continuous integration and local testing.
- The component-testing guide recommends Browser Mode for components that depend on the real DOM, CSS rendering, browser APIs, event propagation, focus, or accessibility behavior.
- `page.getBy*` queries return composable locators. Vitest can retry locator interactions and `expect.element` assertions.
- `vitest-browser-vue` renders Vue components and returns Vitest locators. Its `render` result must be awaited because synchronous use is deprecated.
- ARIA snapshots compare the accessibility tree through `toMatchAriaSnapshot`. The guide marks this feature experimental as of Vitest 4.1.4.
- Visual regression tests use `toMatchScreenshot`. Vitest waits for a stable screenshot before it compares the image with a reference.
- Multiple browser instances share one Vite server. The guide presents shared transforms and dependency pre-bundling as the advantage over separate test projects.
- Playwright traces can retain failed runs and link Vitest assertions and interactions to the source line that triggered them.
- Browser Mode cannot use native thread-blocking dialogs without hanging its communication channel. Vitest replaces `alert` and `confirm` with default mocks.
- Native browser ESM seals module namespace objects. Tests cannot use `vi.spyOn` on an imported namespace and must use `vi.mock(path, { spy: true })` when they need export spies.

## Documentation tension

The current documentation gives two different maturity signals. The component-testing guide recommends Browser Mode for component testing and continuous integration. The short "Why Browser Mode" page still calls Browser Mode early-stage and recommends augmenting it with a standalone browser test runner. The talk must present this as a documentation inconsistency, not as one settled recommendation.
