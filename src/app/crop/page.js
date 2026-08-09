"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./crop.module.css";
import { getApiUrl } from "@/lib/api";

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

  // Weather lookup button loading state
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherBtnText, setWeatherBtnText] = useState("📍 Use My Current Weather");

  // Messages and results
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
    }
  }, [router]);

  async function useMyWeather() {
    if (!navigator.geolocation) {
      setMessageColor("red");
      setMessage("Location access is not supported in this browser.");
      return;
    }

    setWeatherLoading(true);
    setWeatherBtnText("Getting your location...");
    setMessage("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setWeatherBtnText("Fetching weather...");

        try {
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation`;
          const response = await fetch(weatherUrl);
          const data = await response.json();

          setTemperature(data.current.temperature_2m.toString());
          setHumidity(data.current.relative_humidity_2m.toString());
          setRainfall(data.current.precipitation.toString());

          setMessageColor("green");
          setMessage("Weather filled in! Note: rainfall is current, not seasonal — feel free to adjust it.");
        } catch (err) {
          setMessageColor("red");
          setMessage("Could not fetch weather data. Please enter values manually.");
        } finally {
          setWeatherBtnText("📍 Use My Current Weather");
          setWeatherLoading(false);
        }
      },
      (error) => {
        setMessageColor("red");
        setMessage("Location permission denied. Please enter weather values manually.");
        setWeatherBtnText("📍 Use My Current Weather");
        setWeatherLoading(false);
      }
    );
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

    // Validation check
    for (const key in payload) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all fields.");
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

      setPredictedCrop(data.crop);
      setConfidence((data.confidence * 100).toFixed(1));
      setShowResult(true);

      // Save crop recommendation in localstorage for other pages
      localStorage.setItem("recommendedCrop", data.crop);
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
            <div className={styles.cardIconWrap}>🌱</div>
            <h2>Crop Recommendation</h2>
            <p>Enter your soil and weather data to find the best crop</p>
          </div>

          <button
            type="button"
            onClick={useMyWeather}
            disabled={weatherLoading}
            className={styles.weatherBtn}
          >
            {weatherBtnText}
          </button>

          <form onSubmit={predictCrop}>
            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Soil Nutrients</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nitrogen (N)</label>
                  <input type="number" placeholder="0-140" value={N} onChange={(e) => setN(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Phosphorus (P)</label>
                  <input type="number" placeholder="0-145" value={P} onChange={(e) => setP(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Potassium (K)</label>
                  <input type="number" placeholder="0-205" value={K} onChange={(e) => setK(e.target.value)} />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Weather & Climate</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Temperature (°C)</label>
                  <input type="number" placeholder="-10 to 55" value={temperature} onChange={(e) => setTemperature(e.target.value)} step="any" />
                </div>
                <div className={styles.field}>
                  <label>Humidity (%)</label>
                  <input type="number" placeholder="0-100" value={humidity} onChange={(e) => setHumidity(e.target.value)} step="any" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Soil pH</label>
                  <input type="number" placeholder="0-14" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Rainfall (mm)</label>
                  <input type="number" placeholder="0-350" value={rainfall} onChange={(e) => setRainfall(e.target.value)} step="any" />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : <>Predict Crop <span>→</span></>}
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
              <h3>{predictedCrop}</h3>
              <p className={styles.resultConf}>Confidence: {confidence}%</p>
              <div className={styles.confBar}>
                <div className={styles.confFill} style={{ width: `${confidence}%` }} />
              </div>
              <div className={styles.nextButtons}>
                <button onClick={() => router.push("/fertilizer")} className={styles.nextBtn}>
                  Get Fertilizer →
                </button>
                <button onClick={() => router.push("/yield")} className={styles.nextBtnAlt}>
                  Predict Yield →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
