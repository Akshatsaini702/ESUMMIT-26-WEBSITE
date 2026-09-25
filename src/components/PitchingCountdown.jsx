import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Registration deadline for the Pitching Competition:
// 26 Sep 2026, 12:00 PM IST  ==  06:30 UTC (IST = UTC+5:30).
// Fixed to an absolute instant so it counts down the same for every viewer,
// regardless of their device time zone.
const DEADLINE = Date.UTC(2026, 8, 26, 6, 30, 0)

function remaining() {
  const diff = DEADLINE - Date.now()
  if (diff <= 0) return { done: true, d: 0, h: 0, m: 0, s: 0 }
  return {
    done: false,
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  }
}

const pad = (n) => String(n).padStart(2, '0')

export default function PitchingCountdown() {
  const [t, setT] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setT(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const Unit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <span className="font-display font-extrabold text-base sm:text-lg leading-none tabular-nums text-white">
        {pad(value)}
      </span>
      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider text-white/45 mt-0.5">{label}</span>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="fixed z-40 top-[76px] sm:top-[92px] right-2.5 sm:right-4 w-[196px] sm:w-[236px] rounded-2xl overflow-hidden border shadow-lg"
      style={{
        borderColor: 'rgba(255,47,164,0.45)',
        background: 'linear-gradient(150deg, rgba(20,10,24,0.92), rgba(30,12,30,0.92))',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="px-3 pt-2 pb-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-70 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#ff2fa4' }} />
          </span>
          <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider grad-text leading-tight">
            Pitching registration
          </p>
        </div>

        {t.done ? (
          <p className="text-sm font-display font-bold text-red-300 py-1">Registration closed</p>
        ) : (
          <>
            <div className="flex items-center justify-between gap-1">
              <Unit value={t.d} label="Days" />
              <span className="text-white/25 text-sm -mt-2">:</span>
              <Unit value={t.h} label="Hrs" />
              <span className="text-white/25 text-sm -mt-2">:</span>
              <Unit value={t.m} label="Min" />
              <span className="text-white/25 text-sm -mt-2">:</span>
              <Unit value={t.s} label="Sec" />
            </div>
            <p className="text-[9px] sm:text-[10px] text-white/50 mt-1.5 text-center leading-snug">
              Closes 26 Sep 2026 · 12:00 PM IST
            </p>
          </>
        )}
      </div>
    </motion.div>
  )
}
