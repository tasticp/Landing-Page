"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  websiteUrl?: string;
  sourceUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Social Sheild",
    description: "Pariatur id in ea eu ex consequat tempor nisi enim reprehenderit qui quis est ad.",
    tags: ["Typescript", "Javascript", "convex", "a0.dev"],
    websiteUrl: "https://taskflow-demo.vercel.app",
    sourceUrl: "https://github.com/tasticp/Social-Shield",
  },
  {
    id: 2,
    title: "International Obfuscated C Code Contest",
    description: "Velit mollit commodo proident sint.",
    tags: ["C", "CSS", "Makefile", "Cursor", "kiro"],
    sourceUrl: "https://github.com/tasticp/IOCCC",
  },
];

export function FeaturedProjects() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">featured projects</h2>
          <Link
            href="/projects"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            view more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors"
            >
              {/* Project image placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center border-b border-border/50">
                <div className="text-center p-4">
                  <div className="w-16 h-16 mx-auto rounded-lg bg-muted-foreground/20 flex items-center justify-center mb-3">
                    <span className="text-2xl text-muted-foreground/50">?</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add project screenshot
                  </p>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-muted/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {project.websiteUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href={project.websiteUrl}>
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    </Button>
                  )}
                  {project.sourceUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      asChild
                    >
                      <a href={project.sourceUrl}>
                        <Github className="h-3 w-3" />
                        Source
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
