/** @type {import('tailwindcss').Config} */

import { colord } from "colord";

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
  footer: lightColors.b,
  bg: lightColors.b,
  header: lightColors.b,
  card: lightColors.b,
  text: "black",
  subtle: "black",
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
  footer: colord(darkColors.a).darken(0.15).toHex(),
  header: colord(darkColors.a).lighten(0.05).toHex(),
  card: colord(darkColors.a).lighten(0.05).toHex(),
  text: colord(darkColors.b).darken(0.1).toHex(),
  subtle: colord(darkColors.b).darken(0.25).toHex(),
  subtitle: colord(darkColors.b).darken(0.3).toHex(),
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        title: darkModePalette.title,
        subdomain: darkModePalette.subdomain,
        footer: darkModePalette.footer,
        bg: darkModePalette.bg,
        header: darkModePalette.header,
        card: darkModePalette.card,
        text: darkModePalette.text,
        subtle: darkModePalette.subtle,
        subtitle: darkModePalette.subtitle,
      },

      flexGrow: {
        2: "2",
        3: "3",
        4: "4",
      },
      screens: {
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};
