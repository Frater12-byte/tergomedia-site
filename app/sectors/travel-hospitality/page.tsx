import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Travel & Hospitality' };
export default function Page() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow c">Travel & Hospitality</div>
      <h1>More bookings. Less <em className="c">admin</em>. Happier <em className="y">clients</em>.</h1>
      <p className="hero-desc" style={{maxWidth:640}}>We scaled Cocktail Holidays to $7M revenue using this exact stack.</p>
      <div className="btn-row"><Link href="/contact" className="btn btn-c">Book a discovery call →</Link></div>
    </div>
  </div>
  <CtaBar h="Let&apos;s talk about your travel & hospitality operation." sub="Book a free 30-minute call. We&apos;ll show you exactly what&apos;s possible." />
</>); }
