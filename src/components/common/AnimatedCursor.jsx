import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [enabled] = useState(
    typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  useEffect(() => {
    if (!enabled) {
      return undefined
    }

    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
      setVisible(true)
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseout', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseout', handleLeave)
    }
  }, [enabled])

  if (!enabled) {
    return null
  }

  return (
    <motion.div
      animate={{
        x: position.x - 14,
        y: position.y - 14,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.75,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.18 }}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-7 w-7 rounded-full border border-cyan-300/60 bg-cyan-200/10 mix-blend-screen shadow-[0_0_28px_rgba(34,211,238,0.3)] md:block"
    />
  )
}
