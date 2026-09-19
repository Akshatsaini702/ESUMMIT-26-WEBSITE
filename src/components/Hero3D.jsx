import { Canvas, useFrame } from '@react-three/fiber'
import { Float, TorusKnot, Icosahedron, MeshDistortMaterial } from '@react-three/drei'
import { Suspense, useRef } from 'react'

function Knot() {
  const ref = useRef()
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.elapsedTime * 0.2
      ref.current.rotation.z = s.clock.elapsedTime * 0.15
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.7} floatIntensity={1.2}>
      <TorusKnot ref={ref} args={[1.1, 0.32, 160, 32]} position={[2.6, 0.4, 0]} scale={0.95}>
        <MeshDistortMaterial color="#ff2fa4" emissive="#a855f7" emissiveIntensity={0.5} roughness={0.15} metalness={0.9} distort={0.3} speed={1.8} />
      </TorusKnot>
    </Float>
  )
}
function Gem() {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
      <Icosahedron args={[1.15, 0]} position={[-2.9, -0.5, -1]} scale={1}>
        <MeshDistortMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.35} roughness={0.1} metalness={0.85} distort={0.36} speed={2.2} wireframe />
      </Icosahedron>
    </Float>
  )
}
function Rig() {
  useFrame((s) => {
    s.camera.position.x += (s.pointer.x * 0.7 - s.camera.position.x) * 0.04
    s.camera.position.y += (s.pointer.y * 0.5 - s.camera.position.y) * 0.04
    s.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Hero3D({ className = '' }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.6} color="#ffffff" />
          <pointLight position={[-5, -2, 3]} intensity={2.4} color="#ff2fa4" />
          <pointLight position={[5, 2, -2]} intensity={2} color="#22d3ee" />
          <Knot />
          <Gem />
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  )
}
