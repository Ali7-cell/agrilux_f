"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";
import TreeLogo from "@/components/TreeLogo";

const CARDS = [
  { href: "/crop", icon: "🌱", title: "Crop Recommendation", desc: "Get the best crop for your soil & weather", color: "#2d6a4f" },
  { href: "/fertilizer", icon: "💧", title: "Fertilizer Recommendation", desc: "Find the right fertilizer for your crop", color: "#1e88e5" },
  { href: "/yield", icon: "📈", title: "Yield Prediction", desc: "Estimate your expected crop yield", color: "#e67e22" },
  { href: "/history", icon: "📜", title: "History", desc: "View your past predictions", color: "#8e44ad" },
  { href: "/profile", icon: "👤", title: "My Profile", desc: "View and edit your account details", color: "#e74c3c" },
  { href: "/chat", icon: "🤖", title: "AI Chat Assistant", desc: "Ask our smart assistant anything about farming", color: "#00897b" },
];

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("recommendedCrop");
    router.push("/login");
  }

  if (!authorized) {
    return (
      <div className={styles.bodyWrapper}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner} />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.bodyWrapper}>
      {/* Background decoration */}
      <div className={styles.bgDecor}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.container}>
        {/* Top bar */}
        <div className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <TreeLogo size={32} />
            </Link>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            <span>Logout</span>
            <span className={styles.logoutArrow}>→</span>
          </button>
        </div>

        {/* Welcome */}
        <div className={styles.welcomeSection}>
          <h1>Welcome back! 👋</h1>
          <p>Choose a service below to get started with smart farming.</p>
        </div>

        {/* Cards Grid */}
        <div className={styles.grid}>
          {CARDS.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className={styles.cardIconWrap} style={{ background: `${card.color}15` }}>
                <span className={styles.cardIcon}>{card.icon}</span>
              </div>
              <div className={styles.cardContent}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
              <div className={styles.cardBorderGlow} style={{ background: `linear-gradient(135deg, ${card.color}20, transparent)` }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
