import { ImageResponse } from "next/og";

export const alt =
  "Somboh Educational Foundation — Brilliant minds. Equal chances.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#0C1B33",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              SEF Ghana
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#4A5872",
              }}
            >
              Somboh Educational Foundation
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 15,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#4A5872",
            }}
          >
            <div
              style={{
                width: 36,
                height: 2,
                background: "#F8C000",
                display: "flex",
              }}
            />
            Ghana
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 86,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              maxWidth: 940,
            }}
          >
            <div>Brilliant minds.</div>
            <div>Equal chances.</div>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 26,
              lineHeight: 1.4,
              color: "#4A5872",
              maxWidth: 820,
            }}
          >
            SAT preparation, application mentorship, and full-scholarship
            guidance for Ghanaian students.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderTop: "1px solid rgba(12,27,51,0.18)",
            paddingTop: 22,
            fontSize: 16,
            letterSpacing: "0.06em",
            color: "#4A5872",
          }}
        >
          <div style={{ width: 12, height: 12, background: "#F8C000" }} />
          sef-ghana.example
        </div>

        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 18,
            background: "#0B4DA8",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
