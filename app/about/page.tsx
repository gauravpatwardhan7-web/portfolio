"use client";

import { useState } from "react";

const timeline = [
  {
    role: "Shell — Graduate Program",
    period: "2024 – Present",
    points: [
      "Custom AI Agents and Implementation",
      "Market Insights & Feature Development",
      "Global Market Onboarding",
      "Product Delivery & Communication",
    ],
  },
  {
    role: "Startups",
    period: "2022 – 2024",
    points: [
      "FinRight — Built Credit Card Recommendation Product",
      "Exly — Sales and Customer Success",
    ],
  },
  {
    role: "MBA — Marketing & Data Sciences, NMIMS Mumbai",
    period: "2022 – 2024",
    points: [
      "Digital Solutions Intern, IDFC First Bank",
      "Runner up — Microsoft PM Engage",
      "Corporate Relations and Placements",
    ],
  },
  {
    role: "Eaton — Project Manager & NPD Engineer",
    period: "2018 – 2021",
    points: [
      "Launched 2 products with $3M in sales",
      "Filed 2 patent applications",
      "Project Manager and NPD Engineer",
    ],
  },
  {
    role: "Mechanical Engineering — WCE Sangli",
    period: "1996 – 2018",
    points: ["Born and raised in CSN", "Teacher parents"],
  },
];

const threeCol = [
  {
    label: "Certifications",
    items: ["KPMG Lean Six Sigma", "Data Analytics & Visualisation", "Product Management"],
  },
  {
    label: "Skills",
    items: ["PowerBI · Tableau", "Excel · Python · SQL", "Figma · JIRA · ADO"],
  },
  {
    label: "Career Interests",
    items: ["Product Management", "Business Consulting", "Agentic AI"],
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
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="font-mono text-sm transition-colors"
            style={{ color: "var(--muted)" }}
            onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
          >
            ← Work
          </a>
          <nav className="flex gap-4 md:gap-6">
            <a
              href="https://github.com/gauravpatwardhan7-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/patwardhangaurav/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              LinkedIn
            </a>
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
              onClick={handleEmailClick}
            >
              {emailCopied ? "Copied!" : "Email"}
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-16 md:pb-20">
          <p className="font-mono text-sm mb-6" style={{ color: "var(--accent)" }}>
            — Bengaluru, India
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight mb-6">
            Gaurav Patwardhan
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl" style={{ color: "var(--muted)" }}>
            Emerging Architect, SSW · Product Manager / Builder
          </p>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Career Timeline */}
        <section className="py-14 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest mb-10" style={{ color: "var(--muted)" }}>
            Career
          </p>
          <div>
            {timeline.map((item, i) => (
              <div
                key={i}
                className="py-6"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {/* Mobile: stacked. Desktop: 4-col grid */}
                <div className="flex flex-col md:grid md:grid-cols-4 gap-2 md:gap-8">
                  <div className="md:col-span-2">
                    <p className="font-semibold text-base leading-snug">{item.role}</p>
                  </div>
                  <div>
                    <p className="font-mono text-sm mt-1 md:mt-0" style={{ color: "var(--accent)" }}>
                      {item.period}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <ul className="space-y-1">
                      {item.points.map((pt, j) => (
                        <li key={j} className="flex gap-2 text-sm" style={{ color: "var(--muted)" }}>
                          <span style={{ color: "var(--accent)" }} className="flex-shrink-0">—</span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--border)" }} />
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Three-column block */}
        <section className="py-14 md:py-20">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px"
            style={{ background: "var(--border)" }}
          >
            {threeCol.map((col) => (
              <div key={col.label} className="p-6 md:p-8" style={{ background: "var(--surface)" }}>
                <p
                  className="font-mono text-xs uppercase tracking-widest mb-5"
                  style={{ color: "var(--accent)" }}
                >
                  {col.label}
                </p>
                <ul className="space-y-3">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm" style={{ color: "var(--muted)" }}>
                      <span style={{ color: "var(--accent)" }} className="flex-shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between gap-4">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            Gaurav Patwardhan · {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <a href="/" className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              Work
            </a>
            <a
              href="https://www.linkedin.com/in/patwardhangaurav/"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              LinkedIn
            </a>
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="font-mono text-xs transition-colors" style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              gauravpatwardhan7@gmail.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
