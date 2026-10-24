import { useState } from "react";
import "./gilded.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

const acts = ["I", "II", "III", "IV", "V"];

function Ornament() {
  return (
    <svg className="gd-orn" viewBox="0 0 220 24" aria-hidden="true">
      <path d="M0 12 H86 M134 12 H220" />
      <path d="M92 12 L110 2 L128 12 L110 22 Z" />
      <path d="M100 12 L110 7 L120 12 L110 17 Z" className="gd-orn-fill" />
      <circle cx="80" cy="12" r="2.4" className="gd-orn-fill" />
      <circle cx="140" cy="12" r="2.4" className="gd-orn-fill" />
    </svg>
  );
}

export default function Gilded() {
  const [act, setAct] = useState(0);
  const [lb, openLb] = useLightbox();
  const p = projects[act];

  return (
    <div className="gd">
      <header className="gd-top">
        <span>Est. Noida</span>
        <nav>
          <a href="#gd-programme">Programme</a>
          <a href="#gd-engagements">Engagements</a>
          <a href="#gd-repertoire">Repertoire</a>
          <a href="#gd-honours">Honours</a>
          <a href="#gd-rsvp">RSVP</a>
        </nav>
        <span>{person.location}</span>
      </header>

      <section className="gd-hero">
        <div className="gd-sun" aria-hidden="true" />
        <div className="gd-arch">
          <img src={photo} alt={`Portrait of ${person.name}`} />
        </div>
        <p className="gd-presents">The Wisconsin season presents</p>
        <h1 className="gd-name">
          <span>{firstName}</span>
          <span className="gd-name-dot" aria-hidden="true">◆</span>
          <span>{lastName}</span>
        </h1>
        <Ornament />
        <p className="gd-tag">{person.tagline}</p>
        <p className="gd-lede">{person.summary}</p>
      </section>

      <section className="gd-section">
        <h2 className="gd-h2">The Protagonist</h2>
        <div className="gd-about">
          {about.map((a) => (
            <article key={a.label} className="gd-panel">
              <h3>{a.label}</h3>
              <p>{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gd-section" id="gd-programme">
        <h2 className="gd-h2">Tonight’s Programme</h2>
        <div className="gd-acts" role="tablist" aria-label="Projects">
          {projects.map((pr, i) => (
            <button key={pr.slug} type="button" role="tab" aria-selected={act === i} className={act === i ? "is-on" : ""} onClick={() => setAct(i)}>
              <span className="gd-act-no">Act {acts[i]}</span>
              <span className="gd-act-title">{pr.title}</span>
              <span className="gd-act-year">{pr.period}</span>
            </button>
          ))}
        </div>
        <article className="gd-feature" key={p.slug} role="tabpanel">
          <div className="gd-feature-media">
            {p.images.map((src, j) => (
              <button key={src} type="button" onClick={() => openLb(p, j)} aria-label={`Enlarge ${p.imageLabels[j]}`}>
                <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
                <span>{p.imageLabels[j]}</span>
              </button>
            ))}
          </div>
          <div className="gd-feature-text">
            <p className="gd-kicker">
              Act {acts[act]} · {p.category}
            </p>
            <h3>{p.title}</h3>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="gd-cast">
              <span>With</span> {p.technologies.join(", ")}
            </p>
            <a className="gd-btn" href={p.link} {...ext}>
              View the score on GitHub
            </a>
          </div>
        </article>
      </section>

      <section className="gd-section" id="gd-engagements">
        <h2 className="gd-h2">Engagements</h2>
        <div className="gd-engagements">
          {experiences.map((e) => (
            <article key={e.company} className="gd-panel gd-engagement">
              <p className="gd-kicker">{e.period}</p>
              <h3>{e.role}</h3>
              <p className="gd-venue">
                {e.company} · {e.location}
              </p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="gd-cast">{e.skills.join(" · ")}</p>
              {(e.link || e.projectLink) && (
                <p className="gd-links">
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

      <section className="gd-section gd-split" id="gd-repertoire">
        <div>
          <h2 className="gd-h2 gd-h2-left">Repertoire</h2>
          <div className="gd-rep">
            {skills.map((s) => (
              <div key={s.category}>
                <h3>{s.category}</h3>
                <p>{s.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="gd-panel gd-alma">
          <p className="gd-kicker">Alma mater</p>
          <h3>{education.university}</h3>
          <p className="gd-venue">
            {education.degree} · {education.graduation}
          </p>
          <Ornament />
          <ul>
            {education.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="gd-alma-note">{education.involvement}</p>
        </aside>
      </section>

      <section className="gd-section" id="gd-honours">
        <h2 className="gd-h2">Honours &amp; Causes</h2>
        <div className="gd-honours">
          {leadership.map((g, i) => (
            <article key={g.label} className="gd-medal-card">
              <span className="gd-medal" aria-hidden="true">
                {["❦", "§", "✦"][i]}
              </span>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <p className="gd-press">
          <span>As reviewed in</span>
          {press.map((l) => (
            <a key={l.url} href={l.url} {...ext}>
              {l.name}
            </a>
          ))}
        </p>
      </section>

      <footer className="gd-rsvp" id="gd-rsvp">
        <div className="gd-invite">
          <p className="gd-kicker">The pleasure of your reply is requested</p>
          <h2>RSVP</h2>
          <Ornament />
          <a className="gd-mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <p className="gd-venue">Open to new grad roles · {education.graduation}</p>
          <p className="gd-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} {...ext}>
                {l.label}
              </a>
            ))}
          </p>
        </div>
      </footer>
      {lb}
    </div>
  );
}
