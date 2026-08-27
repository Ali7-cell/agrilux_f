"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./yield.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import { getApiUrl } from "@/lib/api";
import { getCurrentLocationAndWeather } from "@/lib/weather";
import { LocationIcon, BulbIcon } from "@/components/icons/Icons";

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

  const [area, setArea] = useState("Albania");
  const [item, setItem] = useState("Cassava");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [rainfall, setRainfall] = useState("");
  const [pesticides, setPesticides] = useState("");
  const [temperature, setTemperature] = useState("");

  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locationBadge, setLocationBadge] = useState("");
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

    const recommendedCrop = localStorage.getItem("recommendedCrop");
    if (recommendedCrop) {
      const matched = ITEMS.find((i) => i.toLowerCase().includes(recommendedCrop.toLowerCase()));
      if (matched) {
        setItem(matched);
        setAutoFillNote(`Auto-filled from your Crop Recommendation: ${recommendedCrop}`);
      } else {
        setAutoFillNote(`Note: "${recommendedCrop}" is not in this model's crop list.`);
      }
    }

    // Auto-detect location & weather
    handleAutoWeather(true);
  }, [router]);

  async function handleAutoWeather(silent = false) {
    setWeatherLoading(true);
    try {
      const weatherData = await getCurrentLocationAndWeather();
      setTemperature(weatherData.temperature);
      if (weatherData.rainfall && weatherData.rainfall !== "0") {
        setRainfall(weatherData.rainfall);
      }

      const parts = weatherData.locationName.split(",");
      if (parts.length > 1) {
        const detectedCountry = parts[parts.length - 1].trim();
        const matchedArea = AREAS.find((a) => a.toLowerCase() === detectedCountry.toLowerCase());
        if (matchedArea) {
          setArea(matchedArea);
        }
      }

      setLocationBadge(`${weatherData.locationName} (${weatherData.temperature}°C)`);
    } catch (err) {
      if (!silent) {
        setMessageColor("red");
        setMessage(err.message || "Could not fetch location data.");
      }
    } finally {
      setWeatherLoading(false);
    }
  }

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

    const numericFields = ["year", "rainfall", "pesticides", "temperature"];
    for (const key of numericFields) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all environmental and input fields.");
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
        setMessage(Array.isArray(data.detail) ? data.detail.map((err) => err.msg).join(", ") : data.detail || "Something went wrong.");
        return;
      }

      setPredictedYield(`${data.predicted_yield.toFixed(2)} ${data.unit}`);
      setShowResult(true);
    } catch (err) {
      setMessageColor("red");
      setMessage("Could not connect to the backend server.");
    } finally {
      setLoading(false);
    }
  }

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
          <div style={{ marginBottom: "2rem" }}>
            <span className="eyebrow" style={{ color: "#9FD23A" }}>HARVEST FORECASTING</span>
            <TextSplit as="h1" className={styles.title}>
              Yield Prediction
            </TextSplit>
            <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
              Estimate expected harvest output (metric tons per hectare) based on country models, rainfall, temperature, and pesticide volume.
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <button
              type="button"
              onClick={() => handleAutoWeather(false)}
              disabled={weatherLoading}
              className="btn-pill"
              style={{ fontSize: "0.8rem", gap: "0.5rem" }}
            >
              <LocationIcon size={16} color="#9FD23A" />
              {weatherLoading ? "LOCATING..." : "USE LIVE LOCATION & WEATHER"}
            </button>
            {locationBadge && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#9FD23A", fontWeight: 600, padding: "0.4rem 0.9rem", borderRadius: "50px", backgroundColor: "rgba(159, 210, 58, 0.1)" }}>
                <LocationIcon size={16} color="#9FD23A" />
                {locationBadge}
              </span>
            )}
          </div>

          {autoFillNote && (
            <div className={styles.autoFillNote} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <BulbIcon size={18} color="#9FD23A" />
              {autoFillNote}
            </div>
          )}

          <form onSubmit={predictYield}>
            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", marginBottom: "1.2rem" }}>
              1. REGION & CROP SELECTION
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Country / Region</label>
                <select value={area} onChange={(e) => setArea(e.target.value)} className={styles.selectUnderline}>
                  {AREAS.map((a) => (<option key={a} value={a}>{a}</option>))}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Target Crop</label>
                <select value={item} onChange={(e) => setItem(e.target.value)} className={styles.selectUnderline}>
                  {ITEMS.map((i) => (<option key={i} value={i}>{i}</option>))}
                </select>
              </div>
            </div>

            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", margin: "2.5rem 0 1.2rem" }}>
              2. CLIMATE & AGRICULTURAL INPUTS (AUTO-DETECTION READY)
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Target Harvest Year</label>
                <input type="number" placeholder="e.g. 2026" value={year} onChange={(e) => setYear(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Average Rainfall (mm)</label>
                <input type="number" step="any" placeholder="e.g. 1400" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Pesticides Used (tonnes)</label>
                <input type="number" step="any" placeholder="e.g. 120" value={pesticides} onChange={(e) => setPesticides(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Avg Temperature (°C)</label>
                <input type="number" step="any" placeholder="e.g. 21" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="input-underline" />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ width: "100%", marginTop: "2rem" }}>
              {loading ? "CALCULATING HARVEST YIELD..." : "RUN HARVEST YIELD PREDICTION →"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.5rem", color: messageColor === "green" ? "#9FD23A" : "#FF6319", textAlign: "center", fontSize: "0.95rem" }}>
              {message}
            </div>
          )}

          {showResult && (
            <div className={styles.resultBox}>
              <span className="eyebrow" style={{ color: "#9FD23A" }}>ESTIMATED HARVEST OUTPUT</span>
              <div className={styles.resultTitle}>{predictedYield}</div>
              <p style={{ opacity: 0.85 }}>Projected metric yield per hectare</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
