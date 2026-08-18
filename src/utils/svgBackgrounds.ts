/**
 * SVG Background generators for Ford 4x4 Adventure Scenarios (9:16 aspect ratio, 1080x1920 native scale)
 */

export function generateForestBearScenarioSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Sky & Fog Gradients -->
    <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f2027"/>
      <stop offset="35%" stop-color="#203a43"/>
      <stop offset="70%" stop-color="#2c5364"/>
      <stop offset="100%" stop-color="#698579"/>
    </linearGradient>
    <linearGradient id="fogGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b0c4de" stop-opacity="0.6"/>
      <stop offset="60%" stop-color="#d4e4e7" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#e0ebd8" stop-opacity="0"/>
    </linearGradient>
    <!-- Sunrise Sun Glow -->
    <radialGradient id="sunGlow" cx="45%" cy="32%" r="40%">
      <stop offset="0%" stop-color="#ffeaa7" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#fab1a0" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#ff7675" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#2c5364" stop-opacity="0"/>
    </radialGradient>
    <!-- Bronco Headlight Beam -->
    <linearGradient id="headlightBeam" x1="0" y1="0.5" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="25%" stop-color="#dff9fb" stop-opacity="0.6"/>
      <stop offset="70%" stop-color="#c7ecee" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="blurFog">
      <feGaussianBlur stdDeviation="12" />
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Base Sky -->
  <rect width="1080" height="1920" fill="url(#skyGrad1)"/>
  
  <!-- Sunrise ambient circle -->
  <rect x="0" y="0" width="1080" height="900" fill="url(#sunGlow)"/>

  <!-- Distant Mountain Range -->
  <polygon points="0,750 180,620 340,710 520,580 720,680 900,540 1080,660 1080,1200 0,1200" fill="#1b2a32" opacity="0.8"/>
  <polygon points="0,850 220,740 460,820 680,720 920,800 1080,730 1080,1300 0,1300" fill="#16252b" opacity="0.9"/>

  <!-- Midground Pine Trees Layer 1 (Foggy) -->
  <g fill="#1a332f" opacity="0.75" filter="url(#blurFog)">
    <path d="M60,950 L110,720 L160,950 Z M140,960 L190,750 L240,960 Z M280,980 L330,700 L380,980 Z M700,960 L750,710 L800,960 Z M820,980 L880,690 L940,980 Z"/>
  </g>

  <!-- Atmospheric Fog Layer -->
  <rect y="650" width="1080" height="600" fill="url(#fogGrad)" filter="url(#blurFog)"/>

  <!-- Curious Grizzly Bear in the background forest -->
  <g transform="translate(680, 820) scale(0.9)" opacity="0.92">
    <!-- Bear Body & Silhouette -->
    <ellipse cx="140" cy="190" rx="90" ry="70" fill="#121d19"/>
    <!-- Bear Head & Snout -->
    <circle cx="210" cy="140" r="42" fill="#121d19"/>
    <path d="M210,135 Q260,145 255,165 Q235,180 205,175 Z" fill="#1a2822"/>
    <circle cx="245" cy="148" r="7" fill="#080c0a"/>
    <!-- Bear Ears -->
    <circle cx="190" cy="108" r="14" fill="#121d19"/>
    <circle cx="218" cy="112" r="12" fill="#121d19"/>
    <!-- Bear Legs -->
    <rect x="70" y="210" width="38" height="90" rx="14" fill="#121d19"/>
    <rect x="130" y="220" width="36" height="85" rx="14" fill="#121d19"/>
    <rect x="180" y="215" width="40" height="95" rx="14" fill="#121d19"/>
    <!-- Curious Eye reflection -->
    <circle cx="225" cy="138" r="3" fill="#ffeaa7" opacity="0.9"/>
  </g>

  <!-- Dense Pine Forest Midground -->
  <g fill="#0e231c">
    <polygon points="50,1200 90,880 130,1200"/>
    <polygon points="110,1200 160,840 210,1200"/>
    <polygon points="180,1230 240,810 300,1230"/>
    <polygon points="780,1220 840,820 900,1220"/>
    <polygon points="860,1200 930,850 1000,1200"/>
    <polygon points="960,1240 1020,870 1080,1240"/>
  </g>

  <!-- Ground / Mud & Offroad Trail -->
  <path d="M0,1180 Q350,1120 700,1160 Q950,1180 1080,1140 L1080,1920 L0,1920 Z" fill="#192219"/>
  <path d="M0,1320 Q400,1280 800,1340 L1080,1310 L1080,1920 L0,1920 Z" fill="#131a13"/>
  <path d="M0,1500 Q540,1460 1080,1500 L1080,1920 L0,1920 Z" fill="#0d120d"/>

  <!-- Ford Bronco 4x4 (Left/Mid-ground angled with glowing LED Matrix Lights) -->
  <g transform="translate(60, 1020) scale(1.15)">
    <!-- Shadow under vehicle -->
    <ellipse cx="260" cy="340" rx="250" ry="40" fill="#050806" opacity="0.85"/>
    
    <!-- Giant All-Terrain Off-Road Tires -->
    <circle cx="110" cy="290" r="62" fill="#111417"/>
    <circle cx="110" cy="290" r="42" fill="#2d3436"/>
    <circle cx="110" cy="290" r="22" fill="#1a1d20"/>
    <circle cx="410" cy="290" r="62" fill="#111417"/>
    <circle cx="410" cy="290" r="42" fill="#2d3436"/>
    <circle cx="410" cy="290" r="22" fill="#1a1d20"/>

    <!-- Rugged Suspension & Chassis -->
    <rect x="130" y="270" width="260" height="24" rx="6" fill="#1e272e"/>
    
    <!-- Ford Bronco Cyber Orange / Eruption Green Body -->
    <path d="M60,250 L80,160 L160,150 L200,90 L380,90 L440,150 L480,190 L480,260 L450,270 L390,260 L130,260 Z" fill="#d35400"/>
    <!-- Black Hardtop Roof & Pillars -->
    <path d="M190,95 L375,95 L430,150 L165,150 Z" fill="#151719"/>
    <!-- Tinted Adventure Windows -->
    <polygon points="205,105 275,105 275,145 180,145" fill="#34495e" opacity="0.9"/>
    <polygon points="285,105 365,105 410,145 285,145" fill="#34495e" opacity="0.9"/>

    <!-- Bronco Signature Round Headlight & LED Lightbar -->
    <!-- Left Round Headlamp with Halo Ring -->
    <circle cx="455" cy="205" r="16" fill="#ffffff" filter="url(#softGlow)"/>
    <circle cx="455" cy="205" r="22" fill="none" stroke="#ffeaa7" stroke-width="4" filter="url(#softGlow)"/>
    <rect x="440" y="202" width="30" height="5" fill="#ffffff" filter="url(#softGlow)"/>

    <!-- Roof LED Lightbar (Blazing High Power) -->
    <rect x="220" y="78" width="140" height="10" rx="3" fill="#ffffff" filter="url(#softGlow)"/>

    <!-- Heavy Duty Metal Bumper & Recovery Winch -->
    <rect x="440" y="250" width="55" height="30" rx="6" fill="#2d3436"/>
    <circle cx="465" cy="265" r="8" fill="#e74c3c"/>

    <!-- BRONCO Grille Text Emblem -->
    <rect x="445" y="228" width="32" height="14" rx="2" fill="#111111"/>
    <text x="447" y="239" font-family="'Impact', sans-serif" font-size="9" fill="#ffffff" letter-spacing="1">FORD</text>
  </g>

  <!-- Blinding Headlight Beams piercing through forest morning fog -->
  <polygon points="590,1250 1080,1180 1080,1650 590,1320" fill="url(#headlightBeam)" filter="url(#blurFog)" opacity="0.75"/>
  <polygon points="390,1110 1080,980 1080,1450 420,1130" fill="url(#headlightBeam)" filter="url(#blurFog)" opacity="0.45"/>

  <!-- Foreground Dark Pine Branches & Rocks for Depth of Field -->
  <g fill="#070a08">
    <path d="M0,1650 Q200,1600 350,1750 Q100,1920 0,1920 Z"/>
    <path d="M850,1750 Q980,1600 1080,1680 L1080,1920 L750,1920 Z"/>
  </g>

  <!-- Ambient Morning Light Sparkles -->
  <circle cx="560" cy="1220" r="6" fill="#ffffff" opacity="0.8" filter="url(#softGlow)"/>
  <circle cx="680" cy="1150" r="4" fill="#ffffff" opacity="0.6"/>
  <circle cx="820" cy="1280" r="5" fill="#ffeaa7" opacity="0.7"/>
