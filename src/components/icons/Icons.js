"use client";

import React from "react";

// Standard Agrilux Theme Colors
const LIME = "#9FD23A";
const GREEN = "#404F1D";

export function CropIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 20h10" />
      <path d="M12 20V4" />
      <path d="M12 4c-3 0-6 3-6 7 4 0 6-2 6-7z" fill={color} fillOpacity="0.2" />
      <path d="M12 4c3 0 6 3 6 7-4 0-6-2-6-7z" fill={color} fillOpacity="0.2" />
      <path d="M12 11c-4 0-7 3-7 6 4 0 7-2 7-6z" fill={color} fillOpacity="0.2" />
      <path d="M12 11c4 0 7 3 7 6-4 0-7-2-7-6z" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function FertilizerIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 3h6v3H9z" fill={color} fillOpacity="0.3" />
      <path d="M10 6L5.5 15.5A4 4 0 009 21h6a4 4 0 003.5-5.5L14 6" />
      <circle cx="12" cy="15" r="1.5" fill={color} />
      <circle cx="9.5" cy="17.5" r="1" fill={color} />
      <circle cx="14.5" cy="17.5" r="1" fill={color} />
    </svg>
  );
}

export function YieldIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 20h18" />
      <path d="M4 17l5-6 4 3 6-8" />
      <path d="M19 6h-4v4" fill={color} fillOpacity="0.3" />
      <circle cx="9" cy="11" r="2" fill={color} />
      <circle cx="13" cy="14" r="2" fill={color} />
      <circle cx="19" cy="6" r="2" fill={color} />
    </svg>
  );
}

export function RobotIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="11" width="18" height="10" rx="3" fill={color} fillOpacity="0.15" />
      <circle cx="8.5" cy="16" r="1.5" fill={color} />
      <circle cx="15.5" cy="16" r="1.5" fill={color} />
      <path d="M10 19h4" />
      <path d="M12 4v7" />
      <circle cx="12" cy="3" r="1.5" fill={color} />
      <path d="M2 15h1" />
      <path d="M21 15h1" />
    </svg>
  );
}

export function LocationIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21s-7-7.3-7-11.5a7 7 0 1114 0C19 13.7 12 21 12 21z" fill={color} fillOpacity="0.2" />
      <circle cx="12" cy="9.5" r="2.5" fill={color} />
    </svg>
  );
}

export function ThermometerIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" fill={color} fillOpacity="0.2" />
      <circle cx="11.5" cy="17.5" r="2" fill={color} />
    </svg>
  );
}

export function DropletIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function RainIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 13a4 4 0 00-7.78-1.3A3.5 3.5 0 005 15h11a3 3 0 000-6h-.5" fill={color} fillOpacity="0.2" />
      <path d="M8 18v2" />
      <path d="M12 18v2" />
      <path d="M16 18v2" />
    </svg>
  );
}

export function HistoryIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9" fill={color} fillOpacity="0.15" />
      <polyline points="12 7 12 12 15 15" />
      <path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

export function UserIcon({ size = 24, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7" r="4" fill={color} fillOpacity="0.2" />
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function BulbIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8a6 6 0 00-12 0c0 1.6.8 2.7 1.5 3.5.76.76 1.23 1.52 1.41 2.5z" fill={color} fillOpacity="0.2" />
    </svg>
  );
}

export function MicIcon({ size = 20, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="2" width="6" height="12" rx="3" fill={color} fillOpacity="0.25" />
      <path d="M5 10a7 7 0 0014 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

export function SpeakerIcon({ size = 18, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} fillOpacity="0.25" />
      <path d="M15.54 8.46a5 5 0 010 7.07" />
      <path d="M19.07 4.93a10 10 0 010 14.14" />
    </svg>
  );
}

export function MuteIcon({ size = 18, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={color} fillOpacity="0.25" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

export function StopIcon({ size = 18, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" fill={color} />
    </svg>
  );
}

export function UrduFlagBadge({ size = 16, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" />
      <path d="M12 7a5 5 0 100 10 4 4 0 110-10z" fill={color} />
      <polygon points="14.5,9.5 15.5,8 16.5,9.5 15,9.5" fill={color} />
    </svg>
  );
}

export function EnglishFlagBadge({ size = 16, color = LIME, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" />
      <path d="M12 2v20M2 12h20" strokeWidth="2.5" />
    </svg>
  );
}
