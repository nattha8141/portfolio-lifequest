import { useState } from "react";

// ── THEME ────────────────────────────────────────────────────────────────────
const T = {
  bg:       "#f0ede6",
  bgCard:   "#e8e4db",
  bgPanel:  "#faf8f4",
  border:   "rgba(180,150,80,0.25)",
  amber:    "#d4a017",
  amberDim: "rgba(212,160,23,0.15)",
  amberMid: "rgba(212,160,23,0.4)",
  amberStr: "rgba(212,160,23,0.8)",
  dark:     "#1a1a1a",
  mid:      "#4a4a4a",
  muted:    "#7a7a7a",
  white:    "#ffffff",
  cardBg:   "#edeae2",
  darkCard: "#2a2a2a",
};

// ── DATA ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id:"profile",   label:"PROFILE",   icon:"◈", code:"01" },
  { id:"skills",    label:"SKILLS",    icon:"◇", code:"02" },
  { id:"quests",    label:"QUESTS",    icon:"△", code:"03" },
  { id:"inventory", label:"INVENTORY", icon:"▣", code:"04" },
];

const EXPERIENCE = [
  { role:"Assistant Manager, Audit Innovation and Analytics", company:"Grab Holdings Limited", period:"OCT 2024 – SEP 2025", desc:"Built automation workflows for Continuous Audit dashboards and NextGen Audit tools using KNIME Analytics, Power BI, and AWS Workspace. Developed GenAI-powered auditing tools transforming Internal Audit Group workflows. Led training sessions on analytics skills across departments." },
  { role:"Specialist, Audit Innovation and Analytics", company:"Grab Holdings Limited", period:"SEP 2023 – OCT 2024", desc:"Utilized KNIME analytics software to support continuous audit development. Built innovative tools powered by generative AI to enhance auditor capabilities and efficiency." },
  { role:"Staff, Audit Support and System Development", company:"Telkomsel", period:"JUN 2020 – SEP 2023", desc:"Evaluated feasibility of Continuous Audit implementation across business units. Built logical frameworks and scripts for multi-source data reconciliation. Created data visualisations for continuous monitoring." },
  { role:"Staff, Information Technology", company:"Rajawali Telekomunikasi Selular", period:"SEP 2018 – JUN 2020", desc:"Assessed feasibility of IT solutions for new business initiatives. Represented IT team in stakeholder meetings for new contracts and business opportunities." },
];

const EDUCATION = [
  { degree:"MSc in AI Applications and Innovation", school:"Imperial College London", period:"2025 – PRESENT" },
  { degree:"Bachelor of Engineering in Industrial Engineering", school:"Universitas Indonesia", period:"2014 – 2018" },
];

const QUESTS = [
  { name:"GenAI Audit Transformation", status:"COMPLETED", statusColor: T.amber, desc:"Developed generative AI-powered tools that transformed Internal Audit Group workflows at Grab Holdings. Awarded Grab CEO Award 2025.", tags:["GENAI","PYTHON","AUDIT","AUTOMATION"], reward:"CEO AWARD" },
  { name:"Continuous Audit Dashboards", status:"COMPLETED", statusColor: T.amber, desc:"Built automation workflows for real-time operations monitoring and anomaly detection using KNIME Analytics, Power BI, and AWS.", tags:["KNIME","POWER BI","AWS","DASHBOARD"], reward:"+900 EXP" },
  { name:"Government Investigation Support", status:"COMPLETED", statusColor: T.amber, desc:"Provided critical data support during a nationwide government investigation involving the Audit Board of Indonesia and Criminal Investigation Agency.", tags:["DATA ANALYSIS","COMPLIANCE","AUDIT"], reward:"+800 EXP" },
  { name:"Design Thinking Research", status:"COMPLETED", statusColor: T.amber, desc:"Designed inclusive learning tools for hearing-impaired students using design thinking methodology. Awarded PITTA Grant for international publication.", tags:["DESIGN THINKING","UX RESEARCH","ACCESSIBILITY"], reward:"PITTA GRANT" },
  { name:"MSc AI at Imperial College", status:"IN PROGRESS", statusColor:"#333", desc:"Pursuing MSc in AI Applications and Innovation at Imperial College London. Modules in ML, Deep Learning, IoT, and Robotics.", tags:["AI","MACHINE LEARNING","DEEP LEARNING","IOT"], reward:"+2000 EXP" },
  { name:"Gamified Portfolio", status:"DAILY", statusColor:"#555", desc:"Building an immersive Arknights-inspired gamified portfolio to showcase career and skills.", tags:["NEXT.JS","TYPESCRIPT","GAME UI"], reward:"+1000 EXP" },
];

