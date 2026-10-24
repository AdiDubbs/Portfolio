import { useEffect, useRef, useState } from "react";
import "./desktop.css";
import { about, education, experiences, ext, firstName, leadership, links, person, photo, press, projects, skills } from "../data";
import { useLightbox } from "../shared/Lightbox";
import Minesweeper from "./Minesweeper";

function Icon({ kind }) {
  const paths = {
    folder: <path d="M2 7h8l2 2h10v11H2z" fill="#f2d16b" stroke="#000" />,
    note: (
      <>
        <path d="M5 2h11l4 4v16H5z" fill="#fff" stroke="#000" />
        <path d="M8 9h9M8 12h9M8 15h9M8 18h6" stroke="#00008b" />
      </>
    ),
    doc: (
      <>
        <path d="M5 2h11l4 4v16H5z" fill="#fff" stroke="#000" />
        <rect x="8" y="8" width="9" height="3" fill="#1d5bbf" />
        <path d="M8 14h9M8 17h9" stroke="#000" />
      </>
    ),
    exe: (
      <>
        <rect x="2" y="4" width="20" height="16" fill="#c0c0c0" stroke="#000" />
        <rect x="2" y="4" width="20" height="4" fill="#000080" />
        <circle cx="12" cy="14" r="3.5" fill="#ffd400" stroke="#000" />
      </>
    ),
    cap: (
      <>
        <path d="M1 9l11-5 11 5-11 5z" fill="#222" stroke="#000" />
        <path d="M6 12v5c3 2 9 2 12 0v-5" fill="#444" stroke="#000" />
        <path d="M21 10v6" stroke="#ffd400" strokeWidth="2" />
      </>
    ),
    tree: (
      <>
        <path d="M12 2l7 10h-4l5 6H4l5-6H5z" fill="#2e8b57" stroke="#000" />
        <rect x="10" y="18" width="4" height="4" fill="#8b5a2b" stroke="#000" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="5" width="20" height="14" fill="#fff" stroke="#000" />
        <path d="M2 5l10 8 10-8" fill="none" stroke="#000" />
      </>
    ),
    mine: (
      <>
        <rect x="2" y="2" width="20" height="20" fill="#c0c0c0" stroke="#000" />
        <circle cx="12" cy="12" r="5" fill="#000" />
        <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="#000" strokeWidth="1.5" />
        <rect x="9.5" y="9.5" width="2" height="2" fill="#fff" />
      </>
    ),
    bin: (
      <>
        <path d="M6 7h12l-1 15H7z" fill="#dfe6ee" stroke="#000" />
        <path d="M4 7h16M9 4h6v3" fill="none" stroke="#000" />
        <path d="M10 10v9M14 10v9" stroke="#808080" />
      </>
    ),
    pc: (
      <>
        <rect x="3" y="3" width="18" height="13" fill="#c0c0c0" stroke="#000" />
        <rect x="5" y="5" width="14" height="9" fill="#008080" stroke="#000" />
        <path d="M8 19h8M12 16v3" stroke="#000" strokeWidth="2" />
      </>
    ),
  };
  return (
    <svg className="dt-ico" viewBox="0 0 24 24" aria-hidden="true">
      {paths[kind]}
    </svg>
  );
}

const apps = [
  { id: "about", title: "About Me.txt", icon: "note" },
  { id: "projects", title: "My Projects", icon: "folder" },
  { id: "experience", title: "Experience.doc", icon: "doc" },
  { id: "skills", title: "Skills.exe", icon: "exe" },
  { id: "education", title: "Education", icon: "cap" },
  { id: "activism", title: "Activism", icon: "tree" },
  { id: "contact", title: "Contact", icon: "mail" },
  { id: "mines", title: "Minesweeper", icon: "mine" },
  { id: "bin", title: "Recycle Bin", icon: "bin" },
];

const defaults = {
  welcome: { x: 130, y: 24, w: 470 },
  about: { x: 640, y: 64, w: 440 },
  projects: { x: 180, y: 110, w: 620 },
  experience: { x: 220, y: 50, w: 640 },
  skills: { x: 280, y: 80, w: 560 },
  education: { x: 340, y: 100, w: 480 },
  activism: { x: 260, y: 70, w: 600 },
  contact: { x: 500, y: 150, w: 380 },
  mines: { x: 700, y: 130, w: 250 },
  bin: { x: 440, y: 190, w: 360 },
  project: { x: 360, y: 40, w: 660 },
};

