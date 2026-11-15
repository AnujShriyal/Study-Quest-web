import SectionHead from '../components/SectionHead'
import Icon from '../components/Icon'
import CopyButton from '../components/CopyButton'
import { release } from '../config'

const points = [
  {
    icon: 'shield',
    title: 'Local JSON storage',
    body: 'No Firebase, SQL database, or remote API. One readable file on your drive.',
  },
  {
    icon: 'check',
    title: 'Atomic saves',
    body: 'Writes go to a temporary file first, then replace the real one. No half-written days.',
  },
  {
    icon: 'copy',
    title: 'Corruption backup',
    body: 'If the JSON cannot be parsed, the broken file is preserved before a fresh one is made.',
  },
  {
    icon: 'target',
    title: 'Zero telemetry',
    body: 'No analytics code ships in the app or on this page. No accounts, no trackers.',
  },
]

const localStats = [
  { value: '0', label: 'accounts' },
  { value: '0', label: 'trackers' },
  { value: '1', label: 'JSON file' },
  { value: '100%', label: 'local' },
]

export default function Privacy({ index = '03.1' }) {
  return (
    <section
      className="section privacy"
      id="privacy"
      aria-labelledby="privacy-title"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="The fine print"
          id="privacy-title"
          title={
            <>
              Your data stays on <em>your desk.</em>
            </>
          }
          lede="Study Quest was built local-first, not cloud-first with a privacy page bolted on. There is no account to create, no server to sync with, and no analytics script quietly counting this page."
        />

        <div className="privacy__grid">
          <ul className="privacy__points">
            {points.map((point) => (
              <li key={point.title}>
                <span className="privacy__icon">
                  <Icon name={point.icon} size={19} />
                </span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="data-card">
            <div className="data-card__head">
              <span className="mono">Local data file</span>
              <CopyButton
                value={release.dataPath}
                label="Copy path"
                copiedLabel="Path copied"
                className="copy-btn--dark"
              />
            </div>

            <p className="data-card__path mono">{release.dataPath}</p>

            <div className="data-card__file mono">
              <span className="data-card__dot" aria-hidden="true" />
              <span>study-quest-data.json</span>
              <span className="data-card__state">on this device</span>
            </div>

            <pre className="data-card__json" aria-label="Example data file contents">
              <code>{`{
  "subjects": ["Calculus", "Physics"],
  "sessions": [
    { "subject": "Calculus", "seconds": 3600 }
  ],
  "streak": { "current": 7, "longest": 21 },
  "settings": { "dailyGoalMinutes": 120 }
}`}</code>
            </pre>

            <div className="data-card__foot mono">
              <span>Human-readable</span>
              <span>Back up with a copy</span>
            </div>

            <span className="stamp mono" aria-hidden="true">
              No cloud required
            </span>
          </div>
        </div>

        <div className="privacy__bottom">
          <ul className="local-stats">
            {localStats.map((stat) => (
              <li key={stat.label}>
                <span className="local-stats__value display">{stat.value}</span>
                <span className="local-stats__label mono">{stat.label}</span>
              </li>
            ))}
          </ul>
          <p className="privacy__note mono">
            The app works offline. Only the download needs a connection.
          </p>
        </div>
      </div>
    </section>
  )
}
