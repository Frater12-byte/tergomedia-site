/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTOMATIONS } from '@/lib/automations';
import { notFound } from 'next/navigation';

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
  const description = `${a.desc} Result: ${a.stat}. Built for ${a.industry}.`.slice(0, 155);
  const ogImage = 'https://tergomedia.com/og-image.png';
  return {
    title: `${a.title} Automation — Tergo Media`,
    description,
    keywords: [a.title, a.industry, 'automation', 'AI automation', 'Tergo Media', ...a.techStack],
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

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <Link
            href="/automations"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontSize: 11, color: 'rgba(255,255,255,.35)', letterSpacing: '.06em',
              textTransform: 'uppercase', fontWeight: 600, marginBottom: 24, textDecoration: 'none',
            }}
          >
            ← All automations
          </Link>
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
          <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '18px 24px', background: 'rgba(249,202,0,.07)', border: '1px solid rgba(249,202,0,.25)' }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,.3)', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              Key result
            </span>
            <span style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 'clamp(24px,3vw,40px)', fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>
              {a.stat}
            </span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,220px) 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <span className="sec-label">The problem</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(20px,2.2vw,30px)' }}>What needed solving</h2>
            </div>
            <p style={{ fontSize: 'clamp(14px,1.1vw,17px)', color: 'rgba(255,255,255,.55)', lineHeight: 1.85, maxWidth: 640 }}>
              {a.problem}
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">How it works</span>
          <h2 className="sec-title">The automation flow</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', marginTop: 36, marginBottom: 32 }}>
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
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {a.techStack.map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Results</span>
          <h2 className="sec-title">The numbers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', maxWidth: 640, marginTop: 36 }}>
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

      {/* RELATED */}
      {related.length > 0 && (
        <section className="section section-dots">
          <div className="container">
            <span className="sec-label">Similar automations</span>
            <h2 className="sec-title">You might also need</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', marginTop: 36 }}>
              {related.map(r => (
                <div key={r.slug} style={{ background: 'var(--surface)', padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, background: r.color }} />
                    <span style={{ fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.3)' }}>
                      {r.industry}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Exo 2', sans-serif" }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', lineHeight: 1.65, marginBottom: 12 }}>
                    {r.desc}
                  </p>
                  <Link href={`/automations/${r.slug}`} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.35)', letterSpacing: '.04em', textDecoration: 'none' }}>
                    View details →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
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
