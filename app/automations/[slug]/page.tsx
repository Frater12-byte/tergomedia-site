/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTOMATIONS } from '@/lib/automations';
import { notFound } from 'next/navigation';
import AutomationFlowClient from '@/components/AutomationFlowClient';

const PLATFORM_META: Record<string, { color: string }> = {
  'n8n':      { color: '#ea4b71' },
  'Make.com': { color: '#6d2ef1' },
  'Zapier':   { color: '#ff4a00' },
  'UiPath':   { color: '#f4c400' },
};

export async function generateStaticParams() {
  return AUTOMATIONS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = AUTOMATIONS.find(x => x.slug === slug);
  if (!a) return {};
  const description = `${a.desc} Result: ${a.stat}. Built for ${a.industry} on ${a.platform}.`.slice(0, 155);
  const ogImage = 'https://tergomedia.com/og-image.png';
  return {
    title: `${a.title} Automation — Tergo Media`,
    description,
    keywords: [a.title, a.industry, a.platform, 'automation', 'AI automation', 'Tergo Media', ...a.techStack],
    openGraph: {
      title: `${a.title} Automation — Tergo Media`,
      description,
      url: `https://tergomedia.com/automations/${slug}`,
      siteName: 'Tergo Media',
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${a.title} — Tergo Media` }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${a.title} Automation — Tergo Media`,
      description,
      images: [ogImage],
    },
    alternates: { canonical: `https://tergomedia.com/automations/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function AutomationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = AUTOMATIONS.find(x => x.slug === slug);
  if (!a) notFound();

  const related = AUTOMATIONS.filter(x => a.related.includes(x.slug)).slice(0, 3);
  const pm = PLATFORM_META[a.platform];

  return (
    <>
      {/* ── PAGE-SCOPED STYLES ── */}
      <style>{`
        .auto-challenge-grid { display:grid; grid-template-columns:240px 1fr; gap:64px; align-items:start; }
        .auto-results-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(255,255,255,.06); max-width:720px; }
        .auto-related-grid   { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; background:rgba(255,255,255,.06); }
        .auto-steps-grid     { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:2px; background:rgba(255,255,255,.06); margin-top:36px; margin-bottom:32px; }

        @media(max-width:860px){
          .auto-challenge-grid { grid-template-columns:1fr; gap:24px; }
          .auto-results-grid   { max-width:100%; }
          .auto-related-grid   { grid-template-columns:1fr; }
        }
        @media(max-width:560px){
          .auto-results-grid { grid-template-columns:1fr; }
          .auto-steps-grid   { grid-template-columns:1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="900,0 1440,80 1440,320 1100,420 800,280 850,0" fill="rgba(249,202,0,0.015)" stroke="#f9ca00" strokeWidth="0.5" strokeOpacity="0.08" />
        </svg>
        <div className="container">
          <Link
            href="/automations"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 24, textDecoration: 'none' }}
          >
            ← All automations
          </Link>

          {/* Platform badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', background: `rgba(${hexToRgb(pm?.color ?? '#f9ca00')},.1)`, border: `1px solid rgba(${hexToRgb(pm?.color ?? '#f9ca00')},.25)`, marginBottom: 14, marginLeft: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: pm?.color, flexShrink: 0, display: 'inline-block' }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: pm?.color }}>{a.platform}</span>
          </div>

          {/* Industry */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, background: a.color }} />
            <span style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', fontWeight: 600 }}>
              {a.industry}
            </span>
          </div>

          <h1 style={{ marginBottom: 16 }}>{a.title}</h1>

          <p style={{ fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(255,255,255,.5)', lineHeight: 1.8, maxWidth: 540, marginBottom: 32 }}>
            {a.desc}
          </p>

          {/* Key result */}
          <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '18px 24px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.25)' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              Key result
            </span>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>
              {a.stat}
            </span>
          </div>

          {/* Results met-row */}
          <div className="met-row" style={{ maxWidth: 640 }}>
            {a.results.map(r => (
              <div key={r.label} className="met">
                <div className="met-b">{r.big}</div>
                <div className="met-s">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="section section-light">
        <div className="container">
          <div className="auto-challenge-grid">
            <div>
              <span className="sec-label">The problem</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(22px,2.4vw,32px)' }}>What needed<br />solving</h2>
            </div>
            <div>
              <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, maxWidth: 680 }}>
                {a.problem}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">How it works</span>
          <h2 className="sec-title">The automation steps</h2>

          <div className="auto-steps-grid">
            {a.howItWorks.map((step, i) => (
              <div key={i} style={{ background: 'var(--surface)', padding: '28px 24px' }}>
                <div style={{ fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: a.color, fontWeight: 700, marginBottom: 10 }}>
                  {step.step}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', lineHeight: 1.75, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {a.techStack.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── AUTOMATION FLOW ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Automation architecture</span>
          <h2 className="sec-title">How the workflow runs</h2>
          <p className="sec-sub">Each step fires automatically. Click "Simulate run" to see the sequence.</p>

          <AutomationFlowClient flowSteps={a.flowSteps} platformColor={pm?.color} />
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">Results</span>
          <h2 className="sec-title">The numbers</h2>
          <p className="sec-sub">Concrete, measurable outcomes delivered in production.</p>
          <div className="auto-results-grid">
            {a.results.map(r => (
              <div key={r.label} style={{ background: 'var(--dark)', padding: '36px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1, marginBottom: 10 }}>
                  {r.big}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,.28)', textTransform: 'uppercase', letterSpacing: '.06em', lineHeight: 1.5 }}>
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">How we work</span>
          <h2 className="sec-title">From brief to production</h2>
          <div className="how-steps" style={{ maxWidth: 580 }}>
            {[
              { n: '01', title: 'Discovery & scoping', desc: 'We map the problem, understand the existing stack, and write a fixed-price proposal. No surprises.', badge: '1–3 DAYS' },
              { n: '02', title: 'Build & weekly demos', desc: 'You see working software every week. Feedback is incorporated immediately — not at the end.', badge: '2–4 WEEKS' },
              { n: '03', title: 'Testing & QA', desc: 'Every integration is stress-tested before go-live. Edge cases handled, fallbacks in place.', badge: '3–5 DAYS' },
              { n: '04', title: 'Go live & handover', desc: 'Full documentation, team training, monitoring setup, and 30-day post-launch support.', badge: '1 WEEK' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n">{s.n}</div>
                <div className="how-step-body">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                  <span className="step-badge">{s.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="section section-dots">
          <div className="container">
            <span className="sec-label">Similar automations</span>
            <h2 className="sec-title">You might also need</h2>
            <div className="auto-related-grid" style={{ marginTop: 36 }}>
              {related.map(r => {
                const rpm = PLATFORM_META[r.platform];
                return (
                  <div key={r.slug} style={{ background: 'var(--surface)', padding: '24px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 10 }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: rpm?.color, display: 'inline-block' }} />
                      <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: rpm?.color }}>{r.platform}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
                      <div style={{ width: 6, height: 6, background: r.color }} />
                      <span style={{ fontSize: 9, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)', fontWeight: 600 }}>{r.industry}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Exo 2', sans-serif" }}>{r.title}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.65, marginBottom: 12 }}>{r.desc}</p>
                    <Link href={`/automations/${r.slug}`} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.35)', letterSpacing: '.04em', textDecoration: 'none' }}>
                      View workflow →
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Build this for my business</h2>
          <p>
            Book a free 30-minute call. We&apos;ll scope your automation and tell you exactly what it would cost.
          </p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">
              Book a free call →
            </a>
            <Link href="/automations" className="btn btn-ol btn-lg">
              ← All automations
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── helper: hex → "r,g,b" string for rgba() ── */
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
