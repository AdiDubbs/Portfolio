import { useEffect, useRef, useState } from "react";
import "./library.css";
import { about, education, experiences, ext, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

const bindings = [
  { bg: "#6e1f24", h: 92 },
  { bg: "#1f3557", h: 100 },
  { bg: "#a5762a", h: 86 },
  { bg: "#2f5139", h: 96 },
  { bg: "#4d2a4f", h: 89 },
];

export default function Library() {
  const [book, setBook] = useState(0);
  const [drawer, setDrawer] = useState(1);
  const [dark, setDark] = useState(false);
  const [card, setCard] = useState(null);
  const [lb, openLb] = useLightbox();
  const room = useRef(null);
  const p = projects[book];

  useEffect(() => {
    const el = room.current;
    const move = (e) => {
      el.style.setProperty("--lx", `${e.clientX}px`);
      el.style.setProperty("--ly", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className={`lib${dark ? " is-dark" : ""}`} ref={room}>
      <div className="lib-lamp" aria-hidden="true" />
      <button type="button" className="lib-chain" onClick={() => setDark((d) => !d)} aria-pressed={dark}>
        <span className="lib-chain-cord" aria-hidden="true" />
        <span className="lib-chain-label">{dark ? "Lamp on" : "Lamp off"}</span>
      </button>

      <section className="lib-hero">
        <div className="lib-plate">
          <p className="lib-exlibris">Ex Libris</p>
          <img className="lib-cameo" src={photo} alt={`Portrait of ${person.name}`} />
          <h1 className="lib-name">{person.name}</h1>
          <p className="lib-sub">{person.tagline}</p>
          <span className="lib-fleuron" aria-hidden="true">❦</span>
          <p className="lib-inscription">{person.summary}</p>
          <p className="lib-sub">
            {education.university} · {person.location}
          </p>
        </div>
      </section>

      <section className="lib-section">
        <h2 className="lib-h2">Preface</h2>
        <div className="lib-preface">
          {about.map((a, i) => (
            <div key={a.label}>
              <p className="lib-running">{["I", "II", "III"][i]}</p>
              <h3>{a.label}</h3>
              <p className={i === 0 ? "lib-dropcap" : ""}>{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lib-section">
        <h2 className="lib-h2">From the shelf</h2>
        <p className="lib-note">Pull a book to read it.</p>
        <div className="lib-shelf" role="tablist" aria-label="Projects">
          {projects.map((pr, i) => (
            <button
              key={pr.slug}
              type="button"
              role="tab"
              aria-selected={book === i}
              className={`lib-spine${book === i ? " is-out" : ""}`}
              style={{ "--bg": bindings[i].bg, "--h": `${bindings[i].h}%` }}
              onClick={() => setBook(i)}
            >
              <span className="lib-spine-title">{pr.title}</span>
              <span className="lib-spine-year">{pr.period}</span>
            </button>
          ))}
          <span className="lib-bookend" aria-hidden="true" />
        </div>
        <div className="lib-plank" aria-hidden="true" />

        <article className="lib-book" key={p.slug} role="tabpanel">
          <div className="lib-page lib-page-left">
            <p className="lib-running">{p.category}</p>
            <figure>
              <button type="button" className="lib-zoom" onClick={() => openLb(p, 0)} aria-label={`Enlarge ${p.imageLabels[0]}`}>
                <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} />
              </button>
              <figcaption>Plate 1. {p.imageLabels[0]}</figcaption>
            </figure>
            <div className="lib-plates">
              {p.images.slice(1).map((src, j) => (
                <figure key={src}>
                  <button type="button" className="lib-zoom" onClick={() => openLb(p, j + 1)} aria-label={`Enlarge ${p.imageLabels[j + 1]}`}>
                    <img src={src} alt={`${p.title}: ${p.imageLabels[j + 1]}`} loading="lazy" />
                  </button>
                  <figcaption>Plate {j + 2}. {p.imageLabels[j + 1]}</figcaption>
                </figure>
              ))}
            </div>
            <span className="lib-folio">{book * 2 + 1}</span>
          </div>
          <div className="lib-page lib-page-right">
            <p className="lib-running">{p.period}</p>
            <h3>{p.title}</h3>
            {p.bullets.map((b, j) => (
              <p key={b} className={j === 0 ? "lib-dropcap" : ""}>
                {b}
              </p>
            ))}
            <p className="lib-colophon">Set in {p.technologies.join(", ")}.</p>
            <a className="lib-link" href={p.link} {...ext}>
              Read the source on GitHub
            </a>
            <span className="lib-folio">{book * 2 + 2}</span>
          </div>
        </article>
        <div className="lib-turn">
          <button type="button" onClick={() => setBook((book - 1 + projects.length) % projects.length)}>
            ← {projects[(book - 1 + projects.length) % projects.length].title}
          </button>
          <span>
            Volume {book + 1} of {projects.length}
          </span>
          <button type="button" onClick={() => setBook((book + 1) % projects.length)}>
            {projects[(book + 1) % projects.length].title} →
          </button>
        </div>
      </section>

      <section className="lib-section lib-pair">
        <div>
          <h2 className="lib-h2">Borrowing record</h2>
          <div className="lib-card">
            <div className="lib-card-head">
              <span>Date due</span>
              <span>Title &amp; lending library</span>
            </div>
            {experiences.map((e, i) => (
              <div key={e.company} className="lib-card-row">
                <span className="lib-stamp" style={{ "--rot": `${[-4, 3, -2, 5][i]}deg` }}>
                  {e.period.replace(" - ", " – ")}
                </span>
                <span className="lib-card-entry">
                  <b>{e.role}</b>
                  <i>{e.company}, {e.location}</i>
                  {(card === e.company ? e.bullets : e.bullets.slice(0, 1)).map((b) => (
                    <small key={b}>{b}</small>
                  ))}
                  {card === e.company && (e.link || e.projectLink) && (
                    <span className="lib-card-links">
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
                    </span>
                  )}
                  <button type="button" className="lib-card-more" onClick={() => setCard(card === e.company ? null : e.company)} aria-expanded={card === e.company}>
                    {card === e.company ? "Return to shelf" : "Read the full entry"}
                  </button>
                </span>
              </div>
            ))}
            <div className="lib-card-row lib-card-empty">
              <span />
              <span>Open to new grad roles, {education.graduation}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="lib-h2">Card catalogue</h2>
          <div className="lib-cabinet">
            {skills.map((s, i) => (
              <button
                key={s.category}
                type="button"
                className={`lib-drawer${drawer === i ? " is-open" : ""}`}
                aria-expanded={drawer === i}
                onClick={() => setDrawer(i)}
              >
                <span className="lib-label">{s.category}</span>
                <span className="lib-knob" aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="lib-index" key={drawer}>
            <p className="lib-index-head">
              <span>{skills[drawer].category}</span>
              <span>{skills[drawer].items.length} cards</span>
            </p>
            <ul>
              {skills[drawer].items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="lib-section">
        <h2 className="lib-h2">Syllabus</h2>
        <div className="lib-syllabus">
          <div className="lib-syl-head">
            <p className="lib-running">{education.location} · {education.graduation}</p>
            <h3>{education.university}</h3>
            <p>{education.degree}</p>
          </div>
          <ol>
            {education.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
          <p className="lib-syl-note">{education.involvement}</p>
        </div>
      </section>

      <section className="lib-section">
        <h2 className="lib-h2">Clippings</h2>
        <div className="lib-clips">
          {leadership.map((g, i) => (
            <article key={g.label} className="lib-clip" style={{ "--rot": `${[-1.5, 1, -0.6][i]}deg` }}>
              <h3>{g.label}</h3>
              {g.items.map((it) => (
                <p key={it}>{it}</p>
              ))}
            </article>
          ))}
        </div>
        <ul className="lib-press">
          {press.map((l) => (
            <li key={l.url}>
              <a href={l.url} {...ext}>
                <b>{l.name}</b> <span>{l.description}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="lib-foot">
        <div className="lib-desk-card">
          <p className="lib-running">Front desk</p>
          <h2>Leave a note</h2>
          <a className="lib-mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <div className="lib-foot-links">
            {links.map((l) => (
              <a key={l.label} href={l.href} {...ext}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
      {lb}
    </div>
  );
}
