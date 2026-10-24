import { useEffect, useRef, useState } from "react";
import "./raster.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, press, projects, skills, stats } from "../data";
import { useLightbox } from "../shared/Lightbox";

const months = { January: "01", February: "02", March: "03", April: "04", May: "05", June: "06", July: "07", August: "08", September: "09", October: "10", November: "11", December: "12" };
const numeric = (s) => (s === "Present" ? "now" : `${months[s.split(" ")[0]]}.${s.split(" ")[1]}`);

export default function Raster() {
  const [grid, setGrid] = useState(false);
  const [open, setOpen] = useState(projects[0].slug);
  const [lb, openLb] = useLightbox();
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    const move = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      el.style.setProperty("--rw", String(Math.round(62 + x * 63)));
      el.style.setProperty("--rg", String(Math.round(500 + (1 - y) * 400)));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="rs" ref={root}>
      {grid && (
        <div className="rs-grid" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      )}
      <button type="button" className="rs-grid-btn" onClick={() => setGrid((g) => !g)} aria-pressed={grid}>
        {grid ? "Hide grid" : "Show grid"}
      </button>

      <header className="rs-head">
        <span className="rs-mark" aria-hidden="true" />
        <span>{person.name}</span>
        <span>Portfolio 2021–2026</span>
        <span>{person.location}</span>
      </header>

      <section className="rs-hero">
        <p className="rs-vert">AI / ML · Full-stack · Computer vision</p>
        <h1 className="rs-name">
          <span>{firstName}</span>
          <span>{lastName}</span>
        </h1>
        <p className="rs-hint">Move the pointer: width follows x, weight follows y.</p>
        <div className="rs-hero-cols">
          <p className="rs-strong">{person.tagline}</p>
          <p>{person.summary}</p>
          <dl className="rs-facts">
            <div><dt>Projects</dt><dd>{stats.projects}</dd></div>
            <div><dt>Internships</dt><dd>{stats.internships}</dd></div>
            <div><dt>Research</dt><dd>{stats.research}</dd></div>
          </dl>
        </div>
      </section>

      <section className="rs-section">
        <h2 className="rs-h2">Profile</h2>
        <div className="rs-cols3">
          {about.map((a) => (
            <div key={a.label}>
              <h3>{a.label}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rs-section">
        <h2 className="rs-h2">Projects</h2>
        <ol className="rs-works">
          {projects.map((p) => {
            const isOpen = open === p.slug;
            return (
              <li key={p.slug} className={isOpen ? "is-open" : ""}>
                <button type="button" className="rs-row" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : p.slug)}>
                  <span className="rs-year">{p.period}</span>
                  <span className="rs-title">{p.title}</span>
                  <span className="rs-cat">{p.category}</span>
                  <span className="rs-sign" aria-hidden="true">{isOpen ? "–" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="rs-detail">
                    <div className="rs-shots">
                      {p.images.map((src, j) => (
                        <button key={src} type="button" onClick={() => openLb(p, j)} aria-label={`Enlarge ${p.imageLabels[j]}`}>
                          <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
                          <span>
                            Fig. {j + 1} — {p.imageLabels[j]}
                          </span>
                        </button>
                      ))}
                    </div>
                    <ul className="rs-bullets">
                      {p.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <div className="rs-detail-foot">
                      <p>{p.technologies.join(" / ")}</p>
                      <a href={p.link} {...ext}>
                        Source →
                      </a>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="rs-section">
        <h2 className="rs-h2">Experience</h2>
        <div className="rs-exp">
          {experiences.map((e) => {
            const [a, b] = e.period.split(" - ");
            return (
              <article key={e.company}>
                <p className="rs-dates">
                  {numeric(a)} → {numeric(b)}
                </p>
                <div>
                  <h3>{e.role}</h3>
                  <p className="rs-co">
                    {e.company}, {e.location}
                  </p>
                  <ul className="rs-bullets">
                    {e.bullets.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="rs-skills">{e.skills.join(" / ")}</p>
                  {(e.link || e.projectLink) && (
                    <p className="rs-links">
                      {e.link && (
                        <a href={e.link} {...ext}>
                          {e.linkLabel} →
                        </a>
                      )}
                      {e.projectLink && (
                        <a href={e.projectLink} {...ext}>
                          {e.projectLinkLabel} →
                        </a>
                      )}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rs-section rs-edu">
        <h2 className="rs-h2">Education</h2>
        <div className="rs-edu-grid">
          <div>
            <p className="rs-big">{education.graduation.split(" ")[1]}</p>
            <p className="rs-strong">{education.university}</p>
            <p>{education.degree}</p>
            <p className="rs-muted">{education.involvement}</p>
          </div>
          <ul className="rs-courses">
            {education.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rs-section">
        <h2 className="rs-h2">Skills</h2>
        <div className="rs-skillgrid">
          {skills.map((s) => (
            <div key={s.category}>
              <h3>
                {s.category} <span>{s.items.length}</span>
              </h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rs-section rs-impact">
        <h2 className="rs-h2">Activism</h2>
        <div className="rs-impact-grid">
          <p className="rs-mega">
            100,000<span>+</span>
          </p>
          <p className="rs-mega-label">trees planted through campaigns I led</p>
          {leadership.map((g) => (
            <div key={g.label}>
              <h3>{g.label}</h3>
              <ul className="rs-bullets">
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ul className="rs-press">
          {press.map((l) => (
            <li key={l.url}>
              <a href={l.url} {...ext}>
                <b>{l.name}</b> <span>{l.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="rs-foot">
        <p className="rs-strong">Contact</p>
        <a className="rs-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="rs-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...ext}>
              {l.label} →
            </a>
          ))}
        </div>
      </footer>
      {lb}
    </div>
  );
}
