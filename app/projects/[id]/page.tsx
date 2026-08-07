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
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm hover-accent"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            ← Work
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
      </nav>
    </div>
  );
}
