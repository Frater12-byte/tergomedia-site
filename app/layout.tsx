import type { Metadata } from 'next';
import { Exo_2, DM_Sans } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import ScrollReveal from '@/components/ScrollReveal';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800', '900'],
  variable: '--font-exo2',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tergo Media — AI Automation & Custom Software',
  description: 'We build AI automation and custom software that works while you sleep. Tergo Media — Dubai, Bucharest, Milan.',
  keywords: 'AI automation, custom software, n8n, Make, WhatsApp automation, CRM integration, digital transformation, Dubai, UAE',
  openGraph: {
    title: 'Tergo Media — AI Automation & Custom Software',
    description: 'We build systems that run your business. AI automation, custom software, fractional CTO. Based in Dubai.',
    url: 'https://tergomedia.com',
    siteName: 'Tergo Media',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tergo Media — AI Automation & Custom Software',
    description: 'We build systems that run your business.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/site.webmanifest',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://tergomedia.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <style>{`
          body { font-family: var(--font-dm-sans), 'DM Sans', sans-serif; }
          h1,h2,h3,h4 { font-family: var(--font-exo2), 'Exo 2', sans-serif; }
        `}</style>
      </head>
      <body>
        <Nav />
        <main style={{ paddingTop: 64 }}>{children}</main>
        <Footer />
        <Chatbot />
        <ScrollReveal />
      </body>
    </html>
  );
}
