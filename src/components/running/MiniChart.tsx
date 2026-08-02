// Compact area+line chart used for elevation and heart-rate profiles.
// Stretches to fill its container width; stroke stays crisp via non-scaling-stroke.
export default function MiniChart({
  viewBox,
  area,
  line,
  color = "var(--accent)",
  className = "",
}: {
  viewBox: string;
  area: string;
  line: string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path d={area} fill={color} opacity="0.12" />
      <path
        className="chart-line"
        pathLength={1}
        d={line}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
