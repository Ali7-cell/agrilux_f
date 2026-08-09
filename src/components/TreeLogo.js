"use client";

export default function TreeLogo({ size = 40, showText = false, className = "", textColor = "inherit" }) {
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
          <linearGradient id="treeGradBg" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2ecc71" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="leafGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
          <linearGradient id="trunkGrad" x1="50" y1="65" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#3f2305" />
          </linearGradient>
          <filter id="treeGlowFilter" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Tree Trunk Base */}
        <path
          d="M44 65 C44 65 43 78 36 90 H64 C57 78 56 65 56 65 Z"
          fill="url(#trunkGrad)"
        />

        {/* Tree Foliage (Canopy Circle/Shield) */}
        <path
          d="M50 8 C25 8 10 26 10 48 C10 65 24 74 44 74 H56 C76 74 90 65 90 48 C90 26 75 8 50 8 Z"
          fill="url(#treeGradBg)"
          filter="url(#treeGlowFilter)"
        />

        {/* "Ag" Monogram Branches inside Green Foliage */}
        {/* Letter 'A' (Left branch) */}
        <path
          d="M31 58 L42 22 C43 19 46 19 47 22 L51 36"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 44 H48"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Letter 'g' (Right branch) */}
        <path
          d="M66 32 C60 32 55 36 55 42 C55 48 60 52 66 52 C72 52 75 47 75 41 V56 C75 63 69 66 62 66"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Leaf Accent details on top of tree */}
        <path d="M50 4 C50 4 54 11 48 15 C46 12 50 4 50 4 Z" fill="url(#leafGlow)" />
        <path d="M52 5 C52 5 60 9 57 16 C53 14 52 5 52 5 Z" fill="url(#leafGlow)" />
      </svg>

      {showText && (
        <span style={{ fontWeight: 800, fontSize: "1.45rem", letterSpacing: "-0.5px", color: textColor, fontFamily: "inherit" }}>
          Agri<span style={{ color: "#2ecc71" }}>lux</span>
        </span>
      )}
    </div>
  );
}
