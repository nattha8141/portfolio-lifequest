// ╔══════════════════════════════════════════════════════════════╗
// ║  GAME PORTFOLIO CONFIG                                      ║
// ║  Edit this file to personalize your portfolio.              ║
// ║  This is the ONLY file you need to change.                  ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── THEME ──────────────────────────────────────────────────
// Change "accent" to shift the entire UI color.
// Try: "#64c8ff" (ice blue), "#ff6b6b" (fire red), "#a855f7" (purple),
//      "#4ade80" (green), "#f59e0b" (gold), "#f472b6" (pink), "#2dd4bf" (teal)
export const THEME = {
  accent: "#e8a849",
  accentRgb: "232, 168, 73", // RGB version of accent (for opacity variants)
  background: {
    primary: "#1e1e24",
    secondary: "#16161b",
    tertiary: "#0e0e12",
  },
  text: {
    primary: "#e8e4de",
    secondary: "#b8b8c0",
    muted: "#6a6a70",
  },
  panel: "#22222a",
  particles: {
    color: "232, 168, 73",
    count: 25,
  },
};

// ─── CHARACTER INFO ─────────────────────────────────────────
// Your basic profile. Appears on the left side next to the avatar.
export const CHARACTER = {
  name: "Hajid N Atthousi",
  title: "AI Audit Innovator",
  class: "", // Your "class" icon
  level: 28,
  hp: { current: 12450, max: 12450 },
  mp: { current: 840, max: 840 },
  exp: { current: 7200, max: 10000 },
};

// ─── SOCIAL LINKS ───────────────────────────────────────────
// Shown below the avatar. Leave empty string "" to hide any link.
export const SOCIALS = {
  github: "https://github.com/nattha8141",
  linkedin: "https://linkedin.com/in/hajid-naufal",
  twitter: "",
  email: "hajid.atthousi@gmail.com",
  website: "",
};

// ─── PROFILE (Profile Tab) ─────────────────────────────────
// Your "About Me" bio, traits, work experience, and education.
export const PROFILE = {
  bio: "Assistant Manager in Audit Innovation and Analytics with 5+ years of experience in audit transformation through GenAI-powered tools and automation. Currently pursuing an MSc in AI Applications and Innovation at Imperial College London to deepen expertise in AI-driven solutions.",
  traits: [
    "🍳 Foodie",
    "🎮 Gamer",
    "🐱 Cat person",
    "🌍 Explorer",
    "☕ Coffee addict",
  ],
  experience: [
    {
      role: "Assistant Manager, Audit Innovation and Analytics",
      org: "Grab Holdings Limited",
      period: "Oct 2024 – Sep 2025",
      desc: "Built automation workflows for Continuous Audit dashboards and NextGen Audit tools using KNIME Analytics, Power BI, and AWS Workspace. Developed GenAI-powered auditing tools transforming Internal Audit Group workflows. Led training sessions on analytics skills across departments.",
    },
    {
      role: "Specialist, Audit Innovation and Analytics",
      org: "Grab Holdings Limited",
      period: "Sep 2023 – Oct 2024",
      desc: "Utilized KNIME analytics software to support continuous audit development. Built innovative tools powered by generative AI to enhance auditor capabilities and efficiency.",
    },
    {
      role: "Staff, Audit Support and System Development",
      org: "Telkomsel",
      period: "Jun 2020 – Sep 2023",
      desc: "Evaluated feasibility of Continuous Audit implementation across business units. Built logical frameworks and scripts for multi-source data reconciliation. Created data visualizations for continuous monitoring.",
    },
    {
      role: "Staff, Information Technology",
      org: "Rajawali Telekomunikasi Selular",
      period: "Sep 2018 – Jun 2020",
      desc: "Assessed feasibility of IT solutions for new business initiatives. Represented IT team in stakeholder meetings for new contracts and business opportunities.",
    },
  ],
  education: [
    {
      degree: "MSc in AI Applications and Innovation",
      school: "Imperial College London",
      period: "2025 – Present",
    },
    {
      degree: "Bachelor of Engineering in Industrial Engineering",
      school: "Universitas Indonesia",
      period: "2014 – 2018",
    },
  ],
};

// ─── STATS (Profile Tab — radar chart + stat cards) ─────────
// Core ability scores. Keep 4–6 for best layout. value: 0–100.
export const STATS = [
  { name: "Data Analytics", value: 92, icon: "📊" },
  { name: "GenAI / AI", value: 85, icon: "🤖" },
  { name: "Audit", value: 95, icon: "🔍" },
  { name: "Python", value: 80, icon: "🐍" },
  { name: "Leadership", value: 88, icon: "🎯" },
  { name: "Communication", value: 90, icon: "💬" },
];

