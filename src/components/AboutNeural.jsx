import { useState, useEffect } from "react";
import { Sprout, Brain, Globe, Zap } from "lucide-react";
import { profile } from "../data/profile";
import profileImg from "../assets/profile.jpeg";
import "./AboutNeural.css";

// 4 cols: [photo] [activism] [focus-left] [focus-right]
// Row 2:  [photo] [origin-left] [origin-right] [hobbies]
// Default widths loosely reflect title length so narrower-title tiles feel right-sized
function getColumns(hovered) {
  if (!hovered)               return "1.3fr 0.9fr 1.1fr 1.1fr";
  if (hovered === "photo")    return "1.6fr 0.9fr 1.1fr 1.1fr";
  if (hovered === "activism") return "1.0fr 2.1fr 0.65fr 0.65fr";
  if (hovered === "focus")    return "1.0fr 0.85fr 1.5fr 1.5fr";
  if (hovered === "origin")   return "1.0fr 1.45fr 1.5fr 0.95fr";
  if (hovered === "hobbies")  return "1.0fr 0.65fr 0.65fr 2.1fr";
  return "1.3fr 0.8fr 1.25fr 1.1fr"; // unreachable, matches default
}

export default function AboutNeural() {
  const [hovered, setHovered] = useState(null);
  const [photoHovered, setPhotoHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth > 1100 : true
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    setIsDesktop(mq.matches);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="ab-neural-wrapper">
      <div className="ab-bento" style={isDesktop ? { gridTemplateColumns: getColumns(hovered) } : undefined}>

        {/* Photo — full-bleed, col 1, spans both rows */}
        <div
          className={`ab-tile ab-tile--photo ${hovered && hovered !== "photo" ? "ab-tile--recede" : ""}`}
          onMouseEnter={() => { setHovered("photo"); setPhotoHovered(true); }}
          onMouseLeave={() => { setHovered(null); setPhotoHovered(false); }}
        >
          <img src={profileImg} alt={profile.personal.name} className="ab-photo-full" />
          <div className={`ab-photo-overlay ${photoHovered ? "ab-photo-overlay--visible" : ""}`}>
            <div className="ab-photo-overlay-text">
              <h3 className="ab-overlay-name">Hi, I&apos;m Aditya</h3>
            </div>
          </div>
        </div>

        {/* Activism — col 2, row 1 (narrow) */}
        <Card id="activism" hovered={hovered} setHovered={setHovered} title="Activism" icon={Sprout}>
          <p className="ab-tile-content">I'm an environmental activist who has run campaigns against air pollution, plastic waste, and climate change - resulting in real policy change and international news coverage.</p>
        </Card>

        {/* Focus — col 3-4, row 1 (wide) */}
        <Card id="focus" hovered={hovered} setHovered={setHovered} title="Focus Areas" icon={Brain}>
          <p className="ab-tile-content">{profile.personal.focus}</p>
        </Card>

        {/* Background — col 2-3, row 2 (wide) */}
        <Card id="origin" hovered={hovered} setHovered={setHovered} title="Background" icon={Globe}>
          <p className="ab-tile-content">{profile.personal.origin}</p>
        </Card>

        {/* Hobbies — col 4, row 2 (narrow) */}
        <Card id="hobbies" hovered={hovered} setHovered={setHovered} title="Hobbies" icon={Zap}>
          <p className="ab-tile-content">{profile.personal.hobbies}</p>
        </Card>

      </div>

    </div>
  );
}

function Card({ id, hovered, setHovered, title, icon: Icon, children }) {
  const isActive = hovered === id;
  const isDimmed = hovered !== null && !isActive;

  return (
    <div
      className={`ab-tile ab-tile--${id} ${isActive ? "ab-tile--active" : ""} ${isDimmed ? "ab-tile--dim" : ""}`}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
    >
      {Icon && <Icon className="ab-tile-icon" strokeWidth={1.25} />}
      <h3 className="ab-tile-title">{title}</h3>
      <div className="ab-tile-body">
        <div className="ab-tile-inner">{children}</div>
      </div>
    </div>
  );
}
