# Testing strategy by confidence and cost

## Current synthesis

A sourced Steve Jobs “One more thing” photograph now bridges npmx.dev and the five-slide Reka/AI chapter, at the user’s request. [Transition and provenance](../raw/2026-09-15-steve-jobs-one-more-thing.md).

The Reka main-deck story is now five visual slides instead of nine: AI/Reka introduction, local Vitest reference, independent review, Slider before/after, and completed destinations with the personal AI conclusion. Two clearly labeled generated illustrations replace process prose; code and counts remain source-based. This supersedes the nine-slide order below. [Visual revision and provenance](../raw/2026-09-15-reka-visual-short-story.md).

The speaker also supplied a local Vitest clone at `opensource/vitest` as a migration reference: documentation, implementation and upstream tests were available to guide API choices. This is the speaker's account, not a new inspection or a claim that every document was read. The preparation slide emphasizes this step. [Speaker source](../raw/2026-09-15-vitest-local-reference.md).

The latest user direction restores the Reka migration to the main deck after npmx.dev and before Danke. Nine slides cover the 2026/AI hook, Reka introduction, original Slider mocks and key test, migration hypothesis, preparation, implementation/review and stored instructions, migrated Slider, complete fork, and the speaker's AI assessment. The 87 Browser Mode / 10 Node split is explicit. The original comparison files are retained; snippets are abbreviated and no new suite or timing result is claimed. [Current source inspection and direction](../raw/2026-09-15-reka-main-ai-story.md). This supersedes the earlier backup-only placement below.

The accepted follow-up slide traces the installation feature through Node command generation, a mounted PackageManagerSelect axe audit, and separate E2E keyboard/clipboard checks. The three questions are revealed one at a time. This is source inspection at local revision `75329352`, not a newly executed suite. [Exact examples and limits](../raw/2026-09-14-npmx-install-feature-tests.md).

The npmx example now uses a generated three-tier test pyramid beside the user-supplied Vitest package-page screenshot. Tier areas are explicitly not test proportions; the screenshot introduces the product. [Visual provenance](../raw/2026-09-14-npmx-slide-visuals.md).

Latest accepted order (2026-09-14): after visual regression and its reading link, summarize behavior, accessibility and appearance; recommend Node for pure logic, Browser Mode for real-component workflows, focused accessibility/visual checks and Playwright for critical running-app paths. npmx.dev supplies a concrete Nuxt example before the existing hydration explanation. The complete Reka migration and performance section moves behind the Backup divider. This supersedes main-deck migration placement below. [User direction and pinned source capture](../raw/2026-09-14-npmx-testing-strategy.md).

A hand-drawn-style overview now precedes the Reka editors: 97 originals split into 87 browser destinations via migration and review, and ten Node files; review findings feed corrected instructions for the next port. The originals remain as a comparison corpus. This is an editable schematic of the documented workflow, not a captured execution.

The Reka migration section now uses six editable code-editor slides at the user’s request: parallel setup and early checks; the Slider pilot; Node extraction and further trials; per-file migration with independent review; persisted and corrected instructions; complete browser/Node destinations with originals retained. The existing editor layout now shows abbreviated configuration and Slider code, check commands, translated prompt excerpts and an explicitly summarized inventory. Clicks switch the Slider file tab and highlight the relevant lines. This replaces the three illustrated metaphors and supersedes the initial plain bullet layout. Git HEAD `ab4207bf` and the milestone commit messages were rechecked locally on 2026-09-13; historical test results were not rerun. [Chronology](../raw/2026-09-12-reka-migration-git-history.md) and [documented prompts](../raw/2026-09-12-reka-ai-migration.md).

The Nuxt section now uses four slides: explain SSR and hydration, demonstrate the prepared category mismatch, show an automatic Playwright fixture, then give additional running-application checks (authentication redirects, direct URLs, reload and built assets). This supersedes the five-step startup explanation. The useful distinction is the test entry point, not iframe versus real browser. [User-supplied article](../raw/2026-09-13-hydration-playwright-user-article.md) and [prepared shop defect](../raw/2026-09-13-nuxt-test-boundaries.md).

The article contributes console collection and reusable fixtures. The slide adapts this into an automatic fixture with a teardown assertion, scoped explicitly to Vue/Nuxt diagnostic strings. Tests must import the extended test and await meaningful app readiness/interaction. A visible SSR heading or DOMContentLoaded alone does not prove hydration finished. Do not copy the article's claims that most bugs have particular causes, every settings combination was tested, or every unchecked SSR app already has a production defect; these are not established here. Recovery from a mismatch is framework-dependent and need not replace the whole page. [Verification and adaptation](../raw/2026-09-13-hydration-fixture-verification.md).

Latest editorial revision: resolve the blocked-button defect before naming contracts, continue the shop through behavior, accessibility and appearance, then summarize the contracts and apply them to test boundaries and AI instructions. Extra implementation examples move to backup. This supersedes earlier ordering and main-deck integration statements below. [Accepted shop-story revision](../raw/2026-09-12-shop-story-revision.md).

