import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { validateForm, submitRegistration } from '../lib/registration'
import { useAuth } from '../lib/auth'
import GoogleButton from '../components/GoogleButton'

export default function RegistrationForm({ event }) {
  const { user, profile, configured, signInWithGoogle } = useAuth()
  const mainFields = event.form || []
  const extraFields = event.extraFields || []
  const allFields = [...mainFields, ...extraFields]

  const buildEmpty = () => {
    const base = Object.fromEntries(allFields.map((f) => [f.name, '']))
    // Prefill from the signed-in Google profile where sensible.
    if (profile) {
      if ('email' in base) base.email = profile.email || ''
      if ('name' in base) base.name = profile.name || ''
      if ('leaderName' in base) base.leaderName = profile.name || ''
    }
    return base
  }
  const [form, setForm] = useState(buildEmpty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done | error

  // When the backend is live, require Google sign-in before registering.
  const mustSignIn = configured && !user
  // Lock the email to the signed-in Google account.
  const emailLocked = !!profile?.email

  // Keep the email synced to the signed-in account (even if the session
  // resolves after mount); prefill name once without overwriting typing.
  useEffect(() => {
    if (!profile) return
    setForm((f) => {
      const next = { ...f }
      if ('email' in next) next.email = profile.email || next.email
      if ('name' in next && !next.name) next.name = profile.name || ''
      if ('leaderName' in next && !next.leaderName) next.leaderName = profile.name || ''
      return next
    })
  }, [profile])

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForm(allFields, form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('submitting')
    try {
      await submitRegistration(event, allFields, form, user)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const greetName = form.name || form.teamName || form.leaderName || 'there'

  const RULEBOOK_URL = '/ESummit-DCRUSTM26-Rulebook.pdf'
  const getRulebook = () => {
    // Trigger a download
    const a = document.createElement('a')
    a.href = RULEBOOK_URL
    a.download = 'ESummit-DCRUSTM26-Rulebook.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    // Open/redirect to the PDF in a new tab
    window.open(RULEBOOK_URL, '_blank', 'noopener,noreferrer')
  }

  const RulebookButton = () => (
    <button
      type="button"
      onClick={getRulebook}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold glass brand-border hover:bg-white/10 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4a2 2 0 0 1 2-2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Z" />
        <path d="M14 2v6h6M8 13h8M8 17h5" />
      </svg>
      Rulebook (PDF)
    </button>
  )

  const renderField = (f) => {
    const isLockedEmail = f.type === 'email' && emailLocked
    const common = { className: `field ${errors[f.name] ? 'err' : ''}`, value: form[f.name], onChange: set(f.name) }
    return (
      <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">{f.label}</label>
        {f.type === 'textarea' ? (
          <textarea {...common} rows={3} placeholder={f.placeholder} />
        ) : f.type === 'select' ? (
          <select {...common} className={`field ${errors[f.name] ? 'err' : ''} ${!form[f.name] ? 'text-white/40' : ''}`}>
            <option value="" disabled>{f.placeholder || 'Select…'}</option>
            {f.options.map((o) => (
              <option key={o} value={o} className="text-ink">{o}</option>
            ))}
          </select>
        ) : isLockedEmail ? (
          <>
            <input
              className={`field ${errors[f.name] ? 'err' : ''} opacity-80 cursor-not-allowed`}
              type="email"
              value={form[f.name]}
              readOnly
              title="Auto-filled from your Google account"
            />
            <p className="text-[11px] text-white/40 mt-1 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              Auto-filled from your Google sign-in
            </p>
          </>
        ) : (
          <input {...common} type={f.type} inputMode={f.inputMode} placeholder={f.placeholder} />
        )}
        {errors[f.name] && <p className="text-[12px] text-red-400 mt-1">{errors[f.name]}</p>}
      </div>
    )
  }

  return (
    <div id="register" className="glass-strong brand-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-30" style={{ background: event.accent }} />

      <AnimatePresence mode="wait">
        {mustSignIn ? (
          <motion.div key="signin" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative text-center py-6">
            <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-white/80">
                <path d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                <path d="M4 20c1.5-3 4.5-4 8-4s6.5 1 8 4" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-2xl">Sign in to register</h3>
            <p className="text-white/60 mt-2 max-w-sm mx-auto text-sm">
              Sign in with your Google account once, then register for{' '}
              <span className="grad-text font-semibold">{event.title}</span> and any other event.
            </p>
            <div className="mt-5 flex justify-center">
              <RulebookButton />
            </div>
            <div className="mt-4 flex justify-center">
              <GoogleButton onClick={signInWithGoogle} />
            </div>
          </motion.div>
        ) : status === 'done' ? (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14 }}
              className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'linear-gradient(120deg,#ff2fa4,#a855f7)' }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </motion.div>
            <h3 className="font-display font-bold text-2xl">You’re registered! 🎉</h3>
            <p className="text-white/60 mt-2 max-w-md mx-auto">
              Thanks, <span className="text-white font-semibold">{greetName}</span>. Your spot for{' '}
              <span className="grad-text font-semibold">{event.title}</span> is noted. Details and venue
              will be announced soon.
            </p>
            <button
              onClick={() => { setForm(buildEmpty()); setStatus('idle') }}
              className="mt-6 rounded-xl px-6 py-3 glass hover:bg-white/10 transition-colors text-sm font-semibold"
            >
              Register another {event.form?.some((f) => f.name === 'teamName') ? 'team' : 'participant'}
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="relative" noValidate>
            <h3 className="font-display font-bold text-2xl mb-1">Register for {event.title}</h3>
            <div className="mb-4">
              <RulebookButton />
            </div>
            <p className="text-white/55 text-sm mb-6">Free to attend and open to students across INDIA</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {mainFields.map(renderField)}
            </div>

            {extraFields.length > 0 && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-[11px] uppercase tracking-wider text-white/40">Startup details</span>
                  <span className="h-px flex-1 bg-white/10" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {extraFields.map(renderField)}
                </div>
              </>
            )}

            {status === 'error' && <p className="text-sm text-red-400 mt-4">Something went wrong. Please try again.</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-grad rounded-xl px-7 py-3.5 font-semibold text-white mt-6 w-full sm:w-auto disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                'Confirm Registration'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
