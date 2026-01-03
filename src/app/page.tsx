import { Card, CardContent } from "@/componets/ui/card";
import { Badge } from "@/componets/ui/badge";
import { Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Particles from "@/components/Particles";
import ModernNav from "@/componets/ModernNav";
import PartingClouds from "@/components/PartingClouds";
import AudioPlayer from "@/components/AudioPlayer";
import Marquee from "@/components/Marquee";
import ExternalPlaylists from "@/components/ExternalPlaylists";

/**
 * Home page for Kelvin Cheong (tasticp_)
 *
 * This file replaces the generic placeholder content with Kelvin's personal
 * information, featured projects, links, and short biography. It is intentionally
 * concise and commented to make future edits straightforward.
 *
 * Deployment note: this site is intended to be deployed via Netlify. Make sure
 * your build settings point to the Next.js build output (if using static export)
 * or use an appropriate adapter/build pipeline for Netlify.
 */

export default function Home() {
  // Featured projects — keep these up-to-date with your GitHub repos.
  // Each entry has: name, description, tech stack tags, url and language hint.
  const projects = [
    {
      name: "Base44RogueLike",
      description:
        "A procedurally-generated roguelike built in JavaScript — focuses on replayability and procedural level systems.",
      techs: ["JavaScript", "Canvas", "Procedural Gen"],
      url: "https://github.com/tasticp/Base44RogueLike",
      language: "JavaScript",
    },
    {
      name: "Browser Tasks Trial",
      description:
        "A TypeScript experiment using browser APIs for task automation and in-page tooling.",
      techs: ["TypeScript", "Browser APIs"],
      url: "https://github.com/tasticp/Browser-tasks-trial-Est",
      language: "TypeScript",
    },
    {
      name: "Zed But Browser",
      description:
        "A Rust-based editor/browser experiment inspired by Zed's architecture and real-time editing ideas.",
      techs: ["Rust", "Systems"],
      url: "https://github.com/tasticp/Zed-But-Browser",
      language: "Rust",
    },
    {
      name: "Story Generator",
      description:
        "A creative Python tool to generate unique short stories and narrative seeds.",
      techs: ["Python", "NLP"],
      url: "https://github.com/tasticp/story-generator",
      language: "Python",
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background visual: particles */}
      <Particles />

      {/* Top navigation (keeps current look/feel) */}
      <ModernNav />

      {/* HERO */}
      <section className="pt-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: intro */}
            <Reveal className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <p className="text-muted-foreground text-lg">Hello — I'm</p>

                {/* Prominent name (animated gradient + neon glow for personality) */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight neon-glow animated-gradient p-2 rounded-md inline-block">
                  Kelvin Cheong
                  <span className="text-primary"> (tasticp_)</span>
                </h1>

                {/* Short tagline with typing animation for a unique hero feel */}
                <h2 className="text-3xl md:text-5xl gradient-text typing-animation">
                  Developer • Systems tinkerer • Game maker
                </h2>
              </div>

              {/* Short bio */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                I'm a developer and Mechatronics & Robotics student based in
                Singapore. I build games, experiment with systems-level
                projects, and contribute to open-source — I enjoy learning by
                building.
              </p>

              {/* Location */}
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Singapore 🇸🇬</span>
              </div>

              {/* Quick links */}
              <div className="flex gap-3">
                <a
                  href="https://github.com/tasticp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-muted transition"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="mailto:ricksue99@gmail.com"
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-muted transition"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
              </div>
            </Reveal>

            {/* Right: profile picture */}
            <Reveal className="flex justify-center" delayMs={100}>
              <div className="relative">
                {/* Profile image — GitHub avatar is used by default */}
                <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  <Image
                    src="https://avatars.githubusercontent.com/u/170114934?v=4"
                    alt="Kelvin (tasticp_)"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Small status badge */}
                <div className="absolute -bottom-4 -right-4 bg-green-500 w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center pulse-glow">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE: animated tech-stack scroller (pauses on hover) */}
      <div className="relative z-10">
        <Marquee
          items={[
            "React • Next.js • TypeScript • Tailwind CSS",
            "Rust • Python • Game Dev • Systems",
            "Web APIs • Creative Coding • Open Source",
          ]}
          speed={28}
        />
      </div>

      {/* ABOUT */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              I'm Kelvin — a student and maker who enjoys building things
              end-to-end. I work across web, games, and systems projects. I
              value curiosity, experimentation, and shipping small, meaningful
              projects.
            </p>
          </Reveal>

          {/* Short personal highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Current</h3>
                  <p className="text-muted-foreground">
                    Diploma in Mechatronics & Robotics — Ngee Ann Polytechnic.
                    Building projects, learning systems programming and control.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={100}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Interests</h3>
                  <p className="text-muted-foreground">
                    Game development, procedural systems, Rust, embedded &
                    browser experiments, creative tools.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={200}>
              <Card className="card-hover">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-2">Reach me</h3>
                  <p className="text-muted-foreground">
                    Email:{" "}
                    <a href="mailto:ricksue99@gmail.com">ricksue99@gmail.com</a>
                    <br />
                    Linktree:{" "}
                    <a
                      href="https://linktr.ee/Gods_Type"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linktr.ee/Gods_Type
                    </a>
                    <br />
                    Carrd:{" "}
                    <a
                      href="https://tasticp.carrd.co"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      tasticp.carrd.co
                    </a>
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* External Playlists + fun audio */}
      <div className="mt-12 relative z-10">
        <ExternalPlaylists />
      </div>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">Experience</h2>
            <p className="text-xl text-muted-foreground">
              Selected education and personal learning highlights
            </p>
          </Reveal>

          <div className="space-y-8 max-w-3xl mx-auto">
            {/* Ngee Ann Polytechnic */}
            <Reveal>
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">
                        Ngee Ann Polytechnic
                      </h3>
                      <p className="text-muted-foreground">
                        Diploma in Mechatronics & Robotics
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      2023 - Present
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Focused on software systems, control, and embedded projects.
                    Participating in capstone projects and group development.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Embedded
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Systems
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Teamwork
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {/* Self-directed learning */}
            <Reveal delayMs={100}>
              <Card className="card-hover">
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">Self-Learning</h3>
                      <p className="text-muted-foreground">
                        Open-source contributions & independent projects
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground px-3 py-1 bg-accent/50 rounded-full">
                      Ongoing
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    I build and iterate on side projects (games, Rust
                    experiments, Python tools) and publish work on GitHub for
                    feedback.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Open Source
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Game Dev
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

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 bg-muted/50 relative z-10">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Featured Projects
            </h2>
            <p className="text-xl text-muted-foreground">
              A selection of recent work — full list on GitHub.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Reveal key={project.name} delayMs={index * 80}>
                <Card className="card-hover overflow-hidden group">
                  {/* Visual header for the project card */}
                  <div className="h-44 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden" />
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

          <Reveal className="text-center mt-10">
            <a
              href="https://github.com/tasticp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground hover:opacity-90 transition"
            >
              <Github className="w-5 h-5" /> View all projects
            </a>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Navigation</h3>
              <div className="space-y-2">
                <a
                  href="#about"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  About
                </a>
                <a
                  href="#experience"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Experience
                </a>
                <a
                  href="#projects"
                  className="block text-muted-foreground hover:text-foreground"
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
                  className="block text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
                <a
                  href="https://linktr.ee/Gods_Type"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Linktree
                </a>
                <a
                  href="https://tasticp.carrd.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Carrd
                </a>
                <a
                  href="mailto:ricksue99@gmail.com"
                  className="block text-muted-foreground hover:text-foreground"
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
                  className="block text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
                <a
                  href="/resume/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-muted-foreground hover:text-foreground"
                >
                  CV
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border/40 pt-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Kelvin Cheong (tasticp_)
              </p>
              <div className="flex gap-4 items-center">
                <a
                  href="https://github.com/tasticp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="w-5 h-5" />
                </a>

                {/* Inline audio control (optional) */}
                <div className="flex items-center">
                  <AudioPlayer />
                </div>

                <a
                  href="https://www.linkedin.com/in/kelvin-cheong-tasticp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="mailto:ricksue99@gmail.com"
                  className="text-muted-foreground hover:text-foreground"
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
