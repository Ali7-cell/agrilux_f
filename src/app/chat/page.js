"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./chat.module.css";
import HeaderNav from "@/components/HeaderNav";
import MarkdownMessage from "@/components/MarkdownMessage";
import { getApiUrl } from "@/lib/api";
import { RobotIcon, MicIcon, SpeakerIcon, MuteIcon, StopIcon, UrduFlagBadge, EnglishFlagBadge } from "@/components/icons/Icons";

const WELCOME_URDU = `### خوش آمدید! میں ایگری لکس AI اسسٹنٹ ہوں۔

آپ مجھ سے **اردو** یا **انگریزی** میں فصلوں، کھاد اور پیداوار کے بارے میں سوال پوچھ سکتے ہیں۔

* **فصل کی منتخب کاری**: مٹی اور موسم کے مطابق رہنمائی
* **کھاد کا فارمولا**: N-P-K کی درست مقدار
* **زیادہ سے زیادہ پیداوار**: اندازہ پیداوار اور کیڑوں سے تحفظ`;

const WELCOME_ENGLISH = `### Welcome to Agrilux AI Assistant!

You can ask me questions about crops, fertilizers, and yield in **English** or **Urdu**.

* **Crop Selection**: Soil & climate guidance
* **Fertilizer Formula**: Precision N-P-K ratios
* **Yield Maximization**: Harvest estimations & pest control`;

