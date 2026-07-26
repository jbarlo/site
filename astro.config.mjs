import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";

import react from "@astrojs/react";
import rehypeClassNames from "rehype-class-names";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  outDir: "./static",
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { target: "_blank", rel: ["noopener", "noreferrer"] },
      ],
      [
        rehypeClassNames,
        {
          "a[target='_blank']": "link-external text-subtle",
          "a:not([target='_blank'])":
            "link-internal text-subtle underline italic",
        },
      ],
    ],
  },
});
