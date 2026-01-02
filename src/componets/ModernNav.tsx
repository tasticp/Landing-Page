"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";

export default function ModernNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-gradient-to-b from-background via-background/95 to-background/80 border-b border-border/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="https://tasticp.carrd.co/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center font-bold text-background text-sm group-hover:scale-110 transition-transform duration-300 shadow-lg">
              T_
            </div>
            <span className="hidden sm:inline font-black text-lg text-foreground">
              tasticp
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#projects">Projects</NavLink>

            {/* Spacer */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-border/40 to-transparent mx-2"></div>

            {/* Social Links & Theme */}
            <div className="flex items-center gap-1">
              {/* GitHub */}
              <a
                href="https://github.com/tasticp"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/20 dark:hover:bg-accent/30 transition-all duration-300 group"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/20 dark:hover:bg-accent/30 transition-all duration-300 group"
                title="LinkedIn"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.725-2.004 1.424-.103.249-.129.597-.129.946v5.435h-3.555V9h3.555v1.561h.05c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.931-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.134-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:ricksue99@gmail.com"
                className="p-2.5 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/20 dark:hover:bg-accent/30 transition-all duration-300 group"
                title="Email"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>

              {/* CV Button */}
              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-400 dark:hover:to-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 dark:hover:shadow-purple-500/40"
              >
                CV
              </a>

              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-2 p-2.5 rounded-lg border border-border/40 bg-background/40 hover:bg-accent/20 hover:border-accent/60 transition-all duration-300 group"
                  aria-label={
                    theme === "dark"
                      ? "Switch to light mode"
                      : "Switch to dark mode"
                  }
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-foreground transition-all duration-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-foreground transition-all duration-500" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg border border-border/40 bg-background/40 hover:bg-accent/20 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-foreground" />
                ) : (
                  <Moon className="w-5 h-5 text-foreground" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-accent/20 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div
            ref={menuRef}
            className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/20 animate-in fade-in slide-in-from-top-2 duration-300 z-40"
          >
            <div className="px-4 py-4 space-y-3">
              <MobileNavLink href="#about" onClick={handleNavClick}>
                About
              </MobileNavLink>
              <MobileNavLink href="#experience" onClick={handleNavClick}>
                Experience
              </MobileNavLink>
              <MobileNavLink href="#projects" onClick={handleNavClick}>
                Projects
              </MobileNavLink>

              <div className="pt-3 border-t border-border/20 space-y-3">
                <a
                  href="https://github.com/tasticp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-center font-medium text-sm transition-colors cursor-pointer"
                  onClick={handleNavClick}
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-center font-medium text-sm transition-colors cursor-pointer"
                  onClick={handleNavClick}
                >
                  LinkedIn
                </a>
                <a
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-medium text-sm cursor-pointer"
                  onClick={handleNavClick}
                >
                  Download CV
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/15 transition-all duration-300 relative group"
    >
      {children}
      <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </a>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block px-4 py-2 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent/15 transition-all duration-300"
    >
      {children}
    </a>
  );
}
