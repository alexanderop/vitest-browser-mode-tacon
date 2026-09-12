---
kind: note
title: Local Vitest inspection and Claw & Chew axe Browser Mode proof
url: https://github.com/dequelabs/axe-core/blob/develop/doc/API.md
author: Codex local inspection
publisher: Local checkout evidence
published: 2026-09-12
collected: 2026-09-12
status: complete
---

Inspected `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest` at `9bd8d464e6328c567c2dbcd8fdd977d57a9425c2`. A case-insensitive whole-checkout search for the word axe and AxeBuilder (excluding lockfile and snapshots) found no integration example. `docs/guide/browser/component-testing.md`, section Test Accessibility, shows keyboard navigation, focus and ARIA attributes. This is a finding about this checkout, not a claim that no third-party integration exists.

Existing shop test: `/Users/alexanderopalic/Projects/opensource/claw-and-chew/app/checkout/CheckoutForm.browser.test.ts`. Browser setup imports application CSS; config uses Playwright Chromium, headless. Installed package declarations: Vitest 5.0.0, vitest-browser-vue 3.1.0, axe-core ^4.13.0.

```ts
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import axe from 'axe-core'
import CheckoutForm from './CheckoutForm.vue'

test('reports no contrast violations in the checkout notice', async () => {
  const screen = await render(CheckoutForm, { props: { total: 2250 } })
  const notice = screen.getByText(/This is a demo shop\./)
  await expect.element(notice).toBeVisible()

  const results = await axe.run(notice.element(), { runOnly: ['color-contrast'] })

  expect(results.violations.map((rule) => rule.id)).toEqual([])
  expect(results.incomplete).toEqual([])
  expect(results.passes.find((rule) => rule.id === 'color-contrast')?.nodes.length).toBeGreaterThan(
    0,
  )
})
```

Executed `pnpm test:browser app/checkout/CheckoutForm.browser.test.ts`: 1 test passed in Chromium.

Negative control: copied the exact test to a temporary adjacent test file and injected the existing shopDemoKey with computed `{ id: 'low-contrast-notice', broken: true, narrow: false }`. No production file was mutated. The identical assertion failed with `AssertionError: expected [ 'color-contrast' ] to deeply equal []`. Temporary test removed after the run. Existing user changes in the shop were preserved.

The talk excerpt omits the final passed-rule node-count assertion for space; the original runnable test also proves that the contrast rule evaluated at least one node. The example scans only the notice and explicitly selects color-contrast. Removing runOnly runs default enabled rules in that chosen context, not a whole-application audit. The axe API distinguishes violations, passes and incomplete results; incomplete findings require review. axe is called explicitly by test code, not implicitly enabled by Browser Mode. This verification ran locally, not in hosted CI.
