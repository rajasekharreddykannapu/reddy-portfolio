import type { RunMap } from "@/lib/runs";

export default function RouteMap({
  map,
  className = "",
  tone = "light",
}: {
  map: RunMap | null;
  className?: string;
  tone?: "light" | "dark";
}) {
  const stroke = tone === "dark" ? "#fbbf24" : "var(--accent)";
  const startStroke = tone === "dark" ? "#0c0f14" : "var(--surface)";

  if (!map) {
    return (
      <div
        className={`flex items-center justify-center bg-surface-2 text-muted ${className}`}
        aria-label="No GPS track"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 opacity-40">
          <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z" strokeLinejoin="round" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      </div>
    );
  }

  const start = map.path.match(/M([\d.]+) ([\d.]+)/);

  return (
    <svg
      viewBox={map.viewBox}
      className={className}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Route map"
    >
      <path
        d={map.path}
        stroke={stroke}
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={tone === "dark" ? 0.22 : 0.18}
      />
      <path
        className="route-line"
        pathLength={1}
        d={map.path}
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {start && (
        <circle
          cx={start[1]}
          cy={start[2]}
          r="4.5"
          fill={stroke}
          stroke={startStroke}
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
