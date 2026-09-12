/** Real Nuxt shop recordings, captured by agent-browser; never records the testing lab.
 * SHOP_REPO=/path/to/claw-and-chew node starter/scripts/record-shop-incidents.mjs [scenario]
 * Start the shop on SHOP_URL (default http://127.0.0.1:3080) first.
 */
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { mkdir, readFile, writeFile, open, unlink } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createRequire } from 'node:module'
import { createHash } from 'node:crypto'
const exec = promisify(execFile)
const starter = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const shop = process.env.SHOP_REPO ?? '/Users/alexanderopalic/Projects/opensource/claw-and-chew'
const url = process.env.SHOP_URL ?? 'http://127.0.0.1:3080/'
const require = createRequire(resolve(shop, 'package.json'))
const { chromium, expect } = require('@playwright/test')
const { scenarios, activeScenario, applyScenario, resetScenario } = await import(pathToFileURL(resolve(shop, 'scripts/scenarios.mjs')))
const output = resolve(starter, 'public/shop/incidents')
const evidence = resolve(starter, '../output/shop-incidents')
await mkdir(output, { recursive: true }); await mkdir(evidence, { recursive: true })
const session = 'tacon-incidents'
const agent = (...args) => exec('agent-browser', ['--session', session, ...args], { maxBuffer: 8 * 1024 * 1024 })
const selected = ['blocked-button', 'missing-pointer-capture', 'fixed-preview-width', 'unscrollable-bag', 'low-contrast-notice'].filter(id => !process.argv[2] || process.argv.slice(2).includes(id))
if (!selected.length) throw new Error('Unknown recording scenario')
if (await activeScenario()) throw new Error('An existing scenario is active; preserve it and stop.')
const lock = resolve(shop, '.demo-verify.lock')
const handle = await open(lock, 'wx'); await handle.close()
let ownedMutation = false, recording = false, browser
const summary = []
const titles = {
  'blocked-button': ['Klick ohne Wirkung', 'Kunde kann das Produkt nicht in den Warenkorb legen.'],
  'missing-pointer-capture': ['Der Shirt-Druck bleibt stehen', 'Kunde kann den Druck nicht mit der Maus positionieren.'],
  'fixed-preview-width': ['Falsche Position nach Resize', 'Der Druck landet neben der gewünschten Position.'],
  'unscrollable-bag': ['Warenkorb lässt sich nicht scrollen', 'Kunde erreicht den letzten Entfernen-Button nicht.'],
  'low-contrast-notice': ['Checkout-Hinweis kaum lesbar', 'Die Kontrastprüfung ist unvollständig.'],
}
const digest = x => createHash('sha256').update(x).digest('hex')
const escape = x => x.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
async function test(scenario, phase) {
  const path = resolve(evidence, `${scenario.id}-${phase}-jsdom.json`)
  const args = ['exec','vitest','run','--project','jsdom',scenario.domTest,'--testNamePattern',`^${scenario.testName}$`,'--reporter=default','--reporter=json','--outputFile',path]
  const result = await exec('pnpm', args, { cwd: shop, timeout: 60000, maxBuffer: 8 * 1024 * 1024 })
  await writeFile(path.replace('.json','.log'), result.stdout + '\n' + result.stderr)
  const report = JSON.parse(await readFile(path, 'utf8'))
  const assertion = report.testResults.flatMap(x => x.assertionResults).find(x => x.title === scenario.testName)
  if (!report.success || assertion?.status !== 'passed' || report.numPassedTests !== 1) throw new Error(`Unexpected test result: ${path}`)
  return { status: assertion.status, passed: report.numPassedTests, failed: report.numFailedTests, command: `pnpm exec vitest run --project jsdom ${scenario.domTest}`, testName: scenario.testName, report: path, startTime: report.startTime }
}
try {
  await agent('open', url)
  const cdp = (await agent('get','cdp-url')).stdout.trim()
  browser = await chromium.connectOverCDP(cdp)
  const page = browser.contexts()[0].pages()[0]
  page.setDefaultTimeout(12000)
  const pause = ms => page.waitForTimeout(ms)
  const button = name => page.getByRole('button', { name, exact: true })
  async function fresh() {
    await page.setViewportSize({width:1280,height:720})
    await page.goto(url, {waitUntil:'networkidle'})
    await page.evaluate(() => document.fonts.ready)
    await page.locator('img').evaluateAll(imgs => Promise.all(imgs.map(x => x.decode())))
    await expect(button('Open bag, 0 items')).toBeVisible()
  }
  async function dismiss() {
    const close = button('Dismiss notification')
    if (await close.count()) await close.click()
  }
  async function setup(id) {
    await fresh()
    if (id === 'blocked-button') {
      await button('Add The little claw plush to bag').scrollIntoViewIfNeeded()
    } else if (id.includes('pointer') || id === 'fixed-preview-width') {
      await button('View Claw club tee').click()
      await expect(page.getByLabel('Print position', {exact:true})).toHaveText('Position: 50%, 45%')
      if (id === 'fixed-preview-width') await page.setViewportSize({width:800,height:720})
      await page.getByLabel('T-shirt print preview', {exact:true}).scrollIntoViewIfNeeded()
    } else {
      await button('Add The little claw plush to bag').click(); await dismiss()
      if (id === 'unscrollable-bag') {
        for (const size of ['S','M','L','XL']) {
          await button('View Claw club tee').click()
          await page.getByRole('radio', {name:size,exact:true}).check()
          await page.getByRole('button', {name:/Add to bag ·/}).click(); await dismiss()
        }
        await button('Add A little pinch mug to bag').click(); await dismiss()
        await button('Add Tiny claws sticker pack to bag').click(); await dismiss()
      }
      await page.getByRole('button', {name:/^Open bag,/}).click()
      if (id === 'low-contrast-notice') await button('Checkout').click()
    }
    await pause(900)
    // Recording-only cursor annotation, never changes input routing or product state.
    await page.evaluate(() => {
      const cursor = document.createElement('div')
      cursor.id = 'recording-cursor'
      cursor.style.cssText = 'position:fixed;width:22px;height:22px;border:3px solid #ff6bed;border-radius:50%;pointer-events:none;z-index:2147483647;transform:translate(-50%,-50%);left:-100px;top:-100px;box-shadow:0 0 0 3px #0008;'
      document.body.append(cursor)
      document.addEventListener('pointermove', e => {cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'})
      document.addEventListener('pointerdown', () => {cursor.style.background='#ff6bed88'})
      document.addEventListener('pointerup', () => {cursor.style.background='transparent'})
    })
  }
  async function action(id, broken) {
    if (id === 'blocked-button') {
      const box = await button('Add The little claw plush to bag').boundingBox()
      await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:15});await pause(600)
      for (let i=0;i<(broken?3:1);i++) {await page.mouse.click(box.x+box.width/2,box.y+box.height/2);await pause(850)}
      await expect(button(`Open bag, ${broken?0:1} items`)).toBeAttached()
      const target = await page.evaluate(({x,y}) => document.elementFromPoint(x,y)?.className,{x:box.x+box.width/2,y:box.y+box.height/2})
      if (broken) {
        await button('Open bag, 0 items').click()
        await expect(page.getByRole('heading', {name:'A little empty in here.'})).toBeVisible()
        await pause(1600)
      }
      return {bagCount:broken?0:1,hitTarget:target}
    }
    if (id.includes('pointer') || id === 'fixed-preview-width') {
      const surface=await page.getByLabel('T-shirt print preview',{exact:true}).boundingBox()
      const knob=await button('Move mascot print').boundingBox()
      const target={x:surface.x+surface.width*.75,y:surface.y+surface.height*.6}
      await page.mouse.move(knob.x+knob.width/2,knob.y+knob.height/2,{steps:12});await pause(800)
      await page.mouse.down()
      for(let i=1;i<=35;i++){await page.mouse.move(knob.x+knob.width/2+(target.x-knob.x-knob.width/2)*i/35,knob.y+knob.height/2+(target.y-knob.y-knob.height/2)*i/35);await pause(55)}
      await pause(700);await page.mouse.up()
      const expected=broken?(id==='missing-pointer-capture'?'Position: 50%, 45%':`Position: ${Math.round(surface.width*.75/400*100)}%, 60%`):'Position: 75%, 60%'
      await expect(page.getByLabel('Print position',{exact:true})).toHaveText(expected)
      return {position:expected,expected:'Position: 75%, 60%',previewWidth:surface.width}
    }
    if(id==='unscrollable-bag') {
      const drawer=page.locator('.drawer-body'), last=button('Remove Tiny claws sticker pack')
      const box=await drawer.boundingBox()
      await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:15})
      for(let i=0;i<4;i++){await page.mouse.wheel(0,540);await pause(750)}
      const state=await drawer.evaluate(el=>{const last=el.querySelector('[aria-label="Remove Tiny claws sticker pack"]');return {scrollTop:el.scrollTop,containerBottom:el.getBoundingClientRect().bottom,lastBottom:last.getBoundingClientRect().bottom,overflow:getComputedStyle(el).overflowY}})
      if(broken){expect(state.scrollTop).toBe(0);expect(state.lastBottom).toBeGreaterThan(state.containerBottom)}
      else {expect(state.scrollTop).toBeGreaterThan(0);expect(state.lastBottom).toBeLessThanOrEqual(state.containerBottom);await last.click();await expect(last).toHaveCount(0)}
      return state
    }
    const notice=page.locator('.demo-notice')
    await notice.scrollIntoViewIfNeeded()
    const state=await notice.evaluate(el=>({color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor,text:el.textContent}))
    expect(state.color).toBe(broken?'rgb(68, 68, 68)':'rgb(170, 169, 163)')
    const box=await notice.boundingBox();await page.mouse.move(box.x+box.width*.6,box.y+box.height/2,{steps:16});await pause(2600)
    return state
  }
  async function renderVideo(scenario, raw, result, observed) {
    const [title,impact]=titles[scenario.id]
    const renderer=await browser.newContext({viewport:{width:1280,height:820},deviceScaleFactor:1})
    try {
      const card=await renderer.newPage()
      const details=scenario.id==='fixed-preview-width'?`Ziel: 75 %, 60 % · Tatsächlich: ${observed.position.replace('Position: ','')}`:impact
      await card.setContent(`<style>body{margin:0;background:transparent;font-family:Arial,sans-serif;color:white}footer{position:absolute;top:720px;height:100px;width:1216px;padding:16px 32px;background:#171d2a;border-top:3px solid #ff6bed}b{font-size:18px;color:#ff6bed}p{font-size:26px;margin:10px 0}</style><footer><b>${escape(title)} · SIMULIERTER INCIDENT IM ECHTEN DEMO-SHOP</b><p>${escape(details)}</p></footer>`)
      const overlay=resolve(evidence,`${scenario.id}-overlay.png`)
      await card.screenshot({path:overlay,omitBackground:true})
      await card.setContent(`<style>*{box-sizing:border-box}body{margin:0;padding:64px;background:#202635;color:#fff;font:26px Arial,sans-serif}.label{color:#ff6bed;font-size:20px}h1{font-size:58px;margin:30px 0 20px}.pass{color:#85e0a3;font-size:40px}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#151a24;padding:22px;font:21px monospace;line-height:1.5}p{line-height:1.45}.incident{border-left:5px solid #ff6bed;padding-left:22px;margin-top:30px}.meta{font-size:17px;color:#bbc1ce}</style><div class="label">AUFGEZEICHNETER TESTLAUF · DEFEKT AKTIV</div><h1>Der JSDOM-Test ist grün.</h1><div class="pass">PASS · ${result.passed} Test bestanden · ${result.failed} fehlgeschlagen</div><pre>${escape(scenario.domTest)}\n\n✓ ${escape(result.testName)}</pre><p class="incident">Demo-Incident: ${escape(impact)}</p>${scenario.id==='low-contrast-notice'?'<p>axe meldet auch <code>incomplete</code>.<br>Keine Violations sind kein bestandener Kontrastcheck.</p>':''}<p class="meta">Echtes Vitest-Ergebnis vom ${new Date(result.startTime).toISOString()}<br>Dieselbe Quelltextänderung war während Shop-Aufnahme und Test aktiv.</p>`)
      const cardPath=resolve(evidence,`${scenario.id}-result.png`)
      await card.screenshot({path:cardPath})
      const body=resolve(evidence,`${scenario.id}-annotated.mp4`),ending=resolve(evidence,`${scenario.id}-ending.mp4`)
      await exec('ffmpeg',['-y','-v','error','-i',raw,'-i',overlay,'-filter_complex','[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:820:(ow-iw)/2:0:color=0x202635[base];[base][1:v]overlay=0:0,scale=1280:820,setsar=1,fps=30[v]','-map','[v]','-c:v','libx264','-crf','20','-pix_fmt','yuv420p',body])
      await exec('ffmpeg',['-y','-v','error','-loop','1','-i',cardPath,'-t','6','-r','30','-c:v','libx264','-crf','20','-pix_fmt','yuv420p',ending])
      const concat=resolve(evidence,`${scenario.id}-concat.txt`)
      await writeFile(concat,`file '${body}'\nfile '${ending}'\n`)
      const destination=resolve(output,`${scenario.id}.mp4`)
      await exec('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',concat,'-c','copy','-movflags','+faststart',destination])
      await exec('ffmpeg',['-y','-v','error','-ss','1','-i',destination,'-frames:v','1',resolve(output,`${scenario.id}.jpg`)])
      return {video:`/shop/incidents/${scenario.id}.mp4`,sha256:digest(await readFile(destination))}
    } finally {await renderer.close()}
  }
  for(const id of selected){
    const scenario=scenarios.find(x=>x.id===id)
    console.log(`${id}: checking working shop and JSDOM baseline`)
    const original=digest(await readFile(resolve(shop,scenario.file)))
    const testHash=digest(await readFile(resolve(shop,scenario.domTest)))
    const baselineTest=await test(scenario,'baseline')
    await setup(id);const baseline=await action(id,false)
    await applyScenario(id);ownedMutation=true
    try{
      await setup(id)
      const raw=resolve(evidence,`${id}-raw.mp4`)
      await page.bringToFront();await agent('record','start',raw);recording=true
      await pause(1600);const observed=await action(id,true);await pause(2400)
      await page.screenshot({path:resolve(evidence,`${id}-broken.png`)})
      await agent('record','stop');recording=false
      const brokenHash=digest(await readFile(resolve(shop,scenario.file)))
      const result=await test(scenario,'broken')
      expect(digest(await readFile(resolve(shop,scenario.file)))).toBe(brokenHash)
      expect(digest(await readFile(resolve(shop,scenario.domTest)))).toBe(testHash)
      await resetScenario();ownedMutation=false
      expect(digest(await readFile(resolve(shop,scenario.file)))).toBe(original)
      const restoredTest=await test(scenario,'restored')
      await setup(id);const restored=await action(id,false)
      const video=await renderVideo(scenario,raw,result,observed)
      const entry={id,recordedAt:new Date().toISOString(),url,recorder:'agent-browser 0.37.0 record start/stop',sourceFile:scenario.file,sourceHash:original,brokenHash,testHash,baseline,observed,restored,baselineTest,result,restoredTest,...video}
      summary.push(entry)
      await writeFile(resolve(evidence,`${id}-evidence.json`),JSON.stringify(entry,null,2)+'\n')
      console.log(`${id}: saved video; real browser defect confirmed, JSDOM PASS, source restored`)
    }finally{if(recording){await agent('record','stop');recording=false}if(ownedMutation){await resetScenario();ownedMutation=false}}
  }
  const allEvidence = []
  for (const id of Object.keys(titles)) {
    try { allEvidence.push(JSON.parse(await readFile(resolve(evidence, `${id}-evidence.json`), 'utf8'))) }
    catch (error) { if (error.code !== 'ENOENT') throw error }
  }
  await writeFile(resolve(evidence,'manifest.json'),JSON.stringify(allEvidence,null,2)+'\n')
  await page.setViewportSize({width:1280,height:720});await page.goto(url)
}finally{
  if(recording)await agent('record','stop').catch(console.error)
  if(ownedMutation)await resetScenario()
  await unlink(lock)
  // Close only this recording session; the Nuxt and Slidev servers keep running.
  if(browser)await browser.close()
  await agent('close').catch(console.error)
}
