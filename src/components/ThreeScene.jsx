import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, TorusKnot, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei'
import { useMemo, useRef, Suspense } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef()
  const positions = useMemo(() => {
    const n = 900
    const arr = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return arr
  }, [])

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03
      ref.current.rotation.x += delta * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#7b8cff" size={0.045} sizeAttenuation depthWrite={false} opacity={0.75} />
    </Points>
  )
}

function FloatingKnot() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15
      ref.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <TorusKnot ref={ref} args={[1.15, 0.34, 180, 32]} position={[3.4, 0.6, -1]} scale={0.95}>
        <MeshDistortMaterial
          color="#ff2fa4"
          emissive="#1a2ea8"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.9}
          distort={0.28}
          speed={1.6}
        />
      </TorusKnot>
    </Float>
  )
}

function FloatingGem() {
  return (
    <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.4}>
      <Icosahedron args={[1.25, 0]} position={[-3.6, -0.4, -1.5]} scale={1}>
        <MeshDistortMaterial
          color="#a855f7"
          emissive="#ff7a1a"
          emissiveIntensity={0.18}
          roughness={0.1}
          metalness={0.8}
          distort={0.34}
          speed={2}
        />
      </Icosahedron>
    </Float>
  )
}

function Rig() {
  useFrame((state) => {
    const x = (state.pointer.x * 0.6)
    const y = (state.pointer.y * 0.4)
    state.camera.position.x += (x - state.camera.position.x) * 0.04
    state.camera.position.y += (y - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function ThreeScene({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.4} color="#8fa8ff" />
          <pointLight position={[-5, -3, 2]} intensity={2} color="#ff7a1a" />
          <ParticleField />
          <FloatingKnot />
          <FloatingGem />
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  )
}
