"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import TreeLogo from "@/components/TreeLogo";

export default function Home() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    }, observerOptions);

    const sections = [featuresRef, stepsRef, statsRef, ctaRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.bodyWrapper}>
      {/* ── NAVIGATION ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <TreeLogo size={36} />
          </Link>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How it Works</a>
            <Link href="/login" className={styles.navLink}>Log in</Link>
            <Link href="/login" className={styles.btnNav}>
              Get Started
              <span className={styles.btnNavArrow}>→</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO WITH VIDEO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.videoContainer}>
          <video
            className={styles.heroVideo}
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
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.tag}>
            <span className={styles.tagDot} />
            AI-Powered Smart Farming
          </div>
          <h1 className={styles.heroTitle}>
            Agri<span className={styles.highlight}>lux</span>
          </h1>
          <div className={styles.ctaRow}>
            <Link href="/login" className={styles.btnPrimary}>
              Start Farming Smarter
              <span className={styles.btnIcon}>→</span>
            </Link>
            <Link href="/login" className={styles.btnOutline}>
              I have an account
            </Link>
          </div>
          <div className={styles.checks}>
            <span className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span> Free to use
            </span>
            <span className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span> Instant results
            </span>
            <span className={styles.checkItem}>
              <span className={styles.checkIcon}>✓</span> Data-driven advice
            </span>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={`${styles.statsGrid} ${styles.animateSection}`}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Farmers Helped</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Crops Supported</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>99%</span>
            <span className={styles.statLabel}>Accuracy Rate</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>24/7</span>
            <span className={styles.statLabel}>AI Assistance</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className={styles.featuresSection} ref={featuresRef}>
        <div className={`${styles.sectionInner} ${styles.animateSection}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Features</span>
            <h2 className={styles.sectionTitle}>Everything you need to grow</h2>
            <p className={styles.sectionSubtitle}>
              Powerful AI tools designed specifically for modern farmers
            </p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <span>🌱</span>
              </div>
              <h3>Crop Recommendation</h3>
              <p>
                Enter soil nutrients and climate data to find the best crop for your
                land using ML models.
              </p>
              <div className={styles.featureCardGlow} />
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <span>💧</span>
              </div>
              <h3>Fertilizer Advisor</h3>
              <p>
                Get the perfect fertilizer match based on your crop, soil type, and
                nutrient levels.
              </p>
              <div className={styles.featureCardGlow} />
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <span>📈</span>
              </div>
              <h3>Yield Prediction</h3>
              <p>
                Estimate your expected harvest before you plant, backed by data from
                100+ countries.
              </p>
              <div className={styles.featureCardGlow} />
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <span>🤖</span>
              </div>
              <h3>AI Chat Assistant</h3>
              <p>
                Ask our intelligent assistant anything about farming — powered by
                Google Gemini AI.
              </p>
              <div className={styles.featureCardGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX CTA ── */}
      <section className={styles.parallaxCta} ref={ctaRef}>
        <div className={`${styles.parallaxContent} ${styles.animateSection}`}>
          <h2>Ready to transform your farm?</h2>
          <p>
            Join thousands of farmers using AI to make smarter decisions and grow
            more sustainably.
          </p>
          <Link href="/login" className={styles.btnPrimary}>
            Get started free
            <span className={styles.btnIcon}>→</span>
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className={styles.stepsSection} ref={stepsRef}>
        <div className={`${styles.sectionInner} ${styles.animateSection}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>How it works</span>
            <h2 className={styles.sectionTitle}>
              From data to decision in three steps
            </h2>
            <p className={styles.sectionSubtitle}>
              Simple, fast, and backed by machine learning
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}>📊</div>
              <h3>Enter your data</h3>
              <p>
                Input soil nutrients (N, P, K), climate conditions, and crop details
                into simple, guided forms.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <div className={styles.connectorLine} />
              <div className={styles.connectorDot} />
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}>🧠</div>
              <h3>AI analyzes</h3>
              <p>
                Our ML models process your inputs and cross-reference thousands of
                data points to find the best recommendation.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <div className={styles.connectorLine} />
              <div className={styles.connectorDot} />
            </div>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}>✅</div>
              <h3>Get recommendations</h3>
              <p>
                Receive instant, actionable advice — every prediction is saved to
                your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <TreeLogo size={30} />
            </div>
            <p className={styles.footerTagline}>
              AI-Powered Smart Farming Assistant. Helping farmers make data-driven
              decisions for a sustainable future.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerCol}>
              <h4>Product</h4>
              <Link href="/login">Crop Recommendation</Link>
              <Link href="/login">Fertilizer Advisor</Link>
              <Link href="/login">Yield Prediction</Link>
              <Link href="/login">AI Chat</Link>
            </div>
            <div className={styles.footerCol}>
              <h4>Company</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it Works</a>
              <Link href="/login">Get Started</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Agrilux · Smart farming for everyone</span>
          <span>Built with 💚 for farmers worldwide</span>
        </div>
      </footer>
    </div>
  );
}