The talk starts with the classic testing pyramid as a basic vocabulary: unit, integration and end-to-end, with increasingly broad shop examples. This is a heuristic, not a prescribed test distribution. Vue and React components can be tested alone or in collaboration; they do not require an extra pyramid level. The later integration-heavy strategy builds on this distinction. [Accepted basics-first opening and inspected pyramid source](../raw/2026-09-12-testing-basics-opening.md).

The current framing starts with AI writing the speaker’s code and tests: humans define the observable contract and test boundary first. Generated tests should protect distinct behavior, survive changes to private implementation and fail when that behavior is deliberately broken. This is an accepted editorial strategy and the speaker’s experience, not a measured AI-quality claim. The final example instruction makes these requirements concrete. [User direction and limits](../raw/2026-09-12-ai-test-contracts.md).

The completed slide revision integrates cart scrolling and shirt-preview resizing into behavior, retains the Reka accessibility reconstruction as a clearly attributed customer-account scenario, and defers the SPA comparison until all three contracts are complete. [Accepted narrative and implementation.](../raw/2026-09-12-shop-first-narrative.md)

The current talk order completes behavior, accessibility, and visuals in the shop before comparing architectures. The later SPA section embeds the actual Workout Tracker scroll-fade component with a talk-specific demonstration wrapper. This supersedes the earlier equal, interleaved walkthrough plan. [User direction and captured component.](../raw/2026-09-12-workout-scroll-component.md)

The Testing Trophy is a heuristic for allocating test effort. It places static analysis at the base, unit tests above it, integration tests in the largest section, and end-to-end tests at the top. The drawing does not prescribe exact ratios. It asks teams to balance the confidence a test provides against the time required to write, run, and maintain it.

The model treats confidence as the reason to test. Static analysis catches broad classes of simple mistakes at low cost. Unit tests remain useful for isolated logic and design feedback. End-to-end tests protect critical complete journeys. Integration tests take the largest share because they exercise meaningful business behavior without the full setup cost of end-to-end tests.

Code coverage measures which code ran during a test suite. It does not measure whether the tests protect user-visible behavior. A strict coverage target can push a team to expose private functions or assert implementation details. Those tests fail during behavior-preserving refactors and add maintenance without matching how a consumer uses the code.

The practical advice is to preserve more of the real system and test at a higher level. In a frontend application, a settings-page test can render the page, enter an invalid username, and observe the disabled submit button. This test covers the collaboration between components. Separate button snapshots cannot provide the same behavioral evidence.

This model supplies the strategic reason for an integration-heavy Vitest Browser Mode suite. Browser Mode changes the available tooling, but it does not turn the Testing Trophy into a fixed distribution. The application architecture and the cost of each test still determine the useful mix.

## Claims and evidence

- npmx.dev at `0e3cdadf` configures a Node unit project and a Nuxt project with Browser Mode and a headless Chromium Playwright provider. Separate Playwright E2E tests cover the running application, including explicit hydration cases. Component axe checks clone DOM into an audit container; they do not replace interactive focus checks. OG image snapshots compare generated PNG responses in Playwright, not Vitest component screenshots. E2E route helpers serve controlled external responses. [Inspected configurations and tests](../raw/2026-09-14-npmx-testing-strategy.md).
- The speaker endorses this division of responsibilities, with user workflows as the main UI investment and deliberately chosen visual references. This is a recommendation, not a measured npmx test distribution or an assertion that its test style is identical in every detail. [Scope and accepted direction](../raw/2026-09-14-npmx-testing-strategy.md).

- Git chronology refines the earlier reference-port suggestion: the first recorded setup commit (`bd93d9b1`, August 16) already includes inventory, AST parity and coverage tooling plus two Slider cases. Slider completion, Node extraction, useForwardExpose and Label trials precede the committed reusable prompts (`675792e3`). The first batch taught new rules; `8829a1bb` explicitly corrects a false portal-query rule in the prompt. Completion is recorded August 18 (`12d75a3b`), with 87 browser destinations and 10 Node files and retained originals. August 22 (`864db198`) removes the temporary compatibility adapter and adds stronger native interaction and semantic coverage. These are commit milestones, not measured effort. [Git evidence](../raw/2026-09-12-reka-migration-git-history.md).
- The documented loop uses one-file implementers and independent reviewers with separate contexts, and T2 batches of roughly eight files with three agents running concurrently. The transferable interpretation is: build verification early, learn from representative ports, persist and correct prompts, then expand in bounded batches. The initial answer's single-template framing understated that process. [Prompt source](../raw/2026-09-12-reka-ai-migration.md) and [historical evolution](../raw/2026-09-12-reka-migration-git-history.md).

- The Reka fork stores reusable implementer/reviewer prompts in `PORT-PROMPTS.md`. Its per-file loop separates implementation from review; structural checks compare test names and assertion counts, coverage checks identify lost reached lines, and targeted defect probes challenge whether tests can fail. These are documented workflow rules, not newly executed results or a measured AI speedup. [Captured local source](../raw/2026-09-12-reka-ai-migration.md).
- Implemented closing tip on slides 39–41, following the existing AI test-writing brief: review one reference port, give AI that example plus explicit preservation rules, migrate one file per task, run both environments and review behavior before scaling. Preserve the main correctness thesis. Three Hamcrab workshop illustrations now carry the sequence, with source-specific speaker notes; the presenter guide budgets 2:30 for it. This is planned timing, not a rehearsal measurement.

