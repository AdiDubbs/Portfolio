import { useEffect, useMemo, useRef, useState } from "react";
import "./nocturne.css";
import { education, experiences, ext, firstName, lastName, leadership, links, person, press, projects, skills } from "../data";

function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars = [];
    let raf;
    let shooting = null;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((innerWidth * innerHeight) / 2600);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight * 1.6,
        r: Math.random() ** 3 * 1.6 + 0.25,
        p: Math.random() * Math.PI * 2,
        s: 0.4 + Math.random() * 1.4,
        warm: Math.random() < 0.18,
      }));
    };
    const draw = (t) => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      const drift = window.scrollY * 0.08;
      for (const st of stars) {
        const y = (((st.y - drift * st.r) % (innerHeight * 1.6)) + innerHeight * 1.6) % (innerHeight * 1.6);
        if (y > innerHeight) continue;
        const a = still ? 0.8 : 0.45 + 0.55 * Math.sin(t / 1000 * st.s + st.p) ** 2;
        ctx.globalAlpha = a;
        ctx.fillStyle = st.warm ? "#f3dcae" : "#e9ecff";
        ctx.beginPath();
        ctx.arc(st.x, y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!still) {
        if (!shooting && Math.random() < 0.004) {
          shooting = { x: Math.random() * innerWidth, y: Math.random() * innerHeight * 0.4, life: 0 };
        }
        if (shooting) {
          shooting.life += 1;
          const len = 120;
          const k = shooting.life * 9;
          const g = ctx.createLinearGradient(shooting.x + k, shooting.y + k * 0.45, shooting.x + k - len, shooting.y + (k - len) * 0.45);
          g.addColorStop(0, "rgba(255,240,210,0.9)");
          g.addColorStop(1, "rgba(255,240,210,0)");
          ctx.globalAlpha = Math.max(0, 1 - shooting.life / 50);
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(shooting.x + k, shooting.y + k * 0.45);
          ctx.lineTo(shooting.x + k - len, shooting.y + (k - len) * 0.45);
          ctx.stroke();
          if (shooting.life > 50) shooting = null;
        }
        raf = requestAnimationFrame(draw);
      }
      ctx.globalAlpha = 1;
    };
    resize();
    draw(0);
    window.addEventListener("resize", resize);
    const onScroll = () => still && draw(0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return <canvas ref={ref} className="noc-stars" aria-hidden="true" />;
}

// Deterministic star positions so each constellation keeps its shape between renders
function seeded(seed) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

function Constellation({ group, index }) {
  const [hover, setHover] = useState(null);
  const items = group.items.slice(0, 9);
  const points = useMemo(() => {
    const rand = seeded(index * 97 + 13);
    return items.map((_, i) => {
      const angle = (i / items.length) * Math.PI * 1.7 + rand() * 0.9;
      const radius = 26 + rand() * 52;
      return { x: 120 + Math.cos(angle) * radius * 1.35, y: 92 + Math.sin(angle) * radius * 0.8 };
    });
  }, [index, items]);
  return (
    <figure className="noc-const">
      <svg viewBox="0 0 240 184" role="img" aria-label={`${group.category}: ${items.join(", ")}`}>
        <polyline
          points={points.map((p) => `${p.x},${p.y}`).join(" ")}
          fill="none"
          className="noc-const-line"
        />
        {points.map((p, i) => (
          <g key={items[i]} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <circle cx={p.x} cy={p.y} r="12" fill="transparent" />
            <circle cx={p.x} cy={p.y} r={hover === i ? 4 : i === 0 ? 3.2 : 2.2} className="noc-const-star" />
          </g>
        ))}
        {hover !== null && (
          <text
            x={Math.min(Math.max(points[hover].x, 50), 190)}
            y={points[hover].y > 40 ? points[hover].y - 12 : points[hover].y + 20}
            textAnchor="middle"
            className="noc-const-label"
          >
            {items[hover]}
          </text>
        )}
      </svg>
      <figcaption>
        <span>{group.category}</span>
        <small>{items.join(" · ")}</small>
      </figcaption>
    </figure>
  );
}

