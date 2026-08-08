import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case study: Cutting alert noise by ~80% for EV charging operators",
  description:
    "How alert grouping and prioritization turned a flooded alert feed into a triage workflow adopted across every Shell EV market.",
};

const stats = [
  { value: "~80%", label: "fewer alerts per page (100+ → ~25)" },
  { value: "Global", label: "adopted by all Shell EV markets" },
  { value: "4 mo", label: "from concept to live" },
  { value: "2", label: "design iterations with operators" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "var(--accent)" }}>
      {children}
    </p>
  );
}

export default function EvecCaseStudy() {
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
          overflow: "hidden",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none select-none"
          style={{
            backgroundImage: "url(/wave-pattern-tile.jpg)",
            backgroundRepeat: "repeat-x",
            backgroundSize: "auto 240px",
            backgroundPosition: "center",
            opacity: 0.16,
          }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Bordered and accent-coloured, matching the project pages */}
          <a
            href="/"
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
          </a>
          <nav className="flex items-center gap-1">
            {[
              { label: "About", href: "/about" },
              { label: "Resume", href: "/Gaurav-Patwardhan-Resume.pdf" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/patwardhangaurav/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium hover-accent"
                style={{ color: "var(--foreground)", fontSize: "15px", padding: "10px 14px", display: "block" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <div className="h-[69px]" />

      <article className="max-w-3xl mx-auto px-4 md:px-6 pt-8 md:pt-12 pb-16">
        {/* Title */}
        <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: "var(--muted)" }}>
          Case study — Shell · EV Charging Operations
        </p>
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-4">
          Cutting alert noise by ~80% for EV charging operators
        </h1>
        <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
          How grouping and prioritization turned a flooded alert feed into a triage workflow — now
          the default in every Shell EV market.
        </p>

        {/* Stats strip */}
        <div className="grid-fix grid-cols-2 md:grid-cols-4 gap-px mb-12" style={{ background: "var(--border)" }}>
          {stats.map((stat) => (
            <div key={stat.label} className="px-4 py-3" style={{ background: "var(--surface)" }}>
              <span
                className="block text-xl font-semibold tracking-tight"
                style={{ color: "var(--accent)", fontFamily: "var(--font-mono), monospace" }}
              >
                {stat.value}
              </span>
              <span className="text-xs leading-snug" style={{ color: "var(--muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-12 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          {/* Context */}
          <section>
            <SectionLabel>Context</SectionLabel>
            <p>
              EVEC (EV Engineering Cockpit) is Shell&apos;s internal platform for monitoring its EV
              charging network: live charge-station status plus alerts raised from charger error
              codes. Market Operations teams work from it daily to keep chargers running and
              dispatch field engineers. I owned product for the operations experience.
            </p>
          </section>

          {/* The problem */}
          <section>
            <SectionLabel>The problem</SectionLabel>
            <p className="mb-4">
              A single large market could have ~300 open alerts at once. The page showed 100+ at a
              time with one organizing principle: newest first. Offline chargers, payment faults,
              broken connectors, failed sessions — one undifferentiated stream, with duplicates
              because a single hardware fault often fires several error codes. Triaging it
              manually meant:
            </p>
            <ul className="space-y-2">
              {[
                "Critical faults buried under low-priority noise",
                "No way to tell what was handled and what was untouched",
                "Duplicate alerts inflating the queue",
                "Slow responses — finding the right alert meant combing through a hundred",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Discovery */}
          <section>
            <SectionLabel>Discovery</SectionLabel>
            <p>
              Operators kept telling me the same thing: the page was too messy to navigate. The
              real pain was twofold — hard to <em>find</em> the alerts that mattered, hard to{" "}
              <em>track</em> the state of anything. The reframe: an operator should open one page
              and know what&apos;s broken, what matters most, and what&apos;s in motion. That
              became the concept — grouping plus prioritization.
            </p>
          </section>

          {/* The design */}
          <section>
            <SectionLabel>The design</SectionLabel>
            <p className="mb-4">Two mechanisms, working together:</p>
            <ul className="space-y-2 mb-4">
              {[
                "Group by location — alerts roll up by site, charge station, and connector. Duplicate alerts for the same fault collapse into one group, latest first when expanded.",
                "Prioritize by operational severity — offline chargers rank highest (someone has to physically go and check), hardware faults next, then network and payment issues.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0">
                    —
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Each station surfaces a primary and secondary alert plus a type summary (&ldquo;2
              offline · 3 faulted · 3 network&rdquo;) — scanning the page means scanning stations,
              not raw alerts.
            </p>
          </section>

          {/* Options considered */}
          <section>
            <SectionLabel>What I considered and rejected</SectionLabel>
            <p>
              Prioritization alone — re-sort the feed, ship in weeks. Rejected: it solved the
              wrong half. Operators would still comb hundreds of alerts with no way to track state
              site by site. Grouping was the tracking mechanism. The accepted tradeoff: collapsed
              groups hide detail, so every group leads with its highest-severity alert.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <SectionLabel>Shipping it</SectionLabel>
            <p>
              Two rounds of wireframe iteration with Market Ops before any code. The hard build
              questions — where grouping logic lives, how groups stay consistent as alerts stream
              in — took about four months to work through with engineering, alongside competing
              roadmap priorities.
            </p>
          </section>

          {/* Outcome */}
          <section>
            <SectionLabel>Outcome</SectionLabel>
            <p>
              Pages of 100+ alerts settled at ~25 on average — observed across markets after
              launch, not a lab number. Operators work site by site on one page, priority alerts
              are findable at a glance, and the design is now the default in every Shell EV market
              globally.
            </p>
          </section>

          {/* Retro */}
          <section>
            <SectionLabel>What I&apos;d do differently</SectionLabel>
            <p>
              Define success metrics before launch, not after. I observed the reduction but moved
              teams before running the structured study the feature deserved — triage time and
              missed-critical rates, not just alert counts. First thing I&apos;d set up next time.
            </p>
          </section>

          {/* Role */}
          <section>
            <SectionLabel>My role</SectionLabel>
            <p>
              Everything except the code: the operator discovery, the problem framing, the grouping
              and priority logic, the wireframes and spec, the iteration rounds with Market Ops,
              and delivery with the engineering team.
            </p>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-14 pt-8 flex flex-wrap gap-6" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href="/"
            className="font-mono text-sm hover-accent"
            style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            ← Back to products
          </a>
          <a
            href="/about"
            className="font-mono text-sm hover-accent"
            style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            About me →
          </a>
          <a
            href="mailto:gauravpatwardhan7@gmail.com"
            className="font-mono text-sm hover-accent"
            style={{ color: "var(--muted)", textDecoration: "underline", textUnderlineOffset: "4px" }}
          >
            Get in touch →
          </a>
        </div>
      </article>
    </div>
  );
}
