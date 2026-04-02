/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import EcommerceClient from './EcommerceClient';

export const metadata: Metadata = {
  title: 'E-Commerce Automation Dubai | Orders, Inventory & Cart Recovery — Tergo Media',
  description:
    'We automate order fulfilment, multi-channel inventory sync, abandoned cart recovery, and AI customer support for e-commerce brands. Zero oversells. 4x cart recovery. 24/7 support. Trusted by online retailers across UAE and Europe.',
  keywords: [
    'ecommerce automation Dubai',
    'Shopify automation UAE',
    'order fulfilment automation',
    'inventory sync multi-channel',
    'abandoned cart recovery automation',
    'AI customer support ecommerce',
    'Amazon UAE automation',
    'Noon seller automation',
    'ecommerce operations software',
    'WhatsApp cart recovery',
    'multi-channel inventory management',
    'ecommerce digital transformation',
    'n8n Shopify automation',
    'ecommerce reporting dashboard',
    'online store automation UAE',
    'courier API integration',
  ],
  openGraph: {
    title: 'E-Commerce Automation | Zero Oversells, 4x Cart Recovery — Tergo Media',
    description:
      'We automate order processing, inventory sync across Shopify/Amazon/Noon, abandoned cart recovery, and AI support for online retailers. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/ecommerce',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'E-Commerce Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'E-Commerce Automation | Scale Without Scaling Your Team — Tergo Media',
    description:
      'Order fulfilment automated. Inventory synced in real time. Abandoned carts recovered 4x more. AI handles support 24/7.',
    images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/ecommerce',
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
        { '@type': 'ListItem', position: 3, name: 'E-Commerce', item: 'https://tergomedia.com/sectors/ecommerce' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/ecommerce#service',
      name: 'E-Commerce Operations Automation',
      alternateName: 'Online Retail Automation',
      description:
        'End-to-end automation for e-commerce brands: instant order fulfilment, real-time multi-channel inventory sync, three-touch abandoned cart recovery via email and WhatsApp, AI customer support handling 80% of tickets automatically, and live performance dashboards.',
      serviceType: ['Order Automation', 'Inventory Management', 'Cart Recovery', 'AI Customer Support'],
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
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Country', name: 'Romania' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      url: 'https://tergomedia.com/sectors/ecommerce',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'E-Commerce Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Order Fulfilment Automation', description: 'Every order triggers instant warehouse pick list, courier booking, tracking link generation, and customer notification.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Multi-Channel Inventory Sync', description: 'Real-time inventory sync across Shopify, Amazon, Noon, and wholesale — zero oversells, automated reorders.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Abandoned Cart Recovery', description: 'Three-touch recovery sequence via email and WhatsApp, recovering an average of 12% of abandoned cart value.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Customer Support', description: 'AI handles order status, tracking, returns, and FAQs across email and WhatsApp with sub-5-minute response time.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Dashboard', description: 'Live revenue, conversion, inventory, and support metrics with automated daily and weekly management reports.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Nour Al Habboubi' },
        reviewBody: 'We were processing orders manually with a 3-person team. Now the same 3 people handle 3x the volume. The inventory sync alone saved us from dozens of oversell refunds per month. Cart recovery is just revenue we were leaving on the table.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '13',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does e-commerce order fulfilment automation work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When an order is placed on any channel — Shopify, Amazon, Noon — our automation triggers a warehouse pick list, books the optimal courier via API, generates a tracking link, and sends the customer a confirmation automatically. The entire process completes in under 5 minutes with no human involvement. Based on our Desert Rose Fashion case study, order processing time dropped from 90 minutes to under 5 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which channels do you sync inventory across?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We integrate with Shopify, Amazon UAE, Noon, and wholesale portals. Inventory updates across all channels in under 60 seconds of any stock movement — sale, return, or purchase order receipt. Low-stock alerts and automated reorder triggers are configured at thresholds you define.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much revenue can abandoned cart automation recover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our three-touch cart recovery sequence — email at 1 hour, WhatsApp at 24 hours, final email at 72 hours — typically recovers 10–14% of abandoned cart value. For a store with AED 120,000 in monthly abandoned cart value, that is AED 12,000–17,000 in recovered revenue per month with zero manual effort.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can AI handle customer support for an e-commerce brand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build an AI support layer trained on your product catalogue, order data, and return policy that handles order status, tracking queries, return requests, and FAQs via email and WhatsApp with sub-5-minute response time. Complex queries are escalated to a human agent with full context. Typically 80% of tickets are resolved without human involvement.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does e-commerce automation take to deploy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full e-commerce automation stack — order fulfilment, inventory sync, cart recovery, and AI support — typically goes live in 4–6 weeks from kickoff. Inventory sync and order automation are usually live within the first 2 weeks, with cart recovery and AI support following in phase 2.',
          },
        },
      ],
    },
  ],
};

export default function EcommercePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1600&q=80"
      />
      <Script
        id="ec-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EcommerceClient />
    </>
  );
}
