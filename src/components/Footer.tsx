"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-8 mt-12">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span>&copy; {currentYear}</span>
          <Link href="/" className="hover:text-foreground transition-colors">
          https://tasticp.github.io/
          </Link>
          <span>|</span>
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            privacy ?
          </Link>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <a href="https://www.linkedin.com/in/kelvin-cheong-tasticp/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <a href="https://github.com/tasticp" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" asChild>
            <a href="ricksue99@gmail.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
