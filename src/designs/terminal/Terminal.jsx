import { useEffect, useRef, useState } from "react";
import "./terminal.css";
import { education, experiences, leadership, links, person, press, projects, skills, stats } from "../data";

const LOGO = String.raw`    ___    ____
   /   |  / __ \
  / /| | / / / /
 / ___ |/ /_/ /
/_/  |_/_____/`;

const PROMPT = "adi@madison:~$";
const commands = ["help", "about", "projects", "open", "experience", "skills", "activism", "press", "education", "contact", "neofetch", "ls", "history", "clear", "sudo"];
const chips = ["help", "projects", "open drift-shield", "experience", "skills", "activism", "contact", "clear"];
const totalSkills = skills.reduce((n, s) => n + s.items.length, 0);

const Ext = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

function Neofetch() {
  return (
    <div className="tm-neo">
      <pre className="tm-logo">{LOGO}</pre>
      <div className="tm-neo-info">
        <p>
          <b>adi</b>@<b>madison</b>
        </p>
        <p className="tm-dim">----------------</p>
        <p><b>Name</b>: {person.name}</p>
        <p><b>Role</b>: {person.tagline}</p>
        <p><b>Degree</b>: {education.degree}, {education.university}</p>
        <p><b>Host</b>: {person.location} (from Noida, India)</p>
        <p><b>Packages</b>: {totalSkills} skills, {stats.projects} projects</p>
        <p><b>Roles</b>: {stats.internships} internships, {stats.research} research</p>
        <p><b>Interests</b>: Formula 1, new AI models, gadgets, good design</p>
        <p className="tm-swatches" aria-hidden="true">
          <i /><i /><i /><i /><i /><i />
        </p>
      </div>
    </div>
  );
}

