import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Sectors' };
export default function Page() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow y">Sectors</div>
      <h1>We know your industry. Not just your <em className="c">tech stack</em>.</h1>
      <p className="hero-desc" style={{maxWidth:640}}>Generic automation doesn't work. We've built real products inside four sectors.</p>
      <div className="btn-row"><Link href="/contact" className="btn btn-y">Book a discovery call →</Link></div>
    </div>
  </div>
  <CtaBar h="Let&apos;s talk about your sectors operation." sub="Book a free 30-minute call. We&apos;ll show you exactly what&apos;s possible." />
</>); }
