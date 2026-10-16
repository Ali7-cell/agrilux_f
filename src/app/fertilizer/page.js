"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./fertilizer.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import { getApiUrl, handleUnauthorized } from "@/lib/api";
import { getCurrentLocationAndWeather } from "@/lib/weather";
import { LocationIcon, BulbIcon } from "@/components/icons/Icons";

const CROPS = [
  "Barley", "Cotton", "Ground Nuts", "Maize", "Millets",
  "Oil seeds", "Paddy", "Pulses", "Sugarcane", "Tobacco", "Wheat",
];

const SOILS = ["Black", "Clayey", "Loamy", "Red", "Sandy"];

export default function FertilizerAdvisor() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [cropType, setCropType] = useState("Barley");
  const [soilType, setSoilType] = useState("Black");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [potassium, setPotassium] = useState("");

  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locationBadge, setLocationBadge] = useState("");
  const [autoFillNote, setAutoFillNote] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictedFertilizer, setPredictedFertilizer] = useState("");
  const [confidence, setConfidence] = useState("");
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
      const matched = CROPS.find((c) => c.toLowerCase() === recommendedCrop.toLowerCase());
      if (matched) {
        setCropType(matched);
        setAutoFillNote(`Auto-filled from your Crop Recommendation: ${recommendedCrop}`);
      } else {
        setAutoFillNote(`Note: "${recommendedCrop}" is not in this model's standard crop list.`);
      }
    }

    // Auto-detect weather on load
    handleAutoWeather(true);
  }, [router]);

  async function handleAutoWeather(silent = false) {
    setWeatherLoading(true);
    try {
      const weatherData = await getCurrentLocationAndWeather();
      setTemperature(weatherData.temperature);
      setHumidity(weatherData.humidity);
      setLocationBadge(`${weatherData.locationName} (${weatherData.temperature}°C, ${weatherData.humidity}% Humidity)`);
    } catch (err) {
      if (!silent) {
        setMessageColor("red");
        setMessage(err.message || "Could not fetch weather.");
      }
    } finally {
      setWeatherLoading(false);
    }
  }

  async function predictFertilizer(e) {
    e.preventDefault();
    setShowResult(false);
    setMessage("");

    const token = localStorage.getItem("token");
    const payload = {
      temperature: temperature !== "" ? Number(temperature) : null,
      humidity: humidity !== "" ? Number(humidity) : null,
      moisture: moisture !== "" ? Number(moisture) : null,
      soil_type: soilType,
      crop_type: cropType,
      nitrogen: nitrogen !== "" ? Number(nitrogen) : null,
      potassium: potassium !== "" ? Number(potassium) : null,
      phosphorous: phosphorous !== "" ? Number(phosphorous) : null,
    };

    const numericFields = ["temperature", "humidity", "moisture", "nitrogen", "potassium", "phosphorous"];
    for (const key of numericFields) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all environmental and nutrient fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/predict-fertilizer`, {
        method: "POST",
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

      setPredictedFertilizer(data.fertilizer);
      setConfidence((data.confidence * 100).toFixed(1));
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
            <span className="eyebrow" style={{ color: "#9FD23A" }}>NUTRIENT OPTIMIZATION</span>
            <TextSplit as="h1" className={styles.title}>
              Fertilizer Advisor
            </TextSplit>
            <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
              Calculate precise N-P-K fertilizer blends to boost crop yield while preventing soil degradation.
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
              {weatherLoading ? "LOCATING..." : "USE LIVE WEATHER & LOCATION"}
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

          <form onSubmit={predictFertilizer}>
            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", marginBottom: "1.2rem" }}>
              1. CROP & SOIL SELECTION
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Crop Type</label>
                <select value={cropType} onChange={(e) => setCropType(e.target.value)} className={styles.selectUnderline}>
                  {CROPS.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Soil Type</label>
                <select value={soilType} onChange={(e) => setSoilType(e.target.value)} className={styles.selectUnderline}>
                  {SOILS.map((s) => (<option key={s} value={s}>{s}</option>))}
                </select>
              </div>
            </div>

            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", margin: "2.5rem 0 1.2rem" }}>
              2. AMBIENT ENVIRONMENT (AUTO-DETECTION READY)
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Temperature (°C)</label>
                <input type="number" step="any" placeholder="e.g. 26" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Humidity (%)</label>
                <input type="number" step="any" placeholder="e.g. 52" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Soil Moisture</label>
                <input type="number" step="any" placeholder="e.g. 38" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="input-underline" />
              </div>
            </div>

            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", margin: "2.5rem 0 1.2rem" }}>
              3. NUTRIENT CONCENTRATIONS
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Nitrogen</label>
                <input type="number" placeholder="e.g. 37" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Phosphorous</label>
                <input type="number" placeholder="e.g. 0" value={phosphorous} onChange={(e) => setPhosphorous(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Potassium</label>
                <input type="number" placeholder="e.g. 0" value={potassium} onChange={(e) => setPotassium(e.target.value)} className="input-underline" />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ width: "100%", marginTop: "2rem" }}>
              {loading ? "CALCULATING FERTILIZER RATIO..." : "PREDICT OPTIMAL FERTILIZER →"}
            </button>
          </form>

          {message && (
            <div style={{ marginTop: "1.5rem", color: messageColor === "green" ? "#9FD23A" : "#FF6319", textAlign: "center", fontSize: "0.95rem" }}>
              {message}
            </div>
          )}

          {showResult && (
            <div className={styles.resultBox}>
              <span className="eyebrow" style={{ color: "#9FD23A" }}>OPTIMAL FERTILIZER FORMULA</span>
              <div className={styles.resultTitle}>{predictedFertilizer}</div>
              <p style={{ opacity: 0.85 }}>Model Confidence: {confidence}%</p>
              <div className={styles.confBar}>
                <div className={styles.confFill} style={{ width: `${confidence}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
