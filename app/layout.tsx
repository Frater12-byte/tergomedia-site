import type { Metadata } from 'next';
import Script from 'next/script';
import { Exo_2, DM_Sans } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['300','400','600','700','800','900'],
  variable: '--font-exo2',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300','400','500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tergomedia.com'),
  title: {
    template: '%s | Tergo Media',
    default: 'Tergo Media — AI Automation & Custom Software | Dubai',
  },
  description: 'Tergo Media builds AI automation systems, custom software, and digital transformation programmes for businesses across the GCC, Europe, and beyond. Based in Dubai, Bucharest, and Milan.',
  keywords: ['AI automation Dubai', 'custom software agency Dubai', 'digital transformation GCC', 'automation agency', 'CTO advisory', 'Next.js agency Dubai', 'n8n automation', 'AI agents', 'workflow automation'],
  authors: [{ name: 'Tergo Media', url: 'https://www.tergomedia.com' }],
  creator: 'Tergo Media',
  publisher: 'Tergo Media',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  alternates: { canonical: 'https://www.tergomedia.com' },
  icons: {
    icon: '/TERGO_Media_Branding copy.png',
    apple: '/TERGO_Media_Branding copy.png',
    shortcut: '/TERGO_Media_Branding copy.png',
    // TODO: generate favicon-32x32.png, apple-touch-icon.png (180x180), and add to /public
  },
  openGraph: {
    type: 'website',
    url: 'https://www.tergomedia.com',
    siteName: 'Tergo Media',
    title: 'Tergo Media — AI Automation & Custom Software',
    description: 'We build AI automation systems, custom web and mobile software, and digital transformation programmes for businesses in the GCC and Europe. Based in Dubai, Bucharest, and Milan.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tergo Media — AI Automation and Custom Software Agency' }],
    // TODO: create /public/og-image.png — 1200x630px, Tergo Media logo centred on dark background, tagline "AI Automation & Custom Software · Dubai · Bucharest · Milan"
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tergomedia',
    creator: '@tergomedia',
    title: 'Tergo Media — AI Automation & Custom Software',
    description: 'We build AI automation systems, custom software, and digital transformation programmes for businesses in the GCC and Europe.',
    images: [{ url: '/og-image.png', alt: 'Tergo Media Agency' }],
  },
};

const GA_ID = 'G-E6ZGXMK1ZF';

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tergo Media',
    url: 'https://www.tergomedia.com',
    logo: 'https://www.tergomedia.com/logo.png',
    description: 'AI automation, custom software, and digital transformation agency based in Dubai, Bucharest, and Milan.',
    foundingDate: '2019',
    email: 'hello@tergomedia.com',
    sameAs: [
      'https://www.linkedin.com/company/tergomedia',
      'https://www.linkedin.com/in/francescoterragni/',
      'https://www.linkedin.com/in/maria-terragni/',
    ],
    address: [
      { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE', description: 'Headquarters' },
      { '@type': 'PostalAddress', addressLocality: 'Bucharest', addressCountry: 'RO', description: 'Engineering Hub' },
      { '@type': 'PostalAddress', addressLocality: 'Milan', addressCountry: 'IT', description: 'Partner Office' },
    ],
    founders: [
      { '@type': 'Person', name: 'Francesco Terragni', jobTitle: 'Co-founder & CTO', url: 'https://www.linkedin.com/in/francescoterragni/' },
      { '@type': 'Person', name: 'Maria Terragni', jobTitle: 'CEO', url: 'https://www.linkedin.com/in/maria-terragni/' },
    ],
    areaServed: ['AE', 'IT', 'RO', 'GB', 'ZA', 'EU'],
    knowsAbout: ['AI automation', 'Custom software development', 'Digital transformation', 'CTO advisory', 'No-code automation', 'n8n', 'React', 'Node.js', 'Python'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Tergo Media',
    image: 'https://www.tergomedia.com/og-image.png',
    url: 'https://www.tergomedia.com',
    email: 'hello@tergomedia.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    geo: { '@type': 'GeoCoordinates', latitude: 25.2048, longitude: 55.2708 },
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    priceRange: '$',
    currenciesAccepted: 'USD, AED, EUR',
    paymentAccepted: 'Bank transfer, invoice',
    serviceArea: { '@type': 'Place', name: 'GCC, Europe, Global' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tergo Media',
    url: 'https://www.tergomedia.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://www.tergomedia.com/?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${dmSans.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/TERGO_Media_Branding copy.png" />
        <link rel="apple-touch-icon" href="/TERGO_Media_Branding copy.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body>
        <Nav />
        <main style={{overflowX: 'hidden', width: '100%'}}>{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
