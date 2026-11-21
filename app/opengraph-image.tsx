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
          background: "#080A0C",
          color: "#F4F5F2",
          padding: 72,
        }}
      >
        <div style={{ color: "#C6FF45", fontSize: 24, letterSpacing: 4 }}>WEB DEVELOPER</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>{profile.name}</span>
          <span style={{ color: "#C6FF45" }}>Digital experiences.</span>
        </div>
      </div>
    ),
    size,
  );
}