const INVENTORY = [
  { name:"PYTHON",   icon:"🐍", stars:5, filled:5 },
  { name:"KNIME",    icon:"⚙️", stars:5, filled:5 },
  { name:"POWER BI", icon:"📊", stars:5, filled:5 },
  { name:"AWS",      icon:"☁️", stars:5, filled:4 },
  { name:"GENAI",    icon:"🤖", stars:5, filled:5 },
  { name:"SQL",      icon:"🗄️", stars:5, filled:4 },
  { name:"CEH",      icon:"🔐", stars:5, filled:4 },
  { name:"GIT",      icon:"⚡", stars:5, filled:3 },
];

const DOMAINS = [
  { id:"engineering", label:"ENGINEERING", angle:-90, icon:"⚙", children:["IT Audit","Cyber Risk","SDLC Review","Data Analytics","System Controls","GenAI / AI"] },
  { id:"finance",     label:"ECONOMICS",   angle:-30, icon:"◈", children:["Financial Audit","Budget Review","Cost Efficiency","Revenue Assurance","Treasury"] },
  { id:"compliance",  label:"COMPLIANCE",  angle: 30, icon:"▣", children:["Regulatory","SOX","ISO 27001","Risk Management","Policy Review"] },
  { id:"ops",         label:"OPERATIONS",  angle: 90, icon:"△", children:["Process Audit","Supply Chain","Procurement","HR Controls","Business Continuity"] },
  { id:"tech",        label:"TECHNOLOGY",  angle:150, icon:"◇", children:["Python","SQL","Power BI","Data Viz","Automation","ML Basics"] },
  { id:"advisory",    label:"ADVISORY",    angle:210, icon:"⬡", children:["Fraud Detection","ESG Audit","Risk Advisory","Training","Stakeholder Mgmt"] },
];

const AUDIT_UNIVERSE = [
  { id:"it",   domain:"IT & CYBER",      code:"AU-01", icon:"◈", tier:"CORE",      skills:["IT General Controls","Cybersecurity Risk","SDLC Review","Access Mgmt","GenAI Risk","Data Integrity"], desc:"End-to-end technology audit from infrastructure controls to AI governance." },
  { id:"fin",  domain:"FINANCIAL",       code:"AU-02", icon:"◎", tier:"CORE",      skills:["Financial Reporting","Revenue Assurance","Cost Controls","Treasury","Budget Variance"], desc:"Financial integrity assurance across reporting, treasury, and budget control." },
  { id:"comp", domain:"COMPLIANCE",      code:"AU-03", icon:"▣", tier:"CORE",      skills:["Regulatory","SOX Controls","ISO 27001","Policy Adherence","AML / KYC","Data Privacy"], desc:"Regulatory navigation and policy adherence across multiple frameworks." },
  { id:"ops",  domain:"OPERATIONAL",     code:"AU-04", icon:"△", tier:"EXTENDED",  skills:["Process Efficiency","Supply Chain","Procurement Controls","HR Compliance","BCP"], desc:"Operational excellence review covering process design and resilience." },
  { id:"data", domain:"DATA & ANALYTICS",code:"AU-05", icon:"◇", tier:"EXTENDED",  skills:["Data Analytics","Python","SQL","Power BI","Automation","Statistical Sampling"], desc:"Technology-enabled audit using analytics and automation at scale." },
  { id:"adv",  domain:"ADVISORY",        code:"AU-06", icon:"⬡", tier:"SPECIALIST",skills:["Fraud Detection","ESG Audit","Risk Advisory","Control Design","Training & Dev"], desc:"Strategic advisory spanning fraud risk, ESG assurance, and capability building." },
];

