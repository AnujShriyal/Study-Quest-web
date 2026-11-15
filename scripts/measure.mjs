import { chromium } from 'playwright-core'

const baseUrl = process.env.QA_URL ?? 'http://127.0.0.1:5173'
const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
})
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()

async function measure(path, selectors) {
  await page.goto(baseUrl + path, { waitUntil: 'networkidle' })
  return page.evaluate((list) => {
    function rect(selector) {
      const el = document.querySelector(selector)
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      }
    }
    return {
      inner: window.innerWidth,
      docScroll: document.documentElement.scrollWidth,
      bodyScroll: document.body.scrollWidth,
      elements: Object.fromEntries(
        list.map((selector) => [selector, rect(selector)]),
      ),
    }
  }, selectors)
}

const results = {
  home: await measure('/', ['.hero', '.contents', '.teaser', '.cta-band']),
  features: await measure('/features/', [
    '.page-head',
    '.feature-grid',
    '.receipt',
    '.chapter-nav',
  ]),
  privacy: await measure('/privacy/', [
    '.page-head',
    '.data-card',
    '.ledger__table-wrap',
    '.backup-grid',
  ]),
  download: await measure('/download/', [
    '.ticket',
    '.verify',
    '.verify__hash',
    '.verify__cmd',
    '.first-run',
  ]),
  faq: await measure('/faq/', ['.page-head', '.faq-page__aside', '.faq__list']),
}

console.log(JSON.stringify(results, null, 2))
await browser.close()
