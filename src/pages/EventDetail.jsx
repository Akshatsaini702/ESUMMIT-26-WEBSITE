import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getEvent } from '../data/events'
import Icon from '../components/Icon'
import RegistrationForm from './RegistrationForm'
import Footer from '../components/Footer'

export default function EventDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const event = getEvent(id)

  if (!event) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-display font-bold text-3xl mb-3">Event not found</h2>
        <Link to="/#events" className="btn-grad rounded-xl px-6 py-3 font-semibold">Back to events</Link>
      </div>
    )
  }

  const isComp = event.type === 'competition'

  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="blob w-[460px] h-[460px] -left-20 top-0" style={{ background: `${event.accent}33` }} />
        <div className="blob w-[380px] h-[380px] right-0 top-24 bg-violet/20" />

        <div className="mx-auto max-w-6xl px-4 relative">
          <button
            onClick={() => nav('/#events')}
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All events
          </button>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left: info */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${event.accent}22`, color: event.accent }}
              >
                <Icon name={event.icon} className="w-7 h-7" />
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
                <span className="glass rounded-full px-3 py-1">{event.day} · {event.date}</span>
                <span className="glass rounded-full px-3 py-1">{isComp ? 'Competition' : 'Session'}</span>
                {event.featured && (
                  <span className="rounded-full px-3 py-1 text-ink font-semibold" style={{ background: 'linear-gradient(100deg,#ff7a1a,#a855f7)' }}>
                    Centerpiece
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-tight">{event.title}</h1>
              <p className="text-lg text-white/60 mt-2">{event.tagline}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                  <ClockIcon /> {event.time}
                </span>
                <span className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                  <PinIcon /> {event.venue}
                </span>
                {event.eventType && (
                  <span className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                    <UsersIcon /> {event.eventType}{event.teamSize ? ` · ${event.teamSize}` : ''}
                  </span>
                )}
                {event.format && (
                  <span className="glass rounded-xl px-4 py-2 flex items-center gap-2">
                    <BoltIcon /> {event.format}
                  </span>
                )}
              </div>

              <div className="mt-7 space-y-4">
                {event.long.map((p, i) => (
                  <p key={i} className="text-white/70 leading-relaxed">{p}</p>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {event.highlights?.map((h) => (
                  <span key={h} className="text-xs glass rounded-lg px-3 py-1.5 text-white/70">{h}</span>
                ))}
              </div>

              {isComp && (
                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Prize pool</p>
                  <div className="flex gap-3">
                    {event.prizes.map((p, i) => (
                      <div key={i} className="glass brand-border rounded-xl px-5 py-3 text-center">
                        <div className="text-[11px] text-white/50">{['1st', '2nd', '3rd'][i]}</div>
                        <div className="font-display font-bold text-lg grad-text">{p}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {event.rules?.length > 0 && (
                <div className="mt-9">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-3">Rules & format</p>
                  <ul className="space-y-2.5">
                    {event.rules.map((r, i) => (
                      <li key={i} className="flex gap-3 text-sm text-white/70 leading-relaxed">
                        <span className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: event.accent }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.evaluation?.length > 0 && (
                <div className="mt-9">
                  <p className="text-xs uppercase tracking-wider text-white/40 mb-3">How you’re judged</p>
                  <div className="space-y-3">
                    {event.evaluation.map((e, i) => (
                      <div key={i} className="glass rounded-xl p-3.5">
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="text-sm font-semibold text-white/90">{e.criterion}</span>
                          <span className="text-sm font-bold grad-text shrink-0">{e.weight}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                          <div className="h-full rounded-full" style={{ width: `${e.weight}%`, background: 'linear-gradient(90deg,#ff2fa4,#a855f7,#ff7a1a)' }} />
                        </div>
                        {e.detail && <p className="text-xs text-white/50 leading-relaxed">{e.detail}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right: registration or info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:sticky lg:top-24"
            >
              {isComp ? (
                <RegistrationForm event={event} />
              ) : (
                <div className="glass-strong brand-border rounded-3xl p-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${event.accent}22`, color: event.accent }}>
                    <Icon name={event.icon} className="w-8 h-8" />
                  </div>
                  <h3 className="font-display font-bold text-2xl">No registration needed</h3>
                  <p className="text-white/60 mt-3">
                    {event.title} is open to all summit participants and guests — just be there. Timings
                    are listed above; the venue will be announced soon.
                  </p>
                  <Link
                    to="/#events"
                    className="inline-block mt-6 rounded-xl px-6 py-3 glass hover:bg-white/10 transition-colors text-sm font-semibold"
                  >
                    Browse other events
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-peach">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-violet">
    <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-royal">
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" />
    <path d="M16 5.5a3 3 0 0 1 0 5M21 20c0-2.6-1.5-4.2-3.5-4.8" />
  </svg>
)
const BoltIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-peach">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </svg>
)
