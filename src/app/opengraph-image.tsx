import { ImageResponse } from "next/og";
import { profile } from "@/lib/resume";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0b0e14 0%, #141a24 55%, #1a2332 100%)",
          color: "#f4f1ec",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#f59e0b",
            }}
          >
            Engineering · Running · Field notes
          </p>
          <h1
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            {profile.name}
          </h1>
          <p style={{ margin: 0, fontSize: 30, color: "#c8c2b8" }}>{profile.title}</p>
        </div>
        <p style={{ margin: 0, fontSize: 24, color: "#9ca3af" }}>
          .NET 8 · Azure · Angular · Hyderabad
        </p>
      </div>
    ),
    { ...size },
  );
}
