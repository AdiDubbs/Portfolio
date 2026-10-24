import { useEffect, useRef, useState } from "react";
import { captureKeys } from "../data";

const W = 10;
const H = 20;
const CELL = 28;
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
const LINE_SCORE = [0, 100, 300, 500, 800];
const rotate = (m) => m[0].map((_, i) => m.map((row) => row[i]).reverse());

function readBest() {
  try {
    return Number(localStorage.getItem("square-saga-best")) || 0;
  } catch {
    return 0;
  }
}

function newPiece() {
  const k = Math.floor(Math.random() * SHAPES.length);
  return { shape: SHAPES[k], color: COLORS[k], x: Math.floor((W - SHAPES[k][0].length) / 2), y: -1 };
}

// A small but complete falling-block game: move, rotate with wall kicks, soft and hard drop, levels
export default function Game({ onExit }) {
  const canvas = useRef(null);
  const nextCanvas = useRef(null);
  const g = useRef(null);
  const [hud, setHud] = useState({ score: 0, lines: 0, level: 1, over: false, paused: false, best: readBest() });

  const sync = () => {
    const s = g.current;
    setHud({ score: s.score, lines: s.lines, level: s.level, over: s.over, paused: s.paused, best: s.best });
  };

  const fresh = () => ({
    grid: Array.from({ length: H }, () => Array(W).fill(null)),
    piece: newPiece(),
    next: newPiece(),
    score: 0,
    lines: 0,
    level: 1,
    over: false,
    paused: false,
    best: readBest(),
    last: 0,
  });
  if (!g.current) g.current = fresh();
  const reset = () => {
    g.current = fresh();
    sync();
  };

  const fits = (shape, x, y) =>
    shape.every((row, r) =>
      row.every((v, c) => !v || (x + c >= 0 && x + c < W && y + r < H && (y + r < 0 || !g.current.grid[y + r][x + c])))
    );

  const lock = () => {
    const s = g.current;
    s.piece.shape.forEach((row, r) =>
      row.forEach((v, c) => {
        if (v && s.piece.y + r >= 0) s.grid[s.piece.y + r][s.piece.x + c] = s.piece.color;
      })
    );
    if (s.piece.y < 0) {
      s.over = true;
      if (s.score > s.best) {
        s.best = s.score;
        try {
          localStorage.setItem("square-saga-best", String(s.score));
        } catch {
          /* storage unavailable */
        }
      }
      return sync();
    }
    const full = s.grid.map((row, r) => (row.every(Boolean) ? r : -1)).filter((r) => r >= 0);
    full.forEach((r) => {
      s.grid.splice(r, 1);
      s.grid.unshift(Array(W).fill(null));
    });
    s.lines += full.length;
    s.score += LINE_SCORE[full.length] * s.level;
    s.level = 1 + Math.floor(s.lines / 8);
    s.piece = s.next;
    s.next = newPiece();
    sync();
  };

  const act = (a) => {
    const s = g.current;
    if (s.over) return;
    if (a === "pause") {
      s.paused = !s.paused;
      return sync();
    }
    if (s.paused) return;
    const p = s.piece;
    if (a === "left" && fits(p.shape, p.x - 1, p.y)) p.x--;
    if (a === "right" && fits(p.shape, p.x + 1, p.y)) p.x++;
    if (a === "down") {
      if (fits(p.shape, p.x, p.y + 1)) {
        p.y++;
        s.score += 1;
        sync();
      } else lock();
    }
    if (a === "rotate") {
      const r = rotate(p.shape);
      for (const kick of [0, -1, 1, -2, 2]) {
        if (fits(r, p.x + kick, p.y)) {
          p.shape = r;
          p.x += kick;
          break;
        }
      }
    }
    if (a === "drop") {
      let d = 0;
      while (fits(p.shape, p.x, p.y + 1)) {
        p.y++;
        d++;
      }
      s.score += d * 2;
      lock();
    }
  };

  useEffect(() => {
    captureKeys(true);
    const keys = { ArrowLeft: "left", ArrowRight: "right", ArrowDown: "down", ArrowUp: "rotate", x: "rotate", " ": "drop", p: "pause" };
    const onKey = (e) => {
      if (e.key === "Escape") return onExit();
      if (e.key === "Enter" && g.current.over) return reset();
      const a = keys[e.key];
      if (!a) return;
      e.preventDefault();
      act(a);
    };
    window.addEventListener("keydown", onKey);

    const ctx = canvas.current.getContext("2d");
    const nctx = nextCanvas.current.getContext("2d");
    const cell = (c, x, y, color, size = CELL) => {
      c.fillStyle = color;
      c.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      c.fillStyle = "rgba(255,255,255,0.35)";
      c.fillRect(x * size + 1, y * size + 1, size - 2, 4);
      c.fillStyle = "rgba(0,0,0,0.3)";
      c.fillRect(x * size + 1, y * size + size - 5, size - 2, 4);
    };
    let raf;
    const frame = (t) => {
      const s = g.current;
      const speed = Math.max(90, 650 - (s.level - 1) * 60);
      if (!s.over && !s.paused && t - s.last > speed) {
        s.last = t;
        if (fits(s.piece.shape, s.piece.x, s.piece.y + 1)) s.piece.y++;
        else lock();
      }
      ctx.fillStyle = "#07020f";
      ctx.fillRect(0, 0, W * CELL, H * CELL);
      ctx.strokeStyle = "rgba(180,92,255,0.08)";
      for (let x = 1; x < W; x++) {
        ctx.beginPath();
        ctx.moveTo(x * CELL, 0);
        ctx.lineTo(x * CELL, H * CELL);
        ctx.stroke();
      }
      s.grid.forEach((row, r) => row.forEach((c, x) => c && cell(ctx, x, r, c)));
      // Ghost piece shows where a hard drop will land
      let gy = s.piece.y;
      while (fits(s.piece.shape, s.piece.x, gy + 1)) gy++;
      ctx.globalAlpha = 0.22;
      s.piece.shape.forEach((row, r) => row.forEach((v, c) => v && cell(ctx, s.piece.x + c, gy + r, s.piece.color)));
      ctx.globalAlpha = 1;
      s.piece.shape.forEach((row, r) => row.forEach((v, c) => v && cell(ctx, s.piece.x + c, s.piece.y + r, s.piece.color)));
      nctx.fillStyle = "#07020f";
      nctx.fillRect(0, 0, 96, 72);
      const n = s.next.shape;
      const ox = (4 - n[0].length) / 2;
      const oy = (3 - n.length) / 2;
      n.forEach((row, r) => row.forEach((v, c) => v && cell(nctx, c + ox, r + oy, s.next.color, 24)));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      captureKeys(false);
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hold = (a) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      act(a);
    },
  });

  return (
    <div className="arc-game" role="application" aria-label="Square Saga mini game">
      <div className="arc-game-board">
        <canvas ref={canvas} width={W * CELL} height={H * CELL} />
        {(hud.over || hud.paused) && (
          <div className="arc-game-over">
            <p className="arc-pixel">{hud.over ? "Game over" : "Paused"}</p>
            {hud.over && (
              <button type="button" className="arc-btn arc-btn-sm" onClick={reset}>
                ▶ Play again
              </button>
            )}
          </div>
        )}
      </div>
      <aside className="arc-game-side">
        <div>
          <p className="arc-pixel arc-small">Next</p>
          <canvas ref={nextCanvas} width={96} height={72} />
        </div>
        <dl className="arc-game-stats">
          <div><dt className="arc-pixel arc-small">Score</dt><dd>{hud.score}</dd></div>
          <div><dt className="arc-pixel arc-small">Lines</dt><dd>{hud.lines}</dd></div>
          <div><dt className="arc-pixel arc-small">Level</dt><dd>{hud.level}</dd></div>
          <div><dt className="arc-pixel arc-small">Best</dt><dd>{Math.max(hud.best, hud.score)}</dd></div>
        </dl>
        <p className="arc-game-keys">← → move · ↑ rotate · ↓ soft drop · space hard drop · P pause · Esc quit</p>
        <div className="arc-pad" aria-label="Touch controls">
          <button type="button" {...hold("left")} aria-label="Move left">◀</button>
          <button type="button" {...hold("rotate")} aria-label="Rotate">⟳</button>
          <button type="button" {...hold("right")} aria-label="Move right">▶</button>
          <button type="button" {...hold("down")} aria-label="Soft drop">▼</button>
          <button type="button" {...hold("drop")} aria-label="Hard drop">⤓</button>
          <button type="button" onClick={onExit} aria-label="Quit game">✕</button>
        </div>
      </aside>
    </div>
  );
}
