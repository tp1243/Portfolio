import { AnimatePresence, motion } from 'framer-motion'
import { MoonStar, SunMedium } from 'lucide-react'

export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/8 text-zinc-100 backdrop-blur-xl transition duration-300 hover:border-cyan-300/40"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.22 }}
          className="absolute"
        >
          {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
