// Capture real process output and timing in asciicast v2, in an isolated shop copy.
// SHOP_REPO=/path/to/claw-and-chew node starter/scripts/record-blocked-button-terminal.mjs
import { cp, mkdtemp, mkdir, readFile, writeFile, symlink, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawn } from 'node:child_process'

const shop = process.env.SHOP_REPO ?? '/Users/alexanderopalic/Projects/opensource/claw-and-chew'
const destination = new URL('../public/shop/terminal/', import.meta.url)
const scratch = await mkdtemp(resolve(tmpdir(), 'tacon-terminal-'))
const args = ['exec', 'vitest', 'run', '--project', 'jsdom', 'app/catalog/ProductCard.dom.test.ts', '--reporter=default']
try {
  for (const entry of ['app', 'tests', 'package.json', 'vitest.config.ts', 'tsconfig.json']) {
    await cp(resolve(shop, entry), resolve(scratch, entry), { recursive: true })
  }
  for (const entry of ['node_modules', '.nuxt']) await symlink(resolve(shop, entry), resolve(scratch, entry), 'dir')
  const target = resolve(scratch, 'app/catalog/ProductCard.vue')
  const source = await readFile(target, 'utf8')
  if (source.split('pointer-events: none;').length !== 2) throw new Error('Expected one mutation target')
  await writeFile(target, source.replace('pointer-events: none;', 'pointer-events: auto;'))
  const command = `pnpm ${args.join(' ')}`
  const events = [[0, 'o', `$ ${command}\r\n`]]
  const started = performance.now()
  const env = { ...process.env, FORCE_COLOR: '1', CI: '1' }
  delete env.NO_COLOR
  const child = spawn('pnpm', args, { cwd: scratch, env })
  let output = ''
  const capture = (chunk) => {
    const text = chunk.toString().replaceAll(scratch, '/demo/claw-and-chew').replace(/\r?\n/g, '\r\n')
    output += text
    events.push([Number(((performance.now() - started) / 1000 + 1).toFixed(3)), 'o', text])
  }
  child.stdout.on('data', capture)
  child.stderr.on('data', capture)
  const code = await new Promise((accept, reject) => { child.on('error', reject); child.on('close', accept) })
  if (code !== 0 || !output.replace(/\x1b\[[0-9;]*m/g, '').includes('1 passed')) throw new Error(`Test did not pass: ${output}`)
  events.push([events.at(-1)[0] + 3, 'o', '\r\n$ '])
  await mkdir(destination, { recursive: true })
  await writeFile(new URL('blocked-button-jsdom.cast', destination), [
    { version: 2, width: 100, height: 15, timestamp: Math.floor(Date.now() / 1000), title: 'JSDOM: blocked button, test passes', env: { TERM: 'xterm-256color' } },
    ...events,
  ].map(JSON.stringify).join('\n') + '\n')
  await writeFile(new URL('blocked-button-jsdom.json', destination), JSON.stringify({
    recordedAt: new Date().toISOString(), command, exitCode: code,
    mutation: { file: 'app/catalog/ProductCard.vue', before: 'pointer-events: none;', after: 'pointer-events: auto;' },
    method: 'Real process output with measured timing; isolated source copy; working directory redacted.',
  }, null, 2) + '\n')
  console.log(output)
} finally {
  await rm(scratch, { recursive: true, force: true })
}
