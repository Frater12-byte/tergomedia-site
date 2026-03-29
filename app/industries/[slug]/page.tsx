/* eslint-disable */
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const INDUSTRIES: Record<string, {
  name: string;
  slug: string;
  headline: string;
  subheading: string;
  painPoints: { icon: string; title: string; desc: string }[];
  whatWeBuild: { title: string; desc: string }[];
  portfolioSlugs: string[];
  roiSector: string;
}> = {
  'real-estate': {
    name: 'Real Estate',
    slug: 'real-estate',
    headline: 'We\'ve automated real estate inside out.',
    subheading: 'From lead capture to CRM, portal sync to tenant screening — we\'ve built the full automation stack for property teams in Dubai, London, and beyond.',
    painPoints: [
      { icon: '⚡', title: 'Slow lead response', desc: 'Competitors respond in minutes. Manual processes mean 4+ hour delays and lost deals.' },
      { icon: '📋', title: 'Manual CRM updates', desc: 'Agents spend hours copying data between portals, spreadsheets, and CRM systems.' },
      { icon: '🏢', title: 'Portal fragmentation', desc: 'Bayut, PropertyFinder, Dubizzle, website — all need separate manual updates.' },
      { icon: '📄', title: 'Admin-heavy onboarding', desc: 'Tenant screening, contracts, and onboarding take days of manual back-and-forth.' },
    ],
    whatWeBuild: [
      { title: 'AI Lead Response', desc: 'Instant WhatsApp + email response to every enquiry, scored and routed in 90 seconds.' },
      { title: 'Portal Listing Sync', desc: 'One update, all portals. Bayut, PropertyFinder, Dubizzle, and your website stay in sync automatically.' },
      { title: 'Tenant Screening Pipeline', desc: 'Document collection, verification, and scoring — fully automated from application to decision.' },
      { title: 'CRM Automation', desc: 'Every lead action, call, and viewing automatically logged in HubSpot or your CRM of choice.' },
    ],
    portfolioSlugs: ['bayut-premium-ai', 'proptrack-uae'],
    roiSector: 'Real Estate',
  },
  'travel-hospitality': {
    name: 'Travel & Hospitality',
    slug: 'travel-hospitality',
    headline: 'We\'ve automated travel & hospitality inside out.',
    subheading: 'Booking engines, guest communications, review management, and revenue optimisation — all running without your team lifting a finger.',
    painPoints: [
      { icon: '🏨', title: 'Manual booking comms', desc: 'Confirmation emails, pre-arrival messages, and upsell sequences sent manually by staff.' },
      { icon: '⭐', title: 'Unmanaged reviews', desc: 'Review responses take days or never happen, silently damaging your rating and rankings.' },
      { icon: '📊', title: 'No revenue visibility', desc: 'Weekly revenue reports require 6+ hours of manual data pulling from multiple systems.' },
      { icon: '🔄', title: 'Channel fragmentation', desc: 'Booking.com, Expedia, Airbnb, and direct bookings live in separate silos.' },
    ],
    whatWeBuild: [
      { title: 'Booking Confirmation Flow', desc: 'Instant multi-channel confirmation with upsell sequences and pre-arrival comms.' },
      { title: 'Guest Review Response AI', desc: 'AI-generated responses to every review on every platform, within 2 hours.' },
      { title: 'Revenue Dashboard', desc: 'Live KPI dashboard with automated weekly reports — no manual assembly.' },
      { title: 'Channel Manager Integration', desc: 'All OTAs synced in real-time with your PMS for pricing and availability.' },
    ],
    portfolioSlugs: ['ranjet-aviation', 'luxstay-dubai'],
    roiSector: 'Travel & Hospitality',
  },
  'agriculture': {
    name: 'Agriculture',
    slug: 'agriculture',
    headline: 'We\'ve automated agriculture inside out.',
    subheading: 'IoT sensor monitoring, automated alerts, supply chain management, and crop analytics — we build the infrastructure that keeps farms running at peak efficiency.',
    painPoints: [
      { icon: '🌱', title: 'Reactive crop management', desc: 'Problems detected by manual inspection when it\'s often too late to prevent losses.' },
      { icon: '📡', title: 'Disconnected sensors', desc: 'IoT data flowing into separate systems with no unified view or alert logic.' },
      { icon: '🚚', title: 'Supply chain gaps', desc: 'Supplier quotes, purchase orders, and delivery tracking all managed manually.' },
      { icon: '📈', title: 'No yield analytics', desc: 'No automated analysis of what\'s working — decisions made on gut, not data.' },
    ],
    whatWeBuild: [
      { title: 'IoT Alert & Escalation', desc: 'Real-time sensor monitoring with intelligent alert routing — zero missed critical events.' },
      { title: 'Crop Monitoring Dashboard', desc: 'AI anomaly detection on soil, temperature, and moisture data with daily reports.' },
      { title: 'Supplier Quote Automation', desc: 'Automated RFQ distribution and comparison matrix generation for procurement.' },
      { title: 'Yield Analytics Pipeline', desc: 'Automated data collection and weekly analytics reports for every field and crop.' },
    ],
    portfolioSlugs: ['agri-novatex-iot', 'greenfield-farms'],
    roiSector: 'Agriculture',
  },
  'professional-services': {
    name: 'Professional Services',
    slug: 'professional-services',
    headline: 'We\'ve automated professional services inside out.',
    subheading: 'Client onboarding, billing, reporting, and compliance — all automated so your team focuses on billable work, not admin.',
    painPoints: [
      { icon: '🤝', title: 'Slow client onboarding', desc: 'New client setup takes 2 days of manual account creation, document sending, and scheduling.' },
      { icon: '💰', title: 'Revenue leakage', desc: 'Unbilled work, missed renewals, and billing errors costing 5–15% of revenue.' },
      { icon: '📊', title: 'Manual reporting', desc: 'KPI reports assembled manually from multiple systems every week — 6+ hours each time.' },
      { icon: '📜', title: 'Contract management', desc: 'Renewal deadlines missed because contracts live in spreadsheets nobody maintains.' },
    ],
    whatWeBuild: [
      { title: 'Client Onboarding Pipeline', desc: 'From contract signature to first meeting in 15 minutes — fully automated.' },
      { title: 'Revenue Leakage Detector', desc: 'Weekly reconciliation to find missed charges, unbilled work, and billing errors.' },
      { title: 'KPI Dashboard & Reporting', desc: 'Automated weekly reports delivered to your inbox every Monday at 7am.' },
      { title: 'Contract Renewal Alerts', desc: 'Tiered alerts at 90, 60, 30, and 14 days before every renewal deadline.' },
    ],
    portfolioSlugs: ['hayguard-crm', 'nexus-law'],
    roiSector: 'Professional Services',
  },
  'ecommerce': {
    name: 'E-commerce',
    slug: 'ecommerce',
    headline: 'We\'ve automated e-commerce inside out.',
    subheading: 'Price sync, inventory management, order automation, and marketplace integration — we build the systems that keep your store running 24/7 without manual intervention.',
    painPoints: [
      { icon: '🏷️', title: 'Manual price updates', desc: 'Hours spent daily updating prices across Amazon, Noon, Shopify — with constant errors.' },
      { icon: '📦', title: 'Inventory mismatch', desc: 'Overselling and stockouts due to delayed or inaccurate inventory sync across channels.' },
      { icon: '📧', title: 'Generic customer comms', desc: 'Order confirmations and follow-ups sent manually or through clunky templates.' },
      { icon: '📉', title: 'No revenue visibility', desc: 'Consolidated P&L across channels requires hours of manual reconciliation.' },
    ],
    whatWeBuild: [
      { title: 'Marketplace Price Sync', desc: 'Real-time price and stock sync across all your marketplaces — one source of truth.' },
      { title: 'Order Automation', desc: 'Confirmation, fulfilment, and follow-up sequences all triggered and sent automatically.' },
      { title: 'Revenue Dashboard', desc: 'Consolidated revenue reporting across all channels, updated in real-time.' },
      { title: 'Supplier Management', desc: 'Automated reorder triggers, supplier quote requests, and purchase order generation.' },
    ],
    portfolioSlugs: ['retailsync', 'portalmax'],
    roiSector: 'E-commerce',
  },
  'finance-legal': {
    name: 'Finance & Legal',
    slug: 'finance-legal',
    headline: 'We\'ve automated finance & legal inside out.',
    subheading: 'Document AI, compliance monitoring, contract management, and reporting — we build automation that keeps finance and legal teams ahead of the workload.',
    painPoints: [
      { icon: '🧾', title: 'Manual invoice processing', desc: 'Finance teams keying invoice data manually — 15–20 minutes per invoice with frequent errors.' },
      { icon: '⚖️', title: 'Compliance gaps', desc: 'Licence renewals and filing deadlines tracked in spreadsheets that nobody maintains.' },
      { icon: '📄', title: 'Contract chaos', desc: 'Renewal windows missed because contracts are buried in email threads and shared drives.' },
      { icon: '💸', title: 'Revenue leakage', desc: 'Unbilled work and missed charges costing 5–15% of revenue year-on-year.' },
    ],
    whatWeBuild: [
      { title: 'Invoice & Document AI', desc: 'Extract, validate, and route invoice data automatically with 98%+ accuracy.' },
      { title: 'Compliance Monitor', desc: 'Automated tracking of all licences, filings, and regulatory deadlines with tiered alerts.' },
      { title: 'Contract Renewal Automation', desc: 'Zero missed renewals with 90-day advance alerts and one-click renewal actions.' },
      { title: 'Financial Reporting', desc: 'Automated P&L, cash flow, and KPI reports generated and distributed weekly.' },
    ],
    portfolioSlugs: ['claimsfast', 'finvault'],
    roiSector: 'Professional Services',
  },
  'healthcare': {
    name: 'Healthcare',
    slug: 'healthcare',
    headline: 'We\'ve automated healthcare inside out.',
    subheading: 'Patient onboarding, document routing, appointment management, and compliance — we build automation that frees clinical teams to focus on care, not admin.',
    painPoints: [
      { icon: '🏥', title: 'Paper-heavy onboarding', desc: 'New patient forms, consent documents, and insurance verification done manually for every patient.' },
      { icon: '📅', title: 'Appointment no-shows', desc: 'Reminder calls and confirmations sent manually — or not at all — leading to costly gaps in schedule.' },
      { icon: '📋', title: 'Compliance burden', desc: 'HIPAA/GDPR documentation and audit trails maintained through manual processes.' },
      { icon: '💊', title: 'Referral tracking gaps', desc: 'Referrals tracked in emails and spreadsheets with no visibility into follow-up status.' },
    ],
    whatWeBuild: [
      { title: 'Patient Onboarding Automation', desc: 'Digital intake forms, document collection, and insurance verification — all automated.' },
      { title: 'Appointment Reminder System', desc: 'Multi-channel reminders at 7 days, 1 day, and 2 hours — reducing no-shows by 40%.' },
      { title: 'Medical Records Routing', desc: 'Automated document classification, routing, and secure storage with full audit trail.' },
      { title: 'Compliance Dashboard', desc: 'Real-time compliance status monitoring with automated alerts for gaps and deadlines.' },
    ],
    portfolioSlugs: ['medrecord-ai', 'primeclinics'],
    roiSector: 'Healthcare',
  },
  'logistics': {
    name: 'Logistics & Supply Chain',
    slug: 'logistics',
    headline: 'We\'ve automated logistics & supply chain inside out.',
    subheading: 'Fleet tracking, customs documentation, supplier management, and automated alerts — we build the infrastructure that keeps shipments moving and teams informed.',
    painPoints: [
      { icon: '🚛', title: 'Manual shipment tracking', desc: 'Operations teams checking carrier websites manually to provide status updates to customers.' },
      { icon: '📦', title: 'Customs doc delays', desc: 'Customs documentation prepared manually, causing delays and compliance risks.' },
      { icon: '🔔', title: 'No proactive alerts', desc: 'Issues discovered reactively — by the time teams know, customers already know.' },
      { icon: '📊', title: 'Fragmented reporting', desc: 'KPI reports for fleet, inventory, and delivery performance assembled manually each week.' },
    ],
    whatWeBuild: [
      { title: 'Shipment Tracking & Alerts', desc: 'Real-time tracking across all carriers with automated customer notifications at every milestone.' },
      { title: 'Customs Documentation AI', desc: 'Automated customs document generation and compliance checking for every shipment.' },
      { title: 'Fleet Management Dashboard', desc: 'Live fleet visibility with automated alerts for maintenance, delays, and incidents.' },
      { title: 'Supplier & Inventory Automation', desc: 'Automated reorder triggers, supplier comms, and inventory reconciliation.' },
    ],
    portfolioSlugs: ['supplylink', 'logichain'],
    roiSector: 'Logistics',
  },
};

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = INDUSTRIES[slug];
  if (!ind) return {};
  return {
    title: `${ind.name} Automation & Software — Tergo Media`,
    description: `${ind.subheading}`,
    alternates: { canonical: `https://tergomedia.com/industries/${slug}` },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = INDUSTRIES[slug];
  if (!ind) notFound();

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Industry expertise</div>
          <h1>{ind.headline.split('inside out').map((part, i, arr) => (
            i < arr.length - 1 ? <>{part}<em>inside out</em></> : part
          ))}</h1>
          <p>{ind.subheading}</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a free audit →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See our work</Link>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">The problems we solve</span>
          <h2 className="sec-title">What slows {ind.name}<br />businesses down</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', marginTop: 40 }}>
            {ind.painPoints.map(p => (
              <div key={p.title} style={{ background: 'var(--surface)', padding: '32px 28px' }}>
                <div style={{ fontSize: 28, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Exo 2', sans-serif" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Our solutions</span>
          <h2 className="sec-title">What we build for<br />{ind.name}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 2, background: 'rgba(255,255,255,.06)', marginTop: 40 }}>
            {ind.whatWeBuild.map((item, i) => (
              <div key={i} style={{ background: 'var(--dark)', padding: '32px 28px' }}>
                <div style={{ fontSize: 11, color: 'var(--y)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 8, fontFamily: "'Exo 2', sans-serif" }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to automate your<br />{ind.name} business?</h2>
          <p>Book a free 30-minute audit. We&apos;ll identify your biggest automation opportunity and scope it — at no cost.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free audit →</a>
            <Link href="/automations" className="btn btn-ol btn-lg">Browse automation library</Link>
          </div>
        </div>
      </section>
    </>
  );
}
