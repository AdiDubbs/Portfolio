import { useEffect, useState } from "react";

const N = 9;
const MINES = 10;

function build(safe) {
  const cells = Array.from({ length: N * N }, () => ({ mine: false, open: false, flag: false, n: 0 }));
  let placed = 0;
  while (placed < MINES) {
    const i = Math.floor(Math.random() * N * N);
    if (cells[i].mine || i === safe) continue;
    cells[i].mine = true;
    placed++;
  }
  cells.forEach((c, i) => {
    c.n = neighbours(i).filter((j) => cells[j].mine).length;
  });
  return cells;
}

function neighbours(i) {
  const x = i % N;
  const y = Math.floor(i / N);
  const out = [];
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < N && ny < N) out.push(ny * N + nx);
    }
  return out;
}

export default function Minesweeper() {
  const [cells, setCells] = useState(null);
  const [state, setState] = useState("ready");
  const [flagMode, setFlagMode] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (state !== "playing") return;
    const t = setInterval(() => setTime((s) => Math.min(999, s + 1)), 1000);
    return () => clearInterval(t);
  }, [state]);

  const reset = () => {
    setCells(null);
    setState("ready");
    setTime(0);
  };

  const reveal = (i) => {
    if (state === "won" || state === "lost") return;
    const grid = cells ? cells.map((c) => ({ ...c })) : build(i);
    if (grid[i].flag || grid[i].open) return;
    if (grid[i].mine) {
      grid.forEach((c) => c.mine && (c.open = true));
      grid[i].boom = true;
      setCells(grid);
      return setState("lost");
    }
    const stack = [i];
    while (stack.length) {
      const k = stack.pop();
      if (grid[k].open || grid[k].flag) continue;
      grid[k].open = true;
      if (grid[k].n === 0) stack.push(...neighbours(k));
    }
    setCells(grid);
    const left = grid.filter((c) => !c.open && !c.mine).length;
    setState(left === 0 ? "won" : "playing");
  };

  const flag = (i) => {
    if (!cells || state !== "playing" || cells[i].open) return;
    const grid = cells.map((c) => ({ ...c }));
    grid[i].flag = !grid[i].flag;
    setCells(grid);
  };

  const flags = cells ? cells.filter((c) => c.flag).length : 0;
  const face = state === "lost" ? "x_x" : state === "won" ? "B-)" : ":-)";
  const view = cells || Array.from({ length: N * N }, () => ({ open: false }));

  return (
    <div className="ms">
      <div className="ms-bar w98-sunken">
        <span className="ms-led">{String(MINES - flags).padStart(3, "0")}</span>
        <button type="button" className="ms-face w98-raised" onClick={reset} aria-label="New game">
          {face}
        </button>
        <span className="ms-led">{String(time).padStart(3, "0")}</span>
      </div>
      <div className="ms-grid w98-sunken" role="grid" aria-label="Minefield">
        {view.map((c, i) => (
          <button
            key={i}
            type="button"
            className={`ms-cell${c.open ? " is-open" : " w98-raised"}${c.boom ? " is-boom" : ""} ms-n${c.open && !c.mine ? c.n : ""}`}
            onClick={() => (flagMode ? flag(i) : reveal(i))}
            onContextMenu={(e) => {
              e.preventDefault();
              flag(i);
            }}
            aria-label={c.open ? (c.mine ? "mine" : `${c.n} adjacent mines`) : c.flag ? "flagged" : "hidden"}
          >
            {c.open ? (c.mine ? "✱" : c.n || "") : c.flag ? "⚑" : ""}
          </button>
        ))}
      </div>
      <div className="ms-foot">
        <label>
          <input type="checkbox" checked={flagMode} onChange={(e) => setFlagMode(e.target.checked)} /> Flag mode (or right-click)
        </label>
        <span>{state === "won" ? "You win!" : state === "lost" ? "Boom. Try again." : `${MINES} mines`}</span>
      </div>
    </div>
  );
}
