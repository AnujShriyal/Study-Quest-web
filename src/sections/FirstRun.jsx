import Icon from '../components/Icon'
import { release } from '../config'

const notes = [
  {
    title: 'The dashboard opens.',
    body: 'No setup wizard and no sign-in. Type a subject and start the first timer; the default daily goal is two hours.',
  },
  {
    title: 'The tray takes over.',
    body: 'Closing the window hides it to the Windows tray. The ^ arrow near the clock reveals hidden icons; drag Study Quest out to keep it visible.',
  },
  {
    title: 'The overlay stays close.',
    body: 'A small always-on-top timer is ready from the dashboard or the tray menu. It remembers where you left it between launches.',
  },
]

export default function FirstRun() {
  return (
    <section className="section first-run" aria-labelledby="first-run-title">
      <div className="container first-run__inner">
        <div className="first-run__copy">
          <p className="section-head__index mono">
            <span className="section-head__num">04.1</span>
            <span aria-hidden="true">/</span>
            <span>First run</span>
          </p>
          <h2 className="display first-run__title" id="first-run-title">
            Open it once. It <em>stays ready.</em>
          </h2>
          <p className="first-run__lede">
            Study Quest is designed to live quietly beside your work. Here is
            what to expect in the first five minutes, including the one Windows
            habit that surprises people.
          </p>
          <a className="text-link" href="/faq/">
            Troubleshooting in the FAQ
            <Icon name="arrow-right" size={15} />
          </a>
        </div>

        <ol className="first-run__list">
          {notes.map((note, index) => (
            <li key={note.title}>
              <span className="first-run__num mono">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3>{note.title}</h3>
                <p>{note.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="first-run__foot mono">
          Data lives in {release.dataFolder} · uninstalling leaves it in place
        </p>
      </div>
    </section>
  )
}
