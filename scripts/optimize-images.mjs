/**
 * Regenerate the lightweight WebP variants used by the site.
 * Run with: npm run optimize:images
 */
import sharp from 'sharp'

const jobs = [
  ['dashboard-overview.png', 'dashboard-overview-1400.webp', 1400],
  ['dashboard-overview.png', 'dashboard-overview-700.webp', 700],
  ['overlay.png', 'overlay-600.webp', 600],
  ['overlay.png', 'overlay-300.webp', 300],
]

for (const [source, target, width] of jobs) {
  const info = await sharp(`public/images/${source}`)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(`public/images/${target}`)
  console.log(`${target}: ${Math.round(info.size / 1024)} KB (${info.width}×${info.height})`)
}
