// ─── Quests Panel ───────────────────────────────────────────
// Projects displayed as quest entries with status badges.

"use client";

import { QUESTS } from "../config/portfolio.config";
import { useTheme } from "../context/ThemeContext";
import { SectionHeader, Tag } from "./PanelHelpers";

export default function QuestsPanel() {
  const { theme } = useTheme();
  return (
    <div>
      <SectionHeader label="QUEST LOG" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {QUESTS.map((q, i) => {
          const status = q.type.toUpperCase();
          return (
            <div
              key={i}
              style={{
                padding: "18px 0",
                borderBottom: `1px solid rgba(${theme.accentRgb}, 0.12)`,
                animation: `panelIn 0.3s ease ${i * 0.07}s both`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: "16px",
                    color: theme.text.primary,
                    fontWeight: 700,
                    letterSpacing: "0.3px",
                  }}
                >
                  {q.link ? (
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      {q.name} ↗
                    </a>
                  ) : (
                    q.name
                  )}
                </div>
                <span
                  style={{
                    flexShrink: 0,
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "8px",
                    letterSpacing: "1.5px",
                    color:
                      status === "COMPLETED" ? "#0e0e12" : theme.text.primary,
                    background:
                      status === "COMPLETED"
                        ? theme.accent
                        : status === "IN PROGRESS"
                          ? "#444"
                          : "#555",
                    padding: "4px 10px",
                    borderRadius: "2px",
                    fontWeight: 700,
                  }}
                >
                  {status}
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  color: theme.text.secondary,
                  lineHeight: 1.65,
                  marginBottom: "10px",
                }}
              >
                {q.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {q.tags.map((t) => (
                    <Tag key={t} amber>
                      {t}
                    </Tag>
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "10px",
                    color: theme.accent,
                    letterSpacing: "2px",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {q.reward}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
