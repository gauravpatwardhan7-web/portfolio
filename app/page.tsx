"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);

  // Always start at top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try mailto first — if it opens, great. Also copy to clipboard as fallback.
    navigator.clipboard?.writeText("gauravpatwardhan7@gmail.com").then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-sm hidden md:block" style={{ color: "var(--muted)" }}>
            gauravpatwardhan7
          </span>
          <nav className="flex items-center gap-1 md:gap-2">
            {[
              { label: "About", href: "/about" },
              { label: "GitHub", href: "https://github.com/gauravpatwardhan7-web", external: true },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/patwardhangaurav/", external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-sm transition-colors px-3 py-2"
                style={{ color: "var(--muted)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="text-sm transition-colors px-3 py-2"
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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-16 md:pb-24">
        <p
          className="font-mono text-sm mb-6 reveal"
          ref={addRevealRef}
          style={{ color: "var(--accent)" }}
        >
          — Bengaluru, India
        </p>
        <h1
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight mb-6 reveal"
          ref={addRevealRef}
          style={{ animationDelay: "0.1s" }}
        >
          Gaurav Patwardhan
        </h1>
        <p
          className="text-xl md:text-2xl max-w-2xl reveal"
          ref={addRevealRef}
          style={{ color: "var(--muted)", animationDelay: "0.2s" }}
        >
          Product Manager / Builder. I identify real problems and ship working
          products — from data pipelines to AI agents. Four projects below.
        </p>

        <div
          className="flex flex-wrap gap-3 mt-10 reveal"
          ref={addRevealRef}
          style={{ animationDelay: "0.3s" }}
        >
          {[
            { label: "Consumer product", highlight: true, anchor: "blr-neighborhood" },
            { label: "AI Agent", anchor: "gym-coach" },
            { label: "Automation", anchor: "job-hunt" },
            { label: "Developer tooling", anchor: "token-efficiency" },
          ].map((tag) => (
            <a
              key={tag.label}
              href={`#${tag.anchor}`}
              className="font-mono text-xs uppercase tracking-widest px-3 py-1 border transition-colors cursor-pointer"
              style={{
                borderColor: tag.highlight ? "var(--accent)" : "var(--border)",
                color: tag.highlight ? "var(--accent)" : "var(--muted)",
                textDecoration: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = tag.highlight ? "var(--accent)" : "var(--border)";
                e.currentTarget.style.color = tag.highlight ? "var(--accent)" : "var(--muted)";
              }}
            >
              {tag.label}
            </a>
          ))}
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", border: "none", borderTop: "1px solid var(--border)" }} />

      {/* Projects */}
      <main className="max-w-5xl mx-auto px-4 md:px-6">
        {projects.map((project, idx) => (
          <section
            key={project.id}
            id={project.id}
            className="py-20"
            style={idx < projects.length - 1 ? { borderBottom: "1px solid var(--border)" } : {}}
          >
            {/* Tier label */}
            <div className="mb-10 reveal" ref={addRevealRef}>
              <span
                className="font-mono text-xs uppercase tracking-widest px-2 py-0.5 border"
                style={{
                  borderColor: project.tier === 1 ? "var(--accent)" : "var(--border)",
                  color: project.tier === 1 ? "var(--accent)" : "var(--muted)",
                }}
              >
                {project.label}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              {/* Left column */}
              <div>
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-tight mb-3 reveal"
                  ref={addRevealRef}
                >
                  {project.title}
                </h2>
                <p
                  className="text-sm mb-8 reveal"
                  ref={addRevealRef}
                  style={{ color: "var(--muted)" }}
                >
                  {project.subtitle}
                </p>

                {/* Problem */}
                <div
                  className="mb-8 reveal"
                  ref={addRevealRef}
                  style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1rem" }}
                >
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-2"
                    style={{ color: "var(--accent)" }}
                  >
                    The problem
                  </p>
                  <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                    {project.problem}
                  </p>
                </div>

                {/* How it works */}
                <div className="mb-8 reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-4"
                    style={{ color: "var(--muted)" }}
                  >
                    How it works
                  </p>
                  <ul className="space-y-3">
                    {project.howItWorks.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">
                          —
                        </span>
                        <span style={{ color: "var(--muted)" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4 reveal" ref={addRevealRef}>
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-mono transition-colors"
                      style={{
                        color: link.primary ? "var(--accent)" : "var(--muted)",
                        textDecoration: "underline",
                        textUnderlineOffset: "4px",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                      onMouseOut={(e) =>
                        (e.currentTarget.style.color = link.primary ? "var(--accent)" : "var(--muted)")
                      }
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-8">
                {/* Video embed */}
                {project.videoId && (
                  <div className="reveal" ref={addRevealRef}>
                    <div
                      className="relative w-full"
                      style={{ paddingBottom: "56.25%" /* 16:9 */ }}
                    >
                      <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&loop=1&playlist=${project.videoId}&controls=1&rel=0&modestbranding=1`}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        style={{ border: "none" }}
                      />
                    </div>
                  </div>
                )}
                {/* Stats */}
                <div className="reveal" ref={addRevealRef}>
                  <div
                    className="grid grid-cols-2 gap-px"
                    style={{ background: "var(--border)" }}
                  >
                    {project.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="p-5"
                        style={{ background: "var(--surface)" }}
                      >
                        <p
                          className="text-2xl font-semibold tracking-tight"
                          style={{ color: "var(--accent)", fontFamily: "var(--font-mono), monospace" }}
                        >
                          {stat.value}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture diagram */}
                <div className="reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    Architecture
                  </p>
                  <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as const, maxWidth: "100%" }}>
                    <pre
                      className="text-xs p-4 leading-relaxed"
                      style={{
                        background: "var(--code-bg)",
                        color: "#a3a3a3",
                        fontFamily: "var(--font-mono), 'SF Mono', monospace",
                        display: "inline-block",
                        minWidth: "100%",
                      }}
                    >
                      {project.diagram}
                    </pre>
                  </div>
                </div>

                {/* Stack */}
                <div className="reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    Stack
                  </p>
                  <div className="space-y-2">
                    {project.stack.map((item) => (
                      <div key={item.category} className="flex gap-4 text-sm">
                        <span
                          className="font-mono w-20 md:w-24 flex-shrink-0 text-xs"
                          style={{ color: "var(--muted)" }}
                        >
                          {item.category}
                        </span>
                        <span style={{ color: "var(--foreground)" }}>{item.items}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Collaboration signals */}
                <div className="reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    What this shows
                  </p>
                  <ul className="space-y-2">
                    {project.collaborationSignals.map((signal, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span style={{ color: "var(--accent)" }} className="flex-shrink-0">
                          ✓
                        </span>
                        <span style={{ color: "var(--muted)" }}>{signal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

      {/* About */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              About
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">Why I build this way</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            <p>
              I&apos;m a product manager who builds the things I spec. Not because I have to — because
              shipping something end-to-end is the fastest way to learn what actually matters. The
              judgment calls you make at 2 AM debugging a data pipeline are different from the ones
              you make in a document.
            </p>
            <p>
              The projects above aren&apos;t portfolio pieces. They solve problems I ran into, tools I
              wanted to use, data I wanted to see. BLR was me trying to find a flat. For Job Hunt was
              me drowning in browser tabs. Token Efficiency was me wondering if I was using Claude
              Code well.
            </p>
            <p>
              I&apos;m most useful to founders who need someone who can both think about a product and
              build pieces of it — someone who understands that a great feature and a broken data
              pipeline are the same problem.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <a
                href="/about"
                className="font-mono text-sm transition-colors"
                style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
              >
                Full background →
              </a>
              <a
                href="mailto:gauravpatwardhan7@gmail.com"
                className="font-mono text-sm transition-colors"
                style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between gap-4">
          <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
            Gaurav Patwardhan · {new Date().getFullYear()}
          </span>
          <div className="flex gap-6">
            <a
              href="https://github.com/gauravpatwardhan7-web"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs transition-colors"
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
              className="font-mono text-xs transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              LinkedIn
            </a>
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="font-mono text-xs transition-colors"
              style={{ color: "var(--muted)" }}
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
