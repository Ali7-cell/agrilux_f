"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./crop.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import { getApiUrl, handleUnauthorized } from "@/lib/api";
import { getCurrentLocationAndWeather } from "@/lib/weather";
import { LocationIcon } from "@/components/icons/Icons";

const SOIL_PRESETS = [
  {
    name: "🌾 Alluvial Loam",
    N: "90", P: "42", K: "43",
    temperature: "20.8", humidity: "82", ph: "6.5", rainfall: "202",
    desc: "Balanced nutrient profile ideal for wheat & cereal crops."
  },
  {
    name: "🍚 Rice Paddy",
    N: "80", P: "40", K: "40",
    temperature: "23.6", humidity: "80", ph: "6.4", rainfall: "235",
    desc: "High moisture & rainfall profile suited for paddy rice."
  },
  {
    name: "☁️ Cotton Belt",
    N: "120", P: "50", K: "20",
    temperature: "25.5", humidity: "65", ph: "6.9", rainfall: "80",
    desc: "Nitrogen-rich dryland profile for fiber crops."
  },
  {
    name: "🌽 Maize / Grain",
    N: "70", P: "48", K: "20",
    temperature: "22.3", humidity: "64", ph: "6.1", rainfall: "75",
    desc: "Moderate rainfall & balanced N-P profile."
  }
];

