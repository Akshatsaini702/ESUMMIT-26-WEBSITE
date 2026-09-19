import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useEffect, Suspense } from 'react'

// Scroll progress 0..1 across the whole page, read via a ref (no re-renders).
function useScrollProgress() {
  const ref = useRef(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      ref.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return ref
}

function Bulb({ scrollRef }) {
  const group = useRef()
  const glass = useRef()
  const core = useRef()
  const filament = useRef()
  const light = useRef()
  const smooth = useRef(0)

  useFrame((s) => {
    const p = scrollRef.current
    smooth.current += (p - smooth.current) * 0.08
    const sp = smooth.current

    if (group.current) {
      // spin horizontally east -> west, driven by scroll (+ gentle idle)
      group.current.rotation.y = sp * Math.PI * 4 + s.clock.elapsedTime * 0.12
      // zoom out as we scroll down
      group.current.scale.setScalar(Math.max(0.45, 1.35 - sp * 0.8))
    }
    // starts dim, glows up as we scroll down
    const glow = sp
    if (glass.current) glass.current.emissiveIntensity = 0.05 + glow * 1.6
    if (core.current) core.current.material.opacity = 0.1 + glow * 0.55
    if (filament.current) filament.current.material.emissiveIntensity = 0.6 + glow * 4
    if (light.current) light.current.intensity = glow * 7
  })

  return (
    <group ref={group} position={[0, 0.35, 0]}>
      {/* glass envelope */}
      <mesh scale={[1, 1.15, 1]}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshStandardMaterial ref={glass} color="#fff3d0" emissive="#ffd27a" emissiveIntensity={0.05} transparent opacity={0.34} roughness={0.08} metalness={0.1} />
      </mesh>
      {/* inner glow core */}
      <mesh ref={core} scale={0.62}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#fff6da" transparent opacity={0.12} />
      </mesh>
      {/* filament */}
      <mesh ref={filament}>
        <torusKnotGeometry args={[0.3, 0.055, 90, 10]} />
        <meshStandardMaterial color="#fff2c0" emissive="#ffcf6b" emissiveIntensity={0.8} toneMapped={false} />
      </mesh>
      {/* neck */}
      <mesh position={[0, -1.28, 0]}>
        <cylinderGeometry args={[0.52, 0.72, 0.5, 32]} />
        <meshStandardMaterial color="#d8d8e2" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* screw base */}
      <mesh position={[0, -1.72, 0]}>
        <cylinderGeometry args={[0.44, 0.44, 0.55, 24]} />
        <meshStandardMaterial color="#b6b6c2" metalness={0.9} roughness={0.35} />
      </mesh>
      <mesh position={[0, -2.05, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#8a8a96" metalness={0.9} roughness={0.4} />
      </mesh>
      <pointLight ref={light} position={[0, 0, 0]} color="#ffd27a" intensity={0} distance={40} decay={2} />
    </group>
  )
}

export default function BulbScene() {
  const scrollRef = useScrollProgress()
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.3]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 4, 5]} intensity={1.3} color="#22d3ee" />
          <pointLight position={[-5, -2, 4]} intensity={1.3} color="#ff2fa4" />
          <Bulb scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
