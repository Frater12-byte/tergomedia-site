/* eslint-disable */
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Stage 01: Lead Capture ───────────────────────────────────────────────────

const LEAD_SOURCES_INIT = [
  { name: 'Bayut', color: '#f9ca00', count: 28 },
  { name: 'PropertyFinder', color: '#00c8ff', count: 22 },
  { name: 'Dubizzle', color: '#ff6b35', count: 18 },
  { name: 'Web Form', color: '#a78bfa', count: 15 },
  { name: 'WhatsApp Direct', color: '#25d366', count: 19 },
  { name: 'Instagram DM', color: '#e1306c', count: 11 },
  { name: 'Facebook Lead Ad', color: '#1877f2', count: 9 },
  { name: 'LinkedIn InMail', color: '#0a66c2', count: 7 },
  { name: 'Email Enquiry', color: '#f9ca00', count: 8 },
  { name: 'Phone (AI)', color: '#00c8ff', count: 5 },
];

function LeadCaptureVisual() {
  const [sources, setSources] = useState(LEAD_SOURCES_INIT.map(s => ({ ...s })));
  const [totalLeads, setTotalLeads] = useState(142);
  const [pulsingIdx, setPulsingIdx] = useState<number | null>(null);

  useEffect(() => {
    const iv = setInterval(() => {
      const idx = Math.floor(Math.random() * sources.length);
      setPulsingIdx(idx);
      setSources(prev => {
        const next = prev.map((s, i) => i === idx ? { ...s, count: s.count + 1 } : s);
        return next;
      });
      setTotalLeads(t => t + 1);
      setTimeout(() => setPulsingIdx(null), 600);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  const total = sources.reduce((a, s) => a + s.count, 0);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: 12 }}>
        {sources.map((src, i) => {
          const pct = Math.round((src.count / total) * 100);
          const isPulsing = pulsingIdx === i;
          return (
            <div
              key={src.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 8px',
                borderRadius: 6,
                background: isPulsing ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isPulsing ? src.color + '55' : 'rgba(255,255,255,0.07)'}`,
                transition: 'all 0.3s',
              }}
            >
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: 3,
                  background: src.color, flexShrink: 0,
                }} />
                {isPulsing && (
                  <div style={{
                    position: 'absolute', inset: -3, borderRadius: 5,
                    background: src.color + '40',
                    animation: 'pulsePing 0.6s ease-out',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{src.name}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: isPulsing ? src.color : 'rgba(255,255,255,0.9)', transition: 'color 0.3s' }}>{src.count}</span>
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', borderRadius: 8,
        background: 'rgba(249,202,0,0.08)', border: '1px solid rgba(249,202,0,0.25)',
      }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.05em' }}>TOTAL LEADS TODAY</span>
        <span style={{ fontSize: 20, fontWeight: 800, color: '#f9ca00' }}>{totalLeads}</span>
      </div>
      <style>{`
        @keyframes pulsePing {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─── Stage 02: AI Qualification ───────────────────────────────────────────────

const WA_MESSAGES = [
  { dir: 'in', text: "Hi, I'm looking for a 3BR villa in Dubai Hills, budget AED 3.5M" },
  { dir: 'out', sender: 'Layla (AI)', text: "Hi Ahmed! Great choice — Dubai Hills has some stunning options in that range. Quick question: are you looking for primary residence or investment?" },
  { dir: 'in', text: "Primary residence, ready to move in ideally" },
  { dir: 'out', sender: 'Layla (AI)', text: "Perfect. And your preferred timeline — are you looking within 3 months, or more flexible?" },
  { dir: 'in', text: "Ideally within 2 months" },
  { dir: 'out', sender: 'Layla (AI)', text: "Understood. I've matched you with 4 listings and assigned you to Sara (Arabic/English, Dubai Hills specialist). She'll call you within 10 minutes. Confirmation sent to your WhatsApp ✅" },
];

const SCORE_STAGES = ['Unqualified', 'Warm', 'Hot', 'Assigned'];
const SCORE_COLORS = ['rgba(255,255,255,0.3)', '#f9ca00', '#ff6b35', '#00c8ff'];

function QualificationVisual({ stageKey }: { stageKey: number }) {
  const [visibleMsgs, setVisibleMsgs] = useState<number>(0);
  const [typing, setTyping] = useState(false);
  const [scoreIdx, setScoreIdx] = useState(0);

  useEffect(() => {
    setVisibleMsgs(0);
    setTyping(false);
    setScoreIdx(0);
    let cancelled = false;
    let msgIdx = 0;

    const revealNext = () => {
      if (cancelled || msgIdx >= WA_MESSAGES.length) return;
      const msg = WA_MESSAGES[msgIdx];
      if (msg.dir === 'out') {
        setTyping(true);
        setTimeout(() => {
          if (cancelled) return;
          setTyping(false);
          setVisibleMsgs(msgIdx + 1);
          if (msgIdx === 1) setScoreIdx(1);
          if (msgIdx === 3) setScoreIdx(2);
          if (msgIdx === 5) setScoreIdx(3);
          msgIdx++;
          setTimeout(revealNext, 900);
        }, 1400);
      } else {
        setVisibleMsgs(msgIdx + 1);
        msgIdx++;
        setTimeout(revealNext, 700);
      }
    };

    const t = setTimeout(revealNext, 400);
    return () => { cancelled = true; clearTimeout(t); };
  }, [stageKey]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
        padding: '5px 10px', borderRadius: 20,
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
        width: 'fit-content',
      }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}>QUALIFICATION SCORE</span>
        {SCORE_STAGES.map((s, i) => (
          <div key={s} style={{
            padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 700,
            background: i === scoreIdx ? SCORE_COLORS[i] + '22' : 'transparent',
            color: i === scoreIdx ? SCORE_COLORS[i] : 'rgba(255,255,255,0.2)',
            border: `1px solid ${i === scoreIdx ? SCORE_COLORS[i] + '55' : 'transparent'}`,
            transition: 'all 0.4s',
          }}>{s}</div>
        ))}
      </div>

      <div style={{
        background: '#0d1117', borderRadius: 10, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #075e54 0%, #128c7e 100%)',
          padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff',
            flexShrink: 0,
          }}>A</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Ahmed · Dubai Hills</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#25d366', display: 'inline-block' }}/>
              via WhatsApp · AI responding
            </div>
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
            <div>92/100</div>
            <div style={{ color: '#f9ca00', fontWeight: 700 }}>HOT</div>
          </div>
        </div>
        <div style={{ padding: '10px 10px', maxHeight: 340, overflowY: 'auto', scrollBehavior: 'smooth', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {WA_MESSAGES.slice(0, visibleMsgs).map((msg, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: msg.dir === 'out' ? 'flex-end' : 'flex-start',
              animation: 'fadeSlideIn 0.3s ease',
            }}>
              <div style={{
                maxWidth: '80%',
                padding: '7px 10px',
                borderRadius: msg.dir === 'out' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                background: msg.dir === 'out' ? 'linear-gradient(135deg, #005c4b 0%, #075e54 100%)' : '#1e293b',
                fontSize: 11,
                color: '#fff',
                lineHeight: 1.5,
              }}>
                {msg.dir === 'out' && <div style={{ fontSize: 9, color: '#25d366', marginBottom: 2, fontWeight: 600 }}>{msg.sender}</div>}
                {msg.text}
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3, textAlign: 'right' }}>
                  {msg.dir === 'out' ? '✓✓' : ''}
                </div>
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ padding: '8px 12px', borderRadius: '12px 12px 2px 12px', background: '#005c4b', display: 'flex', gap: 4, alignItems: 'center' }}>
                {[0, 1, 2].map(j => (
                  <div key={j} style={{ width: 5, height: 5, borderRadius: '50%', background: '#25d366', animation: `typingBounce 0.9s ${j * 0.15}s infinite` }} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes typingBounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}

// ─── Stage 03: Smart Dispatch ─────────────────────────────────────────────────

const COLUMNS = ['New', 'Qualified', 'Assigned', 'In Negotiation', 'Closed'];
const COL_COLORS = ['rgba(255,255,255,0.3)', '#f9ca00', '#00c8ff', '#ff6b35', '#4ade80'];

const INITIAL_CARDS = [
  { id: 1, name: 'Ahmed M.', budget: 'AED 3.5M', col: 0 },
  { id: 2, name: 'Sarah K.', budget: 'AED 1.8M', col: 1 },
  { id: 3, name: 'Marco B.', budget: 'AED 2.1M', col: 1 },
  { id: 4, name: 'Priya S.', budget: 'AED 4.2M', col: 2 },
  { id: 5, name: 'Khalid R.', budget: 'AED 5.0M', col: 2 },
  { id: 6, name: 'Laila H.', budget: 'AED 2.8M', col: 3 },
  { id: 7, name: 'Tom W.', budget: 'AED 3.0M', col: 3 },
  { id: 8, name: 'Fatima A.', budget: 'AED 1.5M', col: 4 },
];

function DispatchVisual() {
  const [cards, setCards] = useState(INITIAL_CARDS.map(c => ({ ...c })));
  const [movingId, setMovingId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 600);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => {
      const movable = cards.filter(c => c.col < 4);
      if (!movable.length) return;
      const card = movable[Math.floor(Math.random() * movable.length)];
      setMovingId(card.id);
      setTimeout(() => {
        setCards(prev => prev.map(c => c.id === card.id ? { ...c, col: Math.min(4, c.col + 1) } : c));
        setTimeout(() => setMovingId(null), 400);
      }, 300);
    }, 2500);
    return () => clearInterval(iv);
  }, [cards]);

  // Mobile: vertical stage list
  if (isMobile) {
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {COLUMNS.map((col, ci) => {
          const colCards = cards.filter(c => c.col === ci);
          return (
            <div key={col}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 8px', marginBottom: 5,
                borderLeft: `3px solid ${COL_COLORS[ci]}88`,
                background: 'rgba(255,255,255,0.02)',
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: COL_COLORS[ci], letterSpacing: '0.06em' }}>{col.toUpperCase()}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>{colCards.length}</span>
              </div>
              {colCards.length > 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingLeft: 8 }}>
                  {colCards.map(card => {
                    const isMoving = movingId === card.id;
                    return (
                      <div key={card.id} style={{
                        padding: '6px 10px',
                        background: isMoving ? 'rgba(249,202,0,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${isMoving ? 'rgba(249,202,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        boxShadow: isMoving ? '0 0 10px rgba(249,202,0,0.2)' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                        transform: isMoving ? 'scale(1.03)' : 'scale(1)',
                        display: 'flex', alignItems: 'center', gap: 8,
                      }}>
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{card.name}</div>
                          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{card.budget}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop: horizontal kanban
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <div style={{ display: 'flex', gap: 8, minWidth: 480 }}>
        {COLUMNS.map((col, ci) => {
          const colCards = cards.filter(c => c.col === ci);
          return (
            <div key={col} style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '4px 6px', marginBottom: 6,
                borderBottom: `2px solid ${COL_COLORS[ci]}44`,
              }}>
                <span style={{ fontSize: 9, fontWeight: 700, color: COL_COLORS[ci], letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{col.toUpperCase()}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>{colCards.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {colCards.map(card => {
                  const isMoving = movingId === card.id;
                  return (
                    <div key={card.id} style={{
                      padding: '7px 8px', borderRadius: 7,
                      background: isMoving ? 'rgba(249,202,0,0.12)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${isMoving ? 'rgba(249,202,0,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: isMoving ? '0 0 12px rgba(249,202,0,0.25)' : 'none',
                      transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                      transform: isMoving ? 'scale(1.04)' : 'scale(1)',
                    }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>{card.name}</div>
                      <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>{card.budget}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stage 04: Outreach ───────────────────────────────────────────────────────

const OUTREACH_ROWS = [
  { day: 'Day 0', time: '10:32am', channel: 'WhatsApp', channelColor: '#25d366', msg: 'Hi Marco, following up on your enquiry...', status: 'Sent ✓✓', statusColor: '#4ade80' },
  { day: 'Day 0', time: '10:32am', channel: 'Email', channelColor: '#f9ca00', msg: 'Your personalised property shortlist is ready', status: 'Opened', statusColor: '#00c8ff' },
  { day: 'Day 1', time: '9:00am', channel: 'LinkedIn', channelColor: '#0a66c2', msg: 'Connection request + note sent', status: 'Pending', statusColor: 'rgba(255,255,255,0.4)' },
  { day: 'Day 2', time: '11:00am', channel: 'WhatsApp', channelColor: '#25d366', msg: 'Just wanted to share 3 new listings...', status: 'Sent ✓✓', statusColor: '#4ade80' },
  { day: 'Day 3', time: '9:00am', channel: 'Email', channelColor: '#f9ca00', msg: 'Follow-up: "Any questions on the shortlist?"', status: 'Opened', statusColor: '#00c8ff' },
  { day: 'Day 5', time: '10:00am', channel: 'WhatsApp', channelColor: '#25d366', msg: 'Our agent Sara is available this week...', status: 'Replied ✓', statusColor: '#f9ca00' },
];

function OutreachVisual({ stageKey }: { stageKey: number }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    let i = 0;
    const step = () => {
      if (i < OUTREACH_ROWS.length) {
        i++;
        setVisible(i);
        setTimeout(step, 1500);
      }
    };
    const t = setTimeout(step, 300);
    return () => clearTimeout(t);
  }, [stageKey]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        marginBottom: 10, fontSize: 10, fontWeight: 700,
        color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        OUTREACH SEQUENCE · <span style={{ color: '#00c8ff', fontWeight: 700 }}>MARCO B.</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, padding: '2px 8px', borderRadius: 10, background: 'rgba(0,200,255,0.1)', color: '#00c8ff', border: '1px solid rgba(0,200,255,0.25)' }}>ACTIVE</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {OUTREACH_ROWS.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', borderRadius: 8,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              opacity: i < visible ? 1 : 0,
              transform: i < visible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <div style={{ width: 26, height: 26, borderRadius: 6, background: row.channelColor + '22', border: `1px solid ${row.channelColor}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: row.channelColor }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.msg}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{row.day} · {row.time}</div>
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, color: row.statusColor, whiteSpace: 'nowrap', flexShrink: 0, padding: '2px 6px', borderRadius: 6, background: row.statusColor + '18' }}>{row.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stage 05: CRM & Reports ──────────────────────────────────────────────────

function CRMChart({ stageKey }: { stageKey: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = 100;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.height = `${H}px`;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    const leads = [28, 34, 41, 38, 52, 47, 61, 68];
    const qualified = [16, 21, 28, 25, 38, 34, 48, 55];
    const maxV = 75;
    const padX = 8, padY = 8;

    const px = (i: number) => padX + (i / (leads.length - 1)) * (W - 2 * padX);
    const py = (v: number) => H - padY - (v / maxV) * (H - 2 * padY);

    // Background
    ctx.fillStyle = 'rgba(255,255,255,0.02)';
    ctx.fillRect(0, 0, W, H);

    // Grid lines
    for (let i = 0; i <= 3; i++) {
      const y = padY + (i / 3) * (H - 2 * padY);
      ctx.beginPath();
      ctx.moveTo(padX, y);
      ctx.lineTo(W - padX, y);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const drawArea = (data: number[], color: string, alpha: number) => {
      // Area fill
      ctx.beginPath();
      ctx.moveTo(px(0), H - padY);
      data.forEach((v, i) => ctx.lineTo(px(i), py(v)));
      ctx.lineTo(px(data.length - 1), H - padY);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      const rgb = color === '#00c8ff' ? '0,200,255' : '74,222,128';
      grad.addColorStop(0, `rgba(${rgb},${alpha})`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grad;
      ctx.fill();

      // Line
      ctx.beginPath();
      data.forEach((v, i) => {
        if (i === 0) ctx.moveTo(px(i), py(v));
        else {
          const cpx = (px(i - 1) + px(i)) / 2;
          ctx.bezierCurveTo(cpx, py(data[i - 1]), cpx, py(v), px(i), py(v));
        }
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      ctx.stroke();

      // Dots
      data.forEach((v, i) => {
        ctx.beginPath();
        ctx.arc(px(i), py(v), 2.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(px(i), py(v), 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });
    };

    drawArea(leads, '#00c8ff', 0.15);
    drawArea(qualified, '#4ade80', 0.12);
  }, [stageKey]);

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', padding: '8px 8px 4px' }}>
      <div style={{ display: 'flex', gap: 14, marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 12, height: 2, background: '#00c8ff', borderRadius: 1 }} />
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Leads In</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 12, height: 2, background: '#4ade80', borderRadius: 1 }} />
          <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Qualified</span>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', borderRadius: 4 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px 0' }}>
        {['W1','W2','W3','W4','W5','W6','W7','W8'].map(w => (
          <span key={w} style={{ fontSize: 8, color: 'rgba(255,255,255,0.25)' }}>{w}</span>
        ))}
      </div>
    </div>
  );
}

const KPI_TARGETS = [
  { label: 'Leads this week', value: 142, prefix: '', suffix: '', color: '#f9ca00' },
  { label: 'Qualification rate', value: 68, prefix: '', suffix: '%', color: '#00c8ff' },
  { label: 'Pipeline value', value: 42, prefix: 'AED ', suffix: '.2M', color: '#4ade80' },
  { label: 'Deals in negotiation', value: 14, prefix: '', suffix: '', color: '#ff6b35' },
];


function CRMVisual({ stageKey }: { stageKey: number }) {
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setCounts([0, 0, 0, 0]);
    const targets = [142, 68, 42, 14];
    const steps = 40;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map(t => Math.round(t * eased)));
      if (step >= steps) clearInterval(iv);
    }, 30);
    return () => clearInterval(iv);
  }, [stageKey]);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
        {KPI_TARGETS.map((kpi, i) => (
          <div key={kpi.label} style={{
            padding: '10px 12px', borderRadius: 8,
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${kpi.color}25`,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: kpi.color, lineHeight: 1 }}>
              {kpi.prefix}{counts[i]}{kpi.suffix}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginBottom: 10, padding: '6px 10px', borderRadius: 8,
        background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.25)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ fontSize: 9, color: '#4ade80' }}>●</span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Auto-generated report</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, color: 'rgba(255,255,255,0.4)' }}>Monday 7:00am · PDF sent to 4 recipients ✓</span>
      </div>

      <CRMChart stageKey={stageKey} />
    </div>
  );
}

// ─── Stage Config ─────────────────────────────────────────────────────────────

function makeStages(stage: number) {
  return [
    {
      label: 'Lead Capture', step: '01', avLabel: 'CAPTURE CHANNELS ACTIVE',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
      metrics: [
        { big: '142', cls: 'big-y', desc: 'Leads today' },
        { big: '94%', cls: 'big-g', desc: 'Qualification rate' },
        { big: '10', cls: 'big-b', desc: 'Sources' },
        { big: '0', cls: 'big-p', desc: 'Missed' },
      ],
      feed: [
        { dot: 'y', text: 'New lead via Bayut', sub: 'Ahmed M. · AED 3.5M budget', time: '2s ago' },
        { dot: 'g', text: 'WhatsApp direct enquiry', sub: 'Sarah K. · Villa search · Dubai Hills', time: '18s ago' },
        { dot: 'b', text: 'Facebook Lead Ad captured', sub: 'Marco B. · Investment query', time: '1m ago' },
      ],
      visual: <LeadCaptureVisual />,
    },
    {
      label: 'AI Qualification', step: '02', avLabel: 'AI SCORING IN PROGRESS',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
      metrics: [
        { big: '87', cls: 'big-y', desc: 'Score avg' },
        { big: '1.2s', cls: 'big-g', desc: 'AI response time' },
        { big: '34', cls: 'big-b', desc: 'Hot leads' },
        { big: '12%', cls: 'big-p', desc: 'Disqualified' },
      ],
      feed: [
        { dot: 'y', text: 'Lead scored: 92/100', sub: 'High intent · AED 3.5M · Ready to move', time: '3s ago' },
        { dot: 'g', text: 'Budget confirmed: AED 1.8M', sub: 'Analysed from WhatsApp thread', time: '22s ago' },
        { dot: 'b', text: 'Disqualified: low intent', sub: 'Just browsing · No budget given', time: '2m ago' },
      ],
      visual: <QualificationVisual stageKey={stage} />,
    },
    {
      label: 'Smart Dispatch', step: '03', avLabel: 'ROUTING ENGINE ACTIVE',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      metrics: [
        { big: '2.1s', cls: 'big-y', desc: 'Route time' },
        { big: '12', cls: 'big-g', desc: 'Agents live' },
        { big: '98%', cls: 'big-b', desc: 'Match rate' },
        { big: '4.8★', cls: 'big-p', desc: 'Agent rating' },
      ],
      feed: [
        { dot: 'y', text: 'Assigned to Khalid Al-Sayed', sub: 'Dubai Hills specialist · Arabic/English', time: '1s ago' },
        { dot: 'g', text: 'Calendar blocked: 3pm today', sub: 'Viewing slot auto-reserved', time: '15s ago' },
        { dot: 'b', text: 'Backup agent queued', sub: 'If no response in 10min', time: '30s ago' },
      ],
      visual: <DispatchVisual />,
    },
    {
      label: 'Outreach', step: '04', avLabel: 'MESSAGE DELIVERY LIVE',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
      metrics: [
        { big: '90s', cls: 'big-y', desc: 'Avg response' },
        { big: '99%', cls: 'big-g', desc: 'Delivered' },
        { big: '67%', cls: 'big-b', desc: 'Open rate' },
        { big: '0', cls: 'big-p', desc: 'Manual sends' },
      ],
      feed: [
        { dot: 'y', text: 'WhatsApp delivered ✓✓', sub: 'Marco B. · Personalised message', time: '2s ago' },
        { dot: 'g', text: 'Email opened', sub: 'Marco B. · Property brochure opened', time: '28s ago' },
        { dot: 'b', text: 'LinkedIn reply received', sub: 'Marco B. · Interested in viewing', time: '1m ago' },
      ],
      visual: <OutreachVisual stageKey={stage} />,
    },
    {
      label: 'CRM & Reports', step: '05', avLabel: 'CRM SYNC COMPLETE',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
      metrics: [
        { big: '100%', cls: 'big-y', desc: 'Sync rate' },
        { big: '0', cls: 'big-g', desc: 'Manual entry' },
        { big: '7am', cls: 'big-b', desc: 'Report time' },
        { big: 'AED 4.2M', cls: 'big-p', desc: 'Pipeline' },
      ],
      feed: [
        { dot: 'y', text: 'CRM record auto-created', sub: 'Ahmed M. · All fields populated', time: '1s ago' },
        { dot: 'g', text: 'Pipeline stage: Qualified', sub: 'Auto-updated on qualification', time: '12s ago' },
        { dot: 'b', text: 'Monday report queued', sub: 'PDF ready 7am · 4 recipients', time: '5m ago' },
      ],
      visual: <CRMVisual stageKey={stage} />,
    },
  ];
}

// ─── Stage Durations ──────────────────────────────────────────────────────────

const STAGE_DURATIONS = [4000, 8000, 6000, 9000, 4000]; // ms per stage (01→05)

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AutopilotSection() {
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startedRef = useRef(false);

  // IntersectionObserver — fires once when section enters viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          setStarted(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stage auto-advance sequence — triggered when started becomes true
  useEffect(() => {
    if (!started) return;

    const advance = (stageIndex: number) => {
      if (stageIndex >= STAGE_DURATIONS.length) return;
      timeoutRef.current = setTimeout(() => {
        const nextStage = stageIndex + 1;
        if (nextStage < 5) {
          setStage(nextStage);
          advance(nextStage);
        } else {
          setDone(true);
        }
      }, STAGE_DURATIONS[stageIndex]);
    };

    setStage(0);
    advance(0);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [started]);

  const STAGES = makeStages(stage);
  const s = STAGES[stage];

  const sectionStyle: React.CSSProperties = !done
    ? { position: 'sticky', top: 0, minHeight: '100vh', zIndex: 50, overflow: 'hidden' }
    : {};

  return (
    <section
      ref={sectionRef}
      className="section auto-section"
      id="autopilot"
      style={{ ...sectionStyle, position: 'relative' }}
    >
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 3,
        background: 'rgba(255,255,255,0.08)',
        zIndex: 10,
      }}>
        <div style={{
          height: '100%',
          background: 'var(--y)',
          width: `${((stage + 1) / 5) * 100}%`,
          transition: 'width 0.6s ease',
        }} />
      </div>

      {/* Skip button */}
      {!done && (
        <button
          onClick={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setStage(4);
            setDone(true);
          }}
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.45)',
            padding: '6px 14px',
            fontSize: 12,
            cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '.04em',
            zIndex: 20,
          }}
        >
          Skip →
        </button>
      )}

      <div className="container">
        <div className="auto-intro">
          <span className="sec-label">See it in action</span>
          <h2 className="sec-title">This is what your business<br />looks like <em>on autopilot.</em></h2>
          <p>Click each stage to explore the system in real time. Every metric is live.</p>
        </div>

        <div className="auto-master">
          <div className="auto-pipeline" style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            {STAGES.map((st, i) => (
              <div
                key={i}
                className={`pipeline-stage${stage === i ? ' active' : ''}`}
                onClick={() => setStage(i)}
              >
                <div className="ps-icon">{st.icon}</div>
                <div className="ps-text">
                  <div className="ps-step">{st.step}</div>
                  <div className="ps-label">{st.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="auto-content">
            <div className="auto-visual">
              <div className="av-label">{s.avLabel}</div>
              <div className="auto-visual-content" key={stage}>{s.visual}</div>
            </div>
            <div className="auto-meta">
              <div className="am-header">LIVE METRICS</div>
              <div className="am-metrics">
                {s.metrics.map((m, i) => (
                  <div key={i} className="am-metric">
                    <div className={`big ${m.cls}`}>{m.big}</div>
                    <div className="desc">{m.desc}</div>
                  </div>
                ))}
              </div>
              <div className="am-divider" />
              <div className="am-feed-label">ACTIVITY FEED <span className="live-badge">LIVE</span></div>
              <div className="mini-feed">
                {s.feed.map((f, i) => (
                  <div key={i} className="mf-item">
                    <div className={`mf-dot ${f.dot}`} />
                    <div className="mf-text"><strong>{f.text}</strong><span>{f.sub}</span></div>
                    <div className="mf-time">{f.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-cta">
          <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y">Automate my business →</a>
          <a href="/services/ai-automation" className="btn btn-ol">How it works</a>
        </div>
      </div>
    </section>
  );
}
