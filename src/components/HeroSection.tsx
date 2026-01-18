"use client";

import { Button } from "@/components/ui/button";
import { Linkedin, Github, Mail, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left side - Text content */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                hi Alex Chen here.
              </h1>
              <p className="text-lg text-muted-foreground">
                28yo Full Stack Developer from Singapore
              </p>
            </div>

            <p className="text-foreground/90 max-w-md">
              Passionate about creating elegant solutions to complex problems. I build scalable web applications and delightful user experiences.
            </p>

            <p className="text-foreground">
              Open to collaborations and exciting opportunities
            </p>

            <p className="text-sm text-muted-foreground">
              Currently exploring{" "}
              <a href="#" className="text-primary hover:underline">
                AI/ML integration
              </a>{" "}
              in web applications.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Button variant="outline" className="gap-2" asChild>
                <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <a href="https://linkedin.com/in/alexchen" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <a href="https://github.com/alexchen" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
                <a href="mailto:alex.chen@example.com">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right side - Profile photo placeholder */}
          <div className="relative">
            <div className="w-64 h-80 md:w-72 md:h-96 rounded-lg overflow-hidden bg-card border-2 border-border shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-card">
                <div className="text-center p-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-muted-foreground/20 flex items-center justify-center mb-4">
                    <span className="text-4xl text-muted-foreground/50">AC</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Alex Chen
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
