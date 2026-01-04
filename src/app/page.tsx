import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { RecentPosts } from "@/components/RecentPosts";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ExperienceSection />
        <FeaturedProjects />
        <RecentPosts />
      </main>
      <Footer />
    </div>
  );
}
