/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/projects';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Tergo Media Portfolio`,
    description: project.desc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <svg
          className="poly-bg"
          viewBox="0 0 1440 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            points="900,0 1440,80 1440,320 1100,420 800,280 850,0"
            fill="rgba(249,202,0,0.02)"
            stroke="#f9ca00"
            strokeWidth="0.5"
            strokeOpacity="0.1"
          />
        </svg>
        <div className="container">
          <Link
            href="/portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              color: 'rgba(255,255,255,.35)',
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: 24,
              textDecoration: 'none',
              transition: 'color .15s',
            }}
          >
            ← All projects
          </Link>

          {/* Tags */}
          <div className="port-tags" style={{ marginBottom: 18 }}>
            {project.tags.map((t) => (
              <span key={t} className="port-tag">
                {t}
              </span>
            ))}
          </div>

          <h1 style={{ marginBottom: 10 }}>{project.title}</h1>

          <p
            style={{
              fontSize: 'clamp(13px,1.1vw,16px)',
              color: 'rgba(255,255,255,.4)',
              letterSpacing: '.07em',
              textTransform: 'uppercase',
              marginBottom: 32,
            }}
          >
            {project.client}
          </p>

          {/* Key outcome stat */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              padding: '18px 24px',
              background: 'rgba(249,202,0,.07)',
              border: '1px solid rgba(249,202,0,.25)',
            }}
          >
            <span
              style={{
                fontSize: 10,
                color: 'rgba(255,255,255,.3)',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 6,
              }}
            >
              Key outcome
            </span>
            <span
              style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: 'clamp(22px,2.8vw,36px)',
                fontWeight: 900,
                color: 'var(--y)',
                lineHeight: 1,
              }}
            >
              {project.stat}
            </span>
          </div>

          {/* Met-row for results */}
          <div className="met-row" style={{ maxWidth: 640 }}>
            {project.results.map((r) => (
              <div key={r.s} className="met">
                <div className="met-b">{r.b}</div>
                <div className="met-s">{r.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="section section-light">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '240px 1fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            <div>
              <span className="sec-label">The challenge</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(22px,2.4vw,32px)' }}>
                What needed<br />solving
              </h2>
            </div>
            <div>
              <p
                style={{
                  fontSize: 'clamp(14px,1.1vw,17px)',
                  color: 'rgba(255,255,255,.55)',
                  lineHeight: 1.85,
                  maxWidth: 680,
                }}
              >
                {project.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The solution</span>
          <h2 className="sec-title">What we built</h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              background: 'rgba(255,255,255,.06)',
              marginBottom: 40,
            }}
          >
            <div
              style={{
                background: 'var(--surface)',
                padding: '36px 40px',
              }}
            >
              <p
                style={{
                  fontSize: 15,
                  color: 'rgba(255,255,255,.5)',
                  lineHeight: 1.85,
                }}
              >
                {project.solution}
              </p>
            </div>
            <div
              style={{
                background: 'var(--surface)',
                padding: '36px 40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 28,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,.25)',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: 14,
                  }}
                >
                  Tech stack
                </span>
                <div className="svc-tags">
                  {project.techStack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontSize: 10,
                    color: 'rgba(255,255,255,.25)',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: 14,
                  }}
                >
                  Category
                </span>
                <div className="port-tags">
                  {project.tags.map((t) => (
                    <span key={t} className="port-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Results</span>
          <h2 className="sec-title">The numbers</h2>
          <p className="sec-sub">
            Concrete, measurable outcomes delivered in production.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              background: 'rgba(255,255,255,.06)',
              maxWidth: 720,
            }}
          >
            {project.results.map((r) => (
              <div
                key={r.s}
                style={{
                  background: 'var(--dark)',
                  padding: '36px 28px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Exo 2', sans-serif",
                    fontSize: 'clamp(24px,3vw,40px)',
                    fontWeight: 900,
                    color: 'var(--y)',
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {r.b}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.28)',
                    textTransform: 'uppercase',
                    letterSpacing: '.06em',
                    lineHeight: 1.5,
                  }}
                >
                  {r.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE BUILT IT ── */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">How we work</span>
          <h2 className="sec-title">From brief to production</h2>
          <div className="how-steps" style={{ maxWidth: 580 }}>
            {[
              {
                n: '01',
                title: 'Discovery & scoping',
                desc: 'We map the problem, understand the existing stack, and write a fixed-price proposal. No surprises.',
                badge: '1–3 DAYS',
              },
              {
                n: '02',
                title: 'Build & weekly demos',
                desc: 'You see working software every week. Feedback is incorporated immediately — not at the end.',
                badge: '2–6 WEEKS',
              },
              {
                n: '03',
                title: 'Testing & QA',
                desc: 'Every integration is stress-tested before go-live. Edge cases handled, fallbacks in place.',
                badge: '3–5 DAYS',
              },
              {
                n: '04',
                title: 'Go live & handover',
                desc: 'Full documentation, team training, monitoring setup, and 30-day post-launch support.',
                badge: '1 WEEK',
              },
            ].map((s) => (
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

      {/* ── CTA ── */}
      <section className="cta-section">
        <div className="container">
          <h2>Build something similar?</h2>
          <p>
            Book a free 30-minute call. We&apos;ll assess your situation and tell you
            exactly what we&apos;d build — and what it would cost.
          </p>
          <div className="cta-btns">
            <a
              href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-lg"
            >
              Build something similar →
            </a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">
              ← Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
