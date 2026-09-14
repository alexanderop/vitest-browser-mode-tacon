---
kind: file
title: Claw & Chew backup comparisons and recorded failures
url: unknown
author: Alexander Opalic
publisher: local workspace
published: unknown
collected: 2026-09-14
status: complete
---

Inspected local tests and existing scenario artifacts, not a fresh execution. Backup order requested: Claw & Chew false-green examples, Reka UI, then hydration. Existing slide demos are illustrative models, not live test runners. Shortened error excerpts on the slides come from the logs below.

## app/customizer/ShirtCustomizer.dom.test.ts

```text
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/vue'
import CustomizerHost from '../../tests/fixtures/CustomizerHost.vue'

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(
    new DOMRect(0, 0, 400, 235),
  )
  Object.defineProperties(HTMLElement.prototype, {
    setPointerCapture: { configurable: true, value: vi.fn() },
    hasPointerCapture: { configurable: true, value: vi.fn(() => true) },
    releasePointerCapture: { configurable: true, value: vi.fn() },
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  Reflect.deleteProperty(HTMLElement.prototype, 'setPointerCapture')
  Reflect.deleteProperty(HTMLElement.prototype, 'hasPointerCapture')
  Reflect.deleteProperty(HTMLElement.prototype, 'releasePointerCapture')
})

test('moves the print when a held pointer leaves the handle', async () => {
  render(CustomizerHost)
  const handle = screen.getByRole('button', { name: 'Move mascot print' })

  await fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 200, clientY: 106 })
  await fireEvent.pointerMove(handle, { pointerId: 1, buttons: 1, clientX: 300, clientY: 141 })
  await fireEvent.pointerUp(handle, { pointerId: 1 })

  expect(screen.getByLabelText('Print position')).toHaveTextContent('Position: 75%, 60%')
})

test('uses the resized preview dimensions when dragging the print', async () => {
  render(CustomizerHost)
  await fireEvent.click(screen.getByRole('button', { name: 'Resize preview' }))
  const handle = screen.getByRole('button', { name: 'Move mascot print' })
  await fireEvent.pointerDown(handle, { pointerId: 1, button: 0, clientX: 200, clientY: 106 })
  await fireEvent.pointerMove(handle, { pointerId: 1, buttons: 1, clientX: 300, clientY: 141 })
  await fireEvent.pointerUp(handle, { pointerId: 1 })
  expect(screen.getByLabelText('Print position')).toHaveTextContent('Position: 75%, 60%')
})

```

## app/customizer/ShirtCustomizer.browser.test.ts

```text
import { expect, test } from 'vitest'
import type {} from '../../tests/drag-mascot'
import { commands, userEvent } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import CustomizerHost from '../../tests/fixtures/CustomizerHost.vue'

test('moves the print when a held pointer leaves the handle', async () => {
  const screen = await render(CustomizerHost)

  await commands.dragMascot()

  await expect
    .element(screen.getByLabelText('Print position'))
    .toHaveTextContent('Position: 75%, 60%')
})

test('measures the actual preview again when its container narrows', async () => {
  const screen = await render(CustomizerHost)
  await expect.element(screen.getByLabelText('Preview width')).toHaveTextContent('Preview: 400 px')

  await screen.getByRole('button', { name: 'Resize preview' }).click()

  await expect.element(screen.getByLabelText('Preview width')).toHaveTextContent('Preview: 280 px')
})

test('moves the print with the keyboard and resets it', async () => {
  const screen = await render(CustomizerHost)
  await screen.getByRole('button', { name: 'Move mascot print' }).click()
  await userEvent.keyboard('{ArrowRight}{ArrowDown}')
  await expect
    .element(screen.getByLabelText('Print position'))
    .toHaveTextContent('Position: 55%, 50%')
  await screen.getByRole('button', { name: 'Reset' }).click()
  await expect
    .element(screen.getByLabelText('Print position'))
    .toHaveTextContent('Position: 50%, 45%')
})

test('uses the resized preview dimensions when dragging the print', async () => {
  const screen = await render(CustomizerHost)
  await screen.getByRole('button', { name: 'Resize preview' }).click()
  await expect.element(screen.getByLabelText('Preview width')).toHaveTextContent('Preview: 280 px')
  await commands.dragMascot()
  await expect
    .element(screen.getByLabelText('Print position'))
    .toHaveTextContent('Position: 75%, 60%')
})

```

