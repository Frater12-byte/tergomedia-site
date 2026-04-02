/* eslint-disable */
import type { Metadata } from 'next';
import Script from 'next/script';
import FinanceLegalClient from './FinanceLegalClient';

export const metadata: Metadata = {
  title: 'Finance & Legal Automation | KYC in 15 Minutes, Zero Compliance Gaps — Tergo Media',
  description:
    'We automate KYC onboarding, compliance reporting, contract management, and billing for regulated finance and legal firms. 15-minute digital onboarding. 100% audit trail. DSO reduced by 18 days. Trusted by DIFC-regulated firms and law practices across UAE and Europe.',
  keywords: [
    'finance automation Dubai',
    'legal automation',
    'KYC onboarding automation',
    'compliance reporting automation',
    'AML screening automation',
    'contract management software',
    'billing automation finance',
    'DIFC compliance automation',
    'investment management automation',
    'law firm automation Dubai',
    'regulatory reporting software',
    'DSO reduction automation',
    'n8n compliance workflow',
    'financial services digital transformation',
    'legal tech UAE',
    'e-signature contract automation',
  ],
  openGraph: {
    title: 'Finance & Legal Automation | KYC in 15 Minutes — Tergo Media',
    description:
      'We automate KYC onboarding, compliance reporting, and contract management for regulated firms. Zero compliance gaps. 100% audit trail. Book a free discovery call.',
    url: 'https://tergomedia.com/sectors/finance-legal',
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_AE',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Finance & Legal Automation — Tergo Media',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    title: 'Finance & Legal Automation | Zero Compliance Gaps — Tergo Media',
    description:
      'KYC in 15 minutes. Compliance reports automated. DSO reduced by 18 days. Built for regulated firms in Dubai and Europe.',
    images: ['https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80'],
  },
  alternates: {
    canonical: 'https://tergomedia.com/sectors/finance-legal',
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
        { '@type': 'ListItem', position: 3, name: 'Finance & Legal', item: 'https://tergomedia.com/sectors/finance-legal' },
      ],
    },
    {
      '@type': 'Service',
      '@id': 'https://tergomedia.com/sectors/finance-legal#service',
      name: 'Finance & Legal Automation',
      alternateName: 'Regulated Industry Operations Automation',
      description:
        'End-to-end automation for finance and legal firms: digital KYC onboarding, automated compliance reporting, contract management with e-signature, billing and collections automation, and live performance dashboards — built for regulated businesses that cannot afford errors.',
      serviceType: ['KYC Automation', 'Compliance Reporting', 'Contract Management', 'Billing Automation'],
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
      url: 'https://tergomedia.com/sectors/finance-legal',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Finance & Legal Automation Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Compliance Reporting Engine', description: 'Automated regulatory report generation from live trading, transaction, and client data — zero manual assembly.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'KYC & Onboarding Automation', description: 'Digital client onboarding with document collection, identity verification, AML screening, and CRM population in 15 minutes.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Contract Management System', description: 'Template-based drafting, version tracking, approval routing, and e-signature — deal turnaround from weeks to days.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Billing & Collections Automation', description: 'Automated invoice generation, multi-touch payment reminders, and reconciliation with real-time DSO tracking.' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Financial Performance Dashboard', description: 'Live revenue, DSO, pipeline, and compliance status with automated weekly partner digest.' } },
        ],
      },
      review: {
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        author: { '@type': 'Person', name: 'Khalid Al Farsi' },
        reviewBody: 'Our KYC process used to take 5 days and kill investor momentum. Now it is done in 15 minutes before the first call. The compliance reporting runs itself. The regulatory review last quarter found zero issues.',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '14',
        bestRating: '5',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How can Tergo Media automate KYC onboarding for regulated firms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We build a branded digital onboarding portal that collects all required KYC documents, runs automated identity verification and AML screening via API, routes compliance sign-off to the appropriate approver, and creates a full CRM record — all completed before the first client meeting. The typical onboarding time drops from 3–5 days to under 15 minutes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you automate regulatory compliance reporting for DIFC-regulated firms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We build automated compliance reporting pipelines that pull from trading systems, transaction logs, and client records to generate regulatory reports on a fixed schedule with zero manual input. Every data point is timestamped and logged for audit purposes. Where regulator portal APIs are available, we submit directly.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does contract automation work for legal and finance firms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We build a contract management system that generates drafts from templates using CRM deal data, tracks versions with redlines, routes approvals based on contract type and value, and manages e-signature through DocuSign or equivalent. Executed copies are filed automatically. Contract turnaround typically drops from 2–4 weeks to 2–3 days.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you reduce Days Sales Outstanding (DSO) for finance firms through automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We automate invoice generation from time records and CRM milestones, trigger multi-touch payment reminder sequences at 7, 14, and 30 days overdue, and run automatic payment matching and reconciliation. Based on our Halcyon Capital Partners case study, DSO dropped from 52 days to 31 days after deployment.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to deploy finance and legal automation?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A full finance and legal automation stack — KYC onboarding, compliance reporting, contract management, and billing automation — typically goes live in 4–6 weeks from kickoff. We handle all integrations with your existing CRM, accounting, and regulatory systems.',
          },
        },
      ],
    },
  ],
};

export default function FinanceLegalPage() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80"
      />
      <Script
        id="fl-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FinanceLegalClient />
    </>
  );
}
