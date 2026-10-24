import { useRef, useState } from "react";
import "./monograph.css";
import { education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills, stats } from "../data";

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function Monograph() {
  const [open, setOpen] = useState(projects[0].slug);
  const [plate, setPlate] = useState(null);
  const plateRef = useRef(null);

  const movePlate = (e) => {
    if (!plateRef.current) return;
    plateRef.current.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 120}px)`;
  };

  return (
    <div className="mono">
      <header className="mono-bar">
        <span className="mono-bar-mark">A.&nbsp;Dubey</span>
        <span className="mono-bar-title">Catalogue of Works, 2021–2026</span>
        <nav className="mono-bar-nav">
          <a href="#mono-works">Works</a>
          <a href="#mono-chronology">Chronology</a>
          <a href="#mono-practice">Practice</a>
          <a href="#mono-recognition">Recognition</a>
        </nav>
      </header>

      <section className="mono-hero">
        <h1 className="mono-name">
          <span>{firstName}</span>
          <em>{lastName}</em>
        </h1>
        <figure className="mono-figure">
          <img src={photo} alt={`Portrait of ${person.name}`} />
          <figcaption>Fig. 1 &nbsp;Tunnel View, Yosemite Valley</figcaption>
        </figure>
        <div className="mono-hero-text">
          <p className="mono-kicker">{person.tagline}</p>
          <p className="mono-lede">{person.summary}</p>
          <dl className="mono-facts">
            <div><dt>Works</dt><dd>{stats.projects}</dd></div>
            <div><dt>Internships</dt><dd>{stats.internships}</dd></div>
            <div><dt>Research posts</dt><dd>{stats.research}</dd></div>
            <div><dt>Based in</dt><dd className="mono-facts-place">{person.location}</dd></div>
          </dl>
        </div>
      </section>

      <section className="mono-section" id="mono-works">
        <div className="mono-section-head">
          <h2>Selected Works</h2>
          <p>Entries are listed newest first. Select a title to read the full entry.</p>
        </div>
        <ol className="mono-works" onMouseMove={movePlate} onMouseLeave={() => setPlate(null)}>
          {projects.map((p, i) => {
            const isOpen = open === p.slug;
            return (
              <li key={p.slug} className={`mono-work${isOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  className="mono-work-row"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : p.slug)}
                  onMouseEnter={() => setPlate(isOpen ? null : p.images[0])}
                  onFocus={() => setPlate(null)}
                >
                  <span className="mono-work-no">Cat. {roman[i]}</span>
                  <span className="mono-work-title">{p.title}</span>
                  <span className="mono-work-medium">{p.category}</span>
                  <span className="mono-work-year">{p.period}</span>
                </button>
                {isOpen && (
                  <div className="mono-entry">
                    <div className="mono-entry-plates">
                      {p.images.map((src, j) => (
                        <figure key={src}>
                          <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
                          <figcaption>
                            Pl. {roman[i]}.{j + 1} &nbsp;{p.imageLabels[j]}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                    <div className="mono-entry-text">
                      <ul>
                        {p.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <p className="mono-entry-medium">
                        <span>Medium</span> {p.technologies.slice(0, 7).join(", ")}.
                      </p>
                      <a className="mono-link" href={p.link} {...ext}>
                        View source on GitHub ↗
                      </a>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div ref={plateRef} className={`mono-plate${plate ? " is-on" : ""}`} aria-hidden="true">
          {plate && <img src={plate} alt="" />}
        </div>
      </section>

      <section className="mono-section" id="mono-chronology">
        <div className="mono-section-head">
          <h2>Chronology</h2>
          <p>Appointments in research and industry.</p>
        </div>
        <ol className="mono-chrono">
          {experiences.map((e) => (
            <li key={e.company}>
              <span className="mono-chrono-date">{e.period.replace(" - ", " – ")}</span>
              <div className="mono-chrono-body">
                <h3>
                  {e.role}, <em>{e.company}</em>
                </h3>
                <p className="mono-chrono-place">{e.location}</p>
                <p>{e.bullets[0]}</p>
                <p className="mono-chrono-skills">{e.skills.slice(0, 6).join(" · ")}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mono-section mono-practice" id="mono-practice">
        <div className="mono-section-head">
          <h2>Practice</h2>
          <p>
            {education.degree}, {education.university}, {education.graduation}.
          </p>
        </div>
        <div className="mono-skills">
          {skills.map((s) => (
            <div key={s.category}>
              <h3>{s.category}</h3>
              <p>{s.items.slice(0, 9).join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mono-section" id="mono-recognition">
        <div className="mono-section-head">
          <h2>Recognition</h2>
          <p>Environmental advocacy, litigation and community campaigns.</p>
        </div>
        <blockquote className="mono-quote">{leadership[1].items[0]}</blockquote>
        <div className="mono-recog">
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
        </div>
        <h3 className="mono-biblio-head">Bibliography</h3>
        <ul className="mono-biblio">
          {press.map((l) => (
            <li key={l.url}>
              <a href={l.url} {...ext}>
                <em>{l.name}</em>. {l.description}. ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mono-foot">
        <p className="mono-foot-label">Correspondence</p>
        <a className="mono-foot-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="mono-foot-links">
          {links.map((l) => (
            <a key={l.label} href={l.href} {...ext}>
              {l.label} ↗
            </a>
          ))}
          <span>Open to new grad roles · {education.graduation}</span>
        </div>
      </footer>
    </div>
  );
}
