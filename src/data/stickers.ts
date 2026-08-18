import { StickerItem } from '../types';
import { SVG_STICKERS, getStickerSvgDataUri } from '../utils/svgStickers';

export const STICKERS: StickerItem[] = [
  // FORD & PERFORMANCE
  {
    id: 'ford-oval',
    name: 'Logo Ford Ufficiale',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.fordOval),
    width: 320,
    height: 160,
    defaultScale: 0.5
  },
  {
    id: 'ford-performance',
    name: 'Ford Performance',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.fordPerformance),
    width: 400,
    height: 110,
    defaultScale: 0.5
  },
  {
    id: 'bronco-wild',
    name: 'Bronco Built Wild',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.broncoWild),
    width: 300,
    height: 300,
    defaultScale: 0.45
  },
  {
    id: 'raptor-claw',
    name: 'Raptor Claw Scratches',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.raptorClaw),
    width: 260,
    height: 260,
    defaultScale: 0.5
  },
  {
    id: 'built-tough',
    name: 'Built Ford Tough',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.builtTough),
    width: 300,
    height: 240,
    defaultScale: 0.45
  },
  {
    id: 'trail-rated',
    name: 'Trail Rated 4x4',
    category: 'ford',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.trailRated),
    width: 240,
    height: 240,
    defaultScale: 0.45
  },

  // WILDLIFE & OUTDOORS
  {
    id: 'grizzly-bear',
    name: 'Grizzly Bear Encounter',
    category: 'wildlife',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.grizzlyBear),
    width: 260,
    height: 260,
    defaultScale: 0.45
  },
  {
    id: 'bear-paw',
    name: 'Impronta Zampa Orso',
    category: 'wildlife',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.bearPaw),
    width: 220,
    height: 220,
    defaultScale: 0.45
  },

  // ADVENTURE & GEAR
  {
    id: 'vintage-compass',
    name: 'Bussola Esplorazione',
    category: 'adventure',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.vintageCompass),
    width: 240,
    height: 240,
    defaultScale: 0.45
  },
  {
    id: 'campfire',
    name: 'Falò Notturno',
    category: 'adventure',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.campfireSticker),
    width: 220,
    height: 220,
    defaultScale: 0.45
  },
  {
    id: 'aviator-sunglasses',
    name: 'Occhiali Aviator',
    category: 'adventure',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.aviatorSunglasses),
    width: 340,
    height: 140,
    defaultScale: 0.5
  },
  {
    id: 'explore-more',
    name: 'Explore More Badge',
    category: 'adventure',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.exploreMore),
    width: 260,
    height: 180,
    defaultScale: 0.45
  },

  // MUD & OFFROAD
  {
    id: 'mud-splatter-1',
    name: 'Schizzo di Fango 4x4',
    category: 'mud',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.mudSplatter1),
    width: 280,
    height: 240,
    defaultScale: 0.5
  },
  {
    id: 'mud-splatter-2',
    name: 'Schizzo Ruota',
    category: 'mud',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.mudSplatter2),
    width: 280,
    height: 180,
    defaultScale: 0.5
  },
  {
    id: 'tire-tracks',
    name: 'Tracce Battistrada',
    category: 'mud',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.tireTracks),
    width: 160,
    height: 300,
    defaultScale: 0.45
  },

  // BADGES & EVENT
  {
    id: 'storm-chaser',
    name: 'Storm Chaser Badge',
    category: 'badges',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.stormChaser),
    width: 280,
    height: 140,
    defaultScale: 0.45
  },
  {
    id: 'stand-badge-2026',
    name: 'Ford Stand 2026 Live',
    category: 'badges',
    svgDataUri: getStickerSvgDataUri(SVG_STICKERS.standBadge2026),
    width: 320,
    height: 120,
    defaultScale: 0.45
  }
];
