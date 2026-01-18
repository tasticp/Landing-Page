import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "TaskFlow Pro",
    description: "A comprehensive project management tool with real-time collaboration, Kanban boards, and advanced analytics dashboard for teams.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    websiteUrl: "https://taskflow-demo.vercel.app",
    sourceUrl: "https://github.com/alexchen/taskflow-pro",
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "A platform that leverages OpenAI API to generate SEO-optimized content, blog posts, and marketing copy for businesses.",
    tags: ["Next.js", "Python", "FastAPI", "OpenAI", "Redis"],
    sourceUrl: "https://github.com/alexchen/ai-content-generator",
  },
  {
    id: 3,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard for small businesses.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe", "Tailwind"],
    websiteUrl: "https://shop-demo.vercel.app",
    sourceUrl: "https://github.com/alexchen/ecommerce-platform",
  },
  {
    id: 4,
    title: "Real-Time Chat App",
    description: "A messaging application with end-to-end encryption, file sharing, and video calling capabilities built with WebRTC.",
    tags: ["Vue.js", "Firebase", "WebRTC", "Vuex", "Tailwind"],
    websiteUrl: "https://chat-demo.vercel.app",
    sourceUrl: "https://github.com/alexchen/realtime-chat",
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
            A collection of my personal and professional projects. I enjoy building full-stack applications, exploring new technologies, and solving complex problems through clean, efficient code.
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
