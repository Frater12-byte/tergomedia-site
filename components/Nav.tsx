'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LOGO_SRC } from './logo';

const links = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/tools', label: 'Tools' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <div className="nav-wrap">
        <div className="nav-inner">
          <div className="nav-logo">
            <Link href="/"><img src={LOGO_SRC} alt="Tergo Media" /></Link>
          </div>
          <div className="nav-links">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={isActive(l.href) ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn nav-cta">Book a call</Link>
          </div>
          <button
            className="ham"
            onClick={() => setOpen(o => !o)}
            aria-label="Menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'none', flexDirection: 'column', gap: '5px', padding: '6px'
            }}
          >
            <span style={{ transform: open ? 'rotate(45deg) translate(4px,4px)' : '', transition: 'all .25s' }} />
            <span style={{ opacity: open ? 0 : 1, transition: 'all .25s' }} />
            <span style={{ transform: open ? 'rotate(-45deg) translate(4px,-4px)' : '', transition: 'all .25s' }} />
          </button>
        </div>
      </div>
      <nav className={`mob-nav${open ? ' open' : ''}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <Link href="/contact" className="mob-cta" onClick={() => setOpen(false)}>
          Book a call →
        </Link>
      </nav>
    </>
  );
}
