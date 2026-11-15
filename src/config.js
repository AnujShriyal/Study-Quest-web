/**
 * Single source of truth for release metadata and the page structure.
 * Update the version, filename, size, and hash when you publish a new build.
 */
export const release = {
  name: 'Study Quest',
  version: '1.3.1',
  platform: 'Windows 10 / 11',
  architecture: 'x64',
  sizeLabel: '74.8 MB',
  license: 'MIT',
  downloadUrl: '/downloads/Study-Quest-Setup-1.3.1.exe',
  downloadName: 'Study-Quest-Setup-1.3.1.exe',
  sha256:
    'd88e01d9c9a7cfcf64bc7f0ebaae869f3d5afea1be3a9e8b8bd86a21669bd368',
  dataPath: '%APPDATA%\\study-quest\\study-quest-data.json',
  dataFolder: '%APPDATA%\\study-quest',
  /* Add a repository URL here to enable source links in the footer. */
  repoUrl: '',
}

/**
 * The site is a small set of static pages. Each entry drives the header, the
 * home-page contents list, the previous/next chapter strip, and the footer.
 */
export const chapters = [
  {
    id: 'home',
    href: '/',
    number: '01',
    label: 'Home',
    title: 'Study like it’s a quest',
    summary: 'The short pitch, the loop, and what the app is actually for.',
  },
  {
    id: 'features',
    href: '/features/',
    number: '02',
    label: 'Features',
    title: 'The whole field kit',
    summary: 'Timer, overlay, streaks, missions, calendar, and the XP maths.',
  },
  {
    id: 'privacy',
    href: '/privacy/',
    number: '03',
    label: 'Privacy',
    title: 'Local by construction',
    summary: 'One JSON file, atomic saves, and nothing sent anywhere.',
  },
  {
    id: 'download',
    href: '/download/',
    number: '04',
    label: 'Download',
    title: 'Install once, then forget it',
    summary: 'The installer, its SHA-256, and what happens on first run.',
  },
  {
    id: 'faq',
    href: '/faq/',
    number: '05',
    label: 'FAQ',
    title: 'The short answers',
    summary: 'Accounts, SmartScreen, backups, tray quirks, and recovery.',
  },
]

export function getChapter(id) {
  return chapters.find((chapter) => chapter.id === id) ?? chapters[0]
}

/** Header navigation. The direct installer link is the header button. */
export const navLinks = chapters.filter((chapter) =>
  ['features', 'privacy', 'download', 'faq'].includes(chapter.id),
)

/** Previous and next chapter for the footer strip; wraps around. */
export function getSiblings(id) {
  const index = chapters.findIndex((chapter) => chapter.id === id)
  const current = index === -1 ? 0 : index
  return {
    previous: chapters[(current - 1 + chapters.length) % chapters.length],
    next: chapters[(current + 1) % chapters.length],
    current: chapters[current],
  }
}

export const year = new Date().getFullYear()
