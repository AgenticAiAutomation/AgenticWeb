"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi 👋 Want to automate repetitive business operations using AI agents and intelligent workflows? I can help.",
};

const SYSTEM_PROMPT = `You are an expert AI automation consultant for Agentic AI Automation — an enterprise AI agency that deploys AI agents, workflow automation, recruitment automation, lead generation automation, and AI support agents.

Your goals:
1. Understand the visitor's business and pain points
2. Identify the best automation opportunities for their situation
3. Build trust through expertise and specific insights
4. Qualify the lead and guide them toward booking a free automation audit call

Key services to mention when relevant:
- AI Workflow Automation (multi-step agent orchestration)
- Recruitment Automation (sourcing, screening, pipeline)
- Lead Generation Automation (outbound AI agents)
- AI Support & Voice Agents (24/7 autonomous support)
- Custom AI Agent Builds

Always be:
- Consultative, not salesy
- Specific and ROI-focused
- Brief but valuable (keep responses under 100 words unless explaining something complex)
- Guiding toward booking a call: "Book a free automation audit at agenticaiautomation.co/#book"

Contact email: Contact@agenticAiAutomation.co`;

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // RAG-ready: Replace this fetch with your vector search + LLM pipeline
      // For production: POST to /api/chat which handles Pinecone retrieval + OpenAI completion
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          system: SYSTEM_PROMPT,
        }),
      });

      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having a moment — please email us directly at Contact@agenticAiAutomation.co or book a call below.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="chat-widget">
      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Automation Assistant"
          style={{
            position: "absolute",
            bottom: "72px",
            right: 0,
            width: "min(360px, calc(100vw - 40px))",
            background: "var(--bg-card)",
            border: "1px solid var(--border-default)",
            borderRadius: "20px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            maxHeight: "520px",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--bg-elevated)",
            display: "flex", alignItems: "center", gap: "12px",
          }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="9" r="2" fill="white"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                Agentic AI Assistant
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "1px" }}>
                <span className="pulse-dot" style={{ width: "6px", height: "6px" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--text-muted)" }}>Online · Typically replies instantly</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                marginLeft: "auto", background: "none", border: "none",
                cursor: "pointer", color: "var(--text-muted)", padding: "4px", borderRadius: "6px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "16px",
            display: "flex", flexDirection: "column", gap: "12px",
          }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div style={{
                  maxWidth: "85%",
                  background: msg.role === "user"
                    ? "var(--accent-cyan)" : "var(--bg-elevated)",
                  color: msg.role === "user" ? "#050508" : "var(--text-secondary)",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 14px",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  border: msg.role === "assistant" ? "1px solid var(--border-subtle)" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", gap: "4px", padding: "12px 14px", background: "var(--bg-elevated)", borderRadius: "16px 16px 16px 4px", alignSelf: "flex-start", border: "1px solid var(--border-subtle)" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--text-muted)",
                    animation: `pulse-dot 1.2s ease ${i * 0.2}s infinite`,
                    display: "inline-block",
                  }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "12px 16px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex", gap: "8px", alignItems: "center",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about automating your business..."
              aria-label="Chat message input"
              style={{
                flex: 1, background: "var(--bg-elevated)",
                border: "1px solid var(--border-default)", borderRadius: "10px",
                padding: "10px 14px", color: "var(--text-primary)",
                fontFamily: "var(--font-body)", fontSize: "0.875rem",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: input.trim() ? "var(--accent-cyan)" : "var(--bg-elevated)",
                border: "none", cursor: input.trim() ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s", flexShrink: 0,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14 8L2 2l2.5 6L2 14L14 8z" fill={input.trim() ? "#050508" : "var(--text-muted)"} strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
        style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: isOpen ? "var(--bg-card)" : "linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))",
          border: isOpen ? "1px solid var(--border-default)" : "none",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: isOpen ? "none" : "0 8px 32px rgba(0,229,255,0.3)",
          transition: "all 0.3s var(--ease-out-expo)",
          flexShrink: 0,
        }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4l12 12M16 4L4 16" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 4C7 4 4 7.5 4 11c0 2.5 1.5 4.5 3.5 5.5V20l3.5-2H12c5 0 8-3.5 8-7s-3-7-8-7z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="9" cy="11" r="1.25" fill="white"/>
            <circle cx="12" cy="11" r="1.25" fill="white"/>
            <circle cx="15" cy="11" r="1.25" fill="white"/>
          </svg>
        )}
      </button>
    </div>
  );
}
