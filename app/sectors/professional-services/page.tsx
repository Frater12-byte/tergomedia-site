/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import ProfServClient from './ProfServClient';

export const metadata: Metadata = {
  title: 'Professional Services Automation | Client Onboarding in 15 Minutes — Tergo Media',
  description:
    'We automate client onboarding, time capture, billing, contract renewals, and reporting for consultancies, agencies, and advisory firms. 11% revenue leakage recovered. 6 hours of reporting eliminated per week. Trusted by firms across Italy, Romania, and UAE.',
  keywords: [
    'professional services automation',
    'client onboarding automation',
    'billing reconciliation software',
    'KPI reporting automation',
    'contract renewal tracking',
    'consultancy automation',
    'law firm automation',
    'agency operations automation',
    'time capture automation',
    'invoice generation automation',
    'revenue leakage recovery',
    'CRM automation professional services',
    'n8n consultancy workflow',
    'management consulting automation',
    'advisory firm software',
    'professional services digital transformation',
  ],
  openGraph: {
    title: 'Professional Services Automation | 11% Revenue Recovered — Tergo Media',
    description:
      'We automate client onboarding, time capture, billing, and reporting for consultancies and advisory firms. 15-minute onboarding. €120k revenue recovered per firm. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/professional-services',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_IT',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Professional Services Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Professional Services Automation | Stop Losing Billable Hours — Tergo Media',
    description:
      'Automate client onboarding, time capture, and reporting for your consultancy or agency. 11% revenue leakage recovered. Zero unbilled hours.',
    images: ['https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/professional-services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  authors: [{ name: 'Tergo Media', url: 'https://tergomedia.com' }],
  category: 'Technology',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tergomedia.com' },
        { '@type': 'ListItem', position: 2, name: 'Sectors', item: 'https://tergomedia.com/sectors' },
        { '@type': 'ListItem', position: 3, name: 'Professional Services', item: 'https://tergomedia.com/sectors/professional-services' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/professional-services#service',
      name: 'Professional Services Automation',
      alternateName: 'Consultancy & Agency Operations Automation',
      description:
        'End-to-end automation for professional service firms: 15-minute client onboarding, AI time capture from calendar and project tools, automated billing, contract renewal sequences, and live partner dashboards — eliminating admin so your team focuses on billable work.',
      serviceType: ['AI Automation', 'CRM Integration', 'Time & Billing Automation', 'Contract Management'],
      provider: {
        '@type': 'Organization',
        '@id': 'https://tergomedia.com/#organization',
        name: 'Tergo Media',
        url: 'https://tergomedia.com',
        logo: { '@type': 'ImageObject', url: 'https://tergomedia.com/logo.png' },
        sameAs: [
          'https://www.linkedin.com/company/tergomedia',
          'https://www.youtube.com/@BuildWithTergo',
        ],
        address: [
          { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
          { '@type': 'PostalAddress', addressLocality: 'Bucharest', addressCountry: 'RO' },
          { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'hello@tergomedia.com',
          contactType: 'sales',
          availableLanguage: ['English', 'Italian', 'Romanian', 'Arabic'],
        },
      },
      areaServed: [
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Country', name: 'Romania' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      url: 'https://tergomedia.com/sectors/professional-services',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Professional Services Automation',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Client Onboarding Automation', description: 'Triggered onboarding flow that creates CRM records, sets up folders, briefs the team, and sends welcome packs in under 15 minutes.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Time & Billing Sync', description: 'AI time capture from calendar, project tools, and email — mapped to client matters and fed directly into invoicing.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Automated Reporting', description: 'Weekly client status reports and monthly utilisation summaries generated from live data — no manual input.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contract Renewal Engine', description: 'Automated contract expiry tracking with personalised renewal sequences triggered 90, 60, and 30 days before expiry.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Dashboard', description: 'Live utilisation, realisation, and revenue dashboard with automated weekly digest for partners.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Luca Ferretti' },
        reviewBody: 'We recovered 11% of annual revenue in the first quarter after implementing the time capture system. Hours that were falling through the cracks — meetings, calls, admin — now all land on invoices automatically. The ROI was immediate.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '16',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much billable revenue do professional service firms typically lose?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On average, professional service firms lose 11% of billable hours before an invoice is issued — hours worked in meetings, calls, and transit that are never logged. For a 10-person firm billing at €150/hour, that is over €100,000 per year. Our time capture system closes this gap entirely.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast can you automate client onboarding for a consultancy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We reduce client onboarding from 1–2 days to under 15 minutes. A triggered flow collects all required documents, creates CRM records, sets up project folders, briefs the account team via Slack, and sends the client a branded welcome pack with kick-off invite — all automatically when a contract is signed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What CRM and project management tools do you integrate with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We integrate with HubSpot, Salesforce, Zoho, and most major CRM platforms. For project management and time capture, we connect to Jira, Asana, Monday.com, and Google Calendar. Billing integrations include Xero, QuickBooks, and custom invoicing systems.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you automate contract renewal reminders for retainer clients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our contract renewal engine tracks all contract and retainer expiry dates in a centralised registry. Personalised renewal sequences are triggered 90, 60, and 30 days before expiry. If a contract lapses without renewal, the system escalates immediately to the responsible director.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the typical ROI of professional services automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Based on our Meridian Advisory Group case study, billable hour capture improved from 89% to 100% — recovering approximately €120,000 in annual revenue for a 12-person firm. Onboarding was reduced from 2 days to 15 minutes, and 6 hours of weekly reporting was eliminated entirely. Gross margin improved by 9 percentage points.',
          },
        },
      ],
    },
  ],
};

export default function ProfessionalServicesPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80"
      />
      <Script
        id="ps-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProfServClient />
    </>
  );
}
