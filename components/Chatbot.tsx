/* eslint-disable */
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

const WEBHOOK = 'https://tergomedia.app.n8n.cloud/webhook/8b37425b-b3b4-4cf9-aa3f-2e42bd888b3b/chat';
const SUGGESTIONS = [
  'What services do you offer?',
  'How much does automation cost?',
  'Book a discovery call',
  'See portfolio examples',
];

interface Msg { role: 'bot' | 'user'; text: string; time: string; }

function now() {
  return new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
}

function LaylaAvatar({ size }: { size: 34 | 52 }) {
  const scale = size / 34;
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head circle */}
      <circle cx="17" cy="17" r="16" fill="#1a1a1a" stroke="rgba(249,202,0,0.3)" strokeWidth="1"/>
      {/* Antenna */}
      <line x1="17" y1="1" x2="17" y2="6" stroke="#f9ca00" strokeWidth="1.5"/>
      <circle cx="17" cy="1" r="1.5" fill="#f9ca00"/>
      {/* Eyes - glowing cyan */}
      <rect x="9" y="11" width="5" height="4" rx="1" fill="#00c8ff" opacity="0.9"/>
      <rect x="20" y="11" width="5" height="4" rx="1" fill="#00c8ff" opacity="0.9"/>
      {/* Eye glow */}
      <rect x="9" y="11" width="5" height="4" rx="1" fill="#00c8ff" opacity="0.4"/>
      <rect x="20" y="11" width="5" height="4" rx="1" fill="#00c8ff" opacity="0.4"/>
      {/* Nose dot */}
      <circle cx="17" cy="17" r="1" fill="rgba(255,255,255,0.3)"/>
      {/* Mouth / speaker grille */}
      <rect x="11" y="21" width="12" height="2" rx="1" fill="rgba(255,255,255,0.15)"/>
      <rect x="13" y="24" width="8" height="1" rx="0.5" fill="rgba(255,255,255,0.1)"/>
      {/* Side panels */}
      <rect x="1" y="14" width="3" height="6" rx="1" fill="rgba(249,202,0,0.2)" stroke="rgba(249,202,0,0.3)" strokeWidth="0.5"/>
      <rect x="30" y="14" width="3" height="6" rx="1" fill="rgba(249,202,0,0.2)" stroke="rgba(249,202,0,0.3)" strokeWidth="0.5"/>
    </svg>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm Layla, Tergo's AI assistant. How can I help you today?", time: now() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggs, setShowSuggs] = useState(true);
  const sessionId = useRef(`s_${Math.random().toString(36).slice(2)}`);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll on mobile when open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobile, open]);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [msgs, loading, open]);

  // iOS keyboard compensation (desktop/non-fullscreen only)
  useEffect(() => {
    if (!open || isMobile) return;
    const vv = window.visualViewport;
    if (!vv || !windowRef.current) return;
    const update = () => {
      const offset = window.innerHeight - (vv.height + vv.offsetTop);
      if (windowRef.current) {
        windowRef.current.style.bottom = `${Math.max(86, offset + 16)}px`;
      }
    };
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();
    return () => { vv.removeEventListener('resize', update); vv.removeEventListener('scroll', update); };
  }, [open, isMobile]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggs(false);
    setMsgs(m => [...m, { role: 'user', text, time: now() }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 50);
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatInput: text, sessionId: sessionId.current }),
      });
      const data = await res.json();
      const reply = data?.output || data?.message || data?.text || 'Thanks for reaching out! Our team will be in touch shortly.';
      setMsgs(m => [...m, { role: 'bot', text: reply, time: now() }]);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Sorry, something went wrong. Please email us at hello@tergomedia.com', time: now() }]);
    }
    setLoading(false);
  }, [loading]);

  const mobileWindowStyle: React.CSSProperties = isMobile ? {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100dvh',
    borderRadius: 0,
    bottom: 'unset',
    right: 'unset',
    maxHeight: 'unset',
  } : {};

  return (
    <div className="chat-launcher">
      <div
        ref={windowRef}
        className={`chat-window${open ? ' open' : ''}`}
        style={open && isMobile ? mobileWindowStyle : undefined}
      >
        <div className="chat-header">
          <div className="chat-header-l">
            <div className="chat-av" style={{ background: 'none', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <LaylaAvatar size={34} />
            </div>
            <div>
              <div className="chat-name">Layla</div>
              <div className="chat-status">Online — typically replies in seconds</div>
            </div>
          </div>
          {isMobile ? (
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.6)', fontSize: 14, lineHeight: 1, display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px' }}
              aria-label="Back"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><polyline points="15 18 9 12 15 6"/></svg>
              Back
            </button>
          ) : (
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.4)', fontSize: 18, lineHeight: 1 }}
              aria-label="Close chat"
            >×</button>
          )}
        </div>

        <div
          className="chat-messages"
          style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}
        >
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="msg-bubble">{m.text}</div>
              <div className="msg-time">{m.time}</div>
            </div>
          ))}
          {loading && (
            <div className="typing-ind">
              <span /><span /><span />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {showSuggs && (
          <div className="chat-suggs">
            {SUGGESTIONS.map(s => (
              <button key={s} className="chat-sugg" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}

        <div className="chat-input-row" style={{ position: 'sticky', bottom: 0 }}>
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
            style={{ fontSize: 16 }}
          />
          <button className="chat-send" onClick={() => send(input)} aria-label="Send">
            <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <button className={`chat-btn${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Chat with Layla">
        {open ? (
          <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <LaylaAvatar size={52} />
        )}
        {!open && <div className="chat-badge">1</div>}
      </button>
    </div>
  );
}
