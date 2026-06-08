export default function BookCTA() {
  return (
    <section
      id="book"
      aria-labelledby="book-heading"
      className="section-gradient"
      style={{ padding: "100px 20px" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "24px",
            padding: "clamp(32px, 6vw, 72px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "48px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative accent */}
          <div aria-hidden="true" style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "300px", height: "300px",
            background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Left: Messaging */}
          <div>
            <span className="section-label">Start Today</span>
            <h2
              id="book-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginTop: "12px",
                letterSpacing: "-0.03em",
                marginBottom: "20px",
              }}
            >
              Book Your Free Automation Audit
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", color: "var(--text-secondary)",
              fontSize: "1.0625rem", lineHeight: 1.7, marginBottom: "32px",
            }}>
              In a 45-minute call, we'll identify your highest-ROI automation opportunities and give you a concrete implementation roadmap — at no cost.
            </p>

            {/* What you'll get */}
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                "Workflow audit across your core operations",
                "Prioritised automation opportunity map",
                "ROI projection and time-to-live estimate",
                "No obligation — keep the plan regardless",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{
                    width: "20px", height: "20px", borderRadius: "50%",
                    background: "var(--accent-cyan-dim)", border: "1px solid rgba(0,229,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: "2px",
                    color: "var(--accent-cyan)", fontSize: "0.65rem",
                  }}>✓</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--text-secondary)" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Contact options */}
          <div id="contact" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Calendly embed placeholder */}
            <div style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-default)",
              borderRadius: "16px",
              padding: "28px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>📅</div>
              <p style={{
                fontFamily: "var(--font-display)", fontWeight: 600,
                fontSize: "1rem", color: "var(--text-primary)", marginBottom: "8px",
              }}>
                Book a 45-Minute Audit Call
              </p>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "0.875rem",
                color: "var(--text-muted)", marginBottom: "20px",
              }}>
                Pick a time that works for you
              </p>
              {/* Replace href with your Calendly link */}
              <a
                href="https://calendly.com/agenticai"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Choose a Time →
              </a>
            </div>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-muted)" }}>or reach us directly</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
            </div>

            {/* Email */}
            <a
              href="mailto:Contact@agenticAiAutomation.co"
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)",
                borderRadius: "12px", padding: "16px 20px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-subtle)")}
            >
              <span style={{ fontSize: "1.25rem" }}>✉️</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>Email Us</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--accent-cyan)" }}>Contact@agenticAiAutomation.co</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/message/AGENTICAI"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
                borderRadius: "12px", padding: "16px 20px",
                textDecoration: "none",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.2)")}
            >
              <span style={{ fontSize: "1.25rem" }}>📱</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>WhatsApp</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "#22c55e" }}>Start a chat instantly</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
