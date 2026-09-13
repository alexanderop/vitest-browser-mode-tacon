---
kind: note
title: ProductCard Browser Mode test and recorded blocked click failure
url: unknown
author: Codex
publisher: local workspace
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Source inspection

Inspected the current test and existing scenario artifact in `/Users/alexanderopalic/Projects/opensource/claw-and-chew`. This is an existing recorded run, not a fresh execution. The log identifies Vitest 5.0.0 and Chromium. The broken scenario changes `.product-decoration` from `pointer-events: none` to `pointer-events: auto`.

## app/catalog/ProductCard.browser.test.ts

```ts
import { expect, test } from 'vitest'
import { render } from 'vitest-browser-vue'
import ProductCardHost from '../../tests/fixtures/ProductCardHost.vue'

test('adds a plush to the bag through the product button', async () => {
  const screen = await render(ProductCardHost)

  await screen
    .getByRole('button', { name: 'Add The little claw plush to bag' })
    .click({ timeout: 1500 })

  await expect.element(screen.getByLabelText('Bag count')).toHaveTextContent('1 items in bag')
})
```

## artifacts/scenarios/blocked-button-broken-browser.log

ANSI formatting removed; content preserved.

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ❯ |browser (chromium)| app/catalog/ProductCard.browser.test.ts (1 test | 1 failed) 1610ms
   × adds a plush to the bag through the product button 1610ms

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  17:13:38
   Duration  2.36s (tests 92%, worker 3%, import 3%, setup 2%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/blocked-button-broken-browser.json


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |browser (chromium)| app/catalog/ProductCard.browser.test.ts:5 > adds a plush to the bag through the product button
TimeoutError: locator.click: Timeout 1500ms exceeded.
Call log:
  - waiting for locator('[data-vitest="true"]').contentFrame().getByTestId('__vitest_0__').getByRole('button', { name: 'Add The little claw plush to bag', exact: true })
    - locator resolved to <button data-v-e1d027fe="" class="add-button" aria-label="Add The little claw plush to bag">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-v-e1d027fe="" aria-hidden="true" class="product-decoration"></span> intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-v-e1d027fe="" aria-hidden="true" class="product-decoration"></span> intercepts pointer events
    - retrying click action
      - waiting 100ms
    3 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <span data-v-e1d027fe="" aria-hidden="true" class="product-decoration"></span> intercepts pointer events
    - retrying click action
      - waiting 500ms


Failure screenshot:
  - .vitest/attachments/failure-screenshots/ProductCard.browser.test.ts/adds-a-plush-to-the-bag-through-the-product-button.png

 ❯ app/catalog/ProductCard.browser.test.ts:10:6
      8|   await screen
      9|     .getByRole('button', { name: 'Add The little claw plush to bag' })
     10|     .click({ timeout: 1500 })
       |      ^
     11|
     12|   await expect.element(screen.getByLabelText('Bag count')).toHaveTextC…
 ❯ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/plugins.Cigb0uSy-CcrDkTQx.js?v=4a4cb7a4:4951:20

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

```

# Slide use

Two slides immediately follow “Der Browser findet den Fehler”: the actual test with only assertion line wrapping changed, then a shortened original error excerpt. The overlay line is shown separately with its class and exact diagnostic phrase; generated Vue attributes and repeated retries are omitted. The awaited click rejects after its explicit 1500 ms timeout, so control never reaches the subsequent bag assertion.
