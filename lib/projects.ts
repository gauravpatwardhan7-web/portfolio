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
  users: string;              // WHO this is for
  problem: string;            // WHY — the pain points, in the user's terms
  what: string;               // WHAT the product is, in one or two sentences
  features: string[];         // WHAT — the product's key features
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
    what:
      "A map-first comparison engine that scores 100+ Bengaluru neighborhoods on rent, livability, amenities, and commute — refreshed nightly from live sources, free and open.",
    features: [
      "Interactive map of 100+ scored neighborhoods — click any area to drill into rentals, amenities, and scores",
      "Transparent livability scoring across schools, hospitals, supermarkets, and commute zones — you can see why an area scores what it does",
      "Live rental listings, weather, and commute estimates aggregated from 4+ sources",
      "Nightly automated data refresh — nothing on the map is stale",
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
    what:
      "An 8-agent AI coach that builds accommodation-aware study plans around real calendars, grades understanding through teach-back instead of multiple choice, and shares progress with managers only on the learner's terms.",
    features: [
      "Day-by-day study plans that respect your accommodations and real calendar gaps — with honest pushback when a deadline is infeasible",
      "Practice with cited questions, or explain concepts in your own words (teach-back)",
      "Spaced refreshers timed to your forgetting curve",
      "You control exactly what your manager sees — redaction enforced in code",
      "Screen-reader-friendly narrator for every output",
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
    what:
      "A Telegram coach: text one keyword to get your workout template, reply with your numbers, and get feedback grounded in your last four sessions — plateaus and PRs included.",
    features: [
      "Text a keyword (chest · back · shoulder · legs) and get your workout template instantly",
      "Reply with sets, reps, weight, RPE — logged automatically, one row per exercise",
      "Coaching feedback that references your last 4 sessions — plateaus and PRs flagged",
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
    what:
      "An automated scout that scrapes 5+ job boards, deduplicates and ranks openings against your resume, and lands a color-coded digest in your inbox twice a day.",
    features: [
      "Curated job digest in your inbox at 9 AM and 6 PM IST — no boards to check",
      "Openings ranked by fit: resume keyword match blended with GPT semantic scoring",
      "Color-coded relevance for 10-second triage; duplicates removed across a 3-day window",
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
];
