"use client";

export default function TreeLogo({ size = 34, showText = true, className = "", textColor = "inherit" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "10px" }} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="treeGradientMain" x1="50" y1="10" x2="50" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="treeGradientSub" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="treeTrunkGrad" x1="50" y1="65" x2="50" y2="92" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <filter id="treeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Tree Trunk */}
        <path
          d="M44 62 H56 V85 C56 89 60 91 63 92 H37 C40 91 44 89 44 85 V62 Z"
          fill="url(#treeTrunkGrad)"
        />

        {/* Bottom Canopy Layer */}
        <path
          d="M50 12 L84 58 C86 61 84 65 79 65 H21 C16 65 14 61 16 58 L50 12 Z"
          fill="url(#treeGradientMain)"
          filter="url(#treeGlow)"
        />

        {/* Middle Layer Canopy */}
        <path
          d="M50 20 L75 54 C77 57 75 60 70 60 H30 C25 60 23 57 25 54 L50 20 Z"
          fill="url(#treeGradientSub)"
          opacity="0.95"
        />

        {/* Top Canopy Highlight */}
        <path
          d="M50 28 L66 48 C68 51 66 53 61 53 H39 C34 53 32 51 34 48 L50 28 Z"
          fill="#6ee7b7"
          opacity="0.8"
        />

        {/* Organic Leaf Details */}
        <circle cx="50" cy="22" r="3" fill="#ffffff" opacity="0.6" />
        <circle cx="41" cy="38" r="2.5" fill="#ffffff" opacity="0.4" />
        <circle cx="59" cy="44" r="2.5" fill="#ffffff" opacity="0.4" />
      </svg>

      {showText && (
        <span style={{ fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.5px", color: textColor, fontFamily: "inherit" }}>
          Agri<span style={{ color: "#2ecc71" }}>lux</span>
        </span>
      )}
    </div>
  );
}
