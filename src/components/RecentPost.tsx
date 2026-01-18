"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  tags: string[];
  date: string;
  readTime: string;
  views: number;
  slug: string;
}

const posts: BlogPost[] = [
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
];

export function RecentPosts() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">recent posts</h2>
          <Link
            href="/blog"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            view more
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

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
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs bg-muted/80"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-muted/80"
                          >
                            +{post.tags.length - 3}
                          </Badge>
                        )}
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
    </section>
  );
}
