import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <p className="font-mono text-sm uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
        404
      </p>
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
        Nothing here
      </h1>
      <p className="text-base max-w-md mb-8" style={{ color: "var(--muted)" }}>
        This page does not exist or has moved. The work you are looking for is probably
        one click away.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        <Link
          href="/"
          className="font-mono text-sm hover-accent"
          style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          See my work →
        </Link>
        <Link
          href="/about"
          className="font-mono text-sm hover-accent"
          style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
        >
          About me →
        </Link>
      </div>
    </div>
  );
}