## app/cart/CartDrawer.dom.test.ts

```text
import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/vue'
import userEvent from '@testing-library/user-event'
import FullBagHost from '../../tests/fixtures/FullBagHost.vue'

test('scrolls to the last bag item and removes it', async () => {
  const style = document.createElement('style')
  style.textContent = readFileSync('app/assets/main.css', 'utf8')
  document.head.append(style)
  try {
    render(FullBagHost)
    const user = userEvent.setup()
    await user.click(await screen.findByRole('button', { name: 'Remove Tiny claws sticker pack' }))
    expect(
      screen.queryByRole('button', { name: 'Remove Tiny claws sticker pack' }),
    ).not.toBeInTheDocument()
  } finally {
    style.remove()
  }
})

```

## app/cart/CartDrawer.browser.test.ts

```text
import { expect, test } from 'vitest'
import { commands, page } from 'vitest/browser'
import { render } from 'vitest-browser-vue'
import type {} from '../../tests/scroll-bag'
import FullBagHost from '../../tests/fixtures/FullBagHost.vue'

test('scrolls to the last bag item and removes it', async () => {
  await page.viewport(375, 600)
  try {
    const screen = await render(FullBagHost)
    const remove = screen.getByRole('button', { name: 'Remove Tiny claws sticker pack' })
    const body = document.querySelector('.drawer-body')
    if (!(body instanceof HTMLElement)) throw new Error('Missing bag scroll container')
    await expect
      .poll(
        () => remove.element().getBoundingClientRect().top > body.getBoundingClientRect().bottom,
      )
      .toBe(true)
    await commands.scrollBag()
    await expect
      .poll(
        () => {
          const itemBounds = remove.element().getBoundingClientRect()
          const bodyBounds = body.getBoundingClientRect()
          return (
            body.scrollTop > 0 &&
            itemBounds.top >= bodyBounds.top &&
            itemBounds.bottom <= bodyBounds.bottom
          )
        },
        { message: 'The last bag item must be reachable by wheel scrolling' },
      )
      .toBe(true)
    await remove.click()
    await expect.element(remove).not.toBeInTheDocument()
  } finally {
    await page.viewport(1100, 850)
  }
})

```

## tests/drag-mascot.ts

```text
import type {} from '@vitest/browser-playwright'
import type { BrowserCommand } from 'vitest/node'

export const dragMascot: BrowserCommand<[]> = async ({ page, iframe }) => {
  const handle = await iframe.getByRole('button', { name: 'Move mascot print' }).boundingBox()
  const preview = await iframe.locator('.print-surface').boundingBox()
  if (!handle || !preview) throw new Error('The print preview must be visible before dragging')
  await page.mouse.move(handle.x + handle.width / 2, handle.y + handle.height / 2)
  await page.mouse.down()
  try {
    await page.mouse.move(preview.x + preview.width * 0.75, preview.y + preview.height * 0.6)
  } finally {
    await page.mouse.up()
  }
}

declare module 'vitest/browser' {
  interface BrowserCommands {
    dragMascot: () => Promise<void>
  }
}

```

