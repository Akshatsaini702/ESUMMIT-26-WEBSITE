import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect, Suspense } from 'react'

// Ambient 3D background: floating shapes + loops (torus, torus-knots, polyhedra)
// that slowly drift and rotate. Kept low-opacity and biased toward the edges so
// it never overshadows the centered page text, and the <Canvas> is fixed /
// pointer-events-none so it never blocks clicks or scrolling.

// type: torus | knot | ico | octa | dodec  (torus/knot read as "loops")
const SHAPES = [
  { type: 'torus', pos: [-5.2, 2.1, -1], scale: 1.0, color: '#22d3ee', rot: [0.12, 0.18, 0], wire: false, op: 0.5, float: 0.5, phase: 0 },
  { type: 'knot', pos: [5.3, 1.4, -2], scale: 0.8, color: '#ff2fa4', rot: [0.1, 0.14, 0.05], wire: false, op: 0.45, float: 0.6, phase: 1.2 },
  { type: 'torus', pos: [4.6, -2.4, -1.5], scale: 0.85, color: '#a3e635', rot: [0.16, 0.1, 0.08], wire: true, op: 0.55, float: 0.45, phase: 2.4 },
  { type: 'ico', pos: [-4.7, -2.0, -1], scale: 0.9, color: '#a855f7', rot: [0.18, 0.22, 0], wire: false, op: 0.4, float: 0.5, phase: 3.1 },
  { type: 'octa', pos: [-2.6, 3.0, -3], scale: 0.7, color: '#7c5cff', rot: [0.14, 0.2, 0.1], wire: true, op: 0.5, float: 0.4, phase: 4.0 },
  { type: 'knot', pos: [2.4, -3.1, -2.5], scale: 0.55, color: '#22d3ee', rot: [0.2, 0.12, 0.06], wire: true, op: 0.45, float: 0.55, phase: 5.0 },
  { type: 'dodec', pos: [6.0, 3.1, -3.5], scale: 0.7, color: '#ff2fa4', rot: [0.1, 0.16, 0.04], wire: false, op: 0.35, float: 0.5, phase: 0.7 },
  { type: 'torus', pos: [-6.2, -0.4, -3], scale: 0.6, color: '#a855f7', rot: [0.15, 0.1, 0.12], wire: true, op: 0.45, float: 0.5, phase: 2.0 },
]

function Geometry({ type }) {
  switch (type) {
    case 'torus':
      return <torusGeometry args={[1, 0.34, 20, 64]} />
    case 'knot':
      return <torusKnotGeometry args={[0.8, 0.26, 120, 20]} />
    case 'ico':
      return <icosahedronGeometry args={[1, 0]} />
    case 'octa':
      return <octahedronGeometry args={[1, 0]} />
    case 'dodec':
      return <dodecahedronGeometry args={[1, 0]} />
    default:
      return <icosahedronGeometry args={[1, 0]} />
  }
}

function Shape({ s }) {
  const ref = useRef()
  const baseY = s.pos[1]
  useFrame((state) => {
    const m = ref.current
    if (!m) return
    const t = state.clock.elapsedTime
    m.rotation.x += s.rot[0] * 0.01
    m.rotation.y += s.rot[1] * 0.01
    m.rotation.z += s.rot[2] * 0.01
    // gentle vertical bob
    m.position.y = baseY + Math.sin(t * s.float + s.phase) * 0.35
  })
  return (
    <mesh ref={ref} position={s.pos} scale={s.scale}>
      <Geometry type={s.type} />
      <meshStandardMaterial
        color={s.color}
        emissive={s.color}
        emissiveIntensity={0.25}
        metalness={0.35}
        roughness={0.45}
        transparent
        opacity={s.op}
        wireframe={s.wire}
        depthWrite={false}
      />
    </mesh>
  )
}

function Scene() {
  const group = useRef()
  useFrame((state) => {
    // whole field breathes/parallaxes very slightly
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.15
  })
  const shapes = useMemo(() => SHAPES, [])
  return (
    <group ref={group}>
      <ambientLight intensity={0.55} />
      <pointLight position={[8, 6, 6]} intensity={0.7} color="#22d3ee" />
      <pointLight position={[-8, -5, 4]} intensity={0.7} color="#ff2fa4" />
      {shapes.map((s, i) => (
        <Shape key={i} s={s} />
      ))}
    </group>
  )
}

export default function FloatingShapes() {
  const wrapRef = useRef()

  // Keep the shapes hidden on the hero (very top of the page) and fade them in
  // as the visitor scrolls down, so the first screen shows only the wordmark.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onScroll = () => {
      const start = window.innerHeight * 0.35 // begin revealing a third of the way down
      const span = window.innerHeight * 0.5 // fully visible after another half-screen
      const o = Math.min(1, Math.max(0, (window.scrollY - start) / span))
      el.style.opacity = String(o)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0, transition: 'opacity 0.4s ease-out' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
