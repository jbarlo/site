import type { V2_MetaFunction } from "@remix-run/node";

export const meta: V2_MetaFunction = () => {
  return [
    // { title: "New Remix App" },
  ];
};

const lightColors = {
  a: "#4A4063",
  b: "#C6D4FF",
  c: "#C83E4D",
  d: "#D58936",
  e: "#44BBA4",
};

const lightModePalette = {
  title: lightColors.a,
  subdomain: "gray",
  bg: lightColors.b,
  header: lightColors.b,
};

const darkColors = {
  a: "#373F47",
  b: "#EDF2F4",
  c: "#D1462F",
  d: "#939F5C",
  e: "#FFC53A",
};
const darkModePalette = {
  title: darkColors.b,
  subdomain: darkColors.e,
  bg: darkColors.a,
  header: darkColors.a,
};
const palette = true ? darkModePalette : lightModePalette;

export default function Index() {
  return (
    <div style={{ backgroundColor: palette.bg }}>
      <div
        style={{
          lineHeight: "1.8",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ backgroundColor: palette.header }}>
          <h1
            className="text-4xl font-normal"
            style={{
              margin: 0,
              marginLeft: "20px",
              marginTop: "4px",
              marginBottom: "10px",
              lineHeight: 1,
              color: palette.title,
              fontWeight: 400,
            }}
          >
            <span style={{ letterSpacing: "0.15em" }}>barlo</span>
            <span
              style={{
                color: palette.subdomain,
                fontStyle: "italic",
                fontWeight: 200,
              }}
            >
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
        </div>
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "2em" }}>👀</div>
          </div>
        </div>
      </div>
    </div>
  );
}
