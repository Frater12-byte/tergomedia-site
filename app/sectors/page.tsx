import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sectors — Tergo Media',
  description: 'Tergo Media builds AI automation and custom software for real estate, travel & hospitality, agriculture, and professional services.',
};

const SECTORS = [
  {
    href: '/sectors/real-estate',
    num: '01',
    title: 'Real Estate',
    desc: 'AI lead qualification, WhatsApp automation, CRM integration, and digital portals for property companies across the Gulf and Europe.',
    tags: ['Lead automation', 'WhatsApp AI', 'CRM', 'Property portals'],
    stat: { b: '$2.1M', s: 'Pipeline added for one client' },
  },
  {
    href: '/sectors/travel-hospitality',
    num: '02',
    title: 'Travel & Hospitality',
    desc: 'Custom booking systems, guest communication AI, automated review responses, and channel synchronisation for hotels and charter operators.',
    tags: ['Booking systems', 'Guest AI', 'Review automation', 'Channel sync'],
    stat: { b: '99.9%', s: 'Uptime across hospitality clients' },
  },
  {
    href: '/sectors/finance-legal',
    num: '03',
    title: 'Finance & Legal',
    desc: 'KYC onboarding automation, compliance reporting, contract management, and billing automation for regulated firms and law practices.',
    tags: ['KYC automation', 'Compliance reporting', 'Contract management', 'Billing'],
    stat: { b: '15min', s: 'KYC onboarding time' },
  },
  {
    href: '/sectors/healthcare',
    num: '04',
    title: 'Healthcare',
    desc: 'Online appointment systems, digital patient intake, care follow-up sequences, and insurance billing automation for private clinics.',
    tags: ['Appointments', 'Patient intake', 'Follow-up care', 'Claims automation'],
    stat: { b: '−15%', s: 'No-show rate reduction' },
  },
  {
    href: '/sectors/ecommerce',
    num: '05',
    title: 'E-Commerce',
    desc: 'Order fulfilment automation, multi-channel inventory sync, abandoned cart recovery, and AI customer support for online retailers.',
    tags: ['Order automation', 'Inventory sync', 'Cart recovery', 'AI support'],
    stat: { b: '4x', s: 'Abandoned cart recovery rate' },
  },
  {
    href: '/sectors/logistics',
    num: '06',
    title: 'Logistics',
    desc: 'Shipment tracking automation, customer notifications, digital proof of delivery, and dispatch optimisation for freight and last-mile operators.',
    tags: ['Shipment tracking', 'Customer notifications', 'Digital POD', 'Dispatch'],
    stat: { b: '98%', s: 'On-time delivery rate' },
  },
  {
    href: '/sectors/agriculture',
    num: '07',
    title: 'Agriculture',
    desc: 'IoT sensor platforms, real-time monitoring dashboards, and automated alert escalation for precision farming operations.',
    tags: ['IoT sensors', 'Real-time monitoring', 'Alert automation', 'Precision farming'],
    stat: { b: '400ha', s: 'Monitored for one client' },
  },
  {
    href: '/sectors/professional-services',
    num: '08',
    title: 'Professional Services',
    desc: 'Client onboarding automation, time capture, billing sync, contract renewals, and reporting for consultancies, agencies, and advisory firms.',
    tags: ['Onboarding', 'Time & billing', 'Contract renewals', 'Reporting'],
    stat: { b: '11%', s: 'Revenue leakage recovered' },
  },
];

export default function SectorsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Industries</div>
          <h1>Deep sector knowledge.<br /><em>Not generic AI.</em></h1>
          <p>We focus on four industries where AI and automation create the highest measurable impact. We know the workflows, the tools, and the bottlenecks — before we even start.</p>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <div className="services-grid">
            {SECTORS.map(s => (
              <Link key={s.href} href={s.href} className="svc-card" style={{ textDecoration: 'none', display: 'block' }}>
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)' }}>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontSize: 28, fontWeight: 900, color: 'var(--y)', lineHeight: 1 }}>{s.stat.b}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,.3)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 4 }}>{s.stat.s}</div>
                </div>
                <div className="svc-link" style={{ marginTop: 16 }}>EXPLORE SECTOR →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Not sure which sector<br />applies to you?</h2>
          <p>Book a free 30-minute call. We&apos;ll ask the right questions and show you exactly what we&apos;d automate first.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
          </div>
        </div>
      </section>
    </>
  );
}
