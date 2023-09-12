import type { V2_MetaFunction } from "@remix-run/node";
import { colord } from "colord";

export const meta: V2_MetaFunction = () => {
  return [{ title: "home | barlo" }];
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
  subtitle: "black",
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
  subtitle: colord(darkColors.b).darken(0.3).toHex(),
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
        <div className="grow gap-5 p-5 sm:flex sm:basis-0 sm:items-stretch">
          <div className="pt-10 sm:grow sm:basis-0">
            <div
              className="top-20 box-border h-44 p-5 sm:sticky"
              style={{ backgroundColor: palette.card }}
            >
              <div className="flex justify-between gap-2">
                <div className="flex flex-col justify-between ">
                  <div className="text-2xl">james barlo(w)</div>
                  <div
                    className="pt-2 text-lg leading-5"
                    style={{ color: palette.subtitle }}
                  >
                    developer + (?) enthusiast
                  </div>
                </div>
                <div
                  className="aspect-square h-20 rounded-full"
                  style={{ backgroundColor: "darkcyan" }}
                />
              </div>
            </div>
          </div>
          <div
            className="2xl:grow-4  md:grow-2 flex flex-col sm:grow sm:basis-0"
            style={{ height: 1000 }}
          >
            <div className="flex grow items-center justify-center">
              <div className="text-4xl">👀</div>
            </div>
          </div>
          <div className="sm:basis-0 xl:grow" />
        </div>
      </div>
    </div>
  );
}
