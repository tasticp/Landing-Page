export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Product Manager, TechCorp",
      quote:
        "We Know.",
    },
    {
      name: "Michael Chen",
      role: "CTO, StartupXYZ",
      quote:
        "We Make.",
    },
    {
      name: "Priya Patel",
      role: "Founder, EduNext",
      quote:
        "We Show",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Clients Say</h2>
          <p className="text-muted-foreground">Real feedback from recent collaborations</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-lg border p-6 bg-card card-hover">
              <p className="mb-4 leading-relaxed">“{t.quote}”</p>
              <div className="text-sm">
                <p className="font-semibold">{t.name}</p>
                <p className="text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


