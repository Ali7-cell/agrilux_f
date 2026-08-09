"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";
import { getApiUrl } from "@/lib/api";
import TreeLogo from "@/components/TreeLogo";

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
    // If user is already logged in, redirect to dashboard
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
          setMessage("Please enter your name.");
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
        if (Array.isArray(data.detail)) {
          setMessage(data.detail.map((err) => err.msg).join(", "));
        } else {
          setMessage(data.detail || "Something went wrong.");
        }
        setLoading(false);
        return;
      }

      if (isLoginMode) {
        localStorage.setItem("token", data.access_token);
        setMessageColor("green");
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setMessageColor("green");
        setMessage("Account created successfully! Please login.");
        setIsLoginMode(true);
        setName("");
      }
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.bodyWrapper}>
      {/* Floating decorative elements */}
      <div className={styles.floatingBg}>
        <div className={`${styles.floatingLeaf} ${styles.leaf1}`}>🌿</div>
        <div className={`${styles.floatingLeaf} ${styles.leaf2}`}>🍃</div>
        <div className={`${styles.floatingLeaf} ${styles.leaf3}`}>🌱</div>
        <div className={`${styles.floatingLeaf} ${styles.leaf4}`}>🌾</div>
      </div>

      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.brandLink}>
          <TreeLogo size={36} />
        </Link>

        {/* Card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>{isLoginMode ? "Welcome back" : "Create account"}</h2>
            <p>{isLoginMode ? "Sign in to your farming dashboard" : "Start your smart farming journey"}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLoginMode}
                  />
                </div>
              </div>
            )}
            <div className={styles.inputGroup}>
              <label>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>✉️</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? (
                <span className={styles.spinner} />
              ) : (
                <>
                  {isLoginMode ? "Sign In" : "Create Account"}
                  <span className={styles.btnArrow}>→</span>
                </>
              )}
            </button>
          </form>

          <p className={styles.toggleText}>
            {isLoginMode ? (
              <>
                Don&apos;t have an account?{" "}
                <span onClick={toggleForm}>Create one</span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span onClick={toggleForm}>Sign in</span>
              </>
            )}
          </p>

          {message && (
            <div
              className={`${styles.messageBox} ${messageColor === "green" ? styles.messageSuccess : styles.messageError}`}
            >
              <span>{messageColor === "green" ? "✓" : "⚠"}</span>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
