"use client"

import { useEffect, useRef, useState } from "react"

type RevealProps = {
  children: React.ReactNode
  className?: string
  as?: keyof JSX.IntrinsicElements
  delayMs?: number
}

export default function Reveal({ children, className, as = "div", delayMs = 0 }: RevealProps) {
  const Container = as as any
  const ref = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const element = ref.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delayMs > 0) {
              const timeout = setTimeout(() => setIsVisible(true), delayMs)
              return () => clearTimeout(timeout)
            }
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [delayMs])

  return (
    <Container
      ref={ref}
      className={`${className ?? ""} transition-all duration-700 will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </Container>
  )
}


