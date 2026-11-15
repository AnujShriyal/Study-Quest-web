# Security policy

This document covers the **Study Quest website** in this repository: the static
multi-page React site, its download link, and the headers it ships.
Vulnerabilities in the desktop application itself should be reported to the
application's maintainer.

## Reporting a vulnerability

Please do not open a public issue for an unpatched security problem.

- If this project is hosted on GitHub, use **Security → Report a vulnerability**
  to open a private advisory.
- Otherwise, contact the maintainer through the address published on the site
  and include the affected URL, reproduction steps, and impact.

Expect an acknowledgement within a few days. Once a fix is deployed, the report
can be discussed publicly.

## Scope

In scope:

- The production site build and its configuration (`vite.config.js`,
  `public/_headers`, `vercel.json`, `index.html`)
- Content injection or script execution through the site's own code
- Weaknesses in the download flow, file naming, or published integrity metadata
- Vulnerable direct dependencies (`npm audit`)

Out of scope:

- The unsigned Windows installer triggering SmartScreen (expected; see below)
- Missing code signing, missing DMARC, or host-level configuration that is
  documented in the deployment checklist but outside this repository
- Volumetric denial of service against a static host
- Reports that require a compromised browser, extension, or local machine

## Security model

The site is deliberately small and static:

- **Five static pages.** `/`, `/features/`, `/privacy/`, `/download/`, and
  `/faq/` are real HTML files. There is no SPA catch-all rewrite, so unknown
  paths return a proper 404 instead of the app shell.
- **No backend.** No APIs, forms, accounts, cookies, or server-side rendering.
- **No data collection.** No analytics, telemetry, pixels, or A/B testing.
- **No third-party requests.** Fonts, images, scripts, and styles are all
  same-origin. The only outbound links open in a new tab with
  `rel="noopener noreferrer"`.
- **No dynamic HTML.** The code does not use `dangerouslySetInnerHTML`,
  `innerHTML`, or runtime template compilation. All copy is static JSX.
- **No browser storage.** The site does not use cookies, `localStorage`, or
  `sessionStorage`.
- **Strict Content-Security-Policy.** `'self'` for scripts, styles, images,
  fonts, and connections; `object-src 'none'`, `media-src 'none'`,
  `base-uri 'self'`, `form-action 'self'`, and `frame-ancestors 'none'`. There
  are no inline scripts or style attributes. React is bundled at build time, so
  no CDN or `eval` is involved.
- **Framing blocked.** `frame-ancestors 'none'` plus `X-Frame-Options: DENY`.
- **Hardened responses.** `X-Content-Type-Options: nosniff`, a strict referrer
  policy, a restrictive permissions policy, and same-origin COOP/CORP.
- **Self-hosted fonts.** WOFF2 files are served from `/fonts`, so no request
  leaks a visitor's IP to a font CDN.

The installer is served from the same origin as a static file. The real defence
for the download is the SHA-256 digest published in `src/config.js` and on the
download section, not the hosting platform.

## Deployment checklist

1. Serve the site over HTTPS and enable HSTS at the host.
2. Make sure the host actually applies the headers from `public/_headers` or
   `vercel.json` to every page and to `/downloads/*`. Header files are ignored
   by hosts that do not support them.
3. Do not add a catch-all rewrite to `index.html`. The five pages are files on
   disk; a rewrite would turn 404s into misleading 200s.
3. Do not add a CSP that permits `'unsafe-inline'` or `'unsafe-eval'` to make a
   third-party widget work. Add the resource by self-hosting it instead.
4. Keep the source maps disabled (`build.sourcemap` is `false`).
5. Run `npm audit` and update dependencies before each release.
6. After deploying, confirm the response headers and the installer hash:

   ```powershell
   curl.exe -sI https://<your-domain>/
   curl.exe -sI https://<your-domain>/downloads/Study-Quest-Setup-1.3.1.exe
   Get-FileHash .\public\downloads\Study-Quest-Setup-1.3.1.exe -Algorithm SHA256
   ```

7. Verify that the deployed hash matches `sha256` in `src/config.js` and the
   value shown in the site's "Verify the download" panel.

`node scripts/production-check.mjs` automates most of this against a local
preview build, including header presence, third-party request detection, and the
download filename and hash display.

## Supply chain

- Runtime dependencies are limited to `react` and `react-dom`.
- `package-lock.json` is committed; install with `npm ci` in CI or on a build
  machine.
- Build tooling (`vite`, `@vitejs/plugin-react`, `sharp`, `playwright-core`,
  `axe-core`) is development-only and is not shipped to visitors.
- The installer is built outside this repository and copied in. Treat the build
  machine and the copied binary as part of the release process.

## Known limitations

- **Unsigned installer.** Windows SmartScreen may warn on first launch. The site
  explains the "More info → Run anyway" path and publishes the SHA-256 so users
  can verify the file. Signing the installer is the proper long-term fix.
- **Meta CSP fallback.** `frame-ancestors` is ignored in a `<meta>` tag, so
  framing protection depends on the HTTP header. Hosts that strip headers lose
  that protection even though the rest of the policy still applies.
- **Dev server is not representative.** `npm run dev` omits the production CSP so
  hot reloading works. Test with `npm run preview` before shipping.
- **Hash is only as trustworthy as the site.** A compromised host could publish
  a matching hash for a malicious file. Code signing and host account security
  are the mitigations.
