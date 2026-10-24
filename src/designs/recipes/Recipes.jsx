import { useState } from "react";
import "./recipes.css";
import { about, education, experiences, ext, firstName, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

const tabs = [
  { id: "rb-cook", label: "The cook" },
  { id: "rb-recipes", label: "Recipes" },
  { id: "rb-kitchens", label: "Kitchens" },
  { id: "rb-pantry", label: "Pantry" },
  { id: "rb-school", label: "School" },
  { id: "rb-giving", label: "Giving" },
];
const tabColors = ["#f28c8c", "#f7c873", "#9fd6a8", "#8ec5e8", "#c7a6e6", "#f6a6c8"];
const jarColors = ["#f7c873", "#9fd6a8", "#f28c8c", "#8ec5e8", "#c7a6e6", "#f6a6c8"];

export default function Recipes() {
  const [r, setR] = useState(0);
  const [have, setHave] = useState({});
  const [lb, openLb] = useLightbox();
  const p = projects[r];
  const got = p.technologies.filter((t) => have[`${p.slug}:${t}`]).length;

  return (
    <div className="rb">
      <section className="rb-hero">
        <div className="rb-box">
          <div className="rb-cards" aria-hidden="true">
            {tabs.map((t, i) => (
              <span key={t.id} style={{ "--c": tabColors[i], "--i": i }} />
            ))}
          </div>
          <div className="rb-tin">
            <div className="rb-label">
              <span>From the kitchen of</span>
              <b className="rb-hand">{person.name}</b>
            </div>
          </div>
        </div>
        <nav className="rb-tabs" aria-label="Sections">
          {tabs.map((t, i) => (
            <a key={t.id} href={`#${t.id}`} style={{ "--c": tabColors[i] }}>
              {t.label}
            </a>
          ))}
        </nav>
        <div className="rb-card rb-intro">
          <p className="rb-card-head">
            <span>{person.tagline}</span>
          </p>
          <p className="rb-hand rb-lined">{person.summary}</p>
        </div>
      </section>

      <section className="rb-section rb-cook" id="rb-cook">
        <h2 className="rb-h2">About the cook</h2>
        <div className="rb-cook-grid">
          <figure className="rb-photo">
            <img src={photo} alt={`${person.name} at Yosemite`} />
            <figcaption className="rb-hand">the cook, on a hike</figcaption>
          </figure>
          <div className="rb-notes">
            {about.map((a, i) => (
              <div key={a.label} className="rb-card" style={{ "--c": tabColors[i + 2] }}>
                <p className="rb-card-head">
                  <span>{a.label}</span>
                </p>
                <p className="rb-hand rb-lined">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rb-section" id="rb-recipes">
        <h2 className="rb-h2">Family recipes</h2>
        <div className="rb-dividers" role="tablist" aria-label="Projects">
          {projects.map((pr, i) => (
            <button key={pr.slug} type="button" role="tab" aria-selected={r === i} className={r === i ? "is-on" : ""} style={{ "--c": tabColors[i % tabColors.length] }} onClick={() => setR(i)}>
              {pr.title}
            </button>
          ))}
        </div>
        <article className="rb-recipe" key={p.slug} role="tabpanel">
          <header className="rb-recipe-head">
            <p>
              <span>Recipe</span> <b className="rb-hand">{p.title}</b>
            </p>
            <p>
              <span>From the kitchen of</span> <b className="rb-hand">{firstName}</b>
            </p>
            <p>
              <span>Cuisine</span> <b className="rb-hand">{p.category}</b>
            </p>
            <p>
              <span>First made</span> <b className="rb-hand">{p.period}</b>
            </p>
          </header>
          <div className="rb-recipe-body">
            <div>
              <h3>
                Ingredients{" "}
                <small>
                  ({got}/{p.technologies.length} in the basket)
                </small>
              </h3>
              <ul className="rb-ingredients">
                {p.technologies.map((t) => {
                  const k = `${p.slug}:${t}`;
                  return (
                    <li key={t}>
                      <label>
                        <input type="checkbox" checked={!!have[k]} onChange={() => setHave((h) => ({ ...h, [k]: !h[k] }))} />
                        <span className="rb-hand">{t}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h3>Method</h3>
              <ol className="rb-method">
                {p.bullets.map((b) => (
                  <li key={b} className="rb-hand">
                    {b}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="rb-plating">
            <h3>Plating</h3>
            <div className="rb-plates">
              {p.images.map((src, j) => (
                <button key={src} type="button" onClick={() => openLb(p, j)} aria-label={`Enlarge ${p.imageLabels[j]}`} style={{ "--tilt": `${[-3, 2, -1][j]}deg` }}>
                  <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
                  <span className="rb-hand">{p.imageLabels[j]}</span>
                </button>
              ))}
            </div>
            <p className="rb-tip">
              <b className="rb-hand">Cook’s tip:</b> the full recipe is on{" "}
              <a href={p.link} {...ext}>
                GitHub
              </a>
              .
            </p>
          </div>
        </article>
      </section>

      <section className="rb-section" id="rb-kitchens">
        <h2 className="rb-h2">Kitchens I’ve cooked in</h2>
        <div className="rb-board">
          {experiences.map((e) => (
            <article key={e.company} className="rb-menu-item">
              <header>
                <h3 className="rb-chalk">{e.role}</h3>
                <span className="rb-dots" aria-hidden="true" />
                <span className="rb-chalk rb-when">{e.period}</span>
              </header>
              <p className="rb-venue">
                {e.company} · {e.location}
              </p>
              <ul>
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="rb-served">Served with {e.skills.join(", ")}</p>
              {(e.link || e.projectLink) && (
                <p className="rb-chalk-links">
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

      <section className="rb-section" id="rb-pantry">
        <h2 className="rb-h2">The pantry</h2>
        <div className="rb-jars">
          {skills.map((s, i) => (
            <div key={s.category} className="rb-jar" style={{ "--c": jarColors[i] }}>
              <span className="rb-lid" aria-hidden="true" />
              <h3 className="rb-hand">{s.category}</h3>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rb-section rb-split" id="rb-school">
        <div className="rb-card rb-school" style={{ "--c": tabColors[4] }}>
          <p className="rb-card-head">
            <span>Where I learned to cook</span>
            <span>{education.graduation}</span>
          </p>
          <h3>{education.university}</h3>
          <p className="rb-hand rb-big">{education.degree}</p>
          <p className="rb-classes-title">Classes</p>
          <ul className="rb-classes">
            {education.coursework.map((c) => (
              <li key={c} className="rb-hand">
                {c}
              </li>
            ))}
          </ul>
          <p className="rb-hand rb-lined">{education.involvement}</p>
        </div>
        <div id="rb-giving">
          <h2 className="rb-h2">Giving back</h2>
          <div className="rb-ribbons">
            {leadership.map((g, i) => (
              <article key={g.label} className="rb-ribbon-card">
                <span className="rb-rosette" style={{ "--c": tabColors[i * 2] }} aria-hidden="true" />
                <h3>{g.label}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="rb-press">
            <span className="rb-hand">In the papers:</span>
            {press.map((l) => (
              <a key={l.url} href={l.url} {...ext}>
                {l.name}
              </a>
            ))}
          </p>
        </div>
      </section>

      <footer className="rb-foot">
        <div className="rb-card rb-invite">
          <p className="rb-card-head">
            <span>Come over for dinner?</span>
          </p>
          <a className="rb-hand rb-mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <p className="rb-links">
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
