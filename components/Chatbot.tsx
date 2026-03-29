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
  const s = size / 52; // scale factor
  return (
    <svg width={size} height={size} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Glow ring */}
      <circle cx="26" cy="26" r="24" fill="rgba(249,202,0,0.08)" stroke="rgba(249,202,0,0.25)" strokeWidth="1"/>

      {/* Neck */}
      <rect x="22" y="37" width="8" height="7" rx="3" fill="#2a2010"/>

      {/* Face shape */}
      <ellipse cx="26" cy="27" rx="14" ry="16" fill="#2e2416"/>

      {/* Hair / head top */}
      <path d="M12,24 Q12,11 26,10 Q40,11 40,24 Q38,15 26,14 Q14,15 12,24 Z" fill="#1a1205"/>
      <path d="M12,24 Q10,18 12,13 Q16,8 26,8 Q36,8 40,13 Q42,18 40,24" fill="#1a1205" stroke="none"/>

      {/* Side hair strands */}
      <path d="M12,22 Q9,28 11,34 Q13,38 14,36 Q12,32 13,26" fill="#1a1205"/>
      <path d="M40,22 Q43,28 41,34 Q39,38 38,36 Q40,32 39,26" fill="#1a1205"/>

      {/* Eyebrows */}
      <path d="M17,21 Q20,19.5 23,20.5" stroke="#c8a060" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M29,20.5 Q32,19.5 35,21" stroke="#c8a060" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

      {/* Eyes — almond shaped, cyan glow */}
      <path d="M17,24 Q20,21.5 23,24 Q20,26.5 17,24 Z" fill="#00c8ff" opacity="0.9"/>
      <path d="M29,24 Q32,21.5 35,24 Q32,26.5 29,24 Z" fill="#00c8ff" opacity="0.9"/>
      {/* Eye pupils */}
      <circle cx="20" cy="24" r="1.8" fill="#001a22"/>
      <circle cx="32" cy="24" r="1.8" fill="#001a22"/>
      {/* Eye highlights */}
      <circle cx="20.6" cy="23.3" r="0.6" fill="rgba(255,255,255,0.9)"/>
      <circle cx="32.6" cy="23.3" r="0.6" fill="rgba(255,255,255,0.9)"/>
      {/* Eye glow */}
      <path d="M17,24 Q20,21.5 23,24 Q20,26.5 17,24 Z" fill="#00c8ff" opacity="0.25"/>
      <path d="M29,24 Q32,21.5 35,24 Q32,26.5 29,24 Z" fill="#00c8ff" opacity="0.25"/>

      {/* Nose */}
      <path d="M24.5,28 Q26,31 27.5,28" stroke="rgba(255,255,255,0.2)" strokeWidth="0.9" strokeLinecap="round" fill="none"/>

      {/* Lips */}
      <path d="M21,33 Q26,36 31,33" stroke="rgba(249,202,0,0.7)" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M21,33 Q26,31 31,33" stroke="rgba(249,202,0,0.35)" strokeWidth="0.8" strokeLinecap="round" fill="none"/>

      {/* Small ear dots (earrings) */}
      <circle cx="12.5" cy="28" r="1.8" fill="#f9ca00" opacity="0.7"/>
      <circle cx="39.5" cy="28" r="1.8" fill="#f9ca00" opacity="0.7"/>

      {/* Subtle tech detail — small circuit line on temple */}
      <line x1="13" y1="23" x2="15" y2="23" stroke="rgba(249,202,0,0.3)" strokeWidth="0.7"/>
      <line x1="39" y1="23" x2="37" y2="23" stroke="rgba(249,202,0,0.3)" strokeWidth="0.7"/>
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

  // Keyboard / viewport compensation — works on both mobile and desktop
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    if (!vv) return;

    const update = () => {
      if (isMobile && windowRef.current) {
        // On mobile: resize the fullscreen chat to the visual viewport height
        windowRef.current.style.height = `${vv.height}px`;
        windowRef.current.style.top = `${vv.offsetTop}px`;
      } else if (!isMobile && windowRef.current) {
        // On desktop: shift window up if keyboard opens
        const offset = window.innerHeight - (vv.height + vv.offsetTop);
        windowRef.current.style.bottom = `${Math.max(86, offset + 16)}px`;
      }
    };

    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
    };
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
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '100dvh',  // JS will override this
    borderRadius: 0,
    bottom: 'unset',
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
