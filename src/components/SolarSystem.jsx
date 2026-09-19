import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect, Suspense } from 'react'
import * as THREE from 'three'

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

// Orbits: rockets act as the "planets" of the solar system.
const ORBITS = [
  { r: 3.4, speed: 0.18, color: '#22d3ee', size: 0.52, phase: 0.0 },
  { r: 4.9, speed: 0.13, color: '#ff2fa4', size: 0.6, phase: 1.4 },
  { r: 6.5, speed: 0.1, color: '#a855f7', size: 0.56, phase: 3.0 },
  { r: 8.1, speed: 0.075, color: '#a3e635', size: 0.64, phase: 4.4 },
  { r: 9.8, speed: 0.055, color: '#ff7a1a', size: 0.72, phase: 5.8 },
]

function Rocket({ color, size = 0.5 }) {
  // Built so the nose points along +Z (so lookAt aims the nose along travel).
  return (
    <group scale={size}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 1.1, 18]} />
        <meshStandardMaterial color="#f4f3f8" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.26, 0.6, 18]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} metalness={0.4} roughness={0.3} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.22]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#a8f0ff" emissive="#22d3ee" emissiveIntensity={1} toneMapped={false} />
      </mesh>
      {[[0.26, 0], [-0.26, 0], [0, 0.26], [0, -0.26]].map(([x, y], k) => (
        <mesh key={k} position={[x, y, -0.5]}>
          <boxGeometry args={[0.06, 0.06, 0.42]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} toneMapped={false} />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.85]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.17, 0.55, 14]} />
        <meshBasicMaterial color="#ffb658" transparent opacity={0.85} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Starfield() {
  const ref = useRef()
  const positions = useMemo(() => {
    const n = 700
    const a = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r = 30 + Math.random() * 60
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      a[i * 3] = r * Math.sin(ph) * Math.cos(th)
      a[i * 3 + 1] = r * Math.cos(ph)
      a[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th)
    }
    return a
  }, [])
  useFrame((s, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.01 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#cbd5ff" transparent opacity={0.8} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Scene({ scrollRef }) {
  const sys = useRef()
  const rockets = useRef([])
  const sun = useRef()
  const sunLight = useRef()
  const smooth = useRef(0)

  useFrame((s) => {
    const p = scrollRef.current
    smooth.current += (p - smooth.current) * 0.06
    const sp = smooth.current
    const t = s.clock.elapsedTime

    if (sys.current) {
      sys.current.rotation.y = t * 0.05 + sp * Math.PI * 1.2
      sys.current.rotation.x = 0.32 + sp * 0.55 // tilt more edge-on as you scroll
    }

    ORBITS.forEach((o, i) => {
      const rk = rockets.current[i]
      if (!rk) return
      const ang = t * o.speed * (1 + sp * 0.5) + o.phase
      const x = Math.cos(ang) * o.r
      const z = Math.sin(ang) * o.r
      rk.position.set(x, 0, z)
      rk.lookAt(x - Math.sin(ang), 0, z + Math.cos(ang))
    })

    // Keep the sun soft so it never washes out the page text.
    if (sun.current) sun.current.material.emissiveIntensity = 0.55 + sp * 0.85
    if (sunLight.current) sunLight.current.intensity = 1 + sp * 1.4

    // camera eases in + rises as you scroll
    s.camera.position.z = 17 - sp * 6
    s.camera.position.y = 2.2 + sp * 3.4
    s.camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <Starfield />
      <group ref={sys}>
        {/* sun */}
        <mesh ref={sun}>
          <sphereGeometry args={[1.5, 40, 40]} />
          <meshStandardMaterial color="#cfe2f5" emissive="#4d86c8" emissiveIntensity={0.55} toneMapped={false} />
        </mesh>
        <mesh scale={1.35}>
          <sphereGeometry args={[1.5, 24, 24]} />
          <meshBasicMaterial color="#4d86c8" transparent opacity={0.06} />
        </mesh>
        <pointLight ref={sunLight} intensity={1} distance={70} decay={1.8} color="#7fb2e6" />

        {/* orbit rings */}
        {ORBITS.map((o, i) => (
          <mesh key={`ring${i}`} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[o.r, 0.012, 8, 140]} />
            <meshBasicMaterial color={o.color} transparent opacity={0.28} />
          </mesh>
        ))}

        {/* rockets */}
        {ORBITS.map((o, i) => (
          <group key={`rk${i}`} ref={(el) => (rockets.current[i] = el)}>
            <Rocket color={o.color} size={o.size} />
          </group>
        ))}
      </group>
    </group>
  )
}

export default function SolarSystem() {
  const scrollRef = useScrollProgress()
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 2.2, 17], fov: 55 }} dpr={[1, 1.3]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <pointLight position={[10, 8, 10]} intensity={0.8} color="#22d3ee" />
          <pointLight position={[-10, -6, 8]} intensity={0.8} color="#ff2fa4" />
          <Scene scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
