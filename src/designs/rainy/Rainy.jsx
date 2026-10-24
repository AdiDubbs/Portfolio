import { useEffect, useRef, useState } from "react";
import "./rainy.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

// Drops cling to the glass, some slide down and leave a trail
function RainGlass() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let drops = [];
    let raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = innerWidth * dpr;
      c.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops = Array.from({ length: Math.round((innerWidth * innerHeight) / 5000) }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: Math.random() ** 2 * 3.2 + 0.8,
        v: 0,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const d of drops) {
        if (!still) {
          if (d.v === 0 && d.r > 2.6 && Math.random() < 0.002) d.v = 0.6 + Math.random() * 1.6;
          if (d.v) {
            d.y += d.v;
            d.x += Math.sin(d.y / 30) * 0.15;
            ctx.strokeStyle = "rgba(200, 220, 255, 0.10)";
            ctx.lineWidth = d.r * 0.9;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y - 40);
            ctx.lineTo(d.x, d.y);
            ctx.stroke();
            if (d.y > innerHeight + 10) Object.assign(d, { y: -10, x: Math.random() * innerWidth, v: 0 });
          }
        }
        const g = ctx.createRadialGradient(d.x - d.r * 0.3, d.y - d.r * 0.3, 0, d.x, d.y, d.r);
        g.addColorStop(0, "rgba(255,255,255,0.55)");
        g.addColorStop(0.6, "rgba(180,200,240,0.18)");
        g.addColorStop(1, "rgba(20,30,60,0.25)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, d.r * 0.85, d.r, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="rn-glass" aria-hidden="true" />;
}

// Brown noise through a low-pass filter sounds a lot like steady rain
function useRainSound() {
  const ctxRef = useRef(null);
  const gainRef = useRef(null);
  const [on, setOn] = useState(false);
  const [vol, setVol] = useState(0.5);
  const toggle = async () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      const ac = new AC();
      const len = ac.sampleRate * 4;
      const buf = ac.createBuffer(1, len, ac.sampleRate);
      const data = buf.getChannelData(0);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const white = Math.random() * 2 - 1;
        last = (last + 0.02 * white) / 1.02;
        data[i] = last * 3.5;
      }
      const src = ac.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      const lp = ac.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1400;
      const gain = ac.createGain();
      gain.gain.value = 0;
      src.connect(lp).connect(gain).connect(ac.destination);
      src.start();
      ctxRef.current = ac;
      gainRef.current = gain;
    }
    const ac = ctxRef.current;
    if (ac.state === "suspended") await ac.resume();
    const next = !on;
    gainRef.current.gain.setTargetAtTime(next ? vol : 0, ac.currentTime, 0.4);
    setOn(next);
  };
  const setVolume = (v) => {
    setVol(v);
    if (gainRef.current && on) gainRef.current.gain.setTargetAtTime(v, ctxRef.current.currentTime, 0.1);
  };
  useEffect(() => () => ctxRef.current?.close(), []);
  return { on, vol, toggle, setVolume };
}

function FocusTimer() {
  const [left, setLeft] = useState(25 * 60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [run]);
  useEffect(() => {
    if (left === 0) setRun(false);
  }, [left]);
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return (
    <div className="rn-widget">
      <p className="rn-widget-label">Focus timer</p>
      <p className="rn-timer" aria-live="off">
        {mm}:{ss}
      </p>
      <div className="rn-row">
        <button type="button" className="rn-btn" onClick={() => setRun((r) => !r)}>
          {run ? "Pause" : left === 0 ? "Done" : "Start"}
        </button>
        <button type="button" className="rn-btn rn-btn-ghost" onClick={() => (setRun(false), setLeft(25 * 60))}>
          Reset
        </button>
      </div>
    </div>
  );
}

function FogNote() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let drawing = false;
    let raf;
    const size = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width;
      c.height = r.height;
      ctx.fillStyle = "rgba(220, 228, 240, 0.55)";
      ctx.fillRect(0, 0, c.width, c.height);
    };
    const wipe = (e) => {
      if (!drawing) return;
      const r = c.getBoundingClientRect();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(e.clientX - r.left, e.clientY - r.top, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    };
    // Fog slowly returns
    const refog = () => {
      ctx.fillStyle = "rgba(220, 228, 240, 0.004)";
      ctx.fillRect(0, 0, c.width, c.height);
      raf = requestAnimationFrame(refog);
    };
    const down = (e) => {
      drawing = true;
      c.setPointerCapture(e.pointerId);
      wipe(e);
    };
    const up = () => (drawing = false);
    size();
    refog();
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", wipe);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas ref={ref} className="rn-fog" aria-label="Fogged glass you can draw on with your finger or mouse" role="img" />;
}

