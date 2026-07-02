"use client";

import { useState } from "react";

const skills = [
  {
    label: "Product",
    items: [
      "Product Strategy",
      "Roadmapping",
      "Product Discovery",
      "PRD Writing",
      "Sprint Planning",
      "Stakeholder Management",
      "JTBD",
      "RICE Prioritization",
      "Go-to-Market",
    ],
  },
  {
    label: "AI",
    items: [
      "AI Agents",
      "RAG",
      "Model Evaluation",
      "MCP",
      "Prompt Engineering",
      "Claude Code",
    ],
  },
  {
    label: "Technical",
    items: [
      "Python",
      "SQL",
      "REST APIs",
      "Power BI",
      "Databricks",
      "Figma",
      "JIRA · ADO",
    ],
  },
];

type TimelineItem = {
  role: string;
  period: string;
  points: string[];
  link?: { label: string; href: string };
};

const timeline: TimelineItem[] = [
  {
    role: "Shell — Emerging Architect, Subsurface & Wells",
    period: "Dec 2025 – Present",
    points: [
      "Built a two-stage Claude agent for 22 legacy Petrel plugins — cut the annual SDK upgrade cycle from 6–8 sprints to 4–5 days per plugin (~95%)",
      "Defined a Python-native replacement for the subsurface data broker, cutting 4 middleware hops to 1",
      "Wrote the platform's product principles and directed an agent-built MVP through spec-driven development",
    ],
  },
  {
    role: "Shell — Product Manager, EV Charging Operations",
    period: "2024 – 2025",
    points: [
      "Shipped Alert Grouping & Prioritization — cut operator alert volume by ~80%",
      "Onboarded Switzerland and Singapore from kickoff to live operations",
      "Validated Autoheal's business case: recurring-fault resolution from 900 to 36 minutes",
      "Ran discovery across 15+ market operators — delivered 5+ features and 10+ roadmap items",
    ],
    link: { label: "Read the case study →", href: "/case-studies/evec-alert-grouping" },
  },
  {
    role: "Startups & Internships",
    period: "2022 – 2024",
    points: [
      "FinRight — shipped a credit card recommendation engine: benchmarked 300+ cards, wrote the PRDs and wireframes",
      "IDFC First Bank — streamlined vendor onboarding, cutting turnaround time 20%",
      "Exly — carried revenue and retention targets in sales and customer success",
    ],
  },
  {
    role: "MBA — Marketing & Data Sciences, NMIMS Mumbai",
    period: "2022 – 2024",
    points: [
      "Runner up — Microsoft PM Engage, awarded a pre-placement interview with Microsoft",
      "Led a 90+ member placement team serving 1,500+ students and 100 recruiters",
    ],
  },
  {
    role: "Eaton — Project Manager & NPD Engineer",
    period: "2018 – 2021",
    points: [
      "Pitched and launched 2 products with $4M projected revenue, winning Decision Gate approval as Project Manager",
      "Co-invented bypass switching technology (US patent) — 2× E-Star Awards",
      "Cut prototyping and validation turnaround 30% using Lean Six Sigma",
    ],
  },
  {
    role: "Mechanical Engineering — WCE Sangli",
    period: "2014 – 2018",
    points: [
      "Learned to solve problems by making things, not just analyzing them",
      "Born and raised in CSN, teacher parents",
    ],
  },
];

const threeCol = [
  {
    label: "Awards",
    items: [
      "Shell Special Recognition Award — EVEC delivery, 2025",
      "Microsoft PM Engage — Runner-up, 2022",
      "2× Eaton E-Star Awards",
    ],
  },
  {
    label: "Certifications",
    items: ["KPMG Lean Six Sigma", "Data Analytics & Visualisation", "Product Management"],
  },
  {
    label: "Career Interests",
    items: ["AI Product Management", "Platform & B2B Products", "Agentic AI"],
  },
];

