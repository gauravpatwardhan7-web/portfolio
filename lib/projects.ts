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
  users: string;              // who this is for
  problem: string;            // the user problem, in the user's terms
  decisions: string[];        // product decisions and tradeoffs made
  flow: FlowStage[];
  stack: { category: string; items: string }[];
  stats: { value: string; label: string }[];
  pmSignals: string[];        // what this demonstrates about product judgment
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
    subtitle: "One place to decide where to live in Bengaluru — before signing a lease",
    users:
      "People relocating to Bengaluru — new joiners, transferees, anyone choosing a neighborhood in a city they don't know yet.",
    problem:
      "Choosing where to live in an unfamiliar city is a high-stakes decision made with terrible information. Renters juggle five browser tabs of outdated listings, paywalled livability reports, and word-of-mouth — then commit to a 12-month lease anyway. The job to be done: compare neighborhoods on what actually matters (rent, commute, amenities, weather) in one trustworthy view.",
    decisions: [
      "Scoped the MVP to the decision, not the search: comparison and scoring of 100+ neighborhoods rather than yet another listings site",
      "Chose transparent algorithmic scoring (schools, hospitals, supermarkets, commute zones) over editorial rankings — users can see why a neighborhood scores what it does",
      "Prioritized data freshness as a trust feature: nightly automated refresh across 4+ live sources, because stale data is why users abandon existing tools",
      "Map-first interaction — click a neighborhood, drill into rentals and scores — because location decisions are spatial, not tabular",
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
    ],
    stats: [
      { value: "100+", label: "neighborhoods scored" },
      { value: "4+", label: "live data sources" },
      { value: "Nightly", label: "data refresh" },
      { value: "Live", label: "deployed on Vercel" },
    ],
    pmSignals: [
      "Problem-first: started from my own relocation pain, validated it's shared, then scoped to the core decision",
      "Trust as the differentiator: freshness and transparent scoring, not more features",
      "Shipped and live — a product in users' hands, not a prototype deck",
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
    id: "certification-coach",
    tier: 1,
    label: "AI Product · Accessibility",
    title: "Inclusive Certification Coach",
    subtitle:
      "Certification prep that adapts to how you learn — built for employees the standard training path leaves behind",
    users:
      "Employees with accessibility needs (neurodivergent, cognitive, low-vision) preparing for certifications — plus their managers, who need progress visibility without violating the learner's privacy.",
    problem:
      "Enterprise certification training treats every learner identically. For employees with accessibility needs, that means plans that ignore cognitive load, calendars with no realistic study time, multiple-choice tests that measure recognition instead of understanding, and forgetting curves nobody accounts for. Certifications stall — and the learner gets blamed.",
    decisions: [
      "Diagnosed three root causes of stalled certifications — time scarcity, shallow testing, forgetting — and shipped a distinct product affordance for each, instead of one generic 'AI tutor'",
      "Calendar Negotiator refuses infeasible plans with evidence-backed pushback rather than guilt-tripping the learner — honest timelines over engagement metrics",
      "Teach-back assessment grades learners on explaining concepts (Socratic questioning), a deliberate tradeoff of grading complexity for measuring real understanding",
      "Consent is a product boundary, not a setting: learners control what managers see, and redaction is enforced in code — the Advocate agent drafts manager notes on the learner's behalf",
      "Trust through transparency: every AI decision shows its retrieved sources, citations, and deliberation, and the system escalates to a human coach after three stalled remediation attempts",
    ],
    flow: [
      { items: ["Learner"], sub: "Streamlit + narrator" },
      { items: ["Curator", "Study Plan", "Calendar Negotiator"], sub: "plan" },
      { items: ["Assess → Remediate"], sub: "bounded loop" },
      { items: ["Orchestrator"], sub: "advance / loop / escalate" },
      { items: ["Manager Insights", "Advocate"], sub: "consent-redacted" },
    ],
    stack: [
      { category: "Agents", items: "8 cooperative agents, hybrid symbolic + LLM reasoning" },
      { category: "AI", items: "Azure AI o4-mini, Azure AI Search grounding with citations" },
      { category: "Quality", items: "72 gold-set checks across 8 suites, decisions verified 3×" },
      { category: "Interface", items: "Streamlit + screen-reader-friendly Accessibility Narrator" },
      { category: "Data", items: "Fully synthetic — privacy by design, no PII" },
    ],
    stats: [
      { value: "8", label: "cooperative agents" },
      { value: "72", label: "evaluation checks" },
      { value: "3×", label: "decision verification" },
      { value: "MS Agents League", label: "reasoning track entry" },
    ],
    pmSignals: [
      "Segment insight: found an underserved user group inside a 'solved' product category",
      "Multi-stakeholder design: learner, manager, and human coach each get what they need without compromising the others",
      "Ethical tradeoffs made explicit: consent boundaries and honest pushback are features, not disclaimers",
      "Quality as a product requirement: shipped with an evaluation harness, not just a demo",
    ],
    links: [
      {
        label: "Watch demo →",
        href: "https://youtu.be/aNrbi3qeOe0",
        primary: true,
      },
      {
        label: "View repository →",
        href: "https://github.com/gauravpatwardhan7-web/inclusive-certification-coach",
      },
    ],
    videoId: "aNrbi3qeOe0",
  },
  {
    id: "gym-coach",
    tier: 2,
    label: "AI Product",
    title: "Fitness Progress Coach",
    subtitle: "An AI coach that knows your training history — inside the app you already use daily",
    users:
      "Lifters following a structured programme who want coaching feedback grounded in their own history, not generic fitness-app advice.",
    problem:
      "Fitness apps fail at two moments: logging (tedious forms kill the habit) and coaching (generic tips that ignore what you did last week). The user need is a coach with memory — one that references your actual last four sessions, spots your plateau, and tells you what to change. No mainstream app connects logging friction and contextual feedback.",
    decisions: [
      "Met users where they are: Telegram instead of a new app — zero-install distribution and logging that fits an existing habit loop",
      "Reduced logging to one keyword: text 'chest' and get your pre-filled template back — friction is the retention killer, so the whole UX is built around removing it",
      "Constrained the AI on purpose: session counts and plateau flags are computed in code before the model sees them, so the coach can't hallucinate your progress",
      "Gave the coach a persona with a strict priority order ('Marcus' — direct, data-driven) to prevent the generic-LLM-advice failure mode",
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
    ],
    stats: [
      { value: "1", label: "keyword to log a workout" },
      { value: "4", label: "sessions of context per exercise" },
      { value: "Daily", label: "real usage" },
      { value: "Live", label: "active on Telegram" },
    ],
    pmSignals: [
      "Retention thinking: identified logging friction as the real churn driver and designed the whole product around it",
      "AI product judgment: guardrails computed in code, persona constraints against generic output",
      "Dogfooding with honesty: runs daily on my own training, known bugs documented openly",
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
    label: "Automation Product",
    title: "For Job Hunt",
    subtitle: "Give job seekers their 2–3 hours a day back",
    users:
      "Job seekers in India hunting HR/talent roles across fragmented job boards — starting with one very motivated user: me.",
    problem:
      "Job hunting in India means manually checking Naukri, LinkedIn, Indeed, SmartRecruiters, and Workday every single day. That's 2–3 hours of repetitive scanning before a single application is written — and the cost of missing a fresh posting is real. The job to be done: see only the relevant new openings, twice a day, with zero effort.",
    decisions: [
      "Defined success as trust in the digest: if users still feel they must check the boards themselves, the product has failed — so relevance ranking and deduplication got the most design attention",
      "Blended ranking (60% keyword match + 40% GPT semantic score) to balance precision against the cost of a missed match — pure keyword filtering threw away too many good roles",
      "Chose email at 9 AM and 6 PM IST over a dashboard: meet the user in their inbox at the moments they'd naturally check, with color-coded relevance for 10-second triage",
      "3-day deduplication window because repeated listings destroy trust in an alert product faster than missing ones",
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
      { category: "Delivery", items: "GitHub Actions schedule, HTML email via Gmail" },
    ],
    stats: [
      { value: "2–3 hrs", label: "saved per user per day" },
      { value: "5+", label: "job boards covered" },
      { value: "2×", label: "daily digest" },
      { value: "3-day", label: "dedup window" },
    ],
    pmSignals: [
      "Quantified the pain before building: 2–3 hours a day was the metric the product had to beat",
      "Precision/recall tradeoffs treated as product decisions, not just tuning",
      "Built for one user, abstracted for many — the classic wedge",
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
    label: "Developer Product",
    title: "Claude Token Efficiency",
    subtitle: "Show developers whether they're using Claude Code well — from data they already have",
    users:
      "Claude Code users who want to know if their session habits are efficient — cache hit rate, context utilization — without sending data anywhere.",
    problem:
      "Claude Code writes rich session data to local JSON files, but no one reads them. Developers can't see their cache hit rate or how much of the 200K context window they actually use — so they can't improve. The insight: the data already exists; the product gap is making it legible.",
    decisions: [
      "Zero-friction adoption as the core requirement: no API calls, no auth, no pip installs — anything heavier and developers won't bother for an analytics tool",
      "Objective facts only, no subjective scoring: report the numbers, let the developer judge — credibility over gamification",
      "Distribution inside the workflow: ships as a Claude Code skill (/token-efficiency), so the insight is one command away instead of a separate tool to remember",
      "Privacy as a feature: fully offline, nothing leaves the machine — a hard requirement for a tool reading your work sessions",
    ],
    flow: [
      { items: ["stats-cache.json", "session-meta/*.json", "facets/*.json"], sub: "local ~/.claude/ files" },
      { items: ["Python analyzer"], sub: "zero dependencies" },
      { items: ["Cache hit rate", "Capacity %", "Session stats"], sub: "console report" },
    ],
    stack: [
      { category: "Language", items: "Pure Python 3.7+ (zero external dependencies)" },
      { category: "Data source", items: "3 local ~/.claude/ JSON files" },
      { category: "Distribution", items: "Claude Code skill + standalone CLI" },
      { category: "Privacy", items: "Fully offline — no network, no auth" },
    ],
    stats: [
      { value: "0", label: "setup steps beyond install" },
      { value: "0", label: "external dependencies" },
      { value: "200K", label: "context window tracked" },
      { value: "Offline", label: "nothing leaves your machine" },
    ],
    pmSignals: [
      "Found the product gap in existing data: the value was legibility, not new instrumentation",
      "Adoption friction treated as the #1 risk and designed to zero",
      "Measurement mindset: you can't improve what you don't track",
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
