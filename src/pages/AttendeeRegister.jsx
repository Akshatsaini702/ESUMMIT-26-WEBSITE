import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { attendeeFields } from '../data/events'
import { validateForm, submitAttendee } from '../lib/registration'
import Footer from '../components/Footer'

// Attendee-only registration — NO Google sign-in. For anyone who just wants to
// attend the summit (panel discussions, cultural evening, watch the events…).
export default function AttendeeRegister() {
  const fields = attendeeFields
  const [form, setForm] = useState(() => Object.fromEntries(fields.map((f) => [f.name, ''])))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | done | error

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = validateForm(fields, form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setStatus('submitting')
    try {
      await submitAttendee(fields, form)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const greetName = form.name || 'there'

  const renderField = (f) => {
    const common = { className: `field ${errors[f.name] ? 'err' : ''}`, value: form[f.name], onChange: set(f.name) }
    return (
      <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
        <label className="block text-xs uppercase tracking-wider text-white/50 mb-1.5">{f.label}</label>
        {f.type === 'select' ? (
          <select {...common} className={`field ${errors[f.name] ? 'err' : ''} ${!form[f.name] ? 'text-white/40' : ''}`}>
            <option value="" disabled>{f.placeholder || 'Select…'}</option>
            {f.options.map((o) => (
              <option key={o} value={o} className="text-ink">{o}</option>
            ))}
          </select>
        ) : (
          <input {...common} type={f.type} placeholder={f.placeholder} />
        )}
        {errors[f.name] && <p className="text-[12px] text-red-400 mt-1">{errors[f.name]}</p>}
      </div>
    )
  }

  return (
    <>
      <section className="relative pt-28 pb-16 overflow-hidden min-h-[80vh]">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="blob w-[420px] h-[420px] -left-20 top-0 bg-violet/20" />
        <div className="blob w-[360px] h-[360px] right-0 top-24 bg-royal/20" />

        <div className="mx-auto max-w-2xl px-4 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Back to home
          </Link>

          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/40 mb-2">Attend the summit</p>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
              Register as an <span className="grad-text">Attendee</span>
            </h1>
            <p className="text-white/60 mt-3 text-sm">
              Just want to attend — panel discussions, the cultural evening, or to watch the events?
              Register here. No sign-in needed. Free to attend and open to students across INDIA.
            </p>
          </div>

          <div className="glass-strong brand-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-30 bg-violet" />

            <AnimatePresence mode="wait">
              {status === 'done' ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="relative text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                    className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-5"
                    style={{ background: 'linear-gradient(120deg,#ff2fa4,#a855f7)' }}
                  >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl">You’re on the list! 🎉</h3>
                  <p className="text-white/60 mt-2 max-w-md mx-auto">
                    Thanks, <span className="text-white font-semibold">{greetName}</span>. Your attendee pass for
                    <span className="grad-text font-semibold"> E-Summit DCRUST&rsquo;26</span> is noted. See you at DCRUST — final venues are on the schedule.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => { setForm(Object.fromEntries(fields.map((f) => [f.name, '']))); setStatus('idle') }}
                      className="rounded-xl px-6 py-3 glass hover:bg-white/10 transition-colors text-sm font-semibold"
                    >
                      Register another attendee
                    </button>
                    <Link to="/" className="btn-grad rounded-xl px-6 py-3 text-sm font-semibold text-white">Back to home</Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="relative" noValidate>
                  <h3 className="font-display font-bold text-2xl mb-1">Attendee details</h3>
                  <p className="text-white/55 text-sm mb-6">No account required — just fill this in and you’re done.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {fields.map(renderField)}
                  </div>

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
                      'Confirm Attendee Registration'
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
