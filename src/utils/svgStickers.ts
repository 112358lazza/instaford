/**
 * High quality SVG vector stickers for the Ford Adventure Photobooth Editor
 */

export const SVG_STICKERS = {
  fordOval: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160" width="320" height="160">
    <defs>
      <linearGradient id="fordBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00469b"/>
        <stop offset="50%" stop-color="#002C6C"/>
        <stop offset="100%" stop-color="#001438"/>
      </linearGradient>
      <linearGradient id="chromeBorder" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="25%" stop-color="#95a5a6"/>
        <stop offset="50%" stop-color="#ffffff"/>
        <stop offset="75%" stop-color="#bdc3c7"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <ellipse cx="160" cy="80" rx="150" ry="72" fill="url(#chromeBorder)"/>
    <ellipse cx="160" cy="80" rx="142" ry="64" fill="#000000"/>
    <ellipse cx="160" cy="80" rx="138" ry="60" fill="url(#fordBlue)"/>
    <ellipse cx="160" cy="80" rx="130" ry="52" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.8"/>
    <text x="160" y="102" font-family="'Brush Script MT', 'Segoe Script', 'Inter', cursive, sans-serif" font-size="64" font-weight="bold" font-style="italic" fill="#ffffff" text-anchor="middle">Ford</text>
  </svg>`,

  fordPerformance: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 110" width="400" height="110">
    <defs>
      <linearGradient id="perfGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#002C6C"/>
        <stop offset="60%" stop-color="#001a40"/>
        <stop offset="60%" stop-color="#e74c3c"/>
        <stop offset="100%" stop-color="#c0392b"/>
      </linearGradient>
    </defs>
    <rect width="400" height="110" rx="14" fill="#0b0f19" stroke="#ffffff" stroke-width="2"/>
    <path d="M0,0 L240,0 L210,110 L0,110 Z" fill="#002C6C"/>
    <path d="M240,0 L400,0 L400,110 L210,110 Z" fill="#e74c3c"/>
    <text x="105" y="68" font-family="'Impact', 'Arial Black', sans-serif" font-size="44" fill="#ffffff" font-style="italic" letter-spacing="2">FORD</text>
    <text x="310" y="68" font-family="'Impact', 'Arial Black', sans-serif" font-size="28" fill="#ffffff" font-style="italic" letter-spacing="1" text-anchor="middle">PERFORMANCE</text>
  </svg>`,

  broncoWild: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" width="300" height="300">
    <defs>
      <linearGradient id="wildBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2d3436"/>
        <stop offset="100%" stop-color="#000000"/>
      </linearGradient>
      <linearGradient id="orangeGlow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FF5722"/>
        <stop offset="100%" stop-color="#E64A19"/>
      </linearGradient>
    </defs>
    <polygon points="150,15 285,90 285,210 150,285 15,210 15,90" fill="url(#wildBg)" stroke="#FF5722" stroke-width="8"/>
    <!-- Bucking Bronco Horse Silhouette -->
    <path d="M110,210 L125,180 L140,195 L145,160 L120,130 L135,115 L160,110 L185,90 L200,95 L190,115 L175,125 L185,150 L210,140 L220,165 L195,175 L180,210 L160,205 L155,180 L140,185 L130,210 Z" fill="#ffffff"/>
    <text x="150" y="65" font-family="'Impact', sans-serif" font-size="26" fill="#FF5722" text-anchor="middle" letter-spacing="3">BUILT WILD</text>
    <text x="150" y="255" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="4">BRONCO</text>
  </svg>`,

  raptorClaw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
    <defs>
      <linearGradient id="clawGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ff3838"/>
        <stop offset="50%" stop-color="#ff9f1a"/>
        <stop offset="100%" stop-color="#c56cf0"/>
      </linearGradient>
      <filter id="clawGlow">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <!-- Slash 1 -->
    <path d="M40,30 Q90,90 60,220 Q50,140 15,90 Z" fill="url(#clawGrad)" filter="url(#clawGlow)"/>
    <!-- Slash 2 (Center) -->
    <path d="M120,20 Q180,100 140,240 Q130,150 90,80 Z" fill="url(#clawGrad)" filter="url(#clawGlow)"/>
    <!-- Slash 3 -->
    <path d="M200,35 Q255,110 215,225 Q205,145 165,95 Z" fill="url(#clawGrad)" filter="url(#clawGlow)"/>
    <!-- Slash 4 Small -->
    <path d="M245,70 Q270,120 250,190 Q245,145 220,110 Z" fill="url(#clawGrad)" filter="url(#clawGlow)"/>
    <text x="130" y="255" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle" letter-spacing="3">RAPTOR</text>
  </svg>`,

  builtTough: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 240" width="300" height="240">
    <defs>
      <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#34495e"/>
        <stop offset="50%" stop-color="#1e272e"/>
        <stop offset="100%" stop-color="#0b0f19"/>
      </linearGradient>
    </defs>
    <path d="M150,10 L280,45 L280,140 Q280,210 150,235 Q20,210 20,140 L20,45 Z" fill="url(#shieldGrad)" stroke="#f1c40f" stroke-width="6"/>
    <path d="M150,22 L265,52 L265,135 Q265,198 150,220 Q35,198 35,135 L35,52 Z" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
    <text x="150" y="75" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" letter-spacing="3">BUILT</text>
    <!-- Ford Oval in center -->
    <ellipse cx="150" cy="115" rx="70" ry="32" fill="#002C6C" stroke="#ffffff" stroke-width="3"/>
    <text x="150" y="126" font-family="'Brush Script MT', cursive, sans-serif" font-size="34" font-weight="bold" font-style="italic" fill="#ffffff" text-anchor="middle">Ford</text>
    <text x="150" y="185" font-family="'Impact', sans-serif" font-size="30" fill="#f1c40f" text-anchor="middle" letter-spacing="4">TOUGH</text>
  </svg>`,

  trailRated: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
    <defs>
      <radialGradient id="metalBadge" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#747d8c"/>
        <stop offset="60%" stop-color="#2f3542"/>
        <stop offset="100%" stop-color="#1e2229"/>
      </radialGradient>
    </defs>
    <circle cx="120" cy="120" r="110" fill="url(#metalBadge)" stroke="#dcdde1" stroke-width="6"/>
    <circle cx="120" cy="120" r="95" fill="none" stroke="#e1b12c" stroke-width="3" stroke-dasharray="6,4"/>
    <text x="120" y="55" font-family="'Impact', sans-serif" font-size="22" fill="#e1b12c" text-anchor="middle" letter-spacing="2">TRAIL RATED</text>
    <!-- 4x4 Big Text -->
    <text x="120" y="135" font-family="'Impact', sans-serif" font-size="64" fill="#ffffff" text-anchor="middle">4x4</text>
    <!-- Mountain and trees silhouette -->
    <polygon points="60,180 95,145 120,165 155,135 185,180" fill="#e1b12c"/>
    <text x="120" y="208" font-family="'Impact', sans-serif" font-size="16" fill="#dcdde1" text-anchor="middle" letter-spacing="2">OFF-ROAD PASS</text>
  </svg>`,

  grizzlyBear: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width="260" height="260">
    <defs>
      <linearGradient id="bearGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f39c12"/>
        <stop offset="100%" stop-color="#d35400"/>
      </linearGradient>
    </defs>
    <circle cx="130" cy="130" r="115" fill="#1e272e" stroke="url(#bearGold)" stroke-width="6"/>
    <!-- Roaring Bear Profile Silhouette -->
    <path d="M70,160 Q60,120 90,85 Q115,55 145,70 Q160,50 180,65 Q205,80 215,115 Q235,130 220,150 L195,145 Q190,165 170,175 Q150,195 120,190 Q90,185 70,160 Z" fill="url(#bearGold)"/>
    <!-- Bear eye and open jaw details -->
    <polygon points="175,100 190,105 180,115" fill="#1e272e"/>
    <polygon points="185,140 195,130 205,145" fill="#ffffff"/>
    <polygon points="190,155 200,165 210,150" fill="#ffffff"/>
    <text x="130" y="225" font-family="'Impact', sans-serif" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="2">WILD ENCOUNTER</text>
  </svg>`,

  bearPaw: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
    <g fill="#2d3436" stroke="#000000" stroke-width="3">
      <!-- Main Palm Pad -->
      <path d="M60,120 Q110,90 160,120 Q180,170 140,195 Q110,205 80,195 Q40,170 60,120 Z" fill="#d35400"/>
      <!-- Claws & Toes -->
      <ellipse cx="45" cy="85" rx="16" ry="24" transform="rotate(-30 45 85)" fill="#d35400"/>
      <ellipse cx="80" cy="55" rx="16" ry="26" transform="rotate(-10 80 55)" fill="#d35400"/>
      <ellipse cx="125" cy="50" rx="16" ry="26" transform="rotate(10 125 50)" fill="#d35400"/>
      <ellipse cx="170" cy="70" rx="16" ry="24" transform="rotate(25 170 70)" fill="#d35400"/>
      <!-- Sharp Claws -->
      <path d="M30,55 Q40,65 42,75 Q32,70 30,55 Z" fill="#2d3436"/>
      <path d="M72,20 Q80,35 80,45 Q70,40 72,20 Z" fill="#2d3436"/>
      <path d="M125,15 Q130,30 128,40 Q120,35 125,15 Z" fill="#2d3436"/>
      <path d="M180,35 Q180,50 174,60 Q170,45 180,35 Z" fill="#2d3436"/>
    </g>
  </svg>`,

  vintageCompass: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
    <defs>
      <linearGradient id="needleNorth" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#e74c3c"/>
        <stop offset="100%" stop-color="#c0392b"/>
      </linearGradient>
      <linearGradient id="needleSouth" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ecf0f1"/>
        <stop offset="100%" stop-color="#bdc3c7"/>
      </linearGradient>
    </defs>
    <!-- Outer Compass Ring -->
    <circle cx="120" cy="120" r="105" fill="#1e272e" stroke="#f39c12" stroke-width="5"/>
    <circle cx="120" cy="120" r="92" fill="none" stroke="#7f8c8d" stroke-width="2" stroke-dasharray="4,6"/>
    <!-- Compass Rose Star (Secondary) -->
    <polygon points="120,40 130,110 200,120 130,130 120,200 110,130 40,120 110,110" fill="#34495e"/>
    <!-- Main Needle (North/South) -->
    <polygon points="120,30 132,120 120,115" fill="url(#needleNorth)"/>
    <polygon points="120,30 108,120 120,115" fill="#e74c3c"/>
    <polygon points="120,210 132,120 120,125" fill="url(#needleSouth)"/>
    <polygon points="120,210 108,120 120,125" fill="#bdc3c7"/>
    <circle cx="120" cy="120" r="10" fill="#f39c12"/>
    <circle cx="120" cy="120" r="4" fill="#1e272e"/>
    <!-- Cardinal Letters -->
    <text x="120" y="28" font-family="'Impact', sans-serif" font-size="20" fill="#e74c3c" text-anchor="middle">N</text>
    <text x="120" y="230" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">S</text>
    <text x="228" y="127" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">E</text>
    <text x="14" y="127" font-family="'Impact', sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">W</text>
  </svg>`,

  mudSplatter1: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 240" width="280" height="240">
    <g fill="#5d4037" opacity="0.9">
      <path d="M140,90 Q180,60 210,80 Q250,110 220,150 Q230,190 180,200 Q130,220 90,190 Q50,170 60,130 Q40,90 90,70 Q110,40 140,90 Z"/>
      <!-- Small Flying Splashes -->
      <circle cx="35" cy="50" r="12"/>
      <circle cx="65" cy="30" r="8"/>
      <circle cx="230" cy="40" r="14"/>
      <circle cx="260" cy="75" r="9"/>
      <circle cx="255" cy="180" r="11"/>
      <circle cx="220" cy="225" r="15"/>
      <circle cx="45" cy="210" r="10"/>
      <circle cx="15" cy="150" r="8"/>
      <circle cx="160" cy="20" r="7"/>
    </g>
  </svg>`,

  mudSplatter2: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180">
    <g fill="#4e342e" opacity="0.88">
      <ellipse cx="140" cy="90" rx="100" ry="45" transform="rotate(-15 140 90)"/>
      <circle cx="30" cy="120" r="15"/>
      <circle cx="60" cy="150" r="10"/>
      <circle cx="250" cy="60" r="16"/>
      <circle cx="220" cy="30" r="11"/>
      <circle cx="265" cy="110" r="12"/>
    </g>
  </svg>`,

  tireTracks: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 300" width="160" height="300">
    <g fill="#2d3436" opacity="0.85">
      <!-- Left Track V-Patterns -->
      <path d="M10,20 L45,45 L45,65 L10,40 Z"/>
      <path d="M60,45 L25,70 L25,90 L60,65 Z"/>
      <path d="M10,95 L45,120 L45,140 L10,115 Z"/>
      <path d="M60,120 L25,145 L25,165 L60,140 Z"/>
      <path d="M10,170 L45,195 L45,215 L10,190 Z"/>
      <path d="M60,195 L25,220 L25,240 L60,215 Z"/>
      <path d="M10,245 L45,270 L45,290 L10,265 Z"/>

      <!-- Right Track V-Patterns -->
      <path d="M100,20 L135,45 L135,65 L100,40 Z"/>
      <path d="M150,45 L115,70 L115,90 L150,65 Z"/>
      <path d="M100,95 L135,120 L135,140 L100,115 Z"/>
      <path d="M150,120 L115,145 L115,165 L150,140 Z"/>
      <path d="M100,170 L135,195 L135,215 L100,190 Z"/>
      <path d="M150,195 L115,220 L115,240 L150,215 Z"/>
      <path d="M100,245 L135,270 L135,290 L100,265 Z"/>
    </g>
  </svg>`,

  campfireSticker: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220">
    <defs>
      <linearGradient id="fireLog" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#5d4037"/>
        <stop offset="100%" stop-color="#3e2723"/>
      </linearGradient>
    </defs>
    <circle cx="110" cy="110" r="100" fill="#1b1c24" stroke="#ff793f" stroke-width="4"/>
    <!-- Logs -->
    <line x1="45" y1="165" x2="175" y2="135" stroke="url(#fireLog)" stroke-width="18" stroke-linecap="round"/>
    <line x1="45" y1="135" x2="175" y2="165" stroke="url(#fireLog)" stroke-width="18" stroke-linecap="round"/>
    <!-- Flame Shapes -->
    <path d="M70,145 Q110,40 115,135 Q135,30 150,145 Q110,80 70,145 Z" fill="#ff3838"/>
    <path d="M85,145 Q110,65 115,135 Q125,50 135,145 Q110,95 85,145 Z" fill="#ff9f1a"/>
    <path d="M98,145 Q110,85 115,135 Q120,80 125,145 Q110,105 98,145 Z" fill="#ffffff"/>
    <text x="110" y="200" font-family="'Impact', sans-serif" font-size="18" fill="#ff9f1a" text-anchor="middle" letter-spacing="2">BASECAMP</text>
  </svg>`,

  aviatorSunglasses: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 140" width="340" height="140">
    <defs>
      <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1e3799"/>
        <stop offset="50%" stop-color="#f8a5c2"/>
        <stop offset="100%" stop-color="#f5cd79"/>
      </linearGradient>
    </defs>
    <!-- Bridge & Top Bar -->
    <path d="M40,35 L300,35" stroke="#f1c40f" stroke-width="6" stroke-linecap="round"/>
    <path d="M140,55 Q170,45 200,55" fill="none" stroke="#f1c40f" stroke-width="5"/>
    <!-- Left Lens Frame -->
    <path d="M45,40 L145,40 Q150,110 95,120 Q40,110 45,40 Z" fill="url(#lensGrad)" stroke="#f1c40f" stroke-width="6"/>
    <!-- Right Lens Frame -->
    <path d="M195,40 L295,40 Q300,110 245,120 Q190,110 195,40 Z" fill="url(#lensGrad)" stroke="#f1c40f" stroke-width="6"/>
    <!-- Glare Lines -->
    <line x1="60" y1="50" x2="80" y2="105" stroke="#ffffff" stroke-width="4" opacity="0.6"/>
    <line x1="210" y1="50" x2="230" y2="105" stroke="#ffffff" stroke-width="4" opacity="0.6"/>
  </svg>`,

  stormChaser: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 140" width="280" height="140">
    <rect width="280" height="140" rx="16" fill="#130f40" stroke="#f0932b" stroke-width="4"/>
    <!-- Lightning Bolt -->
    <polygon points="50,15 30,70 55,70 35,125 85,55 60,55" fill="#f6e58d" stroke="#f0932b" stroke-width="2"/>
    <text x="165" y="55" font-family="'Impact', sans-serif" font-size="28" fill="#f0932b" text-anchor="middle" letter-spacing="1">STORM</text>
    <text x="165" y="95" font-family="'Impact', sans-serif" font-size="34" fill="#ffffff" text-anchor="middle" letter-spacing="2">CHASER</text>
    <text x="165" y="122" font-family="'Impact', sans-serif" font-size="14" fill="#7ed6df" text-anchor="middle" letter-spacing="3">MOAB 4X4 EXPEDITION</text>
  </svg>`,

  standBadge2026: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120" width="320" height="120">
    <defs>
      <linearGradient id="badgeGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#002C6C"/>
        <stop offset="100%" stop-color="#001438"/>
      </linearGradient>
    </defs>
    <rect width="320" height="120" rx="20" fill="url(#badgeGrad)" stroke="#00d2d3" stroke-width="4"/>
    <circle cx="50" cy="60" r="28" fill="#00d2d3"/>
    <text x="50" y="68" font-family="'Impact', sans-serif" font-size="22" fill="#002C6C" text-anchor="middle">LIVE</text>
    <text x="180" y="50" font-family="'Impact', sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" letter-spacing="2">FORD EXPERIENCE</text>
    <text x="180" y="85" font-family="'Impact', sans-serif" font-size="28" fill="#00d2d3" text-anchor="middle" letter-spacing="3">STAND 2026</text>
  </svg>`,

  exploreMore: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 180" width="260" height="180">
    <!-- Mountain Background -->
    <polygon points="20,140 80,40 140,110 180,60 240,140" fill="#2d3436"/>
    <polygon points="80,40 60,75 80,85 100,70" fill="#ffffff"/>
    <polygon points="180,60 165,85 180,95 195,85" fill="#ffffff"/>
    <path d="M10,140 L250,140" stroke="#f39c12" stroke-width="6"/>
    <text x="130" y="170" font-family="'Impact', sans-serif" font-size="26" fill="#f39c12" text-anchor="middle" letter-spacing="4">EXPLORE MORE</text>
  </svg>`
};

export function getStickerSvgDataUri(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
}
