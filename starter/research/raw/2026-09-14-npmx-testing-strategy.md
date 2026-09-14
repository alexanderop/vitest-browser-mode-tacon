---
kind: file
title: npmx.dev testing configuration and examples
url: https://github.com/npmx-dev/npmx.dev/tree/0e3cdadf3d0d9759a91462a1045297c836701c51
author: npmx contributors
publisher: GitHub
published: unknown
collected: 2026-09-14
status: complete
---

# Source inspection

Pinned revision: `0e3cdadf3d0d9759a91462a1045297c836701c51`. Retrieved from GitHub; the suggested local checkout `/Users/alexanderopalic/Projects/opensource/npmx.dev` was not present. This capture contains the complete selected excerpts below, not the whole repository. No npmx tests were executed.

## vite.config.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/vite.config.ts

```ts
  test: {
    projects: [
      {
        resolve: {
          alias: {
            '~': `${rootDir}/app`,
            '~~': rootDir,
            '#shared': `${rootDir}/shared`,
            '#server': `${rootDir}/server`,
          },
        },
        test: {
          name: 'unit',
          include: ['test/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      () =>
        defineVitestProject({
          plugins: [liveDollarFetch()],
          test: {
            name: 'nuxt',
            include: ['test/nuxt/**/*.{test,spec}.ts'],
            environment: 'nuxt',
            environmentOptions: {
              nuxt: {
                rootDir,
                overrides: {
                  vue: {
                    runtimeCompiler: true,
                  },
                  experimental: {
                    payloadExtraction: false,
                    viteEnvironmentApi: false,
                  },
                  pwa: {
                    pwaAssets: { disabled: true },
                  },
                  ogImage: { enabled: false },
                },
              },
            },
            browser: {
              enabled: true,
              provider: playwright(),
              instances: [{ browser: 'chromium', headless: true }],
            },
          },
        }),
    ],
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['{app,cli,server,shared}/**/*.{ts,vue}'],
    },
  },
})
```

## playwright.config.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/playwright.config.ts

```ts
import process from 'node:process'
import { join } from 'node:path'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const baseURL = 'http://localhost:5678'

export default defineConfig<ConfigOptions>({
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [['html'], ['junit', { outputFile: 'test-report.junit.xml' }]]
    : 'html',
  timeout: 120_000,
  webServer: {
    command: 'pnpm start:playwright:webserver',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  // Start/stop mock connector server before/after all tests (teardown via returned closure)
  globalSetup: join(import.meta.dirname, 'test/e2e/global-setup.ts'),
  // We currently only test on one browser on one platform
  snapshotPathTemplate: '{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{ext}',
  use: {
    baseURL,
    trace: 'on-first-retry',
    nuxt: {
      rootDir: import.meta.dirname,
      host: baseURL,
    },
  },
  projects: [
    {
      name: 'chromium-headless-shell',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
```

## test/nuxt/a11y.spec.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/test/nuxt/a11y.spec.ts

```ts
import type { ColumnConfig, FilterChip } from '#shared/types/preferences'
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'
import 'axe-core'
import type { AxeResults, RunOptions } from 'axe-core'
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from 'vitest'
import { createLikesLeaderboardEntry } from '~~/test/fixtures/likes-leaderboard'

// axe-core is a UMD module that exposes itself as window.axe in the browser
declare const axe: {
  run: (context: Element, options?: RunOptions) => Promise<AxeResults>
}

// Track mounted containers for cleanup
const mountedContainers: HTMLElement[] = []

const axeRunOptions: RunOptions = {
  // Only compute violations to reduce work per run
  resultTypes: ['violations'],
  // Disable rules that don't apply to isolated component testing
  rules: {
    // These rules check page-level concerns that don't apply to isolated components
    'landmark-one-main': { enabled: false },
    'region': { enabled: false },
    'page-has-heading-one': { enabled: false },
    // Duplicate landmarks are expected when testing multiple header/footer components
    'landmark-no-duplicate-banner': { enabled: false },
    'landmark-no-duplicate-contentinfo': { enabled: false },
    'landmark-no-duplicate-main': { enabled: false },
  },
}

/**
 * Run axe accessibility audit on a mounted component.
 * Mounts the component in an isolated container to avoid cross-test pollution.
 */
async function runAxe(wrapper: VueWrapper): Promise<AxeResults> {
  // Create an isolated container for this test
  const container = document.createElement('div')
  container.id = `test-container-${Date.now()}`
  document.body.appendChild(container)
  mountedContainers.push(container)

  // Clone the element into our isolated container
  const el = wrapper.element.cloneNode(true) as HTMLElement
  container.appendChild(el)

  // Run axe only on the isolated container
  return axe.run(container, axeRunOptions)
}
```

## test/e2e/hydration.spec.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/test/e2e/hydration.spec.ts

