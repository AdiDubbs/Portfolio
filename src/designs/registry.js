import Monograph from "./monograph/Monograph";
import Nocturne from "./nocturne/Nocturne";
import Arcade from "./arcade/Arcade";
import Sticker from "./sticker/Sticker";
import PitWall from "./pitwall/PitWall";
import Library from "./library/Library";
import Greenhouse from "./greenhouse/Greenhouse";
import Desk from "./desk/Desk";
import Vision from "./vision/Vision";
import Terminal from "./terminal/Terminal";

const gf = (...families) =>
  `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;

export const designs = [
  {
    id: "monograph",
    name: "Monograph",
    mood: "Elegant",
    blurb: "An exhibition catalogue. Bodoni display type, cobalt ink, projects listed as catalogue entries with a cursor-following plate.",
    component: Monograph,
    bg: "#f2f3ef",
    fonts: gf("Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900", "Jost:wght@300..700"),
    swatch: { bg: "#f2f3ef", fg: "#0e0f12", accent: "#1f3bd6", display: "'Bodoni Moda', serif" },
  },
  {
    id: "nocturne",
    name: "Nocturne",
    mood: "Elegant",
    blurb: "A midnight observatory. Champagne hairlines on deep blue, a live starfield, and skills charted as constellations.",
    component: Nocturne,
    bg: "#0a0c14",
    fonts: gf("Cormorant+Garamond:ital,wght@0,300..700;1,300..700", "Geist:wght@300..700"),
    swatch: { bg: "#0a0c14", fg: "#ece6d8", accent: "#d8c39a", display: "'Cormorant Garamond', serif" },
  },
  {
    id: "arcade",
    name: "Square Saga",
    mood: "Fun",
    blurb: "A CRT arcade cabinet built on his Tetris game. Falling tetrominoes, stage select, inventory, and a hi-score table.",
    component: Arcade,
    bg: "#0d0420",
    fonts: gf("Press+Start+2P", "VT323"),
    swatch: { bg: "#0d0420", fg: "#f4f0ff", accent: "#ffd23f", display: "'Press Start 2P', monospace" },
  },
  {
    id: "sticker",
    name: "Sticker Club",
    mood: "Fun",
    blurb: "Chunky borders, hard shadows and draggable stickers. Rearrange the hero, flip through tilted project cards.",
    component: Sticker,
    bg: "#e6e0ff",
    fonts: gf("Bricolage+Grotesque:opsz,wght@12..96,400..800", "DM+Mono:wght@400;500"),
    swatch: { bg: "#e6e0ff", fg: "#121014", accent: "#ff5a36", display: "'Bricolage Grotesque', sans-serif" },
  },
  {
    id: "pitwall",
    name: "Pit Wall",
    mood: "Cool",
    blurb: "An F1 timing screen. Five red lights start the page, projects run in a timing tower, and every role is a stint.",
    component: PitWall,
    bg: "#0b0b0d",
    fonts: gf("Titillium+Web:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900", "JetBrains+Mono:wght@400;600"),
    swatch: { bg: "#0b0b0d", fg: "#f5f5f5", accent: "#e10600", display: "'Titillium Web', sans-serif" },
  },
  {
    id: "library",
    name: "Reading Room",
    mood: "Cozy",
    blurb: "A lamp-lit study. Projects are book spines you pull from the shelf, and experience is stamped on a borrower's card.",
    component: Library,
    bg: "#17221c",
    fonts: gf("Young+Serif", "Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..700"),
    swatch: { bg: "#17221c", fg: "#f1e6cf", accent: "#f0b45e", display: "'Young Serif', serif" },
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    mood: "Cozy",
    blurb: "A nod to 100,000 trees planted. A sprout grows on load, and each project is a seed packet that flips over.",
    component: Greenhouse,
    bg: "#dfe7d5",
    fonts: gf("Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1", "Figtree:wght@400..800"),
    swatch: { bg: "#dfe7d5", fg: "#22382a", accent: "#e9a93a", display: "'Fraunces', serif" },
  },
  {
    id: "desk",
    name: "Study Desk",
    mood: "Cozy",
    blurb: "A desk seen from above. Polaroids you can drag, a steaming cup of chai, sticky notes and a typed letter.",
    component: Desk,
    bg: "#34505f",
    fonts: gf("Caveat:wght@400..700", "Courier+Prime:ital,wght@0,400;0,700;1,400"),
    swatch: { bg: "#34505f", fg: "#fffdf6", accent: "#ffe27a", display: "'Caveat', cursive" },
  },
  {
    id: "vision",
    name: "Inference",
    mood: "Cool",
    blurb: "The page as a detector sees it. Bounding boxes find him in his own photo, and every card carries a class and track ID.",
    component: Vision,
    bg: "#0d1117",
    fonts: gf("IBM+Plex+Mono:wght@400;500;600", "IBM+Plex+Sans+Condensed:wght@400;500;600;700"),
    swatch: { bg: "#0d1117", fg: "#e6edf3", accent: "#4cc9f0", display: "'IBM Plex Sans Condensed', sans-serif" },
  },
  {
    id: "terminal",
    name: "Amber Shell",
    mood: "Cool",
    blurb: "A working amber-phosphor terminal. Type help, open a project, or tap the command chips.",
    component: Terminal,
    bg: "#110b04",
    fonts: gf("Fira+Code:wght@400..700"),
    swatch: { bg: "#110b04", fg: "#ffcf73", accent: "#ffb000", display: "'Fira Code', monospace" },
  },
];

export const galleryFonts = gf("Instrument+Serif:ital@0;1", "Instrument+Sans:wght@400..700");
