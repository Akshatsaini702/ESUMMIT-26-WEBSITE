import { motion } from 'framer-motion'
import { sponsors } from '../data/people'

export default function Sponsors() {
  return (
    <section id="sponsors" className="relative py-24">
      <div className="blob w-[420px] h-[380px] bg-peach/12 right-0 bottom-10" />
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">Backed by</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl">
            Our <span className="grad-text">Sponsors</span>
          </h2>
          <p className="text-white/50 text-sm mt-3 max-w-xl mx-auto">
            Partnering with brands that champion student entrepreneurship. Sponsor logos coming soon.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {sponsors.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="glass brand-border rounded-2xl p-6 flex flex-col items-center justify-center text-center aspect-[4/3] hover:-translate-y-1 transition-transform"
            >
              {s.logo ? (
                <img src={s.logo} alt={s.name} className="max-h-16 w-auto object-contain" />
              ) : (
                <div className="w-14 h-14 rounded-xl mb-3 flex items-center justify-center bg-white/5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-white/40">
                    <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
                  </svg>
                </div>
              )}
              <div className="mt-1 text-sm font-semibold text-white/70">{s.name}</div>
              <div className="text-[11px] uppercase tracking-wider grad-text mt-1">{s.tier}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm mb-4">Interested in partnering with us?</p>
          <a
            href="/E-Summit-2026-Sponsorship-Proposal.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-grad inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M9 15h6M9 11h2" />
            </svg>
            Become a Sponsor
          </a>
        </motion.div>
      </div>
    </section>
  )
}
