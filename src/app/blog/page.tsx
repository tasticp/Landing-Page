import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "Building Scalable Microservices with Node.js",
    excerpt:
      "Learn how to design and implement microservices architecture using Node.js, including best practices for communication, data management, and deployment strategies.",
    tags: ["Node.js", "Microservices", "Architecture", "Docker"],
    date: "Dec 15, 2024",
    readTime: "8 min read",
    views: 1245,
    slug: "/blog/microservices-nodejs",
  },
  {
    id: 2,
    title: "TypeScript Best Practices for React Applications",
    excerpt:
      "Discover essential TypeScript patterns and techniques for building robust React applications with proper type safety and improved developer experience.",
    tags: ["TypeScript", "React", "Best Practices", "Frontend"],
    date: "Nov 28, 2024",
    readTime: "6 min read",
    views: 892,
    slug: "/blog/typescript-react-best-practices",
  },
  {
    id: 3,
    title: "Optimizing React Performance: Advanced Techniques",
    excerpt:
      "Deep dive into React performance optimization techniques including memoization, code splitting, and virtual scrolling for large applications.",
    tags: ["React", "Performance", "Optimization", "JavaScript"],
    date: "Nov 10, 2024",
    readTime: "10 min read",
    views: 1567,
    slug: "/blog/react-performance-optimization",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8">blog</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Thoughts on web development, software architecture, and emerging technologies. I share insights from my professional experience and personal projects.
          </p>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.id} href={post.slug}>
                <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-muted/80"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-start md:items-end gap-2 md:gap-1 text-sm text-muted-foreground shrink-0">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3.5 w-3.5" />
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
