import type { V2_MetaFunction } from "@remix-run/node";
import { colord } from "colord";

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
  card: lightColors.b,
  text: "black",
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
  header: colord(darkColors.a).lighten(0.05).toHex(),
  card: colord(darkColors.a).lighten(0.05).toHex(),
  text: colord(darkColors.b).darken(0.1).toHex(),
};
const palette = true ? darkModePalette : lightModePalette;

export default function Index() {
  return (
    <div style={{ backgroundColor: palette.bg, color: palette.text }}>
      <div className="flex min-h-screen flex-col leading-relaxed">
        <div
          className="sticky top-0"
          style={{ backgroundColor: palette.header }}
        >
          <h1
            className="m-0 mb-2 ml-5 mt-1 text-4xl font-normal leading-none"
            style={{ color: palette.title }}
          >
            <span style={{ letterSpacing: "0.15em" }}>barlo</span>
            <span
              className="font-extralight italic"
              style={{ color: palette.subdomain }}
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
        <div className="flex grow basis-0 items-stretch gap-5 p-5">
          <div className="grow basis-0 pt-10">
            <div
              className="sticky top-20 box-border h-48 p-5"
              style={{ backgroundColor: palette.card }}
            >
              <div>Hello</div>
            </div>
          </div>
          <div
            className="grow-4 flex basis-0 flex-col"
            style={{ height: 1000 }}
          >
            <div className="flex grow items-center justify-center">
              <div className="text-4xl">👀</div>
            </div>
          </div>
          <div className="grow basis-0" />
        </div>
      </div>
    </div>
  );
}
