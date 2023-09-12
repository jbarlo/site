import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      flexGrow: {
        2: "2",
        4: "4",
      },
    },
  },
  plugins: [],
} satisfies Config;
