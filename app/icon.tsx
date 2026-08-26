import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
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
          background: "#FBF3E7",
          borderRadius: "50%",
          border: "2px solid #C9A24B",
          color: "#C9A24B",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
