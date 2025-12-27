// Client-side component directive - required for React hooks
"use client"

// Import React hooks
import { useEffect, useRef } from "react"

// Particles component: Creates animated floating particles in the background
// Adds a unique, dynamic visual element to the page
export default function Particles() {
  // useRef: Reference to the canvas element for drawing particles
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // useEffect: Set up particle animation when component mounts
  useEffect(() => {
    // Get canvas element and context
    const canvas = canvasRef.current
    if (!canvas) return

    // Get 2D rendering context for drawing
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class: Represents a single floating particle
    class Particle {
      x: number // X position
      y: number // Y position
      size: number // Particle radius
      speedX: number // Horizontal velocity
      speedY: number // Vertical velocity
      opacity: number // Transparency (0-1)

      constructor() {
        // Initialize particle at random position
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        // Random size between 1-3 pixels
        this.size = Math.random() * 2 + 1
        // Random velocity for movement
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        // Random opacity for depth effect
        this.opacity = Math.random() * 0.5 + 0.2
      }

      // Update particle position
      update() {
        // Move particle
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges (continuous movement)
        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      // Draw particle on canvas
      draw() {
        if (!ctx) return
        // Set fill color with opacity (purple/blue gradient colors)
        ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`
        ctx.beginPath()
        // Draw circle
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create array of particles (50 particles for subtle effect)
    const particles: Particle[] = []
    const particleCount = 50
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop: Continuously updates and redraws particles
    const animate = () => {
      // Clear canvas for next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw each particle
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connecting lines between nearby particles
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          // Calculate distance between particles
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Draw line if particles are close (within 150px)
          if (distance < 150) {
            ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 150)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      // Request next animation frame (smooth 60fps animation)
      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup: Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  // Render canvas element (invisible but draws particles)
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
      aria-hidden="true"
    />
  )
}
