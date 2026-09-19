import { motion } from 'framer-motion'
import Wordmark from './Wordmark'
import { SUMMIT } from '../data/events'
import { CONTACT } from '../config'

const stat = (value, label) => ({ value, label })
const stats = [stat('2', 'Days'), stat('8', 'Events'), stat('₹31,000+', 'Prize Pool'), stat('FREE', 'Entry')]

export default function Hero() {
  return (
    <section id="top" className="relative isolate flex flex-col items-center text-center overflow-hidden px-4 pb-20">
      <div className="absolute inset-0 grid-overlay opacity-70 -z-10" />

      {/* First screen: only the lead-in text + wordmark are visible; the tagline
          and everything below reveal as you scroll. */}
      <div className="relative min-h-[100svh] w-full flex flex-col items-center justify-center">

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="label text-[10px] sm:text-xs text-cyan mb-4 flex items-center gap-2"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-cyan animate-pulse" />
        CH 01 — The Summit
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex flex-col items-center gap-1"
      >
        <p className="label text-sm sm:text-lg md:text-xl text-white/80">{SUMMIT.organisers}</p>
        <p className="label text-[10px] sm:text-xs text-white/45">presents</p>
      </motion.div>

      {/* Huge centered E-Summit wordmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center w-full"
      >
        <Wordmark size="clamp(74px, 27vw, 460px)" glow className="max-w-full" />
      </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <span className="w-px h-8 bg-gradient-to-b from-violet to-transparent" />
        </motion.div>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-display font-extrabold leading-[1.05] text-3xl sm:text-5xl mt-16 sm:mt-24"
      >
        Entrepreneurs for <span className="grad-text-anim">Viksit Bharat</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-5 text-base sm:text-lg text-white/70 max-w-2xl"
      >
        A two-day national summit of market simulations, a startup pitch battle, creative and
        negotiation challenges, and panels with founders — hosted on {SUMMIT.campus}.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm"
      >
        <span className="glass rounded-xl px-4 py-2 flex items-center gap-2">
          <CalIcon /> {SUMMIT.dates}
        </span>
        <a
          href={CONTACT.maps}
          target="_blank"
          rel="noreferrer"
          className="glass rounded-xl px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors"
          title="Open in Google Maps"
        >
          <PinIcon /> DCRUST Murthal Campus
        </a>
        <span className="glass rounded-xl px-4 py-2">{SUMMIT.registration}</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-8 flex flex-wrap gap-4 justify-center"
      >
        <button
          onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
          className="btn-grad rounded-xl px-7 py-3.5 font-semibold text-white"
        >
          Explore & Register
        </button>
        <button
          onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-xl px-7 py-3.5 font-semibold text-white/90 glass hover:bg-white/10 transition-colors"
        >
          View Schedule
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="mt-12 grid grid-cols-4 gap-4 sm:gap-8 max-w-lg"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display font-extrabold text-2xl sm:text-3xl grad-text">{s.value}</div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wider text-white/50 mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

    </section>
  )
}

const CalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-peach">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </svg>
)
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-violet">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
