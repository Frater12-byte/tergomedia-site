/* eslint-disable */
export default function WorldMap() {
  return (
    <div className="world-map-wrap">
      <svg
        viewBox="0 0 900 440"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', width: '100%' }}
      >
        {/* Ocean background */}
        <rect width="900" height="440" fill="rgba(0,80,160,0.05)" rx="4" />

        {/* ── LAND MASSES ── */}
        {/* Europe */}
        <path
          d="M200,55 L310,45 L390,60 L430,85 L440,125 L415,158 L370,170 L300,168 L250,155 L215,130 L195,95 Z"
          fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7"
        />
        {/* North Africa */}
        <path
          d="M160,175 L450,162 L495,183 L505,240 L465,278 L350,292 L215,280 L150,255 L145,210 Z"
          fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6"
        />
        {/* Sub-Saharan Africa */}
        <path
          d="M155,290 L460,280 L485,320 L470,400 L390,438 L270,440 L175,418 L142,368 L140,318 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
        />
        {/* Arabian Peninsula + Levant */}
        <path
          d="M510,155 L615,148 L685,172 L715,230 L710,305 L660,345 L600,348 L548,315 L518,258 L500,195 Z"
          fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.6"
        />
        {/* South Asia (Pakistan + India) */}
        <path
          d="M710,148 L810,140 L870,168 L892,228 L875,325 L835,375 L770,382 L720,348 L694,280 L690,198 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
        />

        {/* ── COUNTRY DOTS ── */}
        {/* Morocco */}
        <circle cx="188" cy="200" r="2.5" fill="rgba(255,255,255,0.18)" />
        {/* Algeria */}
        <circle cx="265" cy="212" r="2.5" fill="rgba(255,255,255,0.18)" />
        {/* Tunisia */}
        <circle cx="318" cy="188" r="2" fill="rgba(255,255,255,0.18)" />
        {/* Libya */}
        <circle cx="365" cy="208" r="2.5" fill="rgba(255,255,255,0.18)" />
        {/* Jordan */}
        <circle cx="528" cy="182" r="2" fill="rgba(255,255,255,0.15)" />
        {/* Kuwait */}
        <circle cx="590" cy="183" r="2" fill="rgba(255,255,255,0.15)" />
        {/* Qatar */}
        <circle cx="625" cy="215" r="2" fill="rgba(255,255,255,0.15)" />
        {/* Bahrain */}
        <circle cx="614" cy="206" r="1.8" fill="rgba(255,255,255,0.15)" />
        {/* Pakistan */}
        <circle cx="720" cy="185" r="2.5" fill="rgba(255,255,255,0.14)" />
        {/* India */}
        <circle cx="778" cy="252" r="3" fill="rgba(255,255,255,0.14)" />

        {/* ── CONNECTION LINES ── */}
        <path
          id="wm-line-m-b"
          d="M380,142 Q408,128 445,138"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4"
        />
        <path
          id="wm-line-b-d"
          d="M445,138 Q548,115 638,222"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4,4"
        />

        {/* ── RADAR SWEEP (Dubai) ── */}
        <g>
          <path
            d="M638,222 L705,155 A95,95 0 0,1 718,180 Z"
            fill="rgba(249,202,0,0.08)"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 638 222"
            to="360 638 222"
            dur="4s"
            repeatCount="indefinite"
          />
        </g>

        {/* ── TRAVELLING DOTS ── */}
        <circle r="3" fill="#00c8ff" opacity="0.95">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#wm-line-m-b" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9ca00" opacity="0.95">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#wm-line-b-d" />
          </animateMotion>
        </circle>

        {/* ── PULSE RINGS ── */}
        {/* Dubai pulse */}
        <circle cx="638" cy="222" r="16" fill="none" stroke="#f9ca00" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="16;30;16" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Milan pulse */}
        <circle cx="380" cy="142" r="10" fill="none" stroke="#00c8ff" strokeWidth="0.8" opacity="0.25">
          <animate attributeName="r" values="10;20;10" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" repeatCount="indefinite" />
        </circle>

        {/* ── CITY DOTS ── */}
        {/* Milan */}
        <circle cx="380" cy="142" r="5" fill="#00c8ff" opacity="0.95" />
        <circle cx="380" cy="142" r="12" fill="#00c8ff" opacity="0.12" />
        <text x="360" y="130" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="'Exo 2',sans-serif" fontWeight="700">Milan</text>

        {/* Bucharest */}
        <circle cx="445" cy="138" r="5" fill="#00ff9d" opacity="0.95" />
        <circle cx="445" cy="138" r="12" fill="#00ff9d" opacity="0.12" />
        <text x="458" y="133" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="'Exo 2',sans-serif" fontWeight="700">Bucharest</text>

        {/* Dubai */}
        <circle cx="638" cy="222" r="7" fill="#f9ca00" opacity="0.95" />
        <circle cx="638" cy="222" r="18" fill="#f9ca00" opacity="0.1" />
        <text x="652" y="218" fill="rgba(255,255,255,.75)" fontSize="10" fontFamily="'Exo 2',sans-serif" fontWeight="700">Dubai</text>
      </svg>
    </div>
  );
}
