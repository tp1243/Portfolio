import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ContactInfo } from './ContactInfo'
import { ContactForm } from './ContactForm'

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return undefined

    const ctx = gsap.context(() => {
      const reveals = sectionRef.current.querySelectorAll('[data-contact-reveal]')
      const scene = sectionRef.current.querySelector('[data-contact-scene]')
      const form = sectionRef.current.querySelector('[data-contact-form]')

      gsap.fromTo(
        scene,
        { x: -48, opacity: 0, scale: 0.94 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        },
      )

      gsap.fromTo(
        reveals,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        },
      )

      gsap.fromTo(
        form,
        { x: 48, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(2,6,23,0.16)] backdrop-blur-xl">
        <div className="pointer-events-none absolute left-[8%] top-16 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-[8%] bottom-16 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14">
          <ContactInfo />
          <div className="flex items-start justify-end">
            <div className="w-full max-w-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}