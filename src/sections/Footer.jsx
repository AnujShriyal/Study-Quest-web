import Wordmark from '../components/Wordmark'
import Icon from '../components/Icon'
import { chapters, release, year } from '../config'

const heatLevels = Array.from({ length: 52 }, (_, index) => {
  const value = (index * 7 + 5) % 12
  if (value < 3) return 0
  if (value < 6) return 1
  if (value < 9) return 2
  if (value < 11) return 3
  return 4
})

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Wordmark large />
            <p className="site-footer__tagline">
              A quieter way to keep score.
            </p>
            <p className="site-footer__status mono">
              <span className="live-dot" />
              All systems local
            </p>
            <div className="heat" aria-hidden="true">
              {heatLevels.map((level, index) => (
                <span
                  className={`heat-cell heat-cell--${level}`}
                  key={`${index}-${level}`}
                />
              ))}
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Footer">
            <div>
              <h2 className="mono">Explore</h2>
              {chapters.map((chapter) => (
                <a key={chapter.id} href={chapter.href}>
                  {chapter.label}
                </a>
              ))}
            </div>
            <div>
              <h2 className="mono">Install</h2>
              <a href={release.downloadUrl} download={release.downloadName}>
                Download {release.version}
              </a>
              <a href="/download/#verify">Verify SHA-256</a>
              <a href="/download/#install">Install guide</a>
              <a href="#top">Back to top</a>
              {release.repoUrl ? (
                <a
                  href={release.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source code
                  <Icon name="external" size={13} />
                </a>
              ) : null}
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="mono">
            © {year} Study Quest ·{' '}
            <a
              href="https://opensource.org/license/mit"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT License
            </a>
          </p>
          <p className="mono">
            Windows is a trademark of Microsoft. Not affiliated.
          </p>
          <p className="mono">No cookies · No trackers · No third-party fonts</p>
        </div>
      </div>
    </footer>
  )
}
