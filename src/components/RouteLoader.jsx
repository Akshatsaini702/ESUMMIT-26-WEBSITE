import { motion } from 'framer-motion'

// Cool overlay shown while navigating INTO a registration / event page.
export default function RouteLoader({ label = 'Preparing registration' }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <div className="relative w-20 h-20">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: '#ff2fa4', borderRightColor: '#a855f7' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-transparent"
          style={{ borderBottomColor: '#ff7a1a', borderLeftColor: '#a855f7' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-[30%] rounded-md"
          style={{ background: 'linear-gradient(135deg,#ff2fa4,#ff7a1a)' }}
          animate={{ rotate: [0, 180, 360], scale: [1, 0.7, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.p
        className="mt-6 text-sm tracking-[0.25em] uppercase text-white/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        {label}
      </motion.p>
    </motion.div>
  )
}
