import { useState, useEffect } from "react";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const AMBER = "#e8a849";
const AMBER_DIM = "rgba(232,168,73,0.15)";
const AMBER_MID = "rgba(232,168,73,0.4)";
const BG1 = "#1e1e24";
const BG2 = "#16161b";
const BG3 = "#0e0e12";
const GRAY = "#b8b8c0";

const TABS = [
  { id: "profile",   label: "PROFILE",   icon: "◈", code: "01" },
  { id: "skills",    label: "SKILLS",    icon: "◇", code: "02" },
  { id: "quests",    label: "QUESTS",    icon: "△", code: "03" },
  { id: "inventory", label: "INVENTORY", icon: "▣", code: "04" },
];

// ── DOMAIN DATA ────────────────────────────────────────────────────────────
const DOMAINS = [
  { id: "engineering", label: "ENGINEERING", angle: -90, icon: "⚙", children: ["IT Audit", "Cyber Risk", "SDLC Review", "Data Analytics", "System Controls", "GenAI / AI"] },
  { id: "finance",     label: "ECONOMICS",   angle: -30, icon: "◈", children: ["Financial Audit", "Budget Review", "Cost Efficiency", "Revenue Assurance", "Treasury"] },
  { id: "compliance",  label: "COMPLIANCE",  angle:  30, icon: "▣", children: ["Regulatory", "SOX", "ISO 27001", "Risk Management", "Policy Review"] },
  { id: "ops",         label: "OPERATIONS",  angle:  90, icon: "△", children: ["Process Audit", "Supply Chain", "Procurement", "HR Controls", "Business Continuity"] },
  { id: "tech",        label: "TECHNOLOGY",  angle: 150, icon: "◇", children: ["Python", "SQL", "Power BI", "Data Viz", "Automation", "ML Basics"] },
  { id: "advisory",    label: "ADVISORY",    angle: 210, icon: "⬡", children: ["Fraud Detection", "ESG Audit", "Risk Advisory", "Training", "Stakeholder Mgmt"] },
];

const AUDIT_UNIVERSE = [
  { id:"it", domain:"IT & CYBER", code:"AU-01", icon:"◈", tier:"CORE", skills:["IT General Controls","Cybersecurity Risk","SDLC Review","Access Management","GenAI / AI Risk","Data Integrity"], desc:"End-to-end technology audit coverage from infrastructure controls to emerging AI governance." },
  { id:"fin", domain:"FINANCIAL", code:"AU-02", icon:"◎", tier:"CORE", skills:["Financial Reporting","Revenue Assurance","Cost Controls","Treasury","Budget Variance","Account Rec."], desc:"Financial integrity assurance across reporting, treasury operations, and budget control." },
  { id:"comp", domain:"COMPLIANCE", code:"AU-03", icon:"▣", tier:"CORE", skills:["Regulatory","SOX Controls","ISO 27001","Policy Adherence","AML / KYC","Data Privacy"], desc:"Regulatory navigation and internal policy adherence across multiple compliance frameworks." },
  { id:"ops", domain:"OPERATIONAL", code:"AU-04", icon:"△", tier:"EXTENDED", skills:["Process Efficiency","Supply Chain","Procurement Controls","HR Compliance","Business Continuity"], desc:"Operational excellence review covering process design, supply chain integrity, and resilience." },
  { id:"data", domain:"DATA & ANALYTICS", code:"AU-05", icon:"◇", tier:"EXTENDED", skills:["Data Analytics","Python","SQL","Power BI","Audit Automation","Statistical Sampling"], desc:"Technology-enabled audit using analytics and automation to surface insights at scale." },
  { id:"adv", domain:"ADVISORY", code:"AU-06", icon:"⬡", tier:"SPECIALIST", skills:["Fraud Detection","ESG Audit","Risk Advisory","Control Design","Training & Dev"], desc:"Strategic advisory spanning fraud risk, ESG assurance, and organisational capability building." },
];

