import { motion } from 'framer-motion'

export function GlassButton({
  href,
  icon: Icon,
  children,
  variant = 'primary',
  className = '',
  download,
}) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.18em] uppercase transition duration-300'

  const variantStyles =
    variant === 'primary'
      ? 'border-cyan-400/40 bg-cyan-400/12 text-white shadow-[0_0_32px_rgba(34,211,238,0.12)] hover:border-cyan-300 hover:bg-cyan-300/20'
      : 'border-white/15 bg-white/6 text-zinc-100 hover:border-amber-300/40 hover:bg-amber-300/10'

  return (
    <motion.a
      href={href}
      download={download}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles} ${className}`.trim()}
    >
      {Icon ? <Icon size={16} /> : null}
      <span>{children}</span>
    </motion.a>
  )
}
