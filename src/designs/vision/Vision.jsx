import { useState } from "react";
import "./vision.css";
import { education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills, stats } from "../data";

// Hand-placed boxes over the portrait, in percent of the image
const detections = [
  { label: "person", conf: 0.97, c: "#4cc9f0", box: [18, 28, 56, 72] },
  { label: "eyeglasses", conf: 0.91, c: "#f72585", box: [43.5, 39.5, 15, 7] },
  { label: "smartwatch", conf: 0.86, c: "#ffd166", box: [37.2, 86.4, 6, 9.4] },
  { label: "mountain", conf: 0.88, c: "#06d6a0", box: [13, 16.5, 28.5, 28] },
  { label: "waterfall", conf: 0.74, c: "#9b5de5", box: [75.8, 35.5, 3.4, 13] },
  { label: "cloud", conf: 0.82, c: "#ff9f1c", box: [47, 3, 44, 20] },
];

const classColor = { project: "#ff9f1c", internship: "#ffd166", research: "#06d6a0", skill: "#f72585", impact: "#9b5de5" };

function Frame() {
  const [hover, setHover] = useState(null);
  return (
    <figure className="vz-frame">
      <div className="vz-frame-img">
        <img src={photo} alt={`${person.name} at Tunnel View, Yosemite`} />
        <span className="vz-scan" aria-hidden="true" />
        {detections.map((d, i) => (
          <span
            key={d.label}
            className={`vz-det${hover === i ? " is-hover" : ""}${hover !== null && hover !== i ? " is-dim" : ""}`}
            style={{
              "--c": d.c,
              left: `${d.box[0]}%`,
              top: `${d.box[1]}%`,
              width: `${d.box[2]}%`,
              height: `${d.box[3]}%`,
              animationDelay: `${0.5 + i * 0.25}s`,
            }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <b className={d.box[1] < 8 ? "is-below" : ""}>
              {d.label} {d.conf.toFixed(2)}
            </b>
          </span>
        ))}
      </div>
      <figcaption>
        <span>frame_0001.webp · 700×649</span>
        <span>{detections.length} detections · illustrative overlay</span>
      </figcaption>
    </figure>
  );
}

function Label({ cls, id, extra }) {
  return (
    <span className="vz-label" style={{ "--c": classColor[cls] }}>
      {cls} · id {String(id).padStart(2, "0")}
      {extra ? ` · ${extra}` : ""}
    </span>
  );
}

export default function Vision() {
  const maxSkills = Math.max(...skills.map((s) => s.items.length));
  return (
    <div className="vz">
      <header className="vz-hud">
        <span className="vz-rec">● REC</span>
        <span>model: portfolio-detr</span>
        <span>conf ≥ 0.70</span>
        <span className="vz-hud-right">{person.location}</span>
      </header>

      <section className="vz-hero">
        <div className="vz-hero-text">
          <p className="vz-mono vz-dim">$ python detect.py --source adi.jpg</p>
          <h1 className="vz-name">
            {firstName}
            <br />
            {lastName}
          </h1>
          <p className="vz-tag">{person.tagline}</p>
          <p className="vz-lede">{person.summary}</p>
          <dl className="vz-counts">
            <div>
              <dt>projects</dt>
              <dd>{stats.projects}</dd>
            </div>
            <div>
              <dt>internships</dt>
              <dd>{stats.internships}</dd>
            </div>
            <div>
              <dt>research</dt>
              <dd>{stats.research}</dd>
            </div>
          </dl>
        </div>
        <Frame />
      </section>

      <section className="vz-section">
        <h2 className="vz-h2">
          <span className="vz-mono vz-dim">class</span> project
        </h2>
        <div className="vz-projects">
          {projects.map((p, i) => (
            <article key={p.slug} className="vz-box vz-project" style={{ "--c": classColor.project }}>
              <Label cls="project" id={i + 1} extra={p.period} />
              <div className="vz-project-img">
                <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} loading="lazy" />
              </div>
              <h3>{p.title}</h3>
              <p className="vz-mono vz-dim">{p.category}</p>
              <ul>
                {p.bullets.slice(0, 2).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="vz-chips">
                {p.technologies.slice(0, 5).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <a className="vz-link" href={p.link} {...ext}>
                view source →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="vz-section">
        <h2 className="vz-h2">
          <span className="vz-mono vz-dim">tracks</span> experience
        </h2>
        <div className="vz-tracks">
          {experiences.map((e, i) => (
            <article key={e.company} className="vz-box vz-track" style={{ "--c": classColor[e.type] }}>
              <Label cls={e.type} id={i + 1} />
              <div className="vz-track-head">
                <h3>{e.role}</h3>
                <p className="vz-mono">{e.period}</p>
              </div>
              <p className="vz-track-co">
                {e.company} · {e.location}
              </p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="vz-section vz-split">
        <div>
          <h2 className="vz-h2">
            <span className="vz-mono vz-dim">class</span> skill
          </h2>
          <p className="vz-mono vz-dim vz-chart-title">Skills listed per category</p>
          <ul className="vz-bars">
            {skills.map((s) => (
              <li key={s.category}>
                <span className="vz-bar-label">{s.category}</span>
                <span className="vz-bar-track">
                  <i style={{ width: `${(s.items.length / maxSkills) * 100}%` }} />
                </span>
                <span className="vz-bar-n">{s.items.length}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="vz-skill-list">
          {skills.map((s) => (
            <div key={s.category}>
              <h3 className="vz-mono">{s.category}</h3>
              <div className="vz-chips">
                {s.items.map((it) => (
                  <span key={it}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="vz-section">
        <h2 className="vz-h2">
          <span className="vz-mono vz-dim">class</span> impact
        </h2>
        <div className="vz-impact">
          {leadership.map((g, i) => (
            <article key={g.label} className="vz-box" style={{ "--c": classColor.impact }}>
              <Label cls="impact" id={i + 1} />
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="vz-press">
          {press.map((l) => (
            <a key={l.url} href={l.url} {...ext}>
              {l.name} ↗
            </a>
          ))}
        </div>
      </section>

      <footer className="vz-foot">
        <p className="vz-mono vz-dim">&gt;&gt;&gt; contact = await adi.reach_out()</p>
        <a className="vz-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <p className="vz-mono vz-dim">
          status: open to new grad roles · {education.graduation}
        </p>
        <div className="vz-links">
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
