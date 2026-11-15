import { chromium } from 'playwright-core'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const axePath = require.resolve('axe-core/axe.min.js')

const baseUrl = process.env.QA_URL ?? 'http://127.0.0.1:5173'
const pages = [
  { id: 'home', path: '/' },
  { id: 'features', path: '/features/' },
  { id: 'privacy', path: '/privacy/' },
  { id: 'download', path: '/download/' },
  { id: 'faq', path: '/faq/' },
]

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})

let failures = 0

async function audit(path, width, height, label) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
    bypassCSP: true,
  })
  const page = await context.newPage()
  await page.goto(baseUrl + path, { waitUntil: 'networkidle' })
  await page.addScriptTag({ path: axePath })
  const results = await page.evaluate(async () => {
    return await window.axe.run(document, {
      runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
    })
  })
  const compact = results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    help: violation.help,
    count: violation.nodes.length,
    nodes: violation.nodes.slice(0, 8).map((node) => ({
      target: node.target,
      summary: node.failureSummary?.split('\n').slice(0, 3).join(' '),
    })),
  }))
  if (compact.length > 0) failures += 1
  console.log(`\n=== ${label} (${width}px) ===`)
  console.log(JSON.stringify(compact, null, 2))
  await context.close()
}

for (const entry of pages) {
  await audit(entry.path, 1440, 1000, `${entry.id}, desktop`)
  await audit(entry.path, 390, 844, `${entry.id}, mobile`)
}

console.log(`\nPages with violations: ${failures}`)
await browser.close()
