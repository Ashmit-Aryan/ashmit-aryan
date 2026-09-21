'use client'
import React from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { Skill } from '@/data/skills'

interface Skills3DProps {
  skills: Skill[]
}

const categoryColors: Record<string, number> = {
  languages: 0xdea584,
  frameworks: 0x61dafb,
  devops: 0x326ce5,
  tools: 0xf05032,
  concepts: 0x96ceb4,
}

function createLabelTexture(text: string): THREE.Texture {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = 256
  canvas.height = 64
  
  context.fillStyle = 'rgba(0, 0, 0, 0)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  context.fillStyle = 'rgba(10, 14, 20, 0.9)'
  context.fillRect(0, 0, canvas.width, canvas.height)
  
  context.strokeStyle = '#00d4aa'
  context.lineWidth = 2
  context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4)
  
  context.font = 'bold 20px "Space Grotesk", sans-serif'
  context.fillStyle = '#f0f4f8'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export function Skills3D({ skills }: Skills3DProps) {
  const { scene, camera, gl } = useThree()
  const nodesRef = useRef<Map<string, THREE.Mesh>>(new Map())
  const labelsRef = useRef<Map<string, THREE.Sprite>>(new Map())
  const linesRef = useRef<THREE.LineSegments | null>(null)
  const groupRef = useRef<THREE.Group | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())

  // Initialize nodes
  useEffect(() => {
    const group = new THREE.Group()
    groupRef.current = group
    const positions: number[] = []
    const colors: number[] = []

    skills.forEach((skill, i) => {
      const geometry = new THREE.SphereGeometry(0.35, 16, 16)
      const material = new THREE.MeshBasicMaterial({
        color: categoryColors[skill.category] || 0xffffff,
        transparent: true,
        opacity: 0.85,
      })

      const mesh = new THREE.Mesh(geometry, material)
      
      // Position in sphere using fibonacci sphere algorithm
      const radius = 9
      const phi = Math.acos(-1 + (2 * (i + 0.5)) / skills.length)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)

      mesh.position.set(x, y, z)
      mesh.userData = {
        skill,
        originalPosition: new THREE.Vector3(x, y, z),
        currentScale: 1,
      }

      group.add(mesh)
      nodesRef.current.set(skill.name, mesh)

      // Create label as a sprite
      const spriteMaterial = new THREE.SpriteMaterial({
        map: createLabelTexture(skill.name),
        transparent: true,
        opacity: 0,
        depthTest: false,
      })
      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(4, 1.5, 1)
      sprite.userData = { skillName: skill.name }
      group.add(sprite)
      labelsRef.current.set(skill.name, sprite)
    })

    // Create connections between same-category skills
    skills.forEach((skill1, i) => {
      skills.forEach((skill2, j) => {
        if (j <= i) return
        if (skill1.category === skill2.category) {
          const node1 = nodesRef.current.get(skill1.name)
          const node2 = nodesRef.current.get(skill2.name)
          if (node1 && node2) {
            positions.push(
              node1.position.x, node1.position.y, node1.position.z,
              node2.position.x, node2.position.y, node2.position.z
            )
            const color = new THREE.Color(categoryColors[skill1.category] || 0xffffff)
            colors.push(
              color.r * 0.25, color.g * 0.25, color.b * 0.25,
              color.r * 0.25, color.g * 0.25, color.b * 0.25
            )
          }
        }
      })
    })

    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    linesRef.current = lines
    group.add(lines)

    scene.add(group)

    // Cleanup
    return () => {
      scene.remove(group)
      labelsRef.current.forEach(label => {
        if (label.material.map) label.material.map.dispose()
        label.material.dispose()
      })
      labelsRef.current.clear()
      nodesRef.current.clear()
      lineGeometry.dispose()
      lineMaterial.dispose()
      groupRef.current = null
    }
  }, [scene, skills])

  // Animation loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()
    const group = groupRef.current
    if (!group) return

    // Animate nodes
    nodesRef.current.forEach((mesh) => {
      const data = mesh.userData
      if (!data) return

      const originalPos = data.originalPosition
      
      // Gentle floating
      mesh.position.x = originalPos.x + Math.sin(time * 0.4 + data.skill.name.length) * 0.25
      mesh.position.y = originalPos.y + Math.cos(time * 0.35 + data.skill.name.length) * 0.25
      mesh.position.z = originalPos.z + Math.sin(time * 0.3 + data.skill.name.length) * 0.25

      // Scale pulse based on level
      const pulseScale = 1 + Math.sin(time * 1.5 + data.skill.name.length) * 0.08 * (data.skill.level / 100)
      data.currentScale = THREE.MathUtils.lerp(data.currentScale, pulseScale, 0.08)
      mesh.scale.setScalar(data.currentScale)

      // Update label position
      const label = labelsRef.current.get(data.skill.name)
      if (label) {
        const vector = mesh.position.clone().project(camera)
        label.position.copy(vector)
        label.position.z = -100 // Ensure labels are in front

        // Show label on hover or proximity
        const distance = camera.position.distanceTo(mesh.position)
        const isHovered = hoveredSkill === data.skill.name
        
        label.material.opacity = (isHovered || distance < 18) ? 1 : 0
        label.scale.setScalar((isHovered || distance < 18) ? 1.2 : 1)
      }
    })

    // Rotate entire group slowly
    group.rotation.y = time * 0.012
    group.rotation.x = Math.sin(time * 0.08) * 0.04

    // Raycast for hover
    raycaster.current.setFromCamera(mouse.current, camera)
    const nodeMeshes = Array.from(nodesRef.current.values())
    const intersects = raycaster.current.intersectObjects(nodeMeshes)

    if (intersects.length > 0) {
      const skillName = intersects[0].object.userData.skill?.name
      if (skillName && skillName !== hoveredSkill) {
        setHoveredSkill(skillName)
      }
    } else if (hoveredSkill) {
      setHoveredSkill(null)
    }
  })

  // Mouse tracking
  useEffect(() => {
    const canvas = gl.domElement
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', () => {
      setHoveredSkill(null)
    })
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', () => setHoveredSkill(null))
    }
  }, [gl])

  return <group ref={groupRef} />
}