</svg>`;
}

export function generateMountainBaseCampScenarioSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Sunset Alpine Sky Gradient -->
    <linearGradient id="alpineSunset" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#191942"/>
      <stop offset="30%" stop-color="#4a1c4e"/>
      <stop offset="55%" stop-color="#a03248"/>
      <stop offset="75%" stop-color="#e25f38"/>
      <stop offset="90%" stop-color="#f8a348"/>
      <stop offset="100%" stop-color="#fcd077"/>
    </linearGradient>
    <radialGradient id="sunBurst" cx="65%" cy="60%" r="50%">
      <stop offset="0%" stop-color="#fff5cc" stop-opacity="1"/>
      <stop offset="25%" stop-color="#f8a348" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#a03248" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#191942" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="snowGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fcd077" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#e25f38" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#2a2035" stop-opacity="0.8"/>
    </linearGradient>
    <!-- Warm Campfire Glow -->
    <radialGradient id="campfireLight" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffdd59" stop-opacity="1"/>
      <stop offset="40%" stop-color="#ff5e3a" stop-opacity="0.7"/>
      <stop offset="80%" stop-color="#c0392b" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>
    <filter id="campGlow">
      <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Sky -->
  <rect width="1080" height="1920" fill="url(#alpineSunset)"/>
  <rect width="1080" height="1200" fill="url(#sunBurst)"/>

  <!-- Distant Alpine Mountain Peaks (Snow-Capped Dolomites) -->
  <polygon points="0,950 140,680 260,820 420,550 580,780 720,520 890,750 1080,610 1080,1300 0,1300" fill="#3b1b36"/>
  <!-- Mountain Snow Highlights -->
  <polygon points="420,550 370,640 430,680 480,620" fill="url(#snowGlow)"/>
  <polygon points="720,520 660,630 735,660 780,600" fill="url(#snowGlow)"/>
  <polygon points="140,680 90,760 160,780 180,730" fill="url(#snowGlow)"/>

  <!-- Mid-distance Cliff Ridge -->
  <polygon points="0,1080 320,920 640,1040 1080,880 1080,1450 0,1450" fill="#251624"/>
  <polygon points="0,1180 450,1020 850,1140 1080,1060 1080,1600 0,1600" fill="#1b101b"/>

  <!-- Cliff Edge & Basecamp Rocky Plateau -->
  <path d="M0,1350 Q480,1220 1080,1280 L1080,1920 L0,1920 Z" fill="#150d18"/>
  <path d="M0,1480 Q600,1380 1080,1420 L1080,1920 L0,1920 Z" fill="#0d080f"/>

  <!-- Ford 4x4 Expedition Vehicle with Open Rooftop Tent (Right side) -->
  <g transform="translate(480, 1080) scale(1.1)">
    <!-- Shadow -->
    <ellipse cx="260" cy="310" rx="230" ry="35" fill="#050306" opacity="0.9"/>

    <!-- Rugged Wheels -->
    <circle cx="110" cy="270" r="55" fill="#111115"/>
    <circle cx="110" cy="270" r="36" fill="#303338"/>
    <circle cx="110" cy="270" r="18" fill="#1a1a1f"/>
    <circle cx="390" cy="270" r="55" fill="#111115"/>
    <circle cx="390" cy="270" r="36" fill="#303338"/>
    <circle cx="390" cy="270" r="18" fill="#1a1a1f"/>

    <!-- Ford Ranger / Bronco Raptor Velocity Blue Body -->
    <path d="M60,240 L75,160 L150,150 L190,100 L370,100 L430,150 L470,190 L470,250 L420,255 L360,250 L135,250 Z" fill="#003580"/>
    
    <!-- Roof Rack System -->
    <rect x="180" y="88" width="200" height="12" rx="3" fill="#1e272e"/>
    
    <!-- Rooftop Expedition Tent (Open Triangle / Shell) -->
    <!-- Tent Base Platform -->
    <rect x="150" y="75" width="260" height="15" rx="3" fill="#2d3436"/>
    <!-- Tent Canvas Body (Tan / Sandstorm) -->
    <polygon points="170,75 280,-40 400,75" fill="#c79c5e"/>
    <!-- Tent Open Window / Entrance with Warm Light Inside -->
    <polygon points="210,75 280,0 350,75" fill="#ffdd59" opacity="0.9" filter="url(#campGlow)"/>
    <polygon points="230,75 280,18 330,75" fill="#1e272e" opacity="0.4"/>
    <!-- Ladder to Rooftop Tent -->
    <line x1="165" y1="85" x2="135" y2="280" stroke="#7f8c8d" stroke-width="4"/>
    <line x1="185" y1="85" x2="155" y2="280" stroke="#7f8c8d" stroke-width="4"/>
    <line x1="160" y1="120" x2="180" y2="120" stroke="#7f8c8d" stroke-width="3"/>
    <line x1="155" y1="160" x2="175" y2="160" stroke="#7f8c8d" stroke-width="3"/>
    <line x1="150" y1="200" x2="170" y2="200" stroke="#7f8c8d" stroke-width="3"/>
    <line x1="145" y1="240" x2="165" y2="240" stroke="#7f8c8d" stroke-width="3"/>

    <!-- LED Tail light / Side Marker Glow -->
    <circle cx="68" cy="195" r="10" fill="#ff3838" filter="url(#campGlow)"/>

    <!-- Ford Performance Decal on side door -->
    <text x="210" y="210" font-family="'Impact', sans-serif" font-size="14" fill="#ffffff" opacity="0.8" letter-spacing="2">RAPTOR</text>
  </g>

  <!-- Cozy Outdoor Campfire in Front Ground -->
  <g transform="translate(180, 1550)">
    <!-- Ambient Light Circle on Ground -->
    <ellipse cx="60" cy="50" rx="160" ry="60" fill="url(#campfireLight)"/>
    <!-- Fire Pit Stones -->
    <circle cx="20" cy="50" r="16" fill="#2d3436"/>
    <circle cx="55" cy="62" r="18" fill="#3d4446"/>
    <circle cx="95" cy="52" r="16" fill="#2d3436"/>
    <circle cx="75" cy="38" r="14" fill="#3d4446"/>
    <circle cx="35" cy="38" r="15" fill="#2d3436"/>
    <!-- Fire Logs -->
    <line x1="15" y1="60" x2="105" y2="35" stroke="#4b2e18" stroke-width="12" stroke-linecap="round"/>
    <line x1="15" y1="35" x2="105" y2="60" stroke="#3e2311" stroke-width="12" stroke-linecap="round"/>
    <!-- Blazing Campfire Flames -->
    <path d="M40,50 Q60,-20 65,45 Q75,-40 85,50 Q60,10 40,50 Z" fill="#ff4d4d" filter="url(#campGlow)"/>
    <path d="M48,50 Q60,-5 63,45 Q70,-20 78,50 Q60,20 48,50 Z" fill="#ffa502" filter="url(#campGlow)"/>
    <path d="M54,50 Q60,10 63,45 Q66,5 72,50 Z" fill="#ffffff" filter="url(#campGlow)"/>
    <!-- Embers & Sparks Floating -->
    <circle cx="65" cy="-60" r="2.5" fill="#ffdd59"/>
    <circle cx="80" cy="-90" r="2" fill="#ffa502"/>
    <circle cx="50" cy="-120" r="2" fill="#ffdd59"/>
    <circle cx="95" cy="-140" r="1.5" fill="#ff6b81"/>
  </g>

  <!-- Stars in Upper Night Sky -->
  <g fill="#ffffff" opacity="0.8">
    <circle cx="120" cy="150" r="2"/>
    <circle cx="320" cy="90" r="1.5"/>
    <circle cx="520" cy="220" r="2"/>
    <circle cx="780" cy="130" r="2.5"/>
    <circle cx="940" cy="80" r="1.5"/>
    <circle cx="860" cy="280" r="2"/>
    <circle cx="210" cy="310" r="1.5"/>
  </g>
</svg>`;
}

