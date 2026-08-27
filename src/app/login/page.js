"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import TreeLogo from "@/components/TreeLogo";
import { getApiUrl } from "@/lib/api";

export default function Login() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  function toggleForm() {
    setIsLoginMode((prev) => !prev);
    setMessage("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessageColor("red");
      setMessage("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      let response;
      const baseUrl = getApiUrl();
      if (isLoginMode) {
        response = await fetch(`${baseUrl}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
      } else {
        if (!name) {
          setMessageColor("red");
          setMessage("Please enter your full name.");
          setLoading(false);
          return;
        }
        response = await fetch(`${baseUrl}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
      }

      const data = await response.json();

      if (!response.ok) {
        setMessageColor("red");
        setMessage(Array.isArray(data.detail) ? data.detail.map((err) => err.msg).join(", ") : data.detail || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (isLoginMode) {
        localStorage.setItem("token", data.access_token);
        setMessageColor("green");
        setMessage("Login successful! Loading control center...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 800);
      } else {
        setMessageColor("green");
        setMessage("Account created successfully! Please sign in.");
        setIsLoginMode(true);
        setName("");
      }
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.bodyWrapper} data-theme="dark">
      <HeaderNav />

      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <TreeLogo size={48} />
        </div>

        <div className={styles.card}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span className="eyebrow" style={{ color: "#9FD23A" }}>
              {isLoginMode ? "FARMER SIGN IN" : "NEW REGISTRATION"}
            </span>
            <TextSplit as="h2" className={styles.title}>
              {isLoginMode ? "Welcome Back" : "Create Account"}
            </TextSplit>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input
                  type="text"
                  placeholder="JOHN DOE"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-underline"
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                placeholder="FARMER@AGRILUX.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-underline"
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-underline"
                required
              />
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ width: "100%", marginTop: "1rem" }}>
              {loading ? "AUTHENTICATING..." : isLoginMode ? "SIGN IN →" : "CREATE ACCOUNT →"}
            </button>
          </form>

          <p className={styles.toggleText}>
            {isLoginMode ? (
              <>
                Need an Agrilux account? <span onClick={toggleForm}>Register here</span>
              </>
            ) : (
              <>
                Already registered? <span onClick={toggleForm}>Sign in</span>
              </>
            )}
          </p>

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
