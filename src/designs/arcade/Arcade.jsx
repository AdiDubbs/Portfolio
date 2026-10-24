import { useEffect, useRef, useState } from "react";
import "./arcade.css";
import { experiences, ext, firstName, lastName, leadership, links, person, projects, skills } from "../data";

const COLORS = ["#3be8ff", "#ffd23f", "#b45cff", "#4ff58a", "#ff4d6d", "#4d7cff", "#ff9a3c"];
const SHAPES = [
  [[1, 1, 1, 1]],
  [[1, 1], [1, 1]],
  [[0, 1, 0], [1, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 1, 0], [0, 1, 1]],
  [[1, 0, 0], [1, 1, 1]],
  [[0, 0, 1], [1, 1, 1]],
];

const rotate = (m) => m[0].map((_, i) => m.map((row) => row[i]).reverse());

// A self-playing well of tetrominoes behind the title screen
function Well() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SIZE = 26;
    let cols, rows, grid, piece, raf, last = 0, flash = [];

    const spawn = () => {
      const k = Math.floor(Math.random() * SHAPES.length);
      let shape = SHAPES[k];
      for (let r = Math.floor(Math.random() * 4); r > 0; r--) shape = rotate(shape);
      piece = { shape, color: COLORS[k], x: Math.floor(Math.random() * (cols - shape[0].length + 1)), y: -shape.length };
    };
    const fits = (shape, x, y) =>
      shape.every((row, r) =>
        row.every((v, c) => !v || (x + c >= 0 && x + c < cols && y + r < rows && (y + r < 0 || !grid[y + r][x + c])))
      );
    const reset = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(rect.width / SIZE);
      rows = Math.ceil(rect.height / SIZE);
      grid = Array.from({ length: rows }, () => Array(cols).fill(null));
      // Pre-fill a ragged stack so the first frame already reads as a game in progress
      for (let r = rows - 5; r < rows; r++)
        for (let c = 0; c < cols; c++) if (Math.random() < 0.55 + (r - rows + 5) * 0.08) grid[r][c] = COLORS[(r * 3 + c) % 7];
      spawn();
    };
    const cell = (x, y, color, alpha = 1) => {
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.fillRect(x * SIZE + 1, y * SIZE + 1, SIZE - 2, SIZE - 2);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fillRect(x * SIZE + 1, y * SIZE + 1, SIZE - 2, 4);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(x * SIZE + 1, y * SIZE + SIZE - 5, SIZE - 2, 4);
      ctx.globalAlpha = 1;
    };
    const step = () => {
      if (fits(piece.shape, piece.x, piece.y + 1)) {
        piece.y++;
        return;
      }
      piece.shape.forEach((row, r) => row.forEach((v, c) => {
        if (v && piece.y + r >= 0) grid[piece.y + r][piece.x + c] = piece.color;
      }));
      if (piece.y < 2) return reset();
      flash = [];
      grid.forEach((row, r) => row.every(Boolean) && flash.push(r));
      flash.forEach((r) => {
        grid.splice(r, 1);
        grid.unshift(Array(cols).fill(null));
      });
      spawn();
    };
    const draw = (t) => {
      if (t - last > 90) {
        last = t;
        // Nudge the piece toward the lowest column so lines actually clear
        if (Math.random() < 0.3) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          if (fits(piece.shape, piece.x + dir, piece.y)) piece.x += dir;
        }
        step();
      }
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      grid.forEach((row, r) => row.forEach((c, x) => c && cell(x, r, c, 0.55)));
      piece.shape.forEach((row, r) => row.forEach((v, c) => v && cell(piece.x + c, piece.y + r, piece.color)));
      if (!still) raf = requestAnimationFrame(draw);
    };
    reset();
    draw(0);
    window.addEventListener("resize", reset);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", reset);
    };
  }, []);
  return <canvas ref={ref} className="arc-well" aria-hidden="true" />;
}

const scores = [
  { label: "Trees planted", value: "100000" },
  { label: "Movie reviews classified", value: "156000" },
  { label: "App downloads", value: "500+" },
  { label: "Students graded", value: "100+" },
  { label: "CV pipelines shipped", value: "8+" },
  { label: "Countries reached", value: "8+" },
];

