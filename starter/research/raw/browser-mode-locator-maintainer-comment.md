---
kind: note
title: Browser Mode locator API correction supplied by the user
url: unknown
author: unknown
publisher: unknown
published: unknown
collected: 2026-09-12
status: complete
---

# Origin

User-pasted comment in the talk discussion, followed by approval to add the proposed shop-based explanation. The commenter describes themselves as a Browser Mode maintainer. No canonical comment URL, author identity, or publication date was supplied. The duplicated and broken code and interface text below are preserved as supplied.

## Supplied content

Awesome article! Looks a lot like what I am doing in my own projects.

As a maintainer of Browser Mode, I just want to point out some API inconsistencies that I found in the article and I won't be able to sleep if people on the internet won't know about it!

`locator.element()` is sync, and `expect.element()` is async. For example, here there is no need to await the element anywhere which reduces the number of keywords on the screen drastically:

```text
  // 1. Find the "Start" b
  // 1. Find the "Start" button and click it
  await userEvent.click(page.getByRole('button', { name: /start/i }).element())

  // 2. Type "100" into the weight input
  const weightInput = page.getByRole('spinbutton', { name: /weight/i })
  await userEvent.type(weightInput.element(), '100')

  // 3. Click "Complete"
  await userEvent.click(page.getByRole('button', { name: /complete/i }).element())
utton and click it
  await
 userEvent.click(page.getByRole('button', { name: /start/i }).element())

  // 2. Type "100" into the weight input
  const
 weightInput = page.getByRole('spinbutton', { name: /weight/i })
  await
 userEvent.type(weightInput.element(), '100')

  // 3. Click "Complete"
  await
 userEvent.click(page.getByRole('button', { name: /complete/i }).element())
```

What is even better is that you don't even need to use `locator.element()`. It's an escape hatch for library authors and internal matchers, all Vitest APIs accept a locator, so this code can be simplified even more:

```text
  // 1. Find the "Start" b
  // 1. Find the "Start" button and click it
  await userEvent.click(page.getByRole('button', { name: /start/i }))

  // 2. Type "100" into the weight input
  const weightInput = page.getByRole('spinbutton', { name: /weight/i })
  await userEvent.type(weightInput, '100')

  // 3. Click "Complete"
  await userEvent.click(page.getByRole('button', { name: /complete/i }))
utton and click it
  await
 userEvent.click(page.getByRole('button', { name: /start/i }))

  // 2. Type "100" into the weight input
  const
 weightInput = page.getByRole('spinbutton', { name: /weight/i })
  await
 userEvent.type(weightInput, '100')

  // 3. Click "Complete"
  await
 userEvent.click(page.getByRole('button', { name: /complete/i }))
```

This is much better because the locator will also be _retried_ by these events. If element didn't render in time, `click` and `type` will _wait_ until it's in the DOM. `locator.element()` resolves the element immediately and throws an error if it's not in the DOM.

(As a note, you can also just use the `click` method on the locator itself)

Upvote
4

Downvote

Reply

Award

Share

## Primary API evidence checked for the talk

- [Official locators](https://vitest.dev/api/browser/locators#element): `element(): Element` resolves synchronously and throws for no match or multiple matches. Locators preserve query retrying for interactions. Raw nodes are an escape hatch for external APIs that cannot accept locators.
- [Official assertions](https://vitest.dev/api/browser/assertions): await the `expect.element(locator).matcher()` assertion, which retries until success or timeout.
- [Official interactions](https://vitest.dev/api/browser/interactivity): Vitest's `userEvent` accepts locators for `click` and `type`. Do not confuse it with Testing Library's similarly named API.
- Local documentation inspected in `/Users/alexanderopalic/Projects/opensource/vitest-dev/vitest/docs/api/browser/`: `locators.md`, `interactivity.md`. Earlier pinned documentation is catalogued in [the existing capture](2026-08-18-vitest-4-1-11-browser-mode-documentation.md).

## Accepted use in the talk

One code slide between the click round-trip and assertion explanation, using the shop story. Show raw-node click, locator-backed userEvent click, and locator.click as alternatives. Replace the assertion illustration with the target/action/assertion code. Keep the synchronous-versus-awaited rule visible. Plan one extra minute, taking the former reserve in the 45-minute slot. The German labels are illustrative, not an executable excerpt from Claw & Chew. No new test execution or flakiness measurement is claimed.
