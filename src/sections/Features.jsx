import SectionHead from '../components/SectionHead'
import Icon from '../components/Icon'

const features = [
  {
    icon: 'timer',
    title: 'Focus timer',
    body: 'Start, pause, resume, and save. Nothing to configure before minute one, and sessions under five seconds never count.',
  },
  {
    icon: 'target',
    title: 'Daily goals',
    body: 'Pick no goal or anywhere from 30 minutes to six hours. The ring, dashboard text, and overlay stay in sync.',
  },
  {
    icon: 'spark',
    title: 'XP & levels',
    body: 'One XP per fifteen seconds — roughly 100 for a 25-minute session. Level-ups arrive with a toast and confetti.',
  },
  {
    icon: 'flame',
    title: 'Streaks',
    body: 'Current and longest streaks are calculated from the sessions you actually saved, never from a manual counter.',
  },
  {
    icon: 'list',
    title: 'Quest log',
    body: 'Add missions, complete them, reopen them, or clear the finished pile. Delete anything with a one-click undo.',
  },
  {
    icon: 'grid',
    title: 'Activity calendar',
    body: 'A GitHub-style heatmap of the last twelve months, with five fixed intensity levels from a blank day to 2+ hours.',
  },
  {
    icon: 'pin',
    title: 'Floating overlay',
    body: 'A frameless, always-on-top timer with your goal and active missions. Drag it anywhere; it remembers where it was.',
  },
  {
    icon: 'tray',
    title: 'Tray controls',
    body: 'Quick start, stop and save, show the dashboard, or toggle the overlay from the Windows system tray.',
  },
]

const extras = [
  'Session history grouped by day',
  'Crash recovery up to 12 hours',
  'Atomic saves, never half a file',
  'Corrupt-file backup',
  'Single-instance lock',
  'Recent subject chips',
]

export default function Features({ index = '02.1' }) {
  return (
    <section
      className="section features"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="container">
        <SectionHead
          index={index}
          label="The toolkit"
          id="features-title"
          title={
            <>
              The whole <em>field kit.</em>
            </>
          }
          lede="Enough structure to make studying feel like progress, without turning it into a second job. No plugins, no subscriptions, no setup wizard."
        />

        <ul className="feature-grid">
          {features.map((feature, index) => (
            <li className="feature" key={feature.title}>
              <div className="feature__top">
                <span className="feature__icon">
                  <Icon name={feature.icon} size={22} />
                </span>
                <span className="feature__num mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="feature__title">{feature.title}</h3>
              <p className="feature__body">{feature.body}</p>
            </li>
          ))}
        </ul>

        <div className="fineprint">
          <p className="fineprint__label mono">Also in the box</p>
          <ul className="fineprint__list">
            {extras.map((extra) => (
              <li key={extra}>
                <Icon name="check" size={13} />
                <span>{extra}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
