import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { template: '%s — Tergo Media', default: 'Tergo Media — AI, Automation & Custom Software' },
  description: 'AI automation, custom web & mobile apps, and CTO advisory. Based in Dubai, Bucharest, and Milano.',
  keywords: ['AI automation', 'custom software', 'Dubai tech agency', 'CTO advisory', 'Next.js development'],
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
