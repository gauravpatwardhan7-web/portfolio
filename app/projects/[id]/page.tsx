import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectDetail from "@/app/components/ProjectDetail";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: `${project.title} — Gaurav Patwardhan`,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} — Gaurav Patwardhan`,
      description: project.subtitle,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === project.id);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <div style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>
      {/* Header */}
      <header
        className="overflow-hidden"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "var(--background)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "url(/wave-pattern.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.16,
          }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          {/* Bordered and accent-coloured — the muted text link was too easy to miss */}
          <Link
            href={`/?p=${project.id}#projects`}
            className="text-sm hover-accent inline-flex items-center gap-2"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: "8px 14px",
              textDecoration: "none",
            }}
          >
            ← All work
          </Link>
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--muted)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </header>
      <div className="h-[61px]" />

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <ProjectDetail project={project} />
      </main>

      {/* Prev / next */}
      <nav className="max-w-5xl mx-auto px-4 md:px-6 pb-14">
        <div
          className="flex flex-col md:flex-row gap-3 md:gap-4 pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {[
            { project: prev, dir: "←", side: "Previous" },
            { project: next, dir: "→", side: "Next" },
          ]
            .filter((entry) => entry.project)
            .map((entry) => (
              <a
                key={entry.project!.id}
                href={`/projects/${entry.project!.id}`}
                className="flex-1 flex flex-col gap-1 transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  padding: "12px 16px",
                  textDecoration: "none",
                }}
              >
                <span
                  className="font-mono text-xs uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  {entry.dir} {entry.side}
                </span>
                <span className="text-sm" style={{ color: "var(--foreground)" }}>
                  {entry.project!.title}
                </span>
              </a>
            ))}
        </div>

        {/* Second exit at the end of the page, so getting back never needs a scroll up */}
        <div className="mt-6">
          <Link
            href={`/?p=${project.id}#projects`}
            className="inline-flex items-center gap-2 text-sm hover-accent"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              padding: "10px 16px",
              textDecoration: "none",
            }}
          >
            ← Back to all work
          </Link>
        </div>
      </nav>
    </div>
  );
}
