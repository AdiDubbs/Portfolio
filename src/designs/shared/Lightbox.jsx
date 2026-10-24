import { useEffect, useState } from "react";
import { captureKeys } from "../data";
import "./lightbox.css";

// Full-screen screenshot viewer. Each design themes it through --lb-* custom properties on its root.
export default function Lightbox({ project, start = 0, onClose }) {
  const [i, setI] = useState(start);
  const n = project.images.length;

  useEffect(() => {
    captureKeys(true);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % n);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      captureKeys(false);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [n, onClose]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${project.title} screenshots`} onClick={onClose}>
      <figure className="lb-figure" onClick={(e) => e.stopPropagation()}>
        <img src={project.images[i]} alt={`${project.title}: ${project.imageLabels[i]}`} />
        <figcaption>
          <span className="lb-title">{project.title}</span>
          <span className="lb-label">
            {project.imageLabels[i]} · {i + 1}/{n}
          </span>
        </figcaption>
        <div className="lb-thumbs">
          {project.images.map((src, j) => (
            <button key={src} type="button" className={i === j ? "is-on" : ""} onClick={() => setI(j)} aria-label={`Show ${project.imageLabels[j]}`}>
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      </figure>
      <button type="button" className="lb-nav lb-prev" onClick={(e) => (e.stopPropagation(), setI((v) => (v - 1 + n) % n))} aria-label="Previous screenshot">
        ←
      </button>
      <button type="button" className="lb-nav lb-next" onClick={(e) => (e.stopPropagation(), setI((v) => (v + 1) % n))} aria-label="Next screenshot">
        →
      </button>
      <button type="button" className="lb-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>
  );
}

// Hook for a design: const [lb, openLb] = useLightbox(); ... openLb(project, index); ... {lb}
export function useLightbox() {
  const [state, setState] = useState(null);
  const node = state ? <Lightbox project={state.project} start={state.start} onClose={() => setState(null)} /> : null;
  return [node, (project, start = 0) => setState({ project, start })];
}
