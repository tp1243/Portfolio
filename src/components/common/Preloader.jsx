import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function Preloader({ ready }) {
  const [progress, setProgress] = useState(6)
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    if (complete) {
      return undefined
    }

    const interval = window.setInterval(() => {
      setProgress((current) => {
        if (ready) {
          return current >= 100 ? 100 : current + 8
        }

        return current >= 88 ? current : current + 3
      })
    }, 70)

    return () => window.clearInterval(interval)
  }, [complete, ready])

  useEffect(() => {
    if (progress < 100) {
      return undefined
    }

    const timeout = window.setTimeout(() => setComplete(true), 320)
    return () => window.clearTimeout(timeout)
  }, [progress])

  const label = useMemo(
    () => `${String(Math.min(progress, 100)).padStart(2, '0')}%`,
    [progress],
  )

  return (
    <AnimatePresence>
      {!complete ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%),linear-gradient(135deg,_rgba(5,10,24,0.98),_rgba(9,16,32,0.98))]"
        >
          <div className="w-[min(88vw,28rem)] space-y-6 rounded-[2rem] border border-white/10 bg-white/6 p-8 text-left shadow-[0_30px_100px_rgba(1,8,20,0.45)] backdrop-blur-2xl">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/80">
                Preparing scene
              </p>
              <h2 className="font-display text-3xl text-white">Loading portfolio</h2>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,_#67e8f9,_#fbbf24)]"
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-zinc-300">
              <span>Streaming interface systems</span>
              <span>{label}</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
