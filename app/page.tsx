"use client";

import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/projects";
import WavePattern from "@/app/components/WavePattern";

// Card thumbnail: the dedicated cover, else first screenshot, else the static
// image, else the video still.
const thumbFor = (p: Project) =>
  p.cover ??
  p.images?.[0] ??
  p.image ??
  (p.videoId ? `https://i.ytimg.com/vi/${p.videoId}/hqdefault.jpg` : null);

export default function Home() {
  const revealRefs = useRef<HTMLElement[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const railSectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // One slide fills the rail exactly, so the active index is just how many
  // slide-widths we've scrolled. Keeps the counter honest when swiping.
  const handleRailScroll = () => {
    const rail = railRef.current;
    // clientWidth is 0 mid-resize; dividing by it yields NaN and breaks the counter.
    if (!rail || !rail.clientWidth) return;
    const i = Math.round(rail.scrollLeft / rail.clientWidth);
    if (!Number.isFinite(i)) return;
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, i)));
  };

  const goToSlide = (i: number, scrollIntoView = false) => {
    const rail = railRef.current;
    const clamped = Math.min(projects.length - 1, Math.max(0, i));
    rail?.scrollTo({ left: clamped * rail.clientWidth, behavior: "smooth" });
    setActiveIndex(clamped);
    if (scrollIntoView) {
      railSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Slide offsets are computed from the rail width, so a resize leaves the
  // scroll position between slides. Re-snap to the active one.
  useEffect(() => {
    const onResize = () => {
      const rail = railRef.current;
      if (!rail || !rail.clientWidth) return;
      rail.scrollTo({ left: activeIndex * rail.clientWidth, behavior: "auto" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex]);

  // Disable browser scroll restoration; the effect below owns where we land.
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Always start at top on load — except when coming back from a project page,
  // which asks for its own slide via ?p=<id>#projects so you land where you
  // left off instead of at the hero. The #projects fragment does the vertical
  // scroll natively; this only has to line the rail up horizontally.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("p");
    const index = requested ? projects.findIndex((p) => p.id === requested) : -1;
    if (index < 0) {
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }
    const jump = () => {
      // scrollLeft only — scrollIntoView would also nudge the page vertically
      // and undo where the #projects fragment put us.
      const rail = railRef.current;
      if (rail?.clientWidth) {
        rail.scrollLeft = index * rail.clientWidth;
      }
    };
    jump();
    // Re-assert a tick later, once layout has settled — scroll snap can undo
    // the first set. A timer, not rAF, so it still lands in a background tab.
    // The query is only stripped at the end: clearing it earlier makes
    // StrictMode's second pass see no param and scroll back to the top.
    const timer = setTimeout(() => {
      setActiveIndex(index);
      jump();
      window.history.replaceState(null, "", `${window.location.pathname}#projects`);
    }, 0);
    return () => clearTimeout(timer);
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

  // A plain function, not a component — inlining it keeps the buttons from
  // remounting (and losing focus) on every render.
  const navArrow = (dir: -1 | 1, className: string, size: number) => {
    const disabled = dir < 0 ? activeIndex === 0 : activeIndex === projects.length - 1;
    return (
      <button
        type="button"
        aria-label={dir < 0 ? "Previous project" : "Next project"}
        disabled={disabled}
        onClick={() => goToSlide(activeIndex + dir)}
        className={`font-mono transition-colors ${className}`}
        style={{
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: disabled ? "var(--border)" : "var(--foreground)",
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: 1,
          cursor: disabled ? "default" : "pointer",
        }}
        onMouseOver={(e) => {
          if (disabled) return;
          e.currentTarget.style.borderColor = "var(--accent)";
          e.currentTarget.style.color = "var(--accent)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.color = disabled ? "var(--border)" : "var(--foreground)";
        }}
      >
        {dir < 0 ? "←" : "→"}
      </button>
    );
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
      <section className="max-w-5xl mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-5 md:pb-7">
        <p
          className="font-mono text-xs mb-3 reveal"
          ref={addRevealRef}
          style={{ color: "var(--accent)" }}
        >
          — Bengaluru, India
        </p>
        <h1
          className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-4 reveal"
          ref={addRevealRef}
          style={{ animationDelay: "0.1s" }}
        >
          Gaurav Patwardhan
        </h1>
        <p
          className="text-base md:text-lg max-w-2xl leading-relaxed reveal"
          ref={addRevealRef}
          style={{ color: "var(--muted)", animationDelay: "0.2s" }}
        >
          I find underserved user problems, make the product calls, and ship the
          solution myself. Four products below, each starting from a real one.
        </p>

        <div className="mt-7 reveal" ref={addRevealRef} style={{ animationDelay: "0.3s" }}>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2.5 flex items-center gap-2"
            style={{ color: "var(--muted)" }}
          >
            Jump to a project
            <span aria-hidden style={{ color: "var(--accent)" }}>↓</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "What's Trending Bangalore", anchor: "whatsup-bangalore" },
              { label: "Neighborhood Explorer", anchor: "blr-neighborhood" },
              { label: "Certification Coach", anchor: "certification-coach" },
              { label: "Fitness Coach", anchor: "gym-coach" },
            ].map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() =>
                  goToSlide(
                    projects.findIndex((p) => p.id === tag.anchor),
                    true
                  )
                }
                className="font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 border transition-all cursor-pointer"
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
          className="inline-flex items-center gap-2.5 mt-6 reveal transition-colors"
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
            style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span
            className="font-mono text-sm transition-colors"
            style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            How I actually work →
          </span>
        </a>

        <div className="flex flex-col md:flex-row gap-3 mt-6">
        {/* Featured writing */}
        <a
          href="https://gauravpatwardhan1.substack.com/p/this-could-have-been-a-prompt"
          target="_blank"
          rel="noopener noreferrer"
          className="reveal w-full md:flex-1 md:min-w-0 flex flex-col md:flex-row md:items-center gap-1.5 md:gap-3 transition-colors"
          ref={addRevealRef}
          style={{
            animationDelay: "0.6s",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent)",
            background: "var(--surface)",
            padding: "7px 12px",
            textDecoration: "none",
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onMouseOut={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.borderLeftColor = "var(--accent)";
          }}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-widest flex-shrink-0"
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
        </div>
      </section>

      <hr style={{ borderColor: "var(--border)", border: "none", borderTop: "1px solid var(--border)" }} />

      {/* Projects — one full-width slide per project */}
      {/* #projects is the anchor the project pages link back to, so the browser
          does the vertical scroll natively instead of us timing it in JS. */}
      <main
        id="projects"
        ref={railSectionRef}
        className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8 md:pt-10 md:pb-10 scroll-mt-[69px]"
      >
        <div className="flex items-baseline justify-between gap-4 mb-5">
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
          <div className="flex items-center gap-4">
            {/* Slide indicators */}
            <div className="hidden md:flex items-center gap-2">
              {projects.map((project, i) => (
                <button
                  key={project.id}
                  type="button"
                  aria-label={`Go to ${project.title}`}
                  aria-current={i === activeIndex}
                  onClick={() => goToSlide(i)}
                  style={{
                    width: i === activeIndex ? "28px" : "10px",
                    height: "3px",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: i === activeIndex ? "var(--accent)" : "var(--border)",
                    transition: "width 0.3s ease, background 0.3s ease",
                  }}
                />
              ))}
            </div>
            {/* Desktop gets the side arrows below; keep a pair up here for mobile. */}
            <div className="flex gap-2 md:hidden">
              {navArrow(-1, "text-sm", 40)}
              {navArrow(1, "text-sm", 40)}
            </div>
          </div>
        </div>

        {/* Slides — arrows straddle the card edges so they're always in reach */}
        <div className="relative">
          {navArrow(
            -1,
            "hidden md:flex items-center justify-center absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-base rounded-full shadow-sm",
            48
          )}
          {navArrow(
            1,
            "hidden md:flex items-center justify-center absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 text-base rounded-full shadow-sm",
            48
          )}
          <div className="rail" ref={railRef} onScroll={handleRailScroll}>
            {projects.map((project) => {
            const thumb = thumbFor(project);
            return (
              <article
                key={project.id}
                data-slide={project.id}
                style={{ flex: "0 0 100%", minWidth: 0 }}
              >
                <div
                  className="flex flex-col md:flex-row gap-6 md:gap-10 md:items-stretch"
                  style={{
                    border: "1px solid var(--border)",
                    borderLeft: "4px solid var(--accent)",
                    background: "var(--surface)",
                    padding: "24px",
                    minHeight: "clamp(420px, 62vh, 640px)",
                  }}
                >
                  {/* Text — deliberately the smaller half; the cover carries the slide */}
                  <div className="md:w-[38%] flex flex-col justify-center">
                    <span
                      className="font-mono text-[11px] uppercase tracking-widest mb-3"
                      style={{ color: "var(--accent)" }}
                    >
                      {project.label}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 leading-tight">
                      {project.title}
                    </h2>
                    <p
                      className="text-sm md:text-base leading-relaxed mb-6"
                      style={{ color: "var(--muted)" }}
                    >
                      {project.subtitle}
                    </p>

                    {/* Two headline numbers — the rest lives on the project page */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
                      {project.stats.slice(0, 2).map((stat) => (
                        <div key={stat.label} className="flex flex-col">
                          <span
                            className="text-xl md:text-2xl font-semibold tracking-tight"
                            style={{
                              color: "var(--accent)",
                              fontFamily: "var(--font-mono), monospace",
                            }}
                          >
                            {stat.value}
                          </span>
                          <span className="text-xs" style={{ color: "var(--muted)" }}>
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-5">
                      <a
                        href={`/projects/${project.id}`}
                        className="text-sm font-mono transition-colors"
                        style={{
                          color: "var(--accent)",
                          textDecoration: "underline",
                          textUnderlineOffset: "4px",
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                        onMouseOut={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      >
                        Full detail →
                      </a>
                      {project.links
                        .filter((link) => link.primary)
                        .map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-mono transition-colors"
                            style={{
                              color: "var(--muted)",
                              textDecoration: "underline",
                              textUnderlineOffset: "4px",
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                            onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}
                          >
                            {link.label}
                          </a>
                        ))}
                    </div>
                  </div>

                  {/* Visual */}
                  {thumb && (
                    <a href={`/projects/${project.id}`} className="md:w-[62%] relative flex">
                      <img
                        src={thumb}
                        alt=""
                        aria-hidden
                        onError={(e) => (e.currentTarget.style.display = "none")}
                        // Absolute on desktop so the cover fills the slide height
                        // without a portrait screenshot stretching the row to its
                        // own natural aspect; a fixed height does the same on mobile.
                        className="w-full h-[clamp(220px,38vh,320px)] md:absolute md:inset-0 md:h-full"
                        style={{
                          objectFit: "cover",
                          // Left, not centre: these covers put their product UI
                          // (side panels, sidebars) against the left edge, and
                          // centring crops it off.
                          objectPosition: "top left",
                          border: "1px solid var(--border)",
                          background: "var(--background)",
                        }}
                      />
                    </a>
                  )}
                </div>
              </article>
            );
            })}
          </div>
        </div>
      </main>

      <hr style={{ border: "none", borderTop: "1px solid var(--border)" }} />

      {/* The tail of the page was mostly empty; the wave field fills it without
          adding height, sitting behind the closing links and the footer. */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{ color: "var(--foreground)", opacity: 0.09 }}
          aria-hidden
        >
          <WavePattern className="w-full h-full" height={160} />
        </div>

      {/* Closing links */}
      <section className="relative max-w-5xl mx-auto px-4 md:px-6 py-7 md:py-9">
        <div className="flex flex-wrap gap-6">
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
      </section>

      {/* Footer */}
      <footer className="relative border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between gap-4">
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
    </div>
  );
}
