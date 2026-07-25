import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedCursor } from './components/common/AnimatedCursor'
import { Preloader } from './components/common/Preloader'
import { SkillsSection } from './components/SkillsSection'
import { Navbar } from './components/layout/Navbar'
import { navItems, upcomingSections } from './data/site'
import { useLenis } from './hooks/useLenis'
import { useTheme } from './hooks/useTheme'
import { About } from './sections/About'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { SectionPlaceholder } from './sections/SectionPlaceholder'
import { applySeo } from './utils/seo'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'


function App() {
  const [sceneReady, setSceneReady] = useState(false)
  const { theme, mounted, toggleTheme } = useTheme()

  useLenis()

  useEffect(() => {
    applySeo({
      title: 'Sambhaji Patil | Creative Developer Portfolio',
      description:
        'A modern motion-led developer portfolio built with React, Tailwind CSS, Framer Motion, GSAP, and React Three Fiber.',
    })
  }, [])

  return (
    <React.Fragment>
      <Preloader ready={sceneReady && mounted} />
      <AnimatedCursor />
      <Navbar items={navItems} theme={theme} onToggleTheme={toggleTheme} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative overflow-x-hidden"
      >
        <Hero onSceneReady={() => setSceneReady(true)} />
        <About />
        <SkillsSection />
        <Projects />
        <Experience />
        <ContactSection />
        {upcomingSections
          .filter(
            (section) => !['about', 'skills', 'projects', 'experience', 'contact'].includes(section.id),
          )
          .map((section) => (
            <SectionPlaceholder key={section.id} {...section} />
          ))}
      </motion.main>
        <Footer />
    </React.Fragment>
  )
}

export default App
