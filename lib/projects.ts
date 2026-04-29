export type FlowStage = {
  items: string[];   // one item = single node, multiple = stacked grouped inputs
  sub?: string;      // small label shown below
};

export type Project = {
  id: string;
  tier: 1 | 2 | 3 | 4;
  label: string;
  title: string;
  subtitle: string;
  problem: string;
  howItWorks: string[];
  flow: FlowStage[];
  stack: { category: string; items: string }[];
  stats: { value: string; label: string }[];
  collaborationSignals: string[];
  links: { label: string; href: string; primary?: boolean }[];
  videoId?: string;
  image?: string;
  imageNarrow?: boolean;
  images?: string[];
};

export const projects: Project[] = [
  {
    id: "blr-neighborhood",
    tier: 1,
    label: "Consumer Product",
    title: "BLR Neighborhood Explorer",
    subtitle: "A data-driven neighborhood comparison engine for Bengaluru",
    problem:
      "Moving to a new city is painful. Existing tools are outdated, scattered across 5 tabs, or behind paywalls. You need one place to understand neighborhoods — livability, rentals, amenities, commute times, weather — before signing a lease.",
    howItWorks: [
      "Aggregates 4+ live data sources: NoBroker rentals, Overpass API (OSM), OpenWeatherMap, custom livability scoring",
      "Scores 100+ Bengaluru neighborhoods algorithmically: proximity to schools, hospitals, supermarkets, commute zones",
      "Renders interactive maps with MapLibre GL — click any neighborhood to drill into rental listings and scores",
      "Refreshes nightly via scheduled GitHub Actions data pipeline",
    ],
    flow: [
      { items: ["NoBroker", "OpenWeatherMap", "Overpass (OSM)"], sub: "live sources" },
      { items: ["Python pipeline"], sub: "nightly cron" },
      { items: ["Supabase"], sub: "PostgreSQL" },
      { items: ["Next.js API"], sub: "REST" },
      { items: ["MapLibre"], sub: "frontend" },
    ],
    stack: [
      { category: "Frontend", items: "Next.js, React, MapLibre GL, Tailwind CSS" },
      { category: "Backend", items: "Node.js API routes, Supabase PostgreSQL" },
      { category: "Data", items: "Python scraping, Overpass API, OpenWeatherMap" },
      { category: "Ops", items: "GitHub Actions (nightly refresh), Vercel" },
      { category: "Languages", items: "TypeScript 63% · Python 27% · JS 10%" },
    ],
    stats: [
      { value: "100+", label: "neighborhoods scored" },
      { value: "4+", label: "live data sources" },
      { value: "200+", label: "commits" },
      { value: "Live", label: "deployed on Vercel" },
    ],
    collaborationSignals: [
      "Full-stack data pipeline → backend → frontend, end to end",
      "Operational thinking: scheduled jobs, data freshness, pipeline reliability",
      "Consumer product instinct: what someone actually needs when moving cities",
      "Shipping mindset: deployed, live, not a prototype deck",
    ],
    links: [
      {
        label: "Visit live product →",
        href: "https://blr-neighborhood-explorer.vercel.app",
        primary: true,
      },
      {
        label: "View repository →",
        href: "https://github.com/gauravpatwardhan7-web/blr-neighborhood-explorer",
      },
    ],
    videoId: "DxLrKuRraxM",
  },
  {
    id: "gym-coach",
    tier: 2,
    label: "AI Agent",
    title: "Fitness Progress Coach",
    subtitle: "A Telegram-native AI coaching agent that knows your training history",
    problem:
      "Generic fitness apps don't know your programme. Manually tracking sets and weights is tedious, and none of it connects to coaching that actually references what you did last week. There's no tool that combines natural language logging with contextual AI feedback based on your specific history.",
    howItWorks: [
      "Text a keyword on Telegram (chest · back · shoulder · legs) and receive your pre-filled workout template instantly",
      "Fill in sets, reps, weight, RPE and reply — a code node parses the log and writes every exercise as a row in Google Sheets",
      "GPT-4o-mini fetches your last 4 sessions per exercise from Sheets, detects plateaus and PRs, and sends coaching feedback as Marcus — a direct, data-driven coach persona",
      "Anti-hallucination architecture: session counts and plateau/trend detection flags are computed in code nodes before the LLM sees the data — the model can only reference what it's explicitly given",
      "3-workflow n8n architecture: Router (webhook + switch), Template Sender, and Log & Coach — each workflow is independently maintainable",
    ],
    flow: [
      { items: ["Telegram"], sub: "trigger" },
      { items: ["Router"], sub: "webhook + switch" },
      { items: ["Template Sender", "Log & Coach"], sub: "keyword / workout" },
      { items: ["OpenAI parse", "Google Sheets"], sub: "extract + log" },
      { items: ['"Marcus" Coach'], sub: "GPT-4o-mini" },
      { items: ["Telegram reply"], sub: "feedback" },
    ],
    stack: [
      { category: "Automation", items: "n8n (3-workflow agent architecture)" },
      { category: "AI", items: "OpenAI GPT-4o-mini (parse + coaching)" },
      { category: "Interface", items: "Telegram Bot API (input + output)" },
      { category: "Storage", items: "Google Sheets (one row per exercise per session)" },
      { category: "Logic", items: "JavaScript code nodes (routing, parsing, anti-hallucination flags)" },
    ],
    stats: [
      { value: "3", label: "n8n workflows" },
      { value: "4", label: "workout splits tracked" },
      { value: "Live", label: "active on Telegram" },
      { value: "GPT-4o-mini", label: "coaching model" },
    ],
    collaborationSignals: [
      "AI agent design: parse-then-reason pattern, anti-hallucination via data validation in code before LLM",
      "Product thinking on constraints: Marcus persona has strict coaching priority order to prevent generic output",
      "No-code + code hybrid: n8n for orchestration, JavaScript nodes for logic that needs precision",
      "Real usage: built to solve a personal problem, runs daily, has known bugs documented honestly",
    ],
    links: [
      {
        label: "View on Notion →",
        href: "https://www.notion.so/AI-Gym-Coach-ba0f76cdad5b42c1b78eab6e8b524a9f",
        primary: true,
      },
    ],
    images: ["/AI-gym-coach-1.PNG", "/AI-gym-coach-2.PNG", "/AI-gym-coach-3.PNG"],
  },
  {
    id: "job-hunt",
    tier: 2,
    label: "Automation Tool",
    title: "For Job Hunt",
    subtitle: "Automated job search assistant for HR/talent roles in India",
    problem:
      "Job hunting in India means manually checking 5+ job boards every day — Naukri, LinkedIn, Indeed, SmartRecruiters, Workday. That's 2–3 hours of repetitive, soul-destroying work before you've even applied to anything.",
    howItWorks: [
      "Scrapes 5+ job boards daily using Selenium (JS-heavy sites) and BeautifulSoup",
      "Filters results by resume keywords, location preference (Bengaluru/Remote), and experience level",
      "Ranks output: 60% keyword match + 40% GPT-3.5 semantic confidence score",
      "Sends curated HTML email alerts at 9 AM and 6 PM IST, color-coded by relevance",
      "Deduplicates across a 3-day rolling window — no spam",
    ],
    flow: [
      { items: ["Naukri", "LinkedIn", "Indeed", "Workday"], sub: "job boards" },
      { items: ["Selenium / BS4"], sub: "scraping" },
      { items: ["Dedup + Filter"], sub: "Supabase + GPT-3.5" },
      { items: ["Top Matches", "Other Openings"], sub: "ranked by relevance" },
      { items: ["Email alert"], sub: "9 AM + 6 PM IST" },
    ],
    stack: [
      { category: "Scraping", items: "Selenium, BeautifulSoup4, LXML" },
      { category: "Intelligence", items: "OpenAI GPT-3.5 (semantic re-ranking)" },
      { category: "Data", items: "Supabase PostgreSQL (dedup + retention)" },
      { category: "Automation", items: "GitHub Actions (9 AM + 6 PM IST)" },
      { category: "Delivery", items: "SMTP via Gmail, HTML email templates" },
      { category: "Languages", items: "Python 55% · HTML 45%" },
    ],
    stats: [
      { value: "5+", label: "job boards monitored" },
      { value: "2×", label: "daily email delivery" },
      { value: "3-day", label: "deduplication window" },
      { value: "GPT-3.5", label: "semantic ranking" },
    ],
    collaborationSignals: [
      "Automation thinking: scheduled reliability, failure handling, deduplication",
      "Data engineering: multi-source scraping, transformation, structured storage",
      "Problem-first: built to solve a real personal pain, then abstracted to work for others",
      "Operational logic: how to handle freshness, ranking, and volume at scale",
    ],
    links: [
      {
        label: "View repository →",
        href: "https://github.com/gauravpatwardhan7-web/for-job-hunt",
        primary: true,
      },
    ],
    image: "/job-hunt-email.png",
  },
  {
    id: "token-efficiency",
    tier: 3,
    label: "Developer Tool",
    title: "Claude Token Efficiency",
    subtitle: "Honest token analytics for Claude Code — cache reuse, context utilization, session stats",
    problem:
      "Claude Code writes detailed session data to local JSON files — but nobody reads them. You don't know your cache hit rate, how much of your 200K context window you're actually using, or whether your session habits are efficient. If you can't measure it, you can't improve it.",
    howItWorks: [
      "Reads 3 local ~/.claude/ files: stats-cache.json, session-meta/*.json, and facets/*.json — no API calls, no auth, nothing leaves your machine",
      "Computes cache hit rate (% of tokens served from cache) and capacity utilization (% of 200K session window used on average)",
      "Surfaces session statistics: total sessions, min/max/average tokens, and a recent activity breakdown with per-session detail",
      "Objective facts only — no subjective scoring. Ships as a Claude Code skill (/token-efficiency) and standalone CLI with zero pip installs",
    ],
    flow: [
      { items: ["stats-cache.json", "session-meta/*.json", "facets/*.json"], sub: "local ~/.claude/ files" },
      { items: ["Python analyzer"], sub: "zero dependencies" },
      { items: ["Cache hit rate", "Capacity %", "Session stats"], sub: "console report" },
    ],
    stack: [
      { category: "Language", items: "Pure Python 3.7+ (zero external dependencies)" },
      { category: "Data source", items: "3 local ~/.claude/ JSON files (stats-cache, session-meta, facets)" },
      { category: "Distribution", items: "Claude Code skill (/token-efficiency) + standalone CLI" },
      { category: "Architecture", items: "Fully offline — no API calls, no network access, no auth" },
    ],
    stats: [
      { value: "0", label: "external dependencies" },
      { value: "200K", label: "context window tracked" },
      { value: "3", label: "data sources read" },
      { value: "Offline", label: "no network calls" },
    ],
    collaborationSignals: [
      "Measurement mindset: you can't improve what you don't track",
      "Developer empathy: tools that solve real friction in the dev workflow",
      "Pragmatic implementation: zero dependencies, ships as a one-liner install",
      "Observability thinking: instrumentation as a first-class concern",
    ],
    links: [
      {
        label: "View repository →",
        href: "https://github.com/gauravpatwardhan7-web/claude-token-efficiency",
        primary: true,
      },
    ],
    image: "/How-efficient.png",
    imageNarrow: true,
  },
];
