import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Tergo Media',
  description: 'Get in touch with Tergo Media. Book a discovery call, email us, or connect on LinkedIn.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Get in touch</div>
          <h1>Let&apos;s talk about<br />your <em>project.</em></h1>
          <p>Book a free 30-minute discovery call, send us a message, or connect with us on LinkedIn. We respond within 24 hours.</p>
        </div>
      </section>
      <ContactClient />
    </>
  );
}
