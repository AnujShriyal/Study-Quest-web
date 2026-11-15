import Icon from '../components/Icon'
import Seal from '../components/Seal'
import { release } from '../config'

const stats = [
  { value: '15 sec', label: 'per 1 XP' },
  { value: '12 mo', label: 'activity map' },
  { value: '0', label: 'cloud services' },
  { value: '1 file', label: 'holds all your data' },
]

export default function Hero() {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">
              <span className="eyebrow__dot" aria-hidden="true" />
              Local-first study tracker · Windows 10 / 11
            </p>

            <h1 className="display hero__title" id="hero-title">
              Study like it&apos;s a <em>quest</em>, not a countdown.
            </h1>

            <p className="hero__lede">
              Focus sessions become XP, streaks, and a year-long map of your
              progress. A small Windows app that keeps every byte on your own
              machine — no account, no cloud, no telemetry.
            </p>

            <div className="hero__actions">
              <a
                className="btn btn--primary"
                href={release.downloadUrl}
                download={release.downloadName}
              >
                <Icon name="download" size={18} />
                Download for Windows
              </a>
              <a className="btn btn--ghost" href="#loop">
                See the loop
                <Icon name="arrow-down" size={17} />
              </a>
            </div>

            <p className="hero__meta mono">
              v{release.version} · {release.sizeLabel} · Unsigned installer ·
              MIT license
            </p>

            <ul className="trust-row" aria-label="Privacy at a glance">
              <li>No account</li>
              <li>No cloud</li>
              <li>No telemetry</li>
            </ul>
          </div>

          <div className="hero__visual">
            <figure className="plate">
              <div className="plate__backing" aria-hidden="true" />
              <div className="plate__frame">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/images/dashboard-overview-700.webp 700w, /images/dashboard-overview-1400.webp 1400w"
                    sizes="(max-width: 940px) 92vw, 620px"
                  />
                  <img
                    src="/images/dashboard-overview.png"
                    width="1400"
                    height="975"
                    alt="The Study Quest dashboard: a focus timer for Calculus, level 24 progress, a weekly study chart, focus mix, and a 12-month activity calendar."
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
              <figcaption className="plate__caption mono">
                <span className="plate__fig">Fig. 01</span>
                <span>The dashboard, seeded with sample data.</span>
              </figcaption>
            </figure>

            <Seal className="hero__seal" />
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <ul className="container stat-strip__list">
          {stats.map((stat) => (
            <li key={stat.label}>
              <span className="stat-strip__value display">{stat.value}</span>
              <span className="stat-strip__label mono">{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
