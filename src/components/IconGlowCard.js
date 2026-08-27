"use client";

import { useRef } from "react";

export default function IconGlowCard({
  children,
  className = "",
  style = {},
  icon = "🌱",
  title,
  description,
  onClick,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--cursor-x", `${x}%`);
    card.style.setProperty("--cursor-y", `${y}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`icon-glow-card ${className}`}
      style={{
        position: "relative",
        padding: "2.2rem",
        borderRadius: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(244, 237, 230, 0.12)",
        transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle 180px at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(159, 210, 58, 0.12), transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          opacity: 0.8,
        }}
      />

      {icon && (
        <div
          style={{
            fontSize: "2.2rem",
            marginBottom: "1.2rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            backgroundColor: "rgba(159, 210, 58, 0.12)",
          }}
        >
          {icon}
        </div>
      )}

      {title && (
        <h3
          style={{
            fontSize: "1.35rem",
            fontWeight: 600,
            marginBottom: "0.6rem",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
      )}

      {description && (
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.5,
            opacity: 0.8,
          }}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
