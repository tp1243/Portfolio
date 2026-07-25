import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BrainCircuit, Braces, Code2, Database, DatabaseZap, ExternalLink, Info, MoonStar, ShieldCheck, Sparkles, SunMoon } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import { SiDotnet, SiExpress, SiMarkdown, SiMongodb, SiNodedotjs, SiReact, SiTypescript } from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'

const techTagMeta = {
  'React.js': { icon: SiReact, color: '#61dafb' },
  TypeScript: { icon: SiTypescript, color: '#3178c6' },
  'Node.js': { icon: SiNodedotjs, color: '#5fa04e' },
  'Express.js': { icon: SiExpress, color: '#d4d4d8' },
  MongoDB: { icon: SiMongodb, color: '#47a248' },
  'Socket.IO': { icon: ExternalLink, color: '#f8fafc' },
  JWT: { icon: ShieldCheck, color: '#38bdf8' },
  OAuth: { icon: ShieldCheck, color: '#8b5cf6' },
  'ASP.NET Core MVC': { icon: SiDotnet, color: '#8b5cf6' },
  'Entity Framework Core': { icon: DatabaseZap, color: '#4ade80' },
  'SQL Server': { icon: Database, color: '#60a5fa' },
  'REST API': { icon: Braces, color: '#f59e0b' },
  LINQ: { icon: Code2, color: '#f97316' },
  'C#': { icon: TbBrandCSharp, color: '#9333ea' },
  'Hugging Face': { icon: Sparkles, color: '#fbbf24' },
  'AI/NLP': { icon: BrainCircuit, color: '#38bdf8' },
  Markdown: { icon: SiMarkdown, color: '#f8fafc' },
  'Syntax Highlighting': { icon: Code2, color: '#22d3ee' },
  Auth: { icon: ShieldCheck, color: '#4ade80' },
  'Dark/Light Mode': { icon: SunMoon, color: '#fbbf24' },
}

