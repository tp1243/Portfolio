import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

export function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-project-reveal]'),
        { y: 42, opacity: 0 },
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
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-[12%] top-28 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[10%] top-24 h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 lg:p-14">
          <div className="space-y-8">
            <div data-project-reveal className="space-y-3">
              <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-cyan-200/80">
                Projects
              </span>
              <h2 className="font-display text-3xl text-white sm:text-4xl">
                Selected builds with full-stack depth and product polish
              </h2>
              <p className="max-w-3xl text-base leading-8 text-zinc-300">
                A responsive flip-card grid with real project data, staggered reveal timing, and two-sided details that stay compact on the front and readable on the back.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} data-project-reveal className="relative">
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
