---
kind: article
title: jsdom README — Pretending to be a visual browser
url: https://github.com/jsdom/jsdom#pretending-to-be-a-visual-browser
author: jsdom contributors
publisher: GitHub
published: unknown
collected: 2026-09-15
status: complete
---

Complete capture of the user-selected README section; other README sections omitted.

### Pretending to be a visual browser


jsdom does not have the capability to render visual content, and will act like a headless browser by default. It provides hints to web pages through APIs such as `document.hidden` that their content is not visible.

When the `pretendToBeVisual` option is set to `true`, jsdom will pretend that it is rendering and displaying content. It does this by:

- Changing `document.hidden` to return `false` instead of `true`
- Changing `document.visibilityState` to return `"visible"` instead of `"prerender"`
- Enabling `window.requestAnimationFrame()` and `window.cancelAnimationFrame()` methods, which otherwise do not exist

```js
const window = (new JSDOM(``, { pretendToBeVisual: true })).window;

window.requestAnimationFrame(timestamp => {
  console.log(timestamp > 0);
});
```

Note that jsdom still [does not do any layout or rendering](#unimplemented-parts-of-the-web-platform), so this is really just about _pretending_ to be visual, not about implementing the parts of the platform a real, visual web browser would implement.
