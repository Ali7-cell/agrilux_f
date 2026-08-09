"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./profile.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function AccountProfile() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Profile data state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [joinedDate, setJoinedDate] = useState("");

  // Status state
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
      const response = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      setMessage("Could not connect to the server. Please check if the backend is running.");
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
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        if (Array.isArray(data.detail)) {
          setMessage(data.detail.map((err) => err.msg).join(", "));
        } else {
          setMessage(data.detail || "Something went wrong.");
        }
        return;
      }

      setMessageColor("green");
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  // Get initials from name
  const getInitials = () => {
    if (!name) return "?";
    return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  };

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

        <div className={styles.card}>
          {/* Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {getInitials()}
            </div>
            <h2>{name || "Your Profile"}</h2>
            {joinedDate && <p className={styles.joined}>{joinedDate}</p>}
          </div>

          <form onSubmit={updateProfile}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>👤</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉️</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>New Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p className={styles.hint}>Only fill this in if you want to change your password.</p>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : <>Save Changes <span>→</span></>}
            </button>
          </form>

          {message && (
            <div className={`${styles.messageBox} ${messageColor === "green" ? styles.messageSuccess : styles.messageError}`}>
              <span>{messageColor === "green" ? "✓" : "⚠"}</span>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
