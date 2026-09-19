import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { SUMMIT } from '../data/events'

// Cinematic first-load gate: neon portal + wordmark + ENTER.
export default function IntroGate({ onEnter }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(120% 100% at 50% 0%, #171633 0%, #0b0a18 50%, #07060e 100%)' }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(10px)' }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.3, 1] }}
    >
      {/* neon portal rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute rounded-full border"
            style={{
              width: `${180 + i * 130}px`,
              height: `${180 + i * 130}px`,
              borderColor: ['#ff2fa4', '#a855f7', '#22d3ee', '#a3e635'][i] + '55',
            }}
            animate={{ rotate: i % 2 ? 360 : -360, scale: [1, 1.05, 1] }}
            transition={{ rotate: { duration: 26 + i * 6, repeat: Infinity, ease: 'linear' }, scale: { duration: 5, repeat: Infinity } }}
          />
        ))}
        <div className="blob" style={{ width: 520, height: 520, background: 'radial-gradient(circle,#a855f7,#a855f700 70%)', opacity: 0.4 }} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="label text-[10px] sm:text-xs text-white/55 mb-6 relative text-center px-4"
      >
        {SUMMIT.organisers} · presents
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <Wordmark size="clamp(64px, 22vw, 260px)" year={0.26} glow className="max-w-full" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="font-display text-2xl sm:text-4xl mt-4 relative grad-text-anim"
      >
        Entrepreneurs for Viksit Bharat
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        onClick={onEnter}
        className="group relative mt-12 w-32 h-32 rounded-full flex items-center justify-center"
      >
        <motion.span
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: '#22d3ee' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <span className="absolute inset-2 rounded-full" style={{ background: 'linear-gradient(135deg,#ff2fa4,#a855f7,#22d3ee)', opacity: 0.18 }} />
        <span className="label text-sm text-white group-hover:tracking-[0.4em] transition-all">ENTER</span>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="label text-[9px] text-white/35 mt-6"
      >
        28–29 Sep 2026 · DCRUST Murthal
      </motion.p>
    </motion.div>
  )
}
