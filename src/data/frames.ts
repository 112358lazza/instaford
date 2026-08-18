import { FrameItem } from '../types';

export const FRAMES: FrameItem[] = [
  {
    id: 'none',
    name: 'Nessuna Cornice',
    description: 'Nessun overlay',
    styleName: 'Clean',
    overlaySvg: ''
  },
  {
    id: 'ford-adventure-tour',
    name: 'Adventure Tour 2026',
    description: 'Bordo expedition ufficiale con badge Ford Stand',
    styleName: 'Official',
    overlaySvg: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
        <!-- Top Header Banner -->
        <defs>
          <linearGradient id="topBannerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="bottomBannerGrad" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#000000" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>
        </defs>

        <!-- Top Gradient -->
        <rect width="1080" height="280" fill="url(#topBannerGrad)"/>

        <!-- Top Header Content -->
        <g transform="translate(60, 80)">
          <!-- Ford Oval Logo -->
          <ellipse cx="60" cy="30" rx="50" ry="24" fill="#002C6C" stroke="#ffffff" stroke-width="2"/>
          <text x="60" y="38" font-family="'Brush Script MT', cursive, sans-serif" font-size="28" font-weight="bold" font-style="italic" fill="#ffffff" text-anchor="middle">Ford</text>
          
          <text x="130" y="24" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" letter-spacing="2">ADVENTURE TOUR</text>
          <text x="130" y="46" font-family="'Inter', sans-serif" font-size="14" font-weight="600" fill="#00d2d3" letter-spacing="3">OFFICIAL STAND EXPERIENCE 2026</text>
        </g>

        <!-- Viewfinder Focus Corners -->
        <g stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7">
          <path d="M 60 360 L 60 300 L 120 300"/>
          <path d="M 1020 360 L 1020 300 L 960 300"/>
          <path d="M 60 1560 L 60 1620 L 120 1620"/>
          <path d="M 1020 1560 L 1020 1620 L 960 1620"/>
        </g>

        <!-- Bottom Gradient -->
        <rect y="1640" width="1080" height="280" fill="url(#bottomBannerGrad)"/>

        <!-- Bottom Footer Content -->
        <g transform="translate(60, 1780)">
          <!-- GPS Coordinates -->
          <text x="0" y="20" font-family="'Courier New', monospace" font-size="16" fill="#ecf0f1" letter-spacing="2">N 45° 27' 51" | E 9° 11' 22" • ELEVATION 2,450M</text>
          <text x="0" y="55" font-family="'Impact', sans-serif" font-size="34" fill="#FF4A00" letter-spacing="2">BRONCO & RAPTOR 4x4</text>
          <!-- Right Hashtag -->
          <text x="960" y="55" font-family="'Impact', sans-serif" font-size="26" fill="#ffffff" text-anchor="end" letter-spacing="1">#FORDOUTDOORS</text>
        </g>
      </svg>
    `)}`
  },
  {
    id: 'built-wild-inclinometer',
    name: 'Built Wild 4x4 HUD',
    description: 'Inclinometro fuoristrada, altitudine e bordi rugged',
    styleName: 'Rugged',
    overlaySvg: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
        <defs>
          <linearGradient id="topHUD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0b0f19" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#0b0f19" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="botHUD" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stop-color="#0b0f19" stop-opacity="0.92"/>
            <stop offset="100%" stop-color="#0b0f19" stop-opacity="0"/>
          </linearGradient>
        </defs>

        <rect width="1080" height="240" fill="url(#topHUD)"/>
        <rect y="1660" width="1080" height="260" fill="url(#botHUD)"/>

        <!-- Top Off-Road Inclinometer HUD -->
        <g transform="translate(60, 60)">
          <!-- Left Pitch Meter -->
          <rect x="0" y="0" width="140" height="60" rx="8" fill="#1e272e" stroke="#FF5722" stroke-width="2"/>
          <text x="70" y="24" font-family="'Inter', sans-serif" font-size="12" fill="#a4b0be" text-anchor="middle">PITCH</text>
          <text x="70" y="48" font-family="'Impact', sans-serif" font-size="24" fill="#FF5722" text-anchor="middle">+ 28°</text>

          <!-- Center Built Wild Badge -->
          <text x="480" y="32" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" text-anchor="middle" letter-spacing="4">BUILT WILD™</text>
          <text x="480" y="52" font-family="'Inter', sans-serif" font-size="12" font-weight="bold" fill="#2ed573" text-anchor="middle" letter-spacing="3">4L LOCK ENGAGED</text>

          <!-- Right Roll Meter -->
          <rect x="820" y="0" width="140" height="60" rx="8" fill="#1e272e" stroke="#FF5722" stroke-width="2"/>
          <text x="890" y="24" font-family="'Inter', sans-serif" font-size="12" fill="#a4b0be" text-anchor="middle">ROLL</text>
          <text x="890" y="48" font-family="'Impact', sans-serif" font-size="24" fill="#FF5722" text-anchor="middle">14°</text>
        </g>

        <!-- Grid Lines & Level Indicators -->
        <line x1="50" y1="960" x2="180" y2="960" stroke="#FF5722" stroke-width="3" opacity="0.7"/>
        <line x1="900" y1="960" x2="1030" y2="960" stroke="#FF5722" stroke-width="3" opacity="0.7"/>
        <circle cx="540" cy="960" r="14" fill="none" stroke="#FF5722" stroke-width="2" opacity="0.5"/>
        <line x1="540" y1="930" x2="540" y2="990" stroke="#FF5722" stroke-width="1.5" opacity="0.5"/>
        <line x1="510" y1="960" x2="570" y2="960" stroke="#FF5722" stroke-width="1.5" opacity="0.5"/>

        <!-- Bottom Status -->
        <g transform="translate(60, 1800)">
          <text x="0" y="40" font-family="'Impact', sans-serif" font-size="36" fill="#ffffff" letter-spacing="2">FORD BRONCO EXTREME</text>
          <text x="960" y="40" font-family="'Impact', sans-serif" font-size="28" fill="#FF5722" text-anchor="end" letter-spacing="1">G.O.A.T. MODES™</text>
        </g>
      </svg>
    `)}`
  },
  {
    id: 'raptor-baja-racing',
    name: 'Raptor Baja Racing',
    description: 'Stile telemetry da gara e accenti Ford Performance',
    styleName: 'Racing',
    overlaySvg: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
        <defs>
          <linearGradient id="carbonBorder" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ff3838"/>
            <stop offset="50%" stop-color="#002C6C"/>
            <stop offset="100%" stop-color="#1e272e"/>
          </linearGradient>
          <linearGradient id="darkVignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#000000" stop-opacity="0.85"/>
            <stop offset="15%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="85%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.9"/>
          </linearGradient>
        </defs>

        <rect width="1080" height="1920" fill="url(#darkVignette)"/>

        <!-- Top Red Racing Accent Line -->
        <path d="M0,0 L1080,0 L1080,18 L0,18 Z" fill="#ff3838"/>
        <polygon points="0,18 340,18 300,70 0,70" fill="#002C6C"/>
        <text x="40" y="54" font-family="'Impact', sans-serif" font-size="32" fill="#ffffff" font-style="italic" letter-spacing="2">FORD PERFORMANCE</text>

        <!-- Top Right Telemetry -->
        <g transform="translate(820, 45)">
          <text x="200" y="25" font-family="'Impact', sans-serif" font-size="28" fill="#ff9f1a" text-anchor="end">BAJA MODE</text>
          <text x="200" y="48" font-family="'Courier New', monospace" font-size="14" fill="#ffffff" text-anchor="end">FOX RACING SHOX</text>
        </g>

        <!-- Bottom Racing Banner -->
        <path d="M0,1850 L1080,1850 L1080,1920 L0,1920 Z" fill="#0b0f19"/>
        <path d="M0,1844 L1080,1844 L1080,1850 L0,1850 Z" fill="#ff3838"/>
        <g transform="translate(60, 1895)">
          <text x="0" y="0" font-family="'Impact', sans-serif" font-size="38" fill="#ffffff" font-style="italic" letter-spacing="3">RAPTOR</text>
          <text x="160" y="-3" font-family="'Inter', sans-serif" font-size="16" font-weight="bold" fill="#ff3838" letter-spacing="2">DESERT TEST PROTOCOL</text>
          <text x="960" y="0" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="end" letter-spacing="1">LIVE STAND 2026</text>
        </g>
      </svg>
    `)}`
  },
  {
    id: 'vignette-cinematic',
    name: 'Cinematic Vignette',
    description: 'Vignettatura cinema per risaltare il soggetto',
    styleName: 'Cinema',
    overlaySvg: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
        <defs>
          <radialGradient id="vignetteRad" cx="50%" cy="50%" r="65%">
            <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="85%" stop-color="#000000" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
          </radialGradient>
        </defs>
        <rect width="1080" height="1920" fill="url(#vignetteRad)"/>
      </svg>
    `)}`
  }
];
