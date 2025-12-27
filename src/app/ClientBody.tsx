// Client-side component directive
// Required because this component uses React hooks (useEffect)
"use client";

// Import useEffect hook from React
// useEffect: Allows performing side effects in functional components
import { useEffect } from "react";

// ClientBody component: Wrapper component that cleans up body classes
// This component ensures the body element has consistent classes
// Useful for preventing browser extensions from adding unwanted classes
export default function ClientBody({
  children, // The content to be wrapped
}: {
  children: React.ReactNode; // TypeScript: children can be any React node
}) {
  // useEffect: Runs after component mounts (client-side only)
  // Empty dependency array [] means this runs once on mount
  useEffect(() => {
    // This runs only on the client after hydration
    // Set body className to just "antialiased" to remove any extension-added classes
    // This ensures consistent styling regardless of browser extensions
    document.body.className = "antialiased";
  }, []); // Empty array: run only once when component mounts

  // Return wrapper div with antialiased class
  // This provides consistent styling for the content
  return <div className="antialiased">{children}</div>;
}
