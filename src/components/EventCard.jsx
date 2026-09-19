import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import Icon from './Icon'

export default function EventCard({ event, index }) {
  const nav = useNavigate()
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 })

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const isComp = event.type === 'competition'

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={() => nav(`/event/${event.id}`)}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className="group relative cursor-pointer rounded-2xl glass brand-border p-6 overflow-hidden hover:shadow-card transition-shadow duration-300"
    >
      {/* accent glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
        style={{ background: event.accent }}
      />
      {/* big chapter number */}
      <span className="absolute top-4 right-5 font-display text-3xl leading-none text-white/15 group-hover:text-white/25 transition-colors" style={{ transform: 'translateZ(20px)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      {event.featured && (
        <span className="absolute top-4 left-5 label text-[9px] px-2.5 py-1 rounded-full text-ink font-bold"
          style={{ background: 'linear-gradient(100deg,#ff7a1a,#a855f7)' }}>
          Centerpiece
        </span>
      )}

      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${event.featured ? 'mt-7' : ''}`}
          style={{ background: `${event.accent}22`, color: event.accent, boxShadow: `0 0 24px -6px ${event.accent}` }}
        >
          <Icon name={event.icon} className="w-6 h-6" />
        </div>

        <div className="flex items-center gap-2 mb-2 label text-[10px]">
          <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: event.accent, boxShadow: `0 0 8px ${event.accent}` }} />
          <span className="text-white/50">{event.day}</span>
          <span className="text-white/20">/</span>
          <span style={{ color: event.accent }}>{isComp ? 'Competition' : 'Session'}</span>
        </div>

        <h3 className="font-display text-2xl leading-tight tracking-wide">{event.title}</h3>
        <p className="text-sm text-white/50 mt-0.5">{event.tagline}</p>
        <p className="text-sm text-white/65 mt-3 leading-relaxed line-clamp-3">{event.short}</p>

        <div className="mt-4 flex items-center gap-3 text-xs text-white/50">
          <span className="flex items-center gap-1">
            <ClockIcon /> {event.time}
          </span>
        </div>

        {isComp && (
          <div className="mt-3 flex items-center gap-1.5">
            {event.prizes.map((p, i) => (
              <span
                key={i}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  background: i === 0 ? 'linear-gradient(100deg,#ffd166,#ff7a1a)' : 'rgba(255,255,255,0.06)',
                  color: i === 0 ? '#3a2200' : 'rgba(255,255,255,0.7)',
                }}
              >
                {i === 0 ? '🏆 ' : ''}{p}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center gap-1 text-sm font-semibold grad-text group-hover:gap-2 transition-all">
          {isComp ? 'Register now' : 'View details'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-peach">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </motion.article>
  )
}

const ClockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