// ─── SKILLS (Skills Tab) ───────────────────────────────────
// Your skill categories. Click one to see details + tech tags.
// category: any label — "Primary", "Secondary", "Specialty", "Passive", etc.
// level: 1–10 (or null for passives / soft skills)
export const SKILLS = [
  {
    category: "Primary",
    title: "Audit Innovation & Analytics",
    desc: "Building automation workflows, continuous audit dashboards, and GenAI-powered tools that transform how internal audit teams operate.",
    techs: ["KNIME Analytics", "Power BI", "AWS Workspace", "Continuous Audit"],
    level: 9,
    maxLevel: 10,
  },
  {
    category: "Secondary",
    title: "AI & Machine Learning",
    desc: "Applying AI and machine learning techniques to solve real-world problems, from anomaly detection to generative AI audit tools.",
    techs: ["Python", "Machine Learning", "Deep Learning", "GenAI", "NLP"],
    level: 8,
    maxLevel: 10,
  },
  {
    category: "Specialty",
    title: "Data Engineering & Visualization",
    desc: "Designing data pipelines, reconciliation frameworks, and impactful visualizations for business intelligence and monitoring.",
    techs: ["SQL", "Power BI", "KNIME", "Data Reconciliation", "ETL"],
    level: 8,
    maxLevel: 10,
  },
  {
    category: "Specialty",
    title: "Cybersecurity",
    desc: "Certified Ethical Hacker with knowledge of security assessment, penetration testing, and IT risk evaluation.",
    techs: ["CEH", "Network Security", "Risk Assessment"],
    level: 6,
    maxLevel: 10,
  },
  {
    category: "Passive",
    title: "Design Thinking",
    desc: "Applies human-centered design methodology to solve complex problems, from audit tools to inclusive learning solutions.",
    techs: [],
    level: null,
    maxLevel: null,
  },
  {
    category: "Passive",
    title: "Cross-Functional Leadership",
    desc: "Leads training sessions and coordinates across departments, government institutions, and cross-functional teams.",
    techs: [],
    level: null,
    maxLevel: null,
  },
];

// ─── QUESTS (Quests Tab) ───────────────────────────────────
// Your projects as RPG quests.
// type: "Completed" | "In Progress" | "Daily"
// link: optional URL to project, repo, or live demo
export const QUESTS = [
  {
    name: "GenAI Audit Transformation",
    type: "Completed",
    desc: "Developed generative AI-powered tools that transformed Internal Audit Group workflows at Grab Holdings. Awarded Grab CEO Award 2025.",
    tags: ["GenAI", "Python", "Audit", "Automation"],
    reward: "CEO Award",
    link: "",
  },
  {
    name: "Continuous Audit Dashboards",
    type: "Completed",
    desc: "Built automation workflows for real-time operations monitoring and anomaly detection using KNIME Analytics, Power BI, and AWS.",
    tags: ["KNIME", "Power BI", "AWS", "Dashboard"],
    reward: "+900 EXP",
    link: "",
  },
  {
    name: "Government Investigation Support",
    type: "Completed",
    desc: "Provided critical data support during a nationwide government investigation involving the Audit Board of Indonesia and Criminal Investigation Agency.",
    tags: ["Data Analysis", "Compliance", "Audit"],
    reward: "+800 EXP",
    link: "",
  },
  {
    name: "Design Thinking Research",
    type: "Completed",
    desc: "Designed inclusive learning tools for hearing-impaired students using design thinking methodology. Awarded PITTA Grant for international publication.",
    tags: ["Design Thinking", "UX Research", "Accessibility"],
    reward: "PITTA Grant",
    link: "",
  },
  {
    name: "MSc AI at Imperial College",
    type: "In Progress",
    desc: "Pursuing MSc in AI Applications and Innovation at Imperial College London. Modules in ML, Deep Learning, IoT, and Robotics.",
    tags: ["AI", "Machine Learning", "Deep Learning", "IoT"],
    reward: "+2000 EXP",
    link: "",
  },
  {
    name: "Gamified Portfolio",
    type: "Daily",
    desc: "Building an immersive Arknights-inspired gamified portfolio to showcase career and skills.",
    tags: ["Next.js", "TypeScript", "Game UI"],
    reward: "+1000 EXP",
    link: "",
  },
];

