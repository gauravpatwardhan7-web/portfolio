import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#d97706",
          color: "#fafaf9",
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: "-2px",
          fontFamily: "sans-serif",
        }}
      >
        GP
      </div>
    ),
    { ...size }
  );
}
