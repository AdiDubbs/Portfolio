import { useEffect, useState } from "react";
import "./greenhouse.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills, splitPeriod } from "../data";
import { useLightbox } from "../shared/Lightbox";

const packetColors = ["#e9a93a", "#c9d9a4", "#e7b7c8", "#9fc4d6", "#f2d27a"];

function Sprout({ water = 0 }) {
  return (
    <svg className={`gh-sprout gh-w${water}`} viewBox="0 0 320 360" role="img" aria-label={water >= 3 ? "A flowering plant in a terracotta pot" : "A sprout growing from a terracotta pot"}>
      <defs>
        <linearGradient id="gh-pot" x1="0" x2="1">
          <stop offset="0" stopColor="#b9603f" />
          <stop offset="1" stopColor="#d9805a" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="342" rx="120" ry="10" fill="#22382a" opacity="0.12" />
      <path className="gh-stem" d="M160 270 C 158 220, 170 190, 160 150 C 152 118, 162 92, 172 70" />
      <path className="gh-leaf gh-leaf-1" d="M162 200 C 120 196, 92 170, 86 138 C 124 138, 154 160, 162 200 Z" />
      <path className="gh-leaf gh-leaf-2" d="M160 160 C 196 150, 228 124, 236 92 C 196 92, 166 118, 160 160 Z" />
      <path className="gh-leaf gh-leaf-3" d="M170 76 C 150 60, 146 36, 156 16 C 178 30, 182 56, 170 76 Z" />
      <path className="gh-leaf gh-leaf-4" d="M161 230 C 196 226, 222 206, 228 180 C 196 180, 168 200, 161 230 Z" />
      <g transform="translate(172 66)">
        <g className="gh-flower">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="0" cy="-17" rx="9" ry="15" transform={`rotate(${a})`} fill="#e9a93a" stroke="#b77a18" strokeWidth="2" />
          ))}
          <circle r="9" fill="#6b3e5e" />
        </g>
      </g>
      <path d="M96 262 H224 L208 340 H112 Z" fill="url(#gh-pot)" />
      <rect x="88" y="250" width="144" height="24" rx="5" fill="#c66e4b" />
      <path d="M100 262 Q160 252 220 262" stroke="#5a3c2a" strokeWidth="8" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function TreeCount() {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(100000);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / 2200);
      setN(Math.round(100000 * (1 - (1 - k) ** 3)));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <span className="gh-count">{n.toLocaleString("en-US")}+</span>;
}

function Packet({ p, i, onZoom }) {
  const [back, setBack] = useState(false);
  return (
    <article className={`gh-packet${back ? " is-back" : ""}`} style={{ "--pk": packetColors[i % packetColors.length] }}>
      <div className="gh-face gh-front" inert={back}>
        <p className="gh-variety">Variety no. {String(i + 1).padStart(2, "0")}</p>
        <h3>{p.title}</h3>
        <button type="button" className="gh-window" onClick={() => onZoom(p, 0)} aria-label={`Enlarge ${p.imageLabels[0]}`}>
          <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} loading="lazy" />
        </button>
        <dl className="gh-fine">
          <div>
            <dt>Sown</dt>
            <dd>{p.period}</dd>
          </div>
          <div>
            <dt>Grows in</dt>
            <dd>{p.category}</dd>
          </div>
        </dl>
        <button type="button" className="gh-flip" onClick={() => setBack(true)}>
          Read the growing notes ↻
        </button>
      </div>
      <div className="gh-face gh-back" inert={!back}>
        <p className="gh-variety">Growing notes · {p.title}</p>
        <ol>
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
        <p className="gh-companions">
          <b>Companion plants</b> {p.technologies.join(", ")}
        </p>
        <div className="gh-back-actions">
          <a href={p.link} {...ext}>
            GitHub ↗
          </a>
          <button type="button" className="gh-flip" onClick={() => setBack(false)}>
            Front ↻
          </button>
        </div>
      </div>
    </article>
  );
}

