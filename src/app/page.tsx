import { Card, CardContent } from "@/componets/ui/card";
import { Badge } from "@/componets/ui/badge";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Particles from "@/components/Particles";
import ModernNav from "@/componets/ModernNav";
import Marquee from "@/components/Marquee";
import PartingClouds from "@/components/PartingClouds";

export default function Home() {
  const marqueeItems = [
    "🎨 Art • 🎵 Music • 📖 Stories • 💻 Coding • 🎮 Gaming",
    "Creating • Exploring • Learning • Building • Experimenting",
    "React • Next.js • TypeScript • Python • JavaScript • Rust",
  ];

  const projects = [
    {
      name: "Base44RogueLike",
      description:
        "An immersive JavaScript roguelike game with procedural generation and dynamic gameplay mechanics",
      techs: ["JavaScript", "Game Development"],
      url: "https://github.com/tasticp/Base44RogueLike",
      language: "JavaScript",
    },
    {
      name: "Browser Tasks Trial",
      description:
        "TypeScript-based browser task management and automation system for productivity tracking",
      techs: ["TypeScript", "Browser APIs"],
      url: "https://github.com/tasticp/Browser-tasks-trial-Est",
      language: "TypeScript",
    },
    {
      name: "Zed But Browser",
      description:
        "A Rust-based browser implementation inspired by the Zed editor architecture",
      techs: ["Rust", "Browser Engine"],
      url: "https://github.com/tasticp/Zed-But-Browser",
      language: "Rust",
    },
    {
      name: "Story Generator",
      description:
        "Python-powered creative writing tool that generates unique narratives and stories",
      techs: ["Python", "NLP"],
      url: "https://github.com/tasticp/story-generator",
      language: "Python",
    },
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
                  I'm Kelvin
                </h1>
                <h2 className="text-3xl md:text-5xl gradient-text">
                  Creative Developer
                </h2>
              </div>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Building innovative web experiences through JavaScript and
                exploring creative coding. Passionate about game development,
                storytelling, and pushing the boundaries of what's possible on
                the web.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Singapore 🇸🇬</span>
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
                Skills & Expertise
              </h2>
              <p className="text-xl text-muted-foreground">
                Technologies and tools I work with
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
                          Web interfaces
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Next.js</Badge>
                      <Badge variant="secondary">TypeScript</Badge>
                      <Badge variant="secondary">Tailwind CSS</Badge>
                      <Badge variant="secondary">JavaScript</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Backend & Systems */}
              <Reveal delayMs={100}>
                <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">B</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Systems</h3>
                        <p className="text-sm text-muted-foreground">
                          Languages & tools
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Python</Badge>
                      <Badge variant="secondary">Rust</Badge>
                      <Badge variant="secondary">C++</Badge>
                      <Badge variant="secondary">C</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>

              {/* Creative & Interests */}
              <Reveal delayMs={200}>
                <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">✨</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Interests</h3>
                        <p className="text-sm text-muted-foreground">
                          Hobbies & passions
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Game Dev</Badge>
                      <Badge variant="secondary">Art</Badge>
                      <Badge variant="secondary">Music</Badge>
                      <Badge variant="secondary">Storytelling</Badge>
                      <Badge variant="secondary">Creative Coding</Badge>
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
              My educational and learning journey
            </p>
          </Reveal>

          <div className="space-y-8 max-w-3xl mx-auto">
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">
                        Ngee Ann Polytechnic
                      </h3>
                      <p className="text-muted-foreground">
                        Diploma in Information Technology
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      2023 - Present
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Specializing in software development with focus on web
                    technologies and systems programming. Engaging in capstone
                    projects and collaborative development experiences.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Web Development
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Systems Design
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Team Projects
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
                      <h3 className="text-2xl font-bold">Self-Learning</h3>
                      <p className="text-muted-foreground">
                        Continuous Growth & Experimentation
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      Ongoing
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Building projects and exploring diverse technologies from
                    game development to systems programming. Active contributor
                    to open-source projects and experimental coding ventures.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Game Development
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Creative Coding
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Open Source
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Experimentation
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-muted/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground">
              Some of my recent work and experiments
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Reveal key={project.name} delayMs={index * 100}>
                <Card className="card-hover overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-300"></div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {project.techs.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <a
              href="https://github.com/tasticp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition"
            >
              <Github className="w-5 h-5" /> View All Projects on GitHub
            </a>
          </Reveal>
        </div>
      </section>

      {/* Hidden Routes - Portfolio */}
      <section id="portfolio" className="hidden-route py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Portfolio</h2>
          <p className="text-muted-foreground">
            This is a hidden route. You found it by typing the URL!
          </p>
          <p className="text-muted-foreground mt-4">
            Explore more of my creative works and detailed project breakdowns
            here.
          </p>
        </div>
      </section>

      {/* Hidden Routes - Personal */}
      <section id="personal" className="hidden-route py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Personal</h2>
          <p className="text-muted-foreground">
            This is a hidden personal section. Easter egg discovered! 🎉
          </p>
          <p className="text-muted-foreground mt-4">
            When I'm not coding, you can find me creating art, making music, or
            getting lost in storytelling. I believe in blending technical skills
            with creative expression to build unique experiences.
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
                © 2024 Kelvin Cheong. All rights reserved.
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