const EXPERIENCE = [
  { role:"Assistant Manager, Audit Innovation & Analytics", company:"Grab Holdings Limited", period:"OCT 2024 – SEP 2025", bullets:["Built automation workflows for Continuous Audit dashboards and NextGen Audit tools using KNIME Analytics, Power BI and AWS Workspace","Developed GenAI-powered auditing tools transforming Internal Audit Group workflows","Led training sessions on analytics skills across the audit group"] },
  { role:"Senior Auditor", company:"Previous Organisation", period:"2021 – 2024", bullets:["Executed end-to-end IT and operational audits across multiple business units","Developed risk-based audit plans and delivered executive-level findings","Championed data analytics adoption within the audit function"] },
];

const PROJECTS = [
  { name:"Continuous Audit Dashboard", tech:["Power BI","KNIME","AWS"], desc:"Real-time audit monitoring dashboard integrating multiple data sources for live risk visibility.", status:"DEPLOYED" },
  { name:"GenAI Audit Copilot", tech:["Python","LLM","Automation"], desc:"AI-powered tool to assist auditors with workpaper drafting, risk identification, and control testing.", status:"LIVE" },
  { name:"Portfolio OS", tech:["React","Tailwind","Framer"], desc:"This very portfolio — designed as an Arknights: Endfield-inspired operator terminal.", status:"ACTIVE" },
];

// ── HELPERS ─────────────────────────────────────────────────────────────────
function toRad(deg) { return (deg * Math.PI) / 180; }

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = toRad(i * 60 - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
}

