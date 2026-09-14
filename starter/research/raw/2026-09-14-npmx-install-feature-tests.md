---
kind: file
title: npmx installation feature across three test levels
url: https://github.com/npmx-dev/npmx.dev/tree/75329352ee47ef6d641ba547bc382b91ef73c68f/test
author: npmx contributors
publisher: GitHub
published: unknown
collected: 2026-09-14
status: complete
---

# Local source inspection

Checkout: `/Users/alexanderopalic/Projects/opensource/npmx-dev/npmx.dev`, HEAD `75329352ee47ef6d641ba547bc382b91ef73c68f`. Complete selected excerpts below; tests were inspected, not executed. This checkout is a different revision from the previous remote configuration capture.

The user accepted a single slide after the pyramid explaining one installation feature across Node logic, component axe audit, and E2E keyboard/clipboard checks. The E2E examples are separate tests, not one continuous journey. The component audit is not proof of keyboard interaction or complete accessibility. Updating visible command text after selecting pnpm is a suggested additional component behavior test, not a claim about the captured axe test.

## test/unit/app/utils/install-command.spec.ts, lines 95–143

```ts
        ['deno', 'deno add npm:lodash'],
        ['vlt', 'vlt install lodash'],
      ] as const)('%s → %s', (pm, expected) => {
        expect(
          getInstallCommand({
            packageName: unscopedPackage,
            packageManager: pm,
            jsrInfo: jsrNotAvailable,
          }),
        ).toBe(expected)
      })
    })

    describe('unscoped package with version', () => {
      it.each([
        ['npm', 'npm install lodash@4.17.21'],
        ['pnpm', 'pnpm add lodash@4.17.21'],
        ['yarn', 'yarn add lodash@4.17.21'],
        ['bun', 'bun add lodash@4.17.21'],
        ['deno', 'deno add npm:lodash@4.17.21'],
        ['vlt', 'vlt install lodash@4.17.21'],
      ] as const)('%s → %s', (pm, expected) => {
        expect(
          getInstallCommand({
            packageName: unscopedPackage,
            packageManager: pm,
            version: '4.17.21',
            jsrInfo: jsrNotAvailable,
          }),
        ).toBe(expected)
      })
    })

    describe('dev dependency installs', () => {
      it.each([
        ['npm', 'npm install -D eslint'],
        ['pnpm', 'pnpm add -D eslint'],
        ['yarn', 'yarn add -D eslint'],
        ['bun', 'bun add -d eslint'],
        ['deno', 'deno add -D npm:eslint'],
        ['vlt', 'vlt install -D eslint'],
      ] as const)('%s → %s', (pm, expected) => {
        expect(
          getInstallCommand({
            packageName: 'eslint',
            packageManager: pm,
            jsrInfo: jsrNotAvailable,
            dev: true,
          }),
```

## test/nuxt/a11y.spec.ts, lines 1939–1947

```ts
  describe('PackageManagerSelect', () => {
    it('should have no accessibility violations', async () => {
      const component = await mountSuspended(PackageManagerSelect)
      const results = await runAxe(component)
      expect(results.violations).toEqual([])
    })
  })

  describe('CompareFacetCard', () => {
```

## test/e2e/package-manager-select.spec.ts, lines 1–36

