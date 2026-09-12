# Talk brief

## Working title

Frontend-Testing neu gedacht: Black-Box-Strategie mit Vitest Browser Mode

The [original conference abstract](raw/tacon-2026-original-abstract.md) defines the advertised scope. The session lasts 45 minutes. The current plan reserves 36 minutes for content, five minutes for questions, and four minutes of contingency; a spoken rehearsal remains necessary.

## Audience

TACON attendees interested in frontend testing and test automation. Plan for mixed framework experience. Basic test familiarity is an assumption to confirm.

## Intended outcome

Attendees learn behavior, accessibility, and visual testing through the Nuxt e-commerce example, then compare its test boundaries with a pure SPA. Root mounts protect behavior-driven client workflows, component tests protect public technical contracts, and deliberate visual references protect selected core UI states. A separate E2E runner is optional for a pure SPA's functional UI strategy; the Nuxt server/client path requires tests that include the running application.

## Current thesis

AI writes much of the speaker's code and tests. The speaker defines what passing must mean: an observable contract, an appropriate execution environment and deliberate mock boundaries. Test volume and assertions against private implementation details are insufficient evidence. This is the speaker's workflow and editorial position, not a measured claim about all AI-generated tests. [Accepted user direction](raw/2026-09-12-ai-test-contracts.md).

The blocked shop button exposes two independent decisions: what to assert and where to execute it. The existing JSDOM test already follows a black-box strategy, yet cannot establish that a user can reach the covered control. Browser Mode with provider-backed interactions supplies stronger evidence for this browser-dependent contract and reduces browser emulation mocks. It does not automatically make tests correct.

Claw & Chew remains the continuous example for behavior, accessibility and visual contracts. Complete these before comparing Nuxt and SPA test boundaries. Keep external responses controlled where needed; retain real components and browser behavior. Preserve separate coverage for server HTML, hydration and other promised properties outside a direct client mount. Finish with a concrete AI test-writing brief and a deliberate defect that must make the test fail.

## Supporting ideas

- Define the user contract before generating tests; demonstrate behavior assertions instead of private refs or method calls.
- Separate assertion quality from runtime fidelity. A real browser can still run an implementation-detail test.
- Show why browser geometry and APIs need fewer emulation mocks; justify external boundary mocks.
- Review generated tests for a distinct protected behavior, refactoring resilience and a demonstrated regression failure.
- Introduce behavior, accessibility, and visual regression early as the three recurring component-test contracts, then prove each with one concrete failure.
- Use the blocked-button example for behavior: jsdom dispatches an event while Browser Mode proves that a user can reach the control.
- Use the Reka UI migration for accessibility: combine axe rules, ARIA snapshots for product-specific meaning, and real keyboard/focus interaction. Do not claim that Browser Mode or axe proves complete accessibility.
- Use the ProductCard screenshot comparison for the visual contract: a component can remain operable while its rendered appearance regresses.
- Present the Testing Trophy as the strategic reason to favor integration tests. Treat it as a confidence-versus-cost heuristic, not a prescribed ratio.
- Keep historical PWA ratios and speed measurements in backup, with their limitations.
- Introduce the App.vue strategy only after completing the three contracts in the shop example. Use the SPA as a concise architecture comparison, with a compact real-component demo instead of a second feature walkthrough. Distinguish the Playwright provider from its separate E2E runner.
- Discuss repeated execution versus repeated assertions. Start visuals with selected own core-UI states; add screen captures for specific composition risks.
- Show data factories and page objects in a concrete test.

## Open questions

