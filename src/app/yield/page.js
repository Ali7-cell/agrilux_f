"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./yield.module.css";
import { getApiUrl } from "@/lib/api";

const AREAS = [
  "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium",
  "Botswana", "Brazil", "Bulgaria", "Burkina Faso", "Burundi", "Cameroon",
  "Canada", "Central African Republic", "Chile", "Colombia", "Croatia",
  "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Eritrea",
  "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala",
  "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "India", "Indonesia",
  "Iraq", "Ireland", "Italy", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Latvia",
  "Lebanon", "Lesotho", "Libya", "Lithuania", "Madagascar", "Malawi", "Malaysia",
  "Mali", "Mauritania", "Mauritius", "Mexico", "Montenegro", "Morocco",
  "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
  "Niger", "Norway", "Pakistan", "Papua New Guinea", "Peru", "Poland",
  "Portugal", "Qatar", "Romania", "Rwanda", "Saudi Arabia", "Senegal",
  "Slovenia", "South Africa", "Spain", "Sri Lanka", "Sudan", "Suriname",
  "Sweden", "Switzerland", "Tajikistan", "Thailand", "Tunisia", "Turkey",
  "Uganda", "Ukraine", "United Kingdom", "Uruguay", "Zambia", "Zimbabwe"
];

const ITEMS = [
  "Cassava", "Maize", "Plantains and others", "Potatoes", "Rice, paddy",
  "Sorghum", "Soybeans", "Sweet potatoes", "Wheat", "Yams"
];

export default function YieldPrediction() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Form states
  const [area, setArea] = useState("Albania");
  const [item, setItem] = useState("Cassava");
  const [year, setYear] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [pesticides, setPesticides] = useState("");
  const [temperature, setTemperature] = useState("");

  const [autoFillNote, setAutoFillNote] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictedYield, setPredictedYield] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthorized(true);

    // Auto-fill from Crop Recommendation
    const recommendedCrop = localStorage.getItem("recommendedCrop");
    if (recommendedCrop) {
      const matched = ITEMS.find((i) =>
        i.toLowerCase().includes(recommendedCrop.toLowerCase())
      );
      if (matched) {
        setItem(matched);
        setAutoFillNote(`Auto-filled from your Crop Recommendation: ${recommendedCrop}`);
      } else {
        setAutoFillNote(
          `Note: "${recommendedCrop}" isn't in this model's crop list — please select manually.`
        );
      }
    }
  }, [router]);

  async function predictYield(e) {
    e.preventDefault();
    setShowResult(false);
    setMessage("");

    const token = localStorage.getItem("token");

    const payload = {
      area,
      item,
      year: year !== "" ? Number(year) : null,
      rainfall: rainfall !== "" ? Number(rainfall) : null,
      pesticides: pesticides !== "" ? Number(pesticides) : null,
      temperature: temperature !== "" ? Number(temperature) : null,
    };

    // Numeric checks
    const numericFields = ["year", "rainfall", "pesticides", "temperature"];
    for (const key of numericFields) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/predict-yield`, {
        method: "POST",
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

      setPredictedYield(`${data.predicted_yield.toFixed(2)} ${data.unit}`);
      setShowResult(true);
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the server. Please check if the backend is running.");
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
            Back to Dashboard
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIconWrap}>📈</div>
            <h2>Yield Prediction</h2>
            <p>Estimate your expected harvest before you plant</p>
          </div>

          {autoFillNote && (
            <div className={styles.autoFillNote}>
              <span>💡</span> {autoFillNote}
            </div>
          )}

          <form onSubmit={predictYield}>
            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Location & Crop</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Country</label>
                  <select value={area} onChange={(e) => setArea(e.target.value)}>
                    {AREAS.map((a) => (<option key={a} value={a}>{a}</option>))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Crop</label>
                  <select value={item} onChange={(e) => setItem(e.target.value)}>
                    {ITEMS.map((i) => (<option key={i} value={i}>{i}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Conditions</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Year</label>
                  <input type="number" placeholder="1900-2100" value={year} onChange={(e) => setYear(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Rainfall (mm)</label>
                  <input type="number" value={rainfall} onChange={(e) => setRainfall(e.target.value)} step="any" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Pesticides (tonnes)</label>
                  <input type="number" value={pesticides} onChange={(e) => setPesticides(e.target.value)} step="any" />
                </div>
                <div className={styles.field}>
                  <label>Temperature (°C)</label>
                  <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} step="any" />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : <>Predict Yield <span>→</span></>}
            </button>
          </form>

          {message && (
            <div className={`${styles.messageBox} ${messageColor === "green" ? styles.messageSuccess : styles.messageError}`}>
              <span>{messageColor === "green" ? "✓" : "⚠"}</span>
              {message}
            </div>
          )}

          {showResult && (
            <div className={styles.resultBox}>
              <div className={styles.resultIcon}>🌾</div>
              <h3>{predictedYield}</h3>
              <p className={styles.resultConf}>Estimated yield per hectare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