export default function Greenhouse() {
  const [water, setWater] = useState(0);
  const [drops, setDrops] = useState(0);
  const [lb, openLb] = useLightbox();
  const pour = () => {
    setWater((w) => Math.min(3, w + 1));
    setDrops((d) => d + 1);
  };
  return (
    <div className="gh">
      <header className="gh-nav">
        <span className="gh-logo">
          <i aria-hidden="true" /> {firstName.toLowerCase()}’s greenhouse
        </span>
        <nav>
          <a href="#gh-gardener">Gardener</a>
          <a href="#gh-packets">Seeds</a>
          <a href="#gh-seasons">Seasons</a>
          <a href="#gh-forest">Forest</a>
        </nav>
      </header>

      <section className="gh-hero">
        <div className="gh-hero-copy">
          <p className="gh-eyebrow">Field notes · {person.location}</p>
          <h1 className="gh-name">
            {firstName}
            <br />
            <em>{lastName}</em>
          </h1>
          <p className="gh-lede">{person.summary}</p>
          <p className="gh-origin">{person.origin}</p>
        </div>
        <div className="gh-hero-art">
          <div className="gh-pot-wrap">
            <Sprout water={water} />
            {drops > 0 && (
              <span key={drops} className="gh-drops" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            )}
          </div>
          <button type="button" className="gh-flip gh-water" onClick={pour} disabled={water >= 3}>
            {water >= 3 ? "It bloomed. Thank you!" : `Water the plant (${water}/3)`}
          </button>
          <p className="gh-hero-trees">
            <TreeCount />
            <span>trees planted through campaigns I led</span>
          </p>
        </div>
      </section>

      <section className="gh-section gh-gardener" id="gh-gardener">
        <figure className="gh-portrait">
          <img src={photo} alt={`${person.name} at Yosemite`} />
          <figcaption>The gardener, at Yosemite</figcaption>
        </figure>
        <div>
          <h2 className="gh-h2">About the gardener</h2>
          <div className="gh-notes">
            {about.map((a, i) => (
              <div key={a.label} className="gh-note" style={{ "--pk": packetColors[(i + 1) % packetColors.length] }}>
                <h3>{a.label}</h3>
                <p>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gh-section" id="gh-packets">
        <h2 className="gh-h2">Seed packets</h2>
        <p className="gh-sub">Every project I’ve grown, from first Android app to production ML. Flip a packet for the notes.</p>
        <div className="gh-packets">
          {projects.map((p, i) => (
            <Packet key={p.slug} p={p} i={i} onZoom={openLb} />
          ))}
        </div>
      </section>

      <section className="gh-section" id="gh-seasons">
        <h2 className="gh-h2">Growing seasons</h2>
        <ol className="gh-seasons">
          {experiences.map((e) => {
            const { start, end } = splitPeriod(e.period);
            const growing = end === "Present";
            return (
              <li key={e.company}>
                <div className="gh-stake">
                  <span>Planted {start}</span>
                  <b>{growing ? "Still growing" : `Harvested ${end}`}</b>
                </div>
                <div className="gh-season-body">
                  <h3>{e.role}</h3>
                  <p className="gh-season-co">
                    {e.company} · {e.location}
                  </p>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="gh-season-tags">
                    {e.skills.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {(e.link || e.projectLink) && (
                    <p className="gh-season-links">
                      {e.link && (
                        <a href={e.link} {...ext}>
                          {e.linkLabel} ↗
                        </a>
                      )}
                      {e.projectLink && (
                        <a href={e.projectLink} {...ext}>
                          {e.projectLinkLabel} ↗
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="gh-section">
        <h2 className="gh-h2">Roots</h2>
        <div className="gh-roots">
          <div className="gh-roots-head">
            <p className="gh-eyebrow">
              {education.location} · {education.graduation}
            </p>
            <h3>{education.university}</h3>
            <p>{education.degree}</p>
            <p className="gh-roots-club">{education.involvement}</p>
          </div>
          <ul className="gh-seedlings">
            {education.coursework.map((c) => (
              <li key={c}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 22 V11" stroke="#4e7a4f" strokeWidth="2" fill="none" />
                  <path d="M12 13 C 6 13, 3 9, 3 5 C 8 5, 12 8, 12 13 Z M12 11 C 17 11, 21 8, 21 4 C 16 4, 12 7, 12 11 Z" fill="#7fb069" />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="gh-section">
        <h2 className="gh-h2">Garden beds</h2>
        <div className="gh-beds">
          {skills.map((s) => (
            <div key={s.category} className="gh-bed">
              <h3>{s.category}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="gh-section gh-forest" id="gh-forest">
        <div>
          <h2 className="gh-h2">A small forest</h2>
          <p className="gh-sub">Each tree below stands for 1,000 planted through community drives and seed-orb distribution.</p>
          <div className="gh-trees" role="img" aria-label="100 tree icons, each one representing 1,000 trees">
            {Array.from({ length: 100 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${(i % 10) * 40 + Math.floor(i / 10) * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="gh-forest-notes">
          {leadership.map((g) => (
            <div key={g.label}>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="gh-press">
            {press.map((l) => (
              <a key={l.url} href={l.url} {...ext}>
                {l.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="gh-foot">
        <h2 className="gh-say">
          Come say <em>hello</em>
        </h2>
        <a className="gh-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="gh-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...ext}>
              {l.label}
            </a>
          ))}
        </div>
      </footer>
      {lb}
    </div>
  );
}
