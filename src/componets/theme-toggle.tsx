"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/componets/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-10 h-10 overflow-hidden rounded-lg border border-border/50 hover:border-border/80 bg-background/50 hover:bg-background/80 transition-all duration-300 group"
    >
      {/* Background gradient on hover */}
      <span className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

      {/* Icons container */}
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun icon - visible in dark mode */}
        <Sun className="absolute h-5 w-5 text-amber-500 dark:text-amber-400 rotate-0 scale-100 opacity-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 dark:opacity-0" />

        {/* Moon icon - visible in light mode */}
        <Moon className="absolute h-5 w-5 text-slate-700 dark:text-slate-300 rotate-90 scale-0 opacity-0 transition-all duration-500 dark:rotate-0 dark:scale-100 dark:opacity-100" />
      </div>

      {/* Animated glow effect on hover */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
    </Button>
  );
}
