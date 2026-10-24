import { useEffect, useState } from "react";
import "./pitwall.css";
import { education, experiences, ext, firstName, lastName, leadership, links, person, projects, skills } from "../data";

// Tyre compound encodes how recent a project is, newest on softs
const compound = (year) => (year >= 2026 ? "S" : year >= 2025 ? "M" : year >= 2023 ? "H" : "I");
const code = (title) => title.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
const sectorClass = ["is-purple", "is-green", "is-yellow", "is-green"];
const setup = ["Power unit", "Aerodynamics", "Onboard cameras", "Chassis", "Pit crew", "Telemetry"];

const months = { January: 0, February: 1, March: 2, April: 3, May: 4, June: 5, July: 6, August: 7, September: 8, October: 9, November: 10, December: 11 };
const toMonth = (s) => {
  if (s === "Present") {
    const d = new Date();
    return d.getFullYear() * 12 + d.getMonth();
  }
  const [m, y] = s.split(" ");
  return Number(y) * 12 + months[m];
};

function StartLights() {
  const [lit, setLit] = useState(0);
  const [run, setRun] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLit(6);
      return;
    }
    setLit(0);
    const timers = [1, 2, 3, 4, 5].map((n) => setTimeout(() => setLit(n), n * 650));
    timers.push(setTimeout(() => setLit(6), 5 * 650 + 900));
    return () => timers.forEach(clearTimeout);
  }, [run]);
  return (
    <div className="pw-lights-wrap">
      <div className="pw-lights" role="img" aria-label="Five start lights">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="pw-light-col">
            <i />
            <i className={lit >= n && lit < 6 ? "is-on" : ""} />
            <i className={lit >= n && lit < 6 ? "is-on" : ""} />
          </div>
        ))}
      </div>
      <p className={`pw-away${lit === 6 ? " is-on" : ""}`} aria-live="polite">
        {lit === 6 ? "Lights out and away we go" : "Formation lap complete"}
      </p>
      <button type="button" className="pw-replay" onClick={() => setRun((r) => r + 1)}>
        Restart the race
      </button>
    </div>
  );
}

