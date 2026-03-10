// ─── Profile Panel ──────────────────────────────────────────
// About bio, traits, experience timeline, education timeline.

"use client";

import { PROFILE } from "../config/portfolio.config";
import { useTheme } from "../context/ThemeContext";
import { SectionHeader, Tag } from "./PanelHelpers";

export default function ProfilePanel() {
  const { theme } = useTheme();
  return (
    <div>
      <SectionHeader label="ABOUT" />
      <p
        style={{
          fontSize: "14px",
          color: theme.text.secondary,
          lineHeight: 1.75,
          marginBottom: "18px",
        }}
      >
        {PROFILE.bio}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", marginBottom: "28px" }}>
        {PROFILE.traits.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <SectionHeader label="EXPERIENCE" />
      <div
        style={{
          position: "relative",
          paddingLeft: "22px",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: "1px",
            background: `linear-gradient(180deg, ${theme.accent}, rgba(${theme.accentRgb}, 0.15))`,
          }}
        />
        {PROFILE.experience.map((e, i) => (
          <div
            key={i}
            style={{ marginBottom: "20px", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                left: "-26px",
                top: "6px",
                width: 8,
                height: 8,
                background: theme.accent,
                borderRadius: "50%",
                border: `2px solid ${theme.panel}`,
              }}
            />
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "7px",
                color: `rgba(${theme.accentRgb}, 0.8)`,
                letterSpacing: "2px",
                marginBottom: "3px",
              }}
            >
              {e.period}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "14px",
                color: theme.text.primary,
                fontWeight: 700,
                marginBottom: "2px",
                letterSpacing: "0.3px",
              }}
            >
              {e.role}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: theme.accent,
                marginBottom: "8px",
                letterSpacing: "0.5px",
                fontWeight: 600,
              }}
            >
              {e.org}
            </div>
            <p
              style={{
                fontSize: "13px",
                color: theme.text.secondary,
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {e.desc}
            </p>
          </div>
        ))}
      </div>

      <SectionHeader label="EDUCATION" />
      <div style={{ position: "relative", paddingLeft: "22px" }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 8,
            bottom: 8,
            width: "1px",
            background: `linear-gradient(180deg, ${theme.accent}, rgba(${theme.accentRgb}, 0.15))`,
          }}
        />
        {PROFILE.education.map((e, i) => (
          <div
            key={i}
            style={{ marginBottom: "18px", position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                left: "-26px",
                top: "6px",
                width: 8,
                height: 8,
                background: theme.accent,
                borderRadius: "50%",
                border: `2px solid ${theme.panel}`,
              }}
            />
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "7px",
                color: `rgba(${theme.accentRgb}, 0.8)`,
                letterSpacing: "2px",
                marginBottom: "3px",
              }}
            >
              {e.period}
            </div>
            <div
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "14px",
                color: theme.text.primary,
                fontWeight: 700,
                marginBottom: "2px",
              }}
            >
              {e.degree}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: theme.accent,
                fontWeight: 600,
              }}
            >
              {e.school}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
