/* eslint-disable */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/sectors', label: 'Sectors' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <nav className="nav-outer">
        <Link href="/" className="nav-logo-img">
          <Image src="/logo.png" alt="Tergo Media" height={36} width={120} style={{ height: 36, width: 'auto', display: 'block' }} priority />
        </Link>
        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={isActive(l.href) ? 'active' : ''}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <a
          href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-y nav-cta"
        >
          Book a call →
        </a>
        <button
          className={`hamburger${open ? ' open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </nav>

      {open && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 198 }}
          onClick={() => setOpen(false)}
        />
      )}
      <div className={`mob-menu${open ? ' open' : ''}`}>
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        {LINKS.map(l => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <a
          href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-y"
          onClick={() => setOpen(false)}
        >
          Book a free call →
        </a>
      </div>
    </>
  );
}
