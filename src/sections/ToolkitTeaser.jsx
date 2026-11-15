import Icon from '../components/Icon'

const items = [
  {
    icon: 'pin',
    title: 'An overlay that stays put',
    body: 'A frameless timer that floats above your work and remembers its position.',
  },
  {
    icon: 'flame',
    title: 'Streaks with receipts',
    body: 'Every streak is calculated from saved sessions, never from a manual counter.',
  },
  {
    icon: 'list',
    title: 'A quest log, not a todo app',
    body: 'Missions live beside the timer, with undo for anything deleted by mistake.',
  },
  {
    icon: 'grid',
    title: 'A year you can see',
    body: 'Twelve months of study in one heatmap, with five honest intensity levels.',
  },
]

export default function ToolkitTeaser() {
  return (
    <section className="section teaser" aria-labelledby="teaser-title">
      <div className="container teaser__inner">
        <div className="teaser__copy">
          <p className="section-head__index mono">
            <span className="section-head__num">01.2</span>
            <span aria-hidden="true">/</span>
            <span>The toolkit</span>
          </p>
          <h2 className="display teaser__title" id="teaser-title">
            More than a <em>stopwatch.</em>
          </h2>
          <p className="teaser__lede">
            The timer is the entry point. Around it sits a small, complete
            system for keeping score: levels, missions, streaks, and a calendar
            that makes a term of work visible at a glance.
          </p>
          <a className="text-link" href="/features/">
            Open the field kit
            <Icon name="arrow-right" size={15} />
          </a>
        </div>

        <ul className="kit-list">
          {items.map((item) => (
            <li key={item.title}>
              <span className="kit-list__icon">
                <Icon name={item.icon} size={19} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
