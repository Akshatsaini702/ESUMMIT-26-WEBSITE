// Lightweight fixed luxury backdrop: warm cream base with softly drifting
// champagne/beige orbs and a faint grain. Pure CSS — no WebGL, very smooth.
export default function LuxuryBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,#f8f4ec 0%,#f3ece0 45%,#efe6d6 100%)' }} />
      <div className="blob animate-drift" style={{ width: '46vw', height: '46vw', left: '-8vw', top: '-6vw', background: 'radial-gradient(circle,#a3e635,#a3e63500 70%)', opacity: 0.7 }} />
      <div className="blob animate-drift" style={{ width: '40vw', height: '40vw', right: '-6vw', top: '20vh', background: 'radial-gradient(circle,#d8c49a,#d8c49a00 70%)', opacity: 0.6, animationDelay: '-7s' }} />
      <div className="blob animate-drift" style={{ width: '38vw', height: '38vw', left: '25vw', bottom: '-10vh', background: 'radial-gradient(circle,#efe3c9,#efe3c900 70%)', opacity: 0.6, animationDelay: '-14s' }} />
      {/* faint grain */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
