"use client";

import { useEffect, useState } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
}

export default function Marquee({
  items,
  speed = 50,
  direction = "left",
}: MarqueeProps) {
  const [displayItems, setDisplayItems] = useState<string[]>([]);

  useEffect(() => {
    // Duplicate items for seamless loop
    setDisplayItems([...items, ...items]);
  }, [items]);

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 py-6 border-y border-border/40">
      <div
        className="flex gap-8"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 flex-shrink-0">
            <span className="text-lg font-semibold text-foreground/80 whitespace-nowrap">
              {item}
            </span>
            <div className="w-1 h-1 rounded-full bg-foreground/40"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
