// ─── Inventory Panel ────────────────────────────────────────
// Tech stack displayed as a grid with star ratings.

import { INVENTORY, THEME } from "../config/portfolio.config";
import { SectionHeader, Stars } from "./PanelHelpers";

export default function InventoryPanel() {
  return (
    <div>
      <SectionHeader label="INVENTORY — TOOLS & TECH" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          border: `1px solid rgba(${THEME.accentRgb}, 0.15)`,
          borderRadius: "4px",
          overflow: "hidden",
          background: `rgba(${THEME.accentRgb}, 0.15)`,
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
              background: THEME.background.secondary,
              gap: "10px",
              transition: "background 0.2s",
              cursor: "default",
              animation: `panelIn 0.3s ease ${i * 0.06}s both`,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = `rgba(${THEME.accentRgb}, 0.08)`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = THEME.background.secondary)
            }
          >
            <div style={{ fontSize: "36px", lineHeight: 1 }}>{item.icon}</div>
            <div
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "9px",
                color: THEME.text.primary,
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
