import { Button } from "@/componets/ui/button"
import { Card, CardContent } from "@/componets/ui/card"
import { Badge } from "@/componets/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/componets/ui/avatar"
import { ThemeToggle } from "@/componets/theme-toggle"
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Testimonials from "@/components/Testimonials"
import Reveal from "@/components/Reveal"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">Tasticp_</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <ThemeToggle />
            </div>
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Reveal className="space-y-6">
              <div className="space-y-2">
                <p className="text-muted-foreground text-lg">Hi there! 👋</p>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  I'm Tasticp_, <br />
                  <span className="gradient-text">Vibe Developer</span>
                </h1>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Passionate about building exceptional applications and exploring new technologies.
                I spend most of my time crafting digital experiences that make you question me.
              </p>
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Singapore, Singapore</span>
              </div>
              <div className="flex gap-4">
                <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition">
                  <Download className="w-4 h-4" /> Resume
                </a>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent transition-colors">
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
              </div>
              <div className="flex gap-4">
                <a href="https://github.com/tasticp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/kelvin-cheong-tasticp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:ricksue99@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
            <Reveal className="flex justify-center" delayMs={100}>
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src="https://media.discordapp.net/attachments/941923680588546048/1416088973117489152/Gods_Type.jpg?ex=68c59320&is=68c441a0&hm=442d9c257f5a869a111747ad0c63f908b1eeeabaedf3dfecb957d3db2d8576c3&=&format=webp"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-green-500 w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="about" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-xl text-muted-foreground">Tools and technologies I work with</p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            <Reveal>
            <Card className="card-hover group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-muted-foreground">User-facing experiences</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">React</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Next.js</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">TypeScript</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Tailwind CSS</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Vue.js</Badge>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delayMs={100}>
            <Card className="card-hover group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Backend Developer</h3>
                    <p className="text-sm text-muted-foreground">Server-side logic & APIs</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Node.js</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Python</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">PostgreSQL</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">MongoDB</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">GraphQL</Badge>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delayMs={200}>
            <Card className="card-hover group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Tools & Workflow</h3>
                    <p className="text-sm text-muted-foreground">Development environment</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="hover:scale-105 transition-transform flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.5 6.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V6.75zM6 15.75a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM18.75 12a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0V12.75a.75.75 0 00-.75-.75z"/>
                    </svg>
                    VSCode
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Cursor</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Bun</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">same.new</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                    GitHub
                  </Badge>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-xl text-muted-foreground">My professional journey</p>
          </Reveal>

          <div className="space-y-8">
            <Reveal>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">SB</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">Sembawang Secondary School</h3>
                        <p className="text-blue-600 font-medium">Secondary Education</p>
                      </div>
                      <Badge variant="outline">—</Badge>
                    </div>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Completed secondary education at Sembawang Secondary</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delayMs={100}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-green-100 text-green-600">ITE</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">ITE (Institute of Technical Education)</h3>
                        <p className="text-blue-600 font-medium">Technical Studies</p>
                      </div>
                      <Badge variant="outline">—</Badge>
                    </div>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Coursework and hands-on technical projects</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delayMs={200}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">NP</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">Ngee Ann Polytechnic</h3>
                        <p className="text-blue-600 font-medium">Diploma Studies</p>
                      </div>
                      <Badge variant="outline">—</Badge>
                    </div>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Specialized modules and capstone project work</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
            <p className="text-xl text-muted-foreground mb-4">Some of my recent work</p>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
              Learn more →
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
                <p className="text-muted-foreground mb-4">
                  Full-stack e-commerce solution with payment processing, inventory management, and analytics dashboard.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Stripe</Badge>
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs hover:bg-accent transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <Link href="/projects/ecommerce-platform" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground hover:opacity-90 transition">
                    <ExternalLink className="w-4 h-4" /> Case Study
                  </Link>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            <Reveal delayMs={100}>
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Management App</h3>
                <p className="text-muted-foreground mb-4">
                  Collaborative task management tool with real-time updates, team collaboration, and project tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Socket.io</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Express</Badge>
                </div>
                <div className="flex gap-2">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs hover:bg-accent transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <Link href="/projects/task-management-app" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground hover:opacity-90 transition">
                    <ExternalLink className="w-4 h-4" /> Case Study
                  </Link>
                </div>
              </CardContent>
            </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
          </Reveal>
          <div className="flex justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition">
              <Mail className="w-4 h-4" /> Get in Touch
            </Link>
            <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent transition-colors">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-muted-foreground">© 2025 Tasticp_. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://github.com/tasticp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/kelvin-cheong-tasticp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:ricksue99@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
