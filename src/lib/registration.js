import { supabase } from './supabase'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/
const URL_RE = /^https?:\/\/.+/i

// Validates a set of field definitions against the current values.
export function validateForm(fields, values) {
  const errors = {}
  fields.forEach((f) => {
    if (f.required === false) return
    const v = String(values[f.name] ?? '').trim()
    if (!v) {
      errors[f.name] = `Please provide ${f.label.replace(/\s*—.*$/, '').toLowerCase()}`
      return
    }
    if (f.type === 'tel' && !PHONE_RE.test(v)) errors[f.name] = 'Enter a valid 10-digit phone number'
    else if (f.type === 'email' && !EMAIL_RE.test(v)) errors[f.name] = 'Enter a valid email address'
    else if (f.type === 'url' && !URL_RE.test(v)) errors[f.name] = 'Paste a valid link (https://…)'
  })
  return errors
}

// Builds a { label: value } object from the field defs + values.
function buildData(fields, values) {
  const data = {}
  fields.forEach((f) => {
    data[f.label] = String(values[f.name] ?? '').trim()
  })
  return data
}

// Fires the "thank you / welcome" confirmation email via the Supabase Edge
// Function. Best-effort: a failure here must never fail the registration, so we
// swallow and log any error.
async function sendConfirmationEmail({ to, name, event }) {
  if (!supabase || !to || !event) return
  try {
    const { error } = await supabase.functions.invoke('send-registration-email', {
      body: {
        to,
        name,
        eventTitle: event.title,
        eventDate: event.date || '',
        eventTime: event.time || '',
        eventVenue: event.venue || '',
      },
    })
    if (error) console.warn('Confirmation email failed:', error.message)
  } catch (err) {
    console.warn('Confirmation email failed:', err)
  }
}

// Submits a registration to Supabase. When the backend isn't configured yet we
// resolve successfully so the form UX is complete in dev/fallback mode.
// `event` carries the meta (title/date/time/venue) used for the confirmation email.
export async function submitRegistration(event, fields, values, user) {
  const data = buildData(fields, values)
  const recipient =
    user?.email ?? data['Email Address'] ?? data['Leader Email Address'] ?? null
  const greetName =
    data['Full Name'] || data['Team Leader Name'] || data['Team Name'] || 'there'

  if (!supabase) {
    await new Promise((r) => setTimeout(r, 1100)) // simulate network
    return { ok: true, simulated: true }
  }

  const row = {
    event_id: event.id,
    event_title: event.title,
    user_id: user?.id ?? null,
    user_email: recipient,
    data,
  }

  const { error } = await supabase.from('registrations').insert(row)
  if (error) throw error

  // Fire-and-forget the welcome email — don't block the success screen on it.
  sendConfirmationEmail({ to: recipient, name: greetName, event })

  return { ok: true, simulated: false }
}
