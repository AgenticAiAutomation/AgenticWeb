const steps = [
  {
    number: "01",
    title: "Automation Audit",
    description:
      "We map your existing workflows, identify automation opportunities, and calculate the operational ROI. Free, thorough, no obligation.",
    duration: "Week 1",
  },
  {
    number: "02",
    title: "Architecture Design",
    description:
      "Our team designs the agentic AI architecture — agent roles, tools, integrations, data flows — tailored to your stack and business logic.",
    duration: "Week 1–2",
  },
  {
    number: "03",
    title: "Build & Integration",
    description:
      "We build, test, and integrate your AI agents across your systems. Every agent is validated against real operational scenarios before deployment.",
    duration: "Week 2–4",
  },
  {
    number: "04",
    title: "Deploy & Monitor",
    description:
      "Go live with full observability. We monitor performance, handle edge cases, and continuously improve agents based on real-world data.",
    duration: "Ongoing",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-gradient"
      style={{ padding: "100px 20px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px", maxWidth: "600px" }}>
          <span className="section-label">How It Works</span>
          <h2
            id="process-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginTop: "12px",
              letterSpacing: "-0.03em",
            }}
          >
            From Audit to Autonomous Operations
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "var(--text-secondary)", marginTop: "16px", lineHeight: 1.7,
          }}>
            A structured, low-friction deployment process that gets you to production fast — with no operational disruption.
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "2px",
            background: "var(--border-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={step.number}
              style={{
                background: "var(--bg-card)",
                padding: "32px 28px",
                display: "flex", flexDirection: "column", gap: "16px",
                position: "relative",
              }}
            >
              {/* Step number accent */}
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "3.5rem",
                fontWeight: 800, color: "rgba(0,229,255,0.08)",
                lineHeight: 1, position: "absolute", top: "20px", right: "20px",
              }}>
                {step.number}
              </div>

              {/* Duration chip */}
              <span style={{
                display: "inline-block",
                background: "var(--accent-cyan-dim)",
                border: "1px solid rgba(0,229,255,0.2)",
                borderRadius: "100px", padding: "3px 10px",
                fontFamily: "var(--font-display)", fontSize: "0.7rem",
                fontWeight: 700, color: "var(--accent-cyan)",
                letterSpacing: "0.05em", alignSelf: "flex-start",
              }}>
                {step.duration}
              </span>

              <div>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: "0.6875rem",
                  fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                  color: "var(--text-muted)", marginBottom: "8px",
                }}>
                  Step {i + 1}
                </div>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.125rem",
                  fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px",
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "0.9rem",
                  color: "var(--text-secondary)", lineHeight: 1.7,
                }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA prompt */}
        <div style={{
          marginTop: "48px", textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-body)", color: "var(--text-secondary)", fontSize: "1rem",
          }}>
            Ready to start? The first step costs you nothing.
          </p>
          <a href="#book" className="btn-primary">
            Book Your Free Automation Audit →
          </a>
        </div>
      </div>
    </section>
  );
}
