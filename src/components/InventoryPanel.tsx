// ─── Inventory Panel ────────────────────────────────────────
// Tech stack displayed as a grid with star ratings.

"use client";

import { INVENTORY } from "../config/portfolio.config";
import { useTheme } from "../context/ThemeContext";
import { SectionHeader, Stars } from "./PanelHelpers";
import { FaPython, FaAws, FaDatabase, FaGitAlt, FaShieldAlt, FaRobot, FaChartBar } from "react-icons/fa";
import { SiKnime } from "react-icons/si";

function IconForItem({ icon, color }: { icon: string; color: string }) {
  const map: Record<string, React.ReactNode> = {
    python: <FaPython size={32} color={color} />,
    knime: <SiKnime size={32} color={color} />,
    powerbi: <FaChartBar size={32} color={color} />,
    aws: <FaAws size={32} color={color} />,
    genai: <FaRobot size={32} color={color} />,
    sql: <FaDatabase size={32} color={color} />,
    ceh: <FaShieldAlt size={32} color={color} />,
    git: <FaGitAlt size={32} color={color} />,
  };
  return <>{map[icon] || <span>{icon}</span>}</>;
}

export default function InventoryPanel() {
  const { theme } = useTheme();
  return (
    <div>
      <SectionHeader label="INVENTORY — TOOLS & TECH" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          border: `1px solid rgba(${theme.accentRgb}, 0.15)`,
          borderRadius: "4px",
          overflow: "hidden",
          background: `rgba(${theme.accentRgb}, 0.15)`,
        }}
      >
        {INVENTORY.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "22px 12px",
              background: theme.background.secondary,
              gap: "10px",
              transition: "background 0.2s",
              cursor: "default",
              animation: `panelIn 0.3s ease ${i * 0.06}s both`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `rgba(${theme.accentRgb}, 0.08)`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = theme.background.secondary)
            }
          >
            <div style={{ fontSize: "36px", lineHeight: 1 }}>
              <IconForItem icon={item.icon} color={theme.accent} />
            </div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "9px",
                color: theme.text.primary,
                letterSpacing: "1.5px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {item.name}
            </div>
            <Stars filled={item.filled} total={item.stars} size={13} />
          </div>
        ))}
      </div>
    </div>
  );
}
