/* eslint-disable */
'use client';
import { useState } from 'react';
import { submitForm } from '@/lib/submitForm';

const INSIDE = [
  { n: '01', title: 'Why 68% of Dubai leads go cold', desc: 'The response-time gap that kills deals before agents even know they exist.' },
  { n: '02', title: '3 case studies with real metrics', desc: 'Lead pipeline in 12 days. Viewings on autopilot. 22% revenue growth in Q1.' },
  { n: '03', title: 'The full automation stack', desc: 'CRM sync, WhatsApp bot, viewing scheduler, follow-up sequences — how it fits together.' },
  { n: '04', title: 'ROI breakdown by brokerage size', desc: 'What a 10-agent, 20-agent, and 40-agent brokerage can expect in the first 90 days.' },
];

const STATS = [
  { n: '68%', l: 'of leads go cold\nin under 1 hour' },
  { n: '4 hrs', l: 'lost daily per agent\nto manual admin' },
  { n: '1 in 3', l: 'deals lost to slow\nor missed follow-up' },
  { n: '12 days', l: 'average time to\nlive automation' },
];

export default function WhitepaperGate() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [agents, setAgents] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const result = await submitForm({
      name,
      email,
      company,
      agents,
      _source: 'whitepaper-real-estate',
      message: `Whitepaper download request — Brokerage: ${company}, Agents: ${agents}`,
    });
    if (result.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      setErrorMsg(result.error ?? 'Something went wrong.');
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,.05)',
    border: '1px solid rgba(255,255,255,.1)',
    padding: '11px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    borderRadius: 0,
    transition: 'border-color .2s',
  };

  return (
    <section className="section section-dots" style={{ background: 'var(--dark)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56 }}>
          <div style={{ maxWidth: 580 }}>
            <span className="sec-label">Free whitepaper</span>
            <h2 className="sec-title">The Dubai Brokerage<br /><em style={{ color: 'var(--y)', fontStyle: 'normal' }}>Automation Playbook</em></h2>
            <p className="sec-sub">Every metric, every case study, every tool stack — laid out for Dubai real estate teams. Download free.</p>
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', background: 'rgba(249,202,0,.08)', border: '1px solid rgba(249,202,0,.25)', color: 'var(--y)', fontSize: 11, fontWeight: 700, letterSpacing: '.06em', alignSelf: 'flex-start', marginTop: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            FREE · PDF REPORT
          </div>
        </div>

        {/* Stats strip */}
        <div className="wp-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'rgba(255,255,255,.05)', marginBottom: 48 }}>
          {STATS.map(s => (
            <div key={s.n} style={{ background: 'var(--dark)', padding: '22px 20px', borderTop: '2px solid rgba(249,202,0,.35)' }}>
              <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)', lineHeight: 1.55, whiteSpace: 'pre-line' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Two-col: what's inside + gate form */}
        <div className="wp-two-col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,420px)', gap: 48, alignItems: 'start' }}>

          {/* Left: what's inside */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 24 }}>What&apos;s inside</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {INSIDE.map(item => (
                <div key={item.n} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  <span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 22, fontWeight: 900, color: 'var(--y)', lineHeight: 1, minWidth: 36, paddingTop: 2 }}>{item.n}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6, lineHeight: 1.25 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mini case study preview */}
            <div style={{ marginTop: 32, padding: '20px 24px', background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.07)', borderLeft: '3px solid var(--y)' }}>
              <div style={{ fontSize: 10, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Inside: Case Study · WhatsApp Bot</div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 12 }}>
                <div><span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 26, fontWeight: 900, color: 'var(--y)' }}>60%</span><div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>viewings booked without<br />agent input</div></div>
                <div><span style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 26, fontWeight: 900, color: 'var(--y)' }}>4.8★</span><div style={{ fontSize: 11, color: 'rgba(255,255,255,.35)' }}>client satisfaction<br />from week one</div></div>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,.35)', fontStyle: 'italic', lineHeight: 1.7, margin: 0 }}>&ldquo;The bot handles everything until someone is ready to sign. Our agents only talk to serious buyers now.&rdquo;</p>
            </div>
          </div>

          {/* Right: gate form */}
          <div className="wp-sticky" style={{ position: 'sticky', top: 100 }}>
            <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.1)', padding: '32px 28px' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ width: 52, height: 52, background: 'rgba(249,202,0,.1)', border: '1px solid rgba(249,202,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Your copy is ready</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.65, marginBottom: 24 }}>We&apos;ve also sent a copy to your inbox. Open it on any device.</p>
                  <a
                    href="/whitepaper/real-estate.html"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-y btn-lg"
                    style={{ display: 'block', textAlign: 'center' }}
                  >
                    Open the playbook →
                  </a>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 11, color: 'var(--y)', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>Get the free playbook</div>
                    <h3 style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 19, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 6 }}>The Dubai Brokerage Automation Playbook</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.35)', lineHeight: 1.6, margin: 0 }}>Instant access. No spam. We&apos;ll follow up only if it looks relevant to your business.</p>
                  </div>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }} noValidate>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      style={inputStyle}
                    />
                    <input
                      type="email"
                      placeholder="Work email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      style={inputStyle}
                    />
                    <input
                      type="text"
                      placeholder="Brokerage name"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      style={inputStyle}
                    />
                    <select
                      value={agents}
                      onChange={e => setAgents(e.target.value)}
                      style={{ ...inputStyle, color: agents ? '#fff' : 'rgba(255,255,255,.35)', appearance: 'none', WebkitAppearance: 'none' }}
                    >
                      <option value="" disabled style={{ color: '#888', background: '#1a1a1a' }}>Team size</option>
                      <option value="1–5" style={{ background: '#1a1a1a' }}>1–5 agents</option>
                      <option value="6–15" style={{ background: '#1a1a1a' }}>6–15 agents</option>
                      <option value="16–30" style={{ background: '#1a1a1a' }}>16–30 agents</option>
                      <option value="30+" style={{ background: '#1a1a1a' }}>30+ agents</option>
                    </select>
                    {status === 'error' && <p style={{ color: '#e05858', fontSize: 12, margin: 0 }}>{errorMsg}</p>}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn btn-y btn-lg"
                      style={{ width: '100%', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer', marginTop: 4 }}
                    >
                      {status === 'loading' ? 'Sending…' : 'Get free access →'}
                    </button>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,.2)', margin: 0, lineHeight: 1.5, textAlign: 'center' }}>No credit card. No spam. Instant access.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
