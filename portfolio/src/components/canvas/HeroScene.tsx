'use client'
import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'

interface ParticleSystemProps {
  count: number
  mouse: { current: { x: number; y: number } }
  time: { current: number }
}

// Particle System
function ParticleSystem({ count = 1500, mouse, time }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points | null>(null)
  const positionsRef = useRef<Float32Array | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)
  const phasesRef = useRef<Float32Array | null>(null)

  useEffect(() => {
    const points = pointsRef.current
    if (!points) return

    const count = positionsRef.current!.length / 3
    const positions = positionsRef.current!
    const velocities = velocitiesRef.current!
    const phases = phasesRef.current!

    const color1 = new THREE.Color(0x00d4aa)
    const color2 = new THREE.Color(0x6366f1)
    const color3 = new THREE.Color(0xf472b6)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = 20 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const t = Math.random()
      // eslint-disable-next-line no-useless-assignment
      let c = color1
      if (t < 0.33) c = color1
      else if (t < 0.66) c = color2
      else c = color3

      points.geometry.attributes.color.array[i3] = c.r
      points.geometry.attributes.color.array[i3 + 1] = c.g
      points.geometry.attributes.color.array[i3 + 2] = c.b

      velocities[i3] = (Math.random() - 0.5) * 0.002
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002
      phases[i] = Math.random() * Math.PI * 2
    }

    points.geometry.attributes.position.needsUpdate = true
    points.geometry.attributes.color.needsUpdate = true
  }, [])

  useFrame((state, delta) => {
    const points = pointsRef.current
    if (!points) return

    const positions = positionsRef.current!
    const velocities = velocitiesRef.current!
    const phases = phasesRef.current!
    const count = positions.length / 3
    const t = time.current

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] += velocities[i3] * 100 * delta
      positions[i3 + 1] += velocities[i3 + 1] * 100 * delta
      positions[i3 + 2] += velocities[i3 + 2] * 100 * delta

      positions[i3 + 1] += Math.sin(t * 0.5 + phases[i]) * 0.5 * delta
      positions[i3] += Math.cos(t * 0.3 + phases[i]) * 0.3 * delta
    }

    // Mouse influence
    if (mouse.current.x !== 0 || mouse.current.y !== 0) {
      const mouse3D = new THREE.Vector2(mouse.current.x * 20, mouse.current.y * 20)
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const dist = Math.hypot(positions[i3] - mouse3D.x, positions[i3 + 1] - mouse3D.y)
        if (dist < 30) {
          const force = (30 - dist) / 30
          positions[i3 + 2] += force * 5 * delta
        }
      }
    }

    points.geometry.attributes.position.needsUpdate = true

    // Slow rotation
    points.rotation.y += 0.0002
    points.rotation.x = Math.sin(t * 0.1) * 0.1
  })

  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)
    const phases = new Float32Array(count)

    positionsRef.current = positions
    velocitiesRef.current = velocities
    phasesRef.current = phases

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    return geom
  }, [count])

  const material = useMemo(() => {
    const mat = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    return mat
  }, [])

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
    />
  )
}

// Floating Geometric Shapes
interface FloatingShapesProps {
  time: { current: number }
}

function FloatingShapes({ time }: FloatingShapesProps) {
  const shapesRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const group = shapesRef.current
    if (!group) return

    group.children.forEach((mesh) => {
      const userData = mesh.userData
      if (!userData) return

      mesh.rotation.x += userData.rotationSpeed.x
      mesh.rotation.y += userData.rotationSpeed.y
      mesh.rotation.z += userData.rotationSpeed.z

      mesh.position.y = userData.originalPosition.y + Math.sin(time.current * userData.speed) * 2
      mesh.position.x = userData.originalPosition.x + Math.cos(time.current * userData.speed * 0.7) * 1.5
    })
  })

  const shapeData = useMemo(() => [
    { type: 'octahedron', size: 3, color: 0x00d4aa, position: [-15, 10, -10], speed: 0.3 },
    { type: 'tetrahedron', size: 2.5, color: 0x6366f1, position: [15, -5, -15], speed: 0.4 },
    { type: 'icosahedron', size: 2, color: 0xf472b6, position: [-10, -15, 5], speed: 0.25 },
    { type: 'torus', size: 2, color: 0xfbbf24, position: [10, 15, -5], speed: 0.35 },
  ], [])

  return (
    <group ref={shapesRef}>
      {shapeData.map((data, i) => {
        let geometry: THREE.BufferGeometry
        switch (data.type) {
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(data.size, 0)
            break
          case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(data.size, 0)
            break
          case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(data.size, 0)
            break
          case 'torus':
            geometry = new THREE.TorusGeometry(data.size, 0.5, 8, 16)
            break
          default:
            geometry = new THREE.BoxGeometry(data.size, data.size, data.size)
        }

        const edges = new THREE.EdgesGeometry(geometry)
        const material = new THREE.LineBasicMaterial({
          color: data.color,
          transparent: true,
          opacity: 0.4,
        })

        return (
          <lineSegments
            key={i}
            geometry={edges}
            material={material}
            position={data.position as [number, number, number]}
            userData={{
              originalPosition: new THREE.Vector3(...data.position),
              speed: data.speed,
              rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01,
                (Math.random() - 0.5) * 0.01
              ),
            }}
          />
        )
      })}
    </group>
  )
}

export function HeroScene() {
  const { scene, camera } = useThree()

  // Shared state
  const time = useRef(0)
  const mouse = useRef({ x: 0, y: 0 })
  const particleCount = 1500

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll parallax
  useEffect(() => {
    const handleScroll = () => {
      const parallax = window.scrollY * 0.0005
      camera.position.y = parallax * 10
      camera.lookAt(0, parallax * 10, 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [camera])

  // Time update
  useFrame((_, delta) => {
    time.current += delta
  })

  return (
    <>
      <ParticleSystem count={particleCount} mouse={mouse} time={time} />
      <FloatingShapes time={time} />
    </>
  )
}