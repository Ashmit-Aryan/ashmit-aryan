'use client'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useMousePosition } from '@/hooks'

export function CursorFollower() {
  const reducedMotion = useReducedMotion()
  const { x: mouseX, y: mouseY } = useMousePosition()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)

  const followerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const followerX = useRef(0)
  const followerY = useRef(0)
  const dotX = useRef(0)
  const dotY = useRef(0)

  // Check for touch device
  const isTouchDevice = useRef(false)
  useEffect(() => {
    isTouchDevice.current = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice.current) {
      setVisible(true)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (reducedMotion || isTouchDevice.current) return

    const animate = () => {
      if (!followerRef.current || !dotRef.current) return

      followerX.current += (mouseX - followerX.current) * 0.15
      followerY.current += (mouseY - followerY.current) * 0.15
      dotX.current += (mouseX - dotX.current) * 0.3
      dotY.current += (mouseY - dotY.current) * 0.3

      followerRef.current.style.transform = `translate(${followerX.current - 20}px, ${followerY.current - 20}px)`
      dotRef.current.style.transform = `translate(${dotX.current - 4}px, ${dotY.current - 4}px)`

      requestAnimationFrame(animate)
    }

    animate()
  }, [mouseX, mouseY, reducedMotion])

  // Hover detection
  useEffect(() => {
    if (reducedMotion || isTouchDevice.current) return

    const hoverElements = 'a, button, .work-card, .skill-item, .filter-btn, .social-link, .contact-method, .float-item, .card, .btn, input, textarea'
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(hoverElements)) {
        setHovering(true)
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest(hoverElements)) {
        setHovering(false)
      }
    }

    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [reducedMotion])

  // Show cursor after first mouse move
  useEffect(() => {
    if (reducedMotion || isTouchDevice.current) return

    const handleMouseMove = () => {
      setVisible(true)
      document.removeEventListener('mousemove', handleMouseMove)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [reducedMotion])

  if (reducedMotion || isTouchDevice.current) {
    return null
  }

  return (
    <>
      <div
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 pointer-events-none z-cursor transform transition-transform duration-100 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          width: hovering ? '60px' : '40px',
          height: hovering ? '60px' : '40px',
          background: hovering ? 'var(--accent-primary)' : 'var(--accent-primary-dim)',
          borderColor: hovering ? 'transparent' : 'var(--accent-primary)',
        }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-cursor transform transition-transform duration-100 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: hovering ? 'translate(-50%, -50%) scale(0)' : `translate(${dotX.current - 4}px, ${dotY.current - 4}px)`,
        }}
        aria-hidden="true"
      />
    </>
  )
}