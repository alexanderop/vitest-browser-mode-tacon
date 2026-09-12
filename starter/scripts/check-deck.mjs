import { chromium } from 'playwright-chromium'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const origin = process.argv[2] || 'http://localhost:3030'
const output = resolve('../artifacts/deck-check')
const source = await readFile(resolve('slides.md'), 'utf8')
const slideCount = [...source.matchAll(/^layout:/gm)].length
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
const findings = []
try {
  for (let slide = 1; slide <= slideCount; slide++) {
    await page.goto(`${origin}/${slide}?clicks=99`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(500)
    await page.evaluate(() => document.fonts.ready)
    const result = await page.locator(`[data-slidev-no="${slide}"] .slidev-layout`).evaluate((layout) => {
      const bounds = layout.getBoundingClientRect()
      const overflow = [...layout.querySelectorAll('h1, h2, p, pre, table, img, video, li, .contract__title, .screenshot-comparison, .lab-example')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          const fullBleed = element.tagName === 'IMG' && getComputedStyle(element).position === 'absolute'
          const bottom = fullBleed ? bounds.bottom + 2 : bounds.bottom - 28
          return rect.width && rect.height && (rect.left < bounds.left - 2 || rect.right > bounds.right + 2 || rect.bottom > bottom || element.scrollWidth > element.clientWidth + 2)
        }).map((element) => element.textContent.slice(0, 90) || element.tagName)
      const brokenImages = [...layout.querySelectorAll('img')]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute('src'))
      const titles = [...layout.querySelectorAll('.contract__title')]
      const overlaps = titles.slice(1).filter((title, index) => title.getBoundingClientRect().left < titles[index].getBoundingClientRect().right).map(title => title.textContent)
      return { title: layout.querySelector('h1')?.textContent, overflow, brokenImages, overlaps }
    })
    findings.push({ slide, ...result })
    await page.screenshot({ path: `${output}/${slide}.png` })
  }
  for (let start = 1; start <= slideCount; start += 6) {
    const cards = []
    for (let slide = start; slide < start + 6 && slide <= slideCount; slide++) {
      const data = await readFile(`${output}/${slide}.png`)
      cards.push(`<div><p>${slide}</p><img src="data:image/png;base64,${data.toString('base64')}" /></div>`)
    }
    await page.setViewportSize({ width: 1440, height: 1320 })
    await page.setContent(`<style>body{margin:16px;background:#fff;font:20px sans-serif}main{display:grid;grid-template-columns:1fr 1fr;gap:16px}p{margin:4px}img{width:100%}</style><main>${cards.join('')}</main>`)
    await page.screenshot({ path: `${output}/contact-${start}.png` })
  }
  await writeFile(`${output}/report.json`, JSON.stringify(findings, null, 2))
  const problems = findings.filter((item) => item.error || item.overflow?.length || item.brokenImages?.length || item.overlaps?.length)
  console.log(JSON.stringify({ slides: findings.length, problems }, null, 2))
  if (problems.length) process.exitCode = 1
} finally {
  await browser.close()
}
