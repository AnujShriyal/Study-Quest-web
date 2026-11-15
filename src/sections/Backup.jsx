import CopyButton from '../components/CopyButton'
import { release } from '../config'

const steps = [
  {
    number: '01',
    title: 'Keep a copy.',
    body: 'Quit Study Quest from the tray, then copy study-quest-data.json somewhere safe. A dated folder per month is plenty.',
  },
  {
    number: '02',
    title: 'Restore a copy.',
    body: 'With the app closed, put the file back in the study-quest folder and replace the current one. Reopen the app and the history returns.',
  },
  {
    number: '03',
    title: 'Start clean.',
    body: 'To reset all progress, quit the app and delete the folder. A new file is created on the next launch, with no account to cancel.',
  },
]

export default function Backup() {
  return (
    <section className="section backup" aria-labelledby="backup-title">
      <div className="container">
        <div className="backup__head">
          <div>
            <p className="section-head__index mono">
              <span className="section-head__num">03.3</span>
              <span aria-hidden="true">/</span>
              <span>Housekeeping</span>
            </p>
            <h2 className="display backup__title" id="backup-title">
              A file you can <em>hold.</em>
            </h2>
          </div>
          <p className="backup__lede">
            There is no export wizard because there is nothing to export from.
            Backing up your progress is the same as copying any other document.
          </p>
        </div>

        <ol className="backup-grid">
          {steps.map((step) => (
            <li key={step.number}>
              <p className="backup-grid__num mono">Step {step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="backup__path">
          <span className="mono backup__path-label">Data folder</span>
          <code>{release.dataFolder}</code>
          <CopyButton
            value={release.dataFolder}
            label="Copy folder"
            copiedLabel="Folder copied"
          />
        </div>
      </div>
    </section>
  )
}
