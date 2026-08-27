"use client";

import Link from "next/link";
import styles from "./page.module.css";
import HeaderNav from "@/components/HeaderNav";
import TextSplit from "@/components/TextSplit";
import Product3DCanvas from "@/components/Product3DCanvas";
import PlantGrowthCanvas from "@/components/PlantGrowthCanvas";
import IconGlowCard from "@/components/IconGlowCard";
import TreeLogo from "@/components/TreeLogo";
import { CropIcon, FertilizerIcon, YieldIcon, RobotIcon } from "@/components/icons/Icons";

export default function Home() {
  return (
    <div className={styles.bodyWrapper}>
      {/* Dynamic Theme Nav Header */}
      <HeaderNav />

      {/* ── 1. HERO SECTION (Dark Green #404F1D) ── */}
      <section className={styles.hero} data-theme="dark">
        <video
          className={styles.heroVideoBg}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
        >
          <source
            src="https://videos.pexels.com/video-files/2536403/2536403-sd_640_360_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#9FD23A" }} />
            AI-POWERED SMART FARMING PLATFORM
          </div>

          <h1 className={styles.heroTitle}>
            AGRI<span className={styles.heroTitleHighlight}>LUX</span>
          </h1>

          <p className={styles.heroSub}>
            Agrilux delivers machine-learning soil diagnostics, crop selection, fertilizer recommendations, and harvest yield predictions for modern sustainable farming.
          </p>

          <div className={styles.heroCtaRow}>
            <Link href="/login" className="btn-pill">
              <span>•</span> START FARMING SMARTER <span>•</span>
            </Link>
            <Link href="/#features" className="btn-pill" style={{ opacity: 0.8 }}>
              <span>•</span> EXPLORE AI TOOLS <span>•</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. PINNED 3D PRODUCT CANVAS (Scroll-driven 360° Rotation) ── */}
      <Product3DCanvas />

      {/* ── 3. STATS & IMPACT SECTION (Light Beige #F4EDE6) ── */}
      <section className={`${styles.statsSection} light-section`} data-theme="light">
        <div className={styles.statsInner}>
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
            <span className="eyebrow" style={{ color: "#636F3D" }}>DATA-DRIVEN IMPACT</span>
            <TextSplit as="h2" className="h2-title" style={{ color: "#636F3D", margin: "0.75rem 0" }}>
              Empowering Agriculture Across 50+ Global Regions
            </TextSplit>
            <p style={{ color: "#4C5B20", fontSize: "1.1rem" }}>
              Our AI algorithms process million-point climate & soil databases to maximize yields while minimizing environmental impact.
            </p>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNum}>10,000+</div>
              <div className={styles.statLabel}>Farmers Empowered</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNum}>50+</div>
              <div className={styles.statLabel}>Crops Modelled</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNum}>99%</div>
              <div className={styles.statLabel}>ML Precision Rate</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNum}>24/7</div>
              <div className={styles.statLabel}>Gemini AI Assistant</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. INTERACTIVE PLANT GROWTH CANVAS ── */}
      <PlantGrowthCanvas />

      {/* ── 5. AI FEATURES GRID (Dark Green #404F1D) ── */}
      <section id="features" className={styles.featuresSection} data-theme="dark">
        <div className={styles.sectionHeader}>
          <span className="eyebrow" style={{ color: "#9FD23A" }}>INTELLIGENT SUITE</span>
          <TextSplit as="h2" className="h2-title" style={{ margin: "0.75rem 0" }}>
            Everything You Need to Maximize Yield
          </TextSplit>
          <p style={{ color: "rgba(244,237,230,0.8)", fontSize: "1.1rem" }}>
            Four specialized machine-learning engines tailored for modern farm management.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <Link href="/login" style={{ textDecoration: "none", color: "inherit" }}>
            <IconGlowCard
              icon={<CropIcon size={28} color="#9FD23A" />}
              title="Crop Recommendation"
              description="Input soil N-P-K nutrients, temperature, humidity, pH, and rainfall to discover optimal crops for your land."
            />
          </Link>

          <Link href="/login" style={{ textDecoration: "none", color: "inherit" }}>
            <IconGlowCard
              icon={<FertilizerIcon size={28} color="#9FD23A" />}
              title="Fertilizer Advisor"
              description="Calculate exact nutrient ratios and fertilizer types tailored to your specific crop and soil composition."
            />
          </Link>

          <Link href="/login" style={{ textDecoration: "none", color: "inherit" }}>
            <IconGlowCard
              icon={<YieldIcon size={28} color="#9FD23A" />}
              title="Yield Prediction"
              description="Estimate expected harvest metric tons per hectare before planting using historic agricultural data."
            />
          </Link>

          <Link href="/login" style={{ textDecoration: "none", color: "inherit" }}>
            <IconGlowCard
              icon={<RobotIcon size={28} color="#9FD23A" />}
              title="Gemini AI Assistant"
              description="Real-time conversational guidance for plant pathology, weather alerts, and crop disease prevention."
            />
          </Link>
        </div>
      </section>

      {/* ── 6. HOW IT WORKS (Light Beige #F4EDE6) ── */}
      <section id="how-it-works" className={`${styles.howSection} light-section`} data-theme="light">
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <span className="eyebrow" style={{ color: "#636F3D" }}>SIMPLE WORKFLOW</span>
          <TextSplit as="h2" className="h2-title" style={{ color: "#636F3D", margin: "0.75rem 0" }}>
            From Soil Sample to High Harvest in Three Steps
          </TextSplit>
        </div>

        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>STEP 01</div>
            <h3 className={styles.stepTitle}>Gather Field Data</h3>
            <p className={styles.stepDesc}>
              Enter soil nutrients (N, P, K), pH, and local weather manually or auto-fill via GPS weather lookup.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNum}>STEP 02</div>
            <h3 className={styles.stepTitle}>AI Neural Analysis</h3>
            <p className={styles.stepDesc}>
              Our trained ML algorithms run real-time inference against vast agricultural data models.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNum}>STEP 03</div>
            <h3 className={styles.stepTitle}>Execute & Track</h3>
            <p className={styles.stepDesc}>
              Receive precision recommendations and save history to monitor long-term crop performance.
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER & CTA (Dark Green #404F1D) ── */}
      <footer className={styles.footerSection} data-theme="dark">
        <div className={styles.footerInner}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <TreeLogo size={32} />
              <span style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em" }}>AGRILUX</span>
            </div>
            <p style={{ opacity: 0.8, lineHeight: 1.6, maxWidth: "340px", fontSize: "0.95rem" }}>
              AI-Powered Smart Farming Assistant. Data-driven decisions for sustainable global food production.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.2rem", color: "#9FD23A" }}>
              PRODUCTS
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.95rem" }}>
              <Link href="/login" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>Crop Recommendation</Link>
              <Link href="/login" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>Fertilizer Advisor</Link>
              <Link href="/login" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>Yield Prediction</Link>
              <Link href="/login" style={{ color: "inherit", opacity: 0.8, textDecoration: "none" }}>AI Assistant</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.2rem", color: "#9FD23A" }}>
              EARLY ACCESS
            </h4>
            <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "1rem" }}>
              Subscribe for regional soil updates and smart farming insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: "0.5rem" }}>
              <input type="email" placeholder="ENTER YOUR EMAIL" className="input-underline" style={{ flex: 1 }} />
              <button type="submit" className="btn-submit" style={{ padding: "0.7em 1.2em" }}>
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Agrilux · Precision AI Agriculture</span>
          <span>Designed with FarmMinerals aesthetics</span>
        </div>
      </footer>
    </div>
  );
}
