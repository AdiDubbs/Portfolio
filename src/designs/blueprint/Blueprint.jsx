import { useEffect, useState } from "react";
import "./blueprint.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

// System sketches drawn from each project's bullets in profile.js
const diagrams = {
  "drift-shield": [
    { lane: "Inference", nodes: ["Request", "FastAPI", "XGBoost, calibrated", "Conformal sets", "Uncertainty-aware output"] },
    { lane: "Monitoring", nodes: ["Rolling windows", "PSI + KS drift", "Prometheus", "Grafana"] },
    { lane: "Deploys", nodes: ["Active", "Shadow", "Rollback"] },
  ],
  vitalis: [
    { lane: "Text", nodes: ["Clinical notes", "NLP symptom extraction", "Negation handling"] },
    { lane: "Imaging", nodes: ["X-ray / MRI", "DenseNet121 · EfficientNet"] },
    { lane: "Signals", nodes: ["Labs + ECG", "Ischemia detection"] },
    { lane: "Fusion", nodes: ["Bayesian reasoning", "Ranked differential", "Flask + React app"] },
  ],
  concierge: [
    { lane: "Agent", nodes: ["Shopping request", "Llama 3.1 via Groq", "Hybrid action selection", "Playwright browser"] },
    { lane: "Flow", nodes: ["Login", "Product search", "Selection", "Checkout"] },
    { lane: "Guardrails", nodes: ["OTP-aware handling", "Dry-run mode", "Confirmation gate"] },
    { lane: "Ops", nodes: ["FastAPI backend", "React dashboard"] },
  ],
  "square-saga": [
    { lane: "Game loop", nodes: ["Keyboard input", "Spawn", "Rotate", "Collision", "Line clear", "Score"] },
    { lane: "Modes", nodes: ["Classic · Light · Dark", "Lore + win conditions"] },
    { lane: "Systems", nodes: ["Hold, with a cost", "End-of-run feedback"] },
  ],
  carbon: [
    { lane: "App", nodes: ["Android (Java)", "Emissions calculator", "Timestamped history"] },
    { lane: "Data", nodes: ["Firebase Auth", "Realtime Database", "PaperDB"] },
    { lane: "Reach", nodes: ["500+ downloads", "8+ countries"] },
  ],
};

function TitleBlock({ sheet, title, children }) {
  return (
    <div className="bp-tb">
      <div>
        <span>Title</span>
        <b>{title}</b>
      </div>
      <div>
        <span>Sheet</span>
        <b>{sheet}</b>
      </div>
      <div>
        <span>Drawn</span>
        <b>A.D.</b>
      </div>
      <div>
        <span>Scale</span>
        <b>NTS</b>
      </div>
      {children}
    </div>
  );
}

function Sheet({ id, sheet, title, children }) {
  return (
    <section className="bp-sheet" id={id}>
      <div className="bp-zones bp-zones-top" aria-hidden="true">
        {["A", "B", "C", "D", "E", "F"].map((z) => (
          <span key={z}>{z}</span>
        ))}
      </div>
      <div className="bp-sheet-inner">{children}</div>
      <TitleBlock sheet={sheet} title={title} />
    </section>
  );
}

