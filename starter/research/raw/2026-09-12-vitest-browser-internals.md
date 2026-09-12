---
kind: file
title: Vitest Browser Mode implementation inspection
url: https://github.com/vitest-dev/vitest/tree/9bd8d464e6328c567c2dbcd8fdd977d57a9425c2
author: Vitest contributors
publisher: Vitest
published: unknown
collected: 2026-09-12
status: complete
---

# Vitest Browser Mode implementation inspection

Read-only inspection of the clean local checkout at `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest`, HEAD `9bd8d464e`. The following are verbatim selected source excerpts, not runtime measurements. Scope: iframe execution, command transport, Playwright click delegation, retried assertions and result reporting.


## packages/browser/src/client/orchestrator.ts:87-113

```ts

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
        startTime,
        orchestratorSpan.context,
```


## packages/browser/src/client/tester/tester.ts:207-220

```ts
    state.filepath = file.filepath
    debug?.('running test file', file.filepath)

    await traces.$(
      `vitest.test.runner.${method}.module`,
      { attributes: { 'code.file.path': file.filepath },
      },
      async () => {
        if (method === 'run') {
          await startTests([file], runner)
        }
        else {
          await collectTests([file], runner)
        }
```


## packages/browser/src/client/client.ts:15-22

```ts
  = PAGE_TYPE === 'orchestrator'
    ? getBrowserState().sessionId
    : getBrowserState().testerId
const METHOD = getBrowserState().method
export const ENTRY_URL: string = `${
  location.protocol === 'https:' ? 'wss:' : 'ws:'
}//${HOST}/__vitest_browser_api__?type=${PAGE_TYPE}&rpcId=${RPC_ID}&sessionId=${getBrowserState().sessionId}&projectName=${encodeURIComponent(getBrowserState().config.name || '')}&method=${METHOD}&token=${(window as any).VITEST_API_TOKEN || '0'}`

```


## packages/browser/src/client/client.ts:67-77

```ts
  let tries = reconnectTries

  const ctx: VitestBrowserClient = {
    ws: new WebSocket(ENTRY_URL),
    waitForConnection,
  } as VitestBrowserClient

  let onMessage: Function

  ctx.rpc = createBirpc<WebSocketBrowserHandlers, WebSocketBrowserEvents>(
    {
```


## packages/browser/src/client/client.ts:108-114

```ts
          responseId,
        }
      },
    },
    {
      post: msg => ctx.ws.send(msg),
      on: fn => (onMessage = fn),
```


## packages/browser/src/client/tester/locators/index.ts:89-92

```ts

  public click(options?: UserEventClickOptions): Promise<void> {
    return this.triggerCommand<void>('__vitest_click', this.selector, options)
  }
```


## packages/browser/src/client/tester/tester-utils.ts:162-166

```ts
          )
        }
        try {
          return await rpc.triggerCommand<T>(sessionId, command, filepath, args)
        }
```


## packages/browser/src/node/rpc.ts:329-359

```ts
        async triggerCommand(sessionId, command, testPath, payload) {
          debug?.('[%s] Triggering command "%s"', sessionId, command)
          const provider = project.browser!.provider
          if (!provider) {
            throw new Error('Commands are only available for browser tests.')
          }
          const context = Object.assign(
            {
              testPath,
              project,
              provider,
              contextId: sessionId,
              sessionId,
              triggerCommand: (name: string, ...args: any[]) => {
                return project.browser!.triggerCommand(
                  name as any,
                  context,
                  ...args,
                )
              },
              __ensureCDPHandler: () => globalServer.ensureCDPHandler(sessionId, rpcId),
            },
            provider.getCommandsContext(sessionId),
          ) as any as BrowserCommandContext
          return await project.browser!.triggerCommand(
            command as any,
            context,
            ...payload,
          )
        },
        resolveMock(rawId, importer, options) {
```


## packages/browser-playwright/src/commands/click.ts:1-11

```ts
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


## packages/browser-playwright/src/commands/utils.ts:19-27

```ts

// strip iframe locator part from the trace description e.g.
// - locator('[data-vitest="true"]').contentFrame().getByRole('button')
//     ⇓
// - getByRole('button')
export function getDescribedLocator(
  context: BrowserCommandContext,
  selector: string,
): ReturnType<BrowserCommandContext['iframe']['locator']> {
```


## packages/browser/src/client/tester/expect-element.ts:17-31

```ts
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
```


## packages/browser/src/client/tester/runner.ts:284-286

```ts
    onTaskUpdate = (task: TaskResultPack[], events: TaskEventPack[]): Promise<void> => {
      return rpc().onTaskUpdate(this.method, task, events)
    }
```
