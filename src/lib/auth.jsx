import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from './supabase'
import { isBackendConfigured, isAdminEmail } from '../config'

const AuthCtx = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(isBackendConfigured())

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signInWithGoogle = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      // Clean redirect (no existing #hash / query) so Supabase can append and
      // parse its token fragment reliably.
      options: { redirectTo: window.location.origin + window.location.pathname },
    })
  }, [])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  const value = {
    user,
    loading,
    configured: isBackendConfigured(),
    isAdmin: isAdminEmail(user?.email),
    profile: user
      ? {
          email: user.email,
          name: user.user_metadata?.full_name || user.user_metadata?.name || '',
        }
      : null,
    signInWithGoogle,
    signOut,
  }

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)
