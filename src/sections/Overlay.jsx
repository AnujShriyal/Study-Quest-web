import Icon from '../components/Icon'

const points = [
  {
    label: 'Always on top',
    body: 'Keeps the clock in sight without stealing focus from your work.',
  },
  {
    label: 'Drag & remember',
    body: 'Move it anywhere on screen; its position and visibility survive a restart.',
  },
  {
    label: 'More than a clock',
    body: 'Daily-goal progress and active missions live in the same small panel.',
  },
  {
    label: 'Tray-first',
    body: 'Close the dashboard and it drops quietly to the Windows system tray.',
  },
]

export default function Overlay({ index = '02.2' }) {
  return (
    <section
      className="section overlay"
      id="overlay"
      aria-labelledby="overlay-title"
    >
      <div className="container overlay__inner">
        <div className="overlay__visual">
          <div className="desk">
            <figure className="tape-photo">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/overlay-300.webp 300w, /images/overlay-600.webp 379w"
                  sizes="300px"
                />
                <img
                  src="/images/overlay.png"
                  width="379"
                  height="500"
                  alt="The Study Quest floating overlay showing a running timer, Calculus subject, goal progress, and three missions."
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <figcaption className="tape-photo__caption mono">
                Fig. 03 — 300 × 400 px, always on top.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="overlay__copy">
          <p className="section-head__index mono">
            <span className="section-head__num">{index}</span>
            <span aria-hidden="true">/</span>
            <span>The overlay</span>
          </p>
          <h2 className="display overlay__title" id="overlay-title">
            The timer that follows you <em>around the desktop.</em>
          </h2>
          <p className="overlay__lede">
            A 300 × 400 frameless window that stays above whatever you&rsquo;re
            working in. It is small enough to ignore and close enough to reach.
          </p>

          <dl className="overlay__list">
            {points.map((point) => (
              <div key={point.label}>
                <dt className="mono">
                  <Icon name="check" size={13} />
                  {point.label}
                </dt>
                <dd>{point.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
