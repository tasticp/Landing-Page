// Client-side component directive - required for React hooks
"use client"

// Import React for component functionality
import * as React from "react"
// Import Moon and Sun icons from lucide-react (actual icon library, not AI-generated)
import { Moon, Sun } from "lucide-react"
// Import useTheme hook from next-themes for theme management
import { useTheme } from "next-themes"

// Import Button component for the toggle button
import { Button } from "@/componets/ui/button"

// ThemeToggle component: Unique toggle switch for dark/light mode
// Features a smooth animated toggle with actual icons from lucide-react
export function ThemeToggle() {
  // Get current theme and setTheme function from next-themes
  const { theme, setTheme } = useTheme()
  // Check if current theme is dark mode
  const isDark = theme === "dark"
  // Track if component is mounted (prevents hydration mismatch)
  const [mounted, setMounted] = React.useState(false)

  // useEffect: Set mounted to true after component mounts on client
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10"
        aria-label="Toggle theme"
      >
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    // Unique toggle button with custom styling
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-10 h-10 overflow-hidden group hover:scale-110 transition-transform duration-300"
    >
      {/* Container for icons with relative positioning */}
      <div className="relative w-5 h-5">
        {/* Sun icon: Visible in dark mode, hidden in light mode */}
        {/* Smooth rotation and scale animations */}
        <Sun className="absolute inset-0 h-5 w-5 text-amber-500 dark:text-amber-400 rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 dark:opacity-0" />
        {/* Moon icon: Visible in light mode, hidden in dark mode */}
        {/* Smooth rotation and scale animations */}
        <Moon className="absolute inset-0 h-5 w-5 text-slate-700 dark:text-slate-300 rotate-90 scale-0 opacity-0 transition-all duration-500 dark:rotate-0 dark:scale-100 dark:opacity-100" />
      </div>
      {/* Glowing effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </Button>
  )
}
