import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function SceneParticles({ count = 28 }) {
  const groupRef = useRef(null)
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2
        const radius = 1.6 + (index % 5) * 0.62

        return {
          position: [
            Math.cos(angle) * radius,
            ((index % 7) - 3) * 0.42,
            Math.sin(angle * 1.2) * (radius * 0.82),
          ],
          scale: 0.03 + (index % 4) * 0.018,
        }
      }),
    [count],
  )

  useFrame((state) => {
    if (!groupRef.current) {
      return
    }

    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <group ref={groupRef}>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          position={particle.position}
          scale={particle.scale}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshStandardMaterial
            color={index % 4 === 0 ? '#67e8f9' : '#f8fafc'}
            emissive={index % 5 === 0 ? '#fbbf24' : '#67e8f9'}
            emissiveIntensity={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}
