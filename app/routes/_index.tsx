import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    // { title: "New Remix App" },
  ];
};

const lightModePalette = { title: "black", subdomain: "gray", bg: "white" };
const darkModePalette = { title: "white", subdomain: "gray", bg: "black" };
const palette = true ? darkModePalette : lightModePalette;

export default function Index() {
  return (
    <div style={{ backgroundColor: palette.bg }}>
      <div
        style={{
          lineHeight: "1.8",
          marginLeft: "20px",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <h1
          style={{
            margin: 0,
            marginTop: "12px",
            marginBottom: "20px",
            lineHeight: 1,
            color: palette.title,
          }}
        >
          <span style={{ letterSpacing: "0.15em" }}>barlo</span>
          <span style={{ color: palette.subdomain, fontStyle: "italic" }}>
            <span
              style={{
                letterSpacing: "0.1em",
                fontSize: "1.3em",
                verticalAlign: "-12.5%",
              }}
            >
              /
            </span>
            <span>www</span>
          </span>
        </h1>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "2em" }}>👀</div>
        </div>
      </div>
    </div>
  );
}
