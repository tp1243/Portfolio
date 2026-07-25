import { motion } from 'framer-motion'

export function SocialLinks({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {items.map(({ label, href, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          aria-label={label}
          whileHover={{ y: -3, scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/6 text-zinc-100 shadow-[0_18px_40px_rgba(1,8,20,0.18)] backdrop-blur-xl transition duration-300 hover:border-cyan-300/40 hover:text-cyan-200"
        >
          <Icon size={18} />
        </motion.a>
      ))}
    </div>
  )
}
