/* eslint-disable */
'use client';
import { useState } from 'react';
import Link from 'next/link';

const AUTOMATIONS = [
  { n: 1,  slug: 'ai-lead-response',              title: 'AI Lead Response',             industry: 'Real Estate',          stack: 'GPT-4o · WhatsApp API · n8n · HubSpot',          result: 'Response time: 4h → 90s',                color: '#f9ca00' },
  { n: 2,  slug: 'invoice-document-ai',           title: 'Invoice & Document AI',         industry: 'Finance / Legal',      stack: 'Claude · OCR · Make · Xero',                     result: 'Manual entry eliminated 100%',           color: '#00c8ff' },
  { n: 3,  slug: 'kpi-dashboard-report',          title: 'KPI Dashboard Auto-Report',     industry: 'All sectors',          stack: 'Google Sheets · Slack · PDF gen · n8n',           result: '38 hrs/mo saved',                        color: '#b06eff' },
  { n: 4,  slug: 'client-onboarding-pipeline',   title: 'Client Onboarding Pipeline',    industry: 'Professional Services',stack: 'HubSpot · Slack · Google Cal · DocuSign',         result: 'Onboarding time cut 70%',                color: '#00ff9d' },
  { n: 5,  slug: 'iot-alert-escalation',         title: 'IoT Alert & Escalation',        industry: 'Agriculture / Industrial', stack: 'MQTT · Node.js · Twilio · PagerDuty',         result: 'Alert response: hours → minutes',        color: '#f9ca00' },
  { n: 6,  slug: 'marketplace-price-sync',       title: 'Marketplace Price Sync',        industry: 'E-commerce',           stack: 'WooCommerce · Amazon API · Make',                 result: 'Sync errors dropped to zero',            color: '#00c8ff' },
  { n: 7,  slug: 'tenant-screening',             title: 'Tenant Screening Automation',   industry: 'Real Estate',          stack: 'GPT-4o · DocuSign · Stripe · n8n',               result: 'Screening: 3 days → 4 hrs',              color: '#b06eff' },
  { n: 8,  slug: 'booking-confirmation-flow',    title: 'Booking Confirmation Flow',     industry: 'Travel',               stack: 'Zapier · Twilio · Google Cal · SendGrid',         result: 'No-shows reduced by 34%',                color: '#00ff9d' },
  { n: 9,  slug: 'supplier-quote-aggregator',    title: 'Supplier Quote Aggregator',     industry: 'Manufacturing',        stack: 'Python · Google Sheets · Gmail API',              result: 'Quote turnaround: 5 days → 6 hrs',       color: '#f9ca00' },
  { n: 10, slug: 'hr-onboarding-bot',            title: 'HR Onboarding Bot',             industry: 'HR / People Ops',      stack: 'Slack · Notion · BambooHR · n8n',                result: 'New hire setup: 2 days → 45 min',        color: '#00c8ff' },
  { n: 11, slug: 'social-media-pipeline',        title: 'Social Media Content Pipeline', industry: 'Marketing',            stack: 'GPT-4o · Buffer · Airtable · Make',               result: '20 hrs/wk reclaimed',                    color: '#b06eff' },
  { n: 12, slug: 'contract-renewal-alerts',      title: 'Contract Renewal Alerts',       industry: 'Legal / SaaS',         stack: 'Claude · Google Drive · HubSpot · Gmail',         result: 'Zero missed renewals',                   color: '#00ff9d' },
  { n: 13, slug: 'crop-monitoring-alert',        title: 'Crop Monitoring & Alert',       industry: 'Agriculture',          stack: 'IoT sensors · MQTT · Twilio · Power BI',          result: '3 critical failures prevented (6mo)',    color: '#f9ca00' },
  { n: 14, slug: 'support-ticket-triage',        title: 'Support Ticket Triage AI',      industry: 'SaaS / Tech',          stack: 'GPT-4o · Zendesk · Slack · n8n',                 result: 'First response: 4h → 8 min',             color: '#00c8ff' },
  { n: 15, slug: 'revenue-leakage-detector',     title: 'Revenue Leakage Detector',      industry: 'Finance',              stack: 'Python · Google Sheets · Stripe · Slack',         result: 'AED 180K recovered in Q1',               color: '#b06eff' },
  { n: 16, slug: 'regulatory-compliance-monitor',title: 'Regulatory Compliance Monitor', industry: 'Finance / Legal',      stack: 'Claude · web scraping · email · n8n',             result: '100% compliance, zero manual review',    color: '#00ff9d' },
  { n: 17, slug: 'property-listing-sync',        title: 'Property Listing Sync',         industry: 'Real Estate',          stack: 'WooCommerce · Bayut API · Zapier',                result: 'Listing errors dropped to zero',          color: '#f9ca00' },
  { n: 18, slug: 'guest-review-response',        title: 'Guest Review Response AI',      industry: 'Hospitality',          stack: 'GPT-4o · Airbnb API · Booking.com API',           result: 'Review response: 40% → 98%',             color: '#00c8ff' },
];

const items = [...AUTOMATIONS, ...AUTOMATIONS];

export default function AutomationCarousel() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', cursor: 'default', touchAction: 'pan-y' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @keyframes carousel-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: carousel-scroll 40s linear infinite;
          will-change: transform;
        }
        @media (max-width: 768px) {
          .carousel-track { animation-duration: 60s; }
        }
      `}</style>

      <div
        className="carousel-track"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={`/automations/${item.slug}`}
            style={{
              width: 280,
              flexShrink: 0,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              textDecoration: 'none',
            }}
          >
            {/* Top: colored circle + industry tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: item.color,
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${item.color}88`,
                }}
              />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.industry}
              </span>
            </div>

            {/* Middle: title + stack tags */}
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.35,
                  marginBottom: 8,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.28)',
                  lineHeight: 1.7,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item.stack}
              </div>
            </div>

            {/* Bottom: result stat */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                fontSize: 12,
                fontWeight: 700,
                color: item.color,
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.02em',
              }}
            >
              {item.result}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
