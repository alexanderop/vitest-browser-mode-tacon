---
kind: note
title: Define test contracts before AI writes the tests
author: Alexander Opalic
publisher: local conversation
url: unknown
published: 2026-09-12
collected: 2026-09-12
status: complete
---

# User direction

The user contrasted this talk with Jessica Sachs's emphasis on seeing components and the development feedback loop:

> okay for me this is not so important because ai will write all the code for me its more aobut correctnes and that vitest brwoser mode needs less mocks and is more correct then jsodm

After agreeing on confidence in AI-written tests, the user added:

> yes exactly because ai has no taste it also writes often to many usless implemtnation detaisl test so we have to deifne a good structure first

The user then requested:

> improve our talk now

# Accepted editorial interpretation

The audience should define the observable contract, the test boundary and deliberate mock boundaries before asking AI to implement tests. Evaluate a test by the behavior it protects, its independence from private implementation details and whether a deliberate regression makes it fail.

This is the speaker's workflow and judgment, not empirical evidence about the frequency or quality of AI-generated tests. The existing shop tests are not attributed to AI without provenance. The private-ref counterexample and AI instruction slide are explicitly didactic.

Browser Mode can provide stronger evidence for browser-dependent behavior and remove the need to emulate layout, geometry and available browser APIs. It does not make every assertion correct. The blocked-button comparison already uses a black-box JSDOM test: contract quality and execution environment are independent choices. Provider-backed interactions matter; directly dispatched DOM events can bypass user interaction constraints even in a real browser.

Retain the three contracts, existing five-case shop teaser, architecture comparison and evidence distinctions. Make correctness and fewer browser mocks the central argument. Keep performance in backup and move installation configuration there too. Keep 46 main slides and the existing 35:20 content allocation, subject to spoken rehearsal.
