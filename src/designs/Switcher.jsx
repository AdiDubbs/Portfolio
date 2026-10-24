import { useEffect } from "react";

export default function Switcher({ designs, index }) {
  const prev = designs[(index - 1 + designs.length) % designs.length];
  const next = designs[(index + 1) % designs.length];
  const current = designs[index];

  useEffect(() => {
    const onKey = (e) => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "ArrowRight") window.location.hash = next.id;
      if (e.key === "ArrowLeft") window.location.hash = prev.id;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  return (
    <nav className="switcher" aria-label="Switch design">
      <a className="switcher-btn" href={`#${prev.id}`} aria-label={`Previous: ${prev.name}`}>
        ←
      </a>
      <a className="switcher-home" href="#all" title="All designs">
        <span className="switcher-count">
          {index + 1}/{designs.length}
        </span>
        <span className="switcher-name">{current.name}</span>
        <span className="switcher-mood">{current.mood}</span>
      </a>
      <a className="switcher-btn" href={`#${next.id}`} aria-label={`Next: ${next.name}`}>
        →
      </a>
    </nav>
  );
}
