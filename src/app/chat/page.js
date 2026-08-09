"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./chat.module.css";
import { getApiUrl } from "@/lib/api";

export default function ChatAssistant() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Conversation history
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hello! I am Agrilux, your AI farming assistant. How can I help you today? Feel free to ask me anything about crop selection, fertilizer recommendations, yield optimization, pest management, or modern sustainable farming practices.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-scroll ref
  const chatEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");
    setLoading(true);

    // Append user message to display history
    const updatedMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(updatedMessages);

    const token = localStorage.getItem("token");

    // Map display history to backend schema format (role is 'user' or 'model')
    const historyPayload = updatedMessages.slice(0, -1).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await fetch(`${getApiUrl()}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: userMessage,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            content: `Error: ${data.detail || "I ran into an issue connecting to the AI service. Please try again."}`,
          },
        ]);
        return;
      }

      // Append assistant's response to history
      setMessages((prev) => [...prev, { role: "model", content: data.response }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Error: Could not connect to the backend server. Make sure the server is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
            Dashboard
          </Link>
          <div className={styles.topbarTitle}>
            <span>🤖</span> AI Assistant
          </div>
          <div className={styles.statusDot}>
            <span className={styles.dot} />
            Online
          </div>
        </div>

        <div className={styles.chatCard}>
          <div className={styles.chatArea}>
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={`${styles.messageRow} ${isUser ? styles.userRow : styles.assistantRow}`}
                >
                  {!isUser && <div className={styles.avatarBot}>🌱</div>}
                  <div
                    className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}
                  >
                    {msg.content}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={styles.avatarBot}>🌱</div>
                <div className={`${styles.bubble} ${styles.assistantBubble} ${styles.typingBubble}`}>
                  <div className={styles.typingDots}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSend} className={styles.inputRow}>
            <input
              type="text"
              placeholder="Ask anything about farming..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
