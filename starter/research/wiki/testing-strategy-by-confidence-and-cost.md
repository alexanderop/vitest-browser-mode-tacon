# Testing strategy by confidence and cost

## Current synthesis

The Testing Trophy is a heuristic for allocating test effort. It places static analysis at the base, unit tests above it, integration tests in the largest section, and end-to-end tests at the top. The drawing does not prescribe exact ratios. It asks teams to balance the confidence a test provides against the time required to write, run, and maintain it.

The model treats confidence as the reason to test. Static analysis catches broad classes of simple mistakes at low cost. Unit tests remain useful for isolated logic and design feedback. End-to-end tests protect critical complete journeys. Integration tests take the largest share because they exercise meaningful business behavior without the full setup cost of end-to-end tests.

Code coverage measures which code ran during a test suite. It does not measure whether the tests protect user-visible behavior. A strict coverage target can push a team to expose private functions or assert implementation details. Those tests fail during behavior-preserving refactors and add maintenance without matching how a consumer uses the code.

The practical advice is to preserve more of the real system and test at a higher level. In a frontend application, a settings-page test can render the page, enter an invalid username, and observe the disabled submit button. This test covers the collaboration between components. Separate button snapshots cannot provide the same behavioral evidence.

This model supplies the strategic reason for an integration-heavy Vitest Browser Mode suite. Browser Mode changes the available tooling, but it does not turn the Testing Trophy into a fixed distribution. The application architecture and the cost of each test still determine the useful mix.

## Claims and evidence

- Dodds names development workflow and confidence as the two benefits of automated tests. The talk focuses on confidence that an application still meets its specification. [The argument begins at 01:48.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Code coverage has diminishing returns. Dodds declines to recommend one application-wide percentage because the useful point depends on the cost of failure and the type of software. [The coverage discussion runs from 03:07 through 05:37.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- A test checks an implementation detail when it performs an action that a consumer cannot perform, such as calling a private function exposed for the test. Such tests can fail during a behavior-preserving refactor. [Dodds defines the problem from 05:45 through 07:03.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- The Testing Trophy contains static analysis, unit tests, integration tests, and end-to-end tests. Its geometry does not define exact ratios. [Dodds introduces the model from 11:31 through 12:37.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Tests generally cost more and run more slowly toward the top of the trophy. Dodds argues that their ability to catch consequential failures also rises. He calls this the "confidence coefficient." [The three properties are explained from 12:37 through 14:18.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- Integration tests occupy the largest section because Dodds considers them the best balance of cost, speed, and confidence. He retains unit tests for isolated logic and end-to-end tests for critical paths. [The recommendation runs from 14:18 through 15:28.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
- To write more integration tests, Dodds recommends mocking less and testing higher in the component tree. His example renders a settings page and checks the disabled submit button after an invalid username instead of snapshotting a button component. [The practical advice runs from 15:28 through 17:07.](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)

## Tensions and open questions

- The talk was published in 2018. Its examples use ESLint, Flow, Node.js tests, Cypress, and React shallow rendering from that period. The strategy remains relevant, but the examples do not establish the current cost or speed of browser integration tests.
- "Integration test" has no precise boundary in the talk. Dodds explicitly calls the distinction between unit and integration tests fuzzy. The TACON talk must define what its browser integration tests include and which external systems they replace.
- The recommendation to preserve reality does not mean that every dependency must remain live. The current TACON case study replaces APIs and IndexedDB at their boundaries. The talk should explain how this choice retains application behavior while avoiding the setup of a complete end-to-end journey.
- The Testing Trophy is an opinionated model, not comparative research. It does not validate the TACON case study's 70 percent integration, 20 percent unit, and 10 percent visual and accessibility distribution.
- The claim that higher-level tests provide more confidence assumes that the test exercises representative behavior and remains reliable. Test level alone does not establish confidence.

## Sources

- [Full automatic transcript of "Kent C. Dodds – Write tests. Not too many. Mostly integration."](../raw/2018-03-05-kent-c-dodds-write-tests-not-too-many-mostly-integration.md)
