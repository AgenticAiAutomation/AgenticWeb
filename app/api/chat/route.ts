import { NextRequest, NextResponse } from "next/server";

/**
 * Chat API Route — RAG-Ready Architecture
 *
 * Production upgrade path:
 * 1. Add Pinecone/Supabase vector search before the LLM call
 * 2. Inject retrieved context into the system prompt
 * 3. Add lead capture: extract name/email/company from conversation
 * 4. Add CRM handoff: POST qualified leads to HubSpot/Salesforce
 * 5. Add Calendly link injection when intent = booking
 */

const SYSTEM_PROMPT = `You are an expert AI automation consultant for Agentic AI Automation — an enterprise AI agency specializing in agentic AI workflows, recruitment automation, lead generation automation, and AI support agents.

Be consultative, specific, ROI-focused. Keep responses under 100 words unless explaining something complex. Guide toward booking a free automation audit.

Contact: Contact@agenticAiAutomation.co
Book audit: //#book`;

export async function POST(req: NextRequest) {
  try {
    const { messages, system } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    // ─── FUTURE: Vector search for RAG context ───────────────────────────────
    // const query = messages[messages.length - 1].content;
    // const context = await searchVectorDB(query); // Pinecone or Supabase
    // const enhancedSystem = `${SYSTEM_PROMPT}\n\nRelevant context:\n${context}`;
    // ────────────────────────────────────────────────────────────────────────

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        max_tokens: 300,
        temperature: 0.7,
        messages: [
          { role: "system", content: system || SYSTEM_PROMPT },
          ...messages.slice(-10), // Keep last 10 messages for context window efficiency
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI error:", error);
      return NextResponse.json({ error: "LLM error" }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content ?? "I couldn't process that — please email Contact@agenticAiAutomation.co";

    // ─── FUTURE: Lead extraction & CRM handoff ───────────────────────────────
    // await extractAndSaveLead(messages, content);
    // ────────────────────────────────────────────────────────────────────────

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { content: "Something went wrong. Please email Contact@agenticAiAutomation.co" },
      { status: 500 }
    );
  }
}