const TIER_COLOR = { CORE:"#c8900a", EXTENDED:"#a07020", SPECIALIST:"#706040" };
const COV = { CORE:100, EXTENDED:72, SPECIALIST:48 };

// ── HELPERS ───────────────────────────────────────────────────────────────────
function toRad(d) { return d * Math.PI / 180; }
function hexPts(cx, cy, r) {
  return Array.from({length:6},(_,i)=>{const a=toRad(i*60-30);return`${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`;}).join(" ");
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function SectionHeader({ label }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"18px"}}>
      <div style={{width:8,height:8,background:T.amber,transform:"rotate(45deg)",flexShrink:0}} />
      <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"11px",color:T.dark,letterSpacing:"4px",fontWeight:700}}>{label}</span>
      <div style={{flex:1,height:"1px",background:`linear-gradient(90deg,${T.amberMid},transparent)`}} />
    </div>
  );
}

function Tag({ children, amber }) {
  return (
    <span style={{display:"inline-block",padding:"3px 10px",border:`1px solid ${amber?T.amberMid:"rgba(100,80,40,0.25)"}`,borderRadius:"2px",fontSize:"11px",color:amber?T.amber:T.mid,background:amber?"rgba(212,160,23,0.08)":"rgba(0,0,0,0.04)",letterSpacing:"0.5px",margin:"3px 3px 3px 0",fontFamily:"'Rajdhani',sans-serif",fontWeight:600}}>
      {children}
    </span>
  );
}

