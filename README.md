# Study Quest — website

The download and marketing site for **Study Quest**, a local-first Windows study
tracker. The app turns focus sessions into XP, streaks, missions, and a
twelve-month activity calendar without an account, cloud, or telemetry.

The site is a small set of five static pages rather than one long scroll:

| Page | URL | What it covers |
| --- | --- | --- |
| Home | `/` | Pitch, contents, the study loop, toolkit teaser, download CTA |
| Features | `/features/` | Full toolkit, overlay, interactive XP receipt |
| Privacy | `/privacy/` | Local data model, data ledger, backup and reset |
| Download | `/download/` | Installer ticket, SHA-256, first-run and tray notes |
| FAQ | `/faq/` | 17 grouped questions and troubleshooting |

- **Stack:** Vite 8, React 19, plain CSS, no client-side router
- **Runtime dependencies:** `react`, `react-dom`
- **Footprint:** five HTML files (~3 kB each), 50 kB CSS (9.8 kB gzipped),
  277 kB JS (84 kB gzipped)
- **Hosting:** any static file host; no rewrites required
- **Installer:** `public/downloads/Study-Quest-Setup-1.3.1.exe` (74.8 MB,
  unsigned)

The desktop app lives in its own project. Its README is kept at
[`docs/app-readme.md`](docs/app-readme.md) as the factual source for the site
copy.

## Quick start

