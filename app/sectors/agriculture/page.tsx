import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBar, ImgPh } from '@/components/Graphics';
export const metadata: Metadata = { title: 'Agriculture' };
export default function Page() { return (<>
  <div className="hero"><div className="hero-grid-bg" />
    <div className="hero-inner hero-only">
      <div className="eyebrow p">Agriculture</div>
      <h1>Smart systems for the <em className="p">people who</em> <em className="y">feed the world</em>.</h1>
      <p className="hero-desc" style={{maxWidth:640}}>We built HayGuard — a full farm monitoring system — and Agri Novatex's distributor portals.</p>
      <div className="btn-row"><Link href="/contact" className="btn btn-p">Book a discovery call →</Link></div>
    </div>
  </div>
  <CtaBar h="Let&apos;s talk about your agriculture operation." sub="Book a free 30-minute call. We&apos;ll show you exactly what&apos;s possible." />
</>); }