function Stars({ filled, total=5, size=14 }) {
  return (
    <div style={{display:"flex",gap:"3px"}}>
      {Array.from({length:total},(_,i)=>(
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={i<filled?T.amber:"rgba(212,160,23,0.2)"}
            stroke={i<filled?T.amber:"rgba(212,160,23,0.15)"}
            strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}

// ── HEX NAV ───────────────────────────────────────────────────────────────────
function HexNav({ active, setActive }) {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",position:"relative",padding:"8px 0"}}>
      <div style={{position:"absolute",top:48,bottom:48,left:"50%",transform:"translateX(-50%)",width:1,background:`linear-gradient(180deg,transparent,${T.amber} 20%,${T.amber} 80%,transparent)`,opacity:0.2,zIndex:0}} />
      {TABS.map((tab,idx)=>{
        const isA = active===tab.id;
        return (
          <div key={tab.id} style={{position:"relative",zIndex:1,marginBottom:idx<TABS.length-1?"6px":0}}>
            <div onClick={()=>setActive(tab.id)} style={{cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"}}>
              <svg width="78" height="70" viewBox="0 0 78 70" style={{filter:isA?`drop-shadow(0 0 6px ${T.amber}80)`:"none",transition:"filter 0.3s"}}>
                <polygon points={hexPts(39,35,32)}
                  fill={isA?"rgba(212,160,23,0.12)":"rgba(230,226,218,0.9)"}
                  stroke={isA?T.amber:"rgba(212,160,23,0.3)"}
                  strokeWidth={isA?1.5:1}
                  style={{transition:"all 0.3s"}} />
                {isA&&<polygon points={hexPts(39,35,26)} fill="none" stroke={T.amber} strokeWidth="0.5" opacity="0.4"/>}
                <text x="39" y="30" textAnchor="middle" fill={isA?T.amber:"rgba(180,140,40,0.6)"} fontSize="13" style={{transition:"fill 0.3s"}}>{tab.icon}</text>
                <text x="39" y="48" textAnchor="middle" fill={isA?T.dark:T.muted} fontSize="6.5" fontFamily="Orbitron,sans-serif" fontWeight="700" letterSpacing="1.2" style={{transition:"fill 0.3s"}}>{tab.label}</text>
              </svg>
              <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:isA?T.amber:"rgba(212,160,23,0.3)",letterSpacing:"2px",transition:"color 0.3s"}}>[{tab.code}]</div>
            </div>
            {idx<TABS.length-1&&(
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"4px 0"}}>
                {[0,1,2].map(d=><div key={d} style={{width:2,height:2,borderRadius:"50%",background:T.amber,opacity:isA||active===TABS[idx+1]?.id?0.5:0.12,transition:"opacity 0.3s"}}/>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── MIND MAP ──────────────────────────────────────────────────────────────────
function MindMap() {
  const [activeDomain, setActiveDomain] = useState(null);
  const CX=200, CY=195, ORBIT=130, CHILD=68;
  function nodePos(a){return{x:CX+ORBIT*Math.cos(toRad(a)),y:CY+ORBIT*Math.sin(toRad(a))};}
  function childPos(pa,i,n){
    const spread=Math.min(44,160/n), start=pa-((n-1)*spread)/2, a=start+i*spread, p=nodePos(pa);
    return{x:p.x+CHILD*Math.cos(toRad(a)),y:p.y+CHILD*Math.sin(toRad(a))};
  }
  const active=DOMAINS.find(d=>d.id===activeDomain);
  return (
    <div>
      <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"8px",color:T.amberStr,letterSpacing:"3px",marginBottom:"10px"}}>[ SELECT A DOMAIN NODE ]</div>
      <svg width="100%" viewBox="0 0 400 390" style={{maxHeight:"320px"}}>
        <defs>
          <radialGradient id="cg2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={T.amber} stopOpacity="0.12"/>
            <stop offset="100%" stopColor={T.amber} stopOpacity="0"/>
          </radialGradient>
        </defs>
        {[50,100,150].map(r=><circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="rgba(212,160,23,0.06)" strokeWidth="1"/>)}
        <circle cx={CX} cy={CY} r={58} fill="url(#cg2)"/>
        {DOMAINS.map(d=>{const p=nodePos(d.angle);return<line key={d.id+"-s"} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke={activeDomain===d.id?"rgba(212,160,23,0.5)":"rgba(212,160,23,0.12)"} strokeWidth={activeDomain===d.id?1.5:1} strokeDasharray="3 4" style={{transition:"all 0.3s"}}/>;})}
        {active&&active.children.map((child,i)=>{
          const cp=childPos(active.angle,i,active.children.length),pp=nodePos(active.angle);
          return(
            <g key={child} style={{animation:"mmIn 0.22s ease forwards",opacity:0,animationDelay:`${i*0.04}s`}}>
              <line x1={pp.x} y1={pp.y} x2={cp.x} y2={cp.y} stroke="rgba(212,160,23,0.35)" strokeWidth="1"/>
              <rect x={cp.x-36} y={cp.y-10} width="72" height="20" rx="2" fill={T.bgCard} stroke="rgba(212,160,23,0.4)" strokeWidth="0.8"/>
              <text x={cp.x} y={cp.y+4} textAnchor="middle" fill={T.mid} fontSize="7.5" fontFamily="Rajdhani,sans-serif" fontWeight="600" letterSpacing="0.5">{child.toUpperCase()}</text>
            </g>
          );
        })}
        {DOMAINS.map(d=>{
          const p=nodePos(d.angle),isA=activeDomain===d.id;
          return(
            <g key={d.id} onClick={()=>setActiveDomain(isA?null:d.id)} style={{cursor:"pointer"}}>
              <circle cx={p.x} cy={p.y} r={isA?28:24} fill={isA?"rgba(212,160,23,0.12)":T.bgCard} stroke={isA?T.amber:"rgba(212,160,23,0.35)"} strokeWidth={isA?1.5:1} style={{transition:"all 0.3s"}}/>
              <text x={p.x} y={p.y-4} textAnchor="middle" fill={isA?T.amber:"rgba(180,140,40,0.7)"} fontSize="11">{d.icon}</text>
              <text x={p.x} y={p.y+9} textAnchor="middle" fill={isA?T.dark:T.muted} fontSize="5.5" fontFamily="Orbitron,sans-serif" fontWeight="700" letterSpacing="0.8">{d.label}</text>
            </g>
          );
        })}
        <circle cx={CX} cy={CY} r={36} fill={T.bgPanel} stroke={T.amber} strokeWidth="1.5"/>
        <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(212,160,23,0.2)" strokeWidth="1" strokeDasharray="2 3"/>
        <text x={CX} y={CY-6} textAnchor="middle" fill={T.amber} fontSize="7" fontFamily="Orbitron,sans-serif" fontWeight="700" letterSpacing="1.5">HAJID</text>
        <text x={CX} y={CY+5} textAnchor="middle" fill={T.dark} fontSize="5.8" fontFamily="Orbitron,sans-serif" letterSpacing="0.8">AI AUDIT</text>
        <text x={CX} y={CY+14} textAnchor="middle" fill={T.dark} fontSize="5.8" fontFamily="Orbitron,sans-serif" letterSpacing="0.8">INNOVATOR</text>
      </svg>
      {active&&(
        <div style={{marginTop:"8px",padding:"10px 14px",border:`1px solid ${T.amberMid}`,background:"rgba(212,160,23,0.06)",borderRadius:"4px"}}>
          <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"8px",color:T.amber,letterSpacing:"3px",marginBottom:"5px"}}>{active.label}</div>
          <div style={{fontSize:"12px",color:T.mid,letterSpacing:"0.5px"}}>{active.children.join("  ·  ")}</div>
        </div>
      )}
    </div>
  );
}

// ── PANELS ────────────────────────────────────────────────────────────────────
function ProfilePanel() {
  return (
    <div>
      <SectionHeader label="ABOUT" />
      <p style={{fontSize:"14px",color:T.mid,lineHeight:1.75,marginBottom:"18px"}}>
        Assistant Manager in Audit Innovation and Analytics with 5+ years of experience in audit transformation through GenAI-powered tools and automation. Currently pursuing an MSc in AI Applications and Innovation at Imperial College London to deepen expertise in AI-driven solutions.
      </p>
      <div style={{display:"flex",flexWrap:"wrap",marginBottom:"28px"}}>
        {["🍜 Foodie","🎮 Gamer","🐱 Cat person","🌍 Explorer","☕ Coffee addict"].map(t=><Tag key={t}>{t}</Tag>)}
      </div>

      <SectionHeader label="EXPERIENCE" />
      <div style={{position:"relative",paddingLeft:"22px",marginBottom:"28px"}}>
        <div style={{position:"absolute",left:0,top:8,bottom:8,width:"1px",background:`linear-gradient(180deg,${T.amber},${T.amberDim})`}}/>
        {EXPERIENCE.map((e,i)=>(
          <div key={i} style={{marginBottom:"20px",position:"relative"}}>
            <div style={{position:"absolute",left:"-26px",top:"6px",width:8,height:8,background:T.amber,borderRadius:"50%",border:`2px solid ${T.bgPanel}`}}/>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:T.amberStr,letterSpacing:"2px",marginBottom:"3px"}}>{e.period}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"14px",color:T.dark,fontWeight:700,marginBottom:"2px",letterSpacing:"0.3px"}}>{e.role}</div>
            <div style={{fontSize:"12px",color:T.amber,marginBottom:"8px",letterSpacing:"0.5px",fontWeight:600}}>{e.company}</div>
            <p style={{fontSize:"13px",color:T.mid,lineHeight:1.65,margin:0}}>{e.desc}</p>
          </div>
        ))}
      </div>

      <SectionHeader label="EDUCATION" />
      <div style={{position:"relative",paddingLeft:"22px"}}>
        <div style={{position:"absolute",left:0,top:8,bottom:8,width:"1px",background:`linear-gradient(180deg,${T.amber},${T.amberDim})`}}/>
        {EDUCATION.map((e,i)=>(
          <div key={i} style={{marginBottom:"18px",position:"relative"}}>
            <div style={{position:"absolute",left:"-26px",top:"6px",width:8,height:8,background:T.amber,borderRadius:"50%",border:`2px solid ${T.bgPanel}`}}/>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:T.amberStr,letterSpacing:"2px",marginBottom:"3px"}}>{e.period}</div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"14px",color:T.dark,fontWeight:700,marginBottom:"2px"}}>{e.degree}</div>
            <div style={{fontSize:"12px",color:T.amber,fontWeight:600}}>{e.school}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPanel() {
  const [activeCard, setActiveCard] = useState(null);
  return (
    <div>
      <SectionHeader label="KNOWLEDGE DOMAIN MAPPING" />
      <MindMap />
      <div style={{marginTop:"24px"}}>
        <SectionHeader label="AUDIT UNIVERSE" />
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
          {AUDIT_UNIVERSE.map((u,idx)=>{
            const isA=activeCard===u.id;
            return(
              <div key={u.id} onClick={()=>setActiveCard(isA?null:u.id)}
                style={{cursor:"pointer",padding:"14px",border:`1px solid ${isA?T.amber:T.border}`,background:isA?"rgba(212,160,23,0.07)":T.bgCard,borderRadius:"4px",transition:"all 0.25s",animation:`pIn 0.3s ease ${idx*0.06}s both`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                  <div>
                    <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:T.muted,letterSpacing:"2px",marginBottom:"3px"}}>{u.code}</div>
                    <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"10px",color:T.dark,letterSpacing:"1.5px",fontWeight:700}}>{u.domain}</div>
                  </div>
                  <span style={{color:T.amber,opacity:0.6,fontSize:"16px"}}>{u.icon}</span>
                </div>
                <span style={{fontSize:"7.5px",fontFamily:"'Orbitron',sans-serif",letterSpacing:"1.5px",color:TIER_COLOR[u.tier],border:`1px solid ${TIER_COLOR[u.tier]}60`,borderRadius:"2px",padding:"2px 6px"}}>{u.tier}</span>
                <div style={{height:"1.5px",background:"rgba(212,160,23,0.1)",borderRadius:"1px",margin:"8px 0",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${COV[u.tier]}%`,background:TIER_COLOR[u.tier],transition:"width 0.6s ease"}}/>
                </div>
                <div style={{display:"flex",flexWrap:"wrap"}}>
                  {u.skills.slice(0,isA?6:2).map(s=><Tag key={s}>{s}</Tag>)}
                  {!isA&&u.skills.length>2&&<span style={{fontSize:"10px",color:T.amberStr,padding:"3px 4px"}}>+{u.skills.length-2}</span>}
                </div>
                {isA&&<p style={{fontSize:"11px",color:T.mid,lineHeight:1.6,marginTop:"8px",paddingTop:"8px",borderTop:`1px solid ${T.border}`}}>{u.desc}</p>}
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
      <SectionHeader label="QUEST LOG" />
      <div style={{display:"flex",flexDirection:"column",gap:"1px"}}>
        {QUESTS.map((q,i)=>(
          <div key={i} style={{padding:"18px 0",borderBottom:`1px solid ${T.border}`,animation:`pIn 0.3s ease ${i*0.07}s both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px",gap:"12px"}}>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:"16px",color:T.dark,fontWeight:700,letterSpacing:"0.3px"}}>{q.name}</div>
              <span style={{flexShrink:0,fontFamily:"'Orbitron',sans-serif",fontSize:"8px",letterSpacing:"1.5px",color:q.status==="COMPLETED"?T.bgPanel:T.dark,background:q.status==="COMPLETED"?T.amber:q.status==="IN PROGRESS"?"#333":"#666",padding:"4px 10px",borderRadius:"2px",fontWeight:700}}>{q.status}</span>
            </div>
            <p style={{fontSize:"13px",color:T.mid,lineHeight:1.65,marginBottom:"10px"}}>{q.desc}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"8px"}}>
              <div style={{display:"flex",flexWrap:"wrap"}}>{q.tags.map(t=><Tag key={t} amber>{t}</Tag>)}</div>
              <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"10px",color:T.amber,letterSpacing:"2px",fontWeight:700,flexShrink:0}}>{q.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InventoryPanel() {
  return (
    <div>
      <SectionHeader label="INVENTORY — TOOLS & TECH" />
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"1px",border:`1px solid ${T.border}`,borderRadius:"4px",overflow:"hidden",background:T.border}}>
        {INVENTORY.map((item,i)=>(
          <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"22px 12px",background:T.bgCard,gap:"10px",transition:"background 0.2s",cursor:"default",animation:`pIn 0.3s ease ${i*0.06}s both`}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(212,160,23,0.08)"}
            onMouseLeave={e=>e.currentTarget.style.background=T.bgCard}>
            <div style={{fontSize:"36px",lineHeight:1}}>{item.icon}</div>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"9px",color:T.dark,letterSpacing:"1.5px",fontWeight:700,textAlign:"center"}}>{item.name}</div>
            <Stars filled={item.filled} total={item.stars} size={13}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AVATAR CARD ───────────────────────────────────────────────────────────────
function AvatarCard() {
  return (
    <div style={{border:`1px solid ${T.amberMid}`,borderRadius:"6px",background:T.bgPanel,overflow:"hidden",fontFamily:"'Rajdhani',sans-serif"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 12px",borderBottom:`1px solid ${T.border}`,background:"rgba(212,160,23,0.05)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <div style={{width:6,height:6,background:T.amber,borderRadius:"50%",animation:"pulse 2s infinite"}}/>
          <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7.5px",color:T.amber,letterSpacing:"2px"}}>[ REC ] AGENT FILE</span>
        </div>
        <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"6.5px",color:T.muted,letterSpacing:"1px"}}>CLASSIFICATION: HUMAN</span>
      </div>

      {/* Avatar */}
      <div style={{position:"relative",background:`linear-gradient(180deg,#2a2a35 0%,#1a1a22 60%,#0e0e12 100%)`,aspectRatio:"3/4",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
        {/* Corner marks */}
        {[{top:8,left:8},{top:8,right:8},{bottom:8,left:8},{bottom:8,right:8}].map((pos,ci)=>{
          const lines = [
            [{x1:0,y1:12,x2:0,y2:0},{x1:0,y1:0,x2:12,y2:0}],
            [{x1:16,y1:12,x2:16,y2:0},{x1:16,y1:0,x2:4,y2:0}],
            [{x1:0,y1:4,x2:0,y2:16},{x1:0,y1:16,x2:12,y2:16}],
            [{x1:16,y1:4,x2:16,y2:16},{x1:16,y1:16,x2:4,y2:16}],
          ][ci];
          return(
            <svg key={ci} width="16" height="16" viewBox="0 0 16 16" style={{position:"absolute",...pos}}>
              {lines.map((l,li)=><line key={li} {...l} stroke={T.amber} strokeWidth="1.5"/>)}
            </svg>
          );
        })}
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"8px"}}>
          <div style={{width:"72px",height:"72px",borderRadius:"50%",border:`2px solid ${T.amberMid}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"28px",background:"rgba(255,255,255,0.05)"}}>👤</div>
          <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:"rgba(212,160,23,0.4)",letterSpacing:"3px"}}>AVATAR</div>
        </div>
      </div>

      {/* Info */}
      <div style={{padding:"14px 14px 10px"}}>
        <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"15px",color:T.dark,fontWeight:700,letterSpacing:"0.5px",marginBottom:"8px"}}>❮ Hajid N Atthousi ❯</div>
        <div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"12px",flexWrap:"wrap"}}>
          <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",background:T.amber,color:"#fff",padding:"2px 7px",letterSpacing:"1px",fontWeight:700}}>ROLE</span>
          <span style={{fontSize:"12px",color:T.mid}}>AI Audit Innovator</span>
          <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",background:T.dark,color:"#fff",padding:"2px 7px",letterSpacing:"1px",fontWeight:700}}>CLASS</span>
          <span style={{fontSize:"12px",color:T.mid}}>Engineer</span>
        </div>
        <Stars filled={5} total={5} size={18}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"12px",marginBottom:"2px"}}>
          <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:T.muted,letterSpacing:"1.5px"}}>ID: LDN-007</span>
          <div style={{display:"flex",gap:"3px"}}>
            {[1,2,3,4,5].map(s=><div key={s} style={{width:7,height:7,background:s<=4?T.amber:"rgba(212,160,23,0.2)",borderRadius:"1px"}}/>)}
          </div>
          <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:"7px",color:T.muted,letterSpacing:"1.5px"}}>BASE: LONDON</span>
        </div>
      </div>

      {/* Social icons */}
      <div style={{display:"flex",justifyContent:"center",gap:"12px",padding:"10px 14px 14px",borderTop:`1px solid ${T.border}`}}>
        {[
          {title:"GitHub", path:"M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z", fill:T.dark},
          {title:"LinkedIn", path:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z", fill:"#0A66C2"},
          {title:"Email", path:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z", fill:T.dark},
        ].map(({title,path,fill})=>(
          <div key={title} title={title} style={{cursor:"pointer",width:"32px",height:"32px",border:`1px solid ${T.border}`,borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center",background:T.bgCard,transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.amber;e.currentTarget.style.background="rgba(212,160,23,0.1)";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.background=T.bgCard;}}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={fill}><path d={path}/></svg>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
const PANELS = { profile:ProfilePanel, skills:SkillsPanel, quests:QuestsPanel, inventory:InventoryPanel };

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("profile");
  const Panel = PANELS[activeTab];

  return (
    <div style={{background:T.bg,minHeight:"100vh",fontFamily:"'Rajdhani',sans-serif",color:T.mid}}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:${T.bgCard};}
        ::-webkit-scrollbar-thumb{background:${T.amberMid};border-radius:2px;}
        @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
        @keyframes pIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes mmIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:translateX(0)}}
      `}</style>

      <div style={{maxWidth:"1180px",margin:"0 auto",padding:"24px 16px",display:"grid",gridTemplateColumns:"270px 96px 1fr",gap:"14px",minHeight:"100vh",alignItems:"start"}}>

        {/* COL 1 — Avatar */}
        <div style={{position:"sticky",top:"24px"}}>
          <AvatarCard/>
        </div>

        {/* COL 2 — Hex Nav */}
        <div style={{position:"sticky",top:"24px",display:"flex",flexDirection:"column",alignItems:"center",paddingTop:"12px"}}>
          <HexNav active={activeTab} setActive={setActiveTab}/>
        </div>

        {/* COL 3 — Content */}
        <div style={{border:`1px solid ${T.border}`,borderRadius:"6px",background:T.bgPanel,boxShadow:"0 2px 20px rgba(180,150,80,0.08)"}}>
          {/* Panel top bar */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 18px",borderBottom:`1px solid ${T.border}`,background:"rgba(212,160,23,0.04)"}}>
            <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:"10px",color:T.amber,letterSpacing:"3px",fontWeight:700}}>
              {TABS.find(t=>t.id===activeTab)?.label}
            </div>
            <div style={{display:"flex",gap:"6px"}}>
              {["◈","◎","△"].map((s,i)=><span key={i} style={{color:T.amber,opacity:0.2+i*0.15,fontSize:"8px"}}>{s}</span>)}
            </div>
          </div>
          {/* Content */}
          <div key={activeTab} style={{padding:"20px 18px",animation:"slideIn 0.28s ease",maxHeight:"calc(100vh - 90px)",overflowY:"auto"}}>
            <Panel/>
          </div>
        </div>

      </div>
    </div>
  );
}