- The earlier strategy gave the SPA and Nuxt examples equal weight (the narrative order above supersedes that presentation choice): root mounts for domain workflows, focused components for public technical contracts, selected core UI states for visuals. A separate E2E runner is optional for SPA functional UI coverage; promised platform behavior still needs suitable checks. This is the user's strategy and editorial synthesis, not a universal measured result. [Accepted direction and source boundaries.](../raw/2026-09-12-spa-nuxt-testing-strategy.md)
- The inspected SPA helper renders App.vue with its router, translations and runtime, substituting Memory History, IndexedDB and reload. The current repository also has Playwright E2E tests. The shop hydration test visits the running app and checks interaction before diagnostics. [Local source inspection.](../raw/2026-09-12-spa-nuxt-testing-strategy.md)

- Dodds names development workflow and confidence as the two benefits of automated tests. The talk focuses on confidence that an application still meets its specification. [The argument begins at 01:48.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Code coverage has diminishing returns. Dodds declines to recommend one application-wide percentage because the useful point depends on the cost of failure and the type of software. [The coverage discussion runs from 03:07 through 05:37.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- A test checks an implementation detail when it performs an action that a consumer cannot perform, such as calling a private function exposed for the test. Such tests can fail during a behavior-preserving refactor. [Dodds defines the problem from 05:45 through 07:03.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- The Testing Trophy contains static analysis, unit tests, integration tests, and end-to-end tests. Its geometry does not define exact ratios. [Dodds introduces the model from 11:31 through 12:37.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Tests generally cost more and run more slowly toward the top of the trophy. Dodds argues that their ability to catch consequential failures also rises. He calls this the "confidence coefficient." [The three properties are explained from 12:37 through 14:18.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Integration tests occupy the largest section because Dodds considers them the best balance of cost, speed, and confidence. He retains unit tests for isolated logic and end-to-end tests for critical paths. [The recommendation runs from 14:18 through 15:28.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- To write more integration tests, Dodds recommends mocking less and testing higher in the component tree. His example renders a settings page and checks the disabled submit button after an invalid username instead of snapshotting a button component. [The practical advice runs from 15:28 through 17:07.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)

## Tensions and open questions

- Equal test names, assertion counts and reached lines do not prove equivalent assertions. The Reka prompts explicitly require semantic review and targeted defect probes. The talk should present the workflow as practical support for migration, without promising automatic correctness or a measured time saving. [Prompt source](../raw/2026-09-12-reka-ai-migration.md).

- The talk was published in 2018. Its examples use ESLint, Flow, Node.js tests, Cypress, and React shallow rendering from that period. The strategy remains relevant, but the examples do not establish the current cost or speed of browser integration tests.
- "Integration test" has no precise boundary in the talk. Dodds explicitly calls the distinction between unit and integration tests fuzzy. The TACON talk must define what its browser integration tests include and which external systems they replace.
- The recommendation to preserve reality does not mean that every dependency must remain live. The current TACON case study replaces APIs and IndexedDB at their boundaries. The talk should explain how this choice retains application behavior while avoiding the setup of a complete end-to-end journey.
- The Testing Trophy is an opinionated model, not comparative research. It does not validate the TACON case study's 70 percent integration, 20 percent unit, and 10 percent visual and accessibility distribution.
- The claim that higher-level tests provide more confidence assumes that the test exercises representative behavior and remains reliable. Test level alone does not establish confidence.

## Sources

- [Five-slide visual Reka story and generated asset provenance](../raw/2026-09-15-reka-visual-short-story.md).

- [Local Vitest checkout supplied to the migration agent](../raw/2026-09-15-vitest-local-reference.md).

- [Current Reka main-deck direction and Slider source](../raw/2026-09-15-reka-main-ai-story.md).

- [npmx.dev pinned test configuration and examples](../raw/2026-09-14-npmx-testing-strategy.md).

- [Nuxt startup path and prepared hydration mismatch](../raw/2026-09-13-nuxt-test-boundaries.md).

- [Reka migration Git chronology and prompt corrections](../raw/2026-09-12-reka-migration-git-history.md).

- [Reka AI migration prompts and operating-manual excerpts](../raw/2026-09-12-reka-ai-migration.md).

- [AI test contracts: accepted user direction](../raw/2026-09-12-ai-test-contracts.md).

- [Workout Tracker component and revised narrative.](../raw/2026-09-12-workout-scroll-component.md)

- [Equal SPA and Nuxt cases and deliberate contracts.](../raw/2026-09-12-spa-nuxt-testing-strategy.md)

- [Full automatic transcript of "Kent C. Dodds – Write tests. Not too many. Mostly integration."](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)

- [Hydration Playwright article supplied by the user](../raw/2026-09-13-hydration-playwright-user-article.md).
- [Official fixture and hydration guidance](../raw/2026-09-13-hydration-fixture-verification.md).
