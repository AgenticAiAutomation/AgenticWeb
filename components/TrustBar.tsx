export default function TrustBar() {
  const signals = [
    { icon: "🔐", text: "SOC 2 Ready Architecture" },
    { icon: "🌍", text: "Global Enterprise Clients" },
    { icon: "⚡", text: "Deployed in Under 3 Weeks" },
    { icon: "🤝", text: "White-Glove Onboarding" },
    { icon: "📊", text: "Measurable ROI Guaranteed" },
    { icon: "🔄", text: "Fully Managed & Monitored" },
  ];

  return (
    <section
      aria-label="Trust and positioning"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
        padding: "20px 20px",
        overflow: "hidden",
      }}
    >
      {/* Scrolling trust signals */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px 28px",
          justifyContent: "center", alignItems: "center",
        }}>
          {signals.map((s) => (
            <div
              key={s.text}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "8px 0",
                fontFamily: "var(--font-display)", fontSize: "0.8125rem",
                fontWeight: 500, color: "var(--text-secondary)",
                whiteSpace: "nowrap",
              }}
            >
              <span aria-hidden="true">{s.icon}</span>
              <span>{s.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning statement */}
      <div style={{ maxWidth: "800px", margin: "32px auto 0", textAlign: "center", padding: "0 20px" }}>
        <p style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.125rem)",
          fontWeight: 500, color: "var(--text-secondary)", lineHeight: 1.7,
        }}>
          We are not a software vendor. We are an{" "}
          <strong style={{ color: "var(--text-primary)", fontWeight: 700 }}>AI automation partner</strong>{" "}
          that designs, deploys, and maintains agentic systems that run your operations while your team focuses on strategy.
        </p>
      </div>
    </section>
  );
}
