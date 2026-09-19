import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A single fixed WebGL canvas behind the whole page. The camera flies forward
// through a star tunnel as the user scrolls (zoom-in), past a glowing green
// globe orbited by shards — a galaxy that keeps moving throughout the scroll.
export default function GalaxyBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x241452, 0.0015)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000)
    camera.position.z = 60

    // Lights
    const ambient = new THREE.AmbientLight(0x4a3a7a, 1.9)
    scene.add(ambient)
    const light1 = new THREE.PointLight(0x2b4bff, 2.4, 360); light1.position.set(40, 30, 40); scene.add(light1)
    const light2 = new THREE.PointLight(0x7b5cff, 1.9, 360); light2.position.set(-40, -20, 20); scene.add(light2)
    const light3 = new THREE.PointLight(0xff8a4c, 1.7, 320); light3.position.set(0, 20, -30); scene.add(light3)

    // ---- Starfield galaxy ----
    const starCount = 1300
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(starCount * 3)
    const starColors = new Float32Array(starCount * 3)
    const palette = [
      [1, 1, 1],
      [0.55, 0.62, 1],
      [0.66, 0.5, 1],
      [1, 0.62, 0.36],
      [0.7, 0.85, 1],
    ]
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 460
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 460
      starPos[i * 3 + 2] = Math.random() * -1350
      const c = palette[(Math.random() * palette.length) | 0]
      starColors[i * 3] = c[0]; starColors[i * 3 + 1] = c[1]; starColors[i * 3 + 2] = c[2]
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3))
    const starMat = new THREE.PointsMaterial({ size: 1.7, sizeAttenuation: true, vertexColors: true, transparent: true, opacity: 1, depthWrite: false })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ---- Central glowing globe (green core + wireframe shell) ----
    const coreGroup = new THREE.Group()
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(13.5, 1),
      new THREE.MeshStandardMaterial({ color: 0x239065, emissive: 0x136b45, emissiveIntensity: 0.55, roughness: 0.3, metalness: 0.35 }),
    )
    coreGroup.add(core)
    const wireShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(18.75, 1),
      new THREE.MeshBasicMaterial({ color: 0x9dffc0, wireframe: true, transparent: true, opacity: 0.42 }),
    )
    coreGroup.add(wireShell)
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(23.25, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x5cc23a, transparent: true, opacity: 0.1, side: THREE.BackSide }),
    )
    coreGroup.add(halo)
    coreGroup.position.set(0, 0, -45)
    scene.add(coreGroup)

    // ---- Orbiting shards ----
    const shardPalette = [0x7b5cff, 0x2b4bff, 0xff8a4c, 0x0b63ff, 0xb18cff]
    const orbiters = []
    const configs = [
      { radius: 22, speed: 0.6, tilt: 0.0, phase: 0.0, geo: 'oct', size: 3.0 },
      { radius: 17, speed: 0.9, tilt: Math.PI / 3, phase: 1.4, geo: 'tet', size: 2.1 },
      { radius: 27, speed: 0.4, tilt: Math.PI / 2, phase: 2.6, geo: 'ico', size: 2.5 },
      { radius: 14, speed: 1.2, tilt: Math.PI / 5, phase: 4.1, geo: 'oct', size: 1.6 },
      { radius: 31, speed: 0.3, tilt: (2 * Math.PI) / 3, phase: 5.3, geo: 'tet', size: 2.8 },
      { radius: 19, speed: 0.75, tilt: -Math.PI / 4, phase: 3.2, geo: 'ico', size: 1.9 },
    ]
    const makeGeo = (kind, size) =>
      kind === 'tet' ? new THREE.TetrahedronGeometry(size, 0)
        : kind === 'ico' ? new THREE.IcosahedronGeometry(size * 0.75, 0)
          : new THREE.OctahedronGeometry(size, 0)
    configs.forEach((cfg, i) => {
      const color = shardPalette[i % shardPalette.length]
      const mesh = new THREE.Mesh(
        makeGeo(cfg.geo, cfg.size),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.55, roughness: 0.3, metalness: 0.25 }),
      )
      scene.add(mesh)
      orbiters.push({ mesh, ...cfg })
    })

    // ---- Scroll + mouse ----
    let scrollProgress = 0
    const updateScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = docH > 0 ? window.scrollY / docH : 0
    }
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })

    let mouseX = 0, mouseY = 0
    const onMove = (e) => {
      mouseX = e.clientX / window.innerWidth - 0.5
      mouseY = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    const clock = new THREE.Clock()
    let raf
    // smooth the scroll value so zoom eases in/out
    let smoothScroll = 0

    const animate = () => {
      const t = clock.getElapsedTime()
      smoothScroll += (scrollProgress - smoothScroll) * 0.06

      // Fly forward through the tunnel as we scroll (zoom in), ease back when scrolling up.
      const zoomDepth = smoothScroll * 520
      camera.position.z = 60 - zoomDepth
      camera.position.x = mouseX * 7 + Math.sin(t * 0.15) * 1.6
      camera.position.y = -mouseY * 7 + Math.cos(t * 0.12) * 1.2
      camera.lookAt(0, 0, camera.position.z - 50)

      // Globe pulses + rotates; recedes so we appear to fly past it.
      const pulse = 1 + Math.sin(smoothScroll * Math.PI * 2) * 0.18
      coreGroup.scale.setScalar(pulse)
      coreGroup.rotation.y = t * 0.15 + smoothScroll * 3
      coreGroup.rotation.x = t * 0.08
      wireShell.rotation.y = -t * 0.12
      coreGroup.position.z = -45 - zoomDepth * 0.55

      orbiters.forEach((o, i) => {
        const angle = t * o.speed + o.phase
        const bx = Math.cos(angle) * o.radius
        const bz = Math.sin(angle) * o.radius
        const y1 = -bz * Math.sin(o.tilt)
        const z1 = bz * Math.cos(o.tilt)
        const yaw = i * 0.9
        const x2 = bx * Math.cos(yaw) + z1 * Math.sin(yaw)
        const z2 = -bx * Math.sin(yaw) + z1 * Math.cos(yaw)
        o.mesh.position.set(coreGroup.position.x + x2, coreGroup.position.y + y1, coreGroup.position.z + z2)
        o.mesh.rotation.x = t * (0.6 + i * 0.1)
        o.mesh.rotation.y = t * (0.8 + i * 0.15)
      })

      // Stars wrap toward the camera for an infinite tunnel.
      stars.rotation.z = t * 0.01
      const arr = stars.geometry.attributes.position.array
      let wrapped = false
      for (let i = 0; i < starCount; i++) {
        if (arr[i * 3 + 2] > camera.position.z + 40) {
          arr[i * 3 + 2] = camera.position.z - 850
          wrapped = true
        }
      }
      // Only re-upload the buffer to the GPU when something actually changed.
      if (wrapped) stars.geometry.attributes.position.needsUpdate = true

      light1.intensity = 2.6 + Math.sin(t * 0.8) * 0.6
      light2.intensity = 2.1 + Math.cos(t * 0.7) * 0.5
      light3.intensity = 1.9 + Math.sin(t * 1.1 + 1.5) * 0.6

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose()
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose())
          else o.material.dispose()
        }
      })
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      <div ref={mountRef} className="fixed inset-0 z-0" aria-hidden="true" />
      <div className="galaxy-vignette" />
      <div className="galaxy-scrim" />
    </>
  )
}
