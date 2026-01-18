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
    title: "Shits im tryan learn",
    excerpt:
      "Enim officia dolor ut laboris ipsum magna magna labore deserunt enim aliqua sint aliquip in commodo.",
    tags: ["Node.js", "MINGW64", "smtg else", "Docker"],
    date: "NOW , 2026",
    readTime: "∞",
    views: 6969,
    slug: "/blog/Shits im tryna learn",
  },
  {
    id: 2,
    title: "Shits ive Learnt somewhat ?",
    excerpt:
      "Do laboris culpa consequat aute.",
    tags: ["git", "C", "C++", "Python","PLC","HTML","CSS","Javascript","Packet Tracer"],
    date: "NOW , 2026",
    readTime: "∞ min learn",
    views: 6969,
    slug: "/blog/Shits ive Learnt somewhat ?",
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
