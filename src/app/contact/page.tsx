"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ContactPage() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitting(true)
    try {
      await fetch("/api/contact", { method: "POST", body: formData })
      router.push("/contact/success")
    } catch (_) {
      setSubmitting(false)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Contact Me</h1>
        <p className="text-muted-foreground mb-10 text-center">
          Fill out the form below and I’ll get back to you shortly.
        </p>

        <form onSubmit={onSubmit} className="space-y-6 bg-card p-6 rounded-lg border">

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="What’s this about?" className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" name="message" required rows={6} placeholder="Tell me a bit about your project" className="w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring" />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={submitting} className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition disabled:opacity-60">
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


