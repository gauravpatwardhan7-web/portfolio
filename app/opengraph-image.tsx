import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf9",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 28, color: "#d97706", marginBottom: 24 }}>
            — Bengaluru, India
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              color: "#1a1a1a",
              letterSpacing: "-2px",
              marginBottom: 28,
            }}
          >
            Gaurav Patwardhan
          </div>
          <div style={{ fontSize: 36, color: "#404040", maxWidth: 900, lineHeight: 1.4 }}>
            Product Manager. I find underserved user problems, make the product
            calls, and ship the solution myself.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {["AI Products", "Consumer", "Automation", "Developer Tools"].map((tag) => (
            <div
              key={tag}
              style={{
                fontSize: 22,
                color: "#404040",
                border: "1px solid #e8e5e0",
                background: "#f4f3f0",
                padding: "10px 22px",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
