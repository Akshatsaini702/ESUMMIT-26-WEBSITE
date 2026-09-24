import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { useAuth } from '../lib/auth'
import { getEvent } from '../data/events'
import Icon from '../components/Icon'
import GoogleButton from '../components/GoogleButton'
import Footer from '../components/Footer'

const fmt = (ts) => new Date(ts).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })

// A signed-in user's personal dashboard: every event they've registered for,
// with date / time / venue. RLS ensures they only ever see their own rows.
export default function MyRegistrations() {
  const { user, loading, configured, signInWithGoogle } = useAuth()
  const [rows, setRows] = useState([])
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase || !user) return
    setFetching(true)
    supabase
      .from('registrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRows(data || [])
        setFetching(false)
      })
  }, [user])

  const Shell = ({ children }) => (
    <>
      <section className="relative pt-28 pb-16 min-h-[80vh] overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="blob w-[420px] h-[420px] -left-20 top-0 bg-violet/20" />
        <div className="blob w-[360px] h-[360px] right-0 top-24 bg-royal/20" />
        <div className="mx-auto max-w-4xl px-4 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Back to home
          </Link>
          {children}
        </div>
      </section>
      <Footer />
    </>
  )

  if (!configured)
    return <Shell><Card title="Backend not connected">Registrations aren’t connected yet.</Card></Shell>
  if (loading)
    return <Shell><Card title="Loading…" /></Shell>
  if (!user)
    return (
      <Shell>
        <Card title="Sign in to see your registrations">
          Sign in with the same Google account you registered with, and your events will show up here.
          <div className="mt-6 flex justify-center"><GoogleButton onClick={signInWithGoogle} /></div>
        </Card>
      </Shell>
    )

  return (
    <Shell>
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-2">My dashboard</p>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
          Your <span className="grad-text">registrations</span>
        </h1>
        <p className="text-white/55 text-sm mt-2">Signed in as {user.email}. Everything you’ve registered for is listed below.</p>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">Error: {error}</p>}

      {fetching ? (
        <p className="text-white/50">Loading your registrations…</p>
      ) : rows.length === 0 ? (
        <div className="glass-strong brand-border rounded-3xl p-8 text-center">
          <h3 className="font-display font-bold text-xl">No registrations yet</h3>
          <p className="text-white/55 mt-2 text-sm">You haven’t registered for any event with this account.</p>
          <Link to="/#events" className="inline-block mt-6 btn-grad rounded-xl px-6 py-3 text-sm font-semibold text-white">Browse events</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {rows.map((r, i) => {
            const ev = getEvent(r.event_id)
            const accent = ev?.accent || '#a855f7'
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass brand-border rounded-2xl p-5 relative overflow-hidden"
              >
                <div className="absolute -top-14 -right-14 w-36 h-36 rounded-full blur-3xl opacity-40" style={{ background: accent }} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}22`, color: accent }}>
                      <Icon name={ev?.icon || 'trophy'} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display font-bold text-lg leading-tight truncate">{ev?.title || r.event_title}</h3>
                      <p className="text-[11px] uppercase tracking-wider text-emerald-300/80 font-semibold">Registered ✓</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-sm text-white/70">
                    {(ev?.day || ev?.date) && (
                      <div className="flex items-center gap-2">
                        <CalIcon /> <span>{[ev?.day, ev?.date].filter(Boolean).join(' · ')}</span>
                      </div>
                    )}
                    {ev?.time && (
                      <div className="flex items-center gap-2">
                        <ClockIcon /> <span>{ev.time}</span>
                      </div>
                    )}
                    {ev?.venue && (
                      <div className="flex items-center gap-2">
                        <PinIcon /> <span>{ev.venue}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-white/40">Registered on {fmt(r.created_at)}</span>
                    {ev && (
                      <Link to={`/event/${ev.id}`} className="text-xs font-semibold grad-text whitespace-nowrap">View event →</Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </Shell>
  )
}

const Card = ({ title, children }) => (
  <div className="glass-strong brand-border rounded-3xl p-8 max-w-md mx-auto text-center">
    <h1 className="font-display font-bold text-2xl mb-3">{title}</h1>
    <div className="text-white/60 text-sm">{children}</div>
  </div>
)
const CalIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-peach shrink-0"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></svg>
)
const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-cyan shrink-0"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
const PinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-violet shrink-0"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
