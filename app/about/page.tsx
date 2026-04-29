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
    ],
  },
  {
    role: "Mechanical Engineering — WCE Sangli",
    period: "2014 – 2018",
    points: [
      "Where the builder instinct started",
      "Born and raised in CSN, teacher parents",
    ],
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
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ position: "sticky", top: "0", zIndex: "50", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
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
              I started as an engineer, moved into corporate product work at Eaton, did an MBA,
              joined two startups, and now build AI products at Shell. At every stage I&apos;ve
              found myself wanting to actually make the thing — not just define it. That&apos;s
              what the projects on this site are.
            </p>
          </div>

          {/* 2x2 photo collage */}
          <div className="flex-shrink-0" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px", width: "300px" }}>
            {["/About-me-1.jpg", "/About-me-2.jpg", "/About-me-3.jpg", "/About-me-4.jpg"].map((src, i) => (
              <div key={i} style={{ width: "148px", height: "148px", overflow: "hidden" }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
              <div className="flex flex-col md:grid md:grid-cols-4 gap-1 md:gap-8">
                <div className="md:col-span-2">
                  <p className="font-semibold text-base leading-snug">{item.role}</p>
                </div>
                <div>
                  <p className="font-mono text-sm mt-1 md:mt-0.5" style={{ color: "var(--accent)" }}>
                    {item.period}
                  </p>
                </div>
                <div className="mt-2 md:mt-0">
                  <ul className="space-y-1">
                    {item.points.map((pt, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                        <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)" }} />
        </section>

        <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

        {/* Three-column block */}
        <section className="py-8 md:py-10">
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ border: "1px solid var(--border)" }}
          >
            {threeCol.map((col, i) => (
              <div
                key={col.label}
                className="p-4"
                style={{
                  background: "var(--surface)",
                  borderRight: i < 2 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: "var(--accent)" }}>
                  {col.label}
                </p>
                <ul className="space-y-1">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
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
