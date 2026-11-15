import Icon from './Icon'
import { release } from '../config'

export default function DownloadCta() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <div className="cta-band__copy">
          <p className="cta-band__index mono">
            <span aria-hidden="true">04</span> / The download
          </p>
          <h2 className="display cta-band__title" id="cta-title">
            Ready when <em>you are.</em>
          </h2>
          <p className="cta-band__meta mono">
            v{release.version} · {release.sizeLabel} · {release.platform} ·
            SHA-256 published
          </p>
        </div>

        <div className="cta-band__actions">
          <a
            className="btn btn--paper"
            href={release.downloadUrl}
            download={release.downloadName}
          >
            <Icon name="download" size={18} />
            Download for Windows
          </a>
          <a className="cta-band__link" href="/download/">
            Install notes &amp; hash
            <Icon name="arrow-right" size={15} />
          </a>
        </div>
      </div>
    </section>
  )
}
