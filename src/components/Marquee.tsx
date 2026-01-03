"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type MarqueeProps = {
  /**
   * Array of strings to display in the marquee.
   * Each string will be shown in sequence and duplicated for a seamless loop.
   */
  items: string[];
  /**
   * Speed value (higher = slower). This maps directly to the animation duration in seconds.
   * Example:
   *  - `speed={20}` -> 20s full loop (default)
   *  - `speed={80}` -> 80s full loop (much slower)
   *
   * If omitted the component uses 20 seconds as a sensible default.
   */
  speed?: number;
  /**
   * Optional additional CSS classes for the root container
   */
  className?: string;
};

/**
 * Marquee component
 *
 * - Uses the `.marquee` and `.marquee-content` CSS in `global.css` (the project already
 *   contains keyframes and hover-to-pause rules).
 * - Accepts `items` and `speed` props. `speed` is interpreted as seconds for the full
 *   animation loop (higher = slower) to match the project's UI notes.
 * - Duplicates the items content so the CSS animation can loop seamlessly.
 * - Respects the user's `prefers-reduced-motion` setting and disables the animation when requested.
 */
export default function Marquee({ items, speed = 20, className = "" }: MarqueeProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // The computed animation duration in seconds. We clamp to a minimum so the text
  // doesn't race by too quickly if someone supplies a tiny value.
  const durationSeconds = useMemo(() => {
    const v = typeof speed === "number" ? Math.max(6, speed) : 20; // minimum 6s
    return v;
  }, [speed]);

  useEffect(() => {
    // Respect user's reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setPrefersReducedMotion(Boolean(mq.matches));
    handler();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      // Older browsers
      // @ts-ignore
      mq.addListener(handler);
      return () => {
        // @ts-ignore
        mq.removeListener(handler);
      };
    }
  }, []);

  useEffect(() => {
    // Apply the computed animation duration to the marquee content element.
    // The project's global stylesheet attaches `animation: marquee 20s linear infinite;`
    // so overriding `animationDuration` is enough to change speed.
    const el = contentRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.animationPlayState = "paused";
      el.style.animationDuration = "0s";
    } else {
      el.style.animationPlayState = "running";
      el.style.animationDuration = `${durationSeconds}s`;
    }
  }, [durationSeconds, prefersReducedMotion]);

  // For accessibility: render a non-animated list that screen readers can read easily.
  // This avoids screen readers trying to follow the moving text.
  const srList = (
    <ul role="list" aria-hidden="false" className="sr-only">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );

  // Duplicate items for a smooth, continuous loop (CSS moves the entire container).
  const repeatedItems = [...items, ...items];

  return (
    <section
      // Provide a descriptive region for assistive tech
      aria-label="Skills marquee"
      className={`marquee ${className}`}
      title="Skills and tech stack — hover to pause"
    >
      {/* Screen-reader friendly list (hidden visually) */}
      {srList}

      {/* Visual marquee content. The project's global.css defines .marquee-content animation
          and hover behavior (pause on hover). We set animationDuration inline so 'speed' prop works. */}
      <div
        ref={contentRef}
        className="marquee-content"
        // inline style is kept empty because we set animationDuration from JS (see useEffect).
        // We still include role/presentation so assistive tech won't re-announce animated text.
        role="presentation"
        aria-hidden="true"
      >
        {repeatedItems.map((text, idx) => (
          <span
            key={`${idx}-${text}`}
            className="inline-block text-sm md:text-base px-4 py-2 text-muted-foreground"
          >
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
