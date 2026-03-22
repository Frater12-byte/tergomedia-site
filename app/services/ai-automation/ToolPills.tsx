"use client";
import { useState } from "react";

const tools = [
  {
    label: "Workflow automation",
    color: "y",
    body: "n8n (self-hosted, no per-task pricing), Make (visual, powerful), Zapier (quick wins), custom Node.js/Python pipelines for complex logic that no-code tools can't handle.",
  },
  {
    label: "AI & language",
    color: "c",
    body: "OpenAI GPT-4o for analysis and generation, Anthropic Claude for reasoning, Whisper for voice transcription, custom fine-tuned models when needed.",
  },
  {
    label: "Communication",
    color: "p",
    body: "WhatsApp Business API for instant messaging, Twilio for SMS/voice, email via SendGrid/Postmark, Slack for internal notifications.",
  },
];

export default function ToolPills() {
  const [active, setActive] = useState(0);
  const t = tools[active];
  return (
    <div className="ig">
      <div className="ig-title">Tools we use — click to explore</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {tools.map((tool, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "8px 16px", fontSize: 11, fontWeight: 800, letterSpacing: 1.5,
              textTransform: "uppercase", cursor: "pointer", fontFamily: "Exo, sans-serif",
              border: `1px solid ${i === active ? `var(--${tool.color})` : "var(--b2)"}`,
              background: i === active ? `rgba(var(--${tool.color}-raw, 0,0,0), 0.07)` : "var(--card)",
              color: i === active ? `var(--${tool.color})` : "var(--m)",
              transition: "all .2s",
            }}
          >{tool.label}</button>
        ))}
      </div>
      <div style={{ padding: "16px", border: `1px solid var(--${t.color}br, var(--b))`, background: "var(--card)" }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: `var(--${t.color})`, marginBottom: 10 }}>{t.label}</div>
        <p style={{ fontSize: 14, color: "var(--l)", lineHeight: 1.75 }}>{t.body}</p>
      </div>
    </div>
  );
}
