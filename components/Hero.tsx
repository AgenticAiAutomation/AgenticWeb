import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Agentic AI Automation"
      className="hero-gradient grid-bg"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "100px 20px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial decorative blobs */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "-120px", right: "-100px",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-80px", left: "-80px",
        width: "400px", height: "400px",
        background: "radial-gradient(circle, rgba(123,94,167,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Status badge */}
        <div className="animate-fade-up animate-fade-up-delay-1" style={{ marginBottom: "28px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)",
            borderRadius: "100px", padding: "6px 14px",
            fontFamily: "var(--font-display)", fontSize: "0.75rem", fontWeight: 600,
            color: "var(--accent-cyan)", letterSpacing: "0.05em",
          }}>
            <span className="pulse-dot" />
            Enterprise AI Automation · Trusted Globally
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up animate-fade-up-delay-2"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.4rem, 6vw, 5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "var(--text-primary)",
            maxWidth: "860px",
            marginBottom: "24px",
          }}
        >
          Your Business,{" "}
          <span style={{
            background: "linear-gradient(90deg, var(--accent-cyan), #7b5ea7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Automated
          </span>{" "}
          by Intelligent AI Agents
        </h1>

        {/* Sub-headline */}
        <p
          className="animate-fade-up animate-fade-up-delay-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "var(--text-secondary)",
            maxWidth: "600px",
            marginBottom: "40px",
            lineHeight: 1.7,
          }}
        >
          We deploy agentic AI workflows that eliminate manual operations, compress execution time, and scale your output — without scaling your headcount.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up animate-fade-up-delay-4"
          style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "56px" }}
        >
          <a href="#book" className="btn-primary" style={{ fontSize: "0.9375rem", padding: "15px 32px" }}>
            Book Free Automation Audit →
          </a>
          <a href="#services" className="btn-ghost" style={{ fontSize: "0.9375rem", padding: "15px 28px" }}>
            See What We Automate
          </a>
        </div>

        {/* Social proof strip */}
        <div
          className="animate-fade-up animate-fade-up-delay-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            alignItems: "center",
            paddingTop: "32px",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          {[
            { value: "80%", label: "Avg. task reduction in 90 days" },
            { value: "3–6×", label: "Faster workflow execution" },
            { value: "24 / 7", label: "AI agents working autonomously" },
            { value: "<3 wks", label: "Typical time-to-live" },
          ].map((stat) => (
            <div key={stat.value}>
              <div className="stat-number" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>{stat.value}</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: "2px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
