import Link from 'next/link';
import { LOGO_SRC } from './logo';

const pages = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/tools', label: 'Tools' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <div className="footer-wrap">
      <div className="footer-logo">
        <img src={LOGO_SRC} alt="Tergo Media" />
      </div>
      <div className="footer-links">
        {pages.map(p => <Link key={p.href} href={p.href}>{p.label}</Link>)}
        <a href="mailto:hello@tergomedia.com">hello@tergomedia.com</a>
      </div>
      <div className="footer-copy">© 2025 Tergo Media · Dubai · Bucharest · Milano</div>
    </div>
  );
}