// ─── INVENTORY (Inventory Tab) ─────────────────────────────
// Your tech stack as RPG items.
// type: "Weapon" (primary tools) | "Armor" (frameworks) | "Accessory" (utilities)
// rarity: 5 (legendary/gold) | 4 (epic/purple) | 3 (rare/blue) | 2 (uncommon/green)
export const INVENTORY = [
  { name: "Python", icon: "🐍", stars: 5, filled: 5 },
  { name: "KNIME", icon: "⚙️", stars: 5, filled: 5 },
  { name: "Power BI", icon: "📊", stars: 5, filled: 5 },
  { name: "AWS", icon: "☁️", stars: 5, filled: 4 },
  { name: "GenAI", icon: "🤖", stars: 5, filled: 5 },
  { name: "SQL", icon: "🗄️", stars: 5, filled: 4 },
  { name: "CEH", icon: "🔐", stars: 5, filled: 4 },
  { name: "Git", icon: "⚡", stars: 5, filled: 3 },
];

// ─── SKILL DOMAINS (Skills Tab — Mind Map) ─────────────────
export const DOMAINS = [
  { id: "engineering", label: "ENGINEERING", angle: -90, icon: "⚙", children: ["IT Audit", "Cyber Risk", "SDLC Review", "Data Analytics", "System Controls", "GenAI / AI"] },
  { id: "finance", label: "ECONOMICS", angle: -30, icon: "◈", children: ["Financial Audit", "Budget Review", "Cost Efficiency", "Revenue Assurance", "Treasury"] },
  { id: "compliance", label: "COMPLIANCE", angle: 30, icon: "▣", children: ["Regulatory", "SOX", "ISO 27001", "Risk Management", "Policy Review"] },
  { id: "ops", label: "OPERATIONS", angle: 90, icon: "△", children: ["Process Audit", "Supply Chain", "Procurement", "HR Controls", "Business Continuity"] },
  { id: "tech", label: "TECHNOLOGY", angle: 150, icon: "◇", children: ["Python", "SQL", "Power BI", "Data Viz", "Automation", "ML Basics"] },
  { id: "advisory", label: "ADVISORY", angle: 210, icon: "⬡", children: ["Fraud Detection", "ESG Audit", "Risk Advisory", "Training", "Stakeholder Mgmt"] },
];

// ─── AUDIT UNIVERSE (Skills Tab — cards) ───────────────────
export const AUDIT_UNIVERSE = [
  { id: "it", domain: "IT & CYBER", code: "AU-01", icon: "◈", tier: "CORE" as const, skills: ["IT General Controls", "Cybersecurity Risk", "SDLC Review", "Access Mgmt", "GenAI Risk", "Data Integrity"], desc: "End-to-end technology audit from infrastructure controls to AI governance." },
  { id: "fin", domain: "FINANCIAL", code: "AU-02", icon: "◎", tier: "CORE" as const, skills: ["Financial Reporting", "Revenue Assurance", "Cost Controls", "Treasury", "Budget Variance"], desc: "Financial integrity assurance across reporting, treasury, and budget control." },
  { id: "comp", domain: "COMPLIANCE", code: "AU-03", icon: "▣", tier: "CORE" as const, skills: ["Regulatory", "SOX Controls", "ISO 27001", "Policy Adherence", "AML / KYC", "Data Privacy"], desc: "Regulatory navigation and policy adherence across multiple frameworks." },
  { id: "ops", domain: "OPERATIONAL", code: "AU-04", icon: "△", tier: "EXTENDED" as const, skills: ["Process Efficiency", "Supply Chain", "Procurement Controls", "HR Compliance", "BCP"], desc: "Operational excellence review covering process design and resilience." },
  { id: "data", domain: "DATA & ANALYTICS", code: "AU-05", icon: "◇", tier: "EXTENDED" as const, skills: ["Data Analytics", "Python", "SQL", "Power BI", "Automation", "Statistical Sampling"], desc: "Technology-enabled audit using analytics and automation at scale." },
  { id: "adv", domain: "ADVISORY", code: "AU-06", icon: "⬡", tier: "SPECIALIST" as const, skills: ["Fraud Detection", "ESG Audit", "Risk Advisory", "Control Design", "Training & Dev"], desc: "Strategic advisory spanning fraud risk, ESG assurance, and capability building." },
];

// ─── AVATAR CONFIG ──────────────────────────────────────────
// When you have a .glb model from Avaturn / Ready Player Me,
// place it in /public/models/ and set useModel to true.
export const AVATAR = {
  modelPath: "/models/avatar.glb",
  useModel: true,
  fallbackEmoji: "🧑‍💻",
  animation: "idle",
};

// ─── TAB CONFIG ─────────────────────────────────────────────
// Which tabs appear and their order.
// id must match: "profile" | "skills" | "quests" | "inventory"
export const TABS = [
  { id: "profile", label: "PROFILE", icon: "◈", code: "01" },
  { id: "skills", label: "SKILLS", icon: "◇", code: "02" },
  { id: "quests", label: "QUESTS", icon: "△", code: "03" },
  { id: "inventory", label: "INVENTORY", icon: "▣", code: "04" },
];
