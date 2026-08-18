# Ford Adventure Photo Booth - Web App (PWA) 🚙🌲

Applicazione Web mobile-first (PWA) sviluppata per esperienze interattive tramite QR Code durante stand ed eventi promozionali Ford (Ford Bronco, Ford Raptor, Ford Ranger).

## 🌟 Caratteristiche Principali

- **Zero Attrito (Nessuna installazione)**: L'utente inquadra il QR Code allo stand e atterra direttamente sulla Web App in formato verticale 9:16 (Instagram Stories).
- **Segmentazione AI in Tempo Reale**: Isolamento del soggetto (*Background Removal*) eseguito al **100% client-side** tramite MediaPipe Vision AI (WebGL/WASM) a zero latenza e totale rispetto della privacy.
- **Scenari 4x4 Ufficiali Ford**:
  1. *L'Avvistamento Inaspettato*: Foresta canadese all'alba con Ford Bronco, fari LED accesi e orso grizzly sullo sfondo.
  2. *Il Campo Base Estremo*: Picco montuoso al tramonto con fuoristrada, tenda da tetto aperta e falò.
  3. *La Tempesta Perfetta*: Deserto di Moab (Utah) con fulmini e Ford Bronco come rifugio indistruttibile.
  4. *Dune Raid Safari*: Dune dorate del deserto con Ford Raptor in derapata.
- **Editor Grafico Multi-Livello Fabric.js**:
  - Livello 1: Sfondo 4x4 ad alta definizione.
  - Livello 2: Soggetto scontornato con maschera alpha smooth.
  - Livello 3: Sticker touch manipolabili (drag, scale, rotate, flip, z-index).
  - Livello 4: Cornici e HUD overlay (Adventure Tour, Built Wild Inclinometro, Raptor Telemetry).
  - Filtri cromatici di post-produzione (Adventure Gold, Moab Red, Alpine Mist, Storm Moody, Noir).
- **Esportazione HD & Condivisione Nativa**:
  - Generazione composita ad alta risoluzione 1080x1920 (9:16).
  - Condivisione diretta su **Instagram Stories** via Web Share API (`navigator.share({ files: [blob] })`).
  - Pulsanti di fallback: download JPG immediato e copia negli appunti.
  - Effetti sonori procedurali (Web Audio API) e coriandoli animati (canvas-confetti).
- **PWA & Stand Modal**: Supporto PWA standalone (`manifest.json`) e modal con QR Code per far scansionare l'app ad altri partecipanti allo stand.

---

## 🛠️ Stack Tecnologico

- **Frontend**: React 18+ con TypeScript e Vite.
- **Styling**: Tailwind CSS con tema personalizzato Ford Performance / Adventure.
- **Computer Vision & AI**: `@mediapipe/tasks-vision` (Google MediaPipe Image Segmenter GPU/WASM).
- **Canvas Engine**: Fabric.js v6.
- **Icone**: Lucide React + custom SVG icons.
- **Audio & FX**: Web Audio API (procedural shutter click & beeps), Canvas Confetti, QRCode.react.

---

## 🚀 Avvio Locale

1. **Installazione dipendenze**:
   ```bash
   npm install
   ```

2. **Avvio server di sviluppo**:
   ```bash
   npm run dev
   ```
   L'app sarà disponibile su `http://localhost:3000` (o IP di rete locale per testare da smartphone).

3. **Build di produzione**:
   ```bash
   npm run build
   ```
   I file statici ottimizzati verranno generati nella cartella `dist/`.

---

## ☁️ Deploy su DigitalOcean App Platform (Static Site)

1. Collega la repository GitHub a **DigitalOcean App Platform**.
2. Configura il tipo di risorsa come **Static Site**:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. L'app verrà distribuita con certificato HTTPS automatico e CDN globale a bassa latenza.
