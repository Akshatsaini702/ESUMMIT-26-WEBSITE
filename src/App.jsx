import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import NeonBackground from './components/NeonBackground'
import FloatingShapes from './components/FloatingShapes'
import IntroGate from './components/IntroGate'
import RouteLoader from './components/RouteLoader'
import Home from './pages/Home'
import EventDetail from './pages/EventDetail'
import AdminDashboard from './pages/AdminDashboard'
import AttendeeRegister from './pages/AttendeeRegister'
import MyRegistrations from './pages/MyRegistrations'
import NotFound from './pages/NotFound'

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export default function App() {
  const [booting, setBooting] = useState(true)
  const [routeLoading, setRouteLoading] = useState(false)
  const loc = useLocation()
  const firstRender = useRef(true)

  // Don't let the browser restore the previous scroll position on reload,
  // and always start at the very top on first load.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (!loc.hash) window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Keep the top in view once the intro loader finishes.
  useEffect(() => {
    if (!booting && !loc.hash) window.scrollTo(0, 0)
  }, [booting, loc.hash])

  // Lock page scroll while the intro loader is showing.
  useEffect(() => {
    document.body.style.overflow = booting ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [booting])

  // Scroll to top on path change (not on hash-only changes)
  useEffect(() => {
    if (!loc.hash) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [loc.pathname])

  // Show the branded route loader when navigating INTO an event page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (loc.pathname.startsWith('/event/')) {
      setRouteLoading(true)
      const t = setTimeout(() => setRouteLoading(false), 900)
      return () => clearTimeout(t)
    }
  }, [loc.pathname])

  return (
    <>
      <NeonBackground />
      <FloatingShapes />
      <AnimatePresence>{booting && <IntroGate key="intro" onEnter={() => setBooting(false)} />}</AnimatePresence>
      <AnimatePresence>
        {routeLoading && <RouteLoader key="route" label="Preparing registration" />}
      </AnimatePresence>

      <Navbar />

      <main>
        <AnimatePresence mode="wait">
          <Routes location={loc} key={loc.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/event/:id" element={<Page><EventDetail /></Page>} />
            <Route path="/attend" element={<Page><AttendeeRegister /></Page>} />
            <Route path="/me" element={<Page><MyRegistrations /></Page>} />
            <Route path="/admin" element={<Page><AdminDashboard /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
      </main>
    </>
  )
}
