/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import AgricultureClient from './AgricultureClient';

export const metadata: Metadata = {
  title: 'Agriculture IoT Automation & Precision Farming Software | 3-Minute Alert Response — Tergo Media',
  description:
    'We deploy IoT sensor networks, real-time monitoring dashboards, and automated alert escalation for precision farms. 400ha monitored per client. 3-minute alert response. Zero missed critical events. Trusted by farming operations across Romania and Europe.',
  keywords: [
    'agriculture IoT automation',
    'precision farming software',
    'farm monitoring dashboard',
    'IoT sensor integration agriculture',
    'smart farming technology Romania',
    'agricultural alert system',
    'precision irrigation automation',
    'farm management software',
    'real-time crop monitoring',
    'harvest timing AI',
    'LoRaWAN agriculture Romania',
    'automated farm reporting',
    'soil moisture monitoring system',
    'precision agriculture Europe',
    'n8n farm automation',
    'agricultural digital transformation',
  ],
  openGraph: {
    title: 'Agriculture IoT Automation | 3-Minute Alert Response — Tergo Media',
    description:
      'We deploy IoT sensor networks and automated alert systems for precision farms. 400ha monitored. Zero missed critical events. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/agriculture',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_RO',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Agriculture IoT Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Agriculture IoT Automation | Zero Missed Events — Tergo Media',
    description:
      'IoT sensor networks, real-time dashboards, and 3-minute alert escalation for precision farming operations.',
    images: ['https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/agriculture',
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
        { '@type': 'ListItem', position: 3, name: 'Agriculture', item: 'https://tergomedia.com/sectors/agriculture' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/agriculture#service',
      name: 'Agriculture IoT Automation',
      alternateName: 'Precision Farming Monitoring System',
      description:
        'End-to-end IoT automation for precision farms: sensor network deployment, real-time monitoring dashboards, 3-minute alert escalation, AI harvest planning, and automated supplier procurement — all running 24/7 without manual field visits.',
      serviceType: ['IoT Automation', 'Precision Farming', 'Alert Systems', 'Agricultural Analytics'],
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
        { '@type': 'Country', name: 'Romania' },
        { '@type': 'Country', name: 'Italy' },
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'AdministrativeArea', name: 'European Union' },
      ],
      url: 'https://tergomedia.com/sectors/agriculture',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Agriculture Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'IoT Sensor Network', description: 'Soil moisture, temperature, humidity, and equipment telemetry sensors deployed field by field with live dashboard.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Alert & Escalation Engine', description: 'SMS and WhatsApp alerts within 3 minutes of any threshold breach, with auto-escalation logic.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Harvest Planning System', description: 'AI-driven harvest window recommendations combining sensor data, weather forecasts, and historical yield patterns.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Supplier Automation', description: 'Automatic stock monitoring with purchase order triggers, delivery tracking, and invoice processing.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Farm Performance Dashboard', description: 'Real-time and historical per-field performance with automated weekly management reports.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Mihai Ionescu' },
        reviewBody: 'We used to drive 200km a day just to check field conditions. Now I see everything on my phone in real time. When a pump failed last July, I had a WhatsApp alert in 3 minutes and the repair team dispatched before any crop damage occurred.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '11',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does IoT sensor monitoring work for precision farming?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We deploy soil moisture, temperature, and humidity sensors field by field across your land, connected via LoRaWAN or MQTT. All data feeds into a real-time dashboard accessible from any device. When any reading crosses a critical threshold, automated SMS and WhatsApp alerts are sent within 3 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'How large a farm can Tergo Media monitor with IoT sensors?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We have deployed sensor networks on farms from 50 to 400+ hectares. Our largest active deployment monitors 400 hectares across multiple field zones with continuous real-time coverage. We design the network topology based on your land layout and crop types.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens when a critical event is detected on the farm?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When any sensor crosses a critical threshold — soil moisture too low, frost incoming, irrigation pump failure — the alert engine sends a WhatsApp and SMS notification within 3 minutes. If the primary contact does not acknowledge within 10 minutes, the system automatically escalates to a secondary contact. All incidents are logged with timestamps and resolution tracking.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you automate harvest timing decisions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our harvest planning system combines live sensor readings, 7-day weather forecasts, and historical yield quality data to generate optimal harvest window recommendations updated daily. Based on the Agri Novatex case study, harvest timing accuracy improved by 22% after deployment.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to deploy a farm IoT monitoring system?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full IoT deployment — sensor installation, dashboard setup, alert configuration, and team training — typically takes 3–6 weeks depending on farm size and infrastructure. We handle the full project from sensor placement design to go-live.',
          },
        },
      ],
    },
  ],
};

export default function AgriculturePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&q=80"
      />
      <Script
        id="agri-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgricultureClient />
    </>
  );
}
