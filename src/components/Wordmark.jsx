// The E-SUMMIT'26 wordmark (transparent PNG/WebP — the '26 is baked into the
// artwork, so no separate year is appended). `glow` adds a soft, subtle halo
// behind the logo (used in the hero) that stays clear of the letters.
export default function Wordmark({
  size = 40,
  glow = false,
  className = '',
}) {
  const fontSize = typeof size === 'number' ? `${size}px` : size
  return (
    <span className={`relative inline-block select-none ${className}`} style={{ fontSize, lineHeight: 1 }}>
      {glow && <span className="wordmark-glow" />}
      <img
        src="/esummit-wordmark-26.webp"
        alt="E-Summit'26"
        style={{ height: '1em', width: 'auto' }}
        className="block object-contain drop-shadow-[0_6px_22px_rgba(90,120,210,0.28)]"
        draggable="false"
      />
    </span>
  )
}
