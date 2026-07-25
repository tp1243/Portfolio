import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skillCategories } from '../data/skills'
import { SkillCard } from './SkillCard'

gsap.registerPlugin(ScrollTrigger)

export function SkillsSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-skills-reveal]'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 74%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-[10%] top-20 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[8%] top-32 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-[65%] h-40 w-40 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 lg:p-14">
          <div className="space-y-8">
            <div data-skills-reveal className="space-y-3">
              <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-cyan-200/80">
                Skills
              </span>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Tooling I use across frontend, backend, and data work
              </h2>
              <p className="max-w-3xl text-base leading-8 text-zinc-300">
                Three focused skill cards, each with animated technology chips that stay grounded in place while adding a little motion and depth.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {skillCategories.map((category) => (
                <div key={category.id} data-skills-reveal className="relative">
                  <SkillCard {...category} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
