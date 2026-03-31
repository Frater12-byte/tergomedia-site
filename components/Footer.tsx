/* eslint-disable */
'use client';
import Link from 'next/link';
import Image from 'next/image';

const toTop = () => window.scrollTo({ top: 0 });

const SERVICES = [
  { href: '/services/ai-automation', label: 'AI & Automation' },
  { href: '/services/custom-dev', label: 'Custom Web & Mobile' },
  { href: '/services/cto-advisory', label: 'CTO Advisory' },
  { href: '/services/digital-transformation', label: 'Digital Transformation' },
];
const SECTORS = [
  { href: '/sectors/real-estate', label: 'Real Estate' },
  { href: '/sectors/travel-hospitality', label: 'Travel & Hospitality' },
  { href: '/sectors/agriculture', label: 'Agriculture' },
  { href: '/sectors/professional-services', label: 'Professional Services' },
];
const COMPANY = [
  { href: '/about', label: 'About us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-img">
              <Image
                src="/logo.png"
                alt="Tergo Media"
                height={36}
                width={120}
                style={{ height: 36, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', marginBottom: 12 }}
              />
            </Link>
            <p>AI · Automation · Custom Software<br />Dubai · Bucharest · Milan</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/tergomedia" target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.youtube.com/@BuildWithTergo" target="_blank" rel="noreferrer" title="YouTube" aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#111"/></svg>
              </a>
              <a href="mailto:hello@tergomedia.com" title="Email" aria-label="Email">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" title="Book a call" aria-label="Book a call">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>{SERVICES.map(l => <li key={l.href}><Link href={l.href} onClick={toTop}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>Sectors</h4>
            <ul>{SECTORS.map(l => <li key={l.href}><Link href={l.href} onClick={toTop}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>{COMPANY.map(l => <li key={l.href}><Link href={l.href} onClick={toTop}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>Offices</h4>
            <div className="footer-offices">
              <div className="f-off"><div className="f-dot" /><div><strong>Dubai, UAE</strong><span>HQ · Gulf operations</span></div></div>
              <div className="f-off"><div className="f-dot" /><div><strong>Bucharest, Romania</strong><span>Engineering hub</span></div></div>
              <div className="f-off"><div className="f-dot" /><div><strong>Milan, Italy</strong><span>European clients</span></div></div>
            </div>
          </div>
        </div>

        {/* EU Funding logos */}
        <div className="footer-eu">
          <div className="footer-eu-label">Co-financed by the European Union</div>
          <div className="footer-eu-logos">
            <img src="/Funds1.png" alt="EU Fund 1" className="footer-eu-logo" />
            <img src="/Funds2.png" alt="EU Fund 2" className="footer-eu-logo" />
            <img src="/Funds3.png" alt="EU Fund 3" className="footer-eu-logo" />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Tergo Media · All rights reserved</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="mailto:hello@tergomedia.com">hello@tergomedia.com</a>
            <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer">Maria — CEO</a>
            <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer">Francesco — CTO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
