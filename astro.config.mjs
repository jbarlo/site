import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";

import react from "@astrojs/react";
import rehypeClassNames from "rehype-class-names";
import { codeTheme } from "./src/components/codeTheme.ts";
import { rehypeFigures, rehypeHeadingAnchors } from "./src/markdown/rehype.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  outDir: "./static",
  markdown: {
    // token colours come from the page (--code-* in global.css)
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
      // after the link classes: heading anchors aren't prose links
      rehypeHeadingAnchors,
      rehypeFigures,
    ],
  },
});
