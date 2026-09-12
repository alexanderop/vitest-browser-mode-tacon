import { chromium } from 'playwright-chromium'
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
const starter=resolve(dirname(fileURLToPath(import.meta.url)),'..')
const output=resolve(starter,'../output/shop-incidents/playback')
await mkdir(output,{recursive:true})
const browser=await chromium.launch()
const page=await browser.newPage({viewport:{width:1440,height:810}})
const results=[]
try{
 for(let slide=3;slide<=7;slide++){
  await page.goto(`http://localhost:3030/${slide}`,{waitUntil:'networkidle'})
  const video=page.locator(`[data-slidev-no="${slide}"] video`)
  await video.waitFor()
  await page.waitForFunction(n=>{
   const v=document.querySelector(`[data-slidev-no="${n}"] video`)
   return v&&v.readyState>=2&&v.currentTime>.2&&!v.paused&&Number.isFinite(v.duration)
  },slide)
  const meta=await video.evaluate(v=>({src:v.currentSrc,duration:v.duration,width:v.videoWidth,height:v.videoHeight,controls:v.controls,muted:v.muted,error:v.error?.message}))
  if(meta.error||meta.duration<8||!meta.controls||!meta.muted)throw new Error(JSON.stringify(meta))
  await page.screenshot({path:resolve(output,`${slide}-playing.png`)})
  await video.evaluate(v=>{v.pause();v.currentTime=v.duration-1})
  await page.waitForFunction(n=>{const v=document.querySelector(`[data-slidev-no="${n}"] video`);return v&&!v.seeking&&v.readyState>=2},slide)
  await page.screenshot({path:resolve(output,`${slide}-result.png`)})
  await video.evaluate(v=>v.play())
  await page.keyboard.press('ArrowRight')
  await page.waitForFunction(n=>document.querySelector(`[data-slidev-no="${n}"] video`)?.paused??true,slide)
  results.push({slide,...meta,autoplay:true,resultFrame:true,pausedOnExit:true})
 }
 await writeFile(resolve(output,'report.json'),JSON.stringify(results,null,2)+'\n')
 console.log(JSON.stringify({videos:results.length,playback:'passed'},null,2))
}finally{await browser.close()}
