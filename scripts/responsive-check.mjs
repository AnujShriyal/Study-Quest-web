import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'

const baseUrl = process.env.QA_URL ?? 'http://127.0.0.1:5173'
const out = process.env.TEMP + '\\opencode\\shots'
mkdirSync(out, { recursive: true })

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

async function capture(width, height, tag) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()

  for (const entry of pages) {
    await page.goto(baseUrl + entry.path, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await pause(35)
      }
      window.scrollTo(0, 0)
      await pause(100)
    })
    await page.waitForFunction(() =>
      [...document.images].every((img) => img.complete && img.naturalWidth > 0),
    )
    await page.screenshot({
      path: `${out}/${tag}-${entry.id}.png`,
      fullPage: true,
    })
  }

  await page.goto(`${baseUrl}/download/`, { waitUntil: 'networkidle' })
  await page.locator('.verify summary').click()
  await page.locator('.download').screenshot({
    path: `${out}/${tag}-download-verify.png`,
  })

  await page.goto(`${baseUrl}/faq/`, { waitUntil: 'networkidle' })
  await page.locator('#data button').nth(1).click()
  await page.locator('#data').screenshot({
    path: `${out}/${tag}-faq-open.png`,
  })

  await context.close()
}

await capture(390, 844, 'm390')
await capture(768, 1024, 't768')
await capture(1440, 1000, 'd1440')

console.log('done')
await browser.close()
