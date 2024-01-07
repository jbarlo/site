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
  footer: colord(darkColors.a).darken(0.15).toHex(),
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
        "limed-spruce": {
          50: "#f4f6f7",
          100: "#e2e8eb",
          200: "#c8d3d9",
          300: "#a1b4bf",
          400: "#748e9c",
          500: "#587282",
          600: "#4c5f6e",
          700: "#42505c",
          800: "#3b454f",
          900: "#373f47",
          950: "#20262c",
          DEFAULT: "#373f47",
        },
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
