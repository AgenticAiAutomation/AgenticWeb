"use client";
import { useState } from "react";

const faqs = [
  {
    q: "What is agentic AI automation?",
    a: "Agentic AI automation uses autonomous AI agents that perceive, reason, and act across your business systems without constant human direction. Unlike rule-based automation, AI agents adapt to context, handle exceptions, and manage complex multi-step workflows end-to-end.",
  },
  {
    q: "How long does it take to implement AI automation?",
    a: "Most core workflow automations are live within 2–4 weeks. Complex multi-system agentic deployments typically take 6–10 weeks depending on integration depth, data readiness, and the number of agent roles involved.",
  },
  {
    q: "What ROI can I expect?",
    a: "Clients typically see 60–80% reduction in manual task hours within the first 90 days. ROI depends on workflow complexity and volume — most engagements pay back the full investment within 3–6 months.",
  },
  {
    q: "Do I need existing technical infrastructure?",
    a: "No. We handle the full stack — infrastructure selection, API integrations, agent design, testing, and deployment. You provide business access; we build and maintain. We work across cloud providers, on-premise systems, and hybrid environments.",
  },
  {
    q: "What happens when the AI makes a mistake?",
    a: "Every agent deployment includes observability, error handling, and human escalation protocols. We build fallback logic, alert systems, and review workflows so edge cases are caught early and corrected continuously.",
  },
  {
    q: "Which industries do you serve?",
    a: "We serve clients globally across financial services, recruitment, e-commerce, SaaS, real estate, healthcare operations, and professional services. Our solutions are industry-agnostic but always context-specific.",
  },
  {
    q: "Is our data secure?",
    a: "Yes. We build on SOC 2-ready infrastructure, apply zero-trust data access principles, and never store sensitive client data outside your approved environments. All integrations use encrypted, scoped API credentials.",
  },
  {
    q: "Can I scale the automation after initial deployment?",
    a: "Absolutely. Our architecture is designed for incremental expansion. You can add new agent capabilities, workflows, or integrations without rebuilding from scratch. Most clients expand their automation coverage within 60 days of initial deployment.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{
        padding: "100px 20px",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <span className="section-label">Frequently Asked</span>
          <h2
            id="faq-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginTop: "12px",
              letterSpacing: "-0.03em",
            }}
          >
            Questions We Get Asked
          </h2>
        </div>

        {/* FAQ Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: openIndex === i ? "var(--bg-card)" : "transparent",
                border: "1px solid",
                borderColor: openIndex === i ? "var(--border-accent)" : "var(--border-subtle)",
                borderRadius: "12px",
                overflow: "hidden",
                transition: "all 0.25s ease",
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  textAlign: "left",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-display)", fontSize: "0.9375rem",
                  fontWeight: 600, color: openIndex === i ? "var(--text-primary)" : "var(--text-secondary)",
                  transition: "color 0.2s",
                }}>
                  {faq.q}
                </span>
                <span style={{
                  color: "var(--accent-cyan)", flexShrink: 0,
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.25s ease",
                  fontSize: "1.25rem", lineHeight: 1,
                }}>
                  +
                </span>
              </button>

              {openIndex === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.9375rem",
                    color: "var(--text-secondary)", lineHeight: 1.75,
                  }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom prompt */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "12px" }}>
            Have a specific question about your use case?
          </p>
          <a
            href="mailto:Contact@agenticAiAutomation.co"
            style={{
              color: "var(--accent-cyan)", fontFamily: "var(--font-display)",
              fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
            }}
          >
            Contact@agenticAiAutomation.co →
          </a>
        </div>
      </div>
    </section>
  );
}
