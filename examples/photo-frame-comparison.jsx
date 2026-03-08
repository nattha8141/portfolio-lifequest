import { useState } from "react";

const DEMO_PHOTO = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face";

export default function PhotoFrameComparison() {
  const [view, setView] = useState("A");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Share+Tech+Mono&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .root {
          width: 100vw; min-height: 100vh;
          background: #f0ede6;
          font-family: 'Rajdhani', sans-serif;
          display: flex; flex-direction: column;
          align-items: center;
          padding: 30px 20px;
          color: #1a1a1e;
        }

        .switcher {
          display: flex; gap: 0; margin-bottom: 40px;
          border: 2px solid #1a1a1e;
        }

        .sw-btn {
          padding: 12px 32px;
          font-family: 'Orbitron', sans-serif;
          font-size: 13px; font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          border: none;
          transition: all 0.2s;
        }

        .sw-btn.active-a {
          background: #e8d32a; color: #1a1a1e;
        }
        .sw-btn.active-c {
          background: #1a1a1e; color: #e8d32a;
        }
        .sw-btn.inactive {
          background: #e8e4dc; color: #7a7a80;
        }
        .sw-btn:hover:not(.active-a):not(.active-c) {
          background: #ddd9d0;
        }

        .label {
          font-family: 'Orbitron', sans-serif;
          font-size: 11px; letter-spacing: 3px;
          text-transform: uppercase;
          color: #7a7a80;
          margin-bottom: 12px;
        }

        .title {
          font-family: 'Orbitron', sans-serif;
          font-size: 18px; font-weight: 700;
          color: #1a1a1e;
          margin-bottom: 30px;
          letter-spacing: 1px;
        }

        /* ═══════════════════════════════════════════
           OPTION A — Simple Photo Portrait
           Clean, bright Endfield style
        ═══════════════════════════════════════════ */

        .frame-a {
          width: 380px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.08);
          position: relative;
          padding: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          animation: fadeUp 0.6s ease;
        }

        .frame-a-inner {
          width: 100%; height: 480px;
          overflow: hidden;
          position: relative;
        }

        .frame-a-inner img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.05) brightness(0.95);
        }

        .frame-a-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.3) 100%);
          pointer-events: none;
        }

        .frame-a-corner {
          position: absolute;
          width: 20px; height: 20px;
          border-color: #e8d32a;
          border-style: solid;
          border-width: 0;
        }
        .frame-a-corner.tl { top: 20px; left: 20px; border-top-width: 2px; border-left-width: 2px; }
        .frame-a-corner.tr { top: 20px; right: 20px; border-top-width: 2px; border-right-width: 2px; }
        .frame-a-corner.bl { bottom: 20px; left: 20px; border-bottom-width: 2px; border-left-width: 2px; }
        .frame-a-corner.br { bottom: 20px; right: 20px; border-bottom-width: 2px; border-right-width: 2px; }

        .frame-a-name {
          padding: 20px 0 0;
          display: flex; align-items: center;
          justify-content: space-between;
        }

        .frame-a-name h2 {
          font-family: 'Orbitron', sans-serif;
          font-size: 22px; font-weight: 700;
          color: #1a1a1e;
          letter-spacing: 1px;
        }

        .frame-a-name .lv {
          font-family: 'Orbitron', sans-serif;
          font-size: 12px; font-weight: 600;
          background: #e8d32a;
          color: #1a1a1e;
          padding: 4px 12px;
          letter-spacing: 1px;
        }

        .frame-a-title {
          font-size: 13px;
          color: #7a7a80;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .frame-a-bars {
          margin-top: 16px;
          display: flex; flex-direction: column; gap: 8px;
        }

        .bar-a {
          display: flex; align-items: center; gap: 10px;
        }

        .bar-a-label {
          font-family: 'Orbitron', sans-serif;
          font-size: 10px; font-weight: 600;
          width: 28px; text-align: right;
          color: #7a7a80;
        }

        .bar-a-track {
          flex: 1; height: 4px;
          background: #e8e4dc;
          overflow: hidden;
        }

        .bar-a-fill {
          height: 100%;
        }

        .bar-a-fill.hp { background: #4ade80; }
        .bar-a-fill.mp { background: #60a5fa; }
        .bar-a-fill.exp { background: #e8d32a; }

        .bar-a-val {
          font-size: 10px; color: #aaa;
          width: 80px; text-align: right;
          font-variant-numeric: tabular-nums;
        }


        /* ═══════════════════════════════════════════
           OPTION C — Hybrid Game Character Card
           Endfield dossier / classified file style
        ═══════════════════════════════════════════ */

        .frame-c {
          width: 420px;
          position: relative;
          animation: fadeUp 0.6s ease;
        }

        /* Stacked offset frames behind */
        .frame-c::before,
        .frame-c::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 1px solid rgba(0,0,0,0.06);
          background: #f5f3ef;
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
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.1);
          position: relative;
          overflow: hidden;
        }

        /* Diagonal hatch pattern overlay */
        .frame-c-hatch {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            rgba(0,0,0,0.015) 8px,
            rgba(0,0,0,0.015) 9px
          );
          pointer-events: none;
          z-index: 2;
        }

        /* REC + classification header */
        .frame-c-header {
          padding: 12px 16px;
          display: flex; align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          position: relative; z-index: 3;
        }

        .frame-c-rec {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px; color: #1a1a1e;
          display: flex; align-items: center; gap: 8px;
          letter-spacing: 2px;
        }

        .frame-c-rec .dot {
          width: 6px; height: 6px;
          background: #e8d32a;
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .frame-c-class {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; color: #aaa;
          letter-spacing: 1px;
        }

        /* Photo area */
        .frame-c-photo {
          width: 100%; height: 460px;
          overflow: hidden;
          position: relative;
        }

        .frame-c-photo img {
          width: 100%; height: 100%;
          object-fit: cover;
          filter: contrast(1.08) brightness(0.92) saturate(0.9);
        }

        /* Scan lines */
        .frame-c-scan {
          position: absolute; inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.02) 2px,
            rgba(0,0,0,0.02) 4px
          );
          pointer-events: none;
        }

        /* Gradient overlay */
        .frame-c-grad {
          position: absolute; inset: 0;
          background: linear-gradient(180deg,
            rgba(240,237,230,0.3) 0%,
            transparent 15%,
            transparent 70%,
            rgba(240,237,230,0.6) 100%
          );
          pointer-events: none;
        }

        /* Corner brackets on photo */
        .frame-c-bracket {
          position: absolute;
          color: #e8d32a;
          font-family: 'Share Tech Mono', monospace;
          font-size: 16px;
          z-index: 3;
          text-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        .frame-c-bracket.tl { top: 12px; left: 14px; }
        .frame-c-bracket.br { bottom: 12px; right: 14px; }

        /* Watermark behind photo */
        .frame-c-watermark {
          position: absolute;
          bottom: 30px; left: 50%;
          transform: translateX(-50%);
          font-family: 'Orbitron', sans-serif;
          font-size: 60px; font-weight: 900;
          color: rgba(255,255,255,0.07);
          letter-spacing: 12px;
          white-space: nowrap;
          z-index: 1;
          pointer-events: none;
        }

        /* Info section */
        .frame-c-info {
          padding: 16px 20px 20px;
          position: relative; z-index: 3;
          border-top: 1px solid rgba(0,0,0,0.06);
        }

        .frame-c-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 20px; font-weight: 700;
          color: #1a1a1e;
          letter-spacing: 1px;
          margin-bottom: 2px;
        }

        .frame-c-name-bracket {
          color: #ccc;
          font-weight: 300;
          margin: 0 4px;
        }

        .frame-c-title-row {
          display: flex; align-items: center;
          gap: 10px; margin-top: 6px;
        }

        .frame-c-tag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 3px 10px;
        }

        .frame-c-tag.yellow {
          background: #e8d32a;
          color: #1a1a1e;
        }

        .frame-c-tag.dark {
          background: #1a1a1e;
          color: #f0ede6;
        }

        .frame-c-tag-val {
          font-size: 13px; color: #3a3a40;
          font-weight: 500;
        }

        .frame-c-bars {
          margin-top: 14px;
          display: flex; flex-direction: column; gap: 6px;
        }

        .bar-c {
          display: flex; align-items: center; gap: 10px;
        }

        .bar-c-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px; width: 28px;
          text-align: right; color: #aaa;
        }

        .bar-c-track {
          flex: 1; height: 3px;
          background: #e8e4dc;
          overflow: hidden;
          position: relative;
        }

        .bar-c-fill { height: 100%; }
        .bar-c-fill.hp { background: linear-gradient(90deg, #4ade80, #86efac); }
        .bar-c-fill.mp { background: linear-gradient(90deg, #60a5fa, #93c5fd); }
        .bar-c-fill.exp { background: linear-gradient(90deg, #e8d32a, #f0e068); }

        .bar-c-val {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px; color: #bbb;
          width: 75px; text-align: right;
        }

        /* ID line at bottom */
        .frame-c-id {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .frame-c-id-text {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          color: #ccc;
          letter-spacing: 1px;
        }

        .frame-c-id-dots {
          display: flex; gap: 3px;
        }

        .frame-c-id-dot {
          width: 4px; height: 4px;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .frame-a, .frame-c { width: 100%; max-width: 380px; }
        }
      `}</style>

      <div className="root">
        {/* Switcher */}
        <div className="switcher">
          <button
            className={`sw-btn ${view === "A" ? "active-a" : "inactive"}`}
            onClick={() => setView("A")}
          >
            Option A — Simple Portrait
          </button>
          <button
            className={`sw-btn ${view === "C" ? "active-c" : "inactive"}`}
            onClick={() => setView("C")}
          >
            Option C — Game Character Card
          </button>
        </div>

        {/* ═══ OPTION A ═══ */}
        {view === "A" && (
          <div key="a">
            <div className="label">Simple Photo Portrait — Clean Endfield Style</div>
            <div className="frame-a">
              <div className="frame-a-inner">
                <img src={DEMO_PHOTO} alt="Portrait" />
                <div className="frame-a-overlay" />
                <div className="frame-a-corner tl" />
                <div className="frame-a-corner tr" />
                <div className="frame-a-corner bl" />
                <div className="frame-a-corner br" />
              </div>
              <div className="frame-a-name">
                <h2>Your Name</h2>
                <span className="lv">LV 28</span>
              </div>
              <div className="frame-a-title">Full-Stack Developer</div>
              <div className="frame-a-bars">
                <div className="bar-a">
                  <span className="bar-a-label">HP</span>
                  <div className="bar-a-track"><div className="bar-a-fill hp" style={{ width: "100%" }} /></div>
                  <span className="bar-a-val">12,450 / 12,450</span>
                </div>
                <div className="bar-a">
                  <span className="bar-a-label">MP</span>
                  <div className="bar-a-track"><div className="bar-a-fill mp" style={{ width: "100%" }} /></div>
                  <span className="bar-a-val">840 / 840</span>
                </div>
                <div className="bar-a">
                  <span className="bar-a-label">EXP</span>
                  <div className="bar-a-track"><div className="bar-a-fill exp" style={{ width: "72%" }} /></div>
                  <span className="bar-a-val">7,200 / 10,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ OPTION C ═══ */}
        {view === "C" && (
          <div key="c">
            <div className="label">Hybrid Game Character Card — Classified Dossier Style</div>
            <div className="frame-c">
              <div className="frame-c-card">
                <div className="frame-c-hatch" />

                {/* Header */}
                <div className="frame-c-header">
                  <div className="frame-c-rec">
                    <span className="dot" />
                    [ REC ] OPERATOR FILE
                  </div>
                  <div className="frame-c-class">CLASSIFICATION: A-RANK</div>
                </div>

                {/* Photo */}
                <div className="frame-c-photo">
                  <img src={DEMO_PHOTO} alt="Operator" />
                  <div className="frame-c-scan" />
                  <div className="frame-c-grad" />
                  <span className="frame-c-bracket tl">[ ]</span>
                  <span className="frame-c-bracket br">[ ]</span>
                  <div className="frame-c-watermark">PROFILE</div>
                </div>

                {/* Info */}
                <div className="frame-c-info">
                  <div className="frame-c-name">
                    <span className="frame-c-name-bracket">[</span>
                    Your Name
                    <span className="frame-c-name-bracket">]</span>
                  </div>

                  <div className="frame-c-title-row">
                    <span className="frame-c-tag yellow">Role</span>
                    <span className="frame-c-tag-val">Full-Stack Developer</span>
                    <span className="frame-c-tag dark">Class</span>
                    <span className="frame-c-tag-val">⚡ Engineer</span>
                  </div>

                  <div className="frame-c-bars">
                    <div className="bar-c">
                      <span className="bar-c-label">HP</span>
                      <div className="bar-c-track"><div className="bar-c-fill hp" style={{ width: "100%" }} /></div>
                      <span className="bar-c-val">12,450 / 12,450</span>
                    </div>
                    <div className="bar-c">
                      <span className="bar-c-label">MP</span>
                      <div className="bar-c-track"><div className="bar-c-fill mp" style={{ width: "100%" }} /></div>
                      <span className="bar-c-val">840 / 840</span>
                    </div>
                    <div className="bar-c">
                      <span className="bar-c-label">EXP</span>
                      <div className="bar-c-track"><div className="bar-c-fill exp" style={{ width: "72%" }} /></div>
                      <span className="bar-c-val">7,200 / 10,000</span>
                    </div>
                  </div>

                  <div className="frame-c-id">
                    <span className="frame-c-id-text">ID: OPR-2024-0528</span>
                    <div className="frame-c-id-dots">
                      <div className="frame-c-id-dot" style={{ background: "#e8d32a" }} />
                      <div className="frame-c-id-dot" style={{ background: "#e8d32a" }} />
                      <div className="frame-c-id-dot" style={{ background: "#e8d32a" }} />
                      <div className="frame-c-id-dot" style={{ background: "#ccc" }} />
                      <div className="frame-c-id-dot" style={{ background: "#ccc" }} />
                    </div>
                    <span className="frame-c-id-text">CLEARANCE: LEVEL 4</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
