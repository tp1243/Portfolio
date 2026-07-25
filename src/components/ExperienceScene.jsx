import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, Line } from '@react-three/drei'
import * as THREE from 'three'

function OrbitNode({ radius, speed, offset, color, size = 0.16, pausedRef }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (pausedRef.current) return
    const t = clock.getElapsedTime() * speed + offset
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.z = Math.sin(t) * radius
      ref.current.position.y = Math.sin(t * 1.6) * 0.35
    }
  })

  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}

function ConnectingLines({ nodeCount, radius }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
    }
    pts.push(pts[0])
    return pts
  }, [nodeCount, radius])

  return <Line points={points} color="#22d3ee" transparent opacity={0.18} lineWidth={1} />
}

function CoreSphere({ pausedRef }) {
  const meshRef = useRef(null)

  useFrame(({ clock }) => {
    if (pausedRef.current || !meshRef.current) return
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.25
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.15
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

function MouseParallaxGroup({ children, pausedRef }) {
  const groupRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  useFrame(() => {
    if (pausedRef.current || !groupRef.current) return
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target.current.x * 0.35,
      0.04,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.y * 0.2,
      0.04,
    )
  })

  return <group ref={groupRef}>{children}</group>
}

const NODE_CONFIG = [
  { radius: 2.1, speed: 0.35, offset: 0, color: '#22d3ee', size: 0.17 },
  { radius: 2.4, speed: -0.28, offset: 1.4, color: '#4ade80', size: 0.14 },
  { radius: 1.9, speed: 0.42, offset: 2.6, color: '#818cf8', size: 0.15 },
  { radius: 2.6, speed: -0.32, offset: 4.1, color: '#22d3ee', size: 0.12 },
  { radius: 2.2, speed: 0.3, offset: 5.3, color: '#4ade80', size: 0.16 },
]

function Scene({ pausedRef }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#4ade80" />

      <MouseParallaxGroup pausedRef={pausedRef}>
        <CoreSphere pausedRef={pausedRef} />
        <ConnectingLines nodeCount={NODE_CONFIG.length} radius={2.2} />
        {NODE_CONFIG.map((cfg, i) => (
          <OrbitNode key={i} {...cfg} pausedRef={pausedRef} />
        ))}
      </MouseParallaxGroup>

      <Sparkles count={30} scale={6} size={2} speed={0.3} color="#22d3ee" opacity={0.5} />
    </>
  )
}

function LoaderFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
    </div>
  )
}

export function ExperienceScene() {
  const containerRef = useRef(null)
  const pausedRef = useRef(false)
  const [contextLost, setContextLost] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Mount canvas once it first scrolls into view; never unmount again after that.
  useEffect(() => {
    if (!containerRef.current) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        pausedRef.current = !entry.isIntersecting
        if (entry.isIntersecting && !mounted) setMounted(true)
      },
      { threshold: 0.1 },
    )
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [mounted])

  const handleCreated = useCallback(({ gl }) => {
    const canvasEl = gl.domElement

    const onLost = (e) => {
      e.preventDefault()
      console.warn('WebGL context lost on ExperienceScene — attempting recovery')
      setContextLost(true)
    }
    const onRestored = () => {
      console.info('WebGL context restored on ExperienceScene')
      setContextLost(false)
    }

    canvasEl.addEventListener('webglcontextlost', onLost, false)
    canvasEl.addEventListener('webglcontextrestored', onRestored, false)
  }, [])

  return (
    <div ref={containerRef} className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[30rem]">
      {mounted && (
        <Suspense fallback={<LoaderFallback />}>
          <Canvas
            camera={{ position: [0, 0.6, 6], fov: 45 }}
            dpr={[1, 1.25]}
            gl={{
              powerPreference: 'default',
              antialias: true,
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: false,
            }}
            onCreated={handleCreated}
          >
            <Scene pausedRef={pausedRef} />
          </Canvas>
        </Suspense>
      )}
      {contextLost && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-xs text-slate-400">
          Reconnecting visual…
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(2,6,23,0.35)_100%)]" />
    </div>
  )
}