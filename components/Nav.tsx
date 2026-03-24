'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const DESKTOP_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/sectors',  label: 'Sectors' },
  { href: '/portfolio',label: 'Portfolio' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];
const MOBILE_LINKS = [
  { href: '/',         label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/sectors',  label: 'Sectors' },
  { href: '/tools',    label: 'Tools' },
  { href: '/portfolio',label: 'Portfolio' },
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <div className="nav-wrap">
        <div className="nav-inner">
          <div className="nav-logo">
            <Link href="/"><Image src="/logo.png" alt="Tergo Media — AI Automation & Custom Software Agency" width={156} height={43} style={{objectFit:'contain',objectPosition:'left center'}} priority /></Link>
          </div>

          {/* Desktop nav */}
          <div className="nav-links">
            {DESKTOP_LINKS.map(l => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
            <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noreferrer" className="btn nav-cta">Book a call</a>
          </div>

          {/* Hamburger button */}
          <button
            className="ham-btn"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className={`ham-line ${open ? 'open' : ''}`} />
            <span className={`ham-line mid ${open ? 'open' : ''}`} />
            <span className={`ham-line ${open ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div className={`mob-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <nav className={`mob-menu ${open ? 'open' : ''}`}>
        <div className="mob-menu-inner">
          {MOBILE_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`mob-link ${isActive(l.href) ? 'mob-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <span>{l.label}</span>
              <span className="mob-arrow">→</span>
            </Link>
          ))}
          <div className="mob-cta-wrap">
            <a href="https://calendly.com/tergo-media/30min" target="_blank" rel="noreferrer" className="mob-cta-btn">
              Book a free call →
            </a>
            <a href="mailto:hello@tergomedia.com" className="mob-cta-email">hello@tergomedia.com</a>
            <div className="mob-offices">Dubai · Bucharest · Milan</div>
          </div>
        </div>
      </nav>
    </>
  );
}
