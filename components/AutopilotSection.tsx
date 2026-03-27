'use client';
import { useState, useEffect } from 'react';

const STAGES = [
  {
    label: 'Lead Capture', step: '01', avLabel: 'CAPTURE CHANNELS ACTIVE',
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    metrics: [{ big: '142', cls: 'big-y', desc: 'Leads today' }, { big: '94%', cls: 'big-g', desc: 'Captured' }, { big: '6', cls: 'big-b', desc: 'Sources' }, { big: '0', cls: 'big-p', desc: 'Missed' }],
    feed: [{ dot: 'y', text: 'New lead via Bayut', sub: 'Ahmed M. · AED 2.4M budget', time: '2s ago' }, { dot: 'g', text: 'PropertyFinder enquiry', sub: 'Sarah K. · Villa search', time: '18s ago' }, { dot: 'b', text: 'Web form submitted', sub: 'Marco B. · Investment query', time: '1m ago' }],
    visual: (
      <div className="score-wrap">
        {[['Bayut', 68], ['PropertyFinder', 54], ['Web form', 38], ['WhatsApp direct', 22]].map(([name, pct]) => (
          <div key={name as string} className="score-row">
            <div className="score-top"><span>{name}</span><span>{pct as number}%</span></div>
            <div className="score-track"><div className="score-fill" style={{ width: `${pct}%`, background: 'var(--y)' }} /></div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'AI Qualification', step: '02', avLabel: 'AI SCORING IN PROGRESS',
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>,
    metrics: [{ big: '87', cls: 'big-y', desc: 'Score avg' }, { big: '1.2s', cls: 'big-g', desc: 'AI time' }, { big: '34', cls: 'big-b', desc: 'Hot leads' }, { big: '12%', cls: 'big-p', desc: 'Disqualified' }],
    feed: [{ dot: 'y', text: 'Lead scored: 92/100', sub: 'High intent · AED 2.4M · Ready', time: '3s ago' }, { dot: 'g', text: 'Budget confirmed: AED 1.8M', sub: 'Analysed from WhatsApp thread', time: '22s ago' }, { dot: 'b', text: 'Disqualified: low intent', sub: 'Just browsing · No budget given', time: '2m ago' }],
    visual: (
      <div className="msg-preview">
        <div className="msg-from"><span>🤖</span> GPT-4o qualification summary</div>
        <div className="msg-bubble-out">Lead: Ahmed M. Score: 92/100. Budget AED 2.4M confirmed. Looking for villa in Palm Jumeirah, ready to view within 1 week. High priority — assign senior agent immediately.</div>
      </div>
    ),
  },
  {
    label: 'Smart Dispatch', step: '03', avLabel: 'ROUTING ENGINE ACTIVE',
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    metrics: [{ big: '2.1s', cls: 'big-y', desc: 'Route time' }, { big: '12', cls: 'big-g', desc: 'Agents live' }, { big: '98%', cls: 'big-b', desc: 'Match rate' }, { big: '4.8★', cls: 'big-p', desc: 'Agent rating' }],
    feed: [{ dot: 'y', text: 'Assigned to Khalid Al-Sayed', sub: 'Palm specialist · Arabic/English', time: '1s ago' }, { dot: 'g', text: 'Calendar blocked: 3pm today', sub: 'Viewing slot auto-reserved', time: '15s ago' }, { dot: 'b', text: 'Backup agent queued', sub: 'If no response in 10min', time: '30s ago' }],
    visual: (
      <div className="crm-vis">
        {[{ label: 'Available', num: '4', active: false }, { label: 'Assigned', num: '8', active: true }, { label: 'On viewing', num: '3', active: false }].map(col => (
          <div key={col.label} className={`crm-col${col.active ? ' active' : ''}`}>
            <div className="crm-col-head"><div className="cch-label">{col.label}</div><div className="cch-num">{col.num}</div></div>
            {col.active && ['Ahmed M.', 'Sarah K.', 'Marco B.'].map(n => (
              <div key={n} className="crm-card"><div className="cc-name">{n}</div><div className="cc-val">Score 85+</div></div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Outreach', step: '04', avLabel: 'MESSAGE DELIVERY LIVE',
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    metrics: [{ big: '90s', cls: 'big-y', desc: 'Avg response' }, { big: '99%', cls: 'big-g', desc: 'Delivered' }, { big: '67%', cls: 'big-b', desc: 'Open rate' }, { big: '0', cls: 'big-p', desc: 'Manual sends' }],
    feed: [{ dot: 'y', text: 'WhatsApp delivered ✓✓', sub: 'Ahmed M. · Personalised in Arabic', time: '2s ago' }, { dot: 'g', text: 'Email sent & opened', sub: 'Sarah K. · Property brochure attached', time: '28s ago' }, { dot: 'b', text: 'Follow-up scheduled', sub: 'Marco B. · Tomorrow 10am GST', time: '1m ago' }],
    visual: (
      <div className="msg-preview">
        <div className="msg-from"><span>💬</span> WhatsApp · Personalised by AI</div>
        <div className="msg-bubble-out">مرحباً أحمد! شكراً لتواصلك مع فريقنا. اطلعنا على متطلباتك ولدينا 3 فلل رائعة في نخلة جميرا ضمن ميزانيتك. هل يمكنني ترتيب جولة لك اليوم؟ — خالد</div>
      </div>
    ),
  },
  {
    label: 'CRM & Reports', step: '05', avLabel: 'CRM SYNC COMPLETE',
    icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    metrics: [{ big: '100%', cls: 'big-y', desc: 'Sync rate' }, { big: '0', cls: 'big-g', desc: 'Manual entry' }, { big: '7am', cls: 'big-b', desc: 'Report time' }, { big: '∞', cls: 'big-p', desc: 'History' }],
    feed: [{ dot: 'y', text: 'HubSpot record created', sub: 'Ahmed M. · All fields populated', time: '1s ago' }, { dot: 'g', text: 'Pipeline stage: Qualified', sub: 'Auto-updated on qualification', time: '12s ago' }, { dot: 'b', text: 'Monday report queued', sub: 'PDF ready 7am GST', time: '5m ago' }],
    visual: (
      <div className="report-card">
        {[{ label: 'New leads (7d)', val: '142', cls: 'y' }, { label: 'Responded <90s', val: '138', cls: 'g' }, { label: 'Viewings booked', val: '34', cls: 'b' }, { label: 'Deals closed', val: '6', cls: 'y' }, { label: 'Revenue pipeline', val: 'AED 8.2M', cls: 'g' }].map(r => (
          <div key={r.label} className="rc-row"><span className="rc-label">{r.label}</span><span className={`rc-val ${r.cls}`}>{r.val}</span></div>
        ))}
      </div>
    ),
  },
];

export default function AutopilotSection() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setStage(s => (s + 1) % STAGES.length), 4000);
    return () => clearInterval(iv);
  }, []);

  const s = STAGES[stage];

  return (
    <section className="section auto-section" id="autopilot">
      <div className="container">
        <div className="auto-intro">
          <span className="sec-label">See it in action</span>
          <h2 className="sec-title">This is what your business<br />looks like <em>on autopilot.</em></h2>
          <p>Click each stage to explore the system in real time. Every metric is live.</p>
        </div>

        <div className="auto-master">
          <div className="auto-pipeline">
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