export function ProjectCard({
  title,
  image,
  summary,
  techStack,
  githubLink,
  accent,
  glow,
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [canHover, setCanHover] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')

    const syncMode = () => {
      setCanHover(mediaQuery.matches)
      if (mediaQuery.matches) {
        setIsFlipped(false)
      }
    }

    syncMode()
    mediaQuery.addEventListener?.('change', syncMode)

    return () => {
      mediaQuery.removeEventListener?.('change', syncMode)
    }
  }, [])

  const hasGithubLink = githubLink && githubLink !== '#'

  const tagItems = useMemo(
    () =>
      techStack.map((tag) => {
        const meta = techTagMeta[tag] ?? { icon: MoonStar, color: accent }
        return { tag, ...meta }
      }),
    [accent, techStack],
  )

  const handleFlipToggle = (event) => {
    if (canHover) {
      return
    }

    const interactiveTarget = event.target.closest('a, button[data-no-flip="true"]')
    if (interactiveTarget) {
      return
    }

    setIsFlipped((current) => !current)
  }

  return (
    <motion.div
      onMouseEnter={() => canHover && setIsFlipped(true)}
      onMouseLeave={() => canHover && setIsFlipped(false)}
      onClick={handleFlipToggle}
      animate={{
        scale: isFlipped ? 1.02 : 1,
        y: isFlipped ? -4 : 0,
      }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="relative h-[34rem] [perspective:1100px] sm:h-[35rem]"
    >
      <motion.article
        className="group relative h-full rounded-[1.75rem] border shadow-[0_24px_65px_rgba(2,6,23,0.24)] backdrop-blur-2xl"
        style={{
          borderColor: `${accent}30`,
          boxShadow: isFlipped
            ? `0 28px 72px rgba(2, 6, 23, 0.3), 0 0 36px ${accent}22, 0 0 0 1px ${accent}1f inset`
            : `0 24px 65px rgba(2, 6, 23, 0.24), 0 0 20px ${accent}14, 0 0 0 1px ${accent}18 inset`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-28 rounded-full blur-3xl transition duration-300"
          style={{ background: glow }}
        />

        {!canHover ? (
          <button
            type="button"
            data-no-flip="true"
            onClick={() => setIsFlipped((current) => !current)}
            aria-label={isFlipped ? `Flip ${title} card back` : `Flip ${title} card`}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-slate-950/70 text-cyan-100 shadow-[0_14px_28px_rgba(2,6,23,0.28)] backdrop-blur-xl"
          >
            <Info size={16} />
          </button>
        ) : null}

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative h-full w-full rounded-[1.75rem]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div
            className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,_rgba(15,23,42,0.94),_rgba(15,23,42,0.68))]"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-[1.75rem]">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="relative flex flex-1 flex-col gap-5 p-6">
              <div className="space-y-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-zinc-400">
                  Featured Project
                </p>
                <h3 className="font-display text-2xl leading-tight text-white">
                  {title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tagItems.map(({ tag, icon: TagIcon, color }) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 text-xs font-medium text-zinc-100 backdrop-blur-xl"
                  >
                    <TagIcon size={14} style={{ color }} />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  Repository
                </span>

                <motion.a
                  href={hasGithubLink ? githubLink : '#'}
                  target={hasGithubLink ? '_blank' : undefined}
                  rel={hasGithubLink ? 'noreferrer' : undefined}
                  aria-label={`${title} GitHub repository`}
                  whileHover={hasGithubLink ? { scale: 1.12, y: -2 } : undefined}
                  whileTap={hasGithubLink ? { scale: 0.96 } : undefined}
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white shadow-[0_16px_36px_rgba(2,6,23,0.24)] backdrop-blur-xl transition duration-300 ${
                    hasGithubLink ? '' : 'cursor-not-allowed opacity-45'
                  }`}
                  style={{
                    boxShadow: hasGithubLink
                      ? `0 0 0 rgba(0,0,0,0), 0 16px 36px rgba(2, 6, 23, 0.24), 0 0 18px ${accent}22`
                      : `0 16px 36px rgba(2, 6, 23, 0.18)`,
                  }}
                  onClick={(event) => {
                    if (!hasGithubLink) {
                      event.preventDefault()
                    }
                  }}
                >
                  <FaGithub size={20} />
                </motion.a>
              </div>
            </div>
          </div>

          <div
            className="absolute inset-0 flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[linear-gradient(180deg,_rgba(15,23,42,0.98),_rgba(10,14,28,0.9))] p-6"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              borderColor: `${accent}28`,
              boxShadow: `inset 0 0 0 1px ${accent}16`,
            }}
          >
            <div className="space-y-2">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-zinc-500">
                Project Details
              </p>
              <h3 className="font-display text-xl leading-tight text-zinc-100">
                {title}
              </h3>
            </div>

            <div
              className="thin-scrollbar mt-5 flex-1 overflow-y-auto pr-2 text-sm leading-6 text-zinc-300"
              style={{ scrollbarWidth: 'thin', scrollbarColor: `${accent} transparent` }}
            >
              <ul className="space-y-3">
                {summary.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/8 pt-4">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                Repository
              </span>

              <motion.a
                href={hasGithubLink ? githubLink : '#'}
                target={hasGithubLink ? '_blank' : undefined}
                rel={hasGithubLink ? 'noreferrer' : undefined}
                aria-label={`${title} GitHub repository`}
                whileHover={hasGithubLink ? { scale: 1.12, y: -2 } : undefined}
                whileTap={hasGithubLink ? { scale: 0.96 } : undefined}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white shadow-[0_16px_36px_rgba(2,6,23,0.24)] backdrop-blur-xl transition duration-300 ${
                  hasGithubLink ? '' : 'cursor-not-allowed opacity-45'
                }`}
                style={{
                  boxShadow: hasGithubLink
                    ? `0 0 0 rgba(0,0,0,0), 0 16px 36px rgba(2, 6, 23, 0.24), 0 0 18px ${accent}22`
                    : `0 16px 36px rgba(2, 6, 23, 0.18)`,
                }}
                onClick={(event) => {
                  if (!hasGithubLink) {
                    event.preventDefault()
                  }
                }}
              >
                <FaGithub size={20} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.article>
    </motion.div>
  )
}
