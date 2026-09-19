import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="font-display font-extrabold text-7xl grad-text">404</div>
      <p className="text-white/60 mt-3">This page wandered off the summit floor.</p>
      <Link to="/" className="btn-grad rounded-xl px-6 py-3 font-semibold mt-6">Back home</Link>
    </div>
  )
}
