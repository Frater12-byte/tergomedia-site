import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Tergo Media — Book a Free Discovery Call',
  description: 'Get in touch with Tergo Media. Book a free 30-minute discovery call, email us at hello@tergomedia.com, or visit our offices in Dubai, Bucharest, or Milan.',
  keywords: 'contact Tergo Media, book discovery call, AI automation consultation, Dubai tech agency contact',
  openGraph: {
    title: 'Contact Tergo Media — Book a Free Discovery Call',
    description: 'Book a free 30-minute discovery call. We\'ll show you exactly what we\'d automate first.',
    url: 'https://tergomedia.com/contact',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tergo Media — Book a Free Discovery Call',
    description: 'Book a free 30-minute discovery call. AI automation & custom software.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/contact' },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
