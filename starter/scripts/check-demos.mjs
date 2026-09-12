import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright-chromium'

const origin = process.argv[2] || 'http://localhost:3030'
const bodies = (await readFile(new URL('../slides.md', import.meta.url), 'utf8'))
  .split(/^---\s*$/m).filter((_, index) => index > 0 && index % 2 === 0)
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
async function open(marker) {
  const index = bodies.findIndex(body => body.includes(marker))
  assert.notEqual(index, -1, `Missing demo: ${marker}`)
  await page.goto(`${origin}/${index + 1}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(450)
  return page.locator(`[data-slidev-no="${index + 1}"]`)
}
try {
  let slide = await open('<BlockedButtonSlide')
  const add = slide.getByRole('button', { name: 'Add plush to demo bag', exact: true })
  const count = slide.getByLabel('Demo bag count')
  await add.click()
  assert.equal(await count.innerText(), '1 items in demo bag')
  await slide.getByRole('button', { name: 'Introduce defect', exact: true }).click()
  const bounds = await add.boundingBox()
  assert.ok(bounds)
  // Real input reaches the overlay, not the covered button.
  await page.mouse.click(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  assert.equal(await count.innerText(), '0 items in demo bag')
  await add.evaluate(button => button.addEventListener('click', event => {
    button.dataset.observedClick = event.isTrusted ? 'trusted' : 'programmatic'
  }, { once: true }))
  await slide.getByRole('button', { name: 'Dispatch a direct DOM click' }).click()
  assert.equal(await count.innerText(), '1 items in demo bag')
  assert.equal(await add.getAttribute('data-observed-click'), 'programmatic')
  await slide.getByRole('button', { name: 'Working', exact: true }).click()
  await add.click()
  assert.equal(await count.innerText(), '1 items in demo bag')

  slide = await open('<TabsContractDemo')
  assert.equal(await slide.getByRole('tab', { selected: true }).innerText(), 'Account')
  assert.match(await slide.getByRole('tabpanel', { name: 'Account' }).innerText(), /Change your password/)
  await slide.getByRole('switch', { name: 'Defekt aktiv', checked: true }).click()
  await slide.getByRole('tab', { name: 'Account', exact: true }).click()
  await page.keyboard.press('ArrowRight')
  assert.equal(await slide.getByRole('tab', { name: 'Password', exact: true }).evaluate(el => el === document.activeElement), true)
  assert.equal(await slide.getByRole('tab', { selected: true }).innerText(), 'Password')
  assert.match(await slide.getByRole('tabpanel', { name: 'Password' }).innerText(), /Change your password/)
  await slide.getByRole('switch', { name: 'Defekt aktiv', checked: false }).click()
  assert.equal(await slide.getByRole('tab', { selected: true }).innerText(), 'Account')
  assert.match(await slide.getByRole('tabpanel', { name: 'Account' }).innerText(), /Change your password/)
  await slide.getByRole('switch', { name: 'Defekt aktiv', checked: true }).click()
  assert.equal(await slide.getByRole('tab', { selected: true }).innerText(), 'Password')

  slide = await open('example="fixed-preview-width"')
  const output = slide.locator('output')
  for (const [version, expected] of [['Working', '75%'], ['Introduce defect', '53%'], ['Working', '75%']]) {
    await slide.getByRole('button', { name: version, exact: true }).click()
    await slide.getByRole('button', { name: 'Resize preview', exact: true }).click()
    await slide.getByRole('button', { name: 'Calculate at 75%, 60%', exact: true }).click()
    assert.equal(await output.innerText(), `Preview: 280 px · Position: ${expected}, 60%`)
  }
  const mascot = await slide.getByAltText('Mascot print').boundingBox()
  const preview = await slide.locator('.preview').boundingBox()
  assert.ok(mascot && preview)
  await page.mouse.move(mascot.x + mascot.width / 2, mascot.y + mascot.height / 2)
  await page.mouse.down()
  await page.mouse.move(preview.x + preview.width * .25, preview.y + preview.height * .3, { steps: 8 })
  await page.mouse.up()
  assert.equal(await output.innerText(), 'Preview: 280 px · Position: 25%, 30%')
  console.log('Passed: blocked pointer, programmatic DOM click, restore, keyboard tabs, semantic mismatch and restore, resize regression and restore, native pointer drag.')
} finally {
  await browser.close()
}
