import Sigil from './Sigil'

export default function Wordmark({ href = '#top', large = false, className = '' }) {
  return (
    <a
      className={`wordmark ${large ? 'wordmark--large' : ''} ${className}`.trim()}
      href={href}
      aria-label="Study Quest — back to top"
    >
      <Sigil size={large ? 38 : 27} className="wordmark__sigil" />
      <span className="wordmark__text">Study Quest</span>
    </a>
  )
}