```ts
import { expect, test } from './test-utils'

test.describe('Package Page', () => {
  test('/vue → package manager select dropdown works', async ({ page, goto }) => {
    await goto('/package/vue', { waitUntil: 'hydration' })

    await expect(page.locator('h1')).toContainText('vue', { timeout: 15000 })

    const packageManagerButton = page.locator('button[aria-haspopup="listbox"]').first()
    await expect(packageManagerButton).toBeVisible()

    // Open dropdown
    await packageManagerButton.click()
    const packageManagerDropdown = page.locator('[role="listbox"]')
    await expect(packageManagerDropdown).toBeVisible({ timeout: 5000 })

    // Arrow keys navigate the listbox
    await packageManagerButton.press('ArrowDown')
    const firstDescendant = await packageManagerDropdown.getAttribute('aria-activedescendant')
    await packageManagerButton.press('ArrowDown')
    const secondDescendant = await packageManagerDropdown.getAttribute('aria-activedescendant')
    expect(secondDescendant).not.toBe(firstDescendant)

    // Escape closes dropdown and returns focus
    await packageManagerButton.press('Escape')
    await expect(packageManagerDropdown).not.toBeVisible()
    await expect(packageManagerButton).toBeFocused()

    // Enter selects option and closes dropdown
    await packageManagerButton.click()
    await expect(packageManagerDropdown).toBeVisible({ timeout: 5000 })
    await packageManagerButton.press('ArrowDown')
    await packageManagerButton.press('Enter')
    await expect(packageManagerDropdown).not.toBeVisible()
  })
})
```

## test/e2e/create-command.spec.ts, lines 1–173

