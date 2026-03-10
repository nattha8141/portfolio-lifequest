// ─── Game Portfolio — Main Page Component ───────────────────
// 2-column layout: Avatar | HexNav + Content Panel

"use client";

import { useState, useEffect } from "react";
import { SOCIALS, TABS } from "../config/portfolio.config";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiSun, FiMoon } from "react-icons/fi";

import Particles from "../components/Particles";
import Avatar from "../components/Avatar";
import ProfilePanel from "../components/ProfilePanel";
import SkillsPanel from "../components/SkillsPanel";
import QuestsPanel from "../components/QuestsPanel";
import InventoryPanel from "../components/InventoryPanel";

const PANEL_MAP: Record<string, React.FC> = {
  profile: ProfilePanel,
  skills: SkillsPanel,
  quests: QuestsPanel,
  inventory: InventoryPanel,
};

// ── Hex helpers ──
function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = toRad(i * 60 - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// ── HexNav ──
function HexNav({
  active,
  setActive,
}: {
  active: string;
  setActive: (id: string) => void;
}) {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
        padding: "0 8px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: "50%",
          transform: "translateY(-50%)",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${theme.accent} 20%, ${theme.accent} 80%, transparent)`,
          opacity: 0.25,
          zIndex: 0,
        }}
      />
      {TABS.map((tab, idx) => {
        const isA = active === tab.id;
        return (
          <div
            key={tab.id}
            style={{
              position: "relative",
              zIndex: 1,
              marginRight: idx < TABS.length - 1 ? "6px" : 0,
            }}
          >
            <div
              onClick={() => setActive(tab.id)}
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <svg
                width="78"
                height="70"
                viewBox="0 0 78 70"
                style={{
                  filter: isA
                    ? `drop-shadow(0 0 6px ${theme.accent}80)`
                    : "none",
                  transition: "filter 0.3s",
                }}
              >
                <polygon
                  points={hexPoints(39, 35, 32)}
                  fill={
                    isA
                      ? `rgba(${theme.accentRgb}, 0.12)`
                      : `rgba(${theme.accentRgb}, 0.05)`
                  }
                  stroke={
                    isA ? theme.accent : `rgba(${theme.accentRgb}, 0.25)`
                  }
                  strokeWidth={isA ? 1.5 : 1}
                  style={{ transition: "all 0.3s" }}
                />
                {isA && (
                  <polygon
                    points={hexPoints(39, 35, 26)}
                    fill="none"
                    stroke={theme.accent}
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                )}
                <text
                  x="39"
                  y="30"
                  textAnchor="middle"
                  fill={
                    isA ? theme.accent : `rgba(${theme.accentRgb}, 0.6)`
                  }
                  fontSize="13"
                  style={{ transition: "fill 0.3s" }}
                >
                  {tab.icon}
                </text>
                <text
                  x="39"
                  y="48"
                  textAnchor="middle"
                  fill={isA ? theme.text.primary : theme.text.muted}
                  fontSize="6.5"
                  fontFamily="Orbitron, sans-serif"
                  fontWeight="700"
                  letterSpacing="1.2"
                  style={{ transition: "fill 0.3s" }}
                >
                  {tab.label}
                </text>
              </svg>
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "7px",
                  color: isA
                    ? theme.accent
                    : `rgba(${theme.accentRgb}, 0.3)`,
                  letterSpacing: "2px",
                  transition: "color 0.3s",
                }}
              >
                [{tab.code}]
              </div>
            </div>
            {idx < TABS.length - 1 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "4px",
                  padding: "0 4px",
                }}
              >
                {[0, 1, 2].map((d) => (
                  <div
                    key={d}
                    style={{
                      width: 2,
                      height: 2,
                      borderRadius: "50%",
                      background: theme.accent,
                      opacity:
                        isA || active === TABS[idx + 1]?.id ? 0.5 : 0.12,
                      transition: "opacity 0.3s",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Theme Toggle Button ──
function ThemeToggle() {
  const { isDark, toggleTheme, theme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 100,
        width: 38,
        height: 38,
        border: `1px solid rgba(${theme.accentRgb}, 0.3)`,
        borderRadius: "50%",
        background: theme.background.secondary,
        color: theme.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 18,
        transition: "all 0.3s",
        boxShadow: `0 2px 10px rgba(0,0,0,0.2)`,
      }}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}

function GamePortfolioInner() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(TABS[0]?.id || "profile");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const ActivePanel = PANEL_MAP[activeTab] || ProfilePanel;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .grain-overlay {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background:
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 20px,
              rgba(255,255,255,0.012) 20px,
              rgba(255,255,255,0.012) 21px
            );
        }

        .portfolio-root {
          background: ${theme.background.primary};
          min-height: 100vh;
          font-family: 'Rajdhani', sans-serif;
          color: ${theme.text.secondary};
          position: relative;
          transition: background 0.4s, color 0.4s;
        }

        .portfolio-grid {
          max-width: 1440px;
          margin: 0 auto;
          padding: 28px 24px;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 36px;
          min-height: 100vh;
          align-items: start;
        }

        .avatar-col {
          position: sticky;
          top: 24px;
          opacity: 0;
          transform: translateX(-20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .avatar-col.loaded {
          opacity: 1;
          transform: translateX(0);
        }

        .nav-col {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 0;
        }

        .content-col {
          border: 1px solid rgba(${theme.accentRgb}, 0.15);
          border-radius: 6px;
          background: ${theme.panel};
          box-shadow: 0 2px 20px rgba(0,0,0,0.3);
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }
        .content-col.loaded {
          opacity: 1;
          transform: translateX(0);
        }

        .panel-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 18px;
          border-bottom: 1px solid rgba(${theme.accentRgb}, 0.12);
          background: rgba(${theme.accentRgb}, 0.04);
          border-radius: 6px 6px 0 0;
        }

        .panel-topbar-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          color: ${theme.accent};
          letter-spacing: 3px;
          font-weight: 700;
        }

        .panel-topbar-dots {
          display: flex; gap: 6px;
        }

        .panel-topbar-dot {
          font-size: 8px;
        }

        .panel-content {
          padding: 20px 18px;
          max-height: calc(100vh - 90px);
          overflow-y: auto;
          animation: slideIn 0.28s ease;
        }

        .panel-content::-webkit-scrollbar { width: 4px; }
        .panel-content::-webkit-scrollbar-track { background: ${theme.background.secondary}; }
        .panel-content::-webkit-scrollbar-thumb { background: rgba(${theme.accentRgb}, 0.4); border-radius: 2px; }

        .social-row {
          display: flex;
          justify-content: center;
          gap: 12px;
          padding: 10px 14px 14px;
          border-top: 1px solid rgba(${theme.accentRgb}, 0.12);
        }

        .social-btn {
          cursor: pointer;
          width: 32px; height: 32px;
          border: 1px solid rgba(${theme.accentRgb}, 0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme.background.secondary};
          color: ${theme.text.secondary};
          font-size: 15px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .social-btn:hover {
          border-color: ${theme.accent};
          background: rgba(${theme.accentRgb}, 0.1);
          color: ${theme.text.primary};
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mmFadeIn {
          from { opacity: 0; transform: scale(0.88); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @media (max-width: 900px) {
          .portfolio-grid {
            grid-template-columns: 1fr;
            padding: 16px;
          }
          .avatar-col {
            position: static;
          }
          .panel-content {
            max-height: none;
          }
        }
      `}</style>

      <div className="portfolio-root">
        <div className="grain-overlay" />
        <Particles />
        <ThemeToggle />

        <div className="portfolio-grid">
          {/* COL 1: Avatar */}
          <div className={`avatar-col ${loaded ? "loaded" : ""}`}>
            <Avatar />
            <div className="social-row">
              {SOCIALS.github && (
                <a
                  className="social-btn"
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                >
                  <FaGithub />
                </a>
              )}
              {SOCIALS.linkedin && (
                <a
                  className="social-btn"
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              )}
              {SOCIALS.twitter && (
                <a
                  className="social-btn"
                  href={SOCIALS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Twitter/X"
                >
                  <FaXTwitter />
                </a>
              )}
              {SOCIALS.email && (
                <a
                  className="social-btn"
                  href={`mailto:${SOCIALS.email}`}
                  title="Email"
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          </div>

          {/* COL 2: Hex Nav + Content Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="nav-col">
              <HexNav active={activeTab} setActive={setActiveTab} />
            </div>

            <div className={`content-col ${loaded ? "loaded" : ""}`}>
              <div className="panel-topbar">
                <div className="panel-topbar-label">
                  {TABS.find((t) => t.id === activeTab)?.label}
                </div>
                <div className="panel-topbar-dots">
                  {["◈", "◎", "△"].map((s, i) => (
                    <span
                      key={i}
                      className="panel-topbar-dot"
                      style={{
                        color: theme.accent,
                        opacity: 0.2 + i * 0.15,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="panel-content" key={activeTab}>
                <ActivePanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function GamePortfolio() {
  return (
    <ThemeProvider>
      <GamePortfolioInner />
    </ThemeProvider>
  );
}
