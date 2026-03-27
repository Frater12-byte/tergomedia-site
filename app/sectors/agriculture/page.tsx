import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agriculture — Tergo Media',
  description: 'IoT sensor platforms, real-time crop monitoring, and automated alert systems for precision agriculture operations.',
};

export default function AgriculturePage() {
  return (
    <>
      <section className="page-hero">
        <svg className="poly-bg" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <polygon points="600,0 900,50 1000,300 800,550 500,500 400,200" fill="rgba(0,255,157,0.015)" stroke="#00ff9d" strokeWidth="0.5" strokeOpacity="0.1"/>
          <circle cx="600" cy="0" r="2" fill="#00ff9d" fillOpacity="0.18"/>
        </svg>
        <div className="hero-glow-1" /><div className="hero-glow-2" />
        <div className="container">
          <div className="page-hero-eyebrow">Sector — Agriculture</div>
          <h1>Precision farming.<br /><em>Real-time intelligence.</em></h1>
          <p>IoT sensor networks, live monitoring dashboards, and automated alert escalation. Know what&apos;s happening across every hectare — before it becomes a problem.</p>
          <div className="hero-ctas">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-y btn-lg">Book a discovery call →</a>
            <Link href="/portfolio" className="btn btn-ol btn-lg">See case studies</Link>
          </div>
          <div className="met-row">
            <div className="met"><div className="met-b">400<span>ha</span></div><div className="met-s">Monitored for<br />Agri Novatex</div></div>
            <div className="met"><div className="met-b">3<span>min</span></div><div className="met-s">Alert response<br />time</div></div>
            <div className="met"><div className="met-b">0</div><div className="met-s">Missed critical<br />events</div></div>
            <div className="met"><div className="met-b">24<span>/7</span></div><div className="met-s">Continuous<br />monitoring</div></div>
          </div>
        </div>
      </section>

      <section className="section section-dots">
        <div className="container">
          <span className="sec-label">What we build</span>
          <h2 className="sec-title">From sensors in the field<br />to alerts on your phone.</h2>
          <p className="sec-sub">We handle the full stack: sensor integration, data pipelines, monitoring dashboards, and automated escalation — all custom-built for your operation.</p>
          <div className="services-grid">
            {[
              { num: '01', title: 'IoT Sensor Integration', desc: 'We connect soil moisture, temperature, humidity, pH, and weather sensors into a unified data platform. Any sensor, any protocol — we make it work.', tags: ['MQTT', 'LoRaWAN', 'Modbus', 'REST APIs'] },
              { num: '02', title: 'Real-Time Monitoring Dashboards', desc: 'Live dashboards showing every sensor reading, trend line, and threshold status across your entire operation. Web and mobile, built for field conditions.', tags: ['React', 'Next.js', 'WebSockets', 'Mobile'] },
              { num: '03', title: 'Automated Alert Escalation', desc: 'When a sensor reading crosses a threshold, the right person gets the right alert — instantly. Escalation chains, SMS, WhatsApp, and email all configured per crop zone.', tags: ['n8n', 'Twilio', 'WhatsApp', 'Email'] },
              { num: '04', title: 'Predictive Analytics', desc: 'Historical sensor data analysed to identify patterns before they become failures. Irrigation scheduling, frost risk prediction, and yield forecasting models.', tags: ['Python', 'ML models', 'Forecasting'] },
              { num: '05', title: 'Supply Chain Automation', desc: 'Harvest scheduling, logistics coordination, and inventory tracking automated based on yield data and market conditions.', tags: ['Automation', 'ERP integration', 'Logistics'] },
              { num: '06', title: 'Regulatory Reporting', desc: 'Automated compliance reports generated from sensor data. Water usage, chemical application records, and sustainability metrics — produced on schedule, automatically.', tags: ['Compliance', 'Reporting', 'Automation'] },
            ].map(s => (
              <div key={s.num} className="svc-card">
                <span className="svc-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-tags">{s.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <span className="sec-label">Case study</span>
          <h2 className="sec-title">Agri Novatex — Bucharest</h2>
          <div className="how-steps" style={{ maxWidth: 640 }}>
            {[
              { n: '→', title: 'The challenge', desc: 'A 400-hectare precision farming operation in Romania needed real-time visibility across dozens of sensor types. Manual checks were missing critical events overnight and on weekends.' },
              { n: '→', title: 'What we built', desc: 'A fully integrated IoT platform connecting soil moisture, temperature, and humidity sensors across all 400 hectares. A live monitoring dashboard, automated threshold alerts, and escalation chains for on-call agronomists.' },
              { n: '→', title: 'The outcome', desc: 'Alert response time dropped from hours to under 3 minutes. Zero missed critical events since launch. The operations team now monitors the entire farm from a single screen — in the office or from their phone.' },
            ].map(s => (
              <div key={s.n} className="how-step">
                <div className="how-step-n" style={{ fontSize: 20 }}>{s.n}</div>
                <div className="how-step-body"><h4>{s.title}</h4><p>{s.desc}</p></div>
              </div>
            ))}
          </div>
          <div className="mt-cta">
            <Link href="/portfolio" className="btn btn-y btn-lg">See full portfolio →</Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to get real-time<br />visibility across your farm?</h2>
          <p>Book a free discovery call. We&apos;ll show you what precision monitoring looks like in practice — and how quickly we can have it running.</p>
          <div className="cta-btns">
            <a href="https://outlook.office.com/book/TergoMedia1@tergomedia.com/" target="_blank" rel="noreferrer" className="btn btn-dark btn-lg">Book a free call →</a>
            <a href="mailto:hello@tergomedia.com" className="btn btn-ol btn-lg">hello@tergomedia.com</a>
          </div>
        </div>
      </section>
    </>
  );
}
