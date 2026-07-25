import { useRef, useMemo, Suspense, useState, useEffect, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Float } from '@react-three/drei'
import * as THREE from 'three'

function TravelingPulse({ curve, speed, offset, color }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = (clock.getElapsedTime() * speed + offset) % 1
    const point = curve.getPoint(t)
    ref.current.position.copy(point)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function ConnectionLine({ curve, color }) {
  const points = useMemo(() => curve.getPoints(50), [curve])
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  )
}

function Node({ position, color, size, pausedRef, floatSpeed = 1 }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (pausedRef.current || !ref.current) return
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * floatSpeed) * 0.15
  })

  return (
    <group ref={ref} position={position}>
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

const CLIENT_NODES = [
  { position: [2.2, 0.6, 0], color: '#4ade80', size: 0.22, floatSpeed: 0.9 },
  { position: [1.8, -1.1, 0.8], color: '#22d3ee', size: 0.16, floatSpeed: 1.2 },
  { position: [2.4, -0.4, -0.9], color: '#818cf8', size: 0.14, floatSpeed: 1.4 },
]

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
      target.current.x * 0.3,
      0.04,
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.y * 0.15,
      0.04,
    )
  })

  return <group ref={groupRef}>{children}</group>
}

function CenterNode({ pausedRef }) {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (pausedRef.current || !ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.85, 1]} />
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
      <mesh scale={1.2}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  )
}

function Scene({ pausedRef }) {
  const curves = useMemo(
    () =>
      CLIENT_NODES.map(
        (n) =>
          new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(n.position[0] * 0.5, n.position[1] * 0.5 + 0.4, n.position[2] * 0.5),
            new THREE.Vector3(...n.position),
          ]),
      ),
    [],
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={1.2} color="#22d3ee" />
      <pointLight position={[-3, -2, -2]} intensity={0.6} color="#4ade80" />

      <MouseParallaxGroup pausedRef={pausedRef}>
        <CenterNode pausedRef={pausedRef} />

        {CLIENT_NODES.map((n, i) => (
          <Node key={i} {...n} pausedRef={pausedRef} />
        ))}

        {curves.map((curve, i) => (
          <group key={i}>
            <ConnectionLine curve={curve} color={CLIENT_NODES[i].color} />
            <TravelingPulse
              curve={curve}
              speed={0.35}
              offset={i * 0.3}
              color={CLIENT_NODES[i].color}
            />
          </group>
        ))}
      </MouseParallaxGroup>

      <Sparkles count={30} scale={6} size={2} speed={0.3} color="#22d3ee" opacity={0.4} />
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

export function ContactScene() {
  const containerRef = useRef(null)
  const pausedRef = useRef(false)
  const [mounted, setMounted] = useState(false)
  const [contextLost, setContextLost] = useState(false)

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
      console.warn('WebGL context lost on ContactScene — attempting recovery')
      setContextLost(true)
    }
    const onRestored = () => {
      console.info('WebGL context restored on ContactScene')
      setContextLost(false)
    }

    canvasEl.addEventListener('webglcontextlost', onLost, false)
    canvasEl.addEventListener('webglcontextrestored', onRestored, false)
  }, [])

  return (
    <div ref={containerRef} className="relative h-72 w-full sm:h-80 lg:h-96">
      {mounted && (
        <Suspense fallback={<LoaderFallback />}>
          <Canvas
            camera={{ position: [0, 0.4, 6], fov: 45 }}
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(2,6,23,0.35)_100%)]" />
    </div>
  )
}