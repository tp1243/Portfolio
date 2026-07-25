import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experienceItems } from '../data/experience'
import { ExperienceCard } from './ExperienceCard'
import { ExperienceScene } from './ExperienceScene'

gsap.registerPlugin(ScrollTrigger)

export function ExperienceTimeline() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      const sceneEl = sectionRef.current.querySelector('[data-experience-scene]')
      const cards = sectionRef.current.querySelectorAll('[data-timeline-card]')
      const heading = sectionRef.current.querySelectorAll('[data-experience-reveal]')

      gsap.fromTo(
        heading,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
          },
        },
      )

      gsap.fromTo(
        sceneEl,
        { x: -48, opacity: 0, scale: 0.92 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
          },
        },
      )

      gsap.fromTo(
        cards,
        { x: 48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 64%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-[10%] top-20 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[10%] top-40 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 lg:p-14">
          <div className="space-y-10">
            <div className="space-y-3">
              <span
                data-experience-reveal
                className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-cyan-200/80"
              >
                Experience
              </span>
              <h2
                data-experience-reveal
                className="font-display text-3xl text-white sm:text-4xl"
              >
                Work experience and delivery impact
              </h2>
              <div
                data-experience-reveal
                className="h-1.5 w-28 rounded-full bg-[linear-gradient(90deg,_rgba(34,211,238,0.85),_rgba(74,222,128,0.6),_rgba(34,211,238,0.12))]"
              />
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div data-experience-scene className="order-2 lg:order-1">
                <ExperienceScene />
              </div>

              <div className="order-1 flex flex-col justify-center gap-5 lg:order-2">
                {experienceItems.map((item) => (
                  <div key={item.id} data-timeline-card>
                    <ExperienceCard {...item} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}