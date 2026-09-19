import { motion } from 'framer-motion'
import { SUMMIT } from '../data/events'

const pillars = [
  {
    title: 'Think like a founder',
    body: 'Identify problems, build solutions, negotiate and decide under uncertainty — through competitions that mirror real business.',
  },
  {
    title: 'Learn from builders',
    body: 'Two panel discussions bring founders, entrepreneurs and industry professionals directly to participants.',
  },
  {
    title: 'A national platform',
    body: 'Open to students from institutions across India, hosted on the DCRUST Murthal campus — free to enter.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.1 } }),
}

export default function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-3">About the summit</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl leading-tight">
            Where students <span className="grad-text">experience</span> entrepreneurship
          </h2>
          <p className="mt-5 text-white/70 text-lg">
            {SUMMIT.name} is the first E-Summit organised by {SUMMIT.organisers}, built on the theme{' '}
            <span className="text-white font-semibold">“{SUMMIT.theme}.”</span> Rather than treating
            entrepreneurship as an abstract career option, it lets participants live it through
            structured competitions, simulations and conversations with people building in the ecosystem.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              custom={i}
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              className="glass brand-border rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="text-4xl font-display font-extrabold grad-text mb-3">0{i + 1}</div>
              <h3 className="font-semibold text-xl mb-2">{p.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