export default function PitWall() {
  const [sel, setSel] = useState(0);
  const p = projects[sel];
  const stints = [...experiences].reverse().map((e) => {
    const [a, b] = e.period.split(" - ");
    return { ...e, from: toMonth(a), to: toMonth(b) };
  });
  const minM = Math.min(...stints.map((s) => s.from));
  const maxM = Math.max(...stints.map((s) => s.to)) + 1;
  const span = maxM - minM;
  const years = [];
  for (let y = Math.ceil(minM / 12); y * 12 < maxM; y++) years.push(y);

  return (
    <div className="pw">
      <header className="pw-bar">
        <span className="pw-flag" aria-hidden="true" />
        <span className="pw-bar-title">Madison Grand Prix</span>
        <span className="pw-bar-lap">
          Lap <b>{projects.length}</b>/{projects.length}
        </span>
        <span className="pw-bar-status">● Track clear</span>
      </header>

      <section className="pw-hero">
        <StartLights />
        <div className="pw-driver">
          <span className="pw-number">26</span>
          <div>
            <p className="pw-label">Car 26 · Class of {education.graduation.slice(-4)} · {person.location}</p>
            <h1 className="pw-name">
              <span>{firstName}</span> {lastName}
            </h1>
            <p className="pw-lede">{person.summary}</p>
          </div>
        </div>
      </section>

      <section className="pw-section" id="pw-timing">
        <div className="pw-head">
          <h2>Timing tower</h2>
          <p className="pw-legend">
            Tyre = project age:
            <span className="pw-tyre pw-S">S</span> 2026
            <span className="pw-tyre pw-M">M</span> 2025
            <span className="pw-tyre pw-H">H</span> 2023
            <span className="pw-tyre pw-I">I</span> 2021
          </p>
        </div>
        <div className="pw-timing">
          <ol className="pw-tower">
            {projects.map((pr, i) => (
              <li key={pr.slug}>
                <button type="button" className={sel === i ? "is-on" : ""} onClick={() => setSel(i)} aria-pressed={sel === i}>
                  <span className="pw-pos">{i + 1}</span>
                  <span className="pw-team" style={{ "--t": ["#e10600", "#00a19c", "#ff8000", "#3671c6", "#52e252"][i] }} />
                  <span className="pw-code">{code(pr.title)}</span>
                  <span className="pw-int">{i === 0 ? "Leader" : `${pr.period}`}</span>
                  <span className={`pw-tyre pw-${compound(Number(pr.period))}`}>{compound(Number(pr.period))}</span>
                </button>
              </li>
            ))}
          </ol>
          <article className="pw-onboard" key={p.slug}>
            <div className="pw-cam">
              <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} />
              <div className="pw-cam-hud" aria-hidden="true">
                <span>Onboard · {code(p.title)}</span>
                <span className="pw-live">Live</span>
              </div>
              <div className="pw-cam-strip">
                {p.images.slice(1).map((src, j) => (
                  <img key={src} src={src} alt={`${p.title}: ${p.imageLabels[j + 1]}`} loading="lazy" />
                ))}
              </div>
            </div>
            <div className="pw-onboard-text">
              <p className="pw-label">{p.category}</p>
              <h3>{p.title}</h3>
              <ol className="pw-sectors">
                {p.bullets.map((b, j) => (
                  <li key={b} className={sectorClass[j % 4]}>
                    <span className="pw-sector-tag">S{j + 1}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ol>
              <p className="pw-pu">
                <span className="pw-label">Power unit</span> {p.technologies.slice(0, 6).join(" · ")}
              </p>
              <a className="pw-btn" href={p.link} {...ext}>
                Telemetry on GitHub ↗
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="pw-section">
        <div className="pw-head">
          <h2>Stints</h2>
          <p className="pw-legend">
            <span className="pw-key pw-key-int" /> Internship <span className="pw-key pw-key-res" /> Research
          </p>
        </div>
        <div className="pw-gantt" role="img" aria-label="Timeline of roles from 2023 to now">
          <div className="pw-gantt-years">
            {years.map((y) => (
              <span key={y} style={{ left: `${((y * 12 - minM) / span) * 100}%` }}>
                {y}
              </span>
            ))}
          </div>
          {stints.map((s) => (
            <div key={s.company} className="pw-gantt-row">
              <span className="pw-gantt-label">{s.company.replace("Speech Processing & Auditory Neuroscience Laboratory", "SPAN Lab")}</span>
              <div className="pw-gantt-track">
                <i
                  className={s.type === "research" ? "pw-key-res" : "pw-key-int"}
                  style={{ left: `${((s.from - minM) / span) * 100}%`, width: `${((s.to - s.from + 1) / span) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pw-stints">
          {[...stints].reverse().map((s) => (
            <article key={s.company} className="pw-stint">
              <p className="pw-label">
                {s.period} · {s.to - s.from + 1} months
              </p>
              <h3>{s.role}</h3>
              <p className="pw-stint-co">{s.company}</p>
              <p>{s.bullets[0]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pw-section pw-split">
        <div>
          <div className="pw-head">
            <h2>Car setup</h2>
          </div>
          <dl className="pw-setup">
            {skills.map((s, i) => (
              <div key={s.category}>
                <dt>
                  {setup[i]} <small>{s.category}</small>
                </dt>
                <dd>{s.items.slice(0, 8).join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <div className="pw-head">
            <h2>Race control</h2>
          </div>
          <ul className="pw-rc">
            {leadership.flatMap((g) => g.items.map((it) => ({ g: g.label, it }))).map(({ g, it }) => (
              <li key={it}>
                <span className="pw-rc-tag">{g}</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="pw-foot">
        <div className="pw-checker" aria-hidden="true" />
        <p className="pw-radio">
          <span className="pw-live">Team radio</span> “Box, box. Open to new grad roles.”
        </p>
        <a className="pw-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="pw-links">
          {links.map((l) => (
            <a key={l.label} className="pw-btn" href={l.href} {...ext}>
              {l.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
