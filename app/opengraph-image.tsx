import { ImageResponse } from "next/og";
import { getSiteContent } from "@/lib/content";

export const alt = "Web developer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const { profile } = await getSiteContent();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFF6EF",
          color: "#1A1330",
          padding: 72,
        }}
      >
        <div style={{ color: "#D10F62", fontSize: 24, letterSpacing: 4 }}>WEB DEVELOPER</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>{profile.name}</span>
          <span style={{ color: "#5B46F5" }}>Digital experiences.</span>
        </div>
      </div>
    ),
    size,
  );
}
