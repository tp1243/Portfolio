import { motion } from 'framer-motion'
import { CheckCheck, Github, MapPinned } from 'lucide-react'
import { SiExpress, SiFirebase, SiMongodb, SiNodedotjs, SiReact } from 'react-icons/si'

const techTagMeta = {
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  'Express.js': { icon: SiExpress, color: '#d4d4d8' },
  'React.js': { icon: SiReact, color: '#61dafb' },
  'Node.js': { icon: SiNodedotjs, color: '#5fa04e' },
  Firebase: { icon: SiFirebase, color: '#ffca28' },
}

export function ExperienceCard({
  company,
  role,
  type,
  duration,
  techStack,
  description,
  githubLink,
  accent,
  glow,
}) {
  return (
    <motion.article
      whileHover={{
        y: -5,
        scale: 1.005,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="group relative overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(180deg,_rgba(15,23,42,0.92),_rgba(15,23,42,0.64))] p-5 shadow-[0_24px_60px_rgba(2,6,23,0.24)] backdrop-blur-2xl sm:p-6"
      style={{
        borderColor: `${accent}33`,
        boxShadow: `0 24px 60px rgba(2, 6, 23, 0.24), 0 0 24px ${accent}16, 0 0 0 1px ${accent}18 inset`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full blur-3xl transition duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative flex h-full flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-1.5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-zinc-400">
              Corporate Experience
            </p>
            <div className="space-y-1">
              <h3 className="font-display text-[1.75rem] leading-tight text-white sm:text-[1.9rem]">
                {company}
              </h3>
              <p className="text-sm font-medium text-cyan-100 sm:text-[0.95rem]">
                {role}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:max-w-[16rem] lg:justify-end">
            <span className="inline-flex rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur-xl">
              {duration}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-100 backdrop-blur-xl">
              <MapPinned size={14} style={{ color: accent }} />
              <span>{type}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tag) => {
            const meta = techTagMeta[tag]
            const TagIcon = meta.icon

            return (
              <span
                key={tag}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-[0.72rem] font-medium text-zinc-100 backdrop-blur-xl"
              >
                <TagIcon size={14} style={{ color: meta.color }} />
                <span>{tag}</span>
              </span>
            )
          })}
        </div>

        <ul className="space-y-2.5 text-sm leading-5.5 text-zinc-300">
          {description.map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                className="mt-0.5 inline-flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/8 backdrop-blur-xl"
                style={{ color: accent }}
              >
                <CheckCheck size={12} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-3">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
            Repository
          </span>

          <div className="group/repo relative">
            <motion.a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              aria-label="View Repository"
              whileHover={{
                scale: 1.12,
                y: -2,
                transition: { duration: 0.18, ease: 'easeOut' },
              }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white shadow-[0_16px_36px_rgba(2,6,23,0.24)] backdrop-blur-xl transition duration-300"
              style={{
                boxShadow: `0 16px 36px rgba(2, 6, 23, 0.24), 0 0 18px ${accent}22`,
              }}
              title="View Repository"
            >
              <Github size={19} />
            </motion.a>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-full border border-white/12 bg-slate-950/92 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white opacity-0 shadow-[0_10px_24px_rgba(2,6,23,0.24)] transition duration-200 group-hover/repo:opacity-100">
              View Repository
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
