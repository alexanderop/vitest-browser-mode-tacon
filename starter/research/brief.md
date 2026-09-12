# Talk brief

## Working title

Frontend-Testing neu gedacht: Black-Box-Strategie mit Vitest Browser Mode

The [original conference abstract](raw/tacon-2026-original-abstract.md) defines the advertised scope. The session lasts 45 minutes. The current plan reserves 38 minutes for content, five minutes for questions, and two minutes of contingency; a spoken rehearsal remains necessary.

## Audience

TACON attendees interested in frontend testing and test automation. Plan for mixed framework experience. Basic test familiarity is an assumption to confirm.

## Intended outcome

Attendees treat Vitest Browser Mode as the default environment for browser-dependent component tests. They can evaluate a component across three contracts: behavior, accessibility, and visual presentation. They keep pure logic in Node and full application journeys in end-to-end tests.

## Current thesis

The advertised talk presents a black-box testing strategy from a production Vue PWA and a Browser Mode migration of Reka UI. A strong component test strategy covers three contracts: behavior, accessibility, and visual presentation. Vitest Browser Mode supplies the real browser environment needed to test all three against rendered components and trusted interaction.

## Supporting ideas

- Demonstrate behavior assertions instead of internal refs or method calls.
- Introduce behavior, accessibility, and visual regression early as the three recurring component-test contracts, then prove each with one concrete failure.
- Use the blocked-button example for behavior: jsdom dispatches an event while Browser Mode proves that a user can reach the control.
- Use the Reka UI migration for accessibility: combine axe rules, ARIA snapshots for product-specific meaning, and real keyboard/focus interaction. Do not claim that Browser Mode or axe proves complete accessibility.
- Use the ProductCard screenshot comparison for the visual contract: a component can remain operable while its rendered appearance regresses.
- Present the Testing Trophy as the strategic reason to favor integration tests. Treat it as a confidence-versus-cost heuristic, not a prescribed ratio.
- Explain the project's reported 70 percent integration, 20 percent unit, and 10 percent visual/accessibility distribution as a case study.
- Show data factories and page objects in a concrete test.

## Open questions

- Claw & Chew is the user-selected example repository at `/Users/alexanderopalic/Projects/opensource/claw-and-chew`. Its README describes a prepared Nuxt demo shop with simulated checkout, not a production PWA. Explain this distinction from the original abstract on stage.
- The existing `app/components/Shop.browser.test.ts` purchase flow can anchor the talk. `ProductCard` supplies the blocked-button comparison. A deliberately broken Tabs widget from the Reka comparison corpus supplies the accessibility example; the deck shows an explicitly labeled interactive reconstruction.
- Runnable factory, page-object, and screenshot examples now live under the shop's `talk/tacon/` directory with `talk/vitest.tacon.config.ts`. The three examples pass. The screenshot demo has baseline, deliberately changed, and diff images in the deck. The original app/tests suites remain separate.
- The German deck is in `../slides.md`, with timed speaker notes. `../presenter.md` contains the rehearsal guide. Slides 1–33 contain 38 minutes of planned content, slide 34 opens questions, and slides 35–43 are backups. Speaker-note intervals and the presenter guide agree.
- Can a controlled current benchmark substantiate the abstract's four-times speed claim? Existing wiki evidence does not establish a general multiplier.
- Which external boundaries can the browser integration tests replace without creating the same gaps that the Testing Trophy warns about?
- Does the organizer include questions in the 45-minute slot?

## Scope boundaries

- Keep installation and provider internals brief so the advertised testing patterns receive time.
- Retain end-to-end testing for complete application journeys.
- Role-based queries are useful accessibility feedback, but do not establish full accessibility coverage.

## Review decisions, 2026-09-12

- Separate black-box strategy from browser execution: the original JSDOM example already tests observable behavior.
- Reduce repeated introduction slides and keep the first visible defect before minute five.
- Show the actual page-object method and cart-line factory; keep assertions in tests.
- Explain the advertised PWA ratios and timing in the main talk with their limitations.
- Keep the opening and visual examples local; use one bounded live terminal sequence.
- Explicitly distinguish measured source experiments, interactive reconstructions, and the hydration illustration.
