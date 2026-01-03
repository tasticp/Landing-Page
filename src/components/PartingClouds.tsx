"use client";

import { useEffect, useRef, useState } from "react";

interface PartingCloudsProps {
  children: React.ReactNode;
  triggerOffset?: number;
}

export default function PartingClouds({
  children,
  triggerOffset = 0.3,
}: PartingCloudsProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: triggerOffset,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      // Capture the current elementRef value to avoid using a stale ref in the cleanup.
      // This prevents the eslint/react-hooks warning about reading `elementRef.current`
      // inside the cleanup where it might have changed.
      const current = elementRef.current;
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [triggerOffset]);

  return (
    <div
      ref={elementRef}
      className={`relative overflow-hidden ${isVisible ? "parting-clouds" : ""}`}
    >
      <div className={`${isVisible ? "parting-clouds-element" : ""}`}>
        {children}
      </div>
    </div>
  );
}