```ts
import type { Page } from '@playwright/test'
import { expect, test } from './test-utils'

const PAGES = [
  '/',
  '/about',
  '/settings',
  '/privacy',
  '/compare',
  '/search',
  '/package/nuxt',
  '/package-code/empathic/v/2.0.0',
  '/search?q=vue',
] as const

// ---------------------------------------------------------------------------
// Test matrix
//
// For each user setting, we test two states across all pages:
//   1. undefined — empty localStorage, the default/fresh-install experience
//   2. a non-default value — verifies hydration still works when the user has
//      changed that setting from its default
// ---------------------------------------------------------------------------

test.describe('Hydration', () => {
  test.describe('no user settings (empty localStorage)', () => {
    for (const page of PAGES) {
      test(`${page}`, async ({ goto, hydrationErrors }) => {
        await goto(page, { waitUntil: 'hydration' })

        expect(hydrationErrors).toEqual([])
      })
    }
  })
```

## test/e2e/og-image.spec.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/test/e2e/og-image.spec.ts

```ts
import { expect, test } from './test-utils'

// TODO(serhalp): The nuxt@3.20.2 fixture has no stars. Update fixture to have stars coverage here.

/**
 * OG image snapshot tests (Takumi templates).
 *
 * Each entry tests a different visual edge case to catch layout/overflow regressions:
 * - Home page (Splash.takumi)
 * - Static pages (Page.takumi)
 * - Packages (Package.takumi with download-chart, code-tree, function-tree variants)
 */
const TEST_CASES = [
  // Default OG image template
  { path: '/', label: 'home page' },

  // Page OG image template
  { path: '/accessibility', label: 'page' },

  // Package OG image template — covers key visual edge cases
  { path: '/package/vue', label: 'unscoped package' },
  { path: '/package/nuxt/v/4.3.1', label: 'unscoped with explicit version' },
  { path: '/package/@nuxt/kit', label: 'scoped package' },
  { path: '/package/@tanstack/react-query', label: 'scoped with long name' },
  {
    path: '/package/@babel/plugin-transform-exponentiation-operator',
    label: 'extremely long name',
  },

  // Blog post OG image template
  { path: '/blog/alpha-release', label: 'blog post' },

  // Compare OG image template
  { path: '/compare?packages=vue,react,svelte', label: 'compare' },

  // Package code-tree variant (file tree decoration)
  { path: '/package-code/vue/v/3.5.27', label: 'code-tree variant' },
  { path: '/package-code/takumi-js/v/1.8.7', label: 'code-tree variant with nested dist tree' },

  // Package function-tree variant (API symbols decoration)
  { path: '/package-docs/ufo/v/1.6.3', label: 'function-tree variant' },
] as const

for (const { path, label } of TEST_CASES) {
  test.describe(`${label} (${path})`, () => {
    test(`og image snapshot`, async ({ page, goto, baseURL }) => {
      await goto(path, { waitUntil: 'domcontentloaded' })

      const ogImageUrl = await page
        .locator('meta[property="og:image"]')
        .first()
        .getAttribute('content')
      expect(ogImageUrl).toBeTruthy()

      const ogImagePath = new URL(ogImageUrl!).pathname
      const localUrl = baseURL?.endsWith('/')
        ? `${baseURL}${ogImagePath.slice(1)}`
        : `${baseURL}${ogImagePath}`
      const response = await page.request.get(localUrl)

      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('image/png')

      const imageBuffer = await response.body()
      expect(imageBuffer).toMatchSnapshot({
        name: `og-image-${path.replace(/\//g, '-').replace(/^-/, '') || 'home'}.png`,
        maxDiffPixelRatio: 0.02,
      })
    })
  })
}
```

## test/e2e/test-utils.ts

Source: https://github.com/npmx-dev/npmx.dev/blob/0e3cdadf3d0d9759a91462a1045297c836701c51/test/e2e/test-utils.ts

```ts
import type { ConsoleMessage, Page, Route } from '@playwright/test'
import { test as base, expect } from '@nuxt/test-utils/playwright'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const mockRoutes = require('../fixtures/mock-routes.cjs')

/**
 * Fail the test with a clear error message when an external API request isn't mocked.
 */
function failUnmockedRequest(route: Route, apiName: string): never {
  const url = route.request().url()
  const error = new Error(
    `\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `UNMOCKED EXTERNAL API REQUEST DETECTED\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `\n` +
      `API:  ${apiName}\n` +
      `URL:  ${url}\n` +
      `\n` +
      `This request would hit a real external API, which is not allowed in tests.\n` +
      `\n` +
      `To fix this, either:\n` +
      `  1. Add a fixture file for this request in test/fixtures/\n` +
      `  2. Add handling for this URL pattern in test/fixtures/mock-routes.cjs\n` +
      `\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`,
  )
  throw error
}

async function setupRouteMocking(page: Page): Promise<void> {
  for (const routeDef of mockRoutes.routes) {
    await page.route(routeDef.pattern, async (route: Route) => {
      const url = route.request().url()
      const result = mockRoutes.matchRoute(url)

      if (result) {
        await route.fulfill({
          status: result.response.status,
          contentType: result.response.contentType,
          body: result.response.body,
        })
      } else {
        failUnmockedRequest(route, routeDef.name)
      }
    })
  }
}
```

## Editorial decision

The user requested the Reka migration section in backup, then a summary and personal testing-strategy recommendation after visual regression, informed by npmx.dev. The proposed emphasis on user workflows and curated core-UI screenshots is the speaker's recommendation. The inspected npmx files establish the runtime split and specific examples, not a ratio, performance advantage, exhaustive accessibility, or a Vitest component screenshot strategy. Its OG image comparisons run through Playwright on generated PNG responses.
