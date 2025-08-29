import Link from "next/link"
import { posts } from "@/lib/posts"

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">← Back to home</Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Blog</h1>
        <p className="text-muted-foreground mb-10">Insights on development, architecture, and performance.</p>

        <div className="space-y-6">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-lg border p-6 bg-card">
              <h2 className="text-xl font-semibold mb-1">
                <Link href={`/blog/${p.slug}`} className="hover:underline">{p.title}</Link>
              </h2>
              <div className="text-xs text-muted-foreground mb-3">{new Date(p.date).toLocaleDateString()}</div>
              <p className="text-muted-foreground mb-3">{p.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md border px-2 py-1">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}


