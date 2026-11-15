export default function Sigil({ size = 28, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="1.25"
        y="1.25"
        width="29.5"
        height="29.5"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M16 6.4l2.5 7.1 7.1 2.5-7.1 2.5L16 25.6l-2.5-7.1L6.4 16l7.1-2.5z"
        fill="currentColor"
      />
    </svg>
  )
}
