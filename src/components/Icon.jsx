// Lightweight inline icon set (stroke-based) used across event cards & details.
const paths = {
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15l3-4 3 2 4-6" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M10 6l9-3v18l-9-3" />
    </>
  ),
  handshake: (
    <>
      <path d="M12 11l2-2 4 4 3-3-5-5-3 1-3-1-5 5 3 3" />
      <path d="M8 12l3 3 2-2" />
    </>
  ),
  rocket: (
    <>
      <path d="M5 15c-1.5 1-2 5-2 5s4-.5 5-2" />
      <path d="M9 15l-3-3c2-6 6-9 12-9 0 6-3 10-9 12Z" />
      <circle cx="14.5" cy="9.5" r="1.5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 7h14" />
      <path d="M5 7l-2 5a3 3 0 0 0 6 0Z" />
      <path d="M19 7l-2 5a3 3 0 0 0 6 0Z" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="16" cy="16" r="3" />
    </>
  ),
  trophy: (
    <>
      <path d="M8 4h8v5a4 4 0 0 1-8 0Z" />
      <path d="M8 6H5v1a3 3 0 0 0 3 3" />
      <path d="M16 6h3v1a3 3 0 0 1-3 3" />
      <path d="M10 15h4l1 5H9Z" />
    </>
  ),
}

export default function Icon({ name, className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name] || paths.rocket}
    </svg>
  )
}
