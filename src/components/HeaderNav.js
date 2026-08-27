"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TreeLogo from "./TreeLogo";
import { CropIcon, FertilizerIcon, YieldIcon, RobotIcon } from "./icons/Icons";

export default function HeaderNav({ activePage = "" }) {
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      const nav = document.getElementById("header-nav");
      if (!nav) return;
      const navRect = nav.getBoundingClientRect();

      const lightSections = Array.from(
        document.querySelectorAll("[data-theme='light'], .light-section")
      );

      const isOnLight = lightSections.some((sec) => {
        const r = sec.getBoundingClientRect();
        return r.top <= navRect.bottom && r.bottom > navRect.top;
      });

      setTheme(isOnLight ? "light" : "dark");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light";
  const textColor = isLight ? "#404F1D" : "#F4EDE6";
  const iconColor = isLight ? "#404F1D" : "#9FD23A";
  const pillBg = isLight ? "rgba(64, 79, 29, 0.08)" : "rgba(255, 255, 255, 0.08)";
  const pillBorder = isLight ? "1px solid rgba(64, 79, 29, 0.2)" : "1px solid rgba(244, 237, 230, 0.2)";

  return (
    <nav
      id="header-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1rem 1.2rem",
        transition: "color 0.3s ease, background-color 0.3s ease",
        color: textColor,
        backgroundColor: menuOpen ? (isLight ? "rgba(244, 237, 230, 0.95)" : "rgba(64, 79, 29, 0.95)") : "transparent",
        backdropFilter: menuOpen ? "blur(16px)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <TreeLogo size={30} />
          <span
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "1.2rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            AGRILUX
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div
          className="desktop-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            fontSize: "0.88rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          <Link href="/#features" style={{ textDecoration: "none", color: "inherit", opacity: 0.85 }}>
            Features
          </Link>
          <Link href="/#how-it-works" style={{ textDecoration: "none", color: "inherit", opacity: 0.85 }}>
            How it Works
          </Link>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              style={{
                textDecoration: "none",
                color: "inherit",
                opacity: activePage === "dashboard" ? 1 : 0.85,
                fontWeight: activePage === "dashboard" ? 700 : 500,
              }}
            >
              Dashboard
            </Link>
          ) : null}
        </div>

        {/* Right CTA / Mobile Toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="desktop-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.2rem",
                borderRadius: "50px",
                backgroundColor: pillBg,
                border: pillBorder,
                backdropFilter: "blur(12px)",
                color: textColor,
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#9FD23A" }} />
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="desktop-cta-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 1.2rem",
                borderRadius: "50px",
                backgroundColor: pillBg,
                border: pillBorder,
                backdropFilter: "blur(12px)",
                color: textColor,
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Get Started
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              color: textColor,
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: "0.2rem 0.5rem",
            }}
            aria-label="Toggle Navigation Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {menuOpen && (
        <div
          style={{
            padding: "1.5rem 0.5rem 1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "uppercase",
            borderTop: "1px solid rgba(244,237,230,0.1)",
            marginTop: "1rem",
          }}
        >
          <Link href="/#features" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>
            Features
          </Link>
          <Link href="/#how-it-works" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit" }}>
            How it Works
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: iconColor, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <YieldIcon size={18} color={iconColor} /> Control Center / Dashboard
              </Link>
              <Link href="/crop" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <CropIcon size={18} color={iconColor} /> Crop Recommendation
              </Link>
              <Link href="/fertilizer" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <FertilizerIcon size={18} color={iconColor} /> Fertilizer Advisor
              </Link>
              <Link href="/yield" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <YieldIcon size={18} color={iconColor} /> Yield Prediction
              </Link>
              <Link href="/chat" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <RobotIcon size={18} color={iconColor} /> AI Voice Assistant
              </Link>
            </>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", color: iconColor }}>
              Sign In / Get Started →
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
