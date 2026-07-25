import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin } from 'lucide-react'
import { educationItems } from '../data/site'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    if (!sectionRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('[data-about-reveal]'),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
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

  const handleCardMove = (index, event) => {
    const card = cardRefs.current[index]

    if (!card) {
      return
    }

    const bounds = card.getBoundingClientRect()
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5

    gsap.to(card, {
      rotationY: offsetX * 12,
      rotationX: -offsetY * 10,
      y: -6,
      scale: 1.02,
      duration: 0.35,
      ease: 'power3.out',
      transformPerspective: 1400,
      transformOrigin: 'center',
    })
  }

  const handleCardLeave = (index) => {
    const card = cardRefs.current[index]

    if (!card) {
      return
    }

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-[12%] top-24 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[10%] top-[22rem] h-40 w-40 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative p-8 sm:p-10 lg:p-14">
          <div className="space-y-8">
            <div data-about-reveal className="space-y-3">
              <span className="inline-flex rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[0.65rem] uppercase tracking-[0.32em] text-cyan-200/80">
                Education
              </span>
              <h3 className="font-display text-3xl text-white sm:text-4xl">
                Academic journey and qualifications
              </h3>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute left-[15%] right-[15%] top-[10.5rem] hidden h-px bg-[linear-gradient(90deg,_rgba(34,211,238,0),_rgba(34,211,238,0.45),_rgba(251,191,36,0.4),_rgba(34,211,238,0))] lg:block" />

              <div className="grid gap-6 lg:grid-cols-3">
                {educationItems.map((item, index) => (
                  <div
                    key={item.id}
                    data-about-reveal
                    className="relative [perspective:1400px]"
                  >
                    <div
                      ref={(node) => {
                        cardRefs.current[index] = node
                      }}
                      onMouseMove={(event) => handleCardMove(index, event)}
                      onMouseLeave={() => handleCardLeave(index)}
                      className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(15,23,42,0.88),_rgba(15,23,42,0.56))] shadow-[0_24px_65px_rgba(2,6,23,0.24)] transition duration-300 [transform-style:preserve-3d] hover:border-cyan-300/30 hover:shadow-[0_28px_70px_rgba(34,211,238,0.12)]"
                    >
                      <div className="pointer-events-none absolute inset-x-10 top-0 h-20 rounded-full bg-cyan-300/12 blur-3xl transition duration-300 group-hover:bg-cyan-300/20" />
                      <div className="relative h-56 overflow-hidden rounded-t-[1.75rem]">
                        <img
                          src={item.image}
                          alt={item.institution}
                          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="space-y-5 p-6">
                        <div className="flex items-start justify-between gap-4">
                          <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-cyan-100">
                            {item.label}
                          </span>
                          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-100">
                            {item.scoreLabel}: {item.score}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xl font-semibold leading-8 text-white">
                            {item.institution}
                          </h4>
                          <div className="flex items-start gap-2 text-sm leading-6 text-zinc-400">
                            <MapPin size={16} className="mt-1 shrink-0 text-cyan-200/80" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
