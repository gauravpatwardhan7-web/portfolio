"use client";

import type { Project } from "@/lib/projects";
import FlowDiagram from "@/app/components/FlowDiagram";
import LiteYouTube from "@/app/components/LiteYouTube";

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="detail-panel flex flex-col gap-12 md:gap-14">
      {/* Left column */}
      <div>
        <div className="mb-5">
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
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
          {project.title}
        </h2>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          {project.subtitle}
        </p>

        {/* Who / Why / What */}
        <div
          className="mb-6 space-y-4"
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
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">
                    —
                  </span>
                  <span style={{ color: "var(--muted)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-4">
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
        {/* Video embed (click to play) */}
        {project.videoId && <LiteYouTube id={project.videoId} title={project.title} />}
        {/* Static image */}
        {project.image && (
          <div>
            <img
              src={project.image}
              alt={project.title}
              style={{
                border: "1px solid var(--border)",
                maxWidth: project.imageNarrow ? "560px" : "100%",
                width: "100%",
              }}
            />
          </div>
        )}
        {/* Sequential images */}
        {project.images && (
          <div className="flex items-center gap-2">
            {project.images.map((src, i) => (
              <div key={src} className="flex items-center gap-2 min-w-0">
                <img
                  src={src}
                  alt={`${project.title} step ${i + 1}`}
                  className="flex-1 min-w-0 rounded"
                  style={{ border: "1px solid var(--border)", width: "calc(33.333% - 12px)" }}
                />
                {i < project.images!.length - 1 && (
                  <span className="flex-shrink-0 text-sm" style={{ color: "var(--muted)" }}>
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        {/* Impact */}
        <div>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--muted)" }}
          >
            Impact
          </p>
          <div className="flex flex-col gap-px md:w-fit" style={{ background: "var(--border)" }}>
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-2 px-4 py-2"
                style={{ background: "var(--surface)" }}
              >
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
          {project.outcome && (
            <p className="text-sm leading-relaxed mt-3 flex gap-2" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--accent)" }} className="flex-shrink-0">
                →
              </span>
              <span>{project.outcome}</span>
            </p>
          )}
        </div>

        {/* Architecture diagram */}
        <div>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--muted)" }}
          >
            How — architecture
          </p>
          <FlowDiagram stages={project.flow} />
        </div>

        {/* Stack */}
        <div>
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
  );
}
