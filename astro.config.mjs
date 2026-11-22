import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import react from "@astrojs/react";
import rehypeClassNames from "rehype-class-names";
import { codeTheme } from "./src/components/codeTheme.ts";
import {
  rehypeFigures,
  rehypeHangingQuotes,
  rehypeHeadingAnchors,
} from "./src/markdown/rehype.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    build: {
      assetsInlineLimit: (file) => (file.endsWith(".woff2") ? true : undefined),
    },
  },
  outDir: "./static",
  markdown: {
    shikiConfig: { theme: codeTheme },
    rehypePlugins: [
      rehypeSlug,
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
      // must follow the link classes
      rehypeHeadingAnchors,
      [
        rehypeFigures,
        { publicDir: fileURLToPath(new URL("./public", import.meta.url)) },
      ],
      rehypeHangingQuotes,
    ],
  },
});
