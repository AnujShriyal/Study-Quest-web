import { useEffect } from 'react'
import Icon from '../components/Icon'
import CopyButton from '../components/CopyButton'
import SectionHead from '../components/SectionHead'
import { release } from '../config'

const steps = [
  {
    number: '01',
    title: 'Download the installer.',
    body: (
      <>
        Save <span className="mono inline-file">{release.downloadName}</span>{' '}
        anywhere you like.
      </>
    ),
  },
  {
    number: '02',
    title: 'Run it and follow the prompts.',
    body: 'NSIS handles the install and creates Desktop and Start Menu shortcuts. No sign-up, no license key.',
  },
  {
    number: '03',
    title: 'Start a session.',
    body: 'The dashboard opens. The overlay and tray controls are ready when you are.',
  },
]

const command = `Get-FileHash ".\\${release.downloadName}" -Algorithm SHA256`

export default function Download({ index = '04', head = true }) {
  // Deep links from the footer open the hash panel directly.
  useEffect(() => {
    if (window.location.hash !== '#verify') return
    const details = document.getElementById('verify')
    if (details) details.open = true
  }, [])

  return (
    <section
      className="section download"
      id="download"
      aria-labelledby="download-title"
    >
      <div className="container">
        {head ? (
          <SectionHead
            index={index}
            label="The download"
            id="download-title"
            title={
              <>
                Install once. Then <em>get out of its way.</em>
              </>
            }
            lede="A free, MIT-licensed Windows app. The installer is about 75 MB, unsigned, and completely self-contained. Uninstall it from Windows Settings like anything else."
          />
        ) : (
          <h2 className="sr-only" id="download-title">
            Download and install Study Quest
          </h2>
        )}

        <div className="download__grid">
          <div className="download__copy" id="install">
            <ol className="install-steps">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className="install-steps__num mono">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="notice">
              <p className="notice__label mono">
                <Icon name="shield" size={15} />
                A note on SmartScreen
              </p>
              <p>
                Windows may say &ldquo;Windows protected your PC&rdquo; because
                the build is unsigned. Choose{' '}
                <strong>More info &rarr; Run anyway</strong> only if you trust
                the download, or verify the SHA-256 first.
              </p>
            </aside>
          </div>

          <div className="ticket">
            <div className="ticket__head">
              <div>
                <p className="ticket__brand mono">Study Quest</p>
                <p className="ticket__kind mono">Windows pass</p>
              </div>
              <span className="ticket__version display">
                {release.version}
              </span>
            </div>

            <dl className="ticket__grid">
              <div>
                <dt className="mono">Version</dt>
                <dd>{release.version}</dd>
              </div>
              <div>
                <dt className="mono">Platform</dt>
                <dd>{release.platform}</dd>
              </div>
              <div>
                <dt className="mono">Installer</dt>
                <dd>
                  NSIS · {release.architecture}
                </dd>
              </div>
              <div>
                <dt className="mono">Size</dt>
                <dd>{release.sizeLabel}</dd>
              </div>
              <div>
                <dt className="mono">License</dt>
                <dd>{release.license}</dd>
              </div>
              <div>
                <dt className="mono">Account</dt>
                <dd>None</dd>
              </div>
            </dl>

            <a
              className="btn btn--primary ticket__download"
              href={release.downloadUrl}
              download={release.downloadName}
            >
              <Icon name="download" size={18} />
              Download for Windows
            </a>

            <p className="ticket__note mono">
              Unsigned build · {release.platform} · {release.sizeLabel}
            </p>

            <div className="ticket__perf" aria-hidden="true" />

            <details className="verify" id="verify">
              <summary className="mono">
                <span>Verify SHA-256</span>
                <Icon name="chevron-down" size={15} />
              </summary>
              <div className="verify__body">
                <p>
                  Compare the file hash before running the installer. The value
                  below is for the exact file on this page.
                </p>
                <code className="verify__hash mono">{release.sha256}</code>
                <div className="verify__actions">
                  <CopyButton
                    value={release.sha256}
                    label="Copy hash"
                    copiedLabel="Hash copied"
                  />
                  <CopyButton
                    value={command}
                    label="Copy command"
                    copiedLabel="Command copied"
                  />
                </div>
                <pre className="verify__cmd">
                  <code>{command}</code>
                </pre>
                <p className="verify__hint mono">
                  PowerShell · compare the output with the hash above.
                </p>
              </div>
            </details>

            <ul className="ticket__facts mono">
              <li>
                <Icon name="check" size={12} />
                No account
              </li>
              <li>
                <Icon name="check" size={12} />
                No telemetry
              </li>
              <li>
                <Icon name="check" size={12} />
                Uninstall
              </li>
            </ul>

            <span className="ticket__stamp stamp mono" aria-hidden="true">
              Local-first
              <br />
              no cloud
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
