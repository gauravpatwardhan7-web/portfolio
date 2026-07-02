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
        }}
      >
        <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-sm hover-accent"
            style={{ color: "var(--muted)", fontFamily: "var(--font-mono)" }}
          >
            ← Work
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
              charging network across markets. It shows the live status of every charge station and
              raises alerts from charger error codes. Market Operations teams work from it daily:
              they keep chargers running, triage faults, and dispatch third-party field engineers
              when hardware needs fixing. I owned product for EVEC&apos;s operations experience,
              working directly with these teams.
            </p>
          </section>

          {/* The problem */}
          <section>
            <SectionLabel>The problem</SectionLabel>
            <p className="mb-4">
              At any given moment, a single large market could have around 300 open alerts. The
              alerts page showed 100+ at a time with exactly one organizing principle: newest
              first. Offline chargers, unresponsive payment terminals, broken connectors, failed
              charge sessions — all in one undifferentiated stream. No categories, no priorities,
              and no deduplication, even though a single hardware fault often fires several error
              codes at once.
            </p>
            <p className="mb-4">
              Operators triaged this manually against a reference guidebook. The costs were
              predictable and real:
            </p>
            <ul className="space-y-2">
              {[
                "Critical faults — chargers fully offline — could sit buried under low-priority noise",
                "No way to tell which alerts were being handled and which were untouched",
                "Duplicate alerts inflated the queue and wasted triage effort",
                "Response times suffered because finding the right alert meant combing through a hundred",
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
              I talked to market operators on a regular cadence, and one complaint kept surfacing:
              the alerts page was too messy to navigate. Digging in, the specific pain was
              twofold — it was hard to <em>find</em> the alerts that mattered most, and hard to{" "}
              <em>track</em> the state of anything. That reframed the job to be done: an operator
              should open one page and immediately know what&apos;s broken, what matters most, and
              what&apos;s already in motion. I took that framing back as a concept: alert grouping
              plus prioritization.
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
              Each charge station surfaces a primary and a secondary alert plus a summary of
              everything beneath (&ldquo;2 offline · 3 faulted · 3 network · 3 payment&rdquo;), so
              scanning the page means scanning stations — not raw alerts. The severity order came
              straight from how operators actually work: an offline charger means a site visit; a
              payment glitch usually doesn&apos;t.
            </p>
          </section>

          {/* Options considered */}
          <section>
            <SectionLabel>What I considered and rejected</SectionLabel>
            <p>
              The cheaper option was prioritization alone — re-sort the existing feed by severity
              and ship in weeks. I rejected it because it solved the wrong half of the problem:
              operators would still comb through hundreds of individual alerts and still couldn&apos;t
              track state site by site. Grouping was the tracking mechanism, not a cosmetic layer.
              The tradeoff I accepted: collapsed groups hide detail by default, which is why every
              group leads with its highest-severity alert and a type summary.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <SectionLabel>Shipping it</SectionLabel>
            <p>
              I validated the concept with wireframes and mockups directly with Market Ops — two
              rounds of iteration before a line of code. The build itself had real technical
              questions: whether grouping logic lives in the frontend or backend, and how groups
              and priorities stay consistent while new alerts stream in continuously. Working
              through that with engineering, alongside competing roadmap priorities, took the
              feature from concept to live in about four months.
            </p>
          </section>

          {/* Outcome */}
          <section>
            <SectionLabel>Outcome</SectionLabel>
            <p>
              Pages that showed 100+ alerts settled at roughly 25 on average — observed across
              markets after launch, not a lab number. More important than the count: operators now
              work site by site on a single page, priority alerts are findable at a glance, and
              alert state is trackable. The grouping design was adopted globally — it&apos;s now
              the default alerts experience in every Shell EV market.
            </p>
          </section>

          {/* Retro */}
          <section>
            <SectionLabel>What I&apos;d do differently</SectionLabel>
            <p>
              Define success metrics before launch and run a structured validation study after it.
              I observed the reduction and the workflow change, but I moved to a new team before I
              could run the rigorous post-launch study the feature deserved — measuring triage
              time and missed-critical rates, not just alert counts. It&apos;s the first thing
              I&apos;d set up on day one next time.
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
