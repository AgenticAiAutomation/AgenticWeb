"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#process" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      role="banner"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor: scrolled ? "rgba(5,5,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          {/* Logo */}
          <Link href="/" aria-label="Agentic AI Automation Home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
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
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: 500,
                  color: "var(--text-secondary)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="hidden-mobile">
            <a
              href="mailto:Contact@agenticAiAutomation.co"
              className="btn-ghost"
              style={{ padding: "9px 18px", fontSize: "0.8125rem" }}
            >
              Contact Us
            </a>
            <a href="#book" className="btn-primary" style={{ padding: "9px 18px", fontSize: "0.8125rem" }}>
              Book Free Audit →
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="mobile-only"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "var(--text-primary)", padding: "8px",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M5 5L17 17M17 5L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="3" y1="17" x2="13" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            style={{
              borderTop: "1px solid var(--border-subtle)",
              padding: "16px 0 20px",
              display: "flex", flexDirection: "column", gap: "4px",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 500,
                  color: "var(--text-secondary)", textDecoration: "none",
                  padding: "10px 4px",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {link.label}
              </Link>
            ))}
            <a href="#book" className="btn-primary" style={{ marginTop: "12px", justifyContent: "center" }}
              onClick={() => setMenuOpen(false)}>
              Book Free Audit →
            </a>
          </nav>
        )}
      </div>

      <style>{`
        .hidden-mobile { display: none; }
        .mobile-only { display: block; }
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
