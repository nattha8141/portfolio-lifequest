"use client";

import { CHARACTER } from "../config/portfolio.config";
import { useTheme } from "../context/ThemeContext";

export default function Avatar() {
  const { theme } = useTheme();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap');

        .frame-c {
          width: 100%;
          position: relative;
          animation: frameUp 0.6s ease;
        }

        .frame-c::before,
        .frame-c::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(${theme.accentRgb}, 0.08);
          background: ${theme.background.tertiary};
          z-index: -1;
        }
        .frame-c::before {
          transform: translate(6px, 6px);
        }
        .frame-c::after {
          transform: translate(12px, 12px);
          opacity: 0.5;
        }

        .frame-c-card {
          background: ${theme.panel};
          border: 1px solid rgba(${theme.accentRgb}, 0.15);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
        }

        .frame-c-hatch {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(255,255,255,0.008) 8px,
            rgba(255,255,255,0.008) 9px
          );
          pointer-events: none;
          z-index: 2;
        }

        .frame-c-header {
          padding: 12px 16px;
          display: flex; align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(${theme.accentRgb}, 0.12);
          position: relative; z-index: 3;
        }

        .frame-c-rec {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: ${theme.text.primary};
          display: flex; align-items: center; gap: 8px;
          letter-spacing: 2px;
        }

        .frame-c-rec .dot {
          width: 6px; height: 6px;
          background: ${theme.accent};
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .frame-c-class {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; color: ${theme.text.muted};
          letter-spacing: 1px;
        }

        .frame-c-photo {
          width: 100%; height: 440px;
          overflow: hidden;
          position: relative;
        }

        .frame-c-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.05) brightness(0.95);
        }

        .frame-c-scan {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
          pointer-events: none;
        }

        .frame-c-grad {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            rgba(14,14,18,0.2) 0%,
            transparent 15%,
            transparent 70%,
            rgba(14,14,18,0.5) 100%
          );
          pointer-events: none;
        }

        .frame-c-bracket {
          position: absolute;
          color: ${theme.accent};
          font-family: 'Share Tech Mono', monospace;
          font-size: 16px;
          z-index: 3;
          text-shadow: 0 1px 3px rgba(0,0,0,0.5);
        }
        .frame-c-bracket.tl { top: 12px; left: 14px; }
        .frame-c-bracket.br { bottom: 12px; right: 14px; }

        .frame-c-info {
          padding: 16px 20px 20px;
          position: relative; z-index: 3;
          border-top: 1px solid rgba(${theme.accentRgb}, 0.12);
          text-align: center;
        }

        .frame-c-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 20px; font-weight: 700;
          color: ${theme.text.primary};
          letter-spacing: 0.08em;
          margin-bottom: 2px;
          justify-content: center;
        }

        .frame-c-name-bracket {
          color: ${theme.text.muted};
          font-weight: 300;
          margin: 0 4px;
        }

        .frame-c-title-row {
          display: flex; align-items: center;
          gap: 10px; margin-top: 6px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .frame-c-tag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
        }

        .frame-c-tag.yellow {
          background: ${theme.accent};
          color: #0e0e12;
        }

        .frame-c-tag.dark {
          background: ${theme.text.primary};
          color: ${theme.background.tertiary};
        }

        .frame-c-tag-val {
          font-size: 13px; color: ${theme.text.secondary};
          font-weight: 500;
        }

        .frame-c-stars {
          margin-top: 14px;
          display: flex;
          justify-content: center;
        }

        .frame-c-stars-row {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .frame-c-id {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(${theme.accentRgb}, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .frame-c-id-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          color: ${theme.text.muted};
          letter-spacing: 1px;
        }

        .frame-c-id-dots {
          display: flex; gap: 3px;
        }

        .frame-c-id-dot {
          width: 4px; height: 4px;
        }

        @keyframes frameUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .frame-c { width: 100%; max-width: 380px; }
        }
      `}</style>

      <div className="frame-c">
        <div className="frame-c-card">
          <div className="frame-c-hatch" />

          {/* Header */}
          <div className="frame-c-header">
            <div className="frame-c-rec">
              <span className="dot" />
              [ REC ] AGENT FILE
            </div>
            <div className="frame-c-class">CLASSIFICATION: HUMAN</div>
          </div>

          {/* Photo */}
          <div className="frame-c-photo">
            <img src="/images/me.jpg" alt="Agent" />
            <div className="frame-c-scan" />
            <div className="frame-c-grad" />
            <span className="frame-c-bracket tl">[ ]</span>
            <span className="frame-c-bracket br">[ ]</span>
          </div>

          {/* Info */}
          <div className="frame-c-info">
            <div className="frame-c-name">
              <span className="frame-c-name-bracket">[</span>
              {CHARACTER.name}
              <span className="frame-c-name-bracket">]</span>
            </div>

            <div className="frame-c-title-row">
              <span className="frame-c-tag yellow">Role</span>
              <span className="frame-c-tag-val">{CHARACTER.title}</span>
              <span className="frame-c-tag dark">Class</span>
              <span className="frame-c-tag-val">Engineer</span>
            </div>

            <div className="frame-c-stars">
              <div className="frame-c-stars-row">
                <svg width="28" height="28" viewBox="0 0 24 24" fill={theme.accent} stroke="#c89030" strokeWidth="0.5" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={theme.accent} stroke="#c89030" strokeWidth="0.5" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={theme.accent} stroke="#c89030" strokeWidth="0.5" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={theme.accent} stroke="#c89030" strokeWidth="0.5" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={theme.accent} stroke="#c89030" strokeWidth="0.5" strokeLinejoin="round"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
              </div>
            </div>

            <div className="frame-c-id">
              <span className="frame-c-id-text">ID: LDN-007</span>
              <div className="frame-c-id-dots">
                <div className="frame-c-id-dot" style={{ background: theme.accent }} />
                <div className="frame-c-id-dot" style={{ background: theme.accent }} />
                <div className="frame-c-id-dot" style={{ background: theme.accent }} />
                <div className="frame-c-id-dot" style={{ background: `rgba(${theme.accentRgb}, 0.25)` }} />
                <div className="frame-c-id-dot" style={{ background: `rgba(${theme.accentRgb}, 0.25)` }} />
              </div>
              <span className="frame-c-id-text">BASE: LONDON</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
