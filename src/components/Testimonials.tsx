import Reveal from "@/components/Reveal"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Product Manager, TechCorp",
      quote:
        "Alex consistently delivered high-quality features on time. Communication was clear and proactive throughout.",
    },
    {
      name: "Michael Chen",
      role: "CTO, StartupXYZ",
      quote:
        "We saw a measurable lift in conversion after Alex refactored our frontend and improved performance.",
    },
    {
      name: "Priya Patel",
      role: "Founder, EduNext",
      quote:
        "A pleasure to work with. From ideation to launch, Alex was thorough and detail-oriented.",
    },
  ]

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Clients Say</h2>
          <p className="text-muted-foreground">Real feedback from recent collaborations</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delayMs={i * 100}>
              <div className="rounded-lg border p-6 bg-card card-hover">
                <p className="mb-4 leading-relaxed">“{t.quote}”</p>
                <div className="text-sm">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


