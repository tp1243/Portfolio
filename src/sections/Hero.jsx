import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProfileOrbit } from '../components/ProfileOrbit'
import { GlassButton } from '../components/ui/GlassButton'
import { SocialLinks } from '../components/ui/SocialLinks'
import { heroContent, socialLinks } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

export function Hero({ onSceneReady }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % heroContent.roles.length)
    }, 2200)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        },
      )

      gsap.fromTo(
        sectionRef.current.querySelector('.hero-orb'),
        { scale: 0.8, opacity: 0.3 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const activeRole = useMemo(
    () => heroContent.roles[roleIndex],
    [roleIndex],
  )

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10 lg:pt-36"
    >
      <div className="hero-orb absolute right-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.18),_transparent_62%)] blur-3xl" />
      <div className="hero-orb absolute left-[-8rem] top-60 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.14),_transparent_60%)] blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100svh-9rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div
          ref={contentRef}
          className="relative z-10 flex flex-col items-start gap-6 text-left"
        >
          <span className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-cyan-200/90 backdrop-blur-xl">
            {heroContent.eyebrow}
          </span>

          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.36em] text-zinc-400">
              Available for product, brand, and portfolio builds
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-none text-white sm:text-6xl lg:text-7xl">
              {heroContent.name}
            </h1>
            <div className="flex min-h-10 items-center overflow-hidden text-lg text-cyan-200 sm:text-xl">
              <motion.span
                key={activeRole}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="font-medium"
              >
                {activeRole}
              </motion.span>
            </div>
          </div>

          <p className="max-w-2xl text-base leading-8 text-zinc-300 sm:text-lg">
            {heroContent.summary}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <GlassButton
              href={heroContent.primaryCta.href}
              icon={heroContent.primaryCta.icon}
              download={heroContent.primaryCta.download}
            >
              {heroContent.primaryCta.label}
            </GlassButton>
            <GlassButton
              href={heroContent.secondaryCta.href}
              icon={heroContent.secondaryCta.icon}
              variant="secondary"
            >
              {heroContent.secondaryCta.label}
            </GlassButton>
          </div>

          <SocialLinks items={socialLinks} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          className="relative"
        >
          <ProfileOrbit onReady={onSceneReady} />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mx-auto mt-8 flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-zinc-400"
      >
        <span>Scroll</span>
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-cyan-200">
          <ChevronDown size={16} />
        </span>
      </motion.a>
    </section>
  )
}
