import Icon from './Icon'
import { getSiblings } from '../config'

/**
 * Editorial previous/next strip used at the foot of every inner page.
 * Two real links, no client-side routing, so it also works without JavaScript
 * once the page has loaded.
 */
export default function ChapterNav({ current }) {
  const { previous, next } = getSiblings(current)

  return (
    <nav className="chapter-nav" aria-label="Chapters">
      <div className="container chapter-nav__inner">
        <a className="chapter-nav__link" href={previous.href} rel="prev">
          <span className="chapter-nav__label mono">
            <Icon name="arrow-left" size={14} />
            Previous · {previous.number}
          </span>
          <span className="chapter-nav__title display">{previous.label}</span>
          <span className="chapter-nav__summary">{previous.summary}</span>
        </a>

        <a
          className="chapter-nav__link chapter-nav__link--next"
          href={next.href}
          rel="next"
        >
          <span className="chapter-nav__label mono">
            Next · {next.number}
            <Icon name="arrow-right" size={14} />
          </span>
          <span className="chapter-nav__title display">{next.label}</span>
          <span className="chapter-nav__summary">{next.summary}</span>
        </a>
      </div>
    </nav>
  )
}
