import { motion } from 'framer-motion'
import { schedule } from '../data/events'

export default function Timeline() {
  return (
    <section id="schedule" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">Tentative programme</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl">
            Two days, <span className="grad-text">back to back</span>
          </h2>
          <p className="text-white/50 text-sm mt-3">Final venues &amp; timings for all events. A couple of lunch venues are still being confirmed.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(schedule).map(([day, rows], di) => (
            <motion.div
              key={day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: di * 0.1 }}
              className="glass-strong brand-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-ink"
                  style={{ background: 'linear-gradient(120deg,#ff2fa4,#a855f7)' }}>
                  {di + 1}
                </span>
                <h3 className="font-display font-bold text-lg">{day}</h3>
              </div>

              <ul className="relative">
                <span className="absolute left-[7px] top-1 bottom-1 w-px bg-gradient-to-b from-royal/60 via-violet/40 to-transparent" />
                {rows.map((r, i) => (
                  <li key={i} className="relative pl-8 pb-5 last:pb-0 group">
                    <span className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-violet bg-ink group-hover:bg-violet transition-colors" />
                    <div className="text-xs text-peach font-medium tabular-nums">{r.time}</div>
                    <div className="text-sm text-white/80 mt-0.5">{r.activity}</div>
                    {r.venue && (
                      <div className="text-[11px] text-white/45 mt-0.5 flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet shrink-0"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
                        {r.venue}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
