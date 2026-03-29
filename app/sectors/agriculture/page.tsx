/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import AgricultureClient from './AgricultureClient';

export const metadata: Metadata = {
  title: 'Agriculture IoT Monitoring & Precision Farming Software | Tergo Media',
  description: 'IoT sensor networks, real-time monitoring dashboards, and automated alert escalation for precision farming. 400ha monitored. 3-minute alert response. Zero missed events.',
  keywords: ['agriculture IoT automation', 'precision farming software', 'farm monitoring dashboard', 'IoT sensor integration agriculture', 'smart farming technology Romania', 'agricultural alert system', 'precision irrigation automation'],
  openGraph: {
    title: 'Agriculture IoT Monitoring & Precision Farming Software | Tergo Media',
    description: 'IoT sensor networks, real-time monitoring dashboards, and automated alert escalation for precision farming. 400ha monitored.',
    images: [{ url: 'https://tergomedia.com/og/agriculture.jpg', width: 1200, height: 630, alt: 'Agriculture IoT Monitoring' }],
    url: 'https://tergomedia.com/sectors/agriculture',
    type: 'website',
    siteName: 'Tergo Media',
  },
  twitter: { card: 'summary_large_image', title: 'Agriculture IoT Monitoring | Tergo Media', description: '400ha monitored. 3-minute alert response. Zero missed events.', images: ['https://tergomedia.com/og/agriculture.jpg'] },
  alternates: { canonical: 'https://tergomedia.com/sectors/agriculture' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const } },
};

export default function AgriculturePage() {
  return (
    <>
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80" />
      <Script id="agri-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Agriculture Automation",
        "provider": { "@type": "Organization", "name": "Tergo Media", "url": "https://tergomedia.com", "logo": "https://tergomedia.com/logo.png", "sameAs": ["https://www.linkedin.com/company/tergomedia","https://www.youtube.com/@BuildWithTergo"], "address": [{"@type":"PostalAddress","addressLocality":"Dubai","addressCountry":"AE"},{"@type":"PostalAddress","addressLocality":"Bucharest","addressCountry":"RO"},{"@type":"PostalAddress","addressLocality":"Milan","addressCountry":"IT"}] },
        "description": "IoT sensor networks, real-time monitoring dashboards, and automated alert escalation for precision farming.",
        "serviceType": "IoT Automation",
        "areaServed": ["AE","RO","IT","EU","GB"],
        "url": "https://tergomedia.com/sectors/agriculture",
        "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Agriculture Automation Services", "itemListElement": [{"@type":"Offer","itemOffered":{"@type":"Service","name":"IoT Sensor Integration"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Real-Time Monitoring Dashboards"}}] }
      }) }} />
      <AgricultureClient />
    </>
  );
}
