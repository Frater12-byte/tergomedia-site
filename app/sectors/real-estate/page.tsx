/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import RealEstateClient from './RealEstateClient';

export const metadata: Metadata = {
  title: 'Real Estate AI Automation Dubai | Lead Qualification in 90 Seconds — Tergo Media',
  description:
    'We automate lead qualification, CRM sync, viewing scheduling, and follow-up sequences for Dubai real estate brokerages. Every portal lead responded to in 90 seconds — automatically. Trusted by agencies across UAE and Europe.',
  keywords: [
    'real estate AI automation Dubai',
    'lead qualification software UAE',
    'real estate CRM automation',
    'WhatsApp real estate bot Dubai',
    'Property Finder lead automation',
    'Bayut lead integration',
    'Dubizzle automation',
    'real estate follow-up automation',
    'AI lead response real estate',
    'Dubai brokerage automation',
    'real estate software agency Dubai',
    'automated viewing scheduling Dubai',
    'n8n real estate automation',
    'real estate AI agent Dubai',
    'CRM sync Property Finder',
    'real estate digital transformation UAE',
  ],
  openGraph: {
    title: 'Real Estate AI Automation Dubai | Lead Response in 90 Seconds — Tergo Media',
    description:
      'We automate lead qualification, CRM sync, and follow-up sequences for Dubai brokerages. Every portal lead gets an AI-powered response in 90 seconds. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/real-estate',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: '/Images/IMG-remax.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Estate AI Automation Dubai — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Real Estate AI Automation Dubai | 90-Second Lead Response — Tergo Media',
    description:
      'We automate lead qualification, CRM sync, and follow-up sequences for Dubai brokerages. Every inbound lead gets an AI-powered reply in 90 seconds.',
    images: ['/Images/IMG-remax.jpg'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/real-estate',
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
        { '@type': 'ListItem', position: 3, name: 'Real Estate', item: 'https://tergomedia.com/sectors/real-estate' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/real-estate#service',
      name: 'Real Estate AI Automation',
      alternateName: 'Dubai Real Estate Lead Automation',
      description:
        'End-to-end AI automation for real estate brokerages: AI lead qualification with 90-second first response, CRM sync from all portals, automated viewing scheduling, multi-touch follow-up sequences, and live performance dashboards.',
      serviceType: ['AI Automation', 'CRM Integration', 'Lead Qualification', 'WhatsApp Automation'],
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
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Romania' },
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      url: 'https://tergomedia.com/sectors/real-estate',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Real Estate Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Lead Qualification', description: '90-second first response to every inbound lead from Property Finder, Bayut, and Dubizzle via WhatsApp and email.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Sync Engine', description: 'Automatic contact creation and population in your CRM from all portals — zero manual data entry.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Viewing Coordination Automation', description: 'Automated viewing scheduling, landlord confirmation, and reminder sequences.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Follow-up Sequences', description: 'Multi-touch WhatsApp and email sequences triggered by lead status and viewing outcomes.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Dashboard', description: 'Live pipeline reporting delivered automatically to management every Monday morning.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Ahmed Al-Rashidi' },
        reviewBody: 'Before Tergo, our agents were spending 3 hours a day on CRM admin alone. Now it all happens automatically. Lead response is instant, pipeline is always accurate.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '24',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How fast can Tergo Media respond to real estate leads automatically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our AI lead qualification system responds to every inbound lead from Property Finder, Bayut, Dubizzle, and your website in under 90 seconds — 24 hours a day, 7 days a week, with no human input required.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which CRM systems do you integrate with for real estate automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We integrate with HubSpot, Salesforce, Zoho CRM, and most major CRM platforms. We also build custom CRM solutions. Every portal lead is automatically created as a contact with full data populated.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to set up real estate automation in Dubai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full lead automation stack — first response, CRM sync, viewing coordination, and follow-up sequences — typically takes 3–5 weeks from kickoff to go-live. We use n8n and custom AI pipelines built specifically for your brokerage.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you integrate with Property Finder, Bayut, and Dubizzle?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We integrate with all major UAE property portals including Property Finder, Bayut, Dubizzle, and Houza. All portal leads flow into a single automation pipeline and are responded to within 90 seconds.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the ROI of real estate automation for a Dubai brokerage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Based on our RE/MAX Gulf case study, lead response time dropped from 5–7 hours to 90 seconds, viewing bookings increased 43%, and commission revenue grew 31% in the first quarter post-launch. Our free ROI calculator gives you a personalised estimate based on your team size and lead volume.',
          },
        },
      ],
    },
  ],
};

export default function RealEstatePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80"
      />
      <Script
        id="re-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RealEstateClient />
    </>
  );
}
