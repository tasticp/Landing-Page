import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug } from "@/lib/posts"

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return notFound()

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">← Back to home</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/blog" className="text-sm text-muted-foreground hover:underline">Blog</Link>
        </div>
        <Link href="/blog" className="text-sm text-muted-foreground hover:underline">← Back to blog</Link>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-2">{post.title}</h1>
        <div className="text-xs text-muted-foreground mb-6">{new Date(post.date).toLocaleDateString()}</div>

        <div className="prose dark:prose-invert max-w-none">
          <post.body />
        </div>
      </div>
    </div>
  )
}


