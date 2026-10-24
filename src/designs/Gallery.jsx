import { useState } from "react";
import { person } from "./data";

const moods = ["All", "Elegant", "Fun", "Cozy", "Cool"];

export default function Gallery({ designs }) {
  const [mood, setMood] = useState("All");
  const shown = designs.filter((d) => mood === "All" || d.mood === mood);

  return (
    <main className="gallery">
      <header className="gallery-head">
        <p className="gallery-eyebrow">{person.name} · portfolio redesign</p>
        <h1 className="gallery-title">
          Ten directions, <em>one portfolio</em>
        </h1>
        <p className="gallery-lede">
          Each prototype is a full, working site built from the same profile data as the live
          portfolio. Open one, scroll it, play with it, then use the bar at the bottom or the arrow
          keys to move to the next.
        </p>
        <div className="gallery-filters" role="group" aria-label="Filter by mood">
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              className={`gallery-chip${mood === m ? " is-on" : ""}`}
              aria-pressed={mood === m}
              onClick={() => setMood(m)}
            >
              {m}
              <span className="gallery-chip-count">
                {m === "All" ? designs.length : designs.filter((d) => d.mood === m).length}
              </span>
            </button>
          ))}
        </div>
      </header>

      <ul className="gallery-grid">
        {shown.map((d) => (
          <li key={d.id}>
            <a className="gallery-card" href={`#${d.id}`}>
              <div
                className="gallery-poster"
                style={{ background: d.swatch.bg, color: d.swatch.fg }}
                aria-hidden="true"
              >
                <span className="gallery-poster-name" style={{ fontFamily: d.swatch.display }}>
                  {person.name.split(" ")[0]}
                  <br />
                  {person.name.split(" ")[1]}
                </span>
                <span className="gallery-poster-dots">
                  <i style={{ background: d.swatch.fg }} />
                  <i style={{ background: d.swatch.accent }} />
                  <i style={{ background: d.swatch.bg, borderColor: d.swatch.fg }} />
                </span>
              </div>
              <div className="gallery-meta">
                <div className="gallery-meta-row">
                  <h2 className="gallery-name">{d.name}</h2>
                  <span className={`gallery-mood mood-${d.mood.toLowerCase()}`}>{d.mood}</span>
                </div>
                <p className="gallery-blurb">{d.blurb}</p>
                <span className="gallery-open">Open prototype →</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
