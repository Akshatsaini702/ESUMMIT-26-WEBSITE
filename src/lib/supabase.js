import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_ANON_KEY, isBackendConfigured } from '../config'

// Single shared client. Null until the project keys are set in config.js,
// so the rest of the app can gracefully run in dev/fallback mode.
export const supabase = isBackendConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null
