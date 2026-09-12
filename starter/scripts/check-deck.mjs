import { chromium } from 'playwright-chromium'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const origin = process.argv[2] || 'http://localhost:3030'
const output = resolve('../artifacts/deck-check')
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 810 } })
const findings = []
try {
  for (let slide = 1; slide <= 33; slide++) {
    await page.goto(`${origin}/${slide}?clicks=99`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(400)
    const result = await page.locator('.slidev-layout').evaluateAll((layouts) => {
      const layout = layouts.find((element) => element.getBoundingClientRect().width > 0)
      if (!layout) return { error: 'No visible slide' }
      const bounds = layout.getBoundingClientRect()
      const overflow = [...layout.querySelectorAll('h1, p, pre, table, img, video, li')]
        .filter((element) => {
          const rect = element.getBoundingClientRect()
          return rect.width && rect.height && (rect.right > bounds.right + 2 || rect.bottom > bounds.bottom - 16 || element.scrollWidth > element.clientWidth + 2)
        }).map((element) => element.textContent.slice(0, 90) || element.tagName)
      const brokenImages = [...layout.querySelectorAll('img')]
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute('src'))
      return { title: layout.querySelector('h1')?.textContent, overflow, brokenImages }
    })
    findings.push({ slide, ...result })
    if (slide === 22) {
      const video = page.locator('video:visible')
      await video.evaluate(async (element) => { element.muted = true; await element.play() })
      await page.waitForFunction(() => [...document.querySelectorAll('video')].some((video) => video.currentTime > 0))
      await video.evaluate((element) => element.pause())
    }
    await page.screenshot({ path: `${output}/${slide}.png` })
  }
  for (let start = 1; start <= 33; start += 6) {
    const cards = []
    for (let slide = start; slide < start + 6 && slide <= 33; slide++) {
      const data = await readFile(`${output}/${slide}.png`)
      cards.push(`<div><p>${slide}</p><img src="data:image/png;base64,${data.toString('base64')}" /></div>`)
    }
    await page.setViewportSize({ width: 1440, height: 1320 })
    await page.setContent(`<style>body{margin:16px;background:#fff;font:20px sans-serif}main{display:grid;grid-template-columns:1fr 1fr;gap:16px}p{margin:4px}img{width:100%}</style><main>${cards.join('')}</main>`)
    await page.screenshot({ path: `${output}/contact-${start}.png` })
  }
  await writeFile(`${output}/report.json`, JSON.stringify(findings, null, 2))
  const problems = findings.filter((item) => item.error || item.overflow?.length || item.brokenImages?.length)
  console.log(JSON.stringify({ slides: findings.length, videoPlayback: 'passed', problems }, null, 2))
  if (problems.length) process.exitCode = 1
} finally {
  await browser.close()
}
