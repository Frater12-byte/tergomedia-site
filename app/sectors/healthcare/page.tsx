/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import HealthcareClient from './HealthcareClient';

export const metadata: Metadata = {
  title: 'Healthcare Automation Dubai | Appointments, Intake & Billing — Tergo Media',
  description:
    'We automate appointment scheduling, patient intake, care follow-up, and insurance billing for private clinics and healthcare providers. No-show rate cut by 15%. 100% follow-up coverage. 4x faster claims processing. Trusted by clinics across UAE and Europe.',
  keywords: [
    'healthcare automation Dubai',
    'clinic appointment automation',
    'patient intake digital',
    'medical billing automation',
    'insurance claims automation UAE',
    'no-show reduction software',
    'patient follow-up automation',
    'private clinic software Dubai',
    'healthcare admin automation',
    'WhatsApp appointment reminders',
    'digital patient intake form',
    'revenue cycle automation healthcare',
    'n8n clinic automation',
    'healthcare digital transformation',
    'medical practice management software',
    'patient recall automation',
  ],
  openGraph: {
    title: 'Healthcare Automation | No-Shows Cut, Claims Accelerated — Tergo Media',
    description:
      'We automate appointment booking, patient intake, care follow-up, and insurance billing for private clinics. 15% fewer no-shows. 100% follow-up coverage. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/healthcare',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Healthcare Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Healthcare Automation | 3-Minute Booking, Zero Admin — Tergo Media',
    description:
      'Automate appointment scheduling, patient intake, follow-up care, and insurance claims for your clinic. No-shows reduced. Revenue cycle accelerated.',
    images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/healthcare',
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
        { '@type': 'ListItem', position: 3, name: 'Healthcare', item: 'https://tergomedia.com/sectors/healthcare' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/healthcare#service',
      name: 'Healthcare Operations Automation',
      alternateName: 'Private Clinic & Medical Practice Automation',
      description:
        'End-to-end automation for private clinics and healthcare providers: 24/7 online appointment booking with automated reminders, digital patient intake, post-visit care follow-up sequences, insurance claims automation, and live clinical performance dashboards.',
      serviceType: ['Appointment Automation', 'Patient Intake', 'Care Follow-up', 'Revenue Cycle Automation'],
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
      url: 'https://tergomedia.com/sectors/healthcare',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Healthcare Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Online Appointment System', description: '24/7 self-serve booking with automated SMS/WhatsApp reminders and a waitlist engine that fills every cancelled slot.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Patient Intake', description: 'Pre-visit intake forms sent after booking, completed on any device, with data flowing directly into the clinical system.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Care Follow-up Automation', description: 'Post-visit sequences: result notifications, medication reminders, review bookings, and recall campaigns — all triggered by clinical events.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Billing & Claims Automation', description: 'Automated insurance claim submission with coding validation, rejection handling, and self-pay invoice sequences.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Clinical Performance Dashboard', description: 'Live appointment, revenue, and patient metrics with automated weekly management reports.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Dr. Rania Khalil' },
        reviewBody: 'Our no-show rate was destroying our schedule. We went from 23% to 6% in 8 weeks. The automated reminders are sent at exactly the right time and the waitlist fills cancellations before I even know there was one.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '12',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How can automation reduce no-shows at a private clinic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We deploy automated reminder sequences across SMS, WhatsApp, and email — sent at 48 hours, 24 hours, and 2 hours before each appointment. Two-way reschedule and cancellation links are included in every message. When a cancellation comes in, the waitlist engine automatically offers the slot to the next patient. Based on our Vitalis Medical Centre case study, no-show rate dropped from 23% to 6% within 8 weeks.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does digital patient intake work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'After a booking is confirmed, we automatically send the patient a branded digital intake form via SMS and email. The form captures medical history, consent, and insurance details on any device. Data flows directly into your clinical management system before the patient arrives — eliminating paper forms and receptionist re-entry.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you automate insurance claim submissions for UAE clinics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build automated revenue cycle workflows that submit insurance claims with billing code validation, parse rejection reasons and trigger automatic resubmission, and send self-pay invoices with payment links. Based on our Vitalis Medical Centre deployment, first-pass rejection rates dropped from 18% to 2.4%, reducing average collection time by 22 days.',
          },
        },
        {
          '@type': 'Question',
          name: 'What clinical management systems can you integrate with?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We integrate with most clinical management platforms used in UAE and European private practice, including Cliniko, Jane App, Carecloud, and custom systems. We also build direct integrations with insurance portal APIs and payment gateways. If your system has an API or webhook capability, we can connect to it.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to automate a private clinic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full clinic automation stack — online booking, digital intake, follow-up sequences, and billing automation — typically goes live in 3–5 weeks from kickoff. Appointment reminders and no-show reduction are usually live within the first 2 weeks.',
          },
        },
      ],
    },
  ],
};

export default function HealthcarePage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=80"
      />
      <Script
        id="hc-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HealthcareClient />
    </>
  );
}
