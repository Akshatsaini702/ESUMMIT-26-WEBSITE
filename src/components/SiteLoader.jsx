import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

// First-load branded preloader: rotating hex cube (echoes the E-Summit mark) + progress.
export default function SiteLoader({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()
    const dur = 1700
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setPct(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 350)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.5 }}
    >
      <div className="blob w-[420px] h-[420px] bg-royal/30 -top-10" />
      <div className="blob w-[360px] h-[360px] bg-violet/30 bottom-0" />

      <div className="relative">
        <svg width="120" height="132" viewBox="0 0 120 132" className="drop-shadow-[0_0_25px_rgba(255,47,164,0.45)]">
          <defs>
            <linearGradient id="ld" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff2fa4" />
              <stop offset="0.5" stopColor="#a855f7" />
              <stop offset="1" stopColor="#ff7a1a" />
            </linearGradient>
          </defs>
          <motion.path
            d="M60 6 108 33v54L60 114 12 87V33z"
            fill="none"
            stroke="url(#ld)"
            strokeWidth="4"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          <motion.path
            d="M60 30 84 44v.5L60 58 36 44.5z"
            fill="url(#ld)"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </svg>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ borderRadius: '50%' }}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm tracking-[0.35em] text-white/50 uppercase">E-Summit DCRUST'26</p>
        <div className="mt-4 h-[3px] w-56 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-100 ease-linear"
            style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#ff2fa4,#a855f7,#ff7a1a)' }}
          />
        </div>
        <p className="mt-3 text-xs text-white/40 tabular-nums">{pct}%</p>
      </div>
    </motion.div>
  )
}
