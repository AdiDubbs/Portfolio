import { useRef, useState } from "react";
import "./sticker.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, photo, press, projects, skills, splitPeriod } from "../data";
import { useLightbox } from "../shared/Lightbox";

const palette = ["#ff5a36", "#ffe14d", "#5be3b0", "#6cc4ff", "#ff9fd1"];

const stickers = [
  { text: "Computer vision nerd", shape: "burst", color: "#ffe14d", x: 48, y: 4, r: -12 },
  { text: "Diana Award 2021", shape: "circle", color: "#ff9fd1", x: 78, y: 4, r: 10 },
  { text: "100,000+ trees planted", shape: "pill", color: "#5be3b0", x: 70, y: 70, r: -6 },
  { text: "Formula 1 fan", shape: "tape", color: "#6cc4ff", x: 52, y: 90, r: 6 },
  { text: `UW–Madison ’${education.graduation.slice(-2)}`, shape: "badge", color: "#ff5a36", x: 30, y: 92, r: -3 },
  { text: "Noida → Madison", shape: "pill", color: "#fff", x: 84, y: 40, r: 14, wide: true },
];

function Draggable({ s, scatter }) {
  const [pos, setPos] = useState(() => (scatter ? { x: Math.random() * 84, y: Math.random() * 88 } : { x: s.x, y: s.y }));
  const [lift, setLift] = useState(false);
  const start = useRef(null);
  const onDown = (e) => {
    const box = e.currentTarget.parentElement.getBoundingClientRect();
    start.current = { px: e.clientX, py: e.clientY, x: pos.x, y: pos.y, w: box.width, h: box.height };
    e.currentTarget.setPointerCapture(e.pointerId);
    setLift(true);
  };
  const onMove = (e) => {
    const st = start.current;
    if (!st) return;
    setPos({
      x: Math.min(92, Math.max(-4, st.x + ((e.clientX - st.px) / st.w) * 100)),
      y: Math.min(92, Math.max(-4, st.y + ((e.clientY - st.py) / st.h) * 100)),
    });
  };
  const onUp = () => {
    start.current = null;
    setLift(false);
  };
  return (
    <span
      className={`stk-sticker stk-${s.shape}${s.wide ? " stk-wide-only" : ""}${lift ? " is-lift" : ""}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, "--r": `${s.r}deg`, "--bg": s.color }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {s.text}
    </span>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById("stk-mail"));
    }
  };
  return (
    <button type="button" className="stk-btn stk-btn-ink" onClick={copy}>
      {done ? "Copied!" : "Copy email"}
    </button>
  );
}

export default function Sticker() {
  const [flipped, setFlipped] = useState({});
  const [shuffle, setShuffle] = useState(0);
  const [job, setJob] = useState(null);
  const [lb, openLb] = useLightbox();
  return (
    <div className="stk">
      <header className="stk-nav">
        <span className="stk-logo">adi.dubey</span>
        <nav>
          <a href="#stk-me">Me</a>
          <a href="#stk-work">Work</a>
          <a href="#stk-jobs">Jobs</a>
          <a href="#stk-hi">Say hi</a>
        </nav>
      </header>

      <section className="stk-hero">
        {stickers.map((s) => (
          <Draggable key={s.text + shuffle} s={s} scatter={shuffle > 0} />
        ))}
        <div className="stk-hero-copy">
          <p className="stk-hello">Hey, I’m</p>
          <h1 className="stk-name">
            <span>{firstName}</span>
            <span className="stk-name-outline">{lastName}</span>
          </h1>
          <p className="stk-lede">{person.summary}</p>
          <div className="stk-hero-cta">
            <a className="stk-btn" href="#stk-work">
              See the work
            </a>
            <button type="button" className="stk-btn stk-btn-sm stk-btn-mint" onClick={() => setShuffle((n) => n + 1)}>
              Shuffle stickers
            </button>
            <span className="stk-psst">psst, you can drag them too</span>
          </div>
        </div>
        <figure className="stk-photo">
          <img src={photo} alt={`${person.name} at Yosemite`} />
        </figure>
      </section>

      <div className="stk-marquee" aria-hidden="true">
        <div className="stk-marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {skills.flatMap((s) => s.items.slice(0, 4)).map((it) => (
                <b key={it + k}>{it} ✺ </b>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="stk-section" id="stk-me">
        <h2 className="stk-h2">
          A bit about <mark className="stk-mark-lemon">me</mark>
        </h2>
        <div className="stk-bubbles">
          {about.map((a, i) => (
            <div key={a.label} className="stk-bubble" style={{ "--bg": palette[(i + 3) % palette.length], "--r": `${[-1.5, 1, -0.5][i]}deg` }}>
              <h3>{a.label}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
        <div className="stk-school">
          <div className="stk-school-head">
            <span className="stk-chip">Class of {education.graduation}</span>
            <h3>{education.university}</h3>
            <p>{education.degree}</p>
          </div>
          <div className="stk-schedule">
            <p className="stk-schedule-title">Classes I took</p>
            <ul>
              {education.coursework.map((c, i) => (
                <li key={c} style={{ "--bg": palette[i % palette.length] }}>
                  {c}
                </li>
              ))}
            </ul>
            <p className="stk-school-club">{education.involvement}</p>
          </div>
        </div>
      </section>

      <section className="stk-section" id="stk-work">
        <h2 className="stk-h2">
          Stuff I’ve <mark>built</mark>
        </h2>
        <div className="stk-cards">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className={`stk-card${flipped[p.slug] ? " is-flipped" : ""}`}
              style={{ "--bg": palette[i % palette.length], "--r": `${i % 2 ? 1.6 : -1.6}deg` }}
            >
              <div className="stk-card-top">
                <span className="stk-chip">{p.period}</span>
                <span className="stk-chip stk-chip-ghost">{p.category}</span>
              </div>
              <h3>{p.title}</h3>
              {flipped[p.slug] ? (
                <ul className="stk-card-list">
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : (
                <div className="stk-shots">
                  {p.images.map((src, j) => (
                    <button key={src} type="button" onClick={() => openLb(p, j)} aria-label={`Enlarge ${p.imageLabels[j]}`}>
                      <img src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
              <div className="stk-tags">
                {(flipped[p.slug] ? p.technologies : p.technologies.slice(0, 4)).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="stk-card-actions">
                <button type="button" className="stk-btn stk-btn-sm" onClick={() => setFlipped((f) => ({ ...f, [p.slug]: !f[p.slug] }))}>
                  {flipped[p.slug] ? "Show screenshot" : "How it works"}
                </button>
                <a className="stk-btn stk-btn-sm stk-btn-ink" href={p.link} {...ext}>
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="stk-section" id="stk-jobs">
        <h2 className="stk-h2">
          Places I’ve <mark className="stk-mark-mint">worked</mark>
        </h2>
        <div className="stk-tickets">
          {experiences.map((e, i) => {
            const { start, end } = splitPeriod(e.period);
            return (
              <article key={e.company} className="stk-ticket" style={{ "--bg": palette[(i + 2) % palette.length] }}>
                <div className="stk-stub">
                  <span>{e.type}</span>
                  <b>{start}</b>
                  <span>to</span>
                  <b>{end}</b>
                </div>
                <div className="stk-ticket-body">
                  <h3>{e.role}</h3>
                  <p className="stk-ticket-co">
                    {e.company} · {e.location}
                  </p>
                  {job === e.company ? (
                    <ul className="stk-ticket-list">
                      {e.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{e.bullets[0]}</p>
                  )}
                  <div className="stk-ticket-actions">
                    <button type="button" className="stk-btn stk-btn-sm" onClick={() => setJob(job === e.company ? null : e.company)} aria-expanded={job === e.company}>
                      {job === e.company ? "Less" : "Everything I did"}
                    </button>
                    {e.link && (
                      <a className="stk-btn stk-btn-sm stk-btn-ink" href={e.link} {...ext}>
                        {e.linkLabel} ↗
                      </a>
                    )}
                    {e.projectLink && (
                      <a className="stk-btn stk-btn-sm stk-btn-ink" href={e.projectLink} {...ext}>
                        {e.projectLinkLabel} ↗
                      </a>
                    )}
                  </div>
                  <div className="stk-tags">
                    {(job === e.company ? e.skills : e.skills.slice(0, 5)).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="stk-section">
        <h2 className="stk-h2">
          My <mark className="stk-mark-sky">toolbox</mark>
        </h2>
        <div className="stk-tools">
          {skills.map((s, i) => (
            <div key={s.category} className="stk-tool" style={{ "--bg": palette[(i + 1) % palette.length] }}>
              <h3>{s.category}</h3>
              <p>{s.items.join(" / ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stk-section">
        <h2 className="stk-h2">
          Off the <mark className="stk-mark-pink">keyboard</mark>
        </h2>
        <div className="stk-impact">
          <div className="stk-big" style={{ "--bg": "#5be3b0" }}>
            <b>100,000+</b>
            <span>trees planted through community drives</span>
          </div>
          <div className="stk-big" style={{ "--bg": "#ffe14d" }}>
            <b>CAQM</b>
            <span>air-quality commission that followed my Supreme Court PIL</span>
          </div>
          <div className="stk-big" style={{ "--bg": "#ff9fd1" }}>
            <b>EPR</b>
            <span>packaging rules my e-commerce plastic petition helped enforce</span>
          </div>
        </div>
        <ul className="stk-press">
          {leadership.flatMap((g) => g.items).map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
        <div className="stk-pressbar">
          <span>As seen in</span>
          {press.map((l, i) => (
            <a key={l.url} href={l.url} {...ext} style={{ "--bg": palette[i % palette.length] }}>
              {l.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="stk-foot" id="stk-hi">
        <h2 className="stk-say">Say hi!</h2>
        <p id="stk-mail" className="stk-mail">
          {person.email}
        </p>
        <div className="stk-hero-cta">
          <CopyEmail />
          {links.map((l) => (
            <a key={l.label} className="stk-btn stk-btn-sm" href={l.href} {...ext}>
              {l.label}
            </a>
          ))}
        </div>
      </footer>
      {lb}
    </div>
  );
}
