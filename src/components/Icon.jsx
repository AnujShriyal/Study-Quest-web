const paths = {
  download: (
    <>
      <path d="M12 3v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 20V5" />
      <path d="m6 11 6-6 6 6" />
    </>
  ),
  timer: (
    <>
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.6 1.6" />
      <path d="M9 2.5h6" />
      <path d="M12 2.5v3" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  spark: (
    <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5-2-6.5L3.5 11 10 9Z" />
  ),
  flame: (
    <path d="M12 21c3.8 0 6.3-2.3 6.3-5.6 0-2.3-1.1-4.1-3.3-6.4-.3 1.7-1.1 2.7-2.2 3.3.2-2.4-.5-4.7-2.4-7.1.1 3.2-1.2 4.6-2.6 6.2-.9 1.1-1.8 2.4-1.8 4C6 18.7 8.4 21 12 21Z" />
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m3 6 1.2 1.2L6.4 5" />
      <path d="m3 12 1.2 1.2 2.2-2.2" />
      <path d="m3 18 1.2 1.2 2.2-2.2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="1.5" />
      <path d="M3 9.5h18M8.2 4v16M15.8 4v16" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.4-6.5-10.6a6.5 6.5 0 1 1 13 0C18.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  tray: (
    <>
      <path d="M4 5h16v14H4z" />
      <path d="M4 13.5h4.2l1.8 2.5h4l1.8-2.5H20" />
      <path d="M9 5v4M15 5v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v5.6c0 4.4-2.9 7.3-7 9.4-4.1-2.1-7-5-7-9.4V6Z" />
      <path d="m8.6 11.8 2.2 2.2 4.6-4.6" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.5" />
      <path d="M15.5 8.5v-3a1.5 1.5 0 0 0-1.5-1.5H5.5A1.5 1.5 0 0 0 4 5.5v8.5A1.5 1.5 0 0 0 5.5 15.5h3" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5L20 5.5" />,
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m5 5 14 14M19 5 5 19" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </>
  ),
}

export default function Icon({ name, size = 20, className = '' }) {
  const shape = paths[name]
  if (!shape) return null

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {shape}
    </svg>
  )
}
