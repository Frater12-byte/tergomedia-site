/* eslint-disable */
'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { AUTOMATIONS } from '@/lib/automations';
import type { Automation } from '@/lib/automations';

const PLATFORM_META: Record<string, { color: string; label: string }> = {
  'n8n':     { color: '#ea4b71', label: 'n8n' },
  'Make.com':{ color: '#6d2ef1', label: 'Make.com' },
  'Zapier':  { color: '#ff4a00', label: 'Zapier' },
  'UiPath':  { color: '#f4c400', label: 'UiPath' },
};

const ALL_PLATFORMS = ['All', 'n8n', 'Make.com', 'Zapier', 'UiPath'];

const ALL_INDUSTRIES = [
  'All',
  ...Array.from(new Set(AUTOMATIONS.map(a => a.industry))).sort(),
];

const ALL_TECH = [
  'Any tech',
  'n8n', 'Make.com', 'Zapier', 'UiPath',
  'GPT-4o', 'HubSpot', 'Slack',
  'Google Sheets', 'Airtable', 'Stripe',
  'WhatsApp API', 'Shopify', 'DocuSign',
  'Python', 'Salesforce',
];

export default function AutomationsClient() {
  const [platform, setPlatform] = useState('All');
  const [industry, setIndustry] = useState('All');
  const [tech, setTech] = useState('Any tech');

  const filtered = useMemo(() =>
    AUTOMATIONS.filter(a => {
      const matchPlatform = platform === 'All' || a.platform === platform;
      const matchIndustry = industry === 'All' || a.industry === industry;
      const matchTech = tech === 'Any tech' || a.techStack.some(t => t.toLowerCase().includes(tech.toLowerCase()));
      return matchPlatform && matchIndustry && matchTech;
    }),
    [platform, industry, tech]
  );

  return (
    <>
      <style>{`
        /* ── Platform tab bar ── */
        .auto-platform-bar {
          display: flex;
          gap: 0;
          margin-bottom: 36px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .auto-platform-bar::-webkit-scrollbar { display: none; }

        .auto-platform-tab {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 12px 20px;
          font-family: 'Exo 2', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: color .15s, border-color .15s;
          white-space: nowrap;
          margin-bottom: -1px;
        }
        .auto-platform-tab:hover { color: rgba(255,255,255,.65); }
        .auto-platform-tab.apt-active { color: #fff; }

        .auto-platform-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
          opacity: .5;
          transition: opacity .15s;
        }
        .auto-platform-tab.apt-active .auto-platform-dot { opacity: 1; }

        /* ── Industry / tech filter bars (matching portfolio) ── */
        .auto-filter-btn.aft-tech { font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: .02em; }
        .auto-filter-btn.aft-tech:hover { border-color: rgba(0,200,255,.3); color: rgba(0,200,255,.65); background: rgba(0,200,255,.04); }
        .auto-filter-btn.aft-tech.aft-tech-active { background: rgba(0,200,255,.1); border-color: rgba(0,200,255,.5); color: #00c8ff; }

        /* ── Automation card ── */
        .auto-card {
          background: var(--surface);
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 24px;
          position: relative;
          border: 1px solid rgba(255,255,255,.06);
          transition: transform .18s, box-shadow .18s, border-color .18s, background .18s;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
        }
        .auto-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,.28);
          border-color: rgba(255,255,255,.14);
          background: var(--dark3);
        }
        .auto-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: rgba(255,255,255,.06);
        }
        .auto-card-inner {
          background: var(--surface);
          transition: background .18s;
        }
        @media(max-width:1024px) { .auto-cards-grid { grid-template-columns: repeat(2, 1fr); } }
        @media(max-width:600px)  { .auto-cards-grid { grid-template-columns: 1fr; } }

        .auto-card-platform {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 4px;
        }
        .auto-card-platform-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }
        .auto-card-platform-name {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        @media(max-width:600px) {
          .port-filter-bar { gap: 6px; }
          .port-filter-btn { padding: 6px 10px; font-size: 10px; }
          .auto-platform-tab { padding: 10px 14px; font-size: 11px; }
        }
      `}</style>

      {/* ── PLATFORM TABS ── */}
      <div className="auto-platform-bar">
        {ALL_PLATFORMS.map(p => {
          const meta = PLATFORM_META[p];
          const isActive = platform === p;
          return (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`auto-platform-tab${isActive ? ' apt-active' : ''}`}
              style={isActive && meta ? { borderBottomColor: meta.color, color: meta.color } : undefined}
            >
              {meta && (
                <span
                  className="auto-platform-dot"
                  style={{ background: meta.color }}
                />
              )}
              {p}
            </button>
          );
        })}
      </div>

      {/* ── INDUSTRY FILTER ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 9, color: 'rgba(249,202,0,.5)', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700, flexShrink: 0 }}>Industry</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(249,202,0,.1)' }} />
      </div>
      <div className="port-filter-bar" style={{ marginBottom: 24 }}>
        {ALL_INDUSTRIES.map(ind => (
          <button
            key={ind}
            onClick={() => setIndustry(ind)}
            className={`port-filter-btn${industry === ind ? ' pf-active' : ''}`}
          >
            {ind}
          </button>
        ))}
      </div>

      {/* ── TECH STACK FILTER ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 9, color: 'rgba(0,200,255,.45)', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700, flexShrink: 0 }}>Tech stack</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(0,200,255,.1)' }} />
      </div>
      <div className="port-filter-bar" style={{ marginBottom: 40 }}>
        {ALL_TECH.map(t => (
          <button
            key={t}
            onClick={() => setTech(t)}
            className={`port-filter-btn auto-filter-btn aft-tech${tech === t ? ' aft-tech-active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── CARDS GRID ── */}
      {filtered.length > 0 ? (
        <div className="auto-cards-grid">
          {filtered.map(a => {
            const pm = PLATFORM_META[a.platform];
            return (
              <div key={a.slug} className="auto-card-inner">
                <Link href={`/automations/${a.slug}`} className="auto-card" style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '24px', textDecoration: 'none', color: 'inherit', height: '100%', boxSizing: 'border-box' }}>
                  {/* Platform badge */}
                  <div className="auto-card-platform">
                    <span className="auto-card-platform-dot" style={{ background: pm?.color }} />
                    <span className="auto-card-platform-name" style={{ color: pm?.color }}>{a.platform}</span>
                  </div>

                  {/* Industry + title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 6, height: 6, background: a.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', fontWeight: 700 }}>{a.industry}</span>
                  </div>

                  <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', fontFamily: "'Exo 2', sans-serif", margin: 0, lineHeight: 1.25 }}>{a.title}</h2>

                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.42)', lineHeight: 1.7, margin: 0, flex: 1 }}>{a.desc}</p>

                  {/* Tech pills */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {a.techStack.slice(0, 4).map(t => (
                      <span key={t} style={{ fontSize: 9, padding: '2px 7px', border: '1px solid rgba(255,255,255,.09)', color: 'rgba(255,255,255,.28)', letterSpacing: '.03em' }}>{t}</span>
                    ))}
                  </div>

                  {/* Stat */}
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.2)', alignSelf: 'flex-start' }}>
                    <span style={{ width: 4, height: 4, background: 'var(--y)', display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--y)', letterSpacing: '.04em', fontFamily: "'Exo 2', sans-serif" }}>{a.stat}</span>
                  </div>

                  <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,.32)', letterSpacing: '.04em', marginTop: 2 }}>
                    View workflow →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '72px 0', color: 'rgba(255,255,255,.3)', fontSize: 15 }}>
          No automations found for this filter combination.
        </div>
      )}
    </>
  );
}