function Win({ id, title, icon, state, onFocus, onClose, onMin, onMove, children }) {
  const drag = useRef(null);
  const [max, setMax] = useState(false);
  const onDown = (e) => {
    if (e.target.closest("button") || max || window.innerWidth < 760) return;
    onFocus(id);
    drag.current = { px: e.clientX, py: e.clientY, x: state.x, y: state.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMoveP = (e) => {
    const d = drag.current;
    if (!d) return;
    onMove(id, Math.max(0, d.x + e.clientX - d.px), Math.max(0, d.y + e.clientY - d.py));
  };
  return (
    <section
      className={`dt-win w98-raised${max ? " is-max" : ""}`}
      style={{ left: state.x, top: state.y, width: state.w, zIndex: state.z }}
      onPointerDown={() => onFocus(id)}
      aria-label={title}
    >
      <header className={`dt-title${state.active ? "" : " is-idle"}`} onPointerDown={onDown} onPointerMove={onMoveP} onPointerUp={() => (drag.current = null)} onDoubleClick={() => setMax((m) => !m)}>
        <Icon kind={icon} />
        <span>{title}</span>
        <span className="dt-title-btns">
          <button type="button" className="w98-raised" onClick={() => onMin(id)} aria-label="Minimize">
            _
          </button>
          <button type="button" className="w98-raised" onClick={() => setMax((m) => !m)} aria-label={max ? "Restore" : "Maximize"}>
            □
          </button>
          <button type="button" className="w98-raised" onClick={() => onClose(id)} aria-label="Close">
            ×
          </button>
        </span>
      </header>
      <div className="dt-body">{children}</div>
    </section>
  );
}

export default function Desktop() {
  const [wins, setWins] = useState(() => ({
    welcome: { ...defaults.welcome, open: true, min: false, z: 2 },
    about: { ...defaults.about, open: true, min: false, z: 3 },
  }));
  const [focus, setFocusId] = useState("about");
  const [selected, setSelected] = useState(null);
  const [start, setStart] = useState(false);
  const [off, setOff] = useState(false);
  const [proj, setProj] = useState(null);
  const [clock, setClock] = useState(() => new Date());
  const [lb, openLb] = useLightbox();
  const zTop = useRef(10);

  useEffect(() => {
    const t = setInterval(() => setClock(new Date()), 15000);
    return () => clearInterval(t);
  }, []);

  const focusWin = (id) => {
    setFocusId(id);
    setWins((w) => (w[id] ? { ...w, [id]: { ...w[id], z: ++zTop.current, min: false } } : w));
  };
  const open = (id) => {
    setStart(false);
    setFocusId(id);
    setWins((w) => {
      const base = w[id] || { ...(defaults[id] || defaults.projects) };
      return { ...w, [id]: { ...base, open: true, min: false, z: ++zTop.current } };
    });
    if (window.innerWidth < 760) setTimeout(() => document.getElementById(`dt-${id}`)?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  const close = (id) => setWins((w) => ({ ...w, [id]: { ...w[id], open: false } }));
  const minimize = (id) => setWins((w) => ({ ...w, [id]: { ...w[id], min: true } }));
  const move = (id, x, y) => setWins((w) => ({ ...w, [id]: { ...w[id], x, y } }));
  const openProject = (p) => {
    setProj(p);
    open("project");
  };

  const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const titles = { welcome: "Welcome", project: proj ? `${proj.title} - Viewer` : "Viewer" };
  const icons = { welcome: "pc", project: "folder" };

  const content = (id) => {
    switch (id) {
      case "welcome":
        return (
          <div className="dt-welcome">
            <img src={photo} alt={`${person.name} at Yosemite`} />
            <div>
              <h1>Welcome to {firstName} 98</h1>
              <p className="dt-tag">{person.tagline}</p>
              <p>{person.summary}</p>
              <p className="dt-tip">
                <b>Tip:</b> {coarse ? "tap an icon to open it, or use the Start menu." : "double-click the icons on the left, drag windows by their title bars, or use the Start menu."}
              </p>
              <div className="dt-row">
                <button type="button" className="dt-btn w98-raised" onClick={() => open("projects")}>
                  Open My Projects
                </button>
                <button type="button" className="dt-btn w98-raised" onClick={() => open("contact")}>
                  Contact
                </button>
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="dt-notepad w98-sunken">
            <p className="dt-menu">File&nbsp;&nbsp; Edit&nbsp;&nbsp; Search&nbsp;&nbsp; Help</p>
            {about.map((a) => (
              <p key={a.label}>
                <b>{a.label.toUpperCase()}</b>
                <br />
                {a.text}
              </p>
            ))}
          </div>
        );
      case "projects":
        return (
          <div>
            <p className="dt-address w98-sunken">C:\My Documents\Projects</p>
            <table className="dt-table w98-sunken">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Year</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.slug} tabIndex={0} onDoubleClick={() => openProject(p)} onClick={() => coarse && openProject(p)} onKeyDown={(e) => e.key === "Enter" && openProject(p)}>
                    <td>
                      <Icon kind="folder" /> {p.title}
                    </td>
                    <td>{p.period}</td>
                    <td>{p.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="dt-status">{projects.length} object(s) · double-click a folder to open it</p>
          </div>
        );
      case "project":
        if (!proj) return null;
        return (
          <div className="dt-viewer">
            <div className="dt-shots">
              {proj.images.map((src, j) => (
                <button key={src} type="button" className="w98-sunken" onClick={() => openLb(proj, j)} aria-label={`Enlarge ${proj.imageLabels[j]}`}>
                  <img src={src} alt={`${proj.title}: ${proj.imageLabels[j]}`} />
                  <span>{proj.imageLabels[j]}.png</span>
                </button>
              ))}
            </div>
            <fieldset className="dt-field">
              <legend>README.txt</legend>
              <ul>
                {proj.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="dt-field">
              <legend>Properties</legend>
              <p>
                <b>Type:</b> {proj.category} · <b>Year:</b> {proj.period}
              </p>
              <p>
                <b>Built with:</b> {proj.technologies.join(", ")}
              </p>
            </fieldset>
            <a className="dt-btn w98-raised" href={proj.link} {...ext}>
              View on GitHub…
            </a>
          </div>
        );
      case "experience":
        return (
          <div className="dt-doc w98-sunken">
            {experiences.map((e) => (
              <div key={e.company} className="dt-doc-entry">
                <h2>{e.role}</h2>
                <p className="dt-doc-meta">
                  {e.company} · {e.location} · {e.period}
                </p>
                <ul>
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <p className="dt-doc-meta">{e.skills.join(", ")}</p>
                {(e.link || e.projectLink) && (
                  <p className="dt-row">
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
              </div>
            ))}
          </div>
        );
      case "skills":
        return (
          <div className="dt-installer">
            <p>Setup has detected the following components:</p>
            {skills.map((s) => (
              <fieldset key={s.category} className="dt-field">
                <legend>
                  <input type="checkbox" checked readOnly aria-label={`${s.category} installed`} /> {s.category} ({s.items.length})
                </legend>
                <p>{s.items.join(", ")}</p>
              </fieldset>
            ))}
            <div className="dt-progress w98-sunken" aria-hidden="true">
              <i />
            </div>
            <p className="dt-status">All components installed.</p>
          </div>
        );
      case "education":
        return (
          <div>
            <fieldset className="dt-field">
              <legend>School</legend>
              <p>
                <b>{education.university}</b>
              </p>
              <p>
                {education.degree} · {education.location} · {education.graduation}
              </p>
            </fieldset>
            <fieldset className="dt-field">
              <legend>Coursework</legend>
              <ul className="dt-cols">
                {education.coursework.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </fieldset>
            <fieldset className="dt-field">
              <legend>Clubs</legend>
              <p>{education.involvement}</p>
            </fieldset>
          </div>
        );
      case "activism":
        return (
          <div>
            {leadership.map((g) => (
              <fieldset key={g.label} className="dt-field">
                <legend>{g.label}</legend>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </fieldset>
            ))}
            <fieldset className="dt-field">
              <legend>Favorites</legend>
              <ul className="dt-cols">
                {press.map((l) => (
                  <li key={l.url}>
                    <a href={l.url} {...ext}>
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </fieldset>
          </div>
        );
      case "contact":
        return (
          <div className="dt-contact">
            <p>
              <b>To:</b> {person.email}
            </p>
            <p className="w98-sunken dt-compose">Hi {firstName}, I’d love to talk about a role…</p>
            <div className="dt-row">
              <a className="dt-btn w98-raised" href={`mailto:${person.email}`}>
                Send
              </a>
              {links.map((l) => (
                <a key={l.label} className="dt-btn w98-raised" href={l.href} {...ext}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        );
      case "mines":
        return <Minesweeper />;
      case "bin":
        return (
          <div>
            <p className="dt-address w98-sunken">C:\Recycle Bin</p>
            <ul className="dt-bin">
              <li>
                <Icon kind="note" /> excuses.txt
              </li>
              <li>
                <Icon kind="doc" /> unfinished_side_project_v7.doc
              </li>
              <li>
                <Icon kind="exe" /> procrastinate.exe
              </li>
            </ul>
            <p className="dt-status">3 object(s), all safely deleted.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (off) {
    return (
      <div className="dt-off" onClick={() => setOff(false)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOff(false)}>
        <p>It’s now safe to turn off your portfolio.</p>
        <span>Click anywhere to start {firstName} 98 again</span>
      </div>
    );
  }

  const openIds = Object.keys(wins).filter((id) => wins[id].open);

  return (
    <div className="dt">
      <div className="dt-taskbar w98-raised">
        <button type="button" className={`dt-start w98-raised${start ? " is-down" : ""}`} onClick={() => setStart((s) => !s)} aria-expanded={start}>
          <span className="dt-flag" aria-hidden="true" />
          Start
        </button>
        <div className="dt-tasks">
          {openIds.map((id) => (
            <button key={id} type="button" className={`dt-task w98-raised${focus === id && !wins[id].min ? " is-down" : ""}`} onClick={() => (wins[id].min || focus !== id ? focusWin(id) : minimize(id))}>
              <Icon kind={icons[id] || apps.find((a) => a.id === id)?.icon || "pc"} />
              <span>{titles[id] || apps.find((a) => a.id === id)?.title}</span>
            </button>
          ))}
        </div>
        <span className="dt-tray w98-sunken">{clock.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span>
      </div>
      {start && (
        <div className="dt-startmenu w98-raised">
          <span className="dt-startband">
            <b>{firstName}</b>98
          </span>
          <ul>
            {apps.map((a) => (
              <li key={a.id}>
                <button type="button" onClick={() => open(a.id)}>
                  <Icon kind={a.icon} /> {a.title}
                </button>
              </li>
            ))}
            <li className="dt-sep" />
            <li>
              <button type="button" onClick={() => setOff(true)}>
                <Icon kind="pc" /> Shut Down…
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="dt-desk" onPointerDown={(e) => e.target === e.currentTarget && (setSelected(null), setStart(false))}>
        <ul className="dt-icons">
          {apps.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                className={selected === a.id ? "is-sel" : ""}
                onClick={() => (coarse ? open(a.id) : setSelected(a.id))}
                onDoubleClick={() => open(a.id)}
                onKeyDown={(e) => e.key === "Enter" && open(a.id)}
              >
                <Icon kind={a.icon} />
                <span>{a.title}</span>
              </button>
            </li>
          ))}
        </ul>
        {openIds
          .filter((id) => !wins[id].min)
          .map((id) => (
            <div key={id} id={`dt-${id}`} className="dt-win-slot">
              <Win
                id={id}
                title={titles[id] || apps.find((a) => a.id === id)?.title}
                icon={icons[id] || apps.find((a) => a.id === id)?.icon || "pc"}
                state={{ ...wins[id], active: focus === id }}
                onFocus={focusWin}
                onClose={close}
                onMin={minimize}
                onMove={move}
              >
                {content(id)}
              </Win>
            </div>
          ))}
      </div>
      {lb}
    </div>
  );
}