export default function Rainy() {
  const [track, setTrack] = useState(0);
  const [auto, setAuto] = useState(false);
  const rain = useRainSound();
  const [lb, openLb] = useLightbox();
  const p = projects[track];

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setTrack((v) => (v + 1) % projects.length), 9000);
    return () => clearInterval(t);
  }, [auto]);

  return (
    <div className="rn">
      <div className="rn-city" aria-hidden="true" />
      <RainGlass />
      <div className="rn-lamp" aria-hidden="true" />

      <div className="rn-content">
        <section className="rn-hero">
          <p className="rn-mono">rainy day mode · {person.location}</p>
          <h1 className="rn-name">
            {firstName}
            <br />
            <span>{lastName}</span>
          </h1>
          <p className="rn-lede">{person.summary}</p>
          <div className="rn-widgets">
            <div className="rn-widget">
              <p className="rn-widget-label">Rain sounds</p>
              <button type="button" className={`rn-btn rn-sound${rain.on ? " is-on" : ""}`} onClick={rain.toggle} aria-pressed={rain.on}>
                <span className="rn-eq" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
                {rain.on ? "Rain is on" : "Play the rain"}
              </button>
              <label className="rn-vol" htmlFor="rn-vol">
                <span>Volume</span>
                <input id="rn-vol" type="range" min="0" max="1" step="0.05" value={rain.vol} onChange={(e) => rain.setVolume(Number(e.target.value))} />
              </label>
            </div>
            <FocusTimer />
            <div className="rn-widget">
              <p className="rn-widget-label">Now playing</p>
              <p className="rn-np">{p.title}</p>
              <p className="rn-mono rn-dim">
                track {track + 1} of {projects.length}
              </p>
            </div>
          </div>
        </section>

        <section className="rn-section">
          <h2 className="rn-h2">A little about me</h2>
          <div className="rn-cards3">
            {about.map((a) => (
              <article key={a.label} className="rn-card">
                <h3>{a.label}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rn-section">
          <h2 className="rn-h2">The playlist</h2>
          <div className="rn-player">
            <ol className="rn-tracks rn-card">
              {projects.map((pr, i) => (
                <li key={pr.slug}>
                  <button type="button" className={track === i ? "is-on" : ""} onClick={() => setTrack(i)} aria-current={track === i}>
                    <span className="rn-mono rn-dim">{String(i + 1).padStart(2, "0")}</span>
                    <span className="rn-track-title">{pr.title}</span>
                    <span className="rn-mono rn-dim">{pr.period}</span>
                  </button>
                </li>
              ))}
              <li className="rn-controls">
                <button type="button" className="rn-btn rn-btn-ghost" onClick={() => setTrack((track - 1 + projects.length) % projects.length)} aria-label="Previous project">
                  ←
                </button>
                <button type="button" className="rn-btn" onClick={() => setAuto((a) => !a)} aria-pressed={auto}>
                  {auto ? "Pause shuffle" : "Auto-play"}
                </button>
                <button type="button" className="rn-btn rn-btn-ghost" onClick={() => setTrack((track + 1) % projects.length)} aria-label="Next project">
                  →
                </button>
              </li>
            </ol>
            <article className="rn-card rn-now" key={p.slug}>
              <button type="button" className="rn-art" onClick={() => openLb(p, 0)} aria-label={`Enlarge ${p.imageLabels[0]}`}>
                <img src={p.images[0]} alt={`${p.title}: ${p.imageLabels[0]}`} />
              </button>
              <div className="rn-now-text">
                <p className="rn-mono rn-dim">{p.category}</p>
                <h3>{p.title}</h3>
                <p className="rn-widget-label">Liner notes</p>
                <ul>
                  {p.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="rn-credits">
                  <span className="rn-widget-label">Credits</span> {p.technologies.join(", ")}
                </p>
                <div className="rn-row">
                  {p.images.slice(1).map((src, j) => (
                    <button key={src} type="button" className="rn-thumb" onClick={() => openLb(p, j + 1)} aria-label={`Enlarge ${p.imageLabels[j + 1]}`}>
                      <img src={src} alt="" />
                    </button>
                  ))}
                  <a className="rn-btn" href={p.link} {...ext}>
                    GitHub ↗
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="rn-section">
          <h2 className="rn-h2">Chapters so far</h2>
          <div className="rn-chapters">
            {experiences.map((e) => (
              <article key={e.company} className="rn-card">
                <p className="rn-mono rn-dim">{e.period}</p>
                <h3>{e.role}</h3>
                <p className="rn-co">
                  {e.company} · {e.location}
                </p>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="rn-chips">
                  {e.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                {(e.link || e.projectLink) && (
                  <p className="rn-row">
                    {e.link && (
                      <a href={e.link} {...ext}>
                        {e.linkLabel} ↗
                      </a>
                    )}
                    {e.projectLink && (
                      <a href={e.projectLink} {...ext}>
                        {e.projectLinkLabel} ↗
                      </a>
                    )}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="rn-section rn-split">
          <div>
            <h2 className="rn-h2">Things I reach for</h2>
            <div className="rn-card">
              {skills.map((s) => (
                <div key={s.category} className="rn-skill">
                  <h3>{s.category}</h3>
                  <div className="rn-chips">
                    {s.items.map((it) => (
                      <span key={it}>{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="rn-h2">School</h2>
            <article className="rn-card">
              <p className="rn-mono rn-dim">{education.graduation}</p>
              <h3>{education.university}</h3>
              <p className="rn-co">{education.degree}</p>
              <ul>
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <p>{education.involvement}</p>
            </article>
          </div>
        </section>

        <section className="rn-section">
          <h2 className="rn-h2">Outside, in the rain</h2>
          <div className="rn-cards3">
            {leadership.map((g) => (
              <article key={g.label} className="rn-card">
                <h3>{g.label}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="rn-press">
            {press.map((l) => (
              <a key={l.url} href={l.url} {...ext}>
                {l.name}
              </a>
            ))}
          </p>
        </section>

        <footer className="rn-foot">
          <h2 className="rn-h2">Leave a note on the glass</h2>
          <div className="rn-fog-wrap">
            <FogNote />
            <p className="rn-fog-hint">draw with your finger or mouse</p>
          </div>
          <div className="rn-card rn-contact">
            <p className="rn-widget-label">Or write to me</p>
            <a className="rn-mail" href={`mailto:${person.email}`}>
              {person.email}
            </a>
            <p className="rn-row">
              {links.map((l) => (
                <a key={l.label} href={l.href} {...ext}>
                  {l.label}
                </a>
              ))}
            </p>
          </div>
        </footer>
      </div>
      {lb}
    </div>
  );
}
