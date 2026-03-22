import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';

export const metadata: Metadata = {
  metadataBase: new URL('https://tergomedia.com'),
  title: { template: '%s — Tergo Media', default: 'Tergo Media — AI, Automation & Custom Software' },
  description: 'AI automation, custom web & mobile apps, and CTO advisory. Based in Dubai, Bucharest, and Milano.',
  keywords: ['AI automation', 'custom software', 'Dubai tech agency', 'CTO advisory', 'Next.js development'],
  icons: {
    icon: '/TERGO_Media_Branding copy.png',
    apple: '/TERGO_Media_Branding copy.png',
    shortcut: '/TERGO_Media_Branding copy.png',
  },
  openGraph: {
    siteName: 'Tergo Media',
    type: 'website',
    locale: 'en_US',
  },
};

const GA_ID = 'G-E6ZGXMK1ZF';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/TERGO_Media_Branding copy.png" />
        <link rel="apple-touch-icon" href="/TERGO_Media_Branding copy.png" />
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
