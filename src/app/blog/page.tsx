import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Eye } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "[Blog Post Title 1]",
    excerpt:
      "[Brief description of what this blog post is about. Add a compelling summary here.]",
    tags: ["Tag1", "Tag2", "Tag3"],
    date: "[Month Day, Year]",
    readTime: "[X] min read",
    views: 0,
    slug: "#",
  },
  {
    id: 2,
    title: "[Blog Post Title 2]",
    excerpt:
      "[Brief description of what this blog post is about. Add a compelling summary here.]",
    tags: ["Tag4", "Tag5", "Tag6"],
    date: "[Month Day, Year]",
    readTime: "[X] min read",
    views: 0,
    slug: "#",
  },
  {
    id: 3,
    title: "[Blog Post Title 3]",
    excerpt:
      "[Brief description of what this blog post is about. Add a compelling summary here.]",
    tags: ["Tag7", "Tag8"],
    date: "[Month Day, Year]",
    readTime: "[X] min read",
    views: 0,
    slug: "#",
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
            [Add a brief introduction about your blog here. Describe what topics
            you write about.]
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
