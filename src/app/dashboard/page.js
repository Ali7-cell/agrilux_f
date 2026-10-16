"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import IconGlowCard from "@/components/IconGlowCard";
import { CropIcon, FertilizerIcon, YieldIcon, RobotIcon, HistoryIcon, UserIcon } from "@/components/icons/Icons";
import { getApiUrl, handleUnauthorized } from "@/lib/api";

const SERVICES = [
  { href: "/crop", icon: <CropIcon size={28} color="#9FD23A" />, title: "Crop Recommendation", desc: "Predict optimal crops from soil nutrients (N-P-K), pH, and rainfall data." },
  { href: "/fertilizer", icon: <FertilizerIcon size={28} color="#9FD23A" />, title: "Fertilizer Advisor", desc: "Calculate exact fertilizer blends based on crop type and soil nutrient deficiencies." },
  { href: "/yield", icon: <YieldIcon size={28} color="#9FD23A" />, title: "Yield Prediction", desc: "Estimate total harvest output in metric tons per hectare before planting." },
  { href: "/chat", icon: <RobotIcon size={28} color="#9FD23A" />, title: "AI Assistant", desc: "Chat with intelligent AI for crop pathology, soil health, and pest management." },
  { href: "/history", icon: <HistoryIcon size={28} color="#9FD23A" />, title: "Prediction History", desc: "View and filter all your past soil analyses and AI recommendations." },
  { href: "/profile", icon: <UserIcon size={28} color="#9FD23A" />, title: "Account & Profile", desc: "Manage your farm location, unit preferences, and login credentials." },
];

export default function Dashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Verify token validity with backend to catch expired sessions
    fetch(`${getApiUrl()}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          handleUnauthorized(router);
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        // If server is unreachable, still permit local layout display
        setAuthorized(true);
      });
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("recommendedCrop");
    router.push("/login");
  }

  if (!authorized) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner} />
        <p style={{ textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85rem" }}>
          VERIFYING AUTHORIZATION...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.bodyWrapper} data-theme="dark">
      <HeaderNav activePage="dashboard" />

      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div>
            <span className="eyebrow" style={{ color: "#9FD23A" }}>FARMER PORTAL</span>
            <TextSplit as="h1" className={styles.welcomeTitle} style={{ marginTop: "0.4rem" }}>
              Control Center
            </TextSplit>
          </div>

          <button className={styles.logoutBtn} onClick={logout}>
            <span>LOGOUT</span>
            <span>→</span>
          </button>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((serv) => (
            <Link key={serv.href} href={serv.href} style={{ textDecoration: "none", color: "inherit" }}>
              <IconGlowCard
                icon={serv.icon}
                title={serv.title}
                description={serv.desc}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
