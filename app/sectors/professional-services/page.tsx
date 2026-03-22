import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = {
  title: 'Automation for Agencies & Consultancies | Invoice, Reporting, Onboarding | Tergo Media',
  description: 'Invoice automation, KPI reporting, client onboarding workflows for professional service firms.',
  alternates: { canonical: 'https://tergomedia.com/sectors/professional-services' },
};
export default function Page() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow r">Professional Services</div>
      <h1>More time on clients. Less time on <em className="r">paperwork</em>.</h1>
      <p className="hero-desc" style={{maxWidth:640}}>We build automation systems for agencies, consultancies, and service firms.</p>
      <div className="btn-row"><Link href="/contact" className="btn btn-r">Book a discovery call →</Link></div>
    </div>
  </div>
  <CtaBar h="Let&apos;s talk about your professional services operation." sub="Book a free 30-minute call. We&apos;ll show you exactly what&apos;s possible." />
</>); }
