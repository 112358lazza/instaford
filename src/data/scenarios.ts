import { Scenario } from '../types';
import {
  generateForestBearScenarioSvg,
  generateMountainBaseCampScenarioSvg,
  generateMoabStormScenarioSvg,
  generateDuneSafariScenarioSvg,
  getScenarioSvgDataUri
} from '../utils/svgBackgrounds';

export const SCENARIOS: Scenario[] = [
  {
    id: 'forest-bear',
    name: 'L\'Avvistamento Inaspettato',
    subtitle: 'Foresta Nebbiosa all\'Alba con Ford Bronco',
    description: 'Immersione nelle foreste canadesi con la fitta nebbia mattutina, i potenti fari LED del Ford Bronco e un orso grizzly pacifico e curioso tra gli alberi.',
    vehicle: 'Ford Bronco',
    location: 'Canadian Great Wilderness',
    bgUrl: getScenarioSvgDataUri(generateForestBearScenarioSvg),
    thumbnailUrl: getScenarioSvgDataUri(generateForestBearScenarioSvg),
    lightingTone: 'dawn',
    themeColor: '#d35400',
    suggestedStickers: ['bronco-wild', 'grizzly-bear', 'bear-paw', 'vintage-compass', 'mud-splatter-1']
  },
  {
    id: 'mountain-basecamp',
    name: 'Il Campo Base Estremo',
    subtitle: 'Picco Montuoso & Tenda da Tetto al Tramonto',
    description: 'Accampamento a 2.500 metri su uno sperone di roccia panoramico al tramonto, con fuoristrada Ford attrezzato, tenda da tetto aperta e falò acceso.',
    vehicle: 'Ford 4x4',
    location: 'Dolomites High Altitude',
    bgUrl: getScenarioSvgDataUri(generateMountainBaseCampScenarioSvg),
    thumbnailUrl: getScenarioSvgDataUri(generateMountainBaseCampScenarioSvg),
    lightingTone: 'sunset',
    themeColor: '#FF4A00',
    suggestedStickers: ['ford-performance', 'campfire', 'vintage-compass', 'built-tough', 'aviator-sunglasses']
  },
  {
    id: 'moab-storm',
    name: 'La Tempesta Perfetta',
    subtitle: 'Deserto di Moab & Cielo Temporalesco Epico',
    description: 'Le rosse formazioni rocciose dello Utah illuminate da fulmini spettacolari nel cielo scuro, con il Ford Bronco come rifugio indistruttibile e sicuro.',
    vehicle: 'Ford Bronco',
    location: 'Moab Slickrock Desert, Utah',
    bgUrl: getScenarioSvgDataUri(generateMoabStormScenarioSvg),
    thumbnailUrl: getScenarioSvgDataUri(generateMoabStormScenarioSvg),
    lightingTone: 'storm',
    themeColor: '#70a1ff',
    suggestedStickers: ['storm-chaser', 'trail-rated', 'raptor-claw', 'mud-splatter-2', 'stand-badge-2026']
  },
  {
    id: 'dune-safari',
    name: 'Dune Raid Safari',
    subtitle: 'Dune Dorate & Ford Raptor ad Alta Velocità',
    description: 'Adrenalina pura nel deserto dorato con il Ford Raptor lanciato a tutta velocità sulle creste delle dune con sospensioni Fox Racing.',
    vehicle: 'Ford Raptor',
    location: 'Baja Desert Track',
    bgUrl: getScenarioSvgDataUri(generateDuneSafariScenarioSvg),
    thumbnailUrl: getScenarioSvgDataUri(generateDuneSafariScenarioSvg),
    lightingTone: 'daylight',
    themeColor: '#002C6C',
    suggestedStickers: ['ford-performance', 'raptor-claw', 'tire-tracks', 'aviator-sunglasses', 'explore-more']
  }
];
