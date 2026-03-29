/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import ProfServicesClient from './ProfServicesClient';

export const metadata: Metadata = {
  title: 'Professional Services Automation — Client Onboarding & Billing Software | Tergo Media',
  description: 'Automate client onboarding, billing reconciliation, KPI reporting, and contract renewals. Tergo Media eliminates admin from consultancies, law firms, and agencies.',
  keywords: ['professional services automation','client onboarding automation software','billing reconciliation automation','KPI reporting automation','contract renewal tracking software','consultancy automation','law firm automation software'],
  openGraph: {
    title: 'Professional Services Automation | Tergo Media',
    description: 'Automate client onboarding, billing reconciliation, KPI reporting, and contract renewals.',
    images: [{ url: 'https://tergomedia.com/og/professional-services.jpg', width: 1200, height: 630, alt: 'Professional Services Automation' }],
    url: 'https://tergomedia.com/industries/professional-services',
    type: 'website',
    siteName: 'Tergo Media',
  },
  twitter: { card: 'summary_large_image', title: 'Professional Services Automation | Tergo Media', description: 'Eliminate admin from your consultancy, law firm, or agency.', images: ['https://tergomedia.com/og/professional-services.jpg'] },
  alternates: { canonical: 'https://tergomedia.com/industries/professional-services' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const } },
};

export default function ProfServicesPage() {
  return (
    <>
      <link rel="preload" as="image" href="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80" />
      <Script id="ps-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Professional Services Automation",
        "provider": { "@type": "Organization", "name": "Tergo Media", "url": "https://tergomedia.com", "logo": "https://tergomedia.com/logo.png", "sameAs": ["https://www.linkedin.com/company/tergomedia","https://www.youtube.com/@BuildWithTergo"], "address": [{"@type":"PostalAddress","addressLocality":"Dubai","addressCountry":"AE"},{"@type":"PostalAddress","addressLocality":"Bucharest","addressCountry":"RO"},{"@type":"PostalAddress","addressLocality":"Milan","addressCountry":"IT"}] },
        "description": "Automate client onboarding, billing reconciliation, KPI reporting, and contract renewals for professional services firms.",
        "serviceType": "Business Process Automation",
        "areaServed": ["AE","RO","IT","EU","GB"],
        "url": "https://tergomedia.com/industries/professional-services",
        "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Professional Services Automation", "itemListElement": [{"@type":"Offer","itemOffered":{"@type":"Service","name":"Client Onboarding Pipeline"}},{"@type":"Offer","itemOffered":{"@type":"Service","name":"Revenue Leakage Detection"}}] }
      }) }} />
      <ProfServicesClient />
    </>
  );
}
