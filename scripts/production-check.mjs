import { chromium } from 'playwright-core'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baseUrl = process.env.QA_URL ?? 'http://127.0.0.1:4180'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
  origin: baseUrl,
})

const pages = [
  { id: 'home', path: '/' },
  { id: 'features', path: '/features/' },
  { id: 'privacy', path: '/privacy/' },
  { id: 'download', path: '/download/' },
  { id: 'faq', path: '/faq/' },
]

const issues = []
const failed = []
const pagesInfo = {}
const internalLinks = new Set()

const page = await context.newPage()
const pageRequests = []
page.on('request', (request) => pageRequests.push(request.url()))
page.on('requestfailed', (request) =>
  failed.push(`${request.url()} ${request.failure()?.errorText ?? ''}`),
)
page.on('console', (msg) => {
  if (['error', 'warning'].includes(msg.type())) {
    issues.push(`console.${msg.type()}: ${msg.text()}`)
  }
})
page.on('pageerror', (error) => issues.push(`pageerror: ${error.message}`))

for (const entry of pages) {
  await page.goto(baseUrl + entry.path, { waitUntil: 'networkidle' })
  await page.waitForTimeout(150)

  const info = await page.evaluate(() => {
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map(
      (anchor) => anchor.getAttribute('href'),
    )
    const brokenAnchors = anchors.filter(
      (href) => href === '#' || !document.querySelector(href),
    )
    const links = [...document.querySelectorAll('a[href^="/"]')].map((anchor) =>
      anchor.getAttribute('href').replace(/#.*$/, ''),
    )

    return {
      title: document.title,
      lang: document.documentElement.lang,
      page: document.body.dataset.page,
      h1: [...document.querySelectorAll('h1')].map((el) => el.innerText),
      brokenAnchors,
      links: [...new Set(links)],
      activeNav: [...document.querySelectorAll('.site-nav a[aria-current="page"]')].map(
        (anchor) => anchor.getAttribute('href'),
      ),
      externalLinks: [...document.querySelectorAll('a[target="_blank"]')].map(
        (anchor) => ({ href: anchor.href, rel: anchor.rel }),
      ),
      inlineStyleAttributes: document.querySelectorAll('[style]').length,
      inlineScripts: [...document.querySelectorAll('script')].filter(
        (script) => !script.src && script.textContent.trim(),
      ).length,
      cspMeta: document
        .querySelector('meta[http-equiv="Content-Security-Policy"]')
        ?.getAttribute('content'),
      imagesWithoutAlt: [...document.images].filter((img) => !img.alt).length,
    }
  })

  info.links.forEach((href) => internalLinks.add(href))
  pagesInfo[entry.id] = info
}

// Every internal link should resolve on the static host.
const linkStatuses = {}
for (const href of [...internalLinks].sort()) {
  const response = await page.request.fetch(new URL(href, baseUrl).href, {
    method: 'HEAD',
    failOnStatusCode: false,
  })
  linkStatuses[href] = response.status()
}

// Skip link should appear on the first Tab press.
await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.keyboard.press('Tab')
const skipVisible = await page.locator('.skip-link').evaluate((el) => {
  const rect = el.getBoundingClientRect()
  return getComputedStyle(el).transform !== 'none' && rect.top >= 0
})

// Clipboard copy of the data path on the privacy page.
await page.goto(`${baseUrl}/privacy/`, { waitUntil: 'networkidle' })
await page.locator('.data-card .copy-btn').click()
const copyLabel = await page.locator('.data-card .copy-btn').innerText()
let clipboardText = null
try {
  clipboardText = await page.evaluate(() => navigator.clipboard.readText())
} catch (error) {
  clipboardText = `unavailable: ${error.message}`
}

// Download page: verify panel, hash integrity, and filename.
await page.goto(`${baseUrl}/download/`, { waitUntil: 'networkidle' })
const downloadHref = await page
  .locator('.ticket__download')
  .getAttribute('href')
const downloadName = await page
  .locator('.ticket__download')
  .getAttribute('download')
await page.locator('.verify summary').click()
const verifyOpen = await page.locator('.verify').evaluate((el) => el.open)
const hashText = await page.locator('.verify__hash').innerText()

const installerPath = resolve('public', downloadHref.replace(/^\//, ''))
let fileHash = null
try {
  fileHash = createHash('sha256').update(readFileSync(installerPath)).digest('hex')
} catch (error) {
  fileHash = `error: ${error.message}`
}
const hashMatches = hashText.replace(/\s+/g, '').toLowerCase() === fileHash

// Deep link opens the verify panel too.
await page.goto(`${baseUrl}/download/#verify`, { waitUntil: 'networkidle' })
const deepLinkVerifyOpen = await page
  .locator('.verify')
  .evaluate((el) => el.open)

// FAQ groups and accordion.
await page.goto(`${baseUrl}/faq/`, { waitUntil: 'networkidle' })
const faqGroups = await page.locator('.faq-group').count()
const faqQuestions = await page.locator('.faq__item').count()
await page.locator('#fix button').first().click()
const faqExpanded = await page
  .locator('#fix button')
  .first()
  .getAttribute('aria-expanded')

// Mobile menu keyboard behaviour.
const mobile = await context.newPage()
await mobile.setViewportSize({ width: 390, height: 844 })
await mobile.goto(baseUrl, { waitUntil: 'networkidle' })
await mobile.locator('.menu-toggle').click()
const menuOpen = await mobile
  .locator('.menu-toggle')
  .getAttribute('aria-expanded')
const menuLinks = await mobile.locator('.mobile-menu__nav a').count()
const focusedAfterOpen = await mobile.evaluate(
  () => document.activeElement?.textContent?.trim() ?? '',
)
await mobile.keyboard.press('Escape')
const menuClosed = await mobile
  .locator('.menu-toggle')
  .getAttribute('aria-expanded')
const focusReturned = await mobile.evaluate(
  () => document.activeElement?.classList.contains('menu-toggle') ?? false,
)
await mobile.locator('main').scrollIntoViewIfNeeded()
const mobileOverflow = await mobile.evaluate(
  () => document.documentElement.scrollWidth > window.innerWidth,
)

// Response headers and installer response.
const security = await page.evaluate(async () => {  const response = await fetch(window.location.href, { method: 'HEAD' })
  const headers = {}
  for (const [key, value] of response.headers.entries()) headers[key] = value
  return { status: response.status, headers }
})

const installer = await page.evaluate(async (url) => {
  const response = await fetch(url, { method: 'HEAD' })
  return {
    status: response.status,
    contentType: response.headers.get('content-type'),
    contentLength: response.headers.get('content-length'),
  }
}, new URL(downloadHref, baseUrl).href)

await page.goto(baseUrl, { waitUntil: 'networkidle' })
const cookies = await context.cookies()
const thirdParty = pageRequests.filter(
  (url) => new URL(url).origin !== baseUrl,
)

console.log(
  JSON.stringify(
    {
      issues,
      failed,
      pages: pagesInfo,
      linkStatuses,
      skipVisible,
      copy: { copyLabel, clipboardText },
      download: {
        downloadHref,
        downloadName,
        verifyOpen,
        deepLinkVerifyOpen,
        hash: hashText,
        fileHash,
        hashMatches,
      },
      faq: { groups: faqGroups, questions: faqQuestions, faqExpanded },
      mobile: {
        menuOpen,
        menuLinks,
        focusedAfterOpen,
        menuClosed,
        focusReturned,
        overflow: mobileOverflow,
      },
      security,
      installer,
      cookies,
      thirdParty,
    },
    null,
    2,
  ),
)

await browser.close()
