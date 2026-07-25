import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, Sparkles } from 'lucide-react'
import { MobileMenu } from './MobileMenu'
import { useActiveSection } from '../../hooks/useActiveSection'

export function Navbar({ items, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(items.map((item) => item.id))

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    const section = document.getElementById(id)

    if (!section) {
      return
    }

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }


  return (
    <>
      <motion.header
        animate={{
          paddingTop: scrolled ? 12 : 24,
        }}
        className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-[92rem] px-4 sm:px-6"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 shadow-[0_18px_50px_rgba(2,6,23,0.2)] backdrop-blur-2xl transition duration-300 sm:px-6 ${
            scrolled
              ? 'border-white/10 bg-slate-950/72'
              : 'border-white/12 bg-slate-950/55'
          }`}
        >
          <a
            href="#home"
            className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-white"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/35 bg-cyan-300/10 text-cyan-100">
              <Sparkles size={16} />
            </span>
            <span className="hidden sm:inline">Tushar Patil</span>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] transition ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {activeSection === item.id ? (
                  <motion.span
                    layoutId="active-link"
                    className="absolute inset-0 rounded-full border border-cyan-300/30 bg-cyan-300/12"
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex" />

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        open={menuOpen}
        items={items}
        activeSection={activeSection}
        onClose={() => setMenuOpen(false)}
        onSelect={handleNavClick}
      />
    </>
  )
}
