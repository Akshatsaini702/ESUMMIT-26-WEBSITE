import { motion } from 'framer-motion'
import { events } from '../data/events'
import EventCard from './EventCard'

export default function Events() {
  return (
    <section id="events" className="relative py-24">
      <div className="blob w-[420px] h-[420px] bg-violet/15 right-0 top-20" />
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">The line-up</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
              Eight ways to <span className="grad-text">compete & connect</span>
            </h2>
          </div>
          <p className="text-white/60 max-w-sm text-sm">
            Five competitions with cash prizes, two founder panels, a cultural evening and the closing
            ceremony — across two days. Tap any card for full details.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
