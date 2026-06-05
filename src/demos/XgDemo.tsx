import { useState } from "react";

// Replica do modelo do GolData.
// Mesmos coeficientes do snippet em projetos/goldata.py.

const GOAL_X = 105;
const GOAL_Y = 34;
const POST_HALF = 3.66;

function xg(x: number, y: number, header: boolean): number {
  const dx = GOAL_X - x;
  const dy = GOAL_Y - y;
  const dist = Math.hypot(dx, dy);
  const angle =
    (Math.atan2(2 * POST_HALF * dx, dx * dx + dy * dy - POST_HALF * POST_HALF) *
      180) /
    Math.PI;
  const z = 3.1 - 0.14 * dist + 0.012 * angle - 0.45 * (header ? 1 : 0);
  return 1 / (1 + Math.exp(-z));
}

interface Shot {
  x: number;
  y: number;
  prob: number;
  header: boolean;
  id: number;
}

export default function XgDemo() {
  const [header, setHeader] = useState(false);
  const [hover, setHover] = useState<{ x: number; y: number; prob: number } | null>(null);
  const [shots, setShots] = useState<Shot[]>([
    { id: 1, x: 94, y: 34, header: false, prob: xg(94, 34, false) },
    { id: 2, x: 99, y: 28, header: false, prob: xg(99, 28, false) },
  ]);

  const W = 525; // pixels (105m * 5)
  const H = 340; // pixels (68m * 5)

  const toPitch = (px: number, py: number) => ({
    x: (px / W) * 105,
    y: (py / H) * 68,
  });

  const toPx = (x: number, y: number) => ({
    px: (x / 105) * W,
    py: (y / 68) * H,
  });

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // currentTarget = o próprio <svg>; e.target pode ser um filho (circle/text),
    // o que daria um getBoundingClientRect errado e coordenadas tortas.
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { x, y } = toPitch(px, py);
    if (x < 0 || x > 105 || y < 0 || y > 68) {
      setHover(null);
      return;
    }
    setHover({ x, y, prob: xg(x, y, header) });
  };

  const onClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const { x, y } = toPitch(px, py);
    setShots((s) =>
      [...s, { id: Date.now(), x, y, header, prob: xg(x, y, header) }].slice(-12),
    );
  };

  return (
    <div className="space-y-3 text-[12.5px] font-mono text-[#c9c5ba]">
      <div className="flex flex-wrap items-center gap-3 text-[11.5px]">
        <span className="text-[#9ea2ab]">
          modelo: <span className="text-[#e6e3dc]">logistic(3.10 − 0.14·dist + 0.012·ang − 0.45·header)</span>
        </span>
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={header}
            onChange={(e) => setHeader(e.target.checked)}
            className="accent-[#e36b3a]"
          />
          cabeceio
        </label>
        <button
          type="button"
          onClick={() => setShots([])}
          className="text-[#9ea2ab] hover:text-[#e6e3dc] underline-offset-2 hover:underline"
        >
          limpar chutes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative shrink-0">
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="bg-[#0a0b0e] border border-[#272b34] rounded cursor-crosshair"
            onMouseMove={onMove}
            onMouseLeave={() => setHover(null)}
            onClick={onClick}
          >
            <Pitch w={W} h={H} />
            {/* heatmap leve atrás dos chutes */}
            {shots.map((s) => {
              const { px, py } = toPx(s.x, s.y);
              return (
                <g key={s.id}>
                  <circle
                    cx={px}
                    cy={py}
                    r={6 + s.prob * 26}
                    fill="#e36b3a"
                    opacity={0.12}
                  />
                  <circle
                    cx={px}
                    cy={py}
                    r={4}
                    fill="#e36b3a"
                    stroke="#0a0b0e"
                    strokeWidth="1.4"
                  />
                  <text
                    x={px + 8}
                    y={py - 6}
                    fill="#e6e3dc"
                    fontSize="11"
                    fontFamily="JetBrains Mono"
                  >
                    {(s.prob * 100).toFixed(1)}%
                  </text>
                </g>
              );
            })}
            {hover && (
              <g pointerEvents="none">
                <circle
                  cx={toPx(hover.x, hover.y).px}
                  cy={toPx(hover.x, hover.y).py}
                  r="5"
                  fill="none"
                  stroke="#f0a570"
                  strokeWidth="1.4"
                />
              </g>
            )}
          </svg>
          <div className="absolute top-2 left-2 text-[10.5px] text-[#6c7079] font-mono pointer-events-none">
            clique pra registrar um chute
          </div>
        </div>

        <div className="flex-1 min-w-[220px] space-y-3">
          <Card title="cursor">
            {hover ? (
              <div className="space-y-1">
                <Row k="x (m)" v={hover.x.toFixed(1)} />
                <Row k="y (m)" v={hover.y.toFixed(1)} />
                <Row
                  k="prob de gol"
                  v={`${(hover.prob * 100).toFixed(2)}%`}
                  color={probColor(hover.prob)}
                />
              </div>
            ) : (
              <span className="text-[#6c7079]">passe o mouse pelo campo.</span>
            )}
          </Card>

          <Card title={`chutes (${shots.length})`}>
            {shots.length === 0 ? (
              <span className="text-[#6c7079]">nenhum chute registrado.</span>
            ) : (
              <>
                <div className="space-y-0.5 max-h-[120px] overflow-y-auto">
                  {shots.map((s, i) => (
                    <div
                      key={s.id}
                      className="flex justify-between text-[11.5px]"
                    >
                      <span className="text-[#9ea2ab]">
                        #{i + 1}{" "}
                        ({s.x.toFixed(0)}, {s.y.toFixed(0)})
                        {s.header && " ⚽ header"}
                      </span>
                      <span style={{ color: probColor(s.prob) }}>
                        {(s.prob * 100).toFixed(2)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-[#272b34] flex justify-between">
                  <span className="text-[#9ea2ab]">xG acumulado</span>
                  <span className="text-[#f0a570]">
                    {shots.reduce((acc, s) => acc + s.prob, 0).toFixed(2)}
                  </span>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function probColor(p: number): string {
  if (p > 0.6) return "#7cb37b";
  if (p > 0.3) return "#d4a247";
  if (p > 0.1) return "#f0a570";
  return "#cf6464";
}

function Row({ k, v, color }: { k: string; v: string; color?: string }) {
  return (
    <div className="flex justify-between text-[11.5px]">
      <span className="text-[#9ea2ab]">{k}</span>
      <span style={{ color: color ?? "#e6e3dc" }}>{v}</span>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0b0e] border border-[#272b34] rounded p-3">
      <div className="text-[10px] uppercase tracking-[1.2px] text-[#6c7079] mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}

function Pitch({ w, h }: { w: number; h: number }) {
  const stroke = "#3a3e48";
  return (
    <g fill="none" stroke={stroke} strokeWidth="1.1">
      <rect x="0.5" y="0.5" width={w - 1} height={h - 1} />
      <line x1={w / 2} y1="0" x2={w / 2} y2={h} />
      <circle cx={w / 2} cy={h / 2} r="40" />
      {/* área grande direita (gol no x=105) */}
      <rect x={w - 82.5} y={h / 2 - 90} width="82.5" height="180" />
      {/* área pequena direita */}
      <rect x={w - 27.5} y={h / 2 - 45} width="27.5" height="90" />
      {/* gol direito */}
      <rect x={w - 2} y={h / 2 - 18} width="6" height="36" stroke="#e36b3a" strokeWidth="1.4" />
      {/* área grande esquerda */}
      <rect x="0" y={h / 2 - 90} width="82.5" height="180" />
      <rect x="0" y={h / 2 - 45} width="27.5" height="90" />
    </g>
  );
}
