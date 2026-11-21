// the vertical rhythm, kept by script where CSS can't: titles shrink to fit,
// quote marks hang, and headings, metadata and captions are nudged so their
// baselines sit where body text's does within a row. rows are counted from
// the top of the [data-rhythm] root

const TITLE_MAX = 42; // px
const TITLE_MIN = 26; // px
const TITLE_LINES = 2; // shrink a title until it fits this many lines

// anything not in the body face: its baseline would sit elsewhere in the row
const SNAPPED = ":is(.title, .meta, .label, .subhead, figcaption, .snap)";

/** lay out the rhythm root now, once fonts land, on resize, and as images
 * load. returns the layout function, for pages that change content */
export function startRhythm(
  root = document.querySelector<HTMLElement>("[data-rhythm]"),
) {
  if (!root) return () => {};
  const layout = () => {
    measureHeader();
    fitTitles(root);
    hangQuotes(root);
    snapBaselines(root);
  };
  layout();
  document.fonts.ready.then(() => {
    layout();
    // a jump made before the header was measured: land it again
    if (location.hash && scrollY > 0)
      document
        .getElementById(decodeURIComponent(location.hash.slice(1)))
        ?.scrollIntoView({ behavior: "instant" });
  });
  let width = root.offsetWidth;
  new ResizeObserver(() => {
    if (root.offsetWidth === width) return; // our own nudges change height
    width = root.offsetWidth;
    layout();
  }).observe(root);
  for (const img of root.querySelectorAll("img"))
    if (!img.complete) img.addEventListener("load", layout, { once: true });
  return layout;
}

/** jumping to an anchor lands below the sticky header (see global.css) */
function measureHeader() {
  const nav = document.querySelector("nav");
  document.documentElement.style.setProperty(
    "--header-height",
    `${nav?.offsetHeight ?? 0}px`,
  );
}

/** shrink each title from TITLE_MAX until it fits TITLE_LINES, but never
 * below TITLE_MIN */
export function fitTitles(root: HTMLElement) {
  for (const el of root.querySelectorAll<HTMLElement>(".title")) {
    let size = TITLE_MAX;
    el.style.setProperty("--fit", `${size}px`);
    while (size > TITLE_MIN && lines(el) > TITLE_LINES) {
      size -= 1;
      el.style.setProperty("--fit", `${size}px`);
    }
  }
}
function lines(el: HTMLElement) {
  const range = document.createRange();
  range.selectNodeContents(el);
  return new Set([...range.getClientRects()].map((r) => Math.round(r.top)))
    .size;
}

/** pull a paragraph that opens with a quote mark back by the mark's width */
export function hangQuotes(root: HTMLElement) {
  for (const p of root.querySelectorAll<HTMLElement>(".prose p")) {
    p.style.textIndent = "";
    const text = p.firstChild;
    if (!text?.textContent) continue;
    const lead = text.textContent.search(/\S/);
    if (!"“'\"‘".includes(text.textContent[lead])) continue;
    const range = document.createRange();
    range.setStart(text, lead);
    range.setEnd(text, lead + 1);
    p.style.textIndent = `-${range.getBoundingClientRect().width}px`;
  }
}

/** nudge headings, meta and captions so their last baseline sits where body
 * text's does within a row: a baseline grid. visual only (position:
 * relative), so boxes stay put. figures are boxed to whole lines first */
export function snapBaselines(root: HTMLElement) {
  const targets = [...root.querySelectorAll<HTMLElement>(SNAPPED)];
  const images = [...root.querySelectorAll<HTMLElement>(".figure img")];
  for (const el of targets) el.style.top = "";
  for (const img of images) img.style.marginTop = img.style.marginBottom = "";
  for (const cap of root.querySelectorAll<HTMLElement>(".figure figcaption"))
    cap.style.marginTop = "";
  const line = parseFloat(getComputedStyle(root).lineHeight);
  // figures: the image keeps its size, centred in a box of whole lines.
  // hanging, the box takes the caption's parity (or its height, if taller)
  // so image and caption centre exactly on each other
  const hang = getComputedStyle(root).getPropertyValue("--hang").trim() === "1";
  for (const img of images) {
    const cap = img.parentElement!.querySelector<HTMLElement>("figcaption");
    const h = img.getBoundingClientRect().height;
    const capLines =
      hang && cap ? Math.round(cap.getBoundingClientRect().height / line) : 0;
    let lines = Math.max(Math.ceil(h / line), capLines);
    if (hang && (lines - capLines) % 2) lines += 1;
    img.style.marginTop =
      img.style.marginBottom = `${(lines * line - h) / 2}px`;
    if (hang && cap)
      cap.style.marginTop = `${((lines - capLines) * line) / 2}px`;
  }
  const rowBaseline = bodyBaseline(root);
  const top = root.getBoundingClientRect().top;
  for (const el of targets) {
    const base = baseline(el, "last") - top;
    // the nearest row's baseline: centred captions can move either way
    const target = Math.round((base - rowBaseline) / line) * line + rowBaseline;
    el.style.top = `${target - base}px`;
  }
}

/** where body text's baseline sits within its line */
function bodyBaseline(root: HTMLElement) {
  const p = document.createElement("p");
  p.className = "body-text";
  p.style.cssText = "position:absolute;visibility:hidden;margin:0";
  p.textContent = "x";
  root.append(p);
  const offset = baseline(p, "first") - p.getBoundingClientRect().top;
  p.remove();
  return offset;
}

/** y of the first or last line's baseline, via a zero-size probe */
function baseline(el: HTMLElement, which: "first" | "last") {
  const probe = document.createElement("span");
  probe.style.cssText = "display:inline-block;width:0;height:0";
  if (which === "first") el.prepend(probe);
  else el.append(probe);
  const y = probe.getBoundingClientRect().bottom;
  probe.remove();
  return y;
}
