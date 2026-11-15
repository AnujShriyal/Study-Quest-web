import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

/**
 * Security headers shared by the local preview server and documented for
 * production hosts in SECURITY.md. The production CSP is injected into the
 * built HTML by the plugin below and also shipped in public/_headers.
 */
const baseHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy':
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
}

// frame-ancestors is ignored in a meta tag, so it stays in the HTTP header only.
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
]
const metaCsp = cspDirectives.join('; ')
const headerCsp = [...cspDirectives, "frame-ancestors 'none'"].join('; ')

/** Inject a strict CSP only into production HTML, so Vite HMR still works. */
function productionCsp() {
  return {
    name: 'study-quest-production-csp',
    apply: 'build',
    transformIndexHtml() {
      return {
        tags: [
          {
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content: metaCsp,
            },
            injectTo: 'head-prepend',
          },
        ],
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), productionCsp()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    sourcemap: false,
    rollupOptions: {
      input: {
        home: resolve('index.html'),
        features: resolve('features/index.html'),
        privacy: resolve('privacy/index.html'),
        download: resolve('download/index.html'),
        faq: resolve('faq/index.html'),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    headers: baseHeaders,
  },
  preview: {
    port: 4173,
    strictPort: true,
    headers: {
      ...baseHeaders,
      'Content-Security-Policy': headerCsp,
    },
  },
})
