import { useRef, useState } from "react";
import "./desk.css";
import { education, experiences, ext, firstName, leadership, links, person, photo, projects, skills } from "../data";

const notes = ["#ffe27a", "#ffb4a2", "#b8e0d2", "#cdb4db", "#ffd6a5", "#a0c4ff"];

// Drag anything on the desk; it remembers where you left it until reload
function useDrag() {
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [held, setHeld] = useState(false);
  const st = useRef(null);
  const handlers = {
    onPointerDown: (e) => {
      if (e.target.closest("a, button")) return;
      st.current = { px: e.clientX, py: e.clientY, ...off };
      e.currentTarget.setPointerCapture(e.pointerId);
      setHeld(true);
    },
    onPointerMove: (e) => {
      if (!st.current) return;
      setOff({ x: st.current.x + e.clientX - st.current.px, y: st.current.y + e.clientY - st.current.py });
    },
    onPointerUp: () => {
      st.current = null;
      setHeld(false);
    },
  };
  handlers.onPointerCancel = handlers.onPointerUp;
  return { off, held, handlers };
}

function Polaroid({ p, i }) {
  const { off, held, handlers } = useDrag();
  const [shot, setShot] = useState(0);
  const tilt = [-4, 3, -2, 5, -3][i % 5];
  return (
    <figure
      className={`dk-polaroid${held ? " is-held" : ""}`}
      style={{ "--tilt": `${tilt}deg`, transform: `translate(${off.x}px, ${off.y}px) rotate(${held ? 0 : tilt}deg)` }}
      {...handlers}
    >
      <span className="dk-tape" aria-hidden="true" />
      <img src={p.images[shot]} alt={`${p.title}: ${p.imageLabels[shot]}`} draggable="false" loading="lazy" />
      <figcaption>
        <span className="dk-hand">{p.title}</span>
        <span className="dk-shots">
          {p.images.map((src, j) => (
            <button key={src} type="button" className={shot === j ? "is-on" : ""} onClick={() => setShot(j)} aria-label={`Show ${p.imageLabels[j]}`} />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

function Draggable({ className, style, children }) {
  const { off, held, handlers } = useDrag();
  return (
    <div className={`${className}${held ? " is-held" : ""}`} style={{ ...style, translate: `${off.x}px ${off.y}px` }} {...handlers}>
      {children}
    </div>
  );
}

export default function Desk() {
  const [openEnv, setOpenEnv] = useState(false);
  return (
    <div className="dk">
      <section className="dk-hero" aria-label="Introduction">
        <Draggable className="dk-photo">
          <span className="dk-tape" aria-hidden="true" />
          <img src={photo} alt={`${person.name} at Yosemite`} draggable="false" />
          <p className="dk-hand">Tunnel View, Yosemite</p>
        </Draggable>

        <Draggable className="dk-index">
          <p className="dk-index-top">{person.location} · {education.graduation}</p>
          <h1>{person.name}</h1>
          <p className="dk-index-role">{person.tagline}</p>
          <p>{person.summary}</p>
        </Draggable>

        <Draggable className="dk-sticky" style={{ "--n": notes[0], "--r": "4deg" }}>
          <p className="dk-hand dk-sticky-title">This week</p>
          <ul className="dk-hand dk-todo">
            <li className="is-done">ship the CV pipeline</li>
            <li className="is-done">read the new model paper</li>
            <li>race on Sunday</li>
            <li>plant more trees</li>
          </ul>
        </Draggable>

        <div className="dk-mug" aria-hidden="true">
          <span className="dk-steam" />
          <span className="dk-steam" />
          <span className="dk-steam" />
        </div>
        <span className="dk-pencil" aria-hidden="true" />
        <span className="dk-clip" aria-hidden="true" />
        <p className="dk-hint dk-hand">psst: the paper on this desk moves</p>
      </section>

      <section className="dk-section">
        <h2 className="dk-h2 dk-hand">Things I’ve made</h2>
        <div className="dk-projects">
          {projects.map((p, i) => (
            <div key={p.slug} className="dk-project">
              <Polaroid p={p} i={i} />
              <div className="dk-card">
                <p className="dk-card-meta">
                  {p.period} · {p.category}
                </p>
                <ul>
                  {p.bullets.slice(0, 3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <a href={p.link} {...ext}>
                  github ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dk-section dk-pair">
        <article className="dk-letter">
          <header>
            <b>{person.name}</b>
            <span>{person.location}</span>
            <span>{person.email}</span>
          </header>
          <p>To whoever is reading this,</p>
          <p>Here is where I’ve worked so far, most recent first.</p>
          {experiences.map((e) => (
            <p key={e.company}>
              <b>
                {e.role}, {e.company}
              </b>{" "}
              <i>
                ({e.period}, {e.location}).
              </i>{" "}
              {e.bullets[0]}
            </p>
          ))}
          <p>I’m open to new grad roles. I’d love to hear from you.</p>
          <p className="dk-sign dk-hand">— {firstName}</p>
        </article>

        <div className="dk-notes">
          {skills.map((s, i) => (
            <div key={s.category} className="dk-note" style={{ "--n": notes[i % notes.length], "--r": `${[-3, 2, -1, 3, -2, 1][i]}deg` }}>
              <h3 className="dk-hand">{s.category}</h3>
              <p>{s.items.slice(0, 8).join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dk-section">
        <div className="dk-folder">
          <span className="dk-folder-tab">Activism</span>
          <span className="dk-clip dk-clip-folder" aria-hidden="true" />
          <div className="dk-folder-grid">
            {leadership.map((g) => (
              <div key={g.label}>
                <h3 className="dk-hand">{g.label}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="dk-foot">
        <button type="button" className={`dk-envelope${openEnv ? " is-open" : ""}`} onClick={() => setOpenEnv((o) => !o)} aria-expanded={openEnv}>
          <span className="dk-flap" aria-hidden="true" />
          <span className="dk-stamp" aria-hidden="true">
            WI
          </span>
          <span className="dk-env-to dk-hand">to: you</span>
          <span className="dk-env-from">from: {person.email}</span>
          <span className="dk-env-hint">{openEnv ? "Close" : "Open the envelope"}</span>
        </button>
        <div className={`dk-reply${openEnv ? " is-open" : ""}`}>
          <p className="dk-hand">Write back anytime:</p>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <div className="dk-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} {...ext}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
