import { chromium } from 'playwright-core'
import { mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

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

const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
})

const page = await context.newPage()
const issues = []

page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') {
    issues.push(`console.${msg.type()}: ${msg.text()}`)
  }
})
page.on('pageerror', (error) => issues.push(`pageerror: ${error.message}`))
page.on('requestfailed', (request) =>
  issues.push(`requestfailed: ${request.url()} ${request.failure()?.errorText ?? ''}`),
)

await page.addInitScript(() => {
  window.__cspViolations = []
  document.addEventListener('securitypolicyviolation', (event) => {
    window.__cspViolations.push(
      `${event.violatedDirective} :: ${event.blockedURI || 'inline'}`,
    )
  })
})

async function settle(target) {
  await target.evaluate(async () => {
    const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await pause(60)
    }
    window.scrollTo(0, 0)
    await pause(150)
  })
  await target.waitForFunction(() =>
    [...document.images].every((img) => img.complete && img.naturalWidth > 0),
  )
}

async function open(id) {
  await page.goto(baseUrl + pages.find((entry) => entry.id === id).path, {
    waitUntil: 'networkidle',
  })
  await settle(page)
}

const results = {}

for (const entry of pages) {
  await open(entry.id)
  const metrics = await page.evaluate(() => {
    const overflow = [...document.querySelectorAll('body *')]
      .filter((el) => {
        const rect = el.getBoundingClientRect()
        return (
          rect.width > 0 &&
          (rect.right > window.innerWidth + 1 || rect.left < -1)
        )
      })
      .slice(0, 15)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`)

    return {
      title: document.title,
      page: document.body.dataset.page,
      h1: [...document.querySelectorAll('h1')].map((el) => el.innerText),
      viewport: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      csp: window.__cspViolations,
      brokenImages: [...document.images]
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.currentSrc),
      images: [...document.images].map((img) => ({
        src: img.currentSrc.split('/').pop(),
        width: img.naturalWidth,
      })),
      overflow,
    }
  })
  results[entry.id] = metrics
  await page.screenshot({ path: `${out}/${entry.id}-fold.png` })
  await page.screenshot({ path: `${out}/${entry.id}-full.png`, fullPage: true })
}

// Features: the interactive receipt.
await open('features')
await page.locator('#session-length').fill('90')
await page.locator('label[for="goal-240"]').click()
const receipt = await page.locator('.receipt').innerText()
await page.locator('.receipt').screenshot({ path: `${out}/features-receipt.png` })

// Privacy: copy the data path (clipboard permission is needed).
await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
  origin: baseUrl,
})
await open('privacy')
await page.locator('.data-card .copy-btn').click()
const copiedPath = await page.evaluate(() => navigator.clipboard.readText())

// Download: hash panel and file integrity.
await open('download')
await page.locator('.verify summary').click()
const hashText = await page.locator('.verify__hash').innerText()
const fileHash = createHash('sha256')
  .update(readFileSync('public/downloads/Study-Quest-Setup-1.3.1.exe'))
  .digest('hex')

// FAQ: group accordion and deep links.
await open('faq')
const faqGroups = await page.locator('.faq-group').count()
await page.locator('#fix button').first().click()
const faqOpen = await page
  .locator('#fix button')
  .first()
  .getAttribute('aria-expanded')
const faqToc = await page.locator('.faq-page__toc a').count()

// Mobile snapshots and overflow checks.
const mobile = await context.newPage()
const mobileResults = {}
for (const entry of pages) {
  await mobile.setViewportSize({ width: 390, height: 844 })
  await mobile.goto(baseUrl + entry.path, { waitUntil: 'networkidle' })
  await settle(mobile)
  mobileResults[entry.id] = await mobile.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    pageHeight: document.documentElement.scrollHeight,
    overflow: [...document.querySelectorAll('body *')]
      .filter((el) => {
        const rect = el.getBoundingClientRect()
        return (
          rect.width > 0 &&
          (rect.right > window.innerWidth + 1 || rect.left < -1)
        )
      })
      .slice(0, 15)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(' ')[0]}`),
  }))
  await mobile.screenshot({
    path: `${out}/mobile-${entry.id}-fold.png`,
  })
  if (entry.id === 'home') {
    await mobile.screenshot({ path: `${out}/mobile-home-full.png`, fullPage: true })
  }
}
await mobile.locator('.menu-toggle').click()
await mobile.waitForTimeout(200)
await mobile.screenshot({ path: `${out}/mobile-menu.png` })

console.log(
  JSON.stringify(
    {
      issues,
      results,
      interactions: {
        receipt,
        copiedPath,
        verify: { hash: hashText, fileHash, matches: hashText === fileHash },
        faqGroups,
        faqOpen,
        faqToc,
      },
      mobileResults,
    },
    null,
    2,
  ),
)

await browser.close()
