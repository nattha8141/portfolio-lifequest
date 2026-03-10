// ─── Skills Panel ───────────────────────────────────────────
// Mind Map + Audit Universe cards linked by domain selection.

"use client";

import { useState } from "react";
import {
  DOMAINS,
  AUDIT_UNIVERSE,
  CHARACTER,
} from "../config/portfolio.config";
import { useTheme } from "../context/ThemeContext";
import { SectionHeader, Tag } from "./PanelHelpers";

const TIER_COLOR: Record<string, string> = {
  CORE: "#c8900a",
  EXTENDED: "#a07020",
  SPECIALIST: "#706040",
};
const COV: Record<string, number> = {
  CORE: 100,
  EXTENDED: 72,
  SPECIALIST: 48,
};

// Map domain IDs to audit universe IDs
const DOMAIN_TO_AUDIT: Record<string, string> = {
  engineering: "it",
  finance: "fin",
  compliance: "comp",
  ops: "ops",
  tech: "data",
  advisory: "adv",
};

function toRad(d: number) {
  return (d * Math.PI) / 180;
}

// ── Mind Map ──
function MindMap({
  activeDomain,
  setActiveDomain,
}: {
  activeDomain: string | null;
  setActiveDomain: (id: string | null) => void;
}) {
  const { theme } = useTheme();
  const CX = 260,
    CY = 260,
    ORBIT = 135,
    CHILD = 100;

  function nodePos(a: number) {
    return {
      x: CX + ORBIT * Math.cos(toRad(a)),
      y: CY + ORBIT * Math.sin(toRad(a)),
    };
  }

  function childPos(pa: number, i: number, n: number) {
    const spread = Math.min(32, 140 / n);
    const start = pa - ((n - 1) * spread) / 2;
    const a = start + i * spread;
    const p = nodePos(pa);
    return {
      x: p.x + CHILD * Math.cos(toRad(a)),
      y: p.y + CHILD * Math.sin(toRad(a)),
    };
  }

  const active = DOMAINS.find((d) => d.id === activeDomain);

  return (
    <div>
      <div
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: "8px",
          color: `rgba(${theme.accentRgb}, 0.8)`,
          letterSpacing: "3px",
          marginBottom: "10px",
        }}
      >
        [ SELECT A DOMAIN NODE ]
      </div>
      <svg width="100%" viewBox="0 0 520 540" style={{ maxHeight: "480px" }}>
        <defs>
          <radialGradient id="cg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.accent} stopOpacity={0.12} />
            <stop offset="100%" stopColor={theme.accent} stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Orbit rings */}
        {[65, 125, 190].map((r) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke={`rgba(${theme.accentRgb}, 0.06)`}
            strokeWidth="1"
          />
        ))}
        <circle cx={CX} cy={CY} r={68} fill="url(#cg2)" />

        {/* Spokes */}
        {DOMAINS.map((d) => {
          const p = nodePos(d.angle);
          return (
            <line
              key={d.id + "-s"}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              stroke={
                activeDomain === d.id
                  ? `rgba(${theme.accentRgb}, 0.5)`
                  : `rgba(${theme.accentRgb}, 0.12)`
              }
              strokeWidth={activeDomain === d.id ? 1.5 : 1}
              strokeDasharray="3 4"
              style={{ transition: "all 0.3s" }}
            />
          );
        })}

        {/* Child nodes */}
        {active &&
          active.children.map((child, i) => {
            const cp = childPos(active.angle, i, active.children.length);
            const pp = nodePos(active.angle);
            return (
              <g
                key={child}
                style={{
                  animation: "mmFadeIn 0.22s ease forwards",
                  opacity: 0,
                  animationDelay: `${i * 0.04}s`,
                }}
              >
                <line
                  x1={pp.x}
                  y1={pp.y}
                  x2={cp.x}
                  y2={cp.y}
                  stroke={`rgba(${theme.accentRgb}, 0.35)`}
                  strokeWidth="1"
                />
                <rect
                  x={cp.x - 38}
                  y={cp.y - 11}
                  width="76"
                  height="22"
                  rx="2"
                  fill={theme.background.secondary}
                  stroke={`rgba(${theme.accentRgb}, 0.4)`}
                  strokeWidth="0.8"
                />
                <text
                  x={cp.x}
                  y={cp.y + 4}
                  textAnchor="middle"
                  fill={theme.text.secondary}
                  fontSize="7.5"
                  fontFamily="Rajdhani, sans-serif"
                  fontWeight="600"
                  letterSpacing="0.5"
                >
                  {child.toUpperCase()}
                </text>
              </g>
            );
          })}

        {/* Domain nodes */}
        {DOMAINS.map((d) => {
          const p = nodePos(d.angle);
          const isA = activeDomain === d.id;
          return (
            <g
              key={d.id}
              onClick={() => setActiveDomain(isA ? null : d.id)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isA ? 30 : 26}
                fill={
                  isA
                    ? `rgba(${theme.accentRgb}, 0.12)`
                    : theme.background.secondary
                }
                stroke={
                  isA ? theme.accent : `rgba(${theme.accentRgb}, 0.35)`
                }
                strokeWidth={isA ? 1.5 : 1}
                style={{ transition: "all 0.3s" }}
              />
              <text
                x={p.x}
                y={p.y - 4}
                textAnchor="middle"
                fill={
                  isA ? theme.accent : `rgba(${theme.accentRgb}, 0.7)`
                }
                fontSize="12"
              >
                {d.icon}
              </text>
              <text
                x={p.x}
                y={p.y + 10}
                textAnchor="middle"
                fill={isA ? theme.text.primary : theme.text.muted}
                fontSize="6"
                fontFamily="Orbitron, sans-serif"
                fontWeight="700"
                letterSpacing="0.8"
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* Center node */}
        <circle
          cx={CX}
          cy={CY}
          r={38}
          fill={theme.background.secondary}
          stroke={theme.accent}
          strokeWidth="1.5"
        />
        <circle
          cx={CX}
          cy={CY}
          r={32}
          fill="none"
          stroke={`rgba(${theme.accentRgb}, 0.2)`}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x={CX}
          y={CY - 6}
          textAnchor="middle"
          fill={theme.accent}
          fontSize="7.5"
          fontFamily="Orbitron, sans-serif"
          fontWeight="700"
          letterSpacing="1.5"
        >
          {CHARACTER.name.split(" ")[0].toUpperCase()}
        </text>
        <text
          x={CX}
          y={CY + 5}
          textAnchor="middle"
          fill={theme.text.secondary}
          fontSize="6"
          fontFamily="Orbitron, sans-serif"
          letterSpacing="0.8"
        >
          {CHARACTER.title.split(" ").slice(0, 2).join(" ").toUpperCase()}
        </text>
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          fill={theme.text.secondary}
          fontSize="6"
          fontFamily="Orbitron, sans-serif"
          letterSpacing="0.8"
        >
          {CHARACTER.title.split(" ").slice(2).join(" ").toUpperCase()}
        </text>
      </svg>

      {active && (
        <div
          style={{
            marginTop: "8px",
            padding: "10px 14px",
            border: `1px solid rgba(${theme.accentRgb}, 0.4)`,
            background: `rgba(${theme.accentRgb}, 0.06)`,
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "8px",
              color: theme.accent,
              letterSpacing: "3px",
              marginBottom: "5px",
            }}
          >
            {active.label}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: theme.text.secondary,
              letterSpacing: "0.5px",
            }}
          >
            {active.children.join("  ·  ")}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SkillsPanel() {
  const { theme } = useTheme();
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  // Determine which audit universe card to highlight based on selected domain
  const activeAuditId = activeDomain ? DOMAIN_TO_AUDIT[activeDomain] : null;

  return (
    <div>
      <SectionHeader label="KNOWLEDGE DOMAIN MAPPING" />
      <MindMap
        activeDomain={activeDomain}
        setActiveDomain={setActiveDomain}
      />

      <div style={{ marginTop: "24px" }}>
        <SectionHeader label="AUDIT UNIVERSE" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          {AUDIT_UNIVERSE.map((u, idx) => {
            const isA = activeAuditId === u.id;
            return (
              <div
                key={u.id}
                style={{
                  padding: "14px",
                  border: `1px solid ${isA ? theme.accent : `rgba(${theme.accentRgb}, 0.25)`}`,
                  background: isA
                    ? `rgba(${theme.accentRgb}, 0.07)`
                    : theme.background.secondary,
                  borderRadius: "4px",
                  transition: "all 0.25s",
                  animation: `panelIn 0.3s ease ${idx * 0.06}s both`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "7px",
                        color: theme.text.muted,
                        letterSpacing: "2px",
                        marginBottom: "3px",
                      }}
                    >
                      {u.code}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "10px",
                        color: theme.text.primary,
                        letterSpacing: "1.5px",
                        fontWeight: 700,
                      }}
                    >
                      {u.domain}
                    </div>
                  </div>
                  <span
                    style={{
                      color: theme.accent,
                      opacity: 0.6,
                      fontSize: "16px",
                    }}
                  >
                    {u.icon}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: "7.5px",
                    fontFamily: "'Orbitron', sans-serif",
                    letterSpacing: "1.5px",
                    color: TIER_COLOR[u.tier],
                    border: `1px solid ${TIER_COLOR[u.tier]}60`,
                    borderRadius: "2px",
                    padding: "2px 6px",
                  }}
                >
                  {u.tier}
                </span>
                <div
                  style={{
                    height: "1.5px",
                    background: `rgba(${theme.accentRgb}, 0.1)`,
                    borderRadius: "1px",
                    margin: "8px 0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${COV[u.tier]}%`,
                      background: TIER_COLOR[u.tier],
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {u.skills.slice(0, isA ? 6 : 2).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                  {!isA && u.skills.length > 2 && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: `rgba(${theme.accentRgb}, 0.8)`,
                        padding: "3px 4px",
                      }}
                    >
                      +{u.skills.length - 2}
                    </span>
                  )}
                </div>
                {isA && (
                  <p
                    style={{
                      fontSize: "11px",
                      color: theme.text.secondary,
                      lineHeight: 1.6,
                      marginTop: "8px",
                      paddingTop: "8px",
                      borderTop: `1px solid rgba(${theme.accentRgb}, 0.25)`,
                    }}
                  >
                    {u.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
