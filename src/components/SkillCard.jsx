import { motion } from 'framer-motion'
import { SkillIcon } from './SkillIcon'

export function SkillCard({ title, titleIcon: TitleIcon, accent, glow, items }) {
  return (
    <motion.article
      whileHover={{
        y: -8,
        scale: 1.01,
        transition: { duration: 0.24, ease: 'easeOut' },
      }}
      className="group relative h-full overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(180deg,_rgba(15,23,42,0.9),_rgba(15,23,42,0.58))] p-6 shadow-[0_24px_60px_rgba(2,6,23,0.24)] backdrop-blur-2xl sm:p-7"
      style={{
        borderColor: `${accent}33`,
        boxShadow: `0 24px 60px rgba(2, 6, 23, 0.24), 0 0 0 1px ${accent}18 inset`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full blur-3xl transition duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative flex h-full flex-col gap-6">
        <div className="flex items-center gap-4">
          <div
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-white/10 text-white shadow-[0_12px_28px_rgba(2,6,23,0.22)] backdrop-blur-xl"
            style={{ borderColor: `${accent}33`, color: accent }}
          >
            <TitleIcon size={22} />
          </div>

          <div className="space-y-1">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-400">
              Core Stack
            </p>
            <h3 className="font-display text-2xl text-white">
              {title}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={item.name} className="flex justify-center">
              <SkillIcon {...item} index={index + title.length} />
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
