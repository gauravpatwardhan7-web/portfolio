"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/projects";
import ProjectDetail from "@/app/components/ProjectDetail";

// Card thumbnail: first screenshot, else the static image, else the video still.
const thumbFor = (p: Project) =>
  p.images?.[0] ?? p.image ?? (p.videoId ? `https://i.ytimg.com/vi/${p.videoId}/hqdefault.jpg` : null);

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState(projects[0].id);

  const selected = projects.find((p) => p.id === selectedId) ?? projects[0];
  const activeIndex = projects.findIndex((p) => p.id === selected.id);

  // Bring the chosen card into view in the rail; only pull the page down to the
  // detail when the reader asked from elsewhere (a hero chip), not on every click.
  const selectProject = (id: string, scrollToDetail = false) => {
    setSelectedId(id);
    railRef.current
      ?.querySelector(`[data-card="${id}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    if (scrollToDetail) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollRail = (dir: number) => {
    const next = projects[Math.min(projects.length - 1, Math.max(0, activeIndex + dir))];
    if (next) selectProject(next.id);
  };

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
              { label: "What's Trending Bangalore", anchor: "whatsup-bangalore" },
              { label: "Neighborhood Explorer", anchor: "blr-neighborhood" },
              { label: "Certification Coach", anchor: "certification-coach" },
              { label: "Fitness Coach", anchor: "gym-coach" },
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => selectProject(tag.anchor, true)}
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
              </button>
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

        {/* Featured writing */}
        <a
          href="https://gauravpatwardhan1.substack.com/p/this-could-have-been-a-prompt"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal flex flex-col md:flex-row md:items-center gap-1.5 md:gap-4 mt-3 transition-colors"
          ref={addRevealRef}
          style={{
            animationDelay: "0.6s",
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
            Writing — Substack
          </span>
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            This could have been a prompt
          </span>
          <span className="font-mono text-xs flex-shrink-0" style={{ color: "var(--accent)" }}>
            Read →
          </span>
        </a>
      </section>

      <hr style={{ borderColor: "var(--border)", border: "none", borderTop: "1px solid var(--border)" }} />

      {/* Projects — horizontal rail, detail expands in place */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Projects
            <span style={{ color: "var(--muted)" }}>
              {" "}
              — {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </p>
          <div className="flex gap-2">
            {[
              { dir: -1, glyph: "←", label: "Previous project" },
              { dir: 1, glyph: "→", label: "Next project" },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                aria-label={btn.label}
                onClick={() => scrollRail(btn.dir)}
                className="font-mono text-sm transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--foreground)",
                  width: "34px",
                  height: "34px",
                  lineHeight: 1,
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--foreground)";
                }}
              >
                {btn.glyph}
              </button>
            ))}
          </div>
        </div>

        {/* Card rail */}
        <div className="rail gap-4 pb-2" ref={railRef}>
          {projects.map((project) => {
            const isActive = project.id === selectedId;
            const thumb = thumbFor(project);
            return (
              <button
                key={project.id}
                type="button"
                data-card={project.id}
                aria-pressed={isActive}
                onClick={() => selectProject(project.id)}
                className="flex-shrink-0 flex flex-col text-left transition-colors"
                style={{
                  width: "260px",
                  border: "1px solid",
                  borderColor: isActive ? "var(--accent)" : "var(--border)",
                  borderLeft: isActive ? "3px solid var(--accent)" : "1px solid var(--border)",
                  background: "var(--surface)",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                onMouseOut={(e) =>
                  (e.currentTarget.style.borderColor = isActive ? "var(--accent)" : "var(--border)")
                }
              >
                {thumb && (
                  <img
                    src={thumb}
                    alt=""
                    aria-hidden
                    onError={(e) => (e.currentTarget.style.display = "none")}
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      objectFit: "cover",
                      objectPosition: "top center",
                      borderBottom: "1px solid var(--border)",
                    }}
                  />
                )}
                <span className="flex flex-col gap-2 p-4">
                  <span
                    className="font-mono text-[10px] uppercase tracking-widest"
                    style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                  >
                    {project.label}
                  </span>
                  <span
                    className="text-base font-semibold tracking-tight leading-snug"
                    style={{ color: "var(--foreground)" }}
                  >
                    {project.title}
                  </span>
                  <span className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {project.subtitle}
                  </span>
                  <span className="font-mono text-xs mt-1" style={{ color: "var(--accent)" }}>
                    {isActive ? "Showing below \u2193" : "View details \u2192"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail for the selected card */}
        <div
          id="project-detail"
          ref={detailRef}
          className="pt-8 md:pt-10 mt-6"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <ProjectDetail key={selected.id} project={selected} />
        </div>
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
              standard certification path was never designed for. A lifter whose app had no memory
              of last week. I start from the user, define what success looks like, and make
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
