import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experienceItems } from '../data/experience'
import { ExperienceCard } from './ExperienceCard'

const LazyExperienceScene = lazy(() => import('./ExperienceScene'))

gsap.registerPlugin(ScrollTrigger)

function ExperienceSceneFallback() {
  return (
    <div className="relative h-[21rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(15,23,42,0.82),_rgba(15,23,42,0.56))] shadow-[0_24px_60px_rgba(2,6,23,0.22)] backdrop-blur-2xl sm:h-[25rem] lg:h-[29rem]">
      <div className="pointer-events-none absolute inset-x-10 top-10 h-24 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-8 bottom-8 h-20 rounded-full bg-emerald-300/10 blur-3xl" />
      <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_40%_35%,_rgba(34,211,238,0.08),_transparent_24%),radial-gradient(circle_at_68%_62%,_rgba(74,222,128,0.08),_transparent_18%)]" />
    </div>
  )
}

export function ExperienceSection() {
  const sectionRef = useRef(null)
  const [sceneMounted, setSceneMounted] = useState(false)
  const [sceneActive, setSceneActive] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSceneActive(entry.isIntersecting)
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => setSceneMounted(true),
      })

      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-experience-reveal]'),
        { y: 34, opacity: 0 },
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
        sectionRef.current.querySelector('[data-experience-scene]'),
        { y: 34, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      )

      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-experience-card]'),
        { x: 42, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
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
        <div className="pointer-events-none absolute right-[10%] top-32 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 lg:p-14">
          <div className="space-y-8">
            <div className="space-y-3 text-center">
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
                className="mx-auto h-1.5 w-28 rounded-full bg-[linear-gradient(90deg,_rgba(34,211,238,0.85),_rgba(74,222,128,0.6),_rgba(34,211,238,0.12))]"
              />
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
              <div data-experience-scene className="relative">
                <Suspense fallback={<ExperienceSceneFallback />}>
                  {sceneMounted ? (
                    <LazyExperienceScene active={sceneActive} />
                  ) : (
                    <ExperienceSceneFallback />
                  )}
                </Suspense>
              </div>

              <div className="flex items-center">
                <div className="w-full space-y-5">
                  {experienceItems.map((item) => (
                    <div key={item.id} data-experience-card className="w-full">
                      <ExperienceCard {...item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
