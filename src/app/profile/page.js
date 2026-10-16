"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./profile.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import { getApiUrl, handleUnauthorized } from "@/lib/api";

export default function AccountProfile() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [joinedDate, setJoinedDate] = useState("");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthorized(true);
    loadProfile(token);
  }, [router]);

  async function loadProfile(token) {
    try {
      const response = await fetch(`${getApiUrl()}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 401) {
        handleUnauthorized(router);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        setMessage(data.detail || "Could not load profile.");
        return;
      }

      setName(data.name);
      setEmail(data.email);
      const joinDate = new Date(data.created_at).toLocaleDateString();
      setJoinedDate(`Member since ${joinDate}`);
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the backend server.");
    }
  }

  async function updateProfile(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");
    const payload = {};
    if (name) payload.name = name;
    if (email) payload.email = email;
    if (password) payload.password = password;

    try {
      const response = await fetch(`${getApiUrl()}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        handleUnauthorized(router);
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        setMessage(Array.isArray(data.detail) ? data.detail.map((err) => err.msg).join(", ") : data.detail || "Something went wrong.");
        return;
      }

      setMessageColor("green");
      setMessage("Profile details updated successfully!");
      setPassword("");
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  }

  const getInitials = () => {
    if (!name) return "?";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
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

        <div className={styles.card}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>{getInitials()}</div>
            <TextSplit as="h2" style={{ fontSize: "2rem", fontWeight: 500 }}>
              {name || "Farmer Profile"}
            </TextSplit>
            {joinedDate && <p style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: "0.4rem" }}>{joinedDate}</p>}
          </div>

          <form onSubmit={updateProfile}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-underline"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-underline"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Change Password (Optional)</label>
              <input
                type="password"
                placeholder="LEAVE BLANK TO KEEP CURRENT"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-underline"
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ width: "100%", marginTop: "1rem" }}>
              {loading ? "SAVING CHANGES..." : "SAVE PROFILE CHANGES →"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.5rem", color: messageColor === "green" ? "#9FD23A" : "#FF6319", textAlign: "center", fontSize: "0.95rem" }}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
