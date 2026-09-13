---
kind: file
title: Browser Mode slide audit against the local Vitest source
url: https://github.com/vitest-dev/vitest/tree/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2
author: Vitest contributors
publisher: Local source inspection
published: unknown
collected: 2026-09-13
status: complete
---

# Browser Mode slide audit

Read-only inspection of `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest`, clean HEAD `9bd8d464e6328c567c2dbcd8fdd977d57a9425c2`, package version 4.1.11. The deck is `starter/slides.md`. This checks source/API compatibility, not every demo's runtime behavior. The earlier fresh-project setup record used Vitest 5.0.0; it is separate evidence and does not change this checkout's version.

## Findings and changes

- Corrected `expect.element(...).toHaveText(...)` to `toHaveTextContent(...)`: the former is not in the browser matcher registry.
- Awaited the SPA `render(App, ...)` example consistently with the Vue renderer documentation. The old synchronous form is deprecated in this version.
- Narrowed the screenshot target with `instanceof HTMLImageElement` before `.decode()`: `.element()` returns `HTMLElement | SVGElement`, so the original snippet was not strict-TypeScript-safe even when its runtime target was an image.
- Clarified the click diagram's alt text: Playwright waits for a target that receives pointer events; a persistent overlay leads to timeout. The diagram is a simplified command/result flow, not a literal protocol trace. The provider delegates to Playwright; its actionability details are documented at https://playwright.dev/docs/actionability (checked 2026-09-13).

## Confirmed explanations

- Vite config must be explicitly merged when using a separate Vitest config; the shown object-config merge is valid.
- Browser test code and mounted components execute in a browser iframe. Isolation creates an iframe per test file, not per individual test case.
- Locator click calls `__vitest_click`, transported over WebSocket RPC to Node, then delegated to the Playwright iframe locator.
- `userEvent.click(locator)` and `locator.click()` preserve locator semantics. `.element()` resolves synchronously and throws when absent. A raw node does not disable all later actionability waiting; it loses the deferred initial lookup.
- `expect.element` uses `expect.poll` and re-resolves a supplied locator. A bare `expect` does not generally retry DOM assertions.
- `expect(locator).toMatchScreenshot(...)` is valid: that asynchronous matcher explicitly accepts a locator and performs its own screenshot command. It is not evidence that ordinary `expect` assertions retry.
- ARIA snapshots are generated from the DOM through Ivya's `generateAriaTree`. They are not a recording of a screen reader or proof of complete accessibility.
- Preview uses simulated user events and rejects headless mode. The guide recommends Playwright/WebdriverIO for CI.
- Direct client mounts do not exercise the Nuxt server HTML and hydration path. The deck's separate E2E scope and accessibility limitations are appropriately qualified.

## Limits

The live Vitest assertion docs at https://vitest.dev/api/browser/assertions use newer API wording (`toMatchTextContent`, changed polling details). Do not silently treat those as the implementation of this 4.1.11 checkout. Version-wide migration is outside this review. Performance case studies and shop-specific failure outcomes remain supported by their existing source/execution records, not by inspecting Vitest internals.

## Selected verbatim source excerpts

### packages/browser/src/client/tester/expect/index.ts:19-57

```
import toHaveFocus from './toHaveFocus'
import toHaveFormValues from './toHaveFormValues'
import toHaveRole from './toHaveRole'
import toHaveSelection from './toHaveSelection'
import toHaveStyle from './toHaveStyle'
import toHaveTextContent from './toHaveTextContent'
import toHaveValue from './toHaveValue'
import toMatchScreenshot from './toMatchScreenshot'

export const matchers: MatchersObject = {
  toBeDisabled,
  toBeEnabled,
  toBeEmptyDOMElement,
  toBeInTheDocument,
  toBeInViewport,
  toBeInvalid,
  toBeRequired,
  toBeValid,
  toBeVisible,
  toContainElement,
  toContainHTML,
  toHaveAccessibleDescription,
  toHaveAccessibleErrorMessage,
  toHaveAccessibleName,
  toHaveAttribute,
  toHaveClass,
  toHaveFocus,
  toHaveFormValues,
  toHaveStyle,
  toHaveTextContent,
  toHaveValue,
  toHaveDisplayValue,
  toBeChecked,
  toBePartiallyChecked,
  toHaveRole,
  toHaveSelection,
  toMatchScreenshot,
}
```

### packages/browser/src/client/tester/expect-element.ts:17-54

