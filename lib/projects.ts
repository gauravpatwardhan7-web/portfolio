export type Project = {
  id: string;
  tier: 1 | 2 | 3 | 4;
  label: string;
  title: string;
  subtitle: string;
  problem: string;
  howItWorks: string[];
  diagram: string;
  stack: { category: string; items: string }[];
  stats: { value: string; label: string }[];
  collaborationSignals: string[];
  links: { label: string; href: string; primary?: boolean }[];
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
    diagram: `NoBroker      ┐
OpenWeatherMap ├─► Python pipeline ─► Supabase ─► Next.js API ─► MapLibre
Overpass (OSM) ┘     (nightly cron)     (PostgreSQL)   (REST)      (frontend)`,
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
    diagram: `Telegram msg → Router Workflow → Switch
  keyword (chest/legs/…) → Template Sender → Telegram reply
  workout log            → Log & Coach Workflow
                              ↓
                         OpenAI parse → Google Sheets (log)
                              ↓
                         Sheets (fetch history) → format + flags
                              ↓
                         OpenAI "Marcus" coach → Telegram reply`,
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
    diagram: `Naukri      ┐                        ┌─► Top Matches (email)
LinkedIn    ├─► Selenium/BS4 ─► Filter ─┤
Indeed      │   + dedup (Supabase)       └─► Other Openings (email)
Workday     ┘
                                GPT-3.5 semantic re-ranking (optional)`,
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
  },
  {
    id: "token-efficiency",
    tier: 3,
    label: "Developer Tool",
    title: "Claude Token Efficiency",
    subtitle: "Analytics tool for measuring and optimizing Claude Code usage",
    problem:
      "Every Claude Code session generates token usage data — but it's buried in local JSON files. No one knows their cache hit rate, how much of the context window they're burning, or when they're being inefficient. If you can't measure it, you can't optimize it.",
    howItWorks: [
      "Reads local ~/.claude/ session history (no API calls, completely offline)",
      "Computes cache hit rate, context window utilization, and wasted token analysis",
      "Surfaces session statistics: average tokens, productivity patterns, activity heatmaps",
      "Distributes as both a Claude Code skill (/token-efficiency) and standalone CLI",
    ],
    diagram: `~/.claude/sessions/*.json ─► Python analyzer ─► Console report
                                  (zero deps)       cache rate
                                                    context % used
                                                    session stats`,
    stack: [
      { category: "Language", items: "Pure Python 3.7+ (zero external dependencies)" },
      { category: "Data source", items: "Local ~/.claude/ JSON session files" },
      { category: "Distribution", items: "Claude Code skill + standalone CLI" },
      { category: "Architecture", items: "Fully offline, no API calls or network access" },
    ],
    stats: [
      { value: "0", label: "external dependencies" },
      { value: "200K", label: "context window analyzed" },
      { value: "Offline", label: "no network calls" },
      { value: "CLI + skill", label: "dual distribution" },
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
  },
];
