'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay so new page DOM is painted before we observe
    const timer = setTimeout(() => {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      }, { threshold: 0.12 });

      document
        .querySelectorAll('.cell,.pc-service,.review-card,.team-card,.stat,.reveal')
        .forEach((el, i) => {
          // Reset in case we navigated back to a page we've seen
          el.classList.remove('visible');
          el.classList.add('reveal');
          if (i % 3 === 1) el.classList.add('reveal-delay-1');
          if (i % 3 === 2) el.classList.add('reveal-delay-2');
          io.observe(el);
        });

      return () => io.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