// ── HEX NAV ─────────────────────────────────────────────────────────────────
function HexNav({ active, setActive }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, position:"relative", padding:"8px 0" }}>
      {/* Vertical connector line */}
      <div style={{ position:"absolute", top:40, bottom:40, left:"50%", transform:"translateX(-50%)", width:1, background:`linear-gradient(180deg, transparent, ${AMBER} 20%, ${AMBER} 80%, transparent)`, opacity:0.25, zIndex:0 }} />

      {TABS.map((tab, idx) => {
        const isActive = active === tab.id;
        return (
          <div key={tab.id} style={{ position:"relative", zIndex:1, marginBottom: idx < TABS.length-1 ? "8px" : 0 }}>
            <div
              onClick={() => setActive(tab.id)}
              style={{ cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px" }}
            >
              {/* Hex SVG button */}
              <svg width="80" height="72" viewBox="0 0 80 72" style={{ filter: isActive ? `drop-shadow(0 0 8px ${AMBER}60)` : "none", transition:"filter 0.3s" }}>
                <polygon
                  points={hexPoints(40, 36, 34)}
                  fill={isActive ? "rgba(232,168,73,0.12)" : "rgba(22,22,27,0.9)"}
                  stroke={isActive ? AMBER : "rgba(232,168,73,0.25)"}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition:"all 0.3s" }}
                />
                {/* Inner hex ring when active */}
                {isActive && (
                  <polygon
                    points={hexPoints(40, 36, 28)}
                    fill="none"
                    stroke={AMBER}
                    strokeWidth="0.5"
                    opacity="0.4"
                  />
                )}
                <text x="40" y="30" textAnchor="middle" fill={isActive ? AMBER : "rgba(232,168,73,0.5)"} fontSize="14" style={{ transition:"fill 0.3s" }}>
                  {tab.icon}
                </text>
                <text x="40" y="50" textAnchor="middle" fill={isActive ? "#fff" : GRAY} fontSize="7" fontFamily="Orbitron, sans-serif" fontWeight="700" letterSpacing="1.5" style={{ transition:"fill 0.3s" }}>
                  {tab.label}
                </text>
              </svg>

              {/* Code label */}
              <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color: isActive ? AMBER : "rgba(232,168,73,0.3)", letterSpacing:"2px", transition:"color 0.3s" }}>
                [{tab.code}]
              </div>
            </div>

            {/* Connector dots between nodes */}
            {idx < TABS.length - 1 && (
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", padding:"4px 0" }}>
                {[0,1,2].map(d => (
                  <div key={d} style={{ width:2, height:2, borderRadius:"50%", background: AMBER, opacity: isActive || active === TABS[idx+1]?.id ? 0.6 : 0.15, transition:"opacity 0.3s" }} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── MIND MAP ────────────────────────────────────────────────────────────────
function MindMap() {
  const [activeDomain, setActiveDomain] = useState(null);
  const CX = 200, CY = 200, ORBIT = 130, CHILD = 70;

  function nodePos(angle) {
    return { x: CX + ORBIT * Math.cos(toRad(angle)), y: CY + ORBIT * Math.sin(toRad(angle)) };
  }
  function childPos(parentAngle, i, total) {
    const spread = Math.min(45, 180 / total);
    const start = parentAngle - ((total-1)*spread)/2;
    const angle = start + i*spread;
    const p = nodePos(parentAngle);
    return { x: p.x + CHILD * Math.cos(toRad(angle)), y: p.y + CHILD * Math.sin(toRad(angle)) };
  }

  const active = DOMAINS.find(d => d.id === activeDomain);

  return (
    <div>
      <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"9px", color:"rgba(232,168,73,0.5)", letterSpacing:"3px", marginBottom:"12px" }}>
        [ SELECT A DOMAIN NODE ]
      </div>
      <svg width="100%" viewBox="0 0 400 400" style={{ maxHeight:"340px" }}>
        <defs>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={AMBER} stopOpacity="0.15" />
            <stop offset="100%" stopColor={AMBER} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background rings */}
        {[50,100,150].map(r => <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(232,168,73,0.04)" strokeWidth="1" />)}
        <circle cx={CX} cy={CY} r={60} fill="url(#cg)" />

        {/* Spoke lines */}
        {DOMAINS.map(d => {
          const p = nodePos(d.angle);
          return <line key={d.id+"-s"} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={activeDomain===d.id ? "rgba(232,168,73,0.5)" : "rgba(232,168,73,0.1)"} strokeWidth={activeDomain===d.id ? 1.5 : 1} strokeDasharray="3 4" style={{transition:"all 0.3s"}} />;
        })}

        {/* Child nodes */}
        {active && active.children.map((child, i) => {
          const cp = childPos(active.angle, i, active.children.length);
          const pp = nodePos(active.angle);
          return (
            <g key={child} style={{ animation:"mmFadeIn 0.25s ease forwards", opacity:0, animationDelay:`${i*0.04}s` }}>
              <line x1={pp.x} y1={pp.y} x2={cp.x} y2={cp.y} stroke="rgba(232,168,73,0.3)" strokeWidth="1" />
              <rect x={cp.x-36} y={cp.y-10} width="72" height="20" rx="2" fill={BG1} stroke={AMBER_MID} strokeWidth="0.8" />
              <text x={cp.x} y={cp.y+4} textAnchor="middle" fill={GRAY} fontSize="7.5" fontFamily="Rajdhani, sans-serif" fontWeight="600" letterSpacing="0.5">{child.toUpperCase()}</text>
            </g>
          );
        })}

        {/* Domain nodes */}
        {DOMAINS.map(d => {
          const p = nodePos(d.angle);
          const isA = activeDomain === d.id;
          return (
            <g key={d.id} onClick={() => setActiveDomain(isA ? null : d.id)} style={{ cursor:"pointer" }}>
              <circle cx={p.x} cy={p.y} r={isA ? 28 : 24} fill={isA ? "rgba(232,168,73,0.12)" : BG2} stroke={isA ? AMBER : "rgba(232,168,73,0.3)"} strokeWidth={isA ? 1.5 : 1} style={{transition:"all 0.3s"}} />
              <text x={p.x} y={p.y-4} textAnchor="middle" fill={isA ? AMBER : "rgba(232,168,73,0.6)"} fontSize="11">{d.icon}</text>
              <text x={p.x} y={p.y+9} textAnchor="middle" fill={isA ? "#fff" : GRAY} fontSize="5.5" fontFamily="Orbitron, sans-serif" fontWeight="700" letterSpacing="0.8">{d.label}</text>
            </g>
          );
        })}

        {/* Center */}
        <circle cx={CX} cy={CY} r={36} fill={BG1} stroke={AMBER} strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(232,168,73,0.2)" strokeWidth="1" strokeDasharray="2 3" />
        <text x={CX} y={CY-6} textAnchor="middle" fill={AMBER} fontSize="7" fontFamily="Orbitron, sans-serif" fontWeight="700" letterSpacing="1.5">HAJID</text>
        <text x={CX} y={CY+5} textAnchor="middle" fill="#fff" fontSize="6" fontFamily="Orbitron, sans-serif" letterSpacing="0.8">AI AUDIT</text>
        <text x={CX} y={CY+14} textAnchor="middle" fill="#fff" fontSize="6" fontFamily="Orbitron, sans-serif" letterSpacing="0.8">INNOVATOR</text>
      </svg>

      {active && (
        <div style={{ marginTop:"8px", padding:"10px 14px", border:`1px solid ${AMBER_MID}`, background:"rgba(30,30,36,0.8)", borderRadius:"4px" }}>
          <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:AMBER, letterSpacing:"3px", marginBottom:"6px" }}>{active.label}</div>
          <div style={{ fontSize:"12px", color:GRAY, letterSpacing:"0.5px" }}>{active.children.join("  ·  ")}</div>
        </div>
      )}
    </div>
  );
}

// ── PANEL SECTIONS ──────────────────────────────────────────────────────────
function SectionHeader({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"18px" }}>
      <div style={{ width:6, height:6, background:AMBER, transform:"rotate(45deg)", flexShrink:0 }} />
      <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"11px", color:"#fff", letterSpacing:"4px", fontWeight:700 }}>{label}</span>
      <div style={{ flex:1, height:"1px", background:`linear-gradient(90deg, ${AMBER_MID}, transparent)` }} />
    </div>
  );
}

