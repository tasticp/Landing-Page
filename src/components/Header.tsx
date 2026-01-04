"use client";

import Link from "next/link";
import { useState } from "react";
import { Sun, Moon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("light", newTheme === "light");
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            home
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            projects
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => {}}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
