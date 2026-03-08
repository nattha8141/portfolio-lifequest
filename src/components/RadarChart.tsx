// ─── Radar Chart SVG Component ──────────────────────────────
// Renders a hexagonal radar chart for the Status tab.
// Used to visualize "Core Attunement" across all skill areas.

import { THEME } from "../config/portfolio.config";

interface StatPoint {
  name: string;
  value: number;
  icon: string;
}

interface RadarChartProps {
  stats: StatPoint[];
  size?: number;
}

export default function RadarChart({ stats, size = 220 }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const n = stats.length;
  const angleStep = (Math.PI * 2) / n;

  const getPoint = (i: number, val: number): [number, number] => {
    const a = angleStep * i - Math.PI / 2;
    const d = (val / 100) * r;
    return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
  };

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid rings */}
      {gridLevels.map((lv, i) => (
        <polygon
          key={i}
          points={Array.from({ length: n }, (_, j) => {
            const a = angleStep * j - Math.PI / 2;
            return `${cx + r * lv * Math.cos(a)},${cy + r * lv * Math.sin(a)}`;
          }).join(" ")}
          fill="none"
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {stats.map((_, i) => {
        const [ex, ey] = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={cx} y1={cy} x2={ex} y2={ey}
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
        );
      })}

      {/* Data polygon */}
      <polygon
        points={stats.map((s, i) => getPoint(i, s.value).join(",")).join(" ")}
        fill={`rgba(${THEME.accentRgb}, 0.2)`}
        stroke={THEME.accent}
        strokeWidth="1.5"
      >
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" fill="freeze" />
      </polygon>

      {/* Data points */}
      {stats.map((s, i) => {
        const [px, py] = getPoint(i, s.value);
        return (
          <circle
            key={i}
            cx={px} cy={py} r="3"
            fill={THEME.accent}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Labels */}
      {stats.map((s, i) => {
        const a = angleStep * i - Math.PI / 2;
        const lx = cx + (r + 22) * Math.cos(a);
        const ly = cy + (r + 22) * Math.sin(a);
        return (
          <text
            key={i}
            x={lx} y={ly}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#1a1a1e"
            fontSize="10"
            fontWeight="600"
            fontFamily="'Rajdhani', sans-serif"
            letterSpacing="1"
          >
            {s.icon} {s.name}
          </text>
        );
      })}
    </svg>
  );
}
