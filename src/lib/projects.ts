export type Project = {
  slug: string
  title: string
  summary: string
  tags: string[]
}

export const projects: Project[] = [
  {
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    summary:
      "Full-stack e-commerce solution with payments, inventory, and analytics.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    summary:
      "Collaborative task management with real-time updates and team workflows.",
    tags: ["React", "Socket.io", "MongoDB", "Express"],
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}