```ts
import { expect, test } from './test-utils'

test.describe('Create Command', () => {
  test.describe('Visibility', () => {
    test('/vite - should show create command (same maintainers)', async ({ page, goto }) => {
      await goto('/package/vite', { waitUntil: 'domcontentloaded' })

      // Create command section should be visible (SSR)
      // Use specific container to avoid matching README code blocks
      const createCommandSection = page.locator('.group\\/createcmd').first()
      await expect(createCommandSection).toBeVisible()
      await expect(createCommandSection.locator('code')).toContainText(/create vite/i)

      // Link to create-vite should be present (uses sr-only text, so check attachment not visibility)
      await expect(page.locator('a[href="/package/create-vite"]').first()).toBeAttached()
    })

    test('/next - should show create command (shared maintainer, same repo)', async ({
      page,
      goto,
    }) => {
      await goto('/package/next', { waitUntil: 'domcontentloaded' })

      // Create command section should be visible (SSR)
      // Use specific container to avoid matching README code blocks
      const createCommandSection = page.locator('.group\\/createcmd').first()
      await expect(createCommandSection).toBeVisible()
      await expect(createCommandSection.locator('code')).toContainText(/create next-app/i)

      // Link to create-next-app should be present (uses sr-only text, so check attachment not visibility)
      await expect(page.locator('a[href="/package/create-next-app"]').first()).toBeAttached()
    })

    test('/nuxt - should show create command (same maintainer, same org)', async ({
      page,
      goto,
    }) => {
      await goto('/package/nuxt', { waitUntil: 'domcontentloaded' })

      // Create command section should be visible (SSR)
      // nuxt has create-nuxt package, so command is "npm create nuxt"
      // Use specific container to avoid matching README code blocks
      const createCommandSection = page.locator('.group\\/createcmd').first()
      await expect(createCommandSection).toBeVisible()
      await expect(createCommandSection.locator('code')).toContainText(/create nuxt/i)
    })

    test('/is-odd - should NOT show create command (no create-is-odd exists)', async ({
      page,
      goto,
    }) => {
      await goto('/package/is-odd', { waitUntil: 'domcontentloaded' })

      // Wait for package to load
      await expect(page.locator('h1').filter({ hasText: 'is-odd' })).toBeVisible()

      // Create command section should NOT be visible (no create-is-odd exists)
      // Use .first() for consistency, though none should exist
      const createCommandSection = page.locator('.group\\/createcmd').first()
      await expect(createCommandSection).not.toBeVisible()
    })
  })

  test.describe('Copy Functionality', () => {
    test('hovering create command shows copy button', async ({ page, goto }) => {
      await goto('/package/vite', { waitUntil: 'hydration' })

      await expect(page.locator('h1')).toContainText('vite', { timeout: 15000 })

      await expect(page.locator('main header').locator('text=/v\\d+\\.\\d+/')).toBeVisible({
        timeout: 15000,
      })

      // Find the create command container (wait longer for API response)
      const createCommandContainer = page.locator('.group\\/createcmd').first()
      await expect(createCommandContainer).toBeVisible({ timeout: 20000 })

      // Copy button should initially be hidden (opacity-0)
      const copyButton = createCommandContainer.locator('button')
      await expect(copyButton).toHaveCSS('opacity', '0')

      // Hover over the container
      await createCommandContainer.hover()

      // Copy button should become visible
      await expect(copyButton).toHaveCSS('opacity', '1')
    })

    test('clicking copy button copies create command and shows confirmation', async ({
      page,
      goto,
      context,
    }) => {
      // Grant clipboard permissions
      await context.grantPermissions(['clipboard-read', 'clipboard-write'])

      await goto('/package/vite', { waitUntil: 'hydration' })
      await expect(page.locator('h1')).toContainText('vite', { timeout: 15000 })

      await expect(page.locator('main header').locator('text=/v\\d+\\.\\d+/')).toBeVisible({
        timeout: 15000,
      })

      const createCommandContainer = page.locator('.group\\/createcmd').first()
      await expect(createCommandContainer).toBeVisible({ timeout: 20000 })

      await createCommandContainer.hover()

      // Click the copy button
      const copyButton = createCommandContainer.locator('button')
      await copyButton.click()

      // Button text should change to "copied!"
      await expect(copyButton).toContainText(/copied/i)

      // Verify clipboard content contains the create command
      const clipboardContent = await page.evaluate(() => navigator.clipboard.readText())
      expect(clipboardContent).toMatch(/create vite/i)

      await expect(copyButton).toContainText(/copy/i, { timeout: 5000 })
      await expect(copyButton).not.toContainText(/copied/i)
    })
  })

  test.describe('Install Command Copy', () => {
    test('hovering install command shows copy button', async ({ page, goto }) => {
      await goto('/package/is-odd', { waitUntil: 'hydration' })

      // Find the install command container
      const installCommandContainer = page.locator('.group\\/installcmd').first()
      await expect(installCommandContainer).toBeVisible()

      // Copy button should initially be hidden
      const copyButton = installCommandContainer.locator('button')
      await expect(copyButton).toHaveCSS('opacity', '0')

      // Hover over the container
      await installCommandContainer.hover()

      // Copy button should become visible
      await expect(copyButton).toHaveCSS('opacity', '1')
    })

    test('clicking copy button copies install command and shows confirmation', async ({
      page,
      goto,
      context,
    }) => {
      // Grant clipboard permissions
      await context.grantPermissions(['clipboard-read', 'clipboard-write'])

      await goto('/package/is-odd', { waitUntil: 'hydration' })

      // Find and hover over the install command container
      const installCommandContainer = page.locator('.group\\/installcmd').first()
      await installCommandContainer.hover()

      // Click the copy button
      const copyButton = installCommandContainer.locator('button')
      await copyButton.click()

      // Button text should change to "copied!"
      await expect(copyButton).toContainText(/copied/i)

      // Verify clipboard content contains the install command
      const clipboardContent = await page.evaluate(() => navigator.clipboard.readText())
      expect(clipboardContent).toMatch(/install is-odd|add is-odd/i)

      await expect(copyButton).toContainText(/copy/i, { timeout: 5000 })
      await expect(copyButton).not.toContainText(/copied/i)
    })
  })
})
```

## vitest.config.ts, lines 1–65

```ts
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite-plus'
import { defineVitestProject } from '@nuxt/test-utils/config'
import { playwright } from 'vite-plus/test/browser-playwright'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
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
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL('.', import.meta.url)),
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
      // Exclude files that cause parse errors during coverage remapping.
      // The V8 coverage provider uses rolldown to parse source files, but
      // rolldown seems to currently fail on Vite's SSR transform output (`await __vite_ssr_import__`).
      exclude: [
        '**/node_modules/**',
        'cli/**',
        'app/utils/versions.ts',
        'app/utils/package-name.ts',
```
