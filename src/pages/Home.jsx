import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Events from '../components/Events'
import Timeline from '../components/Timeline'
import Panelists from '../components/Panelists'
import Sponsors from '../components/Sponsors'
import Footer from '../components/Footer'

export default function Home() {
  const loc = useLocation()

  useEffect(() => {
    // Only treat clean anchors like #about / #events as scroll targets.
    // (An OAuth redirect can leave a token fragment in the hash — ignore it.)
    if (/^#[\w-]+$/.test(loc.hash)) {
      const el = document.querySelector(loc.hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    }
  }, [loc.hash])

  return (
    <>
      <Hero />
      <About />
      <Events />
      <Timeline />
      <Panelists />
      <Sponsors />
      <Footer />
    </>
  )
}
