// markdown → the site's type system. runs after rehype-slug (ids) and the
// link class plugins, so heading anchors don't pick up prose link styles

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

/** subheads link to themselves, with a hanging markdown-style hash (drawn in
 * CSS by level: ## for h2, ### for h3) */
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

/** an image alone in its paragraph becomes a figure, captioned by its title:
 * ![alt](src "caption") */
export function rehypeFigures() {
  /** @param {Root} tree */
  return (tree) =>
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
      /** @type {ElementContent[]} */
      const children = [{ ...img, properties }];
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
}