function Observation({ p, i }) {
  const [shot, setShot] = useState(0);
  return (
    <article className={`noc-obs${i % 2 ? " is-flip" : ""}`}>
      <div className="noc-obs-view">
        <img src={p.images[shot]} alt={`${p.title}: ${p.imageLabels[shot]}`} loading="lazy" />
        <div className="noc-obs-thumbs">
          {p.images.map((src, j) => (
            <button
              key={src}
              type="button"
              className={shot === j ? "is-on" : ""}
              onClick={() => setShot(j)}
              aria-label={`Show ${p.imageLabels[j]}`}
            >
              {p.imageLabels[j]}
            </button>
          ))}
        </div>
      </div>
      <div className="noc-obs-text">
        <p className="noc-eyebrow">
          {p.period} · {p.category}
        </p>
        <h3>{p.title}</h3>
        <p className="noc-obs-lead">{p.bullets[0]}</p>
        <ul>
          {p.bullets.slice(1).map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <a className="noc-link" href={p.link} {...ext}>
          Source on GitHub
        </a>
      </div>
    </article>
  );
}

export default function Nocturne() {
  return (
    <div className="noc">
      <Starfield />
      <div className="noc-glow" aria-hidden="true" />
      <header className="noc-top">
        <span className="noc-mono">AD</span>
        <nav>
          <a href="#noc-work">Work</a>
          <a href="#noc-orbits">Experience</a>
          <a href="#noc-sky">Skills</a>
          <a href="#noc-skies">Advocacy</a>
        </nav>
      </header>

      <section className="noc-hero">
        <p className="noc-eyebrow">Observing from {person.location} · 43.07° N, 89.40° W</p>
        <h1 className="noc-name">
          {firstName} <em>{lastName}</em>
        </h1>
        <div className="noc-hero-row">
          <p className="noc-lede">{person.summary}</p>
          <dl className="noc-hero-meta">
            <div>
              <dt>Focus</dt>
              <dd>{person.tagline.split(" | ")[0]}</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>B.S. Computer Science, {education.graduation}</dd>
            </div>
            <div>
              <dt>Off hours</dt>
              <dd>Formula 1, new models, good design</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="noc-section" id="noc-work">
        <h2 className="noc-h2">
          Selected <em>observations</em>
        </h2>
        {projects.map((p, i) => (
          <Observation key={p.slug} p={p} i={i} />
        ))}
      </section>

      <section className="noc-section" id="noc-orbits">
        <h2 className="noc-h2">
          <em>Orbits</em> &amp; appointments
        </h2>
        <ol className="noc-orbits">
          {experiences.map((e) => (
            <li key={e.company}>
              <span className="noc-orbit-dot" aria-hidden="true" />
              <p className="noc-eyebrow">{e.period}</p>
              <h3>
                {e.role} <span>· {e.company}</span>
              </h3>
              <p>{e.bullets[0]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="noc-section" id="noc-sky">
        <h2 className="noc-h2">
          A chart of <em>the craft</em>
        </h2>
        <p className="noc-note">Hover a star to name it.</p>
        <div className="noc-sky">
          {skills.map((g, i) => (
            <Constellation key={g.category} group={g} index={i} />
          ))}
        </div>
      </section>

      <section className="noc-section" id="noc-skies">
        <h2 className="noc-h2">
          For <em>clearer skies</em>
        </h2>
        <p className="noc-skies-lead">{leadership[1].items[0]}</p>
        <div className="noc-skies-grid">
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
        <div className="noc-press">
          {press.map((l) => (
            <a key={l.url} href={l.url} {...ext}>
              {l.name}
            </a>
          ))}
        </div>
      </section>

      <footer className="noc-foot">
        <p className="noc-eyebrow">Send a signal</p>
        <a className="noc-foot-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <div className="noc-foot-links">
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