export function generateMoabStormScenarioSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Dramatic Thunderstorm Sky -->
    <linearGradient id="stormSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0e1a"/>
      <stop offset="25%" stop-color="#18233c"/>
      <stop offset="55%" stop-color="#2d3d54"/>
      <stop offset="80%" stop-color="#4a3735"/>
      <stop offset="100%" stop-color="#693026"/>
    </linearGradient>
    <!-- Lightning Flash Glow -->
    <linearGradient id="lightningGlow" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="#dff9fb" stop-opacity="1"/>
      <stop offset="50%" stop-color="#7ed6df" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#22a6b3" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="lightningFlash" cx="50%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
      <stop offset="30%" stop-color="#70a1ff" stop-opacity="0.4"/>
      <stop offset="80%" stop-color="#1e272e" stop-opacity="0"/>
    </radialGradient>
    <!-- Moab Red Rock Sandstone Gradient -->
    <linearGradient id="redRockGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#b33939"/>
      <stop offset="50%" stop-color="#cd6133"/>
      <stop offset="100%" stop-color="#4b1e16"/>
    </linearGradient>
    <filter id="boltGlow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Storm Sky -->
  <rect width="1080" height="1920" fill="url(#stormSky)"/>
  <rect width="1080" height="900" fill="url(#lightningFlash)"/>

  <!-- Dramatic Lightning Bolt 1 (Massive Strike) -->
  <path d="M480,0 L460,180 L520,240 L440,420 L500,490 L380,720 L420,780 L350,960" fill="none" stroke="#ffffff" stroke-width="7" filter="url(#boltGlow)"/>
  <path d="M480,0 L460,180 L520,240 L440,420 L500,490 L380,720 L420,780 L350,960" fill="none" stroke="#70a1ff" stroke-width="16" opacity="0.6" filter="url(#boltGlow)"/>
  <!-- Branching Lightning -->
  <path d="M460,180 L400,280 L430,340" fill="none" stroke="#ffffff" stroke-width="3" filter="url(#boltGlow)"/>
  <path d="M500,490 L580,590 L550,670" fill="none" stroke="#ffffff" stroke-width="3.5" filter="url(#boltGlow)"/>

  <!-- Storm Clouds Silhouettes -->
  <path d="M0,450 Q200,320 450,420 Q700,310 950,430 Q1050,480 1080,520 L1080,1000 L0,1000 Z" fill="#141a29" opacity="0.75"/>
  <path d="M0,580 Q300,460 620,560 Q850,470 1080,590 L1080,1200 L0,1200 Z" fill="#1b1c2b" opacity="0.85"/>

  <!-- Moab Iconic Red Rock Buttes & Arches (Utah) -->
  <!-- Distant Butte -->
  <polygon points="120,880 200,690 380,690 440,880" fill="#59251d"/>
  <polygon points="680,850 780,640 980,640 1040,850" fill="#501f18"/>
  
  <!-- Midground Canyon Walls & Arches Plateau -->
  <path d="M0,1050 L280,920 L500,980 L760,890 L1080,990 L1080,1400 L0,1400 Z" fill="url(#redRockGrad)"/>

  <!-- Foreground Moab Slickrock Slab (4x4 Rock Crawling Arena) -->
  <path d="M0,1280 Q450,1160 850,1240 L1080,1200 L1080,1920 L0,1920 Z" fill="#8c2a1c"/>
  <path d="M0,1420 Q520,1320 1080,1380 L1080,1920 L0,1920 Z" fill="#5e1910"/>
  <path d="M0,1600 Q400,1500 1080,1560 L1080,1920 L0,1920 Z" fill="#3b0f0a"/>

  <!-- Ford Bronco / F-150 Raptor conquering the 45-degree rock climb -->
  <g transform="translate(180, 1160) rotate(-14) scale(1.15)">
    <!-- Shadow -->
    <ellipse cx="280" cy="310" rx="250" ry="38" fill="#1a0503" opacity="0.9"/>

    <!-- Massive Beadlock Rock Crawling Tires (Mud / Rock Grip) -->
    <circle cx="110" cy="260" r="66" fill="#111111"/>
    <circle cx="110" cy="260" r="44" fill="#303952"/>
    <circle cx="110" cy="260" r="22" fill="#d35400"/>
    <circle cx="430" cy="260" r="66" fill="#111111"/>
    <circle cx="430" cy="260" r="44" fill="#303952"/>
    <circle cx="430" cy="260" r="22" fill="#d35400"/>

    <!-- Rock Sliders & Steel Skid Plates -->
    <rect x="150" y="265" width="240" height="18" rx="4" fill="#2d3436"/>

    <!-- Ford Agate Black / Race Red Heavy Duty Body -->
    <path d="M50,230 L70,140 L160,130 L210,70 L390,70 L460,130 L510,180 L510,250 L460,255 L380,240 L130,240 Z" fill="#c0392b"/>
    <!-- Carbon / Matte Black Hood & Roof -->
    <path d="M195,75 L385,75 L450,130 L160,130 Z" fill="#1e272e"/>
    
    <!-- LED Rock Lights Glowing under vehicle (Amber / Cyan) -->
    <ellipse cx="270" cy="275" rx="140" ry="25" fill="#f39c12" opacity="0.7" filter="url(#boltGlow)"/>

    <!-- Front Rigid LED Spotlights piercing rain -->
    <circle cx="490" cy="190" r="16" fill="#ffffff" filter="url(#boltGlow)"/>
    <rect x="475" y="185" width="30" height="8" fill="#ffffff" filter="url(#boltGlow)"/>

    <!-- Snorkel Air Intake for extreme conditions -->
    <path d="M190,130 L190,50 L170,40" fill="none" stroke="#2d3436" stroke-width="12" stroke-linecap="round"/>

    <!-- FORD RAPTOR Grille / Side Badge -->
    <text x="240" y="195" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" letter-spacing="2">BUILT TOUGH</text>
  </g>

  <!-- Heavy Rain Streaks & Lightning Storm Atmosphere -->
  <g stroke="#ffffff" stroke-width="1.5" opacity="0.3" stroke-linecap="round">
    <line x1="80" y1="200" x2="50" y2="400"/>
    <line x1="280" y1="350" x2="250" y2="550"/>
    <line x1="480" y1="180" x2="450" y2="380"/>
    <line x1="680" y1="420" x2="650" y2="620"/>
    <line x1="880" y1="250" x2="850" y2="450"/>
    <line x1="180" y1="800" x2="150" y2="1000"/>
    <line x1="580" y1="900" x2="550" y2="1100"/>
    <line x1="880" y1="850" x2="850" y2="1050"/>
  </g>
