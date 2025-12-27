// Import UI components from the shadcn/ui library
// Button: A reusable button component with various styles
import { Button } from "@/componets/ui/button"
// Card and CardContent: Container components for displaying content in cards
import { Card, CardContent } from "@/componets/ui/card"
// Badge: Small label component for tags and status indicators
import { Badge } from "@/componets/ui/badge"
// Avatar components: Display user profile pictures with fallback support
import { Avatar, AvatarFallback, AvatarImage } from "@/componets/ui/avatar"
// ThemeToggle: Component to switch between light and dark themes
import { ThemeToggle } from "@/componets/theme-toggle"
// Import icons from lucide-react library for visual elements
import { Github, Linkedin, Mail, MapPin, Download, ExternalLink } from "lucide-react"
// Next.js Image component for optimized image loading
import Image from "next/image"
// Next.js Link component for client-side navigation
import Link from "next/link"
// Reveal component: Adds scroll-triggered animation effects
import Reveal from "@/components/Reveal"
// Particles component: Animated background particles for unique visual effect
import Particles from "@/components/Particles"

// Main Home component - the landing page
export default function Home() {
  return (
    // Main container: Sets minimum height to full screen and uses theme background
    // Relative positioning for particles overlay
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated particles background - adds unique visual flair */}
      <Particles />
      {/* Navigation Bar */}
      {/* Sticky navigation that stays at top when scrolling */}
      {/* Glass morphism effect with backdrop blur for modern look */}
      <nav className="border-b backdrop-blur-md sticky top-0 z-50 bg-background/70 glass">
        {/* Container with max width and horizontal padding */}
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* Flexbox layout: spaces logo and menu items */}
          <div className="flex items-center justify-between">
            {/* Brand/Logo text with gradient effect */}
            <div className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Tasticp_</div>
            {/* Desktop navigation menu (hidden on mobile, shown on md screens and up) */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Anchor link to About section */}
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
              {/* Anchor link to Experience section */}
              <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
              {/* Anchor link to Projects section */}
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
              {/* Link to Blog page using Next.js Link for client-side routing */}
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link>
              {/* Anchor link to Contact section */}
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              {/* Theme toggle button for switching between light/dark mode */}
              <ThemeToggle />
            </div>
            {/* Mobile navigation: Only shows theme toggle on small screens */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Main introduction area */}
      {/* Section with vertical padding and horizontal padding */}
      {/* Relative positioning for z-index layering */}
      <section className="py-20 px-6 relative z-10">
        {/* Container with max width, centered */}
        <div className="max-w-6xl mx-auto">
          {/* Grid layout: 2 columns on medium+ screens, 1 column on mobile */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column: Text content with reveal animation */}
            <Reveal className="space-y-6">
              {/* Greeting and heading section */}
              <div className="space-y-2">
                {/* Friendly greeting text */}
                <p className="text-muted-foreground text-lg">Hi there! 👋</p>
                {/* Main heading: Name and title */}
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  I'm Tasticp_, <br />
                  {/* Gradient text effect for "Vibe Developer" */}
                  <span className="gradient-text">Vibe Developer</span>
                </h1>
              </div>
              {/* Description paragraph */}
              <p className="text-xl text-muted-foreground leading-relaxed">
                Js F**king arnd IDK fam
              </p>
              {/* Location display with map pin icon */}
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Singapore, Singapore</span>
              </div>
              {/* Action buttons row */}
              <div className="flex gap-4">
                {/* Resume download link - opens PDF in new tab */}
                <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition">
                  <Download className="w-4 h-4" /> Resume
                </a>
                {/* Contact page link */}
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent transition-colors">
                  <Mail className="w-4 h-4" /> Get in Touch
                </Link>
              </div>
              {/* Social media links row */}
              <div className="flex gap-4">
                {/* GitHub profile link */}
                <a href="https://github.com/tasticp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </a>
                {/* LinkedIn profile link */}
                <a href="https://www.linkedin.com/in/kelvin-cheong-tasticp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </a>
                {/* Email link */}
                <a href="mailto:ricksue99@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </Reveal>
            {/* Right column: Profile image with reveal animation (100ms delay) */}
            <Reveal className="flex justify-center" delayMs={100}>
              {/* Relative positioning container for absolute positioned elements */}
              <div className="relative">
                {/* Profile image container with rounded corners and border */}
                <div className="w-80 h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                  {/* Next.js optimized image component */}
                  <Image
                    src="https://avatars.githubusercontent.com/u/170114934?v=4"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Status indicator: Green pulsing circle with checkmark */}
                {/* Enhanced with pulse-glow animation for unique effect */}
                <div className="absolute -bottom-4 -right-4 bg-green-500 w-12 h-12 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center pulse-glow">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills Section - Displays technical skills and technologies */}
      {/* Section with id for anchor navigation, muted background */}
      {/* Relative positioning for z-index layering */}
      <section id="about" className="py-20 px-6 bg-muted/50 relative z-10">
        {/* Container with max width */}
        <div className="max-w-6xl mx-auto">
          {/* Section header with reveal animation */}
          <Reveal className="text-center mb-16">
            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
            {/* Subtitle */}
            <p className="text-xl text-muted-foreground">Tools and technologies I work with</p>
          </Reveal>

          {/* Grid of skill cards: 3 columns on medium+ screens */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Developer Card */}
            <Reveal>
            {/* Card with hover effects and gradient border for uniqueness */}
            <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
              {/* Card content with padding */}
              <CardContent className="p-8">
                {/* Header section with icon and title */}
                <div className="flex items-center gap-3 mb-6">
                  {/* Icon container with gradient background */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    {/* Letter "F" for Frontend */}
                    <span className="text-white font-bold text-lg">F</span>
                  </div>
                  {/* Title and description */}
                  <div>
                    <h3 className="text-xl font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-muted-foreground">User-facing experiences</p>
                  </div>
                </div>
                {/* Technology badges */}
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

            {/* Backend Developer Card - with 100ms animation delay */}
            <Reveal delayMs={100}>
            <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  {/* Green to blue gradient icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    {/* Letter "B" for Backend */}
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Backend Developer</h3>
                    <p className="text-sm text-muted-foreground">Server-side logic & APIs</p>
                  </div>
                </div>
                {/* Backend technology badges */}
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

            {/* Tools & Workflow Card - with 200ms animation delay */}
            <Reveal delayMs={200}>
            <Card className="card-hover group hover:shadow-xl transition-all duration-300 gradient-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  {/* Orange to red gradient icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                    {/* Letter "T" for Tools */}
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Tools & Workflow</h3>
                    <p className="text-sm text-muted-foreground">Development environment</p>
                  </div>
                </div>
                {/* Development tools badges */}
                <div className="flex flex-wrap gap-2">
                  {/* VSCode badge with custom SVG icon */}
                  <Badge variant="secondary" className="hover:scale-105 transition-transform flex items-center gap-1">
                    {/* VSCode icon SVG path */}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.5 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.5 6.75a.75.75 0 00-1.5 0v2.25a.75.75 0 001.5 0V6.75zM6 15.75a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H6.75a.75.75 0 01-.75-.75zM18.75 12a.75.75 0 00-.75.75v2.25a.75.75 0 001.5 0V12.75a.75.75 0 00-.75-.75z"/>
                    </svg>
                    VSCode
                  </Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Cursor</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">Bun</Badge>
                  <Badge variant="secondary" className="hover:scale-105 transition-transform">same.new</Badge>
                  {/* GitHub badge with custom SVG icon */}
                  <Badge variant="secondary" className="hover:scale-105 transition-transform flex items-center gap-1">
                    {/* GitHub icon SVG path */}
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

      {/* Experience Section - Educational and professional background */}
      {/* Section with id for anchor navigation */}
      {/* Relative positioning for z-index layering */}
      <section id="experience" className="py-20 px-6 relative z-10">
        {/* Container with max width */}
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
            <p className="text-xl text-muted-foreground">My professional journey</p>
          </Reveal>

          {/* List of experience items with vertical spacing */}
          <div className="space-y-8">
            {/* First experience card: Sembawang Secondary School */}
            <Reveal>
            <Card className="card-hover">
              <CardContent className="p-6">
                {/* Flex layout: avatar on left, content on right */}
                <div className="flex items-start gap-4">
                  {/* Avatar component */}
                  <Avatar className="w-12 h-12">
                    {/* Avatar image (placeholder) */}
                    <AvatarImage src="/api/placeholder/48/48" />
                    {/* Fallback: Shows "SB" if image fails to load */}
                    <AvatarFallback className="bg-blue-100 text-blue-600">SB</AvatarFallback>
                  </Avatar>
                  {/* Content section */}
                  <div className="flex-1">
                    {/* Header with title and badge */}
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {/* Institution name */}
                        <h3 className="text-xl font-semibold">Sembawang Secondary School</h3>
                        {/* Role/type */}
                        <p className="text-blue-600 font-medium">Secondary Education</p>
                      </div>
                      {/* Timeline badge */}
                      <Badge variant="outline">—</Badge>
                    </div>
                    {/* Description list */}
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Completed secondary education at Sembawang Secondary</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            {/* Second experience card: ITE - with 100ms delay */}
            <Reveal delayMs={100}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    {/* Fallback: Shows "ITE" if image fails */}
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

            {/* Third experience card: Ngee Ann Polytechnic - with 200ms delay */}
            <Reveal delayMs={200}>
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/api/placeholder/48/48" />
                    {/* Fallback: Shows "NP" if image fails */}
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

      {/* Projects Section - Showcase of featured projects */}
      {/* Section with id and muted background */}
      {/* Relative positioning for z-index layering */}
      <section id="projects" className="py-20 px-6 bg-muted/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header with link to projects page */}
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Projects</h2>
            <p className="text-xl text-muted-foreground mb-4">Some of my recent work</p>
            {/* Link to full projects page */}
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline">
              Learn more →
            </Link>
          </Reveal>

          {/* Grid of project cards: 2 columns on medium+ screens */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* First project card: E-Commerce Platform */}
            <Reveal>
            {/* Card with overflow hidden for image, hover effects */}
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
              {/* Project image/thumbnail area with gradient background */}
              <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                {/* Overlay that changes on hover */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              {/* Card content */}
              <CardContent className="p-6">
                {/* Project title */}
                <h3 className="text-xl font-semibold mb-2">E-Commerce Platform</h3>
                {/* Project description */}
                <p className="text-muted-foreground mb-4">
                  Full-stack e-commerce solution with payment processing, inventory management, and analytics dashboard.
                </p>
                {/* Technology tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Stripe</Badge>
                </div>
                {/* Action buttons */}
                <div className="flex gap-2">
                  {/* Link to GitHub repository */}
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs hover:bg-accent transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  {/* Link to case study page */}
                  <Link href="/projects/ecommerce-platform" className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs text-primary-foreground hover:opacity-90 transition">
                    <ExternalLink className="w-4 h-4" /> Case Study
                  </Link>
                </div>
              </CardContent>
            </Card>
            </Reveal>

            {/* Second project card: Task Management App - with 100ms delay */}
            <Reveal delayMs={100}>
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 card-hover">
              {/* Different gradient for this project */}
              <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Management App</h3>
                <p className="text-muted-foreground mb-4">
                  Collaborative task management tool with real-time updates, team collaboration, and project tracking.
                </p>
                {/* Different technology stack */}
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

      {/* Contact Section - Call to action for collaboration */}
      {/* Section with id for anchor navigation */}
      {/* Relative positioning for z-index layering */}
      <section id="contact" className="py-20 px-6 relative z-10">
        {/* Centered container */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Header with reveal animation */}
          <Reveal className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Have a project in mind? Let's discuss how we can bring your ideas to life.
            </p>
          </Reveal>
          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            {/* Link to contact page */}
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition">
              <Mail className="w-4 h-4" /> Get in Touch
            </Link>
            {/* Resume download link */}
            <a href="/resume/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 hover:bg-accent transition-colors">
              <Download className="w-4 h-4" /> Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Site footer with copyright and social links */}
      {/* Footer with top border and glass morphism effect */}
      {/* Relative positioning for z-index layering */}
      <footer className="border-t py-8 px-6 relative z-10 glass">
        {/* Container with flex layout */}
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Copyright text */}
          <p className="text-muted-foreground">© 2025 Tasticp_. All rights reserved.</p>
          {/* Social media icons */}
          <div className="flex gap-4">
            {/* GitHub link */}
            <a href="https://github.com/tasticp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Github className="w-4 h-4" />
            </a>
            {/* LinkedIn link */}
            <a href="https://www.linkedin.com/in/kelvin-cheong-tasticp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Linkedin className="w-4 h-4" />
            </a>
            {/* Email link */}
            <a href="mailto:ricksue99@gmail.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md px-2 py-2 hover:scale-110 transition-transform">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
