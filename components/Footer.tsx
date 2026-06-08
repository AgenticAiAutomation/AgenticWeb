import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const serviceLinks = [
    { label: "AI Workflow Automation", href: "#workflow" },
    { label: "Recruitment Automation", href: "#recruitment" },
    { label: "Lead Generation Automation", href: "#leadgen" },
    { label: "AI Support Agents", href: "#support" },
    { label: "Data Automation", href: "#dataops" },
    { label: "Custom AI Builds", href: "#custom" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Automation Templates", href: "/templates" },
    { label: "Careers", href: "/careers" },
  ];

  const resourceLinks = [
    { label: "Free Automation Audit", href: "#book" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "mailto:Contact@agenticAiAutomation.co" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer
      role="contentinfo"
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "72px 20px 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "48px",
          marginBottom: "56px",
        }}>
          {/* Brand */}
          <div style={{ gridColumn: "span 1" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="9" r="2" fill="white"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "var(--font-display)", fontWeight: 800,
                fontSize: "1rem", color: "var(--text-primary)", letterSpacing: "-0.02em",
              }}>
                Agentic<span style={{ color: "var(--accent-cyan)" }}>AI</span>
              </span>
            </div>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "0.875rem",
              color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "240px",
            }}>
              Enterprise AI automation agency. Agentic workflows that run your operations.
            </p>
            <a
              href="mailto:Contact@agenticAiAutomation.co"
              style={{
                fontFamily: "var(--font-display)", fontSize: "0.8125rem",
                fontWeight: 600, color: "var(--accent-cyan)", textDecoration: "none",
              }}
            >
              Contact@agenticAiAutomation.co
            </a>
          </div>

          {/* Services */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "16px",
            }}>
              Services
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "0.875rem",
                      color: "var(--text-secondary)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "16px",
            }}>
              Company
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "0.875rem",
                      color: "var(--text-secondary)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 style={{
              fontFamily: "var(--font-display)", fontSize: "0.75rem",
              fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "var(--text-muted)", marginBottom: "16px",
            }}>
              Resources
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "0.875rem",
                      color: "var(--text-secondary)", textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--border-subtle)", marginBottom: "28px" }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "center", gap: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-muted)",
          }}>
            © {year} Agentic AI Automation. All rights reserved.
          </p>
          <p style={{
            fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-muted)",
          }}>
            Built for global enterprise clients · US · UK · Europe · Middle East
          </p>
        </div>
      </div>
    </footer>
  );
}
