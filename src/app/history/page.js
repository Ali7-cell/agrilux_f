"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./history.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
const LIMIT = 10;

const FILTER_OPTIONS = [
  { label: "All", value: null },
  { label: "Crop", value: "crop" },
  { label: "Fertilizer", value: "fertilizer" },
  { label: "Yield", value: "yield" },
];

export default function PredictionHistory() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Pagination & Filtering state
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);
  const [total, setTotal] = useState(0);

  // Status state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Trigger loading when filter changes (starts at page 1)
  useEffect(() => {
    if (authorized) {
      fetchHistory(1, filter, true);
    }
  }, [authorized, filter]);

  async function fetchHistory(pageNum, filterType, reset = false) {
    setLoading(true);
    setMessage(pageNum === 1 ? "Loading..." : "");

    const token = localStorage.getItem("token");
    let url = `${API_URL}/history?page=${pageNum}&limit=${LIMIT}`;
    if (filterType) url += `&type=${filterType}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.detail || "Something went wrong.");
        setLoading(false);
        return;
      }

      setMessage("");
      setTotal(data.total);

      if (reset) {
        setItems(data.items);
        if (data.items.length === 0) {
          setMessage("No predictions yet. Go try one of the models!");
        }
      } else {
        setItems((prev) => [...prev, ...data.items]);
      }

      setPage(pageNum + 1);
    } catch (err) {
      setMessage("Could not connect to the server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(type) {
    setFilter(type);
  }

  function loadMore() {
    fetchHistory(page, filter, false);
  }

  if (!authorized) {
    return (
      <div className={styles.bodyWrapper}>
        <div className={styles.loadingScreen}>
          <div className={styles.loadingSpinner} />
          <p>Checking authorization...</p>
        </div>
      </div>
    );
  }

  // Helper to determine badge classes
  const getBadgeClass = (type) => {
    if (type === "crop") return `${styles.badge} ${styles.badgeCrop}`;
    if (type === "fertilizer") return `${styles.badge} ${styles.badgeFertilizer}`;
    if (type === "yield") return `${styles.badge} ${styles.badgeYield}`;
    return styles.badge;
  };

  const getTypeBorder = (type) => {
    if (type === "crop") return "3px solid #2d6a4f";
    if (type === "fertilizer") return "3px solid #1e88e5";
    if (type === "yield") return "3px solid #e67e22";
    return "3px solid #ccc";
  };

  return (
    <div className={styles.bodyWrapper}>
      <div className={styles.bgDecor}>
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.container}>
        <div className={styles.topbar}>
          <Link href="/dashboard" className={styles.backBtn}>
            <span className={styles.backArrow}>←</span>
            Back to Dashboard
          </Link>
        </div>

        <div className={styles.headerSection}>
          <div className={styles.headerIcon}>📜</div>
          <h2>Prediction History</h2>
          <p>View all your past predictions in one place</p>
        </div>

        {/* Filter pills */}
        <div className={styles.filters}>
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.label}
              className={`${styles.filterBtn} ${filter === opt.value ? styles.filterActive : ""}`}
              onClick={() => handleFilterChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Items list */}
        <div className={styles.list}>
          {items.map((item, index) => {
            const formattedDate = new Date(item.created_at).toLocaleString();
            return (
              <div
                key={item.id}
                className={styles.item}
                style={{ borderLeft: getTypeBorder(item.type), animationDelay: `${index * 0.05}s` }}
              >
                <div className={styles.itemTop}>
                  <span className={getBadgeClass(item.type)}>{item.type}</span>
                  <span className={styles.date}>{formattedDate}</span>
                </div>
                <div className={styles.result}>{item.result}</div>
                {item.confidence && (
                  <div className={styles.confRow}>
                    <div className={styles.confBar}>
                      <div className={styles.confFill} style={{ width: `${(item.confidence * 100).toFixed(0)}%` }} />
                    </div>
                    <span className={styles.confText}>{(item.confidence * 100).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {message && <p className={styles.message}>{message}</p>}

        {items.length > 0 && items.length < total && !loading && (
          <button className={styles.loadMoreBtn} onClick={loadMore}>
            Load More
            <span>↓</span>
          </button>
        )}
      </div>
    </div>
  );
}
