// Fixed dark "console" backdrop: near-black base + a faint neon grid.
// (Floating orbs removed — the glowing bulb is the hero background element.)
export default function NeonBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(120% 90% at 50% -10%, #171633 0%, #0c0b1a 45%, #08070f 100%)' }} />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(124,92,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,92,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%)',
          maskImage: 'radial-gradient(ellipse at 50% 40%, #000 30%, transparent 85%)',
        }}
      />
    </div>
  )
}
