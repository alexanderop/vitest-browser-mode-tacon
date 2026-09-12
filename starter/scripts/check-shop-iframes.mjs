import { chromium } from 'playwright-chromium'
import { mkdir, writeFile } from 'node:fs/promises'
const output=new URL('../../output/shop-iframes/',import.meta.url)
await mkdir(output,{recursive:true})
const browser=await chromium.launch()
const page=await browser.newPage({viewport:{width:1440,height:810}})
const results=[]
const assert=(value,message)=>{if(!value)throw new Error(message)}
try{
 for(const slide of [3,5,6,7,8]){
  await page.goto(`http://localhost:3030/${slide}`,{waitUntil:'networkidle'})
  const layout=page.locator(`[data-slidev-no="${slide}"]`)
  const frame=layout.frameLocator('iframe')
  await frame.getByRole('button',{name:'Funktionierende Variante'}).and(frame.locator(':enabled')).waitFor()
  const location=await layout.locator('iframe').getAttribute('src')
  if(slide===3){
   const add=frame.getByRole('button',{name:'Add The little claw plush to bag'})
   const box=await add.boundingBox();assert(box,'Product visible')
   await page.mouse.click(box.x+box.width/2,box.y+box.height/2)
   assert(await frame.getByRole('button',{name:'Open bag, 0 items'}).count()===1,'Blocked click stays empty')
   await frame.getByRole('button',{name:'Funktionierende Variante'}).click()
   await add.click()
   await frame.getByRole('button',{name:'Open bag, 1 items'}).waitFor({state:'attached'})
   await layout.getByRole('button',{name:'Demo neu laden'}).click()
   await frame.getByRole('button',{name:'Funktionierende Variante'}).and(frame.locator(':enabled')).waitFor()
  }
  if(slide===5||slide===6){
   if(slide===6){await frame.getByRole('button',{name:'Vorschau verkleinern',exact:true}).click();await frame.getByText('Preview: 280 px',{exact:true}).waitFor()}
   const surface=await frame.getByLabel('T-shirt print preview',{exact:true}).boundingBox()
   const knob=await frame.getByRole('button',{name:'Move mascot print'}).boundingBox()
   assert(surface&&knob,'Customizer visible inside scaled frame')
   await page.mouse.move(knob.x+knob.width/2,knob.y+knob.height/2)
   await page.mouse.down();await page.mouse.move(surface.x+surface.width*.75,surface.y+surface.height*.6,{steps:15});await page.mouse.up()
   const expected=slide===5?'Position: 50%, 45%':'Position: 53%, 60%'
   const actual=await frame.getByLabel('Print position',{exact:true}).textContent()
   await page.screenshot({path:new URL(`${slide}-drag.png`,output).pathname})
   // Scaled iframe coordinates can round down by one percentage point.
   assert(slide===6 ? /^Position: 5[23]%, 60%$/.test(actual ?? '') : actual===expected,`Real drag on slide ${slide}: expected ${expected}, got ${actual}; surface ${JSON.stringify(surface)}`)
  }
  if(slide===7){
   const bag=frame.locator('.drawer-body');await bag.hover();await page.mouse.wheel(0,1500)
   await page.waitForTimeout(300)
   assert(await bag.evaluate(el=>el.scrollTop)===0,'Broken bag remains unscrollable')
  }
  if(slide===8)assert(await frame.locator('.demo-notice').evaluate(el=>getComputedStyle(el).color)==='rgb(68, 68, 68)','Low contrast visible')
  await page.screenshot({path:new URL(`${slide}-interactive.png`,output).pathname})
  await layout.getByRole('button',{name:'JSDOM-Ergebnis zeigen'}).click()
  const result=layout.locator('.result img')
  await result.waitFor()
  await result.evaluate(img => img.decode())
  assert(await result.evaluate(img=>img.complete&&img.naturalWidth>0),'Saved test result loads')
  await layout.getByRole('button',{name:'Zurück zum Shop'}).click()
  results.push({slide,url:location,interaction:'passed',resultReveal:'passed'})
 }
 await writeFile(new URL('report.json',output),JSON.stringify(results,null,2)+'\n')
 console.log(JSON.stringify({iframes:results.length,status:'passed'},null,2))
}finally{await browser.close()}
