"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./fertilizer.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const CROPS = [
  "Barley", "Cotton", "Ground Nuts", "Maize", "Millets",
  "Oil seeds", "Paddy", "Pulses", "Sugarcane", "Tobacco", "Wheat",
];

const SOILS = ["Black", "Clayey", "Loamy", "Red", "Sandy"];

export default function FertilizerAdvisor() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Form states
  const [cropType, setCropType] = useState("Barley");
  const [soilType, setSoilType] = useState("Black");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [moisture, setMoisture] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorous, setPhosphorous] = useState("");
  const [potassium, setPotassium] = useState("");

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

    // Auto-fill from Crop Recommendation
    const recommendedCrop = localStorage.getItem("recommendedCrop");
    if (recommendedCrop) {
      const matched = CROPS.find(
        (c) => c.toLowerCase() === recommendedCrop.toLowerCase()
      );
      if (matched) {
        setCropType(matched);
        setAutoFillNote(`Auto-filled from your Crop Recommendation: ${recommendedCrop}`);
      } else {
        setAutoFillNote(
          `Note: "${recommendedCrop}" isn't in this model's crop list — please select manually.`
        );
      }
    }
  }, [router]);

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

    // Numeric checks
    const numericFields = ["temperature", "humidity", "moisture", "nitrogen", "potassium", "phosphorous"];
    for (const key of numericFields) {
      if (payload[key] === null) {
        setMessageColor("red");
        setMessage("Please fill in all fields.");
        return;
      }
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/predict-fertilizer`, {
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

      setPredictedFertilizer(data.fertilizer);
      setConfidence((data.confidence * 100).toFixed(1));
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
            <div className={styles.cardIconWrap}>💧</div>
            <h2>Fertilizer Recommendation</h2>
            <p>Find the perfect fertilizer for your crop and soil</p>
          </div>

          {autoFillNote && (
            <div className={styles.autoFillNote}>
              <span>💡</span> {autoFillNote}
            </div>
          )}

          <form onSubmit={predictFertilizer}>
            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Crop & Soil</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Crop Type</label>
                  <select value={cropType} onChange={(e) => setCropType(e.target.value)}>
                    {CROPS.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label>Soil Type</label>
                  <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                    {SOILS.map((s) => (<option key={s} value={s}>{s}</option>))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Environment</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Temperature (°C)</label>
                  <input type="number" value={temperature} onChange={(e) => setTemperature(e.target.value)} step="any" />
                </div>
                <div className={styles.field}>
                  <label>Humidity (%)</label>
                  <input type="number" value={humidity} onChange={(e) => setHumidity(e.target.value)} step="any" />
                </div>
                <div className={styles.field}>
                  <label>Moisture</label>
                  <input type="number" value={moisture} onChange={(e) => setMoisture(e.target.value)} step="any" />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h4 className={styles.formSectionTitle}>Soil Nutrients</h4>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nitrogen</label>
                  <input type="number" value={nitrogen} onChange={(e) => setNitrogen(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Phosphorous</label>
                  <input type="number" value={phosphorous} onChange={(e) => setPhosphorous(e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label>Potassium</label>
                  <input type="number" value={potassium} onChange={(e) => setPotassium(e.target.value)} />
                </div>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? <span className={styles.spinner} /> : <>Predict Fertilizer <span>→</span></>}
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
              <div className={styles.resultIcon}>🧪</div>
              <h3>{predictedFertilizer}</h3>
              <p className={styles.resultConf}>Confidence: {confidence}%</p>
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
