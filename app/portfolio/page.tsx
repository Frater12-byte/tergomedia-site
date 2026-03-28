/* eslint-disable */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PROJECTS } from '@/lib/projects';

const ALL_TAGS = [
  'All',
  'Real Estate',
  'AI',
  'Automation',
  'IoT',
  'Custom Dev',
  'Travel',
  'Agriculture',
  'Finance',
  'Legal',
  'CTO Advisory',
  'Healthcare',
  'Logistics',
  'E-commerce',
  'Hospitality',
];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');

  const filtered =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Our work</div>
          <h1>
            Shipped. In production.<br />
            <em>Working.</em>
          </h1>
          <p>
            30 client projects — all live, all delivering measurable results. No
            mockups, no demos, no stock photography.
          </p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          {/* Filter bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginBottom: 44,
            }}
          >
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                style={{
                  padding: '6px 14px',
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '.04em',
                  cursor: 'pointer',
                  border: '1px solid',
                  transition: 'all .15s',
                  background:
                    active === tag ? 'var(--y)' : 'rgba(255,255,255,.04)',
                  borderColor:
                    active === tag ? 'var(--y)' : 'rgba(255,255,255,.12)',
                  color: active === tag ? 'var(--dark)' : 'rgba(255,255,255,.45)',
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              background: 'rgba(255,255,255,.06)',
            }}
          >
            {filtered.map((p) => (
              <div
                key={p.slug}
                style={{
                  background: 'var(--surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '32px 28px',
                  gap: 14,
                  transition: 'background .18s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    'var(--dark3)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background =
                    'var(--surface)')
                }
              >
                {/* Tag chips */}
                <div className="port-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="port-tag">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title + client */}
                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      color: '#fff',
                      marginBottom: 4,
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {p.title}
                  </h2>
                  <div
                    style={{
                      fontSize: 10,
                      color: 'rgba(255,255,255,.28)',
                      letterSpacing: '.07em',
                      textTransform: 'uppercase',
                      marginBottom: 12,
                    }}
                  >
                    {p.client}
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,.42)',
                      lineHeight: 1.75,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                {/* Stat badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px',
                    background: 'rgba(249,202,0,.07)',
                    border: '1px solid rgba(249,202,0,.2)',
                    alignSelf: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      background: 'var(--y)',
                      flexShrink: 0,
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--y)',
                      letterSpacing: '.04em',
                      fontFamily: "'Exo 2', sans-serif",
                    }}
                  >
                    {p.stat}
                  </span>
                </div>

                {/* CTA */}
                <Link
                  href={`/portfolio/${p.slug}`}
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,.35)',
                    letterSpacing: '.04em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                    transition: 'color .15s',
                    textDecoration: 'none',
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,.35)')
                  }
                >
                  View case study →
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '72px 0',
                color: 'rgba(255,255,255,.3)',
                fontSize: 15,
              }}
            >
              No projects found for this filter.
            </div>
          )}
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Want results like these?</h2>
          <p>
            Book a free discovery call. We&apos;ll show you exactly what we&apos;d
            build for your business.
          </p>
          <div className="cta-btns">
            <a
              href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark btn-lg"
            >
              Book a free call →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