</svg>`;
}

export function generateDuneSafariScenarioSvg(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1920" width="1080" height="1920">
  <defs>
    <!-- Desert Golden Sun Sky -->
    <linearGradient id="duneSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0984e3"/>
      <stop offset="40%" stop-color="#74b9ff"/>
      <stop offset="70%" stop-color="#ffeaa7"/>
      <stop offset="100%" stop-color="#fdcb6e"/>
    </linearGradient>
    <radialGradient id="highSun" cx="75%" cy="25%" r="35%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
      <stop offset="35%" stop-color="#ffeaa7" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#fab1a0" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#74b9ff" stop-opacity="0"/>
    </radialGradient>
    <!-- Golden Sand Dunes Gradient -->
    <linearGradient id="sandSun" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffeaa7"/>
      <stop offset="50%" stop-color="#e17055"/>
      <stop offset="100%" stop-color="#d63031"/>
    </linearGradient>
    <filter id="dustBlur">
      <feGaussianBlur stdDeviation="20" />
    </filter>
  </defs>

  <!-- Sky & Blazing Desert Sun -->
  <rect width="1080" height="1920" fill="url(#duneSky)"/>
  <rect width="1080" height="900" fill="url(#highSun)"/>

  <!-- Distant Desert Mirage Mountains -->
  <polygon points="0,950 250,820 520,910 780,780 1080,880 1080,1200 0,1200" fill="#d35400" opacity="0.5"/>

  <!-- Majestic Flowing Sand Dunes (Baja California / Sahara) -->
  <path d="M0,1050 Q420,880 820,1040 Q980,1100 1080,1020 L1080,1500 L0,1500 Z" fill="#e67e22"/>
  <path d="M0,1180 Q280,1020 720,1180 Q920,1240 1080,1140 L1080,1600 L0,1600 Z" fill="#d35400"/>
  <path d="M0,1320 Q540,1180 1080,1320 L1080,1920 L0,1920 Z" fill="#c0392b"/>
  <path d="M0,1520 Q480,1400 1080,1480 L1080,1920 L0,1920 Z" fill="#962d22"/>

  <!-- Massive Sand Cloud Dust Plume behind high-speed Raptor -->
  <g fill="#f8c291" opacity="0.65" filter="url(#dustBlur)">
    <circle cx="240" cy="1200" r="140"/>
    <circle cx="360" cy="1140" r="180"/>
    <circle cx="160" cy="1280" r="160"/>
    <circle cx="480" cy="1220" r="120"/>
  </g>

  <!-- Ford Raptor Trophy Truck / Dune Runner (Drifting over Dune Crest) -->
  <g transform="translate(380, 1140) rotate(12) scale(1.2)">
    <!-- Shadow -->
    <ellipse cx="260" cy="300" rx="240" ry="35" fill="#4d1710" opacity="0.8"/>

    <!-- Oversized Baja Desert Wheels -->
    <circle cx="110" cy="250" r="60" fill="#1e272e"/>
    <circle cx="110" cy="250" r="38" fill="#d2dae2"/>
    <circle cx="110" cy="250" r="18" fill="#ff3f34"/>
    <circle cx="410" cy="250" r="60" fill="#1e272e"/>
    <circle cx="410" cy="250" r="38" fill="#d2dae2"/>
    <circle cx="410" cy="250" r="18" fill="#ff3f34"/>

    <!-- Ford Performance Blue / Avalanche Grey Truck Body -->
    <path d="M60,220 L80,140 L160,130 L210,80 L380,80 L440,130 L490,170 L490,240 L440,245 L370,230 L135,230 Z" fill="#002C6C"/>
    <!-- Baja Chase Rack with Spare Tires in Bed -->
    <circle cx="120" cy="150" r="35" fill="#1e272e"/>
    <circle cx="120" cy="150" r="22" fill="#d2dae2"/>

    <!-- High-Clearance Baja Pre-runner Steel Bumper -->
    <path d="M450,220 L510,220 L500,250 L440,250 Z" fill="#d2dae2"/>

    <!-- Blazing Desert Sun Reflection on Windshield -->
    <polygon points="220,90 365,90 415,130 180,130" fill="#ffeaa7" opacity="0.85"/>

    <!-- RAPTOR Signature Decal -->
    <text x="210" y="180" font-family="'Impact', sans-serif" font-size="18" fill="#ff3f34" font-weight="bold" letter-spacing="3">RAPTOR</text>
  </g>

  <!-- Flying Sand Particles in Foreground -->
  <g fill="#ffeaa7" opacity="0.75">
    <circle cx="140" cy="1650" r="6"/>
    <circle cx="280" cy="1520" r="4"/>
    <circle cx="480" cy="1720" r="5"/>
    <circle cx="750" cy="1590" r="7"/>
    <circle cx="920" cy="1680" r="5"/>
    <circle cx="620" cy="1480" r="4"/>
  </g>
</svg>`;
}

export function getScenarioSvgDataUri(generator: () => string): string {
  const svg = generator();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
