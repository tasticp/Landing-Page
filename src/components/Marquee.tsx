"use client";

export default function Marquee() {
  const items = ["🎨 Art", "🎵 Music", "📖 Stories", "💻 Coding", "🎮 Gaming"];

  return (
    <div className="w-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 py-8 border-y border-border/40 overflow-hidden">
      <div className="marquee-container">
        {/* First set of content */}
        <div className="marquee-content">
          {items.map((item, index) => (
            <span key={`first-${index}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>

        {/* Duplicate second set for seamless loop */}
        <div className="marquee-content">
          {items.map((item, index) => (
            <span key={`second-${index}`} className="marquee-item">
              {item}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          display: flex;
          gap: 0;
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          gap: 2rem;
          animation: scroll-left 25s linear infinite;
          padding-right: 2rem;
        }

        /* Offset second set to create seamless loop */
        .marquee-content:nth-child(2) {
          animation-delay: -12.5s;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .marquee-item {
          display: inline-block;
          white-space: nowrap;
          font-size: 1.125rem;
          font-weight: 600;
          color: hsl(var(--foreground) / 0.8);
          padding: 0 1rem;
          flex-shrink: 0;
        }

        /* Pause on hover */
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
