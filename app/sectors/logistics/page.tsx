/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import LogisticsClient from './LogisticsClient';

export const metadata: Metadata = {
  title: 'Logistics Automation Dubai | Shipment Tracking, POD & Dispatch — Tergo Media',
  description:
    'We automate shipment tracking, customer notifications, digital proof of delivery, and dispatch coordination for freight and last-mile logistics operators. 98% on-time delivery. Zero manual status calls. Real-time visibility. Trusted by logistics companies across UAE and Europe.',
  keywords: [
    'logistics automation Dubai',
    'shipment tracking automation',
    'proof of delivery digital',
    'dispatch automation software',
    'last-mile delivery automation UAE',
    'freight management software',
    'customer notification logistics',
    'WhatsApp delivery notifications',
    'fleet management automation',
    'route optimisation software Dubai',
    'logistics operations software',
    'carrier API integration',
    'n8n logistics automation',
    'logistics digital transformation',
    'supply chain automation UAE',
    'delivery management system',
  ],
  openGraph: {
    title: 'Logistics Automation | Real-Time Tracking, Zero Status Calls — Tergo Media',
    description:
      'We automate shipment tracking, customer notifications, digital POD, and dispatch for logistics operators. 98% on-time delivery. Zero manual status calls. Book a free call.',
    url: 'https://tergomedia.com/sectors/logistics',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Logistics Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Logistics Automation | 98% On-Time, Zero Status Calls — Tergo Media',
    description:
      'Real-time shipment tracking. Automated customer notifications. Digital POD in 60 seconds. Dispatch optimisation. Built for freight and last-mile operators.',
    images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/logistics',
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
        { '@type': 'ListItem', position: 3, name: 'Logistics', item: 'https://tergomedia.com/sectors/logistics' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/logistics#service',
      name: 'Logistics Operations Automation',
      alternateName: 'Freight & Last-Mile Delivery Automation',
      description:
        'End-to-end automation for logistics operators: real-time shipment tracking with exception detection, automated customer milestone notifications via WhatsApp and SMS, digital proof of delivery, intelligent dispatch and route optimisation, and live operations dashboards.',
      serviceType: ['Shipment Tracking', 'Customer Notifications', 'Digital POD', 'Dispatch Automation'],
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
      url: 'https://tergomedia.com/sectors/logistics',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Logistics Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shipment Tracking Automation', description: 'Real-time tracking across all carriers with exception detection and proactive alerts within 15 minutes of any event.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customer Notification Engine', description: 'Automated milestone notifications via WhatsApp and SMS at dispatch, in transit, out for delivery, and on delivery.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital POD System', description: 'Driver mobile app captures photo, e-signature, and GPS timestamp on delivery — synced to back-office in under 60 seconds.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Dispatch & Route Automation', description: 'Intelligent job allocation and route optimisation reducing empty miles and improving vehicle utilisation to 84%+.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Operations Dashboard', description: 'Live fleet position, on-time delivery, POD compliance, and cost per consignment with automated daily reports.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Tariq Al Mahmoud' },
        reviewBody: 'We were taking 60+ status calls a day. Customers constantly chasing where their shipments were. Since deploying the tracking automation and WhatsApp notifications, we get under 5 calls. Our on-time delivery has gone from 81% to 98%.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '10',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does shipment tracking automation work for logistics companies?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We connect to all your carrier APIs and aggregate live tracking data into a single dashboard. Exception detection monitors every shipment continuously — the moment a delay, failed delivery, or address issue is flagged, an automated alert is sent to the dispatcher within 15 minutes. Customers receive proactive notifications at every milestone so they never need to call.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you automate customer delivery notifications via WhatsApp?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build automated notification sequences triggered by shipment milestones: dispatch confirmation, in-transit update, out-for-delivery alert with estimated time window, and delivery confirmation with photo proof. All sent via WhatsApp and SMS automatically. Based on our Gulf Freight Solutions case study, inbound customer status calls dropped from 60+ per day to under 5.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is digital proof of delivery and how fast does it work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We deploy a driver mobile app that captures a delivery photo, customer e-signature, and GPS timestamp at the point of delivery. The POD record syncs to your back-office system in under 60 seconds, is shared with the customer automatically, and triggers billing or invoice workflows immediately. Paper POD processing time drops from 1–3 days to under 60 seconds.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much can dispatch automation improve vehicle utilisation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our dispatch optimisation engine allocates jobs to the nearest available vehicle and generates routes optimised for time windows, load capacity, and fuel efficiency. Based on our Gulf Freight Solutions deployment, vehicle utilisation improved from 64% to 86% and dispatch time was cut from 2.5 hours to 25 minutes per day.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does logistics automation take to deploy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full logistics automation stack — carrier tracking, customer notifications, digital POD, and dispatch automation — typically goes live in 4–6 weeks from kickoff. Customer notifications and tracking aggregation are usually live within the first 2 weeks, with digital POD and dispatch optimisation following in phase 2.',
          },
        },
      ],
    },
  ],
};

export default function LogisticsPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
      />
      <Script
        id="log-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LogisticsClient />
    </>
  );
}
