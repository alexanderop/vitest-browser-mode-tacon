---
kind: note
title: Testing Library debugging APIs and jsdom comparison
url: https://testing-library.com/docs/dom-testing-library/api-debugging/
author: Codex
publisher: local source verification
published: 2026-09-13
collected: 2026-09-13
status: complete
---

# Verified primary sources

- https://testing-library.com/docs/dom-testing-library/api-debugging/ — inspected 2026-09-13. `screen.debug()` prints formatted DOM. `screen.logTestingPlaygroundURL()` logs and returns a browser URL for the document or a supplied element.
- https://app.unpkg.com/@testing-library/dom@10.4.1/files/dist/screen.js — inspected published implementation: the URL encodes `element.innerHTML`, defaulting to `document.body`. It does not serialize Vue runtime state, event handlers or external application stylesheets.
- [Existing Browser UI execution evidence](2026-09-13-browser-ui-screenshot.md) supports the adjacent real rendered component view.

# Editorial application

The new slide follows the Claw & Chew Browser UI screenshot. It shows both actual API names and an explicitly abbreviated illustrative DOM output, not a captured test run. Testing Playground helps inspect markup and find queries; do not claim it cannot show an HTML preview. The comparison is between exported markup and the running component with loaded CSS and browser layout. Inline styles can be part of exported markup, so do not claim every style is always removed.