function Continue() {
  const [n, setN] = useState(9);
  const ref = useRef(null);
  useEffect(() => {
    let timer;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setN((v) => (v > 0 ? v - 1 : 0)), 900);
    });
    io.observe(ref.current);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);
  return (
    <footer className="arc-foot" ref={ref}>
      <p className="arc-pixel arc-blink">{n > 0 ? "Continue?" : "Thanks for playing"}</p>
      <p className="arc-count" aria-live="polite">{n > 0 ? n : "★"}</p>
      <a className="arc-btn" href={`mailto:${person.email}`}>
        ▶ Player 2, press start
      </a>
      <p className="arc-mail">{person.email}</p>
      <div className="arc-links">
        {links.map((l) => (
          <a key={l.label} href={l.href} {...ext}>
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default function Arcade() {
  const [stage, setStage] = useState(0);
  const [bag, setBag] = useState(0);
  const p = projects[stage];
  const levels = [...experiences].reverse();

  return (
    <div className="arc">
      <div className="arc-scan" aria-hidden="true" />
      <header className="arc-hud">
        <span>
          1UP <b>{String(projects.length * 100).padStart(6, "0")}</b>
        </span>
        <span>
          HI-SCORE <b>100000</b>
        </span>
        <span>
          CREDIT <b>0{projects.length}</b>
        </span>
      </header>

      <section className="arc-title">
        <Well />
        <div className="arc-title-inner">
          <p className="arc-pixel arc-p1">Player 1</p>
          <h1 className="arc-name">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h1>
          <p className="arc-tag">{person.tagline}</p>
          <a className="arc-btn arc-blink-soft" href="#arc-stages">
            ▶ Press start
          </a>
          <p className="arc-hint">A tribute to Square Saga, the HTML5 Canvas game I built in 2023.</p>
        </div>
      </section>

      <section className="arc-section" id="arc-stages">
        <h2 className="arc-h2">Stage select</h2>
        <div className="arc-stages" role="tablist" aria-label="Projects">
          {projects.map((pr, i) => (
            <button
              key={pr.slug}
              type="button"
              role="tab"
              aria-selected={stage === i}
              className={`arc-cart${stage === i ? " is-on" : ""}`}
              style={{ "--c": COLORS[i % 7] }}
              onClick={() => setStage(i)}
            >
              <img src={pr.images[0]} alt="" loading="lazy" />
              <span className="arc-cart-name">{pr.title}</span>
              <span className="arc-cart-year">{pr.period}</span>
            </button>
          ))}
        </div>
        <div className="arc-screen" role="tabpanel" style={{ "--c": COLORS[stage % 7] }}>
          <div className="arc-screen-shots">
            {p.images.map((src, j) => (
              <img key={src} src={src} alt={`${p.title}: ${p.imageLabels[j]}`} loading="lazy" />
            ))}
          </div>
          <div className="arc-screen-text">
            <p className="arc-pixel arc-small">Genre · {p.category}</p>
            <h3 className="arc-pixel">{p.title}</h3>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="arc-power">
              <span className="arc-pixel arc-small">Power-ups</span> {p.technologies.slice(0, 6).join(" · ")}
            </p>
            <a className="arc-btn arc-btn-sm" href={p.link} {...ext}>
              View source
            </a>
          </div>
        </div>
      </section>

      <section className="arc-section">
        <h2 className="arc-h2">World map</h2>
        <ol className="arc-levels">
          {levels.map((e, i) => (
            <li key={e.company} style={{ "--c": COLORS[(i + 2) % 7] }}>
              <span className="arc-level-no arc-pixel">
                {i + 1}-{e.type === "research" ? "R" : "I"}
              </span>
              <div>
                <p className="arc-pixel arc-small">{e.period}</p>
                <h3>
                  {e.role} <span>@ {e.company}</span>
                </h3>
                <p>{e.bullets[0]}</p>
                <div className="arc-xp" aria-hidden="true">
                  <i style={{ width: `${Math.min(100, 35 + e.skills.length * 4)}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="arc-section">
        <h2 className="arc-h2">Inventory</h2>
        <div className="arc-bags" role="tablist" aria-label="Skill categories">
          {skills.map((s, i) => (
            <button key={s.category} type="button" role="tab" aria-selected={bag === i} className={bag === i ? "is-on" : ""} onClick={() => setBag(i)}>
              {s.category}
            </button>
          ))}
        </div>
        <ul className="arc-slots">
          {skills[bag].items.map((it, i) => (
            <li key={it} style={{ "--c": COLORS[i % 7] }}>
              <span className="arc-slot-icon arc-pixel">{it.replace(/[^A-Za-z0-9]/g, "").slice(0, 2)}</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="arc-section arc-split">
        <div>
          <h2 className="arc-h2">Achievements</h2>
          <ul className="arc-ach">
            {leadership.flatMap((g) => g.items).map((it, i) => (
              <li key={it} style={{ "--c": COLORS[(i + 1) % 7] }}>
                <span className="arc-trophy" aria-hidden="true" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="arc-h2">High scores</h2>
          <table className="arc-scores">
            <tbody>
              {scores.map((s, i) => (
                <tr key={s.label}>
                  <td className="arc-pixel">{i + 1}</td>
                  <td>{s.label}</td>
                  <td className="arc-pixel">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Continue />
    </div>
  );
}
