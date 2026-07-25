import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export function SkillIcon({ name, icon: Icon, color, index }) {
  const [hovered, setHovered] = useState(false)

  const animation = useMemo(() => {
    const seed = index + 1

    return {
      floatDistance: 5 + (seed % 4) * 1.2,
      rotateX: 4 + (seed % 3) * 1.4,
      rotateY: 5 + ((seed + 1) % 3) * 1.5,
      duration: 2.5 + (seed % 4) * 0.45,
      delay: (seed % 5) * 0.14,
      shadowScale: 0.88 + (seed % 3) * 0.06,
    }
  }, [index])

  return (
    <div className="relative flex flex-col items-center justify-center pt-1">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1 h-3 w-11 rounded-full bg-slate-950/45 blur-md"
        animate={
          hovered
            ? { scale: 1.18, opacity: 0.4 }
            : {
                scale: [animation.shadowScale, animation.shadowScale + 0.12, animation.shadowScale],
                opacity: [0.18, 0.3, 0.18],
              }
        }
        transition={{
          duration: hovered ? 0.2 : animation.duration,
          delay: hovered ? 0 : animation.delay,
          ease: 'easeInOut',
          repeat: hovered ? 0 : Infinity,
        }}
      />

      <motion.button
        type="button"
        aria-label={name}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          scale: 1.15,
          transition: { duration: 0.18, ease: 'easeOut' },
        }}
        animate={
          hovered
            ? {
                y: -4,
                rotateX: 0,
                rotateY: 0,
              }
            : {
                y: [0, -animation.floatDistance, 0],
                rotateX: [0, animation.rotateX, 0, -animation.rotateX, 0],
                rotateY: [0, -animation.rotateY, 0, animation.rotateY, 0],
              }
        }
        transition={{
          duration: hovered ? 0.22 : animation.duration,
          delay: hovered ? 0 : animation.delay,
          ease: 'easeInOut',
          repeat: hovered ? 0 : Infinity,
        }}
        className="relative flex h-16 w-16 transform-gpu items-center justify-center rounded-full border border-white/14 bg-white/10 text-white shadow-[0_14px_30px_rgba(2,6,23,0.24)] backdrop-blur-2xl will-change-transform sm:h-[4.5rem] sm:w-[4.5rem]"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: hovered
            ? `0 0 30px ${color}55, 0 16px 32px rgba(2, 6, 23, 0.3)`
            : `0 14px 30px rgba(2, 6, 23, 0.24)`,
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-1 rounded-full border border-white/10"
        />
        <Icon
          className="relative text-[1.65rem] sm:text-[1.85rem]"
          style={{ color, transform: 'translateZ(18px)' }}
        />
      </motion.button>

      <motion.span
        initial={false}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 6,
          scale: hovered ? 1 : 0.96,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/12 bg-slate-950/92 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_24px_rgba(2,6,23,0.24)]"
      >
        {name}
      </motion.span>
    </div>
  )
}
