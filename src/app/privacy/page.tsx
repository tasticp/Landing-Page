import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">privacy?</h1>
          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p>
              [Add your privacy policy content here. Explain what data you
              collect, how you use it, and how visitors can contact you about
              privacy concerns.]
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Data Collection
            </h2>
            <p>
              [Describe what data, if any, you collect from visitors to your
              site.]
            </p>
            <h2 className="text-2xl font-semibold text-foreground">
              Analytics
            </h2>
            <p>[If you use analytics tools, describe them here.]</p>
            <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
            <p>[Provide contact information for privacy-related inquiries.]</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
