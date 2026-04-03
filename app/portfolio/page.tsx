import type { Metadata } from 'next';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio — AI Automation & Custom Software Projects | Tergo Media',
  description: '30+ client projects shipped in production — real estate automation, healthcare systems, e-commerce platforms, IoT dashboards, and more. See Tergo Media\'s work.',
  keywords: 'AI automation portfolio, custom software projects Dubai, real estate automation case studies, healthcare automation, e-commerce automation, logistics software',
  openGraph: {
    title: 'Portfolio — Tergo Media',
    description: '30+ client projects. All live. All delivering measurable results. No mockups, no demos.',
    url: 'https://tergomedia.com/portfolio',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Tergo Media',
    description: '30+ projects shipped in production. AI automation & custom software.',
    images: ['/og-image.png'],
  },
  alternates: { canonical: 'https://tergomedia.com/portfolio' },
  robots: { index: true, follow: true },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
