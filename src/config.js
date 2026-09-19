// ─────────────────────────────────────────────────────────────
//  SUPABASE (database + Google login)
// ─────────────────────────────────────────────────────────────
// Paste these two values from your Supabase project:
//   Supabase dashboard ▸ Project Settings ▸ API
//     • Project URL      → SUPABASE_URL
//     • anon public key  → SUPABASE_ANON_KEY
// Until both are set, the site still runs: forms fall back to a local
// success screen and login is skipped (dev mode).
export const SUPABASE_URL = 'https://smjefrgkdbmcslnsewdc.supabase.co'
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtamVmcmdrZGJtY3NsbnNld2RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NDM3MzIsImV4cCI6MjEwNTIxOTczMn0.scbRLGqh1i1b27C3HJepiuqrGfjx2e5IM_9x0pumt0k'

// Only these emails can open the /admin dashboard. Keep it to yourself.
export const ADMIN_EMAILS = ['pritikalra44@gmail.com', 'akshatsaini702@gmail.com']

export const isBackendConfigured = () => Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
export const isAdminEmail = (email) =>
  !!email && ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase())

export const CONTACT = {
  email: 'ecell.dcrust@gmail.com',
  instagram: 'https://www.instagram.com/ecell.dcrustm',
  linkedin: 'https://www.linkedin.com/in/ecell-dcrustm/',
  maps: 'https://maps.app.goo.gl/cP3mv7qzPTUciJjJ9',
}
