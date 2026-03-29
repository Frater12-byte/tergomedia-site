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
        <rect width="900" height="440" fill="rgba(0,30,60,0.4)" rx="4" />

        {/* ── LAND MASSES ── */}
        {/* Europe */}
        <path d="M200,55 L310,45 L390,60 L430,85 L440,125 L415,158 L370,170 L300,168 L250,155 L215,130 L195,95 Z"
          fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7"/>
        {/* Italy highlight */}
        <path d="M300,120 L330,115 L345,130 L350,155 L335,175 L315,170 L298,150 Z"
          fill="rgba(0,200,255,0.08)" stroke="rgba(0,200,255,0.25)" strokeWidth="1"/>
        {/* Romania highlight */}
        <path d="M390,92 L430,88 L445,100 L440,120 L418,130 L388,125 L378,108 Z"
          fill="rgba(0,255,157,0.08)" stroke="rgba(0,255,157,0.25)" strokeWidth="1"/>

        {/* North Africa */}
        <path d="M150,178 L450,165 L495,185 L505,240 L465,278 L350,292 L215,280 L145,255 L140,210 Z"
          fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.17)" strokeWidth="0.6"/>
        {/* Morocco */}
        <circle cx="188" cy="200" r="3" fill="rgba(255,255,255,0.2)"/>
        {/* Algeria */}
        <circle cx="265" cy="212" r="3" fill="rgba(255,255,255,0.2)"/>
        {/* Tunisia */}
        <circle cx="318" cy="188" r="2.5" fill="rgba(255,255,255,0.2)"/>
        {/* Libya */}
        <circle cx="365" cy="208" r="3" fill="rgba(255,255,255,0.2)"/>

        {/* Sub-Saharan Africa */}
        <path d="M155,290 L460,280 L485,320 L470,400 L390,438 L270,440 L175,418 L142,368 L140,318 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5"/>

        {/* Arabian Peninsula + Levant — UAE highlight */}
        <path d="M510,155 L615,148 L685,172 L715,230 L710,305 L660,345 L600,348 L548,315 L518,258 L500,195 Z"
          fill="rgba(249,202,0,0.07)" stroke="rgba(249,202,0,0.22)" strokeWidth="1"/>
        {/* UAE highlighted outline */}
        <path d="M625,200 L665,195 L680,215 L675,248 L648,258 L620,245 L608,220 Z"
          fill="rgba(249,202,0,0.12)" stroke="rgba(249,202,0,0.35)" strokeWidth="1.5"/>
        {/* Jordan */}
        <circle cx="528" cy="182" r="2.5" fill="rgba(255,255,255,0.18)"/>
        {/* Kuwait */}
        <circle cx="590" cy="183" r="2.5" fill="rgba(255,255,255,0.18)"/>
        {/* Qatar */}
        <circle cx="625" cy="215" r="2" fill="rgba(255,255,255,0.18)"/>
        {/* Bahrain */}
        <circle cx="614" cy="206" r="2" fill="rgba(255,255,255,0.18)"/>

        {/* South Asia */}
        <path d="M710,148 L810,140 L870,168 L892,228 L875,325 L835,375 L770,382 L720,348 L694,280 L690,198 Z"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.16)" strokeWidth="0.5"/>
        {/* Pakistan */}
        <circle cx="720" cy="185" r="3" fill="rgba(255,255,255,0.18)"/>
        {/* India */}
        <circle cx="778" cy="252" r="3.5" fill="rgba(255,255,255,0.18)"/>

        {/* ── CONNECTION LINES ── */}
        <path id="wm-line-m-b" d="M380,142 Q408,128 445,138"
          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,4"/>
        <path id="wm-line-b-d" d="M445,138 Q548,115 638,222"
          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4,4"/>

        {/* ── RADAR SWEEP (Dubai) — expanding circle ── */}
        <circle cx="638" cy="222" r="10" fill="none" stroke="#f9ca00" strokeWidth="1.5" opacity="0.5">
          <animate attributeName="r" values="10;80;10" dur="4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="638" cy="222" r="20" fill="none" stroke="#f9ca00" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="20;90;20" dur="4s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" begin="1s" repeatCount="indefinite"/>
        </circle>

        {/* ── TRAVELLING DOTS (both simultaneously) ── */}
        <circle r="3" fill="#00c8ff" opacity="0.95">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#wm-line-m-b"/>
          </animateMotion>
        </circle>
        <circle r="3" fill="#00c8ff" opacity="0.95">
          <animateMotion dur="2s" begin="-1s" repeatCount="indefinite">
            <mpath href="#wm-line-m-b"/>
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9ca00" opacity="0.95">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#wm-line-b-d"/>
          </animateMotion>
        </circle>
        <circle r="3" fill="#f9ca00" opacity="0.95">
          <animateMotion dur="3s" begin="-1.5s" repeatCount="indefinite">
            <mpath href="#wm-line-b-d"/>
          </animateMotion>
        </circle>

        {/* ── PULSE RINGS ── */}
        <circle cx="638" cy="222" r="16" fill="none" stroke="#f9ca00" strokeWidth="0.8" opacity="0.25">
          <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.25;0;0.25" dur="2s" repeatCount="indefinite"/>
        </circle>

        {/* ── CITY DOTS ── */}
        {/* Milan */}
        <circle cx="380" cy="142" r="5" fill="#00c8ff" opacity="0.95"/>
        <circle cx="380" cy="142" r="12" fill="#00c8ff" opacity="0.1"/>
        <text x="380" y="160" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'Exo 2',sans-serif" fontWeight="600" textAnchor="middle">Milan</text>

        {/* Bucharest */}
        <circle cx="445" cy="138" r="5" fill="#00ff9d" opacity="0.95"/>
        <circle cx="445" cy="138" r="12" fill="#00ff9d" opacity="0.1"/>
        <text x="445" y="156" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'Exo 2',sans-serif" fontWeight="600" textAnchor="middle">Bucharest</text>

        {/* Dubai */}
        <circle cx="638" cy="222" r="7" fill="#f9ca00" opacity="0.95"/>
        <circle cx="638" cy="222" r="18" fill="#f9ca00" opacity="0.1"/>
        <text x="638" y="242" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="'Exo 2',sans-serif" fontWeight="600" textAnchor="middle">Dubai</text>
      </svg>
    </div>
  );
}
