export function PolyBg({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const stroke = variant === 'dark' ? '#f9ca00' : '#0f0f0e'
  const opacity = variant === 'dark' ? 0.08 : 0.06
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', zIndex:0 }}
    >
      <polygon points="0,0 350,80 270,340 0,280" fill="none" stroke={stroke} strokeWidth="0.5" strokeOpacity={opacity}/>
      <polygon points="1080,0 1440,120 1440,380 1180,460" fill="none" stroke={stroke} strokeWidth="0.5" strokeOpacity={opacity * 0.85}/>
      <polygon points="500,500 820,400 940,700 280,700" fill="none" stroke={variant==='dark'?'#00c8ff':stroke} strokeWidth="0.4" strokeOpacity={opacity * 0.75}/>
      <circle cx="350" cy="80" r="2.5" fill={stroke} fillOpacity={opacity * 3}/>
      <circle cx="1180" cy="460" r="2" fill={stroke} fillOpacity={opacity * 2.5}/>
      <circle cx="820" cy="400" r="1.5" fill={variant==='dark'?'#00c8ff':stroke} fillOpacity={opacity * 2}/>
    </svg>
  )
}
