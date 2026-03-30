import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Tergo Media',
  description: 'Get in touch with Tergo Media. Book a discovery call, email us, or connect on LinkedIn.',
};

export default function ContactPage() {
  return <ContactClient />;
}
