import type { RunMap } from "@/lib/runs";

/**
 * GPS track. Flat: one ghost stroke under one drawn stroke, no glow.
 * `tone` is kept for call-site compatibility — the system has one ground,
 * so both tones resolve to ink-on-ground with an accent line.
 */
export default function RouteMap({
  map,
  className = "",
  tone = "light",
}: {
  map: RunMap | null;
  className?: string;
  tone?: "light" | "dark";
}) {
  const stroke = "var(--accent)";
  const startStroke = tone === "dark" ? "var(--foreground)" : "var(--background)";

  if (!map) {
    return (
      <div
        className={`flex items-center justify-center bg-neutral-200 text-neutral-600 ${className}`}
        aria-label="No GPS track"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-6 w-6"
        >
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
        stroke="var(--neutral-300)"
        strokeWidth="8"
        strokeLinejoin="round"
        strokeLinecap="round"
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
        <rect
          x={Number(start[1]) - 4}
          y={Number(start[2]) - 4}
          width="8"
          height="8"
          fill={stroke}
          stroke={startStroke}
          strokeWidth="2"
        />
      )}
    </svg>
  );
}
