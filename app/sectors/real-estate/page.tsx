/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import RealEstateClient from './RealEstateClient';

export const metadata: Metadata = {
  title: 'Real Estate AI Automation & Lead Qualification Software | Tergo Media',
  description:
    'Automate lead qualification, CRM sync, and follow-up sequences for real estate agencies. Every inbound lead responded to in 90 seconds. Built for agencies in Dubai, Europe, and beyond.',
  keywords: [
    'real estate AI automation',
    'property lead qualification software',
    'real estate CRM automation',
    'WhatsApp real estate bot Dubai',
    'real estate follow-up automation',
    'property portal development',
    'real estate AI software UAE',
  ],
  openGraph: {
    title: 'Real Estate AI Automation & Lead Qualification Software | Tergo Media',
    description:
      'Automate lead qualification, CRM sync, and follow-up sequences for real estate agencies. Every inbound lead responded to in 90 seconds.',
    images: [
      {
        url: 'https://tergomedia.com/og/real-estate.jpg',
        width: 1200,
        height: 630,
        alt: 'Real Estate AI Automation',
      },
    ],
    url: 'https://tergomedia.com/sectors/real-estate',
    type: 'website',
    siteName: 'Tergo Media',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate AI Automation | Tergo Media',
    description: 'Automate lead qualification, CRM sync, and follow-up sequences.',
    images: ['https://tergomedia.com/og/real-estate.jpg'],
  },
  alternates: { canonical: 'https://tergomedia.com/sectors/real-estate' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const },
  },
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Real Estate Automation',
            provider: {
              '@type': 'Organization',
              name: 'Tergo Media',
              url: 'https://tergomedia.com',
              logo: 'https://tergomedia.com/logo.png',
              sameAs: [
                'https://www.linkedin.com/company/tergomedia',
                'https://www.youtube.com/@BuildWithTergo',
              ],
              address: [
                { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
                { '@type': 'PostalAddress', addressLocality: 'Bucharest', addressCountry: 'RO' },
                { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT' },
              ],
            },
            description:
              'Automate lead qualification, CRM sync, and follow-up sequences for real estate agencies. Every inbound lead responded to in 90 seconds.',
            serviceType: 'AI Automation',
            areaServed: ['AE', 'RO', 'IT', 'EU', 'GB'],
            url: 'https://tergomedia.com/sectors/real-estate',
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Real Estate Automation Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'AI Lead Qualification' },
                },
                {
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: 'Automated Follow-Up Sequences' },
                },
              ],
            },
          }),
        }}
      />
      <RealEstateClient />
    </>
  );
}
