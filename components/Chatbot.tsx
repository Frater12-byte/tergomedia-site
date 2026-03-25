'use client';
import { useState, useRef, useEffect } from 'react';

const WEBHOOK = 'https://tergomedia.app.n8n.cloud/webhook/8b37425b-b3b4-4cf9-aa3f-2e42bd888b3b/chat';

type Msg = { role: 'bot' | 'user'; text: string };

export default function Chatbot() {
  const [open, setOpen]   = useState(false);
  const [msgs, setMsgs]   = useState<Msg[]>([
    { role: 'bot', text: "Hi! I'm the Tergo Media assistant. What can I help you with today?" },
  ]);
  const [input,  setInput]  = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  const bottomRef   = useRef<HTMLDivElement>(null);
  const inputRef    = useRef<HTMLTextAreaElement>(null);
  const chatRef     = useRef<HTMLDivElement>(null);
  const msgsRef     = useRef<HTMLDivElement>(null);

  // Focus + unread reset on open
  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // Scroll to bottom when messages or typing state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, typing]);

  // Prevent body scroll when chat is open on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (open && window.innerWidth <= 768) {
      document.body.style.overflow  = 'hidden';
      document.body.style.position  = 'fixed';
      document.body.style.width     = '100%';
    } else {
      document.body.style.overflow  = '';
      document.body.style.position  = '';
      document.body.style.width     = '';
    }
    return () => {
      document.body.style.overflow  = '';
      document.body.style.position  = '';
      document.body.style.width     = '';
    };
  }, [open]);

  // visualViewport resize — iOS keyboard compensation
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;

    function handleVVResize() {
      const container = chatRef.current;
      if (!container || !open || !vv || window.innerWidth > 768) return;
      container.style.height = vv.height + 'px';
      container.style.top    = vv.offsetTop + 'px';
      if (msgsRef.current) {
        msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
      }
    }

    vv.addEventListener('resize', handleVVResize);
    vv.addEventListener('scroll', handleVVResize);
    return () => {
      vv.removeEventListener('resize', handleVVResize);
      vv.removeEventListener('scroll', handleVVResize);
    };
  }, [open]);

  function handleInput() {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
    el.style.overflowY = el.scrollHeight > 120 ? 'auto' : 'hidden';
  }

  async function send() {
    const text = input.trim();
    if (!text || typing) return;
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height    = 'auto';
      inputRef.current.style.overflowY = 'hidden';
    }
    setMsgs(m => [...m, { role: 'user', text }]);
    setTyping(true);
    try {
      const res  = await fetch(WEBHOOK, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chatInput: text, sessionId: 'web-' + Math.random().toString(36).slice(2,9) }),
      });
      const data = await res.json();
      const reply: string =
        data?.output || data?.reply || data?.message || data?.text ||
        (Array.isArray(data) && (data[0]?.output || data[0]?.reply || data[0]?.message || data[0]?.text)) ||
        'Thanks! Our team will follow up shortly.';
      setMsgs(m => [...m, { role: 'bot', text: reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Something went wrong. Please try again or email hello@tergomedia.com.' }]);
    } finally {
      setTyping(false);
    }
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {open && (
        <div ref={chatRef} className="chat-window">
          <div className="chat-header">
            <span className="chat-header-title">Tergo Media Assistant</span>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">×</button>
          </div>
          <div ref={msgsRef} className="chat-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
            ))}
            {typing && (
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div className="chat-input-row">
            <textarea
              ref={inputRef}
              className="chat-input"
              placeholder="Type a message..."
              value={input}
              rows={1}
              onChange={e => setInput(e.target.value)}
              onInput={handleInput}
              onKeyDown={onKey}
              onFocus={() => {
                if (window.innerWidth > 768) return;
                setTimeout(() => {
                  msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight, behavior: 'smooth' });
                  chatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 350);
              }}
              style={{ resize: 'none', overflowY: 'hidden' }}
            />
            <button className="chat-send" onClick={send} disabled={typing}>Send</button>
          </div>
          <span className="chat-hint">Shift+Enter for new line</span>
        </div>
      )}
      <button className="chat-btn" onClick={() => setOpen(o => !o)} aria-label="Open chat">
        {unread > 0 && !open && <span className="chat-badge">{unread}</span>}
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </>
  );
}
