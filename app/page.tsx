"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import FlowDiagram from "@/app/components/FlowDiagram";

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);

  // Always start at top on load — disable browser scroll restoration
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
      { threshold: 0.05 }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Fallback: make everything visible after 600ms regardless
    const fallback = setTimeout(() => {
      revealRefs.current.forEach((el) => el?.classList.add("visible"));
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b" style={{ background: "var(--background)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-1 ml-auto">
            {[
              { label: "About", href: "/about" },
              { label: "Resume", href: "/Gaurav-Patwardhan-Resume.pdf", external: true },
              { label: "GitHub", href: "https://github.com/gauravpatwardhan7-web", external: true },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/patwardhangaurav/", external: true },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="font-medium transition-colors"
                style={{
                  color: "var(--foreground)",
                  fontSize: "15px",
                  padding: "10px 14px",
                  display: "block",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--foreground)")}
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:gauravpatwardhan7@gmail.com"
              className="font-medium transition-colors"
              style={{
                color: "var(--foreground)",
                fontSize: "15px",
                padding: "10px 14px",
                display: "block",
              }}
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

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-6 md:pb-8">
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
          className="text-lg md:text-xl max-w-2xl reveal"
          ref={addRevealRef}
          style={{ color: "var(--muted)", animationDelay: "0.2s" }}
        >
          Product Manager. I find underserved user problems, make the product
          calls, and ship the solution myself — because building is the fastest
          way to test product judgment. Four products below, each starting from
          a real user problem.
        </p>

        <div className="mt-10 reveal" ref={addRevealRef} style={{ animationDelay: "0.3s" }}>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3 flex items-center gap-2"
            style={{ color: "var(--muted)" }}
          >
            Jump to a project
            <span aria-hidden style={{ color: "var(--accent)" }}>↓</span>
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Consumer product", anchor: "blr-neighborhood" },
              { label: "Accessibility AI", anchor: "certification-coach" },
              { label: "AI coaching", anchor: "gym-coach" },
              { label: "Automation", anchor: "job-hunt" },
            ].map((tag) => (
              <a
                key={tag.label}
                href={`#${tag.anchor}`}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-all cursor-pointer"
                style={{
                  borderColor: "var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                  textDecoration: "none",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.background = "var(--accent)";
                  e.currentTarget.style.color = "var(--background)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
              >
                {tag.label}
              </a>
            ))}
          </div>
        </div>

        {/* About link */}
        <a
          href="/about"
          className="inline-flex items-center gap-3 mt-8 reveal transition-colors"
          ref={addRevealRef}
          style={{ animationDelay: "0.4s", textDecoration: "none" }}
          onMouseOver={(e) => {
            const text = e.currentTarget.querySelector("span");
            if (text) text.style.color = "var(--accent)";
          }}
          onMouseOut={(e) => {
            const text = e.currentTarget.querySelector("span");
            if (text) text.style.color = "var(--muted)";
          }}
        >
          <img
            src="/About-me-1.jpg"
            alt="Gaurav Patwardhan"
            style={{ width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span
            className="font-mono text-sm transition-colors"
            style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            Meet the PM behind these products →
          </span>
        </a>

        {/* Featured case study */}
        <a
          href="/case-studies/evec-alert-grouping"
          className="reveal flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 mt-6 transition-colors"
          ref={addRevealRef}
          style={{
            animationDelay: "0.5s",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent)",
            background: "var(--surface)",
            padding: "8px 14px",
            textDecoration: "none",
            maxWidth: "fit-content",
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.borderLeftColor = "var(--accent)";
          }}
        >
          <span
            className="font-mono text-xs uppercase tracking-widest flex-shrink-0"
            style={{ color: "var(--accent)" }}
          >
            Case study — Shell
          </span>
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            How I cut alert noise by ~80% for EV charging operators
          </span>
          <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--accent)" }}>
            Read →
          </span>
        </a>
      </section>

      <hr style={{ borderColor: "var(--border)", border: "none", borderTop: "1px solid var(--border)" }} />

      {/* Projects */}
      <main className="max-w-5xl mx-auto px-4 md:px-6">
        {projects.map((project, idx) => (
          <section
            key={project.id}
            id={project.id}
            className="py-8 md:py-10"
            style={idx < projects.length - 1 ? { borderBottom: "1px solid var(--border)" } : {}}
          >
            {/* Tier label */}
            <div className="mb-5 reveal" ref={addRevealRef}>
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

            <div className="flex flex-col gap-12 md:gap-14">
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

                {/* Who / Why / What */}
                <div
                  className="mb-6 reveal space-y-4"
                  ref={addRevealRef}
                  style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1rem" }}
                >
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      Who
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {project.users}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      Why
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                      {project.problem}
                    </p>
                  </div>
                  <div>
                    <p
                      className="font-mono text-xs uppercase tracking-widest mb-1.5"
                      style={{ color: "var(--accent)" }}
                    >
                      What
                    </p>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--foreground)" }}>
                      {project.what}
                    </p>
                    <ul className="space-y-2">
                      {project.features.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed">
                          <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">—</span>
                          <span style={{ color: "var(--muted)" }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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
                {/* Static image */}
                {project.image && (
                  <div className="reveal" ref={addRevealRef}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ border: "1px solid var(--border)", maxWidth: project.imageNarrow ? "560px" : "100%", width: "100%" }}
                    />
                  </div>
                )}
                {/* Sequential images */}
                {project.images && (
                  <div className="reveal flex items-center gap-2" ref={addRevealRef}>
                    {project.images.map((src, i) => (
                      <div key={src} className="flex items-center gap-2 min-w-0">
                        <img
                          src={src}
                          alt={`${project.title} step ${i + 1}`}
                          className="flex-1 min-w-0 rounded"
                          style={{ border: "1px solid var(--border)", width: "calc(33.333% - 12px)" }}
                        />
                        {i < project.images!.length - 1 && (
                          <span className="flex-shrink-0 text-sm" style={{ color: "var(--muted)" }}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {/* Impact */}
                <div className="reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    Impact
                  </p>
                <div className="flex flex-col gap-px md:w-fit" style={{ background: "var(--border)" }}>
                  {project.stats.map((stat) => (
                    <div key={stat.label} className="flex items-baseline gap-2 px-4 py-2" style={{ background: "var(--surface)" }}>
                      <span
                        className="text-lg font-semibold tracking-tight"
                        style={{ color: "var(--accent)", fontFamily: "var(--font-mono), monospace" }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-xs" style={{ color: "var(--muted)" }}>
                        {stat.label}
                      </span>
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
                    How — architecture
                  </p>
                  <FlowDiagram stages={project.flow} />
                </div>

                {/* Stack */}
                <div className="reveal" ref={addRevealRef}>
                  <p
                    className="font-mono text-xs uppercase tracking-widest mb-3"
                    style={{ color: "var(--muted)" }}
                  >
                    Built with
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

              </div>
            </div>
          </section>
        ))}
      </main>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

      {/* About */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="flex flex-col gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
              About
            </p>
            <h2 className="text-2xl font-semibold tracking-tight">How I work as a PM</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            <p>
              Every product above started the same way: a user with a problem that existing tools
              ignored. Someone relocating with no trustworthy neighborhood data. A learner the
              standard certification path was never designed for. A job seeker losing three hours a
              day to browser tabs. I start from the user, define what success looks like, and make
              the tradeoffs explicit — then I ship it.
            </p>
            <p>
              I build my own specs deliberately. Shipping end-to-end is the fastest feedback loop
              on product judgment: you find out within days whether the scoping was right, whether
              the friction you dismissed actually kills retention, whether users trust the output.
              A PM who has felt those consequences writes better specs and makes sharper calls.
            </p>
            <p>
              I&apos;m most useful where product decisions and execution meet — teams that need
              someone who can talk to users, define the solution, prioritize honestly, and work
              shoulder-to-shoulder with engineering because they&apos;ve done the work themselves.
            </p>
            <div className="flex flex-wrap gap-6 pt-2">
              <a
                href="/case-studies/evec-alert-grouping"
                className="font-mono text-sm transition-colors"
                style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
              >
                Case study: cutting alert noise ~80% at Shell →
              </a>
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
