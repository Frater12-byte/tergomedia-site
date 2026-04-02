/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import TravelHospClient from './TravelHospClient';

export const metadata: Metadata = {
  title: 'Travel & Hospitality Automation Dubai | Guest Comms, Reviews & Revenue — Tergo Media',
  description:
    'We automate guest communications, review responses, channel sync, and revenue dashboards for hotels and charter operators. 99.9% uptime. 12,000+ tasks automated per month. Zero double bookings. Trusted by operators across UAE and Europe.',
  keywords: [
    'hospitality automation Dubai',
    'hotel guest communication AI',
    'review response automation',
    'channel manager sync',
    'booking system automation',
    'hotel revenue dashboard',
    'travel automation software',
    'WhatsApp hotel automation',
    'TripAdvisor review automation',
    'Booking.com automation',
    'Airbnb channel sync',
    'private aviation booking system',
    'hotel operations automation UAE',
    'guest experience automation',
    'n8n hospitality automation',
    'hospitality digital transformation',
  ],
  openGraph: {
    title: 'Travel & Hospitality Automation | Guest Journey on Autopilot — Tergo Media',
    description:
      'We automate guest communications, review responses, channel sync, and revenue reporting for hotels and charter operators. 99.9% uptime. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/travel-hospitality',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Travel & Hospitality Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Travel & Hospitality Automation | Zero Double Bookings — Tergo Media',
    description:
      'We automate the full guest journey — booking confirmation to post-stay review. 99.9% uptime. 12k+ tasks automated per month.',
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/travel-hospitality',
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
        { '@type': 'ListItem', position: 3, name: 'Travel & Hospitality', item: 'https://tergomedia.com/sectors/travel-hospitality' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/travel-hospitality#service',
      name: 'Travel & Hospitality Automation',
      alternateName: 'Hotel & Charter Operations Automation',
      description:
        'End-to-end automation for hotels and charter operators: AI guest communications, review response automation, real-time channel sync, zero double bookings, and live revenue dashboards — all running 24/7 without staff overhead.',
      serviceType: ['AI Automation', 'Guest Communications', 'Channel Management', 'Revenue Reporting'],
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
      url: 'https://tergomedia.com/sectors/travel-hospitality',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Hospitality Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Booking Confirmation Flow', description: 'Instant multi-channel confirmation with upsell sequences and pre-arrival packs — personalised, branded, automated.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Guest Communication AI', description: 'AI-generated brand-consistent responses to every guest message, personalised to their booking and stay.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Review Response Automation', description: 'Every review on TripAdvisor, Google, Booking.com, and Airbnb gets a personalised response within 2 hours.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Channel Manager Sync', description: 'Real-time availability and pricing sync across all OTAs. Zero double bookings, zero manual updates.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Revenue Dashboard', description: 'Live RevPAR, ADR, and occupancy dashboard with automated weekly reports — zero manual assembly.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Omar Al Mansoori' },
        reviewBody: 'Before Tergo, our review response rate was under 40%. We were losing ranking on TripAdvisor. Now every review is answered within 2 hours and our score has climbed 0.4 points in 3 months.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '18',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does Tergo Media automate hotel guest communications?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We build AI-powered communication flows connected to your booking system. Every booking triggers instant confirmation emails, SMS, and WhatsApp messages. Pre-arrival packs, upsell sequences, and post-stay follow-ups all run automatically — personalised to each guest using their booking data.',
          },
        },
        {
          '@type': 'Question',
          name: 'How fast can you automate review responses for hotels?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our review automation system responds to every review on TripAdvisor, Google, Booking.com, and Airbnb within 2 hours of posting. Negative reviews are flagged to a manager before publishing. Monthly sentiment reports are delivered automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you eliminate double bookings across OTAs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build real-time channel sync that updates availability across Booking.com, Expedia, Airbnb, and your direct booking engine in under 60 seconds. Since deployment our clients have had zero double booking incidents.',
          },
        },
        {
          '@type': 'Question',
          name: 'What hospitality reporting can you automate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We automate live RevPAR, ADR, and occupancy dashboards with channel-by-channel revenue attribution. Weekly PDF reports are delivered to management automatically every Monday morning — no manual assembly required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to deploy hospitality automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full hospitality automation stack — guest comms, review automation, channel sync, and reporting — typically goes live in 4–6 weeks from kickoff. We handle the full build and integration with your PMS, OTAs, and communication channels.',
          },
        },
      ],
    },
  ],
};

export default function TravelHospPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80"
      />
      <Script
        id="th-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TravelHospClient />
    </>
  );
}
