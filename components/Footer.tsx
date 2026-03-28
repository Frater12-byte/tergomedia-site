/* eslint-disable */
import Link from 'next/link';
import Image from 'next/image';

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
                height={28}
                width={100}
                style={{ height: 28, width: 'auto', display: 'block', filter: 'brightness(0) invert(1)', marginBottom: 10 }}
              />
            </Link>
            <p>AI · Automation · Custom Software<br />Dubai · Bucharest · Milan</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/tergomedia" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
              <a href="https://www.youtube.com/@BuildWithTergo" target="_blank" rel="noreferrer" title="YouTube">▶</a>
              <a href="mailto:hello@tergomedia.com" title="Email">@</a>
              <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" title="Book a call">↗</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>{SERVICES.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>Sectors</h4>
            <ul>{SECTORS.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>{COMPANY.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
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
            <img src="/Funds1.svg" alt="EU Fund 1" className="footer-eu-logo" />
            <img src="/Funds2.svg" alt="EU Fund 2" className="footer-eu-logo" />
            <img src="/Funds3.svg" alt="EU Fund 3" className="footer-eu-logo" />
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
