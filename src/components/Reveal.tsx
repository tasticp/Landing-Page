// Client-side component directive - required for using React hooks
"use client"

// Import React hooks for component functionality
// useEffect: Runs side effects after component renders
// useRef: Creates a mutable reference to DOM elements
// useState: Manages component state
import { useEffect, useRef, useState } from "react"

// TypeScript type definition for Reveal component props
type RevealProps = {
  // The content to be revealed (can be any React node)
  children: React.ReactNode
  // Optional CSS classes to apply to the container
  className?: string
  // Optional delay in milliseconds before revealing (defaults to 0)
  delayMs?: number
}

// Reveal component: Adds scroll-triggered fade-in and slide-up animation
// This component uses Intersection Observer API to detect when element enters viewport
export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  // useRef: Creates a reference to the DOM element we want to observe
  // null is the initial value (will be set when component mounts)
  const ref = useRef<HTMLDivElement | null>(null)
  
  // useState: Tracks whether the element is visible in the viewport
  // false = hidden initially, true = visible after animation
  const [isVisible, setIsVisible] = useState(false)

  // useEffect: Sets up Intersection Observer when component mounts
  // Runs once on mount and when delayMs changes
  useEffect(() => {
    // Early return if ref is not attached to an element
    if (!ref.current) return
    // Store element reference for cleanup
    const element = ref.current

    // Create Intersection Observer to watch when element enters viewport
    const observer = new IntersectionObserver(
      // Callback function: Called when element visibility changes
      (entries) => {
        // Loop through all observed entries (usually just one)
        entries.forEach((entry) => {
          // Check if element is intersecting (visible in viewport)
          if (entry.isIntersecting) {
            // If delay is specified, wait before showing
            if (delayMs > 0) {
              // setTimeout: Delays the visibility change
              const timeout = setTimeout(() => setIsVisible(true), delayMs)
              // Return cleanup function to clear timeout if component unmounts
              return () => clearTimeout(timeout)
            }
            // If no delay, show immediately
            setIsVisible(true)
          }
        })
      },
      // Observer options: threshold of 0.15 means trigger when 15% visible
      { threshold: 0.15 }
    )

    // Start observing the element
    observer.observe(element)
    
    // Cleanup function: Stop observing when component unmounts
    // This prevents memory leaks
    return () => observer.unobserve(element)
  }, [delayMs]) // Dependency array: Re-run if delayMs changes

  // Render the component with animation classes
  return (
    <div
      // Attach ref so we can observe this element
      ref={ref}
      // Dynamic className: combines provided classes with animation classes
      className={`${className ?? ""} transition-all duration-700 will-change-transform ${
        // Conditional classes based on visibility state
        // When visible: fully opaque and in normal position
        // When hidden: transparent and shifted down 6 units
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Render children inside the animated container */}
      {children}
    </div>
  )
}

