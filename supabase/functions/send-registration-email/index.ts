// Supabase Edge Function: send-registration-email
// Sends a branded "thank you / welcome" email to a participant right after
// they register for an E-Summit DCRUST'26 event.
//
// Deploy:   supabase functions deploy send-registration-email
// Secrets:  supabase secrets set RESEND_API_KEY=re_xxx  EMAIL_FROM="E-Summit DCRUST'26 <no-reply@yourdomain.com>"
//
// Uses Resend (https://resend.com) as the transactional email provider — a free
// tier covers small events. Any provider with an HTTP API can be swapped in below.

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? "E-Summit DCRUST'26 <onboarding@resend.dev>"
// Replies to the welcome email land in the E-Cell inbox.
const REPLY_TO = Deno.env.get('EMAIL_REPLY_TO') ?? 'ecell.dcrust@gmail.com'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  })

const esc = (s: string) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  )

function emailHtml(opts: {
  name: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventVenue: string
}) {
  const { name, eventTitle, eventDate, eventTime, eventVenue } = opts
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:6px 0;color:#8a8580;font-size:12px;letter-spacing:.08em;text-transform:uppercase;width:120px;vertical-align:top">${esc(label)}</td>
           <td style="padding:6px 0;color:#2b2824;font-size:15px;font-weight:600">${esc(value)}</td>
         </tr>`
      : ''
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f4efe7;font-family:Arial,Helvetica,sans-serif">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4efe7;padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fbf8f2;border:1px solid #e7ded0;border-radius:20px;overflow:hidden">
          <tr>
            <td style="background:linear-gradient(120deg,#1a1712,#2c261c);padding:32px 36px">
              <div style="color:#e8c48a;font-size:13px;letter-spacing:.22em;text-transform:uppercase">E-Summit DCRUST&#39;26</div>
              <div style="color:#fbf8f2;font-size:26px;font-weight:700;margin-top:8px">Welcome aboard 🎉</div>
            </td>
          </tr>
          <tr>
            <td style="padding:32px 36px">
              <p style="color:#2b2824;font-size:16px;line-height:1.6;margin:0 0 18px">
                Hi ${esc(name)},
              </p>
              <p style="color:#4a463f;font-size:15px;line-height:1.7;margin:0 0 24px">
                Thank you for registering — and <strong>welcome to E-Summit DCRUST&#39;26</strong>!
                We&#39;re thrilled to have you with us. Your spot for
                <strong style="color:#2b2824">${esc(eventTitle)}</strong> is confirmed.
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                     style="background:#f4efe7;border:1px solid #e7ded0;border-radius:14px;padding:18px 22px;margin:0 0 24px">
                <tr><td>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    ${row('Event', eventTitle)}
                    ${row('Date', eventDate)}
                    ${row('Time', eventTime)}
                    ${row('Venue', eventVenue)}
                  </table>
                </td></tr>
              </table>
              <p style="color:#4a463f;font-size:15px;line-height:1.7;margin:0 0 8px">
                Keep an eye on this inbox — final venue details and any updates will
                be shared here before the event. See you at DCRUST!
              </p>
              <p style="color:#8a8580;font-size:13px;line-height:1.7;margin:24px 0 0">
                Warm regards,<br/>
                Team E-Cell DCRUST
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 36px;border-top:1px solid #e7ded0;color:#a29b8f;font-size:12px">
              E-Summit DCRUST&#39;26 · DCRUST University Campus, Murthal (Sonepat)
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => ({}))
    const to = String(body.to ?? '').trim()
    const name = String(body.name ?? 'there').trim() || 'there'
    const eventTitle = String(body.eventTitle ?? 'the event').trim()
    const eventDate = String(body.eventDate ?? '').trim()
    const eventTime = String(body.eventTime ?? '').trim()
    const eventVenue = String(body.eventVenue ?? '').trim()

    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return json({ error: 'A valid "to" email is required' }, 400)
    }
    if (!RESEND_API_KEY) {
      return json({ error: 'RESEND_API_KEY is not configured' }, 500)
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [to],
        reply_to: REPLY_TO,
        subject: `You're registered for ${eventTitle} — Welcome to E-Summit DCRUST'26`,
        html: emailHtml({ name, eventTitle, eventDate, eventTime, eventVenue }),
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      return json({ error: 'Email provider rejected the request', detail }, 502)
    }
    return json({ ok: true })
  } catch (err) {
    return json({ error: String(err) }, 500)
  }
})
