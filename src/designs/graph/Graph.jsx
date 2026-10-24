import { useEffect, useMemo, useRef, useState } from "react";
import "./graph.css";
import { about, education, experiences, ext, firstName, lastName, leadership, links, person, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";

const COLORS = { project: "#ff7a59", role: "#5ad1c8", skill: "#a99cff" };

// Projects and roles link to every tool they list; shared tools pull them together
function buildGraph() {
  const nodes = [];
  const index = new Map();
  const add = (id, type, label, data) => {
    if (!index.has(id)) {
      index.set(id, nodes.length);
      nodes.push({ id, type, label, data, links: new Set() });
    }
    return index.get(id);
  };
  const edges = [];
  const link = (a, b) => {
    edges.push([a, b]);
    nodes[a].links.add(b);
    nodes[b].links.add(a);
  };
  projects.forEach((p) => {
    const a = add(`p:${p.slug}`, "project", p.title, p);
    p.technologies.forEach((t) => link(a, add(`s:${t.toLowerCase()}`, "skill", t)));
  });
  experiences.forEach((e) => {
    const a = add(`r:${e.company}`, "role", e.company.replace("Speech Processing & Auditory Neuroscience Laboratory", "SPAN Lab"), e);
    e.skills.forEach((t) => link(a, add(`s:${t.toLowerCase()}`, "skill", t)));
  });
  return { nodes, edges };
}

function radius(n) {
  if (n.type === "project") return 16;
  if (n.type === "role") return 13;
  return 3 + Math.min(6, n.links.size * 1.6);
}

function GraphCanvas({ graph, selected, onSelect, query, filter }) {
  const ref = useRef(null);
  const wrap = useRef(null);
  const sim = useRef(null);
  const state = useRef({ hover: -1, drag: -1, alpha: 1 });
  const props = useRef({ selected, query, filter });
  props.current = { selected, query, filter };

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let raf;
    const size = () => {
      const r = wrap.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.current.alpha = Math.max(state.current.alpha, 0.5);
    };
    size();
    if (!sim.current) {
      sim.current = graph.nodes.map((n, i) => {
        const a = (i / graph.nodes.length) * Math.PI * 2;
        const r = n.type === "skill" ? Math.min(w, h) * 0.42 : Math.min(w, h) * 0.18;
        return { x: w / 2 + Math.cos(a) * r, y: h / 2 + Math.sin(a) * r, vx: 0, vy: 0 };
      });
    }
    const P = sim.current;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      const s = state.current;
      const n = P.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          let dx = P[j].x - P[i].x;
          let dy = P[j].y - P[i].y;
          let d2 = dx * dx + dy * dy || 0.01;
          if (d2 > 160000) continue;
          const f = (graph.nodes[i].type === "skill" && graph.nodes[j].type === "skill" ? 700 : 3200) / d2;
          const d = Math.sqrt(d2);
          dx /= d;
          dy /= d;
          P[i].vx -= dx * f;
          P[i].vy -= dy * f;
          P[j].vx += dx * f;
          P[j].vy += dy * f;
        }
      }
      const target = Math.min(w, h) < 500 ? 70 : 115;
      for (const [a, b] of graph.edges) {
        const dx = P[b].x - P[a].x;
        const dy = P[b].y - P[a].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = (d - target) * 0.012;
        P[a].vx += (dx / d) * f;
        P[a].vy += (dy / d) * f;
        P[b].vx -= (dx / d) * f;
        P[b].vy -= (dy / d) * f;
      }
      for (let i = 0; i < n; i++) {
        const p = P[i];
        p.vx += (w / 2 - p.x) * 0.0009;
        p.vy += (h / 2 - p.y) * 0.0012;
        if (i === s.drag) continue;
        p.x += p.vx * s.alpha;
        p.y += p.vy * s.alpha;
        p.vx *= 0.82;
        p.vy *= 0.82;
        const r = radius(graph.nodes[i]) + 4;
        p.x = Math.max(r, Math.min(w - r, p.x));
        p.y = Math.max(r, Math.min(h - r, p.y));
      }
      s.alpha = Math.max(still ? 0 : 0.04, s.alpha * 0.985);
    };

    const draw = () => {
      const { selected: sel, query: q, filter: f } = props.current;
      const s = state.current;
      const focus = s.hover >= 0 ? s.hover : sel;
      const near = focus >= 0 ? graph.nodes[focus].links : null;
      const match = (n) => q && n.label.toLowerCase().includes(q.toLowerCase());
      const shown = (n) => f === "all" || n.type === "skill" || n.type === f;
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (const [a, b] of graph.edges) {
        const on = focus >= 0 && (a === focus || b === focus);
        if (!shown(graph.nodes[a]) || !shown(graph.nodes[b])) continue;
        ctx.strokeStyle = on ? "rgba(255,255,255,0.55)" : focus >= 0 ? "rgba(232,236,245,0.04)" : "rgba(232,236,245,0.10)";
        ctx.beginPath();
        ctx.moveTo(P[a].x, P[a].y);
        ctx.lineTo(P[b].x, P[b].y);
        ctx.stroke();
      }
      graph.nodes.forEach((n, i) => {
        if (!shown(n)) return;
        const r = radius(n);
        const lit = focus < 0 || i === focus || near.has(i);
        ctx.globalAlpha = lit ? 1 : 0.18;
        if (match(n)) {
          ctx.fillStyle = "rgba(255,255,255,0.18)";
          ctx.beginPath();
          ctx.arc(P[i].x, P[i].y, r + 9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = COLORS[n.type];
        ctx.beginPath();
        ctx.arc(P[i].x, P[i].y, r, 0, Math.PI * 2);
        ctx.fill();
        if (i === sel) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(P[i].x, P[i].y, r + 4, 0, Math.PI * 2);
          ctx.stroke();
          ctx.lineWidth = 1;
        }
        const label = n.type !== "skill" || n.links.size > 1 || match(n) || (focus >= 0 && (i === focus || near.has(i)));
        if (label) {
          ctx.font = n.type === "skill" ? "500 11px Onest, system-ui, sans-serif" : "600 13px Unbounded, system-ui, sans-serif";
          ctx.fillStyle = n.type === "skill" ? "#cfd5e6" : "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(n.label, P[i].x, P[i].y - r - 6);
        }
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      if (state.current.alpha > 0.05 || state.current.drag >= 0) tick();
      draw();
      raf = requestAnimationFrame(loop);
    };
    if (still) for (let k = 0; k < 300; k++) tick();
    loop();

    const at = (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      let best = -1;
      let bd = Infinity;
      P.forEach((p, i) => {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < radius(graph.nodes[i]) + 8 && d < bd) {
          bd = d;
          best = i;
        }
      });
      return { i: best, x, y };
    };
    let down = null;
    const onDown = (e) => {
      const hit = at(e);
      down = { ...hit, moved: false };
      if (hit.i >= 0) {
        state.current.drag = hit.i;
        canvas.setPointerCapture(e.pointerId);
      }
    };
    const onMove = (e) => {
      const hit = at(e);
      const s = state.current;
      if (s.drag >= 0) {
        P[s.drag].x = hit.x;
        P[s.drag].y = hit.y;
        s.alpha = Math.max(s.alpha, 0.3);
        if (down) down.moved = true;
      } else {
        s.hover = hit.i;
        canvas.style.cursor = hit.i >= 0 ? "pointer" : "default";
      }
    };
    const onUp = () => {
      const s = state.current;
      if (down && !down.moved) onSelect(down.i);
      s.drag = -1;
      down = null;
    };
    const onLeave = () => {
      state.current.hover = -1;
    };
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", size);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [graph, onSelect]);

  return (
    <div className="kg-canvas" ref={wrap}>
      <canvas ref={ref} role="img" aria-label="Graph linking projects and roles to the tools they used. Use the panel and list to explore with a keyboard." />
    </div>
  );
}

export default function Graph() {
  const graph = useMemo(buildGraph, []);
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [lb, openLb] = useLightbox();
  const node = selected >= 0 ? graph.nodes[selected] : null;
  const select = useRef((i) => setSelected(i)).current;
  const byId = (id) => graph.nodes.findIndex((n) => n.id === id);
  const neighbours = node ? [...node.links].map((i) => graph.nodes[i]) : [];
  const shared = graph.nodes.filter((n) => n.type === "skill" && n.links.size > 1).sort((a, b) => b.links.size - a.links.size);

  return (
    <div className="kg">
      <header className="kg-head">
        <div>
          <p className="kg-eyebrow">{person.location} · knowledge graph</p>
          <h1 className="kg-name">
            {firstName} <span>{lastName}</span>
          </h1>
          <p className="kg-lede">{person.summary}</p>
        </div>
        <div className="kg-stats">
          <p>
            <b>{graph.nodes.filter((n) => n.type === "project").length}</b> projects
          </p>
          <p>
            <b>{graph.nodes.filter((n) => n.type === "role").length}</b> roles
          </p>
          <p>
            <b>{graph.nodes.filter((n) => n.type === "skill").length}</b> tools
          </p>
          <p>
            <b>{graph.edges.length}</b> links
          </p>
        </div>
      </header>

      <section className="kg-explorer">
        <div className="kg-toolbar">
          <label className="kg-search" htmlFor="kg-search">
            <span>Find</span>
            <input id="kg-search" type="search" placeholder="React, YOLO, Firebase…" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => {
              if (e.key === "Enter") {
                const i = graph.nodes.findIndex((n) => n.label.toLowerCase().includes(query.toLowerCase()));
                if (i >= 0) setSelected(i);
              }
            }} />
          </label>
          <div className="kg-filters" role="group" aria-label="Show">
            {["all", "project", "role"].map((f) => (
              <button key={f} type="button" className={filter === f ? "is-on" : ""} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === "all" ? "Everything" : f === "project" ? "Projects only" : "Roles only"}
              </button>
            ))}
          </div>
          <p className="kg-legend">
            <span style={{ "--c": COLORS.project }}>project</span>
            <span style={{ "--c": COLORS.role }}>role</span>
            <span style={{ "--c": COLORS.skill }}>tool (bigger = used more)</span>
          </p>
        </div>
        <div className="kg-stage">
          <GraphCanvas graph={graph} selected={selected} onSelect={select} query={query} filter={filter} />
          <aside className="kg-panel" aria-live="polite">
            {!node && <p className="kg-dim">Click a node to read about it. Drag nodes to rearrange.</p>}
            {node?.type === "project" && (
              <>
                <p className="kg-type" style={{ "--c": COLORS.project }}>
                  Project · {node.data.period}
                </p>
                <h2>{node.data.title}</h2>
                <p className="kg-dim">{node.data.category}</p>
                <div className="kg-shots">
                  {node.data.images.map((src, j) => (
                    <button key={src} type="button" onClick={() => openLb(node.data, j)} aria-label={`Enlarge ${node.data.imageLabels[j]}`}>
                      <img src={src} alt={`${node.data.title}: ${node.data.imageLabels[j]}`} />
                    </button>
                  ))}
                </div>
                <ul>
                  {node.data.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <a className="kg-link" href={node.data.link} {...ext}>
                  Source on GitHub →
                </a>
              </>
            )}
            {node?.type === "role" && (
              <>
                <p className="kg-type" style={{ "--c": COLORS.role }}>
                  {node.data.type} · {node.data.period}
                </p>
                <h2>{node.data.role}</h2>
                <p className="kg-dim">
                  {node.data.company} · {node.data.location}
                </p>
                <ul>
                  {node.data.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                {(node.data.link || node.data.projectLink) && (
                  <p className="kg-row">
                    {node.data.link && (
                      <a className="kg-link" href={node.data.link} {...ext}>
                        {node.data.linkLabel} →
                      </a>
                    )}
                    {node.data.projectLink && (
                      <a className="kg-link" href={node.data.projectLink} {...ext}>
                        {node.data.projectLinkLabel} →
                      </a>
                    )}
                  </p>
                )}
              </>
            )}
            {node?.type === "skill" && (
              <>
                <p className="kg-type" style={{ "--c": COLORS.skill }}>
                  Tool · used {node.links.size}×
                </p>
                <h2>{node.label}</h2>
              </>
            )}
            {node && (
              <>
                <p className="kg-sub">{node.type === "skill" ? "Used in" : "Connected tools"}</p>
                <div className="kg-chips">
                  {neighbours.map((n) => (
                    <button key={n.id} type="button" style={{ "--c": COLORS[n.type] }} onClick={() => setSelected(byId(n.id))}>
                      {n.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
        <div className="kg-index">
          <p className="kg-sub">Most shared tools</p>
          <div className="kg-chips">
            {shared.map((n) => (
              <button key={n.id} type="button" style={{ "--c": COLORS.skill }} onClick={() => setSelected(byId(n.id))}>
                {n.label} <span>{n.links.size}</span>
              </button>
            ))}
          </div>
          <p className="kg-sub">Every node</p>
          <div className="kg-chips">
            {graph.nodes
              .filter((n) => n.type !== "skill")
              .map((n) => (
                <button key={n.id} type="button" style={{ "--c": COLORS[n.type] }} onClick={() => setSelected(byId(n.id))}>
                  {n.label}
                </button>
              ))}
          </div>
        </div>
      </section>

      <section className="kg-section kg-grid3">
        {about.map((a) => (
          <article key={a.label} className="kg-card">
            <h3>{a.label}</h3>
            <p>{a.text}</p>
          </article>
        ))}
      </section>

      <section className="kg-section kg-split">
        <article className="kg-card">
          <p className="kg-type" style={{ "--c": COLORS.role }}>
            Education · {education.graduation}
          </p>
          <h3>{education.university}</h3>
          <p className="kg-dim">{education.degree}</p>
          <div className="kg-chips kg-static">
            {education.coursework.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          <p>{education.involvement}</p>
        </article>
        <article className="kg-card">
          <p className="kg-type" style={{ "--c": COLORS.skill }}>
            Full skill list
          </p>
          {skills.map((s) => (
            <p key={s.category} className="kg-skillrow">
              <b>{s.category}</b> {s.items.join(", ")}
            </p>
          ))}
        </article>
      </section>

      <section className="kg-section kg-grid3">
        {leadership.map((g) => (
          <article key={g.label} className="kg-card">
            <p className="kg-type" style={{ "--c": COLORS.project }}>
              Activism
            </p>
            <h3>{g.label}</h3>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <p className="kg-press">
        {press.map((l) => (
          <a key={l.url} href={l.url} {...ext}>
            {l.name}
          </a>
        ))}
      </p>

      <footer className="kg-foot">
        <p className="kg-eyebrow">Add an edge</p>
        <a className="kg-mail" href={`mailto:${person.email}`}>
          {person.email}
        </a>
        <p className="kg-row">
          {links.map((l) => (
            <a key={l.label} className="kg-link" href={l.href} {...ext}>
              {l.label} →
            </a>
          ))}
        </p>
      </footer>
      {lb}
    </div>
  );
}