export default function Blueprint() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sel, setSel] = useState(0);
  const [rev, setRev] = useState(null);
  const [lb, openLb] = useLightbox();
  const p = projects[sel];
  const revs = [...experiences].reverse();

  useEffect(() => {
    const move = (e) => setPos({ x: Math.round(e.pageX), y: Math.round(e.pageY) });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div className="bp">
      <div className="bp-coords" aria-hidden="true">
        X {String(pos.x).padStart(4, "0")} · Y {String(pos.y).padStart(5, "0")}
      </div>

      <Sheet id="bp-cover" sheet="A-1" title="General arrangement">
        <div className="bp-hero">
          <div>
            <p className="bp-mono">Drawing no. AD-2026-001 · Rev D</p>
            <h1 className="bp-name">
              {firstName} {lastName}
            </h1>
            <div className="bp-dimline" aria-hidden="true">
              <span>full-stack</span>
              <span>applied AI</span>
            </div>
            <p className="bp-tag">{person.tagline}</p>
            <p className="bp-lede">{person.summary}</p>
          </div>
          <figure className="bp-detail">
            <div className="bp-detail-circle">
              <img src={photo} alt={`${person.name} at Yosemite`} />
            </div>
            <figcaption>
              <b>Detail A</b> Engineer on site, Tunnel View, Yosemite
            </figcaption>
          </figure>
        </div>
        <div className="bp-notes">
          <h2 className="bp-h2">General notes</h2>
          <ol>
            {about.map((a) => (
              <li key={a.label}>
                <b>{a.label}.</b> {a.text}
              </li>
            ))}
            <li>
              <b>Status.</b> Open to new grad roles, {education.graduation}. Contact details on sheet F-1.
            </li>
          </ol>
        </div>
      </Sheet>

      <Sheet id="bp-works" sheet={`B-${sel + 1}`} title={`${p.title} system`}>
        <h2 className="bp-h2">Selected works</h2>
        <div className="bp-tabs" role="tablist" aria-label="Projects">
          {projects.map((pr, i) => (
            <button key={pr.slug} type="button" role="tab" aria-selected={sel === i} className={sel === i ? "is-on" : ""} onClick={() => setSel(i)}>
              <span>B-{i + 1}</span> {pr.title}
            </button>
          ))}
        </div>
        <div className="bp-work" key={p.slug} role="tabpanel">
          <div className="bp-diagram" role="img" aria-label={`System diagram of ${p.title}`}>
            {diagrams[p.slug].map((l) => (
              <div key={l.lane} className="bp-lane">
                <span className="bp-lane-name">{l.lane}</span>
                <ol>
                  {l.nodes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          <div className="bp-work-side">
            <p className="bp-mono">
              {p.period} · {p.category}
            </p>
            <h3>{p.title}</h3>
            <ol className="bp-spec">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
            <a className="bp-btn" href={p.link} {...ext}>
              Source drawings (GitHub) →
            </a>
          </div>
        </div>
        <div className="bp-views">
          {p.images.map((src, j) => (
            <button key={src} type="button" onClick={() => openLb(p, j)} aria-label={`Enlarge ${p.imageLabels[j]}`}>
              <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
              <span>
                View {String.fromCharCode(66 + j)}: {p.imageLabels[j]}
              </span>
            </button>
          ))}
        </div>
        <table className="bp-table bp-parts">
          <thead>
            <tr>
              <th>Item</th>
              <th>Part</th>
            </tr>
          </thead>
          <tbody>
            {p.technologies.map((t, i) => (
              <tr key={t}>
                <td>{String(i + 1).padStart(2, "0")}</td>
                <td>{t}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sheet>

      <Sheet id="bp-revisions" sheet="C-1" title="Revision history">
        <h2 className="bp-h2">Revision history</h2>
        <table className="bp-table bp-revs">
          <thead>
            <tr>
              <th>Rev</th>
              <th>Date</th>
              <th>Description</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {revs.map((e, i) => (
              <tr key={e.company} className={rev === i ? "is-open" : ""}>
                <td className="bp-rev-letter">{String.fromCharCode(65 + i)}</td>
                <td>{e.period}</td>
                <td>
                  <b>{e.role}</b>, {e.company}, {e.location}
                  {rev === i && (
                    <>
                      <ul>
                        {e.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                      <p className="bp-mono bp-dim">{e.skills.join(" · ")}</p>
                      {(e.link || e.projectLink) && (
                        <p className="bp-row">
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
                    </>
                  )}
                </td>
                <td>
                  <button type="button" className="bp-mini" onClick={() => setRev(rev === i ? null : i)} aria-expanded={rev === i}>
                    {rev === i ? "close" : `${e.bullets.length} notes`}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Sheet>

      <Sheet id="bp-bom" sheet="D-1" title="Bill of materials">
        <div className="bp-split">
          <div>
            <h2 className="bp-h2">Bill of materials</h2>
            <table className="bp-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Assembly</th>
                  <th>Parts</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((s, i) => (
                  <tr key={s.category}>
                    <td>{String(i + 1).padStart(2, "0")}</td>
                    <td>
                      <b>{s.category}</b>
                    </td>
                    <td>{s.items.join(", ")}</td>
                    <td className="bp-qty">{s.items.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="bp-h2">Specifications</h2>
            <dl className="bp-specs">
              <div>
                <dt>Institution</dt>
                <dd>{education.university}</dd>
              </div>
              <div>
                <dt>Standard</dt>
                <dd>{education.degree}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{education.location}</dd>
              </div>
              <div>
                <dt>Certified</dt>
                <dd>{education.graduation}</dd>
              </div>
              <div>
                <dt>Coursework</dt>
                <dd>{education.coursework.join(", ")}</dd>
              </div>
              <div>
                <dt>Affiliations</dt>
                <dd>{education.involvement}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Sheet>

      <Sheet id="bp-survey" sheet="E-1" title="Site survey">
        <h2 className="bp-h2">Site survey: environment</h2>
        <div className="bp-survey">
          {leadership.map((g, i) => (
            <div key={g.label} className="bp-callout">
              <span className="bp-bubble">{i + 1}</span>
              <h3>{g.label}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="bp-refs">
          <span className="bp-mono">References:</span>
          {press.map((l) => (
            <a key={l.url} href={l.url} {...ext}>
              {l.name}
            </a>
          ))}
        </p>
      </Sheet>

      <Sheet id="bp-contact" sheet="F-1" title="Contact">
        <div className="bp-contact">
          <h2 className="bp-h2">Approvals &amp; contact</h2>
          <a className="bp-mail" href={`mailto:${person.email}`}>
            {person.email}
          </a>
          <p className="bp-row">
            {links.map((l) => (
              <a key={l.label} href={l.href} {...ext}>
                {l.label} →
              </a>
            ))}
          </p>
          <div className="bp-stamp" aria-hidden="true">
            Approved for hire
          </div>
        </div>
      </Sheet>
      {lb}
    </div>
  );
}
