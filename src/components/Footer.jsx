import Wordmark from './Wordmark'
import { SUMMIT } from '../data/events'
import { CONTACT } from '../config'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 pt-14 pb-8 overflow-hidden">
      <div className="blob w-[420px] h-[300px] bg-royal/15 left-1/4 -bottom-20" />
      <div className="mx-auto max-w-7xl px-4 relative">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Wordmark size={44} />
            <p className="mt-4 text-sm text-white/55 max-w-xs">
              {SUMMIT.theme}. A national entrepreneurship summit by {SUMMIT.organisers}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="logo-chip p-1.5">
                <img src="/dcrust-logo.png" alt="DCRUST" className="h-9 w-9 object-contain" />
              </span>
              <span className="logo-chip px-2.5 py-1.5">
                <img src="/ecell-logo.png" alt="E-Cell DCRUST" className="h-8 w-auto object-contain" />
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Event</h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>{SUMMIT.dates}</li>
              <li>{SUMMIT.campus}</li>
              <li>
                Venue ·{' '}
                <a
                  href={CONTACT.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white underline decoration-white/30 underline-offset-2 transition-colors"
                  title="Open in Google Maps"
                >
                  DCRUST MURTHAL CAMPUS
                </a>
              </li>
              <li>{SUMMIT.registration}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Connect</h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="hover:text-white transition-colors">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white/90">Query</h4>
            <ul className="space-y-2 text-sm text-white/55">
              <li>
                Akshat ·{' '}
                <a href="tel:+918950956591" className="hover:text-white transition-colors">
                  8950956591
                </a>
              </li>
              <li>
                Ayush Dahiya ·{' '}
                <a href="tel:+917988141633" className="hover:text-white transition-colors">
                  7988141633
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© 2026 E-Cell DCRUST · Deenbandhu Chhotu Ram University of Science & Technology, Murthal</p>
          <p>Entrepreneurs for Viksit Bharat</p>
        </div>

        <p className="mt-4 text-center text-xs text-white/40">Made by Akshat</p>
      </div>
    </footer>
  )
}
