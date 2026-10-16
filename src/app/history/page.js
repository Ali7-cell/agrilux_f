"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./history.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import { getApiUrl, handleUnauthorized } from "@/lib/api";
import { CropIcon, FertilizerIcon, YieldIcon } from "@/components/icons/Icons";

export default function HistoryPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
      fetchHistory(token);
    }
  }, [router]);

  async function fetchHistory(token) {
    try {
      const response = await fetch(`${getApiUrl()}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        handleUnauthorized(router);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Failed to fetch prediction history.");
        return;
      }

      setPredictions(data);
    } catch (err) {
      setError("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  }

  const filteredPredictions = predictions.filter((p) => {
    if (filter === "all") return true;
    return p.type.toLowerCase() === filter.toLowerCase();
  });

  const getBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case "crop":
        return styles.badgeCrop;
      case "fertilizer":
        return styles.badgeFertilizer;
      case "yield":
        return styles.badgeYield;
      default:
        return "";
    }
  };

  const getBadgeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "crop":
        return <CropIcon size={14} color="#9FD23A" />;
      case "fertilizer":
        return <FertilizerIcon size={14} color="#64B5F6" />;
      case "yield":
        return <YieldIcon size={14} color="#FFB74D" />;
      default:
        return null;
    }
  };

  if (!authorized) return null;

  return (
    <div className={styles.bodyWrapper} data-theme="dark">
      <HeaderNav />

      <div className={styles.container}>
        <div style={{ marginBottom: "2rem" }}>
          <Link href="/dashboard" className="btn-pill" style={{ fontSize: "0.8rem" }}>
            ← BACK TO DASHBOARD
          </Link>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <span className="eyebrow" style={{ color: "#9FD23A" }}>LOGGED DIAGNOSTICS</span>
          <TextSplit as="h1" className={styles.title}>
            Prediction History
          </TextSplit>
          <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
            Review past crop choices, fertilizer recommendations, and harvest predictions triggered from your portal or AI assistant.
          </p>

          <div className={styles.filters}>
            {["all", "crop", "fertilizer", "yield"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ""}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#9FD23A" }}>
            LOADING HISTORY LOGS...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#FF6319" }}>
            {error}
          </div>
        ) : filteredPredictions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", opacity: 0.7 }}>
            No prediction logs found for this filter.
          </div>
        ) : (
          <div className={styles.list}>
            {filteredPredictions.map((item) => {
              let parsedInput = {};
              try {
                parsedInput = JSON.parse(item.input_data || "{}");
              } catch (e) {}

              return (
                <div key={item.id} className={styles.itemCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span className={`${styles.badge} ${getBadgeClass(item.type)}`} style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      {getBadgeIcon(item.type)}
                      {item.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: "0.82rem", opacity: 0.6 }}>
                      {new Date(item.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#9FD23A", marginBottom: "0.5rem" }}>
                    {item.result}
                  </div>

                  {item.confidence && (
                    <div style={{ fontSize: "0.88rem", opacity: 0.85, marginBottom: "1rem" }}>
                      Confidence Score: {(item.confidence * 100).toFixed(1)}%
                    </div>
                  )}

                  <div style={{ fontSize: "0.85rem", opacity: 0.7, borderTop: "1px solid rgba(244,237,230,0.1)", paddingTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                    {Object.entries(parsedInput).map(([k, v]) => (
                      <span key={k}>
                        <strong style={{ color: "#F4EDE6" }}>{k}:</strong> {v ?? "N/A"}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
