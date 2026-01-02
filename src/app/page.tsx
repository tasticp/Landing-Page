// Import UI components from the shadcn/ui library
import { Card, CardContent } from "@/componets/ui/card";
import { Badge } from "@/componets/ui/badge";
// Import icons from lucide-react library for visual elements
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
// Next.js Image component for optimized image loading
import Image from "next/image";
// Next.js Link component for client-side navigation
import Link from "next/link";
// Custom components
import Reveal from "@/components/Reveal";
import Particles from "@/components/Particles";
import ModernNav from "@/componets/ModernNav";
import Marquee from "@/components/Marquee";
import PartingClouds from "@/components/PartingClouds";

// Main Home component - the landing page
export default function Home() {
  const marqueeItems = [
    "React • Next.js • TypeScript • Tailwind CSS • Vue.js",
    "Node.js • Express • Python • SQL • MongoDB",
    "Web Development • UI/UX • Full Stack • Cloud Architecture",
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated particles background */}
      <Particles />

      {/* Modern Navigation */}
      <ModernNav />

      {/* Hero Section with padding for fixed nav */}
      <section className="pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column: Text content */}
            <Reveal className="space-y-8">
              {/* Greeting and heading */}
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg">Welcome 👋</p>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  I'm Tasticp_
                </h1>
                <h2 className="text-3xl md:text-5xl gradient-text">
                  Vibe Developer
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Building exceptional web experiences. JavaScript explorer,
                design enthusiast, and perpetual learner.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Singapore, Singapore</span>
              </div>
            </Reveal>

            {/* Right column: Profile image */}
            <Reveal className="flex justify-center" delayMs={100}>
              <div className="relative">
                <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src="https://avatars.githubusercontent.com/u/170114934?v=4"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-4 -right-4 bg-green-500 w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center pulse-glow">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="mt-20 relative z-10">
        <Marquee items={marqueeItems} speed={50} />
      </div>

      {/* Skills Section with Parting Clouds */}
      <PartingClouds>
        <section id="about" className="py-20 px-6 bg-muted/50 relative z-10">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Skills & Technologies
              </h2>
              <p className="text-xl text-muted-foreground">
                Tools and technologies I work with
              </p>
            </Reveal>

            {/* Skill cards grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Frontend */}
              <Reveal>
                <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Frontend</h3>
                        <p className="text-sm text-muted-foreground">
                          User interfaces
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">Vue.js</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Backend */}
              <Reveal delayMs={100}>
                <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">B</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Backend</h3>
                        <p className="text-sm text-muted-foreground">
                          Server-side logic
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">Express</Badge>
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">SQL</Badge>
                      <Badge variant="secondary">MongoDB</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Tools & Others */}
              <Reveal delayMs={200}>
                <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">T</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Tools</h3>
                        <p className="text-sm text-muted-foreground">
                          Development tools
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Git</Badge>
                      <Badge variant="secondary">Docker</Badge>
                      <Badge variant="secondary">AWS</Badge>
                      <Badge variant="secondary">Figma</Badge>
                      <Badge variant="secondary">REST APIs</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            </div>
          </div>
        </section>
      </PartingClouds>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
            <p className="text-xl text-muted-foreground">
              Where I've worked and what I've built
            </p>
          </Reveal>

          <div className="space-y-8 max-w-3xl mx-auto">
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">Software Developer</h3>
                      <p className="text-muted-foreground">Tech Company Name</p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      2023 - Present
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Building amazing web experiences with modern technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      TypeScript
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={100}>
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">Junior Developer</h3>
                      <p className="text-muted-foreground">Startup XYZ</p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      2022 - 2023
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Contributed to full-stack development and learned best
                    practices
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      JavaScript
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      CSS
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects Section - Regular, visible */}
      <section id="projects" className="py-20 px-6 bg-muted/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground">
              Some of my recent work
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <Card className="card-hover overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project Name</h3>
                  <p className="text-muted-foreground mb-4">
                    Brief description of the project and its impact
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        React
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        API
                      </Badge>
                    </div>
                    <a
                      href="#"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={100}>
              <Card className="card-hover overflow-hidden group">
                <div className="h-48 bg-gradient-to-br from-pink-500 to-red-600 relative overflow-hidden">
                  <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Another Project</h3>
                  <p className="text-muted-foreground mb-4">
                    Description of what you built and learned
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        Next.js
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Design
                      </Badge>
                    </div>
                    <a
                      href="#"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Hidden Routes - Portfolio */}
      <section id="portfolio" className="hidden-route py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Portfolio</h2>
          <p className="text-muted-foreground">
            This is a hidden route. You found it by typing the URL!
          </p>
        </div>
      </section>

      {/* Hidden Routes - Personal */}
      <section id="personal" className="hidden-route py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Personal</h2>
          <p className="text-muted-foreground">
            This is a hidden personal section. Easter egg discovered!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </a>
                <a
                  href="#experience"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Projects
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="space-y-2">
                <a
                  href="https://github.com/tasticp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:ricksue99@gmail.com"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <Link
                  href="/blog"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <a
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  CV
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © 2024 Tasticp_. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/tasticp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:ricksue99@gmail.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
