export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  body: () => JSX.Element
}

export const posts: Post[] = [
  {
    slug: "improving-core-web-vitals",
    title: "Improving Core Web Vitals in Next.js",
    date: "2025-01-10",
    summary: "Practical steps to boost LCP, CLS, and INP using Next.js and modern tooling.",
    tags: ["Next.js", "Performance", "Core Web Vitals"],
    body: () => (
      <div>
        <p>
          In this post we walk through image optimization, critical CSS, and minimizing
          hydration work to improve Core Web Vitals.
        </p>
        <h3>Images and LCP</h3>
        <p>Prefer properly sized images, leverage Next Image, and avoid layout shifts.</p>
      </div>
    ),
  },
  {
    slug: "typed-forms-with-react-and-zod",
    title: "Typed Forms with React and Zod",
    date: "2025-01-24",
    summary: "Schema-driven validation and strong typing for forms without the pain.",
    tags: ["React", "TypeScript", "Zod"],
    body: () => (
      <div>
        <p>
          We explore structuring form state, validation with Zod, and how to keep the
          type system working for you.
        </p>
        <h3>Validation</h3>
        <p>Define a schema once and reuse it for both parsing and inference.</p>
      </div>
    ),
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}