export default function ChatAssistant() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Voice & Language States
  const [voiceLang, setVoiceLang] = useState("ur-PK"); // 'ur-PK' or 'en-US'
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: WELCOME_URDU,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Audio MediaRecorder States
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [voiceStatusNote, setVoiceStatusNote] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Switch Language handler (Urdu / English)
  const handleLanguageSwitch = (lang) => {
    setVoiceLang(lang);
    if (messages.length === 1 && messages[0].role === "model") {
      setMessages([
        {
          role: "model",
          content: lang === "ur-PK" ? WELCOME_URDU : WELCOME_ENGLISH,
        },
      ]);
    }
    setVoiceStatusNote(lang === "ur-PK" ? "✓ زبان تبدیل ہو گئی: اردو (Urdu Mode Active)" : "✓ Language Switched: English Mode Active");
  };

  // Browser MediaRecorder Voice Recording (100% Reliable Local Audio)
  const toggleAudioRecording = async () => {
    if (isRecordingAudio) {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      clearInterval(timerRef.current);
      setIsRecordingAudio(false);
      return;
    }

    if (typeof window === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      alert("Microphone recording is not supported in this browser.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder.mimeType || "audio/webm";
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        setAudioBlob(blob);

        stream.getTracks().forEach((track) => track.stop());

        setVoiceStatusNote(
          voiceLang === "ur-PK"
            ? "✓ آپ کی آواز ریکارڈ ہو گئی! ارسال پر کلک کریں۔ (Voice Clip Captured)"
            : "✓ Voice Recording Captured! Click SEND to process with AI."
        );
      };

      mediaRecorder.start(100);
      mediaRecorderRef.current = mediaRecorder;
      setIsRecordingAudio(true);
      setRecordTime(0);

      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);

      setVoiceStatusNote(
        voiceLang === "ur-PK"
          ? "آواز ریکارڈ ہو رہی ہے... (Speak your question now)"
          : "Recording Audio... Speak your question now."
      );
    } catch (err) {
      console.error("Microphone access error:", err);
      alert("Microphone access permission denied. Please allow microphone in browser settings.");
      setIsRecordingAudio(false);
    }
  };

  // Convert Blob to Base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Text-to-Speech Output Function
  const speakText = (text, idx = null) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    if (speakingIdx === idx && idx !== null) {
      setSpeakingIdx(null);
      return;
    }

    const cleanText = text
      .replace(/###/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/---/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = voiceLang === "ur-PK" ? "ur" : "en-US";

    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find((v) => v.lang.toLowerCase().includes("ur"));
    if (matchedVoice) utterance.voice = matchedVoice;

    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(idx);
    window.speechSynthesis.speak(utterance);
  };

  async function handleSend(e) {
    if (e) e.preventDefault();
    if (!input.trim() && !audioBlob && !isRecordingAudio) return;

    let currentBlob = audioBlob;
    if (isRecordingAudio && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecordingAudio(false);
      await new Promise((r) => setTimeout(r, 200));
    }

    setLoading(true);

    let audioB64 = null;
    let audioMime = "audio/webm";

    if (currentBlob) {
      try {
        audioB64 = await blobToBase64(currentBlob);
        audioMime = currentBlob.type || "audio/webm";
      } catch (err) {
        console.error("Base64 error", err);
      }
    }

    const userDisplayText = input.trim()
      ? input
      : voiceLang === "ur-PK"
      ? "صوتی پیغام (Voice Message)"
      : "Voice Message";

    const languageInstruction =
      voiceLang === "ur-PK"
        ? "[INSTRUCTION: The farmer provided query in Urdu. Please reply strictly in clear, helpful Urdu language (اردو).]\n\n"
        : "[INSTRUCTION: Please reply strictly in clear, helpful English language.]\n\n";

    const apiMessage = languageInstruction + input;

    setInput("");
    setAudioBlob(null);
    setVoiceStatusNote("");

    const updatedMessages = [...messages, { role: "user", content: userDisplayText }];
    setMessages(updatedMessages);

    const token = localStorage.getItem("token");
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
          message: apiMessage,
          audio_b64: audioB64,
          audio_mime: audioMime,
          history: historyPayload,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = `Error: ${data.detail || "I ran into an issue connecting to Gemini AI."}`;
        setMessages((prev) => [...prev, { role: "model", content: errorMsg }]);
        return;
      }

      const botReply = data.response;
      const newIdx = updatedMessages.length;
      setMessages((prev) => [...prev, { role: "model", content: botReply }]);

      if (autoSpeak) {
        speakText(botReply, newIdx);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: "Error: Could not connect to the backend server.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (!authorized) return null;

  return (
    <div className={styles.bodyWrapper} data-theme="dark">
      <HeaderNav />

      <div className={styles.container}>
        <div style={{ marginBottom: "1.5rem" }}>
          <Link href="/dashboard" className="btn-pill" style={{ fontSize: "0.8rem" }}>
            ← BACK TO DASHBOARD
          </Link>
        </div>

        <div className={styles.chatCard}>
          <div className={styles.chatHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <RobotIcon size={28} color="#9FD23A" />
              <div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>Gemini AI Assistant</h3>
                <span className="eyebrow" style={{ color: "#9FD23A", fontSize: "0.75rem" }}>
                  {voiceLang === "ur-PK" ? "اردو اور انگریزی صوتی اسسٹنٹ" : "MULTIMODAL URDU & ENGLISH VOICE ENGINE"}
                </span>
              </div>
            </div>

            {/* Language & Voice Controls */}
            <div className={styles.voiceControls}>
              <button
                type="button"
                className={`${styles.langBtn} ${voiceLang === "ur-PK" ? styles.langActive : ""}`}
                onClick={() => handleLanguageSwitch("ur-PK")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <UrduFlagBadge size={16} color={voiceLang === "ur-PK" ? "#404F1D" : "#9FD23A"} /> Urdu (اردو)
              </button>
              <button
                type="button"
                className={`${styles.langBtn} ${voiceLang === "en-US" ? styles.langActive : ""}`}
                onClick={() => handleLanguageSwitch("en-US")}
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
              >
                <EnglishFlagBadge size={16} color={voiceLang === "en-US" ? "#404F1D" : "#9FD23A"} /> English
              </button>

              <button
                type="button"
                className={styles.langBtn}
                style={{ opacity: autoSpeak ? 1 : 0.6, display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                onClick={() => setAutoSpeak((prev) => !prev)}
                title="Toggle Auto Read Aloud"
              >
                {autoSpeak ? (
                  <>
                    <SpeakerIcon size={16} color={autoSpeak ? "#9FD23A" : "#F4EDE6"} /> Voice On
                  </>
                ) : (
                  <>
                    <MuteIcon size={16} color="#F4EDE6" /> Voice Off
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={styles.chatArea}>
            {messages.map((msg, index) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={index}
                  className={`${styles.messageRow} ${isUser ? styles.userRow : styles.assistantRow}`}
                >
                  <div style={{ width: "100%" }}>
                    <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.assistantBubble}`}>
                      {isUser ? (
                        <div style={{ fontSize: "1.05rem", fontWeight: 500 }}>{msg.content}</div>
                      ) : (
                        <MarkdownMessage content={msg.content} />
                      )}
                    </div>

                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => speakText(msg.content, index)}
                        className={styles.speakBtn}
                      >
                        {speakingIdx === index ? (
                          <>
                            <StopIcon size={14} color="#FF6319" /> Stop Audio
                          </>
                        ) : (
                          <>
                            <SpeakerIcon size={14} color="#9FD23A" /> Listen Voice
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={`${styles.bubble} ${styles.assistantBubble}`}>
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

          {voiceStatusNote && (
            <div style={{ padding: "0.5rem 1.8rem", fontSize: "0.85rem", color: "#9FD23A", backgroundColor: "rgba(159, 210, 58, 0.08)", borderTop: "1px solid rgba(159, 210, 58, 0.15)" }}>
              {voiceStatusNote}
            </div>
          )}

          <form onSubmit={handleSend} className={styles.inputRow}>
            {/* Microphone Button for Local MediaRecorder */}
            <button
              type="button"
              onClick={toggleAudioRecording}
              className={`${styles.micBtn} ${isRecordingAudio ? styles.micListening : ""}`}
              title={isRecordingAudio ? "Recording... Click to stop" : "Click to record voice"}
            >
              <MicIcon size={22} color={isRecordingAudio ? "#FFFFFF" : "#9FD23A"} />
            </button>

            <input
              type="text"
              placeholder={
                isRecordingAudio
                  ? `RECORDING VOICE (${recordTime}s)... CLICK SEND WHEN DONE`
                  : audioBlob
                  ? `✓ VOICE CLIP ATTACHED — CLICK SEND →`
                  : voiceLang === "ur-PK"
                  ? "اردو میں اپنا سوال ٹائپ کریں یا مائیک سے ریکارڈ کریں..."
                  : "Ask in English or record voice clip..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className={styles.chatInput}
            />

            <button type="submit" disabled={loading || (!input.trim() && !audioBlob && !isRecordingAudio)} className={styles.sendBtn}>
              {voiceLang === "ur-PK" ? "ارسال →" : "SEND →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
