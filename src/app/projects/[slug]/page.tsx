import { notFound } from "next/navigation"
import Link from "next/link"
import { getProjectBySlug } from "@/lib/projects"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return notFound()

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/projects" className="text-sm text-muted-foreground hover:underline">← Back to all projects</Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{project.title}</h1>
        <p className="text-muted-foreground mb-6">{project.summary}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((t) => (
            <span key={t} className="rounded-md border px-2 py-1 text-xs">{t}</span>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            This case study outlines the goals, process, and results for <strong>{project.title}</strong>.
          </p>
          <h3>Problem</h3>
          <p>
            Describe the problem space, constraints, and success metrics.
          </p>
          <h3>Solution</h3>
          <p>
            Summarize the approach, architecture, and key implementation details.
          </p>
          <h3>Results</h3>
          <ul>
            <li>Improved performance and user engagement</li>
            <li>Reduced operational overhead</li>
            <li>Positive user feedback and business impact</li>
          </ul>
        </div>
      </div>
    </div>
  )
}


