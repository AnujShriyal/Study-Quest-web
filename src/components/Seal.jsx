/**
 * Decorative circular seal. aria-hidden, purely visual.
 * Keep the text short so it fits the ring at small sizes.
 */
export default function Seal({ className = '', label = 'LOCAL-FIRST' }) {
  return (
    <div className={`seal ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 160 160" fill="none">
        <defs>
          <path
            id="seal-ring"
            d="M80 80m-59 0a59 59 0 1 1 118 0a59 59 0 1 1-118 0"
          />
        </defs>
        <circle cx="80" cy="80" r="74" stroke="currentColor" strokeWidth="1" />
        <circle
          cx="80"
          cy="80"
          r="48"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <text
          fill="currentColor"
          fontSize="10"
          fontFamily="var(--font-mono)"
          letterSpacing="2.3"
        >
          <textPath href="#seal-ring" startOffset="1%">
            {label} · NO ACCOUNT · NO CLOUD · STUDY QUEST ·
          </textPath>
        </text>
        <path
          d="M80 64l3.3 9.7 9.7 3.3-9.7 3.3L80 90l-3.3-9.7-9.7-3.3 9.7-3.3z"
          fill="currentColor"
        />
        <text
          x="80"
          y="103"
          textAnchor="middle"
          fill="currentColor"
          fontSize="7.5"
          fontFamily="var(--font-mono)"
          letterSpacing="2"
        >
          WINDOWS
        </text>
      </svg>
    </div>
  )
}
