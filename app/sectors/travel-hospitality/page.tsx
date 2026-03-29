/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import TravelHospClient from './TravelHospClient';

export const metadata: Metadata = {
  title: 'Travel & Hospitality Automation — Booking, Guest Comms & Revenue | Tergo Media',
  description: 'Automate guest communications, review responses, channel sync, and revenue reporting for hotels and charter operators. 99.9% uptime. 12,000+ tasks automated per month.',
  keywords: ['hospitality automation','hotel guest communication AI','review response automation','channel manager sync','booking system automation','hotel revenue dashboard','travel automation software'],
  openGraph: {
    title: 'Travel & Hospitality Automation | Tergo Media',
    description: 'Automate guest communications, review responses, and channel sync. 99.9% uptime across clients.',
    images: [{ url: 'https://tergomedia.com/og/travel-hospitality.jpg', width: 1200, height: 630, alt: 'Travel & Hospitality Automation' }],
    url: 'https://tergomedia.com/sectors/travel-hospitality',
    type: 'website',
    siteName: 'Tergo Media',
  },
  twitter: { card: 'summary_large_image', title: 'Travel & Hospitality Automation | Tergo Media', description: 'Automate the full guest journey — booking to review.', images: ['https://tergomedia.com/og/travel-hospitality.jpg'] },
  alternates: { canonical: 'https://tergomedia.com/sectors/travel-hospitality' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const } },
};

export default function TravelHospPage() {
  return (
    <>
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80" />
      <Script id="th-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Travel & Hospitality Automation",
        "provider": { "@type": "Organization", "name": "Tergo Media", "url": "https://tergomedia.com", "logo": "https://tergomedia.com/logo.png", "sameAs": ["https://www.linkedin.com/company/tergomedia","https://www.youtube.com/@BuildWithTergo"], "address": [{"@type":"PostalAddress","addressLocality":"Dubai","addressCountry":"AE"},{"@type":"PostalAddress","addressLocality":"Bucharest","addressCountry":"RO"},{"@type":"PostalAddress","addressLocality":"Milan","addressCountry":"IT"}] },
        "description": "Automate guest communications, review responses, channel sync, and revenue reporting for hotels and charter operators.",
        "serviceType": "Business Process Automation",
        "areaServed": ["AE","RO","IT","EU","GB"],
        "url": "https://tergomedia.com/sectors/travel-hospitality",
        "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Hospitality Automation Services", "itemListElement": [{"@type":"Offer","itemOffered":{"@type":"Service","name":"Guest Communication AI"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Review Response Automation"}}] }
      }) }} />
      <TravelHospClient />
    </>
  );
}
