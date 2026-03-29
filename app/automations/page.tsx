/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTOMATIONS } from '@/lib/automations';

export const metadata: Metadata = {
  title: 'Automation Library — Tergo Media',
  description: 'Hundreds of automations built and deployed in production across every industry. Browse our automation library.',
  alternates: { canonical: 'https://tergomedia.com/automations' },
};

const ALL_FILTERS = ['All', 'Real Estate', 'Finance', 'Travel', 'Agriculture', 'Professional Services', 'E-commerce', 'Healthcare', 'Logistics', 'SaaS', 'Marketing', 'HR'];

export default function AutomationsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Automation Library</div>
          <h1>Hundreds of automations.<br /><em>One partner.</em></h1>
          <p>We don&apos;t have a catalogue — we have a track record. Every automation below is live, tested, and in production. Your use case is next.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 44 }}>
            {ALL_FILTERS.map(f => (
              <span key={f} style={{ padding: '6px 14px', fontSize: 11, fontWeight: 600, border: '1px solid rgba(255,255,255,.12)', color: 'rgba(255,255,255,.45)', background: 'rgba(255,255,255,.04)', display: 'inline-block' }}>{f}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.06)' }}>
            {AUTOMATIONS.map(a => (
              <div key={a.slug} style={{ background: 'var(--surface)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, background: a.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', fontWeight: 600 }}>{a.industry}</span>
                </div>
                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#fff', fontFamily: "'Exo 2', sans-serif", margin: 0 }}>{a.title}</h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.42)', lineHeight: 1.7, margin: 0 }}>{a.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {a.techStack.slice(0, 4).map(t => <span key={t} style={{ fontSize: 10, padding: '3px 8px', border: '1px solid rgba(255,255,255,.1)', color: 'rgba(255,255,255,.3)' }}>{t}</span>)}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 10px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.2)', alignSelf: 'flex-start' }}>
                  <span style={{ width: 5, height: 5, background: 'var(--y)', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--y)', letterSpacing: '.04em', fontFamily: "'Exo 2', sans-serif" }}>{a.stat}</span>
                </div>
                <Link href={`/automations/${a.slug}`} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.35)', letterSpacing: '.04em', marginTop: 4, textDecoration: 'none' }}>
                  View details →
                </Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(255,255,255,.08)', background: 'rgba(255,255,255,.02)' }}>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>Don&apos;t see yours?</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,.45)', marginBottom: 28 }}>We&apos;ve built it, or we&apos;ll build it. Tell us your workflow and we&apos;ll scope it in 24 hours.</p>
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
