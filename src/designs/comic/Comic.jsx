import { useState } from "react";
import "./comic.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

const SFX = ["KA-CHUNK!", "ZAP!", "WHOOSH!", "BLIP!", "SHIPPED!", "BOOM!", "CLICK!", "KRAK!"];
const inks = ["#ffde00", "#00a8e8", "#e6007e", "#7ed957", "#ff8a00"];
const captions = ["Meanwhile…", "Then…", "Next…", "Finally…"];

function Burst({ seed, color }) {
  const [n, setN] = useState(seed);
  return (
    <button type="button" className="cm-burst" style={{ "--ink": color }} onClick={() => setN((v) => v + 1)} aria-label="Change sound effect">
      {SFX[n % SFX.length]}
    </button>
  );
}

export default function Comic() {
  const [lb, openLb] = useLightbox();
  return (
    <div className="cm">
      <section className="cm-cover">
        <div className="cm-corner">
          <b>No. 1</b>
          <span>Free</span>
          <span>{person.location}</span>
        </div>
        <p className="cm-the">The adventures of</p>
        <h1 className="cm-title">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
        <div className="cm-cover-art">
          <div className="cm-halftone">
            <img src={photo} alt={`${person.name} at Yosemite, drawn as a comic cover`} />
          </div>
          <span className="cm-callout cm-callout-a">Featuring {projects.length} projects!</span>
          <span className="cm-callout cm-callout-b">100,000+ trees planted!</span>
          <span className="cm-callout cm-callout-c">Computer vision powers!</span>
        </div>
        <p className="cm-cover-blurb">{person.summary}</p>
      </section>

      <section className="cm-section">
        <h2 className="cm-h2">Origin story</h2>
        <div className="cm-strip">
          {about.map((a, i) => (
            <article key={a.label} className="cm-panel" style={{ "--ink": inks[i] }}>
              <p className="cm-caption">{a.label}</p>
              <div className="cm-bubble">{a.text}</div>
            </article>
          ))}
        </div>
      </section>

      {projects.map((p, i) => (
        <section key={p.slug} className="cm-section cm-episode">
          <h2 className="cm-h2">
            Episode {i + 1}: {p.title}
          </h2>
          <div className="cm-page">
            <button type="button" className="cm-panel cm-panel-art" onClick={() => openLb(p, 0)} aria-label={`Enlarge ${p.imageLabels[0]}`} style={{ "--ink": inks[i % inks.length] }}>
              <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} loading="lazy" />
              <span className="cm-caption cm-caption-pin">
                {p.period} · {p.category}
              </span>
            </button>
            <div className="cm-panel cm-panel-sfx" style={{ "--ink": inks[(i + 2) % inks.length] }}>
              <Burst seed={i * 3} color={inks[(i + 1) % inks.length]} />
            </div>
            {p.bullets.map((b, j) => (
              <div key={b} className="cm-panel cm-panel-text" style={{ "--ink": inks[(i + j + 1) % inks.length] }}>
                <p className="cm-caption">{captions[j] || "And…"}</p>
                <p>{b}</p>
              </div>
            ))}
            {p.images.slice(1).map((src, j) => (
              <button key={src} type="button" className="cm-panel cm-panel-art cm-panel-small" onClick={() => openLb(p, j + 1)} aria-label={`Enlarge ${p.imageLabels[j + 1]}`} style={{ "--ink": inks[(i + j + 3) % inks.length] }}>
                <img src={src} alt={`${p.title}: ${p.imageLabels[j + 1]}`} loading="lazy" />
                <span className="cm-caption cm-caption-pin">{p.imageLabels[j + 1]}</span>
              </button>
            ))}
            <div className="cm-panel cm-panel-gear">
              <p className="cm-caption">Gadgets used</p>
              <p>{p.technologies.join(" · ")}</p>
              <a className="cm-btn" href={p.link} {...ext}>
                Read the source!
              </a>
            </div>
          </div>
        </section>
      ))}

      <section className="cm-section">
        <h2 className="cm-h2">Team-ups</h2>
        <div className="cm-teams">
          {experiences.map((e, i) => (
            <article key={e.company} className="cm-dossier" style={{ "--ink": inks[i % inks.length] }}>
              <p className="cm-caption">{e.period}</p>
              <h3>{e.company}</h3>
              <p className="cm-role">
                As {e.role} · {e.location}
              </p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="cm-powers">
                <b>Powers gained:</b> {e.skills.join(", ")}
              </p>
              {(e.link || e.projectLink) && (
                <p className="cm-links">
                  {e.link && (
                    <a href={e.link} {...ext}>
                      {e.linkLabel}
                    </a>
                  )}
                  {e.projectLink && (
                    <a href={e.projectLink} {...ext}>
                      {e.projectLinkLabel}
                    </a>
                  )}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="cm-section cm-split">
        <div>
          <h2 className="cm-h2">Powers</h2>
          <div className="cm-powergrid">
            {skills.map((s, i) => (
              <div key={s.category} className="cm-power" style={{ "--ink": inks[i % inks.length] }}>
                <h3>{s.category}</h3>
                <p>{s.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="cm-h2">Training montage</h2>
          <div className="cm-dossier cm-training" style={{ "--ink": "#00a8e8" }}>
            <p className="cm-caption">{education.graduation}</p>
            <h3>{education.university}</h3>
            <p className="cm-role">{education.degree}</p>
            <ul className="cm-montage">
              {education.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <p>{education.involvement}</p>
          </div>
        </div>
      </section>

      <section className="cm-section">
        <h2 className="cm-h2">Real-life heroics</h2>
        <div className="cm-heroics">
          {leadership.map((g, i) => (
            <article key={g.label} className="cm-panel cm-panel-text" style={{ "--ink": inks[(i + 2) % inks.length] }}>
              <span className="cm-pow" aria-hidden="true">
                {["POW!", "BAM!", "WOW!"][i]}
              </span>
              <p className="cm-caption">{g.label}</p>
              {g.items.map((it) => (
                <p key={it}>{it}</p>
              ))}
            </article>
          ))}
        </div>
        <p className="cm-press">
          <b>As seen in:</b>
          {press.map((l) => (
            <a key={l.url} href={l.url} {...ext}>
              {l.name}
            </a>
          ))}
        </p>
      </section>

      <footer className="cm-foot">
        <div className="cm-letters">
          <p className="cm-caption">Letters page</p>
          <h2>Write to the hero!</h2>
          <a className="cm-mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <p className="cm-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} {...ext}>
                {l.label}
              </a>
            ))}
          </p>
        </div>
        <p className="cm-tbc">To be continued…</p>
      </footer>
      {lb}
    </div>
  );
}
