import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SectionPlaceholder({ id, eyebrow, title, description }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-reveal]'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id={id}
      ref={sectionRef}
      className="px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="space-y-4">
            <span
              data-reveal
              className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-cyan-200/80"
            >
              {eyebrow}
            </span>
            <h2 data-reveal className="font-display text-4xl text-white sm:text-5xl">
              {title}
            </h2>
          </div>

          <div className="space-y-5">
            <p data-reveal className="max-w-2xl text-base leading-8 text-zinc-300">
              {description}
            </p>
            <div
              data-reveal
              className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/8 bg-slate-950/45 p-5"
                >
                  <div className="mb-3 h-2 w-16 rounded-full bg-cyan-300/30" />
                  <div className="space-y-2">
                    <div className="h-5 w-28 rounded-full bg-white/8" />
                    <div className="h-3 w-full rounded-full bg-white/6" />
                    <div className="h-3 w-5/6 rounded-full bg-white/6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
