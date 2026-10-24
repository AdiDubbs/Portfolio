import { useEffect, useState } from "react";
import "./greenhouse.css";
import { experiences, ext, firstName, lastName, leadership, links, person, press, projects, skills, splitPeriod } from "../data";

const packetColors = ["#e9a93a", "#c9d9a4", "#e7b7c8", "#9fc4d6", "#f2d27a"];

function Sprout() {
  return (
    <svg className="gh-sprout" viewBox="0 0 320 360" role="img" aria-label="A sprout growing from a terracotta pot">
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

function Packet({ p, i }) {
  const [back, setBack] = useState(false);
  return (
    <article className={`gh-packet${back ? " is-back" : ""}`} style={{ "--pk": packetColors[i % packetColors.length] }}>
      <div className="gh-face gh-front" inert={back}>
        <p className="gh-variety">Variety no. {String(i + 1).padStart(2, "0")}</p>
        <h3>{p.title}</h3>
        <div className="gh-window">
          <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} loading="lazy" />
        </div>
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
          <b>Companion plants</b> {p.technologies.slice(0, 6).join(", ")}
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
  return (
    <div className="gh">
      <header className="gh-nav">
        <span className="gh-logo">
          <i aria-hidden="true" /> {firstName.toLowerCase()}’s greenhouse
        </span>
        <nav>
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
          <Sprout />
          <p className="gh-hero-trees">
            <TreeCount />
            <span>trees planted through campaigns I led</span>
          </p>
        </div>
      </section>

      <section className="gh-section" id="gh-packets">
        <h2 className="gh-h2">Seed packets</h2>
        <p className="gh-sub">Every project I’ve grown, from first Android app to production ML. Flip a packet for the notes.</p>
        <div className="gh-packets">
          {projects.map((p, i) => (
            <Packet key={p.slug} p={p} i={i} />
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
                    {e.bullets.slice(0, 2).map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
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
    </div>
  );
}
