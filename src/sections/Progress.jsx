import { useState } from 'react'
import SectionHead from '../components/SectionHead'
import Sigil from '../components/Sigil'

const goals = [
  { label: '1 hr', value: 60 },
  { label: '2 hr', value: 120 },
  { label: '4 hr', value: 240 },
]

const facts = [
  { label: 'Rate', value: 'One XP per fifteen seconds' },
  { label: 'Reference', value: '≈100 XP per 25-minute session' },
  { label: 'Goals', value: 'Presets from 30 minutes to six hours' },
  { label: 'Streaks', value: 'Built only from saved sessions' },
]

export default function Progress({ index = '02.3' }) {
  const [minutes, setMinutes] = useState(50)
  const [goal, setGoal] = useState(120)
  const [subject, setSubject] = useState('Calculus')

  const xp = minutes * 4
  const percent = Math.min(100, Math.round((minutes / goal) * 100))
  const remaining = Math.max(0, goal - minutes)
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0')
  const mins = String(minutes % 60).padStart(2, '0')
  const displaySubject = subject.trim() || 'Untitled session'

  return (
    <section className="section reward" id="reward" aria-labelledby="reward-title">
      <div className="container reward__inner">
        <div className="reward__copy">
          <SectionHead
            index={index}
            label="The reward"
            id="reward-title"
            title={
              <>
                Proof that the hour <em>happened.</em>
              </>
            }
            lede="XP is not a mystery currency. The rate is fixed at one point per fifteen seconds, and every point comes from a session that was actually saved. Drag the slider to see how a session adds up."
          />

          <dl className="reward__facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="mono">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="receipt"
          role="group"
          aria-label="Interactive sample session receipt"
        >
          <div className="receipt__head">
            <div className="receipt__brand">
              <Sigil size={24} />
              <div>
                <span className="receipt__name mono">Study Quest</span>
                <span className="receipt__kicker mono">Session receipt</span>
              </div>
            </div>
            <span className="receipt__no mono">No. 0000</span>
          </div>

          <label className="receipt__subject">
            <span className="mono receipt__label">Subject</span>
            <input
              type="text"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              maxLength={28}
              placeholder="What are you focusing on?"
              autoComplete="off"
              spellCheck="false"
              aria-label="Sample session subject"
            />
          </label>

          <div className="receipt__slider">
            <div className="receipt__slider-top">
              <label className="mono receipt__label" htmlFor="session-length">
                Session length
              </label>
              <output
                className="receipt__output mono"
                htmlFor="session-length"
                aria-live="polite"
              >
                {minutes} min · {xp} XP
              </output>
            </div>
            <input
              id="session-length"
              type="range"
              min="5"
              max="180"
              step="5"
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
              aria-valuetext={`${minutes} minutes`}
            />
            <div className="receipt__scale mono" aria-hidden="true">
              <span>5 min</span>
              <span>3 hr</span>
            </div>
          </div>

          <fieldset className="goal-picker">
            <legend className="mono receipt__label">Daily goal</legend>
            <div className="goal-picker__options">
              {goals.map((option) => {
                const id = `goal-${option.value}`
                return (
                  <div key={option.value}>
                    <input
                      className="sr-only"
                      type="radio"
                      id={id}
                      name="goal"
                      value={option.value}
                      checked={goal === option.value}
                      onChange={() => setGoal(option.value)}
                    />
                    <label className="mono" htmlFor={id}>
                      {option.label}
                    </label>
                  </div>
                )
              })}
            </div>
          </fieldset>

          <dl className="receipt__rows">
            <div>
              <dt className="mono">Length</dt>
              <dd className="mono">
                {hours}:{mins}:00
              </dd>
            </div>
            <div>
              <dt className="mono">XP earned</dt>
              <dd className="mono receipt__strong">{xp}</dd>
            </div>
            <div>
              <dt className="mono">XP per hour</dt>
              <dd className="mono">240</dd>
            </div>
            <div>
              <dt className="mono">Goal</dt>
              <dd className="mono">{goal / 60} hours</dd>
            </div>
          </dl>

          <div className="receipt__progress">
            <div className="receipt__progress-top mono">
              <span>{percent}% of goal</span>
              <span>{minutes >= goal ? 'Goal met' : `${remaining} min to go`}</span>
            </div>
            <progress
              className="goal-progress"
              max="100"
              value={percent}
              aria-label={`${percent}% of the chosen daily goal`}
            >
              {percent}%
            </progress>
          </div>

          <div className="receipt__foot mono">
            <span>Preview only</span>
            <span>{displaySubject}</span>
          </div>

          <span className="receipt__stamp mono" aria-hidden="true">
            Preview
            <br />
            not a receipt
          </span>
        </div>
      </div>
    </section>
  )
}
