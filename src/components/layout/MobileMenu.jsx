import { AnimatePresence, motion } from 'framer-motion'

export function MobileMenu({
  open,
  items,
  activeSection,
  onClose,
  onSelect,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-[min(86vw,22rem)] flex-col gap-6 border-l border-white/10 bg-slate-950/90 px-6 py-24 backdrop-blur-2xl lg:hidden"
          >
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${
                  activeSection === item.id
                    ? 'border-cyan-300/40 bg-cyan-300/12 text-white'
                    : 'border-white/8 bg-white/5 text-zinc-300'
                }`}
              >
                <span className="text-sm uppercase tracking-[0.22em]">
                  {item.label}
                </span>
                <item.icon size={18} />
              </button>
            ))}
            <div className="pt-4" />
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