- Claw & Chew is the user-selected example repository at `/Users/alexanderopalic/Projects/opensource/claw-and-chew`. Its README describes a prepared Nuxt demo shop with simulated checkout, not a production PWA. Explain this distinction from the original abstract on stage.
- The existing `app/components/Shop.browser.test.ts` purchase flow can anchor the talk. `ProductCard` supplies the blocked-button comparison. A deliberately broken Tabs widget from the Reka comparison corpus supplies the accessibility example, framed as a customer-account scenario for the talk. The deck shows an explicitly labeled interactive reconstruction; this is not an implemented Claw & Chew account feature.
- Runnable factory, page-object, and screenshot examples now live under the shop's `talk/tacon/` directory with `talk/vitest.tacon.config.ts`. The three examples pass. The screenshot demo has baseline, deliberately changed, and diff images in the deck. The original app/tests suites remain separate.
- The German deck is in `../slides.md`, with timed speaker notes. `../presenter.md` contains current slide ranges. Preserve the current 36-minute content plan plus questions and reserve; rehearse the revised allocation aloud.
- Can a controlled current benchmark substantiate the abstract's four-times speed claim? Existing wiki evidence does not establish a general multiplier.
- Which external boundaries can the browser integration tests replace without creating the same gaps that the Testing Trophy warns about?
- Does the organizer include questions in the 45-minute slot?

## Scope boundaries

- Keep installation and provider internals brief so the advertised testing patterns receive time.
- Choose additional application tests by architecture and promised behavior. Direct mounts do not prove real reload, native persistence, service-worker or built-asset behavior. The current Workout Tracker also has Playwright E2E tests; do not present it as exclusively Browser Mode.
- Role-based queries are useful accessibility feedback, but do not establish full accessibility coverage.

## Review decisions, 2026-09-12

- Separate black-box strategy from browser execution: the original JSDOM example already tests observable behavior.
- Reduce repeated introduction slides and keep the first visible defect before minute five.
- Show the actual page-object method and cart-line factory; keep assertions in tests.
- Superseded by the accepted strategy revision: retain PWA ratios and timing in backup to make room for both architecture examples.
- Keep the opening and visual examples local; use one bounded live terminal sequence.
- Explicitly distinguish measured source experiments, interactive reconstructions, and the hydration illustration.

## Narrative revision, 2026-09-12

- Supersedes the earlier plan for two equal application walkthroughs: use E-Commerce throughout the three contracts, then explain how the test strategy changes for a SPA.
- Integrate selected shop examples from the appendix where they explain the relevant contract. Keep technical deep dives as backup.
- Slides and presenter notes now follow this order. The SPA section includes the actual ScrollFadeContainer.vue with a talk-specific interactive wrapper; the scrollable-cart and interactive resize examples are integrated into the behavior chapter. The longer API comparison stays in backup.

## Teaser revision, 2026-09-12

Show the shop first, then all five existing paired JSDOM cases as a problem-only teaser. Explain Browser Mode and replay the blocked-button comparison afterwards. Contrast is an incomplete audit, not proof of accessibility. Do not promise Browser Mode prevents every future defect. See [the accepted direction and source inspection](raw/2026-09-12-jsdom-teaser.md).

## Recorded incident teaser, 2026-09-12

Superseded by the iframe revision below. Slides 3–7 used real shop recordings, followed within each clip by the actual green JSDOM result and a simulated incident statement. Slide 8 keeps the question open. Recordings replace the static teaser tables and preserve the later solution. [Execution record](raw/2026-09-12-shop-incident-recordings.md).

## Interactive demo URLs, 2026-09-12

Replace the videos with real shop iframes on slides 3–7. Each route opens the prepared broken state and provides reset and a working counterpart. Reveal the historical JSDOM result after interacting, explicitly as saved evidence. [Accepted direction and implementation](raw/2026-09-12-shop-iframe-demos.md).

## Focused opening revision, 2026-09-12

Accepted after reviewing the opening: retain all five interactive cases, with the blocked button as the main hook. Move the open question immediately after its saved green result. Limit the remaining four cases to brief demonstrations without repeating result reveals or working variants. Introduce the three contracts by 2:35, show the JSDOM test before explaining its runtime, and use the later button reconstruction to explain the cause directly. The revised content plan ends at 35:20; five minutes of questions leave 4:40 contingency. These are planning times, not measured rehearsal results.

