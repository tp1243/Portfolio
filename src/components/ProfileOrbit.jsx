import { Canvas, useFrame } from '@react-three/fiber'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import profilePhoto from '../assets/Profile.jpeg'
import { skillOrbitItems } from '../data/skills'

function OrbitBackdrop() {
  const groupRef = useRef(null)
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        position: [
          (Math.cos((index / 16) * Math.PI * 2) * (1.25 + (index % 3) * 0.55)),
          ((index % 5) - 2) * 0.55,
          (Math.sin((index / 16) * Math.PI * 2) * (1.1 + (index % 4) * 0.35)),
        ],
        scale: 0.04 + (index % 4) * 0.018,
        color: index % 4 === 0 ? '#fbbf24' : '#67e8f9',
      })),
    [],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.08
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.1} />
      <pointLight position={[2.4, 1.8, 2]} intensity={14} color="#67e8f9" />
      <pointLight position={[-2.2, -1.4, 1.6]} intensity={10} color="#fbbf24" />
      <mesh scale={3.1}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#082f49" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 2.2, 0, 0]} scale={[2.3, 2.3, 1]}>
        <torusGeometry args={[1.18, 0.03, 12, 140]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.24} />
      </mesh>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  )
}

export function ProfileOrbit({ onReady }) {
  const sceneRef = useRef(null)
  const orbitGroupRef = useRef(null)
  const photoRef = useRef(null)
  const imageRef = useRef(null)
  const orbitRefs = useRef([])
  const counterRefs = useRef([])
  const floatRefs = useRef([])
  const orbitTweens = useRef([])
  const counterTweens = useRef([])
  const floatTweens = useRef([])
  const readyRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768)
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const orbitSkills = useMemo(() => {
    const visibleSkills = isMobile ? skillOrbitItems.slice(0, 6) : skillOrbitItems
    // Radii increased proportionally to match the larger profile photo
    const radii = isMobile ? [112, 134, 154] : [172, 206, 240, 270]
    const depths = isMobile ? [-10, 14, 0] : [32, -24, 12, 42]

    return visibleSkills.map((skill, index) => ({
      ...skill,
      angle: (360 / visibleSkills.length) * index,
      radius: radii[index % radii.length],
      depth: depths[index % depths.length],
      duration: isMobile ? 17 + (index % 3) * 2.5 : 21 + (index % 4) * 2.2,
      floatDistance: 8 + (index % 3) * 3,
    }))
  }, [isMobile])

  useEffect(() => {
    orbitTweens.current.forEach((tween) => tween.kill())
    counterTweens.current.forEach((tween) => tween.kill())
    floatTweens.current.forEach((tween) => tween.kill())

    orbitTweens.current = orbitSkills.map((skill, index) => {
      const orbitNode = orbitRefs.current[index]
      return orbitNode
        ? gsap.to(orbitNode, {
            rotation: `+=360`,
            duration: skill.duration,
            ease: 'none',
            repeat: -1,
          })
        : null
    })

    counterTweens.current = orbitSkills.map((skill, index) => {
      const counterNode = counterRefs.current[index]
      return counterNode
        ? gsap.to(counterNode, {
            rotation: '-=360',
            duration: skill.duration,
            ease: 'none',
            repeat: -1,
          })
        : null
    })

    floatTweens.current = orbitSkills.map((skill, index) => {
      const floatNode = floatRefs.current[index]
      return floatNode
        ? gsap.to(floatNode, {
            y: index % 2 === 0 ? -skill.floatDistance : skill.floatDistance,
            duration: 2.6 + (index % 3) * 0.45,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        : null
    })

    return () => {
      orbitTweens.current.forEach((tween) => tween?.kill())
      counterTweens.current.forEach((tween) => tween?.kill())
      floatTweens.current.forEach((tween) => tween?.kill())
    }
  }, [orbitSkills])

  useEffect(() => {
    const notifyReady = () => {
      if (readyRef.current) {
        return
      }

      readyRef.current = true
      onReady?.()
    }

    if (imageRef.current?.complete) {
      notifyReady()
      return undefined
    }

    const timeout = window.setTimeout(notifyReady, 500)
    return () => window.clearTimeout(timeout)
  }, [onReady])

  const setOrbitPaused = (paused) => {
    orbitTweens.current.forEach((tween) => paused ? tween?.pause() : tween?.resume())
    counterTweens.current.forEach((tween) => paused ? tween?.pause() : tween?.resume())
  }

  const handlePointerMove = (event) => {
    if (!sceneRef.current || !orbitGroupRef.current || !photoRef.current) {
      return
    }

    const bounds = sceneRef.current.getBoundingClientRect()
    const offsetX = (event.clientX - (bounds.left + bounds.width / 2)) / bounds.width
    const offsetY = (event.clientY - (bounds.top + bounds.height / 2)) / bounds.height

    gsap.to(sceneRef.current, {
      rotationY: offsetX * 12,
      rotationX: -offsetY * 10,
      duration: 0.45,
      ease: 'power3.out',
    })

    gsap.to(orbitGroupRef.current, {
      rotationY: offsetX * 18,
      rotationX: -offsetY * 14,
      x: offsetX * 10,
      y: offsetY * 8,
      duration: 0.55,
      ease: 'power3.out',
    })

    gsap.to(photoRef.current, {
      rotationY: offsetX * 20,
      rotationX: -offsetY * 18,
      x: offsetX * 12,
      y: offsetY * 10,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const handlePointerLeave = () => {
    if (!sceneRef.current || !orbitGroupRef.current || !photoRef.current) {
      return
    }

    gsap.to(sceneRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.7,
      ease: 'power3.out',
    })

    gsap.to(orbitGroupRef.current, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    })

    gsap.to(photoRef.current, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      duration: 0.65,
      ease: 'power3.out',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.9, rotate: -4 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
      className="relative mx-auto flex h-full min-h-[24rem] w-full items-center justify-center overflow-hidden px-2 py-6 sm:min-h-[32rem] sm:px-4"
    >
      <div
        ref={sceneRef}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
        className="relative flex h-[24rem] w-full max-w-[38rem] items-center justify-center [perspective:1600px] [transform-style:preserve-3d] sm:h-[30rem] lg:h-[34rem]"
      >
        <div className="pointer-events-none absolute inset-0">
          <Canvas camera={{ position: [0, 0, 4.8], fov: 40 }} dpr={[1, 1.75]}>
            <OrbitBackdrop />
          </Canvas>
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),_rgba(15,23,42,0)_55%)]" />
        <div className="pointer-events-none absolute inset-x-14 top-12 h-28 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-24 bottom-10 h-24 rounded-full bg-amber-300/12 blur-3xl" />

        <div
          ref={orbitGroupRef}
          className="absolute inset-0 z-10 [transform-style:preserve-3d]"
        >
          {!isMobile ? (
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <circle
                cx="50"
                cy="50"
                r="22"
                fill="none"
                stroke="rgba(103, 232, 249, 0.25)"
                strokeDasharray="2 5"
              />
              <circle
                cx="50"
                cy="50"
                r="31"
                fill="none"
                stroke="rgba(251, 191, 36, 0.18)"
                strokeDasharray="3 7"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(148, 163, 184, 0.14)"
                strokeDasharray="4 8"
              />
            </svg>
          ) : null}

          {orbitSkills.map((skill, index) => {
            const Icon = skill.icon
            const isActive = activeSkill === skill.name

            return (
              <div key={skill.name} className="absolute left-1/2 top-1/2">
                <div
                  ref={(node) => {
                    orbitRefs.current[index] = node
                  }}
                  className="relative [transform-style:preserve-3d]"
                  style={{
                    transform: `translate3d(-50%, -50%, 0) rotate(${skill.angle}deg)`,
                  }}
                >
                  <div
                    className="relative [transform-style:preserve-3d]"
                    style={{
                      transform: `translate3d(${skill.radius}px, 0, ${skill.depth}px)`,
                    }}
                  >
                    <div
                      ref={(node) => {
                        floatRefs.current[index] = node
                      }}
                      className="relative"
                    >
                      <button
                        type="button"
                        aria-label={skill.name}
                        onMouseEnter={() => {
                          setActiveSkill(skill.name)
                          setOrbitPaused(true)
                        }}
                        onMouseLeave={() => {
                          setActiveSkill(null)
                          setOrbitPaused(false)
                        }}
                        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/10 text-white shadow-[0_16px_40px_rgba(2,6,23,0.28)] backdrop-blur-2xl transition duration-300 hover:scale-110 sm:h-14 sm:w-14"
                        style={{
                          boxShadow: isActive
                            ? `0 0 28px ${skill.color}66, 0 14px 32px rgba(2,6,23,0.24)`
                            : undefined,
                        }}
                      >
                        <div
                          ref={(node) => {
                            counterRefs.current[index] = node
                          }}
                          className="flex h-full w-full items-center justify-center rounded-full"
                          style={{ color: skill.color }}
                        >
                          <Icon className="text-xl sm:text-2xl" />
                        </div>
                        <span
                          className={`pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full border border-white/12 bg-slate-950/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_10px_25px_rgba(2,6,23,0.28)] transition duration-200 ${
                            isActive ? 'opacity-100 translate-y-0' : 'translate-y-2 opacity-0'
                          }`}
                        >
                          {skill.name}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <motion.div
          ref={photoRef}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-20 [transform-style:preserve-3d]"
        >
          {/* Soft outer glow — kept subtle so it doesn't read as a thick border */}
          <div className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,_rgba(34,211,238,0.16),_rgba(15,23,42,0)_65%)] blur-3xl" />
          <div className="pointer-events-none absolute -inset-5 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.14),_rgba(15,23,42,0)_60%)] blur-2xl opacity-70" />

          {/* Thin rotating gradient ring — reduced from -inset-3 to -inset-1.5 and blur removed for crispness */}
          <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_180deg,_rgba(34,211,238,0.25),_rgba(251,191,36,0.9),_rgba(34,211,238,0.25))] opacity-90 animate-[spin_10s_linear_infinite]" />

          {/* Thin static inner border replaces the old thick padded ring */}
          <div className="relative rounded-full bg-slate-950 p-[2px] shadow-[0_25px_70px_rgba(2,6,23,0.35)]">
            <div className="relative overflow-hidden rounded-full border border-white/15 bg-slate-950/85">
              <img
                ref={imageRef}
                src={profilePhoto}
                alt="Sambhaji Patil profile portrait"
                onLoad={() => {
                  if (!readyRef.current) {
                    readyRef.current = true
                    onReady?.()
                  }
                }}
                className="h-56 w-56 object-cover object-[center_12%] sm:h-64 sm:w-64 lg:h-80 lg:w-80"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}