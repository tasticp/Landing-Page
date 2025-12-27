// Import Next.js Metadata type for page metadata configuration
import type { Metadata } from "next";
// Import Google Fonts: Geist (sans-serif) and Geist Mono (monospace)
import { Geist, Geist_Mono } from "next/font/google";
// Import global CSS styles
import "./global.css";
// Import ThemeProvider component for dark/light mode support
import { ThemeProvider } from "@/componets/theme-provider";

// Configure Geist font: Main sans-serif font for the site
// variable: CSS variable name to use this font
// subsets: Character sets to include (latin covers most languages)
const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Configure Geist Mono font: Monospace font for code blocks
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Export metadata: SEO and page information
export const metadata: Metadata = {
  // Page title shown in browser tab
  title: "Tasticp_ - Vibe Developer",
  // Meta description for search engines and social sharing
  description: "Passionate about building exceptional web applications and exploring new technologies.",
};

// RootLayout: Wraps all pages in the application
// This is the root component that Next.js uses for all pages
export default function RootLayout({
  children, // All page content will be passed as children
}: Readonly<{
  children: React.ReactNode; // TypeScript: children must be a React node
}>) {
  return (
    // HTML root element
    // lang="en": Sets language to English for accessibility
    // suppressHydrationWarning: Prevents warnings about theme class mismatches
    <html lang="en" suppressHydrationWarning>
      {/* Body element with font classes applied */}
      <body
        // Apply font variables as CSS classes
        // These will be available throughout the app via CSS variables
        className={`${geist.variable} ${geistMono.variable} antialiased`}
      >
        {/* ThemeProvider: Enables dark/light mode switching */}
        <ThemeProvider
          attribute="class" // Theme is controlled via HTML class attribute
          defaultTheme="dark" // Default to dark theme
          enableSystem // Allow system preference detection
          disableTransitionOnChange // Disable transitions when theme changes (prevents flash)
        >
          {/* Render all page content */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
