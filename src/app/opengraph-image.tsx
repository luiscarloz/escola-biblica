import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Escola Bíblica IIR Brasil — 12 semanas de estudo presencial da Palavra de Deus";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B1464",
          gap: "24px",
        }}
      >
        <img src={logoBase64} width={180} height={180} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            Escola Bíblica
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#8A9E3C",
              letterSpacing: "6px",
              textTransform: "uppercase",
            }}
          >
            IIR Brasil
          </div>
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            marginTop: "8px",
          }}
        >
          12 semanas de estudo presencial da Palavra de Deus
        </div>
      </div>
    ),
    { ...size }
  );
}