```
  const expectElement = expect.poll<HTMLElement | SVGElement | null>(function element(this: object) {
    if (elementOrLocator instanceof Element || elementOrLocator == null) {
      return elementOrLocator
    }

    const isNot = chai.util.flag(this, 'negate') as boolean
    const name = chai.util.flag(this, '_name') as string
    // special case for `toBeInTheDocument` matcher
    if (isNot && name === 'toBeInTheDocument') {
      return elementOrLocator.query()
    }
    if (name === 'toHaveLength') {
      // we know that `toHaveLength` requires multiple elements,
      // but types generally expect a single one
      return elementOrLocator.elements() as unknown as HTMLElement
    }

    if (name === 'toMatchScreenshot' && !chai.util.flag(this, '_poll.assert_once')) {
      // `toMatchScreenshot` should only run once after the element resolves
      chai.util.flag(this, '_poll.assert_once', true)
    }

    // element selector uses prettyDOM under the hood, which is an expensive call
    // that should not be called on each failed locator attempt to avoid memory leak:
    // https://github.com/vitest-dev/vitest/issues/7139
    const isLastPollAttempt = chai.util.flag(this, '_isLastPollAttempt')

    if (isLastPollAttempt) {
      return elementOrLocator.element()
    }

    const result = elementOrLocator.query()

    if (!result) {
      throw new Error(`Cannot find element with locator: ${JSON.stringify(elementOrLocator)}`)
    }

    return result
```

### packages/browser/src/client/tester/locators/index.ts:89-92

```

  public click(options?: UserEventClickOptions): Promise<void> {
    return this.triggerCommand<void>('__vitest_click', this.selector, options)
  }
```

### packages/browser/src/client/tester/locators/index.ts:288-299

```
  public query(): HTMLElement | SVGElement | null {
    const parsedSelector = this._parsedSelector || (this._parsedSelector = selectorEngine.parseSelector(this._pwSelector || this.selector))
    return selectorEngine.querySelector(parsedSelector, document.documentElement, true) as HTMLElement | SVGElement
  }

  public element(): HTMLElement | SVGElement {
    const element = this.query()
    if (!element) {
      throw utils.getElementError(this._pwSelector || this.selector, this._container || document.body)
    }
    return element
  }
```

### packages/browser/context.d.ts:670-677

```
   *
   * - If multiple elements match the selector, an error is thrown.
   * - If no elements match the selector, an error is thrown.
   *
   * @see {@link https://vitest.dev/api/browser/locators#element}
   */
  element(): HTMLElement | SVGElement
  /**
```

### packages/browser/src/client/tester/context.ts:65-70

```
    },
    click(element, options) {
      return convertToLocator(element).click(options)
    },
    dblClick(element, options) {
      return convertToLocator(element).dblClick(options)
```

### packages/browser-playwright/src/commands/click.ts:1-11

```
import type { UserEvent } from 'vitest/browser'
import type { UserEventCommand } from './utils'
import { getDescribedLocator } from './utils'

export const click: UserEventCommand<UserEvent['click']> = async (
  context,
  selector,
  options = {},
) => {
  await getDescribedLocator(context, selector).click(options)
}
```

### packages/browser/src/client/tester/expect/toMatchScreenshot.ts:12-18

```
export default async function toMatchScreenshot(
  this: MatcherState,
  actual: Element | Locator,
  nameOrOptions?: ScreenshotMatcherOptions | string,
  options: ScreenshotMatcherOptions = typeof nameOrOptions === 'object'
    ? nameOrOptions
    : {},
```

### packages/browser/src/client/tester/aria.ts:17-23

```
  name: 'aria',

  capture(received) {
    if (received instanceof Element) {
      return generateAriaTree(received)
    }
    throw new TypeError('aria adapter expects an Element')
```

### packages/browser/src/client/orchestrator.ts:88-111

```
    if (config.browser.isolate === false) {
      await this.runNonIsolatedTests(container, options, startTime, orchestratorSpan.context)
      await endSpan()
      return
    }

    this.iframes.forEach(iframe => iframe.remove())
    this.iframes.clear()
    this.readyIframes.clear()
    this.readyWaiters.clear()

    for (let i = 0; i < options.files.length; i++) {
      if (this.cancelled) {
        await endSpan()
        return
      }

      const file = options.files[i]
      debug('create iframe', file.filepath)

      await this.runIsolatedTestInIframe(
        container,
        file,
        options,
```

### docs/api/browser/vue.md:46-60

```
The `render` function records a `vue.render` trace mark, visible in the [Trace View](/guide/browser/trace-view).

::: warning
Synchronous usage of `render` is deprecated and will be removed in the next major version. Please always `await` the result:

```ts
const screen = render(Component) // [!code --]
const screen = await render(Component) // [!code ++]
```
:::

### Options

The `render` function supports all [`mount` options](https://test-utils.vuejs.org/api/#mount) from `@vue/test-utils` (except `attachTo` - use `container` instead). In addition to them, there are also `container` and `baseElement`.

```

### docs/guide/browser/index.md:58-58

```
However, to run tests in CI you need to install either [`playwright`](https://npmx.dev/package/playwright) or [`webdriverio`](https://npmx.dev/package/webdriverio). We also recommend switching to either one of them for testing locally instead of using the default `preview` provider since it relies on simulating events instead of using Chrome DevTools Protocol.
```