function Tag({ children, amber }) {
  return (
    <span style={{ display:"inline-block", padding:"3px 10px", border:`1px solid ${amber ? AMBER_MID : "rgba(184,184,192,0.2)"}`, borderRadius:"2px", fontSize:"11px", color: amber ? AMBER : GRAY, background:"#282830", letterSpacing:"0.5px", margin:"3px 3px 3px 0", fontFamily:"'Rajdhani', sans-serif", fontWeight:600 }}>
      {children}
    </span>
  );
}

function ProfilePanel() {
  return (
    <div>
      <SectionHeader label="ABOUT" />
      <p style={{ fontSize:"14px", color:GRAY, lineHeight:1.7, marginBottom:"20px", letterSpacing:"0.3px" }}>
        Assistant Manager in Audit Innovation and Analytics with 5+ years of experience in audit transformation through GenAI-powered tools and automation. Currently pursuing an MSc in AI Applications and Innovation at Imperial College London to deepen expertise in AI-driven solutions.
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:0, marginBottom:"28px" }}>
        {["🍜 Foodie","🎮 Gamer","🐱 Cat person","🌍 Explorer","☕ Coffee addict"].map(t => <Tag key={t}>{t}</Tag>)}
      </div>

      <SectionHeader label="ATTRIBUTES" />
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"28px" }}>
        {[["📊","DATA ANALYTICS",92],["🤖","GENAI / AI",85],["🔍","AUDIT",95],["🐍","PYTHON",80],["🎯","LEADERSHIP",88],["💬","COMMUNICATION",90]].map(([ico,label,val]) => (
          <div key={label} style={{ padding:"12px 14px", background:"#24242c", borderLeft:`3px solid ${AMBER}`, borderRadius:"4px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"6px" }}>
              <span style={{ fontSize:"14px" }}>{ico}</span>
              <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:GRAY, letterSpacing:"1.5px" }}>{label}</span>
            </div>
            <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"22px", color:"#fff", fontWeight:700, marginBottom:"6px" }}>{val}</div>
            <div style={{ height:"2px", background:"rgba(232,168,73,0.1)", borderRadius:"1px", overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${val}%`, background:`linear-gradient(90deg, ${AMBER}, rgba(232,168,73,0.6))`, borderRadius:"1px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPanel() {
  const [activeCard, setActiveCard] = useState(null);
  const TIER_COLOR = { CORE: AMBER, EXTENDED: "#b87a3a", SPECIALIST: "#8a5a2a" };
  const COV = { CORE:100, EXTENDED:75, SPECIALIST:50 };

  return (
    <div>
      <SectionHeader label="KNOWLEDGE DOMAIN MAPPING" />
      <MindMap />

      <div style={{ marginTop:"28px" }}>
        <SectionHeader label="AUDIT UNIVERSE" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px" }}>
          {AUDIT_UNIVERSE.map((u, idx) => {
            const isA = activeCard === u.id;
            return (
              <div key={u.id} onClick={() => setActiveCard(isA ? null : u.id)}
                style={{ cursor:"pointer", padding:"14px", border:`1px solid ${isA ? AMBER : AMBER_DIM}`, background: isA ? "rgba(30,30,36,0.95)" : "rgba(22,22,27,0.8)", borderRadius:"4px", transition:"all 0.25s", animation:`panelIn 0.3s ease ${idx*0.06}s both` }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
                  <div>
                    <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"7px", color:"rgba(232,168,73,0.4)", letterSpacing:"2px", marginBottom:"4px" }}>{u.code}</div>
                    <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"10px", color:"#fff", letterSpacing:"1.5px", fontWeight:700 }}>{u.domain}</div>
                  </div>
                  <span style={{ color:AMBER, opacity:0.6, fontSize:"16px" }}>{u.icon}</span>
                </div>
                <span style={{ fontSize:"8px", fontFamily:"'Orbitron', sans-serif", letterSpacing:"1.5px", color:TIER_COLOR[u.tier], border:`1px solid ${TIER_COLOR[u.tier]}50`, borderRadius:"2px", padding:"2px 6px" }}>{u.tier}</span>
                <div style={{ height:"1.5px", background:`rgba(232,168,73,0.08)`, borderRadius:"1px", margin:"8px 0", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${COV[u.tier]}%`, background:TIER_COLOR[u.tier], transition:"width 0.6s ease" }} />
                </div>
                <div style={{ display:"flex", flexWrap:"wrap" }}>
                  {u.skills.slice(0, isA ? 6 : 2).map(s => <Tag key={s}>{s}</Tag>)}
                  {!isA && u.skills.length > 2 && <span style={{ fontSize:"10px", color:"rgba(232,168,73,0.5)", padding:"3px 4px" }}>+{u.skills.length-2}</span>}
                </div>
                {isA && <p style={{ fontSize:"11px", color:GRAY, lineHeight:1.6, marginTop:"8px", paddingTop:"8px", borderTop:`1px solid ${AMBER_DIM}` }}>{u.desc}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function QuestsPanel() {
  return (
    <div>
      <SectionHeader label="EXPERIENCE" />
      <div style={{ position:"relative", paddingLeft:"20px" }}>
        <div style={{ position:"absolute", left:0, top:8, bottom:8, width:"1px", background:`linear-gradient(180deg, ${AMBER}, ${AMBER_DIM})` }} />
        {EXPERIENCE.map((e, i) => (
          <div key={i} style={{ marginBottom:"24px", position:"relative" }}>
            <div style={{ position:"absolute", left:"-24px", top:"6px", width:"8px", height:"8px", background:AMBER, transform:"rotate(45deg)" }} />
            <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"7px", color:AMBER, letterSpacing:"2px", marginBottom:"5px" }}>{e.period}</div>
            <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"12px", color:"#fff", fontWeight:700, marginBottom:"3px", letterSpacing:"0.5px" }}>{e.role}</div>
            <div style={{ fontSize:"12px", color:"rgba(232,168,73,0.6)", marginBottom:"10px", letterSpacing:"1px" }}>{e.company}</div>
            <ul style={{ margin:0, padding:"0 0 0 16px" }}>
              {e.bullets.map((b,j) => (
                <li key={j} style={{ fontSize:"13px", color:GRAY, lineHeight:1.7, marginBottom:"4px" }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryPanel() {
  return (
    <div>
      <SectionHeader label="PROJECTS" />
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        {PROJECTS.map((p, i) => (
          <div key={i} style={{ padding:"16px", border:`1px solid ${AMBER_DIM}`, borderRadius:"4px", background:"rgba(22,22,27,0.8)", animation:`panelIn 0.3s ease ${i*0.08}s both` }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"8px" }}>
              <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"12px", color:"#fff", fontWeight:700, letterSpacing:"1px" }}>{p.name}</div>
              <span style={{ fontSize:"8px", fontFamily:"'Orbitron', sans-serif", letterSpacing:"2px", color:AMBER, border:`1px solid ${AMBER_MID}`, borderRadius:"2px", padding:"2px 8px" }}>{p.status}</span>
            </div>
            <p style={{ fontSize:"13px", color:GRAY, lineHeight:1.6, margin:"0 0 10px" }}>{p.desc}</p>
            <div style={{ display:"flex", flexWrap:"wrap" }}>
              {p.tech.map(t => <Tag key={t} amber>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PANELS = { profile: ProfilePanel, skills: SkillsPanel, quests: QuestsPanel, inventory: InventoryPanel };

// ── AVATAR CARD ──────────────────────────────────────────────────────────────
function AvatarCard() {
  return (
    <div style={{ border:`1px solid ${AMBER_MID}`, borderRadius:"6px", background:BG1, overflow:"hidden", fontFamily:"'Rajdhani', sans-serif" }}>
      {/* Header bar */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", borderBottom:`1px solid ${AMBER_DIM}`, background:"rgba(14,14,18,0.6)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <div style={{ width:6, height:6, background:AMBER, borderRadius:"50%", animation:"pulse 2s infinite" }} />
          <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:AMBER, letterSpacing:"2px" }}>[ REC ] AGENT FILE</span>
        </div>
        <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"7px", color:GRAY, letterSpacing:"1px" }}>CLASSIFICATION: HUMAN</span>
      </div>

      {/* Avatar image area */}
      <div style={{ position:"relative", background:BG3, aspectRatio:"3/4", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        {/* Corner marks */}
        {[["0,0","12,0","0,12"],["calc(100% - 0px),0","calc(100% - 12px),0","calc(100%),12px"],["0,calc(100% - 0px)","12px,calc(100%)","0,calc(100% - 12px)"],["calc(100%),calc(100%)","calc(100% - 12px),calc(100%)","calc(100%),calc(100% - 12px)"]].map((_, ci) => {
          const positions = [
            { top:8, left:8 }, { top:8, right:8 },
            { bottom:8, left:8 }, { bottom:8, right:8 }
          ];
          const dirs = [
            [[0,0],[12,0],[0,0],[0,12]],
            [[12,0],[0,0],[12,0],[12,12]],
            [[0,12],[0,0],[0,12],[12,12]],
            [[12,12],[0,12],[12,0],[12,12]],
          ];
          return (
            <svg key={ci} width="16" height="16" viewBox="0 0 16 16" style={{ position:"absolute", ...positions[ci] }}>
              <polyline points={`${dirs[ci][0][0]},${dirs[ci][0][1]} ${dirs[ci][2][0]},${dirs[ci][2][1]} ${dirs[ci][2][0]},${dirs[ci][2][1]}`} fill="none" stroke={AMBER} strokeWidth="1.5" />
            </svg>
          );
        })}

        {/* Placeholder avatar */}
        <div style={{ width:"100%", height:"100%", background:`linear-gradient(180deg, #2a2a35 0%, #1a1a22 60%, #0e0e12 100%)`, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"8px" }}>
          <div style={{ width:"80px", height:"80px", borderRadius:"50%", border:`2px solid ${AMBER_MID}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"32px" }}>👤</div>
          <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:"rgba(232,168,73,0.3)", letterSpacing:"3px" }}>AVATAR</div>
        </div>
      </div>

      {/* Info section */}
      <div style={{ padding:"14px 14px 10px" }}>
        <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"16px", color:"#fff", fontWeight:700, letterSpacing:"1px", marginBottom:"8px" }}>
          ❮ Hajid N Atthousi ❯
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"center", marginBottom:"12px", flexWrap:"wrap" }}>
          <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", background:AMBER, color:BG3, padding:"2px 8px", letterSpacing:"1px", fontWeight:700 }}>ROLE</span>
          <span style={{ fontSize:"12px", color:GRAY, letterSpacing:"0.5px" }}>AI Audit Innovator</span>
          <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", background:"#fff", color:BG3, padding:"2px 8px", letterSpacing:"1px", fontWeight:700 }}>CLASS</span>
          <span style={{ fontSize:"12px", color:GRAY, letterSpacing:"0.5px" }}>Engineer</span>
        </div>

        {/* Stars */}
        <div style={{ display:"flex", gap:"4px", marginBottom:"14px" }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="20" height="20" viewBox="0 0 24 24">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={AMBER} stroke={AMBER} strokeWidth="1" />
            </svg>
          ))}
        </div>

        {/* Meta row */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
          <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:GRAY, letterSpacing:"1.5px" }}>ID: LDN-007</span>
          <div style={{ display:"flex", gap:"3px" }}>
            {[1,2,3,4,5].map(s => <div key={s} style={{ width:8, height:8, background: s<=4 ? AMBER : "rgba(232,168,73,0.2)", borderRadius:"1px" }} />)}
          </div>
          <span style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"8px", color:GRAY, letterSpacing:"1.5px" }}>BASE: LONDON</span>
        </div>
      </div>

      {/* Social icons */}
      <div style={{ display:"flex", justifyContent:"center", gap:"16px", padding:"10px 14px 14px", borderTop:`1px solid ${AMBER_DIM}` }}>
        {[
          { label:"GH", title:"GitHub", path:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
          { label:"LI", title:"LinkedIn", path:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", fill:"#0A66C2" },
          { label:"ML", title:"Email", path:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" },
        ].map(({ label, title, path, fill }) => (
          <div key={label} title={title} style={{ cursor:"pointer", width:"32px", height:"32px", border:`1px solid ${AMBER_DIM}`, borderRadius:"4px", display:"flex", alignItems:"center", justifyContent:"center", background:BG2, transition:"all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = AMBER; e.currentTarget.style.background = "rgba(232,168,73,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = AMBER_DIM; e.currentTarget.style.background = BG2; }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={fill || "#fff"}>
              <path d={path} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("profile");
  const Panel = PANELS[activeTab];

  return (
    <div style={{ background:BG3, minHeight:"100vh", fontFamily:"'Rajdhani', sans-serif", color:GRAY }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG2}; }
        ::-webkit-scrollbar-thumb { background: rgba(232,168,73,0.4); border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes panelIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mmFadeIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"24px 16px", display:"grid", gridTemplateColumns:"280px 100px 1fr", gap:"16px", minHeight:"100vh", alignItems:"start" }}>

        {/* ── COL 1: AVATAR ── */}
        <div style={{ position:"sticky", top:"24px" }}>
          <AvatarCard />
        </div>

        {/* ── COL 2: HEX NAV ── */}
        <div style={{ position:"sticky", top:"24px", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:"16px" }}>
          <HexNav active={activeTab} setActive={setActiveTab} />
        </div>

        {/* ── COL 3: CONTENT PANEL ── */}
        <div style={{ border:`1px solid ${AMBER_DIM}`, borderRadius:"6px", background:"rgba(22,22,27,0.6)", backdropFilter:"blur(8px)" }}>
          {/* Panel top bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 18px", borderBottom:`1px solid ${AMBER_DIM}`, background:"rgba(14,14,18,0.4)" }}>
            <div style={{ fontFamily:"'Orbitron', sans-serif", fontSize:"10px", color:AMBER, letterSpacing:"3px" }}>
              {TABS.find(t => t.id===activeTab)?.label}
            </div>
            <div style={{ display:"flex", gap:"6px" }}>
              {["◈","◎","△"].map((s,i) => <span key={i} style={{ color:AMBER, opacity:0.3+i*0.15, fontSize:"8px" }}>{s}</span>)}
            </div>
          </div>

          {/* Panel content */}
          <div key={activeTab} style={{ padding:"20px 18px", animation:"slideIn 0.3s ease", maxHeight:"calc(100vh - 100px)", overflowY:"auto" }}>
            <Panel />
          </div>
        </div>
      </div>
    </div>
  );
}
