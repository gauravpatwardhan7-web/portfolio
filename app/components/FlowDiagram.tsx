import { FlowStage } from "@/lib/projects";

export default function FlowDiagram({ stages }: { stages: FlowStage[] }) {
  return (
    <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <div className="flex items-start gap-0" style={{ minWidth: "max-content" }}>
        {stages.map((stage, i) => (
          <div key={i} className="flex items-start gap-0">
            {/* Stage: stacked nodes */}
            <div className="flex flex-col gap-1.5">
              {stage.items.map((item, j) => (
                <div
                  key={j}
                  className="font-mono text-xs px-3 py-2 whitespace-nowrap"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              ))}
              {stage.sub && (
                <p
                  className="font-mono text-xs text-center"
                  style={{ color: "var(--accent)", fontSize: "10px" }}
                >
                  {stage.sub}
                </p>
              )}
            </div>

            {/* Arrow between stages */}
            {i < stages.length - 1 && (
              <div
                className="flex items-center self-start mt-2 px-1.5"
                style={{ color: "var(--accent)", fontSize: "14px", lineHeight: 1 }}
              >
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
