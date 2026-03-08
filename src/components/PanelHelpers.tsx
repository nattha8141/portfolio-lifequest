// ─── Shared Panel Helpers ──────────────────────────────────
// SectionHeader, Tag, Stars — used across multiple panels.

import { THEME } from "../config/portfolio.config";

export function SectionHeader({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "18px",
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          background: THEME.accent,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "11px",
          color: THEME.text.primary,
          letterSpacing: "4px",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: "1px",
          background: `linear-gradient(90deg, rgba(${THEME.accentRgb}, 0.4), transparent)`,
        }}
      />
    </div>
  );
}

export function Tag({
  children,
  amber,
}: {
  children: React.ReactNode;
  amber?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        border: `1px solid ${amber ? `rgba(${THEME.accentRgb}, 0.4)` : `rgba(${THEME.accentRgb}, 0.2)`}`,
        borderRadius: "2px",
        fontSize: "11px",
        color: amber ? THEME.accent : THEME.text.secondary,
        background: amber
          ? `rgba(${THEME.accentRgb}, 0.08)`
          : `rgba(${THEME.accentRgb}, 0.04)`,
        letterSpacing: "0.5px",
        margin: "3px 3px 3px 0",
        fontFamily: "'Rajdhani', sans-serif",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

export function Stars({
  filled,
  total = 5,
  size = 14,
}: {
  filled: number;
  total?: number;
  size?: number;
}) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {Array.from({ length: total }, (_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={
              i < filled
                ? THEME.accent
                : `rgba(${THEME.accentRgb}, 0.2)`
            }
            stroke={
              i < filled
                ? THEME.accent
                : `rgba(${THEME.accentRgb}, 0.15)`
            }
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}
