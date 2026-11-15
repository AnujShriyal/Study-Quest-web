import { useState } from 'react'
import Icon from '../components/Icon'
import { release } from '../config'

const groups = [
  {
    id: 'start',
    title: 'Getting started',
    items: [
      {
        question: 'Do I need an account or an internet connection?',
        answer:
          'No. Study Quest has no account system, no sync server, and no analytics. Everything is stored in a local JSON file, and the app works offline after you download the installer.',
      },
      {
        question: 'Is it really free?',
        answer:
          'Yes. The app is MIT licensed. There are no subscriptions, in-app purchases, trial timers, or locked features.',
      },
      {
        question: 'Which versions of Windows are supported?',
        answer:
          'Windows 10 and 11 on x64. The installer is built with NSIS and tested on those versions. macOS and Linux are not supported today.',
      },
      {
        question: 'Does it block distracting websites or apps?',
        answer:
          'No. Study Quest only records the sessions you start. It does not monitor other applications, block sites, or keep counting when you have not started a timer.',
      },
      {
        question: 'What counts as a saved session?',
        answer:
          'A session needs to run for at least five seconds. When you stop, the subject, duration, and start time are written to your history, XP is added, and today gets its square on the calendar.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & privacy',
    items: [
      {
        question: 'Where does my study data live?',
        answer: (
          <>
            In <code>{release.dataPath}</code>. It is human-readable JSON, created
            automatically the first time the app runs.
          </>
        ),
      },
      {
        question: 'How do I back up or move my progress?',
        answer:
          'Quit the app from the tray, copy study-quest-data.json somewhere safe, and put it back while the app is closed. To move to another PC, copy the same file into the same folder on the new machine.',
      },
      {
        question: 'Can I use the same data on two PCs?',
        answer:
          'You can copy the file between machines, but there is no sync. If both copies are edited, the last file you copy wins; sessions are not merged.',
      },
      {
        question: 'How do I reset everything?',
        answer: (
          <>
            Quit the app, then delete <code>{release.dataFolder}</code>. A fresh
            data file is created the next time Study Quest starts.
          </>
        ),
      },
      {
        question: 'Is anything sent to a server?',
        answer:
          'No. There is no Firebase, SQL database, remote API, telemetry, or analytics code in the packaged app. Only the download itself needs a connection.',
      },
    ],
  },
  {
    id: 'install',
    title: 'Install & tray',
    items: [
      {
        question: 'Why does Windows warn about the installer?',
        answer:
          'The build is unsigned, so SmartScreen treats a new installer with suspicion. You can verify the SHA-256 on the download page, inspect or build the MIT-licensed source, and then choose More info → Run anyway if you trust the file.',
      },
      {
        question: 'Where did the app go when I closed the window?',
        answer:
          'It is still running in the Windows system tray. That is intentional so the overlay and quick-start controls keep working. Choose Quit from the tray menu to exit fully.',
      },
      {
        question: 'The tray icon is hidden.',
        answer:
          'Click the ^ arrow near the Windows clock to show hidden tray icons. You can drag the Study Quest icon into the visible area to keep it there.',
      },
      {
        question: 'How do I uninstall it?',
        answer: (
          <>
            Use Settings → Apps → Installed apps → Study Quest → Uninstall. Your
            data folder lives separately at <code>{release.dataFolder}</code>;
            delete it too if you want a completely clean slate.
          </>
        ),
      },
    ],
  },
  {
    id: 'fix',
    title: 'Troubleshooting',
    items: [
      {
        question: 'The overlay is missing.',
        answer:
          'Use the floating-timer button on the dashboard or the tray menu to show it. The app remembers overlay visibility, so it may have been hidden on the previous run.',
      },
      {
        question: 'What happens if the app closes mid-session?',
        answer:
          'The running timer is restored as a paused session the next time you open the app. The restore is capped at 12 hours so an accidental multi-day session cannot land in your history.',
      },
      {
        question: 'My data appears to have reset.',
        answer: (
          <>
            Check that the app can write to <code>{release.dataPath}</code>. If
            the JSON could not be parsed, the app preserves it as
            study-quest-data.json.corrupt-&lt;timestamp&gt; and starts with a
            fresh file. Rename that backup only if you intend to recover it.
          </>
        ),
      },
    ],
  },
]

const initialOpen = `${groups[0].id}-0`

export default function Faq() {
  const [openKeys, setOpenKeys] = useState(() => new Set([initialOpen]))

  function toggle(key) {
    setOpenKeys((current) => {
      const next = new Set(current)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <section className="section faq-page" aria-labelledby="faq-list-title">
      <div className="container faq-page__inner">
        <aside className="faq-page__aside">
          <p className="faq-page__aside-label mono">On this page</p>
          <nav className="faq-page__toc" aria-label="FAQ sections">
            {groups.map((group, index) => (
              <a key={group.id} href={`#${group.id}`}>
                <span className="mono">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{group.title}</span>
              </a>
            ))}
          </nav>

          <div className="faq-page__note">
            <p className="mono">Still stuck?</p>
            <p>
              The installer notes cover SmartScreen and the published hash, and
              the privacy page goes through the data file line by line.
            </p>
            <a className="text-link" href="/download/#verify">
              Verify the installer
              <Icon name="arrow-right" size={14} />
            </a>
            <a className="text-link" href="/privacy/">
              Read the privacy notes
              <Icon name="arrow-right" size={14} />
            </a>
            {release.repoUrl ? (
              <a
                className="text-link"
                href={release.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source code
                <Icon name="external" size={14} />
              </a>
            ) : null}
          </div>
        </aside>

        <div className="faq-page__main">
          <h2 className="sr-only" id="faq-list-title">
            Frequently asked questions
          </h2>

          {groups.map((group, groupIndex) => (
            <section
              className="faq-group"
              id={group.id}
              key={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <header className="faq-group__head">
                <p className="mono">
                  {String(groupIndex + 1).padStart(2, '0')}
                </p>
                <h2 className="display" id={`${group.id}-title`}>
                  {group.title}
                </h2>
                <span className="mono">{group.items.length} questions</span>
              </header>

              <div className="faq__list">
                {group.items.map((item, index) => {
                  const key = `${group.id}-${index}`
                  const isOpen = openKeys.has(key)
                  const buttonId = `faq-button-${key}`
                  const panelId = `faq-panel-${key}`
                  return (
                    <div
                      className={`faq__item ${isOpen ? 'faq__item--open' : ''}`.trim()}
                      key={item.question}
                    >
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggle(key)}
                        >
                          <span>{item.question}</span>
                          <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
                        </button>
                      </h3>
                      {isOpen ? (
                        <div
                          className="faq__answer"
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                        >
                          <p>{item.answer}</p>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
