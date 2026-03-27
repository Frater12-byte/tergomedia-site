'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
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
        .querySelectorAll('.svc-card,.sc-card,.sector-cell,.port-card,.testi-card,.team-card,.stat-item,.how-step,.office-card,.reveal')
        .forEach((el, i) => {
          el.classList.remove('visible');
          el.classList.add('reveal');
          if (i % 3 === 1) el.classList.add('reveal-delay-1');
          if (i % 3 === 2) el.classList.add('reveal-delay-2');
          io.observe(el);
        });

      return () => io.disconnect();
    }, 60);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
