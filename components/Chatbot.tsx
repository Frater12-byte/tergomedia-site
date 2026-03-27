'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

const WEBHOOK = 'https://tergomedia.app.n8n.cloud/webhook/chat';
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

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm Layla, Tergo's AI assistant. How can I help you today?", time: now() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggs, setShowSuggs] = useState(true);
  // eslint-disable-next-line react-hooks/purity
  const sessionId = useRef(`s_${Math.random().toString(36).slice(2)}`);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, loading]);

  // iOS keyboard compensation
  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggs(false);
    setMsgs(m => [...m, { role: 'user', text, time: now() }]);
    setInput('');
    setLoading(true);
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

  return (
    <div className="chat-launcher">
      <div ref={windowRef} className={`chat-window${open ? ' open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-l">
            <div className="chat-av">L</div>
            <div>
              <div className="chat-name">Layla</div>
              <div className="chat-status">Online — typically replies in seconds</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,.4)', fontSize: 18, lineHeight: 1 }}
            aria-label="Close chat"
          >×</button>
        </div>

        <div className="chat-messages">
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

        <div className="chat-input-row">
          <input
            ref={inputRef}
            className="chat-input"
            placeholder="Ask me anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
          />
          <button className="chat-send" onClick={() => send(input)} aria-label="Send">
            <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>

      <button className={`chat-btn${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Chat with Layla">
        <svg className="open-icon" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg className="close-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        {!open && <div className="chat-badge">1</div>}
      </button>
    </div>
  );
}
