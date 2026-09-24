import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../lib/auth'

const links = [
  { label: 'About', to: '/#about' },
  { label: 'Events', to: '/#events' },
  { label: 'Schedule', to: '/#schedule' },
  { label: 'Speakers', to: '/#panelists' },
  { label: 'Sponsors', to: '/#sponsors' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const nav = useNavigate()
  const loc = useLocation()
  const { user, isAdmin, configured, signInWithGoogle, signOut } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (hash) => {
    setOpen(false)
    if (loc.pathname !== '/') {
      nav('/' + hash)
    } else {
      const el = document.querySelector(hash.replace('/', ''))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const BROCHURE_URL = '/E-Summit-2026-Brochure.pdf'
  const getBrochure = () => {
    setOpen(false)
    // Trigger a download
    const a = document.createElement('a')
    a.href = BROCHURE_URL
    a.download = 'E-Summit-2026-Brochure.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    // Open/redirect to the PDF in a new tab
    window.open(BROCHURE_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 glass-strong' : 'py-3 bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 flex items-center justify-between gap-3">
        {/* DCRUST — top left */}
        <a
          href="https://www.dcrustm.ac.in"
          target="_blank"
          rel="noreferrer"
          className={`logo-chip shrink-0 flex items-center transition-all duration-300 ${
            scrolled ? 'p-1.5' : 'p-2'
          }`}
          title="Deenbandhu Chhotu Ram University of Science & Technology"
        >
          <img
            src="/dcrust-logo.png"
            alt="DCRUST"
            className={`object-contain transition-all duration-300 ${
              scrolled ? 'h-12 w-12 sm:h-14 sm:w-14' : 'h-14 w-14 sm:h-[68px] sm:w-[68px]'
            }`}
          />
        </a>

        {/* Center — university name */}
        <button
          onClick={() => go('/#top')}
          className="flex-1 min-w-0 px-2 flex items-center justify-center"
          aria-label="Home"
        >
          <span className="hidden sm:block text-center font-display font-semibold uppercase leading-tight tracking-[0.12em] text-[10px] md:text-[11px] lg:text-xs text-white/85 max-w-[26rem]">
            Deenbandhu Chhotu Ram University of<br className="hidden md:block" /> Science and Technology, Murthal
          </span>
        </button>

        {/* Desktop links + E-Cell chip */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-6 mr-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.to)}
                className="text-sm text-white/70 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-gold to-champagne" />
              </button>
            ))}
            <Link
              to="/attend"
              className="text-sm text-white/70 hover:text-white transition-colors relative group"
            >
              Attend
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-cyan to-royal" />
            </Link>
            <button
              onClick={getBrochure}
              className="text-sm font-semibold px-4 py-1.5 rounded-full bg-gradient-to-r from-gold to-champagne text-black hover:opacity-90 transition-opacity"
            >
              Brochure
            </button>
            {configured && user && (
              <Link to="/me" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">My Registrations</Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-sm font-semibold grad-text">Admin</Link>
            )}
            {configured && (user ? (
              <button onClick={signOut} className="text-sm text-white/60 hover:text-white transition-colors">Sign out</button>
            ) : (
              <button onClick={signInWithGoogle} className="text-sm text-white/70 hover:text-white transition-colors">Sign in</button>
            ))}
          </div>

          {/* E-Cell — top right */}
          <a
            href="https://www.dcrustm.ac.in"
            target="_blank"
            rel="noreferrer"
            className={`logo-chip shrink-0 flex items-center transition-all duration-300 ${
              scrolled ? 'px-2.5 py-1.5' : 'px-3 py-2'
            }`}
            title="E-Cell DCRUST"
          >
            <img
              src="/ecell-logo.png"
              alt="E-Cell DCRUST"
              className={`w-auto object-contain transition-all duration-300 ${
                scrolled ? 'h-11 sm:h-12' : 'h-12 sm:h-[60px]'
              }`}
            />
          </a>

          <button
            className="md:hidden p-2 text-white/80"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="md:hidden overflow-hidden mx-4 mt-2 glass-strong rounded-2xl"
        >
          <div className="flex flex-col p-2">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.to)}
                className="text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/5"
              >
                {l.label}
              </button>
            ))}
            <button onClick={() => { setOpen(false); nav('/attend') }} className="text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/5">Attend (no sign-in)</button>
            <button onClick={getBrochure} className="text-left px-4 py-3 rounded-xl font-semibold grad-text">Brochure</button>
            {configured && user && (
              <button onClick={() => { setOpen(false); nav('/me') }} className="text-left px-4 py-3 rounded-xl font-semibold text-white/85 hover:bg-white/5">My Registrations</button>
            )}
            {isAdmin && (
              <button onClick={() => { setOpen(false); nav('/admin') }} className="text-left px-4 py-3 rounded-xl font-semibold grad-text">Admin</button>
            )}
            {configured && (user ? (
              <button onClick={() => { setOpen(false); signOut() }} className="text-left px-4 py-3 rounded-xl text-white/70 hover:bg-white/5">Sign out</button>
            ) : (
              <button onClick={() => { setOpen(false); signInWithGoogle() }} className="text-left px-4 py-3 rounded-xl text-white/80 hover:bg-white/5">Sign in</button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
