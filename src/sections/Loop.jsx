import SectionHead from '../components/SectionHead'
import Icon from '../components/Icon'

const steps = [
  {
    number: '01',
    title: 'Name the subject.',
    body: 'Calculus, physics, or the reading you keep avoiding. Type it once; recent subjects become one-click chips.',
    visual: (
      <div className="mini mini--chips" aria-hidden="true">
        <span className="chip chip--active">Calculus</span>
        <span className="chip">Physics</span>
        <span className="chip">Literature</span>
        <span className="chip chip--ghost">+ Add</span>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Start the timer.',
    body: 'Pause, resume, or park it in the always-on-top overlay. Close the app mid-session and it comes back paused — never silently counting.',
    visual: (
      <div className="mini mini--timer" aria-hidden="true">
        <div className="mini__top mono">
          <span className="live-dot" />
          <span>Recording</span>
          <span className="mini__tag">Calculus</span>
        </div>
        <p className="mini__time mono">25:00</p>
        <div className="mini__bar">
          <span className="mini__fill" />
        </div>
        <div className="mini__foot mono">
          <span>Session</span>
          <span>62% of 2h goal</span>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Keep the receipts.',
    body: 'Every fifteen seconds earns 1 XP. When you stop, the session is saved, the goal ring moves, and today gets its square on the calendar.',
    visual: (
      <div className="mini mini--receipt" aria-hidden="true">
        <div className="mini__row">
          <span className="mono">XP earned</span>
          <span className="mini__dots" />
          <span className="mono mini__value">+100</span>
        </div>
        <div className="mini__row">
          <span className="mono">Streak</span>
          <span className="mini__dots" />
          <span className="mono mini__value">7 days</span>
        </div>
        <div className="mini__row">
          <span className="mono">Calendar</span>
          <span className="mini__dots" />
          <span className="mono mini__value">1 cell</span>
        </div>
      </div>
    ),
  },
]

export default function Loop({ index = '01.1' }) {
  return (
    <section className="section loop" id="loop" aria-labelledby="loop-title">
      <div className="container">
        <SectionHead
          index={index}
          label="The loop"
          id="loop-title"
          title={
            <>
              Small loop. <em>Long campaign.</em>
            </>
          }
          lede="Three actions, repeated. The app handles the bookkeeping — counts, streaks, charts — so the only habit you have to build is showing up."
        />

        <ol className="loop-grid">
          {steps.map((step) => (
            <li className="loop-step" key={step.number}>
              <p className="loop-step__num mono">Step {step.number}</p>
              <h3 className="loop-step__title">{step.title}</h3>
              <p className="loop-step__body">{step.body}</p>
              {step.visual}
            </li>
          ))}
        </ol>

        <div className="loop__notes">
          <p className="mono">
            <Icon name="shield" size={14} />
            Sessions under five seconds are ignored.
          </p>
          <p className="mono">Deleted sessions and missions get an undo toast.</p>
        </div>
      </div>
    </section>
  )
}