## AI and correctness revision, 2026-09-12

[Accepted direction](raw/2026-09-12-ai-test-contracts.md) supersedes the earlier emphasis on tooling and migration as the concluding argument. The opening states the speaker's AI workflow; the blocked-button question asks what passing should prove. The internal-ref example explains the structure to give AI. Page objects, factories and test-boundary slides reinforce that structure. Slides 42–45 cover fewer browser mocks, a concrete AI brief, review of the three contracts and the final correctness thesis. Configuration moves to backup slide 54. The main sequence remains 46 slides with 35:20 planned content, five minutes of questions and 4:40 contingency; timing is not a measured rehearsal.

## Illustrated AI migration tip, 2026-09-12

The user accepted three Hamcrab workshop illustrations and requested their implementation. Slides 39–41 now follow the concrete AI brief: validate representative ports, separate implementation and review, and persist improved instructions for the next batch. This illustrates the [inspected Git chronology](raw/2026-09-12-reka-migration-git-history.md) and [actual prompts](raw/2026-09-12-reka-ai-migration.md). The artwork is a metaphor, not captured execution; learning means updated instructions in context, not model training. The existing correctness conclusion remains. The current presenter guide now supersedes earlier slide counts: 44 main slides including questions, 16 backup slides, 36 minutes planned content, five minutes questions, four minutes reserve. No full spoken rehearsal has been measured.

## Basics-first opening, 2026-09-12

The [latest user direction](raw/2026-09-12-testing-basics-opening.md) supersedes the immediate shop-first opening: explain the classic unit/integration/E2E pyramid, Vue/React components and the jsdom/Happy DOM environment first. Retain the historical jsdom illustration, then demonstrate the blocked button and the green test. Component scope and runtime are separate axes. Do not claim majority adoption without evidence. Budget approximately three minutes for the added context; the presenter guide contains the revised planning times.

## Shop story revision, 2026-09-12

The [accepted narrative revision](raw/2026-09-12-shop-story-revision.md) supersedes the abstract contract-first explanation after the opening defect and the separate “technical details” restart. Resolve the blocked button first: expectation, cause, Browser Mode failure, repair, then name behavior. Continue from purchase to keyboard/meaning and appearance; summarize the three contracts after these examples. Keep the Nuxt/SPA boundary comparison compact and place the AI brief and migration review at the end. Additional geometry demos, helper internals and SPA implementation move to backup. The revised presenter guide is authoritative for order and planned timing.

## Browser Mode introduction after the meme, 2026-09-12

The user requests a formal introduction to Vitest Browser Mode immediately after the accepted Gandalf meme and before continuing the solution. Explain what Browser Mode is before explaining the blocked click. Ground the introduction in the [browser-native testing synthesis](wiki/browser-native-component-testing.md) and its [captured Vitest documentation](raw/2026-08-18-vitest-4-1-11-browser-mode-documentation.md). The precise slide wording and layout remain proposed; the existing architecture slide has not yet been revised for this request.


## Provider distinction in the introduction, 2026-09-12

The user explicitly requires the introduction to include Preview versus automation providers. Explain that Preview needs no Playwright/WebdriverIO, renders in a real browser and simulates events; CI requires Playwright or WebdriverIO. Label the technical click round trip as the Playwright path. Place this distinction before the covered-button solution, grounded in the browser-native wiki and captured provider documentation.


## Implemented Browser Mode introduction, 2026-09-12

Replaced the short architecture slide after Gandalf with five slides (12–16): definition, providers, execution locations, Playwright click round trip and retried assertions. The presenter guide allocates exactly five minutes to the introduction. Updated overall planning: 41 main slides, 26 backup; 39 minutes content, five minutes questions, one minute reserve. These are planning estimates, not rehearsal measurements.
