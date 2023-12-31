/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
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