## artifacts/scenarios/missing-pointer-capture-baseline-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 67ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:35
   Duration  624ms (environment 43%, transform 23%, setup 14%, tests 12%, import 8%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-baseline-jsdom.json


```

## artifacts/scenarios/missing-pointer-capture-baseline-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 3 skipped) 119ms

 Test Files  1 passed (1)
      Tests  1 passed | 3 skipped (4)
   Start at  23:09:36
   Duration  866ms (tests 48%, import 21%, worker 18%, setup 13%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-baseline-browser.json


```

## artifacts/scenarios/missing-pointer-capture-broken-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 56ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:37
   Duration  626ms (environment 45%, transform 22%, setup 15%, tests 10%, import 8%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-broken-jsdom.json


```

## artifacts/scenarios/missing-pointer-capture-broken-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ❯ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 1 failed | 3 skipped) 14961ms
   × moves the print when a held pointer leaves the handle 14961ms
   ↓ measures the actual preview again when its container narrows
   ↓ moves the print with the keyboard and resets it
   ↓ uses the resized preview dimensions when dragging the print

 Test Files  1 failed (1)
      Tests  1 failed | 3 skipped (4)
   Start at  23:09:38
   Duration  15.69s (tests 99%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-broken-browser.json


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts:7 > moves the print when a held pointer leaves the handle
Error: expect(element).toHaveTextContent()

Expected element to have text content:
  Position: 75%, 60%
Received:
  Position: 50%, 45%

Failure screenshot:
  - .vitest/attachments/failure-screenshots/ShirtCustomizer.browser.test.ts/moves-the-print-when-a-held-pointer-leaves-the-handle.png

 ❯ Proxy.__VITEST_POLL_CHAIN__ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5764:47
 ❯ app/customizer/ShirtCustomizer.browser.test.ts:14:6
     12|   await expect
     13|     .element(screen.getByLabelText('Print position'))
     14|     .toHaveTextContent('Position: 75%, 60%')
       |      ^
     15| })
     16|
 ❯ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/plugins.Cigb0uSy-CcrDkTQx.js?v=4a4cb7a4:4951:20

Caused by: Error: Matcher did not succeed in time.
 ❯ throwWithCause node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5744:34
 ❯ promise node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5829:7

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


```

## artifacts/scenarios/missing-pointer-capture-fixed-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 64ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:54
   Duration  785ms (environment 51%, transform 18%, setup 16%, tests 9%, import 6%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-fixed-jsdom.json


```

## artifacts/scenarios/missing-pointer-capture-fixed-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 3 skipped) 90ms

 Test Files  1 passed (1)
      Tests  1 passed | 3 skipped (4)
   Start at  23:09:56
   Duration  833ms (tests 42%, import 24%, worker 21%, setup 12%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/missing-pointer-capture-fixed-browser.json


```

## artifacts/scenarios/unscrollable-bag-baseline-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/cart/CartDrawer.dom.test.ts (1 test) 171ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:51
   Duration  982ms (environment 39%, import 21%, tests 19%, setup 13%, transform 8%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-baseline-jsdom.json


```

## artifacts/scenarios/unscrollable-bag-baseline-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/cart/CartDrawer.browser.test.ts (1 test) 189ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:53
   Duration  977ms (tests 43%, setup 28%, import 19%, worker 10%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-baseline-browser.json


```

## artifacts/scenarios/unscrollable-bag-broken-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/cart/CartDrawer.dom.test.ts (1 test) 169ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:54
   Duration  823ms (environment 33%, import 25%, tests 22%, setup 11%, transform 9%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-broken-jsdom.json


```

## artifacts/scenarios/unscrollable-bag-broken-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ❯ |browser (chromium)| app/cart/CartDrawer.browser.test.ts (1 test | 1 failed) 1155ms
   × scrolls to the last bag item and removes it 1154ms

 Test Files  1 failed (1)
      Tests  1 failed (1)
   Start at  23:08:55
   Duration  1.94s (tests 82%, setup 9%, import 6%, worker 3%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-broken-browser.json


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |browser (chromium)| app/cart/CartDrawer.browser.test.ts:7 > scrolls to the last bag item and removes it
AssertionError: The last bag item must be reachable by wheel scrolling: expected false to be true // Object.is equality

Failure screenshot:
  - .vitest/attachments/failure-screenshots/CartDrawer.browser.test.ts/scrolls-to-the-last-bag-item-and-removes-it.png

- Expected
+ Received

- true
+ false

 ❯ Proxy.__VITEST_POLL_CHAIN__ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5764:47
 ❯ app/cart/CartDrawer.browser.test.ts:33:8
     31|         { message: 'The last bag item must be reachable by wheel scrol…
     32|       )
     33|       .toBe(true)
       |        ^
     34|     await remove.click()
     35|     await expect.element(remove).not.toBeInTheDocument()
 ❯ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/plugins.Cigb0uSy-CcrDkTQx.js?v=4a4cb7a4:4951:20

Caused by: Error: Matcher did not succeed in time.
 ❯ throwWithCause node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5744:34
 ❯ promise node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5829:7
 ❯ app/cart/CartDrawer.browser.test.ts:20:5
 ❯ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/plugins.Cigb0uSy-CcrDkTQx.js?v=4a4cb7a4:4951:20

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


```

## artifacts/scenarios/unscrollable-bag-fixed-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/cart/CartDrawer.dom.test.ts (1 test) 172ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:57
   Duration  823ms (environment 33%, import 25%, tests 22%, setup 11%, transform 9%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-fixed-jsdom.json


```

## artifacts/scenarios/unscrollable-bag-fixed-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/cart/CartDrawer.browser.test.ts (1 test) 184ms

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:08:58
   Duration  995ms (tests 41%, setup 27%, import 19%, worker 13%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/unscrollable-bag-fixed-browser.json


```

## artifacts/scenarios/fixed-preview-width-baseline-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 61ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:00
   Duration  638ms (environment 43%, transform 24%, setup 14%, tests 10%, import 8%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-baseline-jsdom.json


```

## artifacts/scenarios/fixed-preview-width-baseline-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 3 skipped) 138ms

 Test Files  1 passed (1)
      Tests  1 passed | 3 skipped (4)
   Start at  23:09:01
   Duration  883ms (tests 51%, import 19%, worker 17%, setup 13%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-baseline-browser.json


```

## artifacts/scenarios/fixed-preview-width-broken-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 62ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:02
   Duration  634ms (environment 43%, transform 22%, setup 16%, tests 11%, import 8%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-broken-jsdom.json


```

## artifacts/scenarios/fixed-preview-width-broken-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ❯ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 1 failed | 3 skipped) 14968ms
   ↓ moves the print when a held pointer leaves the handle
   ↓ measures the actual preview again when its container narrows
   ↓ moves the print with the keyboard and resets it
   × uses the resized preview dimensions when dragging the print 14967ms

 Test Files  1 failed (1)
      Tests  1 failed | 3 skipped (4)
   Start at  23:09:03
   Duration  15.72s (tests 99%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-broken-browser.json


⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts:39 > uses the resized preview dimensions when dragging the print
Error: expect(element).toHaveTextContent()

Expected element to have text content:
  Position: 75%, 60%
Received:
  Position: 53%, 60%

Failure screenshot:
  - .vitest/attachments/failure-screenshots/ShirtCustomizer.browser.test.ts/uses-the-resized-preview-dimensions-when-dragging-the-print.png

 ❯ Proxy.__VITEST_POLL_CHAIN__ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5764:47
 ❯ app/customizer/ShirtCustomizer.browser.test.ts:46:6
     44|   await expect
     45|     .element(screen.getByLabelText('Print position'))
     46|     .toHaveTextContent('Position: 75%, 60%')
       |      ^
     47| })
     48|
 ❯ node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/plugins.Cigb0uSy-CcrDkTQx.js?v=4a4cb7a4:4951:20

Caused by: Error: Matcher did not succeed in time.
 ❯ throwWithCause node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5744:34
 ❯ promise node_modules/.vite/vitest/ef98362b8a6b0c8cd804b0d227aa1ffeaba89786/deps/index.OVGXnVRj-BKBb2EpJ.js?v=4a4cb7a4:5829:7

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


```

## artifacts/scenarios/fixed-preview-width-fixed-jsdom.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |jsdom| app/customizer/ShirtCustomizer.dom.test.ts (2 tests | 1 skipped) 60ms

 Test Files  1 passed (1)
      Tests  1 passed | 1 skipped (2)
   Start at  23:09:19
   Duration  800ms (environment 51%, transform 19%, setup 16%, tests 8%, import 6%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-fixed-jsdom.json


```

## artifacts/scenarios/fixed-preview-width-fixed-browser.log

```text

 RUN  v5.0.0 /Users/alexanderopalic/Projects/opensource/claw-and-chew

 ✓ |browser (chromium)| app/customizer/ShirtCustomizer.browser.test.ts (4 tests | 3 skipped) 137ms

 Test Files  1 passed (1)
      Tests  1 passed | 3 skipped (4)
   Start at  23:09:20
   Duration  880ms (tests 52%, import 19%, worker 16%, setup 13%)

JSON report written to /Users/alexanderopalic/Projects/opensource/claw-and-chew/artifacts/scenarios/fixed-preview-width-fixed-browser.json


```

