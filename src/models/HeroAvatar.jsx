import { useRef } from 'react'
import { Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { SceneParticles } from './SceneParticles'

export function HeroAvatar({ onReady }) {
  const groupRef = useRef(null)
  const haloRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current || !haloRef.current) {
      return
    }

    // The model eases toward pointer input so the hero feels alive without
    // relying on orbit controls or abrupt camera movement.
    targetRef.current.x = state.pointer.y * 0.35
    targetRef.current.y = state.pointer.x * 0.55

    groupRef.current.rotation.x = MathUtils.damp(
      groupRef.current.rotation.x,
      targetRef.current.x,
      4,
      delta,
    )
    groupRef.current.rotation.y = MathUtils.damp(
      groupRef.current.rotation.y,
      targetRef.current.y,
      4,
      delta,
    )
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08

    haloRef.current.rotation.z += delta * 0.22
  })

  return (
    <group onUpdate={onReady}>
      <SceneParticles />

      <Float speed={2.1} rotationIntensity={0.16} floatIntensity={0.8}>
        <group ref={groupRef} position={[0, -0.05, 0]}>
          <mesh position={[0, 0.95, 0]}>
            <icosahedronGeometry args={[0.56, 1]} />
            <meshStandardMaterial
              color="#f8fafc"
              emissive="#67e8f9"
              emissiveIntensity={0.42}
              metalness={0.28}
              roughness={0.18}
            />
          </mesh>

          <mesh ref={haloRef} rotation={[Math.PI / 2.6, 0, 0]} position={[0, 0.95, 0]}>
            <torusGeometry args={[0.88, 0.05, 20, 120]} />
            <meshStandardMaterial
              color="#67e8f9"
              emissive="#67e8f9"
              emissiveIntensity={1.1}
            />
          </mesh>

          <mesh position={[0, -0.05, 0]}>
            <capsuleGeometry args={[0.52, 1.2, 10, 18]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#172554"
              emissiveIntensity={0.4}
              metalness={0.52}
              roughness={0.26}
            />
          </mesh>

          <mesh position={[0, -0.05, -0.02]} scale={1.08}>
            <capsuleGeometry args={[0.28, 0.72, 10, 18]} />
            <MeshDistortMaterial
              color="#fbbf24"
              emissive="#f59e0b"
              emissiveIntensity={0.85}
              speed={2.5}
              distort={0.2}
              transparent
              opacity={0.92}
            />
          </mesh>
        </group>
      </Float>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.45}
        scale={8}
        blur={2.6}
        far={3}
      />
    </group>
  )
}