Requires Node.js 20.19+ or 22.12+.

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build    # writes dist/
npm run preview  # serves dist/ with production headers
```

Always review the site through `npm run preview` before deploying. The
production Content-Security-Policy is only injected at build time, and the dev
server is more permissive so hot reloading keeps working.

## Pages and routing

There is no React Router. Each page is a real `index.html` with its own metadata,
and `src/main.jsx` picks the React page from `<body data-page="...">`. This means:

- URLs are stable and shareable, with no history fallback or rewrite rules.
- Each page has a single `<h1>`, its own title and description, and the same
  strict CSP.
- Navigation is a normal browser load, so the back button, focus, and scroll
  restoration behave as users expect.
- The shared bundle and CSS are cached after the first page.

Pages are declared in four places:

1. `src/config.js` — the `chapters` array drives navigation, the home contents
   list, and the previous/next strip.
2. `src/App.jsx` — maps the page id to a component under `src/pages/`.
3. `src/pages/*.jsx` — composes shared sections for that page.
4. `<page>/index.html` — sets `<body data-page>` and the page metadata.

Remember the `build.rollupOptions.input` entries in `vite.config.js` when adding
a page.

### Adding a page

1. Create `my-page/index.html` from an existing inner page (copy the head, change
   the title, description, and Open Graph tags, and set `data-page="my-page"`).
2. Add a component in `src/pages/` and register it in `src/App.jsx`.
3. Add a chapter entry to `src/config.js`. Header, mobile menu, home contents,
   footer, and chapter navigation update automatically.
4. Add the HTML file to `build.rollupOptions.input` in `vite.config.js`.
5. Add the route to the QA page lists in `scripts/visual-check.mjs`,
   `scripts/a11y-check.mjs`, `scripts/responsive-check.mjs`, and
   `scripts/production-check.mjs`.

## Project structure

```text
Study_Quest_web/
├─ index.html                  Home page shell and metadata
├─ features/index.html         Features page shell
├─ privacy/index.html          Privacy page shell
├─ download/index.html         Download page shell
├─ faq/index.html              FAQ page shell
├─ vite.config.js              Multi-page build, CSP injection, server headers
├─ vercel.json                 Vercel security headers
├─ public/
│  ├─ _headers                 Netlify / Cloudflare Pages headers and caching
│  ├─ downloads/               Installer served as a static file
│  ├─ fonts/                   Self-hosted WOFF2 files and OFL licences
│  ├─ images/                  Screenshots plus generated WebP variants
│  ├─ favicon.svg
│  ├─ og-image.png             1200×630 social preview
│  ├─ og-preview.html/.css     Source used to regenerate og-image.png
│  └─ robots.txt
├─ scripts/                    Image, OG image, and browser QA scripts
├─ docs/app-readme.md          Reference copy of the desktop app README
├─ src/
│  ├─ config.js                Release metadata, chapters, nav, sibling logic
│  ├─ App.jsx                  Page switch, header, main landmark, footer
│  ├─ pages/                   HomePage, FeaturesPage, PrivacyPage,
│  │                           DownloadPage, FaqPage
│  ├─ components/              Header, PageHead, ChapterNav, Contents,
│  │                           DownloadCta, icons, seals, copy button
│  ├─ sections/                Hero, Loop, Features, Progress, Overlay, Privacy,
│  │                           DataLedger, Backup, Download, FirstRun, FAQ,
│  │                           ToolkitTeaser, Footer
│  ├─ hooks/useCopy.js         Clipboard helper with fallback
│  └─ styles/                  tokens, base, components, sections, pages
└─ dist/                       Build output (generated)
```

## Editing content

### Release metadata

[`src/config.js`](src/config.js) is the single source of truth for the version,
download URL, filename, size, SHA-256, platform, data path, navigation, and
chapter list. Change release facts there rather than in individual sections.

When publishing a new build:

1. Copy the new installer into `public/downloads/` and remove the old one.
2. Update `version`, `downloadUrl`, `downloadName`, `sizeLabel`, and `sha256`.
3. Update the hard-coded version and filename in the `<noscript>` blocks and
   page notes that mention them:
   - `index.html`
   - `download/index.html`
   - `src/pages/FeaturesPage.jsx` (`Everything below ships in v1.3.1.`)
   - `src/pages/DownloadPage.jsx` (`v1.3.1 · 74.8 MB · SHA-256 published below.`)
4. Recompute the hash:

   ```powershell
   Get-FileHash ".\public\downloads\Study-Quest-Setup-<version>.exe" -Algorithm SHA256
   ```

   Lowercase the result to match `sha256`. The download page displays this
   value, and `scripts/production-check.mjs` compares it against the installer
   file byte for byte.

### Page copy

Each page component composes sections; each section holds its own copy. Facts
(XP rate, goal presets, data path, tray behaviour, restore limits) come from the
app README. If the app changes, update both the section and
`docs/app-readme.md`.

Colours, type, and spacing live in `src/styles/tokens.css`. The palette is
deliberately small: warm paper, ink, and one moss green accent. Fonts are
Instrument Serif and IBM Plex Mono, self-hosted so the page makes no
third-party requests.

New layout patterns live in `src/styles/pages.css`: page openers, the home
contents list, chapter navigation, the data ledger, backup cards, first-run
notes, and the FAQ groups.

### Images

The source screenshots are copied into `public/images/`. After replacing a PNG,
regenerate the responsive WebP variants:

```powershell
npm run optimize:images
```

Regenerate the social preview after changing the wordmark or palette:

```powershell
npm run dev
npm run og   # requires the dev server on :5173
```

Then delete `public/og-preview.html` and `public/og-preview.css` from the
deployed output if you do not want the preview source to be public. They are
static and harmless, but not needed at runtime.

### Source links

`release.repoUrl` in `src/config.js` is empty, which hides repository links.
Set it to a public repository URL to enable them. External links already use
`rel="noopener noreferrer"`.

## Deployment

`npm run build` produces a fully static `dist/` folder with one HTML file per
page. Upload its contents to any static host.

- Links use trailing slashes (`/features/`). Hosts serve `features/index.html`
  for that path. If yours redirects to a canonical URL, keep the slash form in
  `src/config.js` to avoid an extra hop.
- No SPA rewrite is needed. Do **not** add a catch-all rewrite to `index.html`;
  it would hide broken URLs and hurt caching.
- The site is written for a root deployment. If you host it under a
  subdirectory, set `base` in `vite.config.js` and update the absolute paths in
  the HTML files and `src/config.js`.
- Add a sitemap once the final domain is known. `robots.txt` currently allows
  everything.

### Headers

The app relies on HTTP response headers for the parts a meta tag cannot set,
notably `frame-ancestors`. The same policy is shipped three ways:

| Host | File |
| --- | --- |
| Netlify, Cloudflare Pages | `public/_headers` |
| Vercel | `vercel.json` |
| Everything else | configure the headers manually |

Required headers:

```text
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Frame-Options: DENY
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

The build also injects a CSP `<meta>` tag into every page as a fallback, but keep
the header policy in place. Serve the site over HTTPS; `upgrade-insecure-requests`
is part of the policy and HSTS should be enabled at the host. See
[`SECURITY.md`](SECURITY.md) for the rationale and a deployment checklist.

### Caching

`public/_headers` caches `/assets/*` and `/fonts/*` for a year (content-hashed or
immutable), images for a week, and the installer for a day. HTML is always
revalidated. Vercel and other hosts use their defaults; add equivalent rules if
the installer is updated in place rather than replaced under a new filename.

### Open Graph URLs

`og:image` is currently a relative path on every page. Some social scrapers
require an absolute URL, so set it to `https://<your-domain>/og-image.png` once
the final domain is known. Titles and descriptions are already page-specific.

## QA scripts

The scripts use Playwright with the locally installed Chrome at
`C:\Program Files\Google\Chrome\Application\chrome.exe`. Adjust
`executablePath` in each script if Chrome is elsewhere, or install Playwright's
own browser and drop the option.

Start a server first, then point the scripts at it:

```powershell
npm run build
npm run preview -- --host 127.0.0.1 --port 4180
$env:QA_URL = "http://127.0.0.1:4180"
```

| Script | What it checks |
| --- | --- |
| `npm run check:a11y` | axe-core WCAG 2.1 A/AA + best practices on all five pages at 1440 px and 390 px |
| `npm run check:prod` | Per-page titles, h1s, active nav, broken anchors, internal link status, CSP meta, headers, installer hash, deep links, mobile menu keyboard behaviour, third-party requests |
| `npm run check:visual` | All five pages, font/image loading, CSP violations, overflow, the receipt, clipboard copy, hash panel, FAQ groups |
| `npm run check:responsive` | Full-page screenshots of every page at 390 px, 768 px, and 1440 px |
| `npm run check:measure` | Width measurements for the mobile ticket, ledger, receipt, and FAQ |

Screenshots are written to `%TEMP%\opencode\shots`. The a11y script runs with
`bypassCSP` because the production policy correctly blocks injected script tags,
including axe.

Current expected results on the production build: zero axe violations across
ten audits, zero console errors, no third-party requests, no cookies, all
internal links returning 200, and the SHA-256 shown on the download page
matching the installer file.

## Accessibility notes

- One `<h1>` per page; section numbering uses `aria-hidden` separators.
- Skip link to `#main`, visible on the first Tab press.
- The current page has `aria-current="page"` in the header and mobile menu.
- Page changes are real navigations, so screen readers announce the new title.
- The mobile menu moves focus into the panel, closes on Escape, and returns
  focus to the toggle.
- FAQ buttons use `aria-expanded`/`aria-controls`; groups are real sections with
  their own headings, and the sticky table of contents is removed on narrow
  screens so questions come first.
- Chapter navigation uses `rel="prev"` / `rel="next"` and descriptive labels.
- The sample receipt is a labelled group with a text input plus radio group.
- All animation is disabled under `prefers-reduced-motion: reduce`.
- Decorative marks are `aria-hidden`; images have alt text; icons are never the
  only label for a control.
- The no-JavaScript fallback is styled by the same stylesheet and still offers
  the download.

## License

The site's code and copy are part of the Study Quest project. The desktop app is
released under the MIT licence. Bundled fonts are under the SIL Open Font
License; licence texts are in `public/fonts/`.
