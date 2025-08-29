import Link from "next/link"

export default function ContactSuccessPage() {
  return (
    <div className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Thanks for reaching out!</h1>
        <p className="text-muted-foreground mb-8">Your message has been sent successfully. I’ll get back to you soon.</p>
        <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition">
          Back to Home
        </Link>
      </div>
    </div>
  )
}


