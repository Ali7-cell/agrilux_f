"use client";

import { useEffect, useRef } from "react";

export default function MouseTrail() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Only run on desktop with fine pointer
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    let lastX = 0;
    let lastY = 0;
    let distanceTraveled = 0;
    const squareSize = 5;

    // FarmMinerals gradient stops
    const stops = [
      { r: 212, g: 222, b: 114 }, // #D4DE72 lime
      { r: 136, g: 158, b: 57 },  // #889E39 olive
      { r: 49,  g: 61,  b: 26 },   // #313D1A dark
    ];

    function getColor(progress) {
      let r, g, b;
      if (progress < 0.5) {
        const t = progress * 2;
        r = Math.round(stops[0].r + (stops[1].r - stops[0].r) * t);
        g = Math.round(stops[0].g + (stops[1].g - stops[0].g) * t);
        b = Math.round(stops[0].b + (stops[1].b - stops[0].b) * t);
      } else {
        const t = (progress - 0.5) * 2;
        r = Math.round(stops[1].r + (stops[2].r - stops[1].r) * t);
        g = Math.round(stops[1].g + (stops[2].g - stops[1].g) * t);
        b = Math.round(stops[1].b + (stops[2].b - stops[1].b) * t);
      }
      return `rgb(${r}, ${g}, ${b})`;
    }

    const handleMouseMove = (e) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 10) return; // limit density
      distanceTraveled += dist;
      lastX = e.clientX;
      lastY = e.clientY;

      const progress = (distanceTraveled % 500) / 500;
      const color = getColor(progress);

      const sq = document.createElement("div");
      sq.style.position = "fixed";
      sq.style.left = `${e.clientX - squareSize / 2}px`;
      sq.style.top = `${e.clientY - squareSize / 2}px`;
      sq.style.width = `${squareSize}px`;
      sq.style.height = `${squareSize}px`;
      sq.style.backgroundColor = color;
      sq.style.borderRadius = "1px";
      sq.style.pointerEvents = "none";
      sq.style.zIndex = "99999";
      sq.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      sq.style.opacity = "1";
      sq.style.transform = "scale(1)";

      container.appendChild(sq);

      requestAnimationFrame(() => {
        setTimeout(() => {
          sq.style.opacity = "0";
          sq.style.transform = "scale(0.3)";
          setTimeout(() => {
            if (sq.parentNode === container) {
              container.removeChild(sq);
            }
          }, 300);
        }, 100);
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} style={{ pointerEvents: "none" }} />;
}