function run(raw, ctx) {
  const input = raw.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(" ").toLowerCase();
  switch (cmd) {
    case "":
      return null;
    case "help":
      return (
        <div className="tm-help">
          {[
            ["about", "who I am"],
            ["projects", "list projects"],
            ["open <name|#>", "read one project, e.g. open vitalis"],
            ["experience", "roles and research"],
            ["skills", "the toolbox"],
            ["activism", "advocacy and recognition"],
            ["press", "coverage links"],
            ["education", "degree and coursework"],
            ["contact", "how to reach me"],
            ["neofetch", "system summary"],
            ["clear", "clear the screen"],
          ].map(([c, d]) => (
            <p key={c}>
              <b>{c.padEnd(16, " ")}</b>
              <span className="tm-dim">{d}</span>
            </p>
          ))}
          <p className="tm-dim">Tab completes, ↑ ↓ walk history.</p>
        </div>
      );
    case "about":
    case "whoami":
      return (
        <div>
          <p>{person.summary}</p>
          <p className="tm-dim">{person.origin}</p>
          <p className="tm-dim">{person.focus}</p>
        </div>
      );
    case "ls":
      return (
        <p className="tm-ls">
          {projects.map((p) => (
            <b key={p.slug}>{p.slug}/</b>
          ))}
          <span>resume.txt</span>
          <span>contact.txt</span>
        </p>
      );
    case "projects":
      return (
        <div>
          {projects.map((p, i) => (
            <p key={p.slug}>
              <span className="tm-dim">[{i + 1}]</span> <b>{p.title.padEnd(13, " ")}</b>
              <span className="tm-dim">{p.period}</span> {p.category}
            </p>
          ))}
          <p className="tm-dim">Run: open drift-shield (or open 1)</p>
        </div>
      );
    case "open":
    case "cat":
    case "cd": {
      if (arg === "contact.txt") return run("contact", ctx);
      if (arg === "resume.txt") return run("experience", ctx);
      const n = Number(arg);
      const p = n ? projects[n - 1] : projects.find((x) => x.slug.startsWith(arg.replace(/\/$/, "")) || x.title.toLowerCase() === arg);
      if (!arg || !p) return <p className="tm-err">open: no such project “{arg}”. Try: projects</p>;
      return (
        <div className="tm-project">
          <p>
            <b>{p.title}</b> <span className="tm-dim">· {p.period} · {p.category}</span>
          </p>
          <div className="tm-shots">
            {p.images.map((src, j) => (
              <img key={src} src={src} alt={`${p.title}: ${p.imageLabels[j]}`} />
            ))}
          </div>
          {p.bullets.map((b) => (
            <p key={b}>
              <span className="tm-dim">›</span> {b}
            </p>
          ))}
          <p className="tm-dim">stack: {p.technologies.join(", ")}</p>
          <p>
            src: <Ext href={p.link}>{p.link.replace("https://", "").replace(/\.git$/, "")}</Ext>
          </p>
        </div>
      );
    }
    case "experience":
      return (
        <div>
          {experiences.map((e) => (
            <div key={e.company} className="tm-block">
              <p>
                <b>{e.role}</b> @ {e.company} <span className="tm-dim">· {e.period} · {e.location}</span>
              </p>
              {e.bullets.map((b) => (
                <p key={b} className="tm-indent">
                  <span className="tm-dim">›</span> {b}
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    case "skills":
      return (
        <div>
          {skills.map((s) => (
            <p key={s.category}>
              <b>{s.category.padEnd(25, " ")}</b>
              {s.items.join(", ")}
            </p>
          ))}
        </div>
      );
    case "activism":
      return (
        <div>
          {leadership.map((g) => (
            <div key={g.label} className="tm-block">
              <p>
                <b>## {g.label}</b>
              </p>
              {g.items.map((it) => (
                <p key={it} className="tm-indent">
                  <span className="tm-dim">›</span> {it}
                </p>
              ))}
            </div>
          ))}
          <p className="tm-dim">See coverage: press</p>
        </div>
      );
    case "press":
      return (
        <div>
          {press.map((l) => (
            <p key={l.url}>
              <Ext href={l.url}>{l.name.padEnd(20, " ")}</Ext> <span className="tm-dim">{l.description}</span>
            </p>
          ))}
        </div>
      );
    case "education":
      return (
        <div>
          <p>
            <b>{education.degree}</b>, {education.university} <span className="tm-dim">· {education.graduation}</span>
          </p>
          <p className="tm-dim">coursework: {education.coursework.join(", ")}</p>
          <p>{education.involvement}</p>
        </div>
      );
    case "contact":
      return (
        <div>
          <p>
            <b>email</b>    <a href={`mailto:${person.email}`}>{person.email}</a>
          </p>
          {links.map((l) => (
            <p key={l.label}>
              <b>{l.label.toLowerCase().padEnd(9, " ")}</b>
              <Ext href={l.href}>{l.href.replace("https://", "")}</Ext>
            </p>
          ))}
          <p className="tm-dim">status: open to new grad roles</p>
        </div>
      );
    case "neofetch":
      return <Neofetch />;
    case "history":
      return (
        <div>
          {ctx.past.map((h, i) => (
            <p key={i}>
              <span className="tm-dim">{String(i + 1).padStart(4, " ")}</span>  {h}
            </p>
          ))}
        </div>
      );
    case "sudo":
      return arg.startsWith("hire") ? (
        <p>
          [sudo] password for recruiter: ******** <br />
          <b>Access granted.</b> Opening a line to <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
      ) : (
        <p className="tm-err">recruiter is not in the sudoers file. Try: sudo hire-me</p>
      );
    case "exit":
      return <p className="tm-dim">There is no exit. Only more projects. Try: projects</p>;
    default:
      return <p className="tm-err">zsh: command not found: {cmd}. Type help.</p>;
  }
}

export default function Terminal() {
  const [lines, setLines] = useState(() => [
    { id: 0, cmd: null, out: <p className="tm-dim">Last login: from Madison, WI on ttys001</p> },
    { id: 1, cmd: "neofetch", out: <Neofetch /> },
    { id: 2, cmd: null, out: <p>Welcome. Type <b>help</b> to see what you can do, or tap a command below.</p> },
  ]);
  const [value, setValue] = useState("");
  const [past, setPast] = useState(["neofetch"]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    body.current.scrollTop = body.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) input.current.focus({ preventScroll: true });
  }, []);

  const exec = (raw) => {
    const cmd = raw.trim();
    if (cmd === "clear") {
      setLines([]);
    } else {
      const out = run(cmd, { past: [...past, cmd] });
      setLines((ls) => [...ls, { id: Date.now() + Math.random(), cmd: raw, out }]);
    }
    if (cmd) setPast((p) => [...p, cmd]);
    setValue("");
    setCursor(-1);
  };

  const onKey = (e) => {
    if (e.key === "Enter") {
      exec(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = cursor === -1 ? past.length - 1 : Math.max(0, cursor - 1);
      if (past[next] !== undefined) {
        setCursor(next);
        setValue(past[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      setCursor(next >= past.length ? -1 : next);
      setValue(next >= past.length ? "" : past[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const [c, a = ""] = value.split(/\s+/);
      if (value.includes(" ") && c === "open") {
        const hit = projects.find((p) => p.slug.startsWith(a.toLowerCase()));
        if (hit) setValue(`open ${hit.slug}`);
      } else {
        const hit = commands.find((x) => x.startsWith(c));
        if (hit) setValue(hit + (hit === "open" ? " " : ""));
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div className="tm">
      <div className="tm-crt" aria-hidden="true" />
      <div className="tm-window">
        <div className="tm-titlebar">
          <span className="tm-dots" aria-hidden="true">
            <i /><i /><i />
          </span>
          <span>adi@madison: ~ — zsh — 120×40</span>
        </div>
        <div className="tm-body" ref={body} onClick={() => window.getSelection()?.isCollapsed && input.current.focus({ preventScroll: true })}>
          {lines.map((l) => (
            <div key={l.id} className="tm-entry">
              {l.cmd !== null && (
                <p className="tm-cmd">
                  <span className="tm-prompt">{PROMPT}</span> {l.cmd}
                </p>
              )}
              {l.out}
            </div>
          ))}
          <label className="tm-input-row">
            <span className="tm-prompt">{PROMPT}</span>
            <span className="tm-input-wrap">
              <input
                ref={input}
                id="tm-input"
                className="tm-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKey}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                aria-label="Terminal command"
                style={{ width: `${Math.max(1, value.length + 1)}ch` }}
              />
              <span className="tm-caret" aria-hidden="true" />
            </span>
          </label>
        </div>
      </div>
      <div className="tm-chips" role="group" aria-label="Quick commands">
        {chips.map((c) => (
          <button key={c} type="button" onClick={() => exec(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
