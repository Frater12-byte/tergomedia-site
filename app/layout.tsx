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
  title: 'Tergo Media — AI Automation & Custom Software Agency',
  description:
    'Tergo Media builds AI automation and custom software that works while you sleep — freeing your team to focus on growth, not admin. Dubai · Bucharest · Milan.',
  keywords: 'AI automation, custom software, CTO advisory, digital transformation, Dubai, Bucharest, Milan',
  openGraph: {
    title: 'Tergo Media — AI Automation & Custom Software Agency',
    description: 'AI · Automation · Custom Software. Based in Dubai, Bucharest & Milan.',
    url: 'https://tergomedia.com',
    siteName: 'Tergo Media',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
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