export default function About() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard?.writeText("gauravpatwardhan7@gmail.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "50", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-sm transition-colors px-0 py-2"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            ← Work
          </a>
          <nav className="flex items-center gap-1">
            {[
              { label: "Resume", href: "/Gaurav-Patwardhan-Resume.pdf" },
              { label: "GitHub", href: "https://github.com/gauravpatwardhan7-web" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/patwardhangaurav/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors"
                style={{ color: "var(--foreground)", fontSize: "15px", padding: "10px 14px", display: "block" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="font-medium transition-colors"
              style={{ color: "var(--foreground)", fontSize: "15px", padding: "10px 14px", display: "block" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onClick={handleEmailClick}
            >
              {emailCopied ? "Copied!" : "Email"}
            </a>
          </nav>
        </div>
      </header>
      <div className="h-[69px]" />

      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* Hero */}
        <section className="pt-8 md:pt-12 pb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="flex-1">
            <p className="font-mono text-sm mb-4" style={{ color: "var(--accent)" }}>
              — Bengaluru, India
            </p>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight mb-6">
              Gaurav Patwardhan
            </h1>
            <p className="text-lg md:text-xl max-w-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
              Product manager with 5 years of experience across AI, EV charging, and
              industrial products — currently building AI-first products at Shell. I
              specialize in product discovery, roadmap ownership, and shipping AI agent
              products from spec to production, working hands-on with engineering,
              operations, and global stakeholders.
            </p>
            <a
              href="/Gaurav-Patwardhan-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 font-mono text-sm transition-colors"
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
            >
              Download resume (PDF) →
            </a>
          </div>

          {/* 2x2 photo collage */}
          <div className="flex-shrink-0" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", width: "300px" }}>
            {[
              { src: "/About-me-1.jpg", alt: "Gaurav Patwardhan smiling in a car" },
              { src: "/About-me-2.jpg", alt: "Gaurav bouldering on an indoor climbing wall" },
              { src: "/About-me-3.jpg", alt: "Gaurav watching a sunset at the beach" },
              { src: "/About-me-4.jpg", alt: "Gaurav hiking on a misty trail" },
            ].map((photo) => (
              <div key={photo.src} style={{ width: "148px", height: "148px", overflow: "hidden" }}>
                <img src={photo.src} alt={photo.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Skills */}
        <section className="py-6 md:py-8">
          <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: "var(--muted)" }}>
            Skills
          </p>
          <div className="space-y-3">
            {skills.map((group) => (
              <div key={group.label} className="flex flex-col md:flex-row gap-2 md:gap-4">
                <span
                  className="font-mono text-xs uppercase tracking-widest md:w-24 flex-shrink-0 md:pt-1.5"
                  style={{ color: "var(--accent)" }}
                >
                  {group.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs px-3 py-1 border whitespace-nowrap"
                      style={{ borderColor: "var(--border)", color: "var(--foreground)", background: "var(--surface)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Career Timeline */}
        <section className="py-8 md:py-10">
          <p className="font-mono text-xs uppercase tracking-widest mb-8" style={{ color: "var(--muted)" }}>
            Career
          </p>
          {timeline.map((item, i) => (
            <div
              key={i}
              className="py-2"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              <div className="flex flex-col md:grid md:grid-cols-6 gap-1 md:gap-6">
                <div className="md:col-span-2">
                  <p className="font-semibold text-base leading-snug">{item.role}</p>
                </div>
                <div className="md:col-span-1">
                  <p className="font-mono text-sm mt-1 md:mt-0.5" style={{ color: "var(--accent)" }}>
                    {item.period}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:col-span-3">
                  <ul className="space-y-1">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {item.link && (
                    <a
                      href={item.link.href}
                      className="inline-block mt-2 font-mono text-sm transition-colors"
                      style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                      onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    >
                      {item.link.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Three-column block */}
        <section className="py-4">
          <div
            className="grid-fix md:grid-cols-3"
            style={{ border: "1px solid var(--border)" }}
          >
            {threeCol.map((col, i) => (
              <div
                key={col.label}
                className={`p-3 ${i < 2 ? "border-b md:border-b-0 md:border-r" : ""}`}
                style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              >
                <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--accent)" }}>
                  {col.label}
                </p>
                <ul className="space-y-0.5">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-snug" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 md:pb-20">
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Want to build something together?{" "}
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="font-mono text-sm transition-colors"
              style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onClick={handleEmailClick}
            >
              {emailCopied ? "Copied!" : "gauravpatwardhan7@gmail.com"}
            </a>
          </p>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between gap-3">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            Gaurav Patwardhan · {new Date().getFullYear()}
          </span>
          <div className="flex gap-4">
            <a href="/" className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >Work</a>
            <a href="https://www.linkedin.com/in/patwardhangaurav/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >LinkedIn</a>
            <a href="https://github.com/gauravpatwardhan7-web" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