export default function CropRecommendation() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Form states
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");

  // Location & Weather status
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [locationBadge, setLocationBadge] = useState("");
  const [weatherBtnText, setWeatherBtnText] = useState("DETECT LIVE LOCATION & WEATHER");

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [predictedCrop, setPredictedCrop] = useState("");
  const [confidence, setConfidence] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthorized(true);
      // Auto-detect weather on page load if user grants permission
      handleAutoWeather(true);
    }
  }, [router]);

  async function handleAutoWeather(silent = false) {
    setWeatherLoading(true);
    if (!silent) setWeatherBtnText("LOCATING YOUR FARM...");

    try {
      const weatherData = await getCurrentLocationAndWeather();
      setTemperature(weatherData.temperature);
      setHumidity(weatherData.humidity);
      setRainfall(weatherData.rainfall);
      setLocationBadge(`${weatherData.locationName} (${weatherData.temperature}°C, ${weatherData.humidity}% Humidity)`);
      setMessageColor("green");
      setMessage(`Weather auto-filled for ${weatherData.locationName}!`);
      setWeatherBtnText(`WEATHER LOADED: ${weatherData.locationName}`);
    } catch (err) {
      if (!silent) {
        setMessageColor("red");
        setMessage(err.message || "Could not fetch weather data.");
        setWeatherBtnText("DETECT LIVE LOCATION & WEATHER");
      }
    } finally {
      setWeatherLoading(false);
    }
  }

  function handleApplyPreset(preset) {
    setN(preset.N);
    setP(preset.P);
    setK(preset.K);
    setTemperature(preset.temperature);
    setHumidity(preset.humidity);
    setPh(preset.ph);
    setRainfall(preset.rainfall);
    setMessageColor("green");
    setMessage(`Loaded '${preset.name}' sample soil parameters.`);
    setShowResult(false);
  }

  function handleResetForm() {
    setN("");
    setP("");
    setK("");
    setTemperature("");
    setHumidity("");
    setPh("");
    setRainfall("");
    setShowResult(false);
    setMessage("");
  }

  async function predictCrop(e) {
    e.preventDefault();
    setShowResult(false);
    setMessage("");

    const token = localStorage.getItem("token");
    const payload = {
      N: N !== "" ? Number(N) : null,
      P: P !== "" ? Number(P) : null,
      K: K !== "" ? Number(K) : null,
      temperature: temperature !== "" ? Number(temperature) : null,
      humidity: humidity !== "" ? Number(humidity) : null,
      ph: ph !== "" ? Number(ph) : null,
      rainfall: rainfall !== "" ? Number(rainfall) : null,
    };

    for (const key in payload) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all soil and climate fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch(`${getApiUrl()}/predict-crop`, {
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

      setPredictedCrop(data.crop);
      setConfidence((data.confidence * 100).toFixed(1));
      setShowResult(true);
      localStorage.setItem("recommendedCrop", data.crop);
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
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/dashboard" className="btn-pill" style={{ fontSize: "0.8rem" }}>
            ← BACK TO DASHBOARD
          </Link>
          <button type="button" onClick={handleResetForm} className={styles.resetBtn}>
            RESET INPUTS
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className="eyebrow" style={{ color: "#9FD23A" }}>SOIL & CLIMATE DIAGNOSTICS</span>
            <TextSplit as="h1" className={styles.title}>
              Crop Recommendation
            </TextSplit>
            <p style={{ opacity: 0.8, fontSize: "1.05rem" }}>
              Enter field nutrient levels and ambient climate variables to receive ML-powered crop guidance tailored to your soil.
            </p>
          </div>

          {/* Preset Chips */}
          <div className={styles.presetSection}>
            <span className={styles.presetHeading}>QUICK FILL SAMPLE SOIL PROFILES:</span>
            <div className={styles.presetChips}>
              {SOIL_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={styles.presetChip}
                  title={preset.desc}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <button
              type="button"
              onClick={() => handleAutoWeather(false)}
              disabled={weatherLoading}
              className={styles.weatherBtn}
              style={{ margin: 0 }}
            >
              <LocationIcon size={18} color="#9FD23A" />
              {weatherLoading ? "FETCHING LOCATION & WEATHER..." : weatherBtnText}
            </button>

            {locationBadge && (
              <span className={styles.locationBadgeSpan}>
                <LocationIcon size={16} color="#9FD23A" />
                {locationBadge}
              </span>
            )}
          </div>

          <form onSubmit={predictCrop}>
            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", marginBottom: "1.2rem" }}>
              1. SOIL NUTRIENTS (N-P-K)
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Nitrogen (N)</label>
                  <span className={styles.rangeBadge}>0-140</span>
                </div>
                <input type="number" placeholder="e.g. 90" value={N} onChange={(e) => setN(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Phosphorus (P)</label>
                  <span className={styles.rangeBadge}>0-145</span>
                </div>
                <input type="number" placeholder="e.g. 42" value={P} onChange={(e) => setP(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Potassium (K)</label>
                  <span className={styles.rangeBadge}>0-205</span>
                </div>
                <input type="number" placeholder="e.g. 43" value={K} onChange={(e) => setK(e.target.value)} className="input-underline" />
              </div>
            </div>

            <span className="eyebrow" style={{ color: "#9FD23A", display: "block", margin: "2.5rem 0 1.2rem" }}>
              2. CLIMATE & ENVIRONMENT (AUTO-DETECTION READY)
            </span>
            <div className={styles.formGrid}>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Temperature (°C)</label>
                  <span className={styles.rangeBadge}>-10 to 55°C</span>
                </div>
                <input type="number" step="any" placeholder="e.g. 20.8" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Humidity (%)</label>
                  <span className={styles.rangeBadge}>0-100%</span>
                </div>
                <input type="number" step="any" placeholder="e.g. 82" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Soil pH</label>
                  <span className={styles.rangeBadge}>0-14</span>
                </div>
                <input type="number" step="0.1" placeholder="e.g. 6.5" value={ph} onChange={(e) => setPh(e.target.value)} className="input-underline" />
              </div>
              <div className={styles.fieldGroup}>
                <div className={styles.labelRow}>
                  <label className={styles.fieldLabel}>Rainfall (mm)</label>
                  <span className={styles.rangeBadge}>0-350 mm</span>
                </div>
                <input type="number" step="any" placeholder="e.g. 200" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="input-underline" />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading} style={{ width: "100%", marginTop: "2rem" }}>
              {loading ? "ANALYZING SOIL & CLIMATE DATA..." : "GENERATE CROP RECOMMENDATION →"}
            </button>
          </form>

          {message && (
            <div className={styles.messageAlert} style={{ color: messageColor === "green" ? "#9FD23A" : "#FF6319" }}>
              {message}
            </div>
          )}

          {showResult && (
            <div className={styles.resultBox}>
              <span className="eyebrow" style={{ color: "#9FD23A" }}>AI RECOMMENDED CROP</span>
              <div className={styles.resultTitle}>{predictedCrop}</div>
              <p style={{ opacity: 0.85, fontSize: "0.95rem" }}>Model Confidence Level: <strong>{confidence}%</strong></p>
              
              <div className={styles.confBar}>
                <div className={styles.confFill} style={{ width: `${confidence}%` }} />
              </div>

              <div className={styles.resultTipsCard}>
                <span className={styles.tipTitle}>💡 Agricultural Tip for {predictedCrop}:</span>
                <p className={styles.tipText}>
                  Your soil profile N-P-K ({N}-{P}-{K}) and climate ({temperature}°C, {humidity}% humidity) closely match optimal conditions for growing <strong>{predictedCrop}</strong>. Proceed to Fertilizer Advisor for custom nutrient ratio adjustments.
                </p>
              </div>

              <div className={styles.resultActions}>
                <button onClick={() => router.push("/fertilizer")} className="btn-pill">
                  GET FERTILIZER ADVICE →
                </button>
                <button onClick={() => router.push("/yield")} className="btn-pill" style={{ opacity: 0.9 }}>
                  PREDICT YIELD →
                </button>
                <button 
                  onClick={() => router.push(`/chat?query=Tell me optimal farming practices for growing ${encodeURIComponent(predictedCrop)}`)} 
                  className="btn-pill" 
                  style={{ backgroundColor: "rgba(159, 210, 58, 0.15)", borderColor: "#9FD23A", color: "#9FD23A" }}
                >
                  ASK AI ADVISOR 💬
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

