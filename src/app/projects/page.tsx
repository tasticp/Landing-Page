import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "[Project Name 1]",
    description: "[Brief description of your project and what it does]",
    tags: ["React", "TypeScript", "Tailwind", "Node.js"],
    websiteUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 2,
    title: "[Project Name 2]",
    description: "[Brief description of your project and what it does]",
    tags: ["Python", "FastAPI", "Docker", "PostgreSQL"],
    sourceUrl: "#",
  },
  {
    id: 3,
    title: "[Project Name 3]",
    description: "[Brief description of your project and what it does]",
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    websiteUrl: "#",
    sourceUrl: "#",
  },
  {
    id: 4,
    title: "[Project Name 4]",
    description: "[Brief description of your project and what it does]",
    tags: ["Vue.js", "Firebase", "Tailwind"],
    websiteUrl: "#",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">projects</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            [Add a brief introduction about your projects here. Describe what
            kind of projects you work on and what you're passionate about.]
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors"
              >
                <div className="aspect-video bg-muted flex items-center justify-center border-b border-border/50">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-muted-foreground/20 flex items-center justify-center mb-3">
                      <span className="text-2xl text-muted-foreground/50">
                        ?
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Add project screenshot
                    </p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
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
      </main>
      <Footer />
    </div>
  );
}
