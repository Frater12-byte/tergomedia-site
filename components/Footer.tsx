import Link from 'next/link';
import Image from 'next/image';

const SERVICES = [
  { href: '/services/ai-automation',          label: 'AI & Automation' },
  { href: '/services/custom-dev',             label: 'Custom Web & Mobile' },
  { href: '/services/cto-advisory',           label: 'CTO Advisory' },
  { href: '/services/digital-transformation', label: 'Digital Transformation' },
];

const SECTORS = [
  { href: '/sectors/real-estate',           label: 'Real Estate' },
  { href: '/sectors/travel-hospitality',    label: 'Travel & Hospitality' },
  { href: '/sectors/agriculture',           label: 'Agriculture' },
  { href: '/sectors/professional-services', label: 'Professional Services' },
];

const COMPANY = [
  { href: '/about',     label: 'About us' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/tools',     label: 'Free tools' },
  { href: '/contact',   label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="footer-outer">
      <style>{`
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.15); opacity: 0.7; }
        }
        .footer-dot { display: inline-block; font-size: 14px; animation: dotPulse 2.5s ease-in-out infinite; }
        .footer-dot-2 { animation-delay: 0.8s; }
        .footer-dot-3 { animation-delay: 1.6s; }
        @media (prefers-reduced-motion: reduce) { .footer-dot { animation: none; } }
      `}</style>

      <div className="footer-main">

        {/* Brand column */}
        <div className="footer-brand">
          <Image src="/logo.png" alt="Tergo Media — AI Automation & Custom Software Agency" width={156} height={43} style={{objectFit:'contain',objectPosition:'left center'}} />
          <p className="footer-tagline">
            AI · Automation · Custom Software<br />
            Dubai · Bucharest · Milan
          </p>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/tergomedia" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
            <a href="mailto:hello@tergomedia.com" title="Email">@</a>
            <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noreferrer" title="Book a call">↗</a>
          </div>
        </div>

        {/* Services */}
        <div className="footer-col">
          <div className="footer-col-title">Services</div>
          {SERVICES.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>

        {/* Sectors */}
        <div className="footer-col">
          <div className="footer-col-title">Sectors</div>
          {SECTORS.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>

        {/* Company */}
        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          {COMPANY.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </div>

        {/* Contact */}
        <div className="footer-col">
          <div className="footer-col-title">Get in touch</div>
          <div className="footer-contact-item">
            <a href="mailto:hello@tergomedia.com">hello@tergomedia.com</a>
          </div>
          <div className="footer-contact-item">
            <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noreferrer">Book a discovery call →</a>
          </div>
          <div className="footer-contact-item" style={{ marginTop: 8 }}>
            <a href="https://www.linkedin.com/in/maria-terragni/" target="_blank" rel="noreferrer">Maria — CEO</a>
          </div>
          <div className="footer-contact-item">
            <a href="https://www.linkedin.com/in/francescoterragni/" target="_blank" rel="noreferrer">Francesco — CTO</a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <div className="footer-offices">
            <span className="footer-office"><span className="footer-dot" style={{color:'var(--y)'}}>●</span> Dubai, UAE</span>
            <span className="footer-office"><span className="footer-dot footer-dot-2" style={{color:'var(--y)'}}>●</span> Bucharest, Romania</span>
            <span className="footer-office"><span className="footer-dot footer-dot-3" style={{color:'var(--y)'}}>●</span> Milan, Italy</span>
          </div>
          <div className="footer-copy">© 2026 Tergo Media · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}
