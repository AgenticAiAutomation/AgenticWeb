const services = [
  {
    id: "workflow",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="16" y="2" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="16" width="10" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7H16M14 12V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "AI Workflow Automation",
    headline: "End-to-end intelligent workflow orchestration",
    description:
      "We map, design, and deploy multi-step AI agent workflows across your core business operations — from data ingestion to decision-making to output delivery.",
    outcomes: ["80% manual task reduction", "Fully auditable process logs", "Cross-system orchestration"],
    href: "#workflow",
  },
  {
    id: "recruitment",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="9" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 14l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Recruitment Automation",
    headline: "AI-driven talent acquisition at scale",
    description:
      "Automate sourcing, CV screening, outreach sequences, and pipeline management. Your AI recruiting agent qualifies candidates 24/7 so your team only speaks to the right people.",
    outcomes: ["10× sourcing velocity", "Automated screening & scoring", "CRM + ATS integration"],
    href: "#recruitment",
  },
  {
    id: "leadgen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 20L14 8L20 14L26 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="8" r="2.5" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Lead Generation Automation",
    headline: "Autonomous outbound that never stops",
    description:
      "AI agents that identify, enrich, qualify, and engage leads across multiple channels. Personalized at scale. CRM-synced in real time. Fully measurable pipeline attribution.",
    outcomes: ["Qualified leads on autopilot", "Hyper-personalized outreach", "Real-time CRM enrichment"],
    href: "#leadgen",
  },
  {
    id: "support",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3C8 3 4 7 4 12c0 3 1.5 5.5 4 7v4l4-2h2c6 0 10-4 10-9s-4-9-10-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
    label: "AI Support & Voice Agents",
    headline: "Intelligent customer support that runs itself",
    description:
      "Deploy AI support agents across chat, email, and voice that handle tier-1 queries autonomously, route complex cases intelligently, and continuously improve from interactions.",
    outcomes: ["90% query auto-resolution", "Voice + chat + email", "Seamless human escalation"],
    href: "#support",
  },
  {
    id: "dataops",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <ellipse cx="14" cy="8" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 8v6c0 2.2 4 4 9 4s9-1.8 9-4V8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 14v6c0 2.2 4 4 9 4s9-1.8 9-4v-6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Data & Reporting Automation",
    headline: "Automated intelligence from raw data",
    description:
      "AI agents that collect, normalize, analyze, and report your operational data automatically. Dashboard-ready insights delivered on schedule without analyst overhead.",
    outcomes: ["Daily auto-generated reports", "Multi-source data aggregation", "Anomaly detection & alerts"],
    href: "#dataops",
  },
  {
    id: "custom",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l2.5 5.5L22 9l-4 4 1 6-5-2.5L9 19l1-6-4-4 5.5-.5L14 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Custom AI Agent Builds",
    headline: "Bespoke AI systems for complex operations",
    description:
      "When off-the-shelf won't work, we architect custom multi-agent systems tailored to your exact business logic — integrated into your existing stack and owned by your team.",
    outcomes: ["Fully custom architecture", "Stack-agnostic integration", "IP ownership included"],
    href: "#custom",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{
        padding: "100px 20px",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "64px" }}>
          <span className="section-label">What We Automate</span>
          <h2
            id="services-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginTop: "12px",
              marginBottom: "16px",
              letterSpacing: "-0.03em",
              maxWidth: "600px",
            }}
          >
            Core AI Automation Services
          </h2>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "1.0625rem",
            color: "var(--text-secondary)", maxWidth: "520px", lineHeight: 1.7,
          }}>
            Every engagement is precision-engineered for your operational context. Not templates — outcomes.
          </p>
        </div>

        {/* Services grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "20px",
          }}
        >
          {services.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="card-glass"
              style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Icon */}
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: "var(--accent-cyan-dim)",
                border: "1px solid rgba(0,229,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--accent-cyan)",
                flexShrink: 0,
              }}>
                {service.icon}
              </div>

              {/* Content */}
              <div>
                <span className="section-label" style={{ fontSize: "0.6875rem" }}>{service.label}</span>
                <h3 style={{
                  fontFamily: "var(--font-display)", fontSize: "1.125rem",
                  fontWeight: 700, color: "var(--text-primary)",
                  marginTop: "6px", marginBottom: "10px",
                }}>
                  {service.headline}
                </h3>
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "0.9rem",
                  color: "var(--text-secondary)", lineHeight: 1.7,
                }}>
                  {service.description}
                </p>
              </div>

              {/* Outcomes */}
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", marginTop: "auto" }}>
                {service.outcomes.map((o) => (
                  <li
                    key={o}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      fontFamily: "var(--font-body)", fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span style={{ color: "var(--accent-cyan)", flexShrink: 0 }}>✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
