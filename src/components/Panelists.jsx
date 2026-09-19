import { motion } from 'framer-motion'
import { panelists } from '../data/people'

export default function Panelists() {
  return (
    <section id="panelists" className="relative py-24">
      <div className="blob w-[420px] h-[420px] bg-violet/15 left-0 top-24" />
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">Speakers</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl">
            Meet the <span className="grad-text">Panelists</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 max-w-xl">
            Founders, entrepreneurs and industry professionals join our panel discussions across both days.
            Names to be announced soon.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {panelists.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass brand-border rounded-2xl p-6 flex items-center gap-5 hover:-translate-y-1 transition-transform"
            >
              <div className="shrink-0">
                {p.img ? (
                  <img src={p.img} alt={p.name} className="w-20 h-20 rounded-2xl object-cover" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#ff2fa4,#a855f7)' }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <circle cx="12" cy="9" r="3.2" />
                      <path d="M5 20c1.2-3.2 4-4.6 7-4.6s5.8 1.4 7 4.6" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-lg">{p.name}</h3>
                <p className="text-sm text-white/60">{p.role}{p.org ? ` · ${p.org}` : ''}</p>
                <span className="inline-block mt-3 text-[11px] uppercase tracking-wider text-violet glass rounded-lg px-2.5 py-1">
                  {p.session}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
