import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { imageMetadata } from "astro/assets/utils";

/** @typedef {import("hast").Root} Root */
/** @typedef {import("hast").Element} Element */
/** @typedef {import("hast").ElementContent} ElementContent */

/**
 * @param {Root | Element} node
 * @param {(node: Element, index: number, parent: Root | Element) => void} visit
 */
const walk = (node, visit) =>
  node.children.forEach((child, i) => {
    if (child.type !== "element") return;
    visit(child, i, node);
    walk(child, visit);
  });

export function rehypeHeadingAnchors() {
  /** @param {Root} tree */
  return (tree) =>
    walk(tree, (node) => {
      if (!/^h[2-6]$/.test(node.tagName)) return;
      const id = node.properties.id;
      if (typeof id !== "string") return;
      node.properties.className = [
        ...[node.properties.className ?? []].flat().map(String),
        "subhead",
      ];
      node.children = [
        {
          type: "element",
          tagName: "a",
          properties: { className: ["anchor"], href: `#${id}` },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["hash"], ariaHidden: "true" },
              children: [],
            },
            ...node.children,
          ],
        },
      ];
    });
}

/** ![alt](src "caption") alone in a paragraph -> figure. local images get
 * width, height, --w and --h (px, unitless)
 * @param {{ publicDir: string }} options
 */
export function rehypeFigures({ publicDir }) {
  /**
   * @param {Root} tree
   * @param {import("vfile").VFile} file
   */
  return async (tree, file) => {
    /** @type {Element[]} */
    const images = [];
    walk(tree, (node, i, parent) => {
      if (node.tagName !== "p") return;
      const content = node.children.filter(
        (c) => !(c.type === "text" && !c.value.trim()),
      );
      const img = content[0];
      if (
        content.length !== 1 ||
        img.type !== "element" ||
        img.tagName !== "img"
      )
        return;
      const { title, ...properties } = img.properties;
      const image = { ...img, properties };
      images.push(image);
      /** @type {ElementContent[]} */
      const children = [image];
      if (title)
        children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: String(title) }],
        });
      parent.children[i] = {
        type: "element",
        tagName: "figure",
        properties: { className: ["figure"] },
        children,
      };
    });
    await Promise.all(images.map((img) => size(img, publicDir, file.path)));
  };
}

/**
 * @param {Element} img
 * @param {string} publicDir
 * @param {string | undefined} from the markdown file
 */
async function size(img, publicDir, from) {
  const src = String(img.properties.src ?? "");
  if (/^[a-z]+:|^\/\//i.test(src)) return;
  const path = src.startsWith("/")
    ? join(publicDir, decodeURI(src))
    : from && join(dirname(from), decodeURI(src));
  if (!path) return;
  const data = await readFile(path).catch(() => undefined);
  if (!data) return;
  const meta = await imageMetadata(data, src);
  const turned = (meta.orientation ?? 0) >= 5;
  const [w, h] = turned ? [meta.height, meta.width] : [meta.width, meta.height];
  img.properties.width = w;
  img.properties.height = h;
  img.properties.style = `--w: ${w}; --h: ${h}`;
}

const QUOTES = /** @type {const} */ ({
  "“": "hang-ldquo",
  '"': "hang-quot",
  "‘": "hang-lsquo",
  "'": "hang-apos",
});

/** a paragraph's opening quote mark -> span.hang-* */
export function rehypeHangingQuotes() {
  /** @param {Root} tree */
  return (tree) =>
    walk(tree, (node) => {
      if (node.tagName !== "p") return;
      const text = node.children[0];
      if (text?.type !== "text") return;
      const lead = text.value.search(/\S/);
      const mark = text.value[lead];
      if (lead < 0 || !(mark in QUOTES)) return;
      node.children.splice(
        0,
        1,
        {
          type: "element",
          tagName: "span",
          properties: {
            className: [QUOTES[/** @type {keyof typeof QUOTES} */ (mark)]],
          },
          children: [{ type: "text", value: mark }],
        },
        { type: "text", value: text.value.slice(lead + 1) },
      );
    });
}
