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
import Gilded from "./gilded/Gilded";
import Raster from "./raster/Raster";
import Comic from "./comic/Comic";
import Desktop from "./desktop/Desktop";
import Recipes from "./recipes/Recipes";
import Rainy from "./rainy/Rainy";
import Blueprint from "./blueprint/Blueprint";
import Graph from "./graph/Graph";

const gf = (...families) =>
  `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;

export const designs = [
  {
    id: "monograph",
    name: "Monograph",
    mood: "Elegant",
    blurb: "An exhibition catalogue. Bodoni type, cobalt ink, a foreword, catalogue entries with full-size plates, a chronology and a bibliography.",
    component: Monograph,
    bg: "#f2f3ef",
    fonts: gf("Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900", "Jost:wght@300..700"),
    swatch: { bg: "#f2f3ef", fg: "#0e0f12", accent: "#1f3bd6", display: "'Bodoni Moda', serif" },
  },
  {
    id: "nocturne",
    name: "Nocturne",
    mood: "Elegant",
    blurb: "A midnight observatory. A live starfield with shooting stars, field notes, skills charted as constellations, and an eyepiece view of every project.",
    component: Nocturne,
    bg: "#0a0c14",
    fonts: gf("Cormorant+Garamond:ital,wght@0,300..700;1,300..700", "Geist:wght@300..700"),
    swatch: { bg: "#0a0c14", fg: "#ece6d8", accent: "#d8c39a", display: "'Cormorant Garamond', serif" },
  },
  {
    id: "gilded",
    name: "Gilded",
    mood: "Elegant",
    blurb: "An Art Deco theatre programme. A slowly turning sunburst, projects billed as acts, roles as engagements, and an RSVP card.",
    component: Gilded,
    bg: "#0e0e0c",
    fonts: gf("Poiret+One", "Josefin+Sans:wght@300..700"),
    swatch: { bg: "#0e0e0c", fg: "#ecdcaa", accent: "#2f8a72", display: "'Poiret One', sans-serif" },
  },
  {
    id: "raster",
    name: "Raster",
    mood: "Elegant",
    blurb: "Swiss International Style. A variable-width name that follows your pointer, a 12-column grid you can switch on, and one red.",
    component: Raster,
    bg: "#f3f3f1",
    fonts: gf("Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900", "Martian+Mono:wght@300..600"),
    swatch: { bg: "#f3f3f1", fg: "#111111", accent: "#e4002b", display: "'Archivo', sans-serif" },
  },
  {
    id: "arcade",
    name: "Square Saga",
    mood: "Fun",
    blurb: "A CRT arcade cabinet built on his Tetris game, and it really plays: score, levels, next piece, touch controls. Plus a pixel-art player profile.",
    component: Arcade,
    bg: "#0d0420",
    fonts: gf("Press+Start+2P", "VT323"),
    swatch: { bg: "#0d0420", fg: "#f4f0ff", accent: "#ffd23f", display: "'Press Start 2P', monospace" },
  },
  {
    id: "sticker",
    name: "Sticker Club",
    mood: "Fun",
    blurb: "Chunky borders, hard shadows and stickers you can drag or shuffle. Speech-bubble about section, a class schedule, flip-over project cards.",
    component: Sticker,
    bg: "#e6e0ff",
    fonts: gf("Bricolage+Grotesque:opsz,wght@12..96,400..800", "DM+Mono:wght@400;500"),
    swatch: { bg: "#e6e0ff", fg: "#121014", accent: "#ff5a36", display: "'Bricolage Grotesque', sans-serif" },
  },
  {
    id: "comic",
    name: "Issue No. 1",
    mood: "Fun",
    blurb: "A comic book. Halftone cover, an origin story in speech bubbles, one page per project, and sound effects you can click.",
    component: Comic,
    bg: "#fbf4dc",
    fonts: gf("Bangers", "Comic+Neue:wght@400;700"),
    swatch: { bg: "#00a8e8", fg: "#ffde00", accent: "#e6007e", display: "'Bangers', sans-serif" },
  },
  {
    id: "desktop",
    name: "Adi 98",
    mood: "Fun",
    blurb: "A working 1998 desktop. Draggable windows, a Start menu, a project explorer, a real Minesweeper and a Shut Down screen.",
    component: Desktop,
    bg: "#008080",
    fonts: gf("Pixelify+Sans:wght@400..700", "Atkinson+Hyperlegible:wght@400;700"),
    swatch: { bg: "#008080", fg: "#ffffff", accent: "#c0c0c0", display: "'Pixelify Sans', sans-serif" },
  },
  {
    id: "library",
    name: "Reading Room",
    mood: "Cozy",
    blurb: "A lamp-lit study. Pull books off the shelf and turn their pages, read the borrowing record, open the card catalogue, or switch the lamp off.",
    component: Library,
    bg: "#17221c",
    fonts: gf("Young+Serif", "Literata:ital,opsz,wght@0,7..72,400..700;1,7..72,400..700"),
    swatch: { bg: "#17221c", fg: "#f1e6cf", accent: "#f0b45e", display: "'Young Serif', serif" },
  },
  {
    id: "greenhouse",
    name: "Greenhouse",
    mood: "Cozy",
    blurb: "A nod to 100,000 trees planted. Water the sprout until it flowers; projects are seed packets that flip over, education is the roots.",
    component: Greenhouse,
    bg: "#dfe7d5",
    fonts: gf("Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1", "Figtree:wght@400..800"),
    swatch: { bg: "#dfe7d5", fg: "#22382a", accent: "#e9a93a", display: "'Fraunces', serif" },
  },
  {
    id: "desk",
    name: "Study Desk",
    mood: "Cozy",
    blurb: "A desk seen from above. Polaroids and notes you can drag, a spiral notebook, a name badge that flips, a typed letter and an envelope.",
    component: Desk,
    bg: "#34505f",
    fonts: gf("Caveat:wght@400..700", "Courier+Prime:ital,wght@0,400;0,700;1,400"),
    swatch: { bg: "#34505f", fg: "#fffdf6", accent: "#ffe27a", display: "'Caveat', cursive" },
  },
  {
    id: "recipes",
    name: "Recipe Box",
    mood: "Cozy",
    blurb: "A recipe tin on a gingham tablecloth. Projects as handwritten recipe cards with tickable ingredients, a chalkboard menu and pantry jars.",
    component: Recipes,
    bg: "#e9eef8",
    fonts: gf("Shrikhand", "Karla:wght@400..800", "Gochi+Hand"),
    swatch: { bg: "#f8e7a2", fg: "#2b2a33", accent: "#d9534f", display: "'Shrikhand', serif" },
  },
  {
    id: "rainy",
    name: "Rainy Day",
    mood: "Cozy",
    blurb: "Lo-fi night window. Rain on the glass, a rain sound you can switch on, a focus timer, projects as a playlist, and fog you can draw in.",
    component: Rainy,
    bg: "#0b1120",
    fonts: gf("Quicksand:wght@400..700", "Sometype+Mono:wght@400;500"),
    swatch: { bg: "#182241", fg: "#f3eee8", accent: "#ffb86b", display: "'Quicksand', sans-serif" },
  },
  {
    id: "pitwall",
    name: "Pit Wall",
    mood: "Cool",
    blurb: "An F1 timing screen. Five red lights start the page, a driver profile, projects in a timing tower, and full debriefs for every stint.",
    component: PitWall,
    bg: "#0b0b0d",
    fonts: gf("Titillium+Web:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900", "JetBrains+Mono:wght@400;600"),
    swatch: { bg: "#0b0b0d", fg: "#f5f5f5", accent: "#e10600", display: "'Titillium Web', sans-serif" },
  },
  {
    id: "vision",
    name: "Inference",
    mood: "Cool",
    blurb: "The page as a detector sees it. Drag the confidence threshold, read the model card, follow the IntelliVision pipeline.",
    component: Vision,
    bg: "#0d1117",
    fonts: gf("IBM+Plex+Mono:wght@400;500;600", "IBM+Plex+Sans+Condensed:wght@400;500;600;700"),
    swatch: { bg: "#0d1117", fg: "#e6edf3", accent: "#4cc9f0", display: "'IBM Plex Sans Condensed', sans-serif" },
  },
  {
    id: "terminal",
    name: "Amber Shell",
    mood: "Cool",
    blurb: "A working phosphor terminal. Type help, open a project, run photo for an ASCII portrait, man adi, or switch the theme to green or ice.",
    component: Terminal,
    bg: "#110b04",
    fonts: gf("Fira+Code:wght@400..700"),
    swatch: { bg: "#110b04", fg: "#ffcf73", accent: "#ffb000", display: "'Fira Code', monospace" },
  },
  {
    id: "blueprint",
    name: "Blueprint",
    mood: "Cool",
    blurb: "Engineering drawing sheets. A system diagram for every project, experience as a revision table, skills as a bill of materials.",
    component: Blueprint,
    bg: "#1b4f8f",
    fonts: gf("Architects+Daughter", "Share+Tech+Mono"),
    swatch: { bg: "#1b4f8f", fg: "#eef5ff", accent: "#9fd8ff", display: "'Architects Daughter', cursive" },
  },
  {
    id: "graph",
    name: "Skill Graph",
    mood: "Cool",
    blurb: "A live force-directed graph linking every project and role to the tools it used. Click, drag and search the nodes.",
    component: Graph,
    bg: "#0c0f1a",
    fonts: gf("Unbounded:wght@400..700", "Onest:wght@400..700"),
    swatch: { bg: "#0c0f1a", fg: "#e8ecf5", accent: "#ff7a59", display: "'Unbounded', sans-serif" },
  },
];

export const galleryFonts = gf("Instrument+Serif:ital@0;1", "Instrument+Sans:wght@400..700");
