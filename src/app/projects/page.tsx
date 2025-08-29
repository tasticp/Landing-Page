import Link from "next/link"
import { projects } from "@/lib/projects"

export default function ProjectsIndexPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Case Studies</h1>
        <p className="text-muted-foreground mb-10">Selected projects with brief summaries and tags.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="rounded-lg border p-6 bg-card hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-muted-foreground mb-3">{p.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md border px-2 py-1">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


