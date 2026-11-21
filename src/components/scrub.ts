export type Scrub = {
  get: () => number;
  set: (value: number) => void; // clamps, if it needs to
  step: number;
  min: number;
  max: number;
  format?: (value: number) => string;
};

const PX_PER_STEP = 6;

export function scrubbable(el: HTMLElement, s: Scrub) {
  const format = s.format ?? String;
  el.setAttribute("role", "slider");
  el.setAttribute("aria-valuemin", String(s.min));
  el.setAttribute("aria-valuemax", String(s.max));
  el.tabIndex = 0;

  const show = () => {
    if (!el.isContentEditable) el.textContent = format(s.get());
    el.setAttribute("aria-valuenow", String(s.get()));
  };
  const set = (value: number) => {
    s.set(value);
    show();
  };

  el.addEventListener("pointerdown", (e) => {
    if (el.isContentEditable) return;
    const [startX, start] = [e.clientX, s.get()];
    const move = (e: PointerEvent) =>
      set(start + Math.round((e.clientX - startX) / PX_PER_STEP) * s.step);
    el.setPointerCapture(e.pointerId);
    el.addEventListener("pointermove", move);
    el.addEventListener(
      "lostpointercapture",
      () => el.removeEventListener("pointermove", move),
      { once: true },
    );
  });

  el.addEventListener("keydown", (e) => {
    if (el.isContentEditable) {
      if (e.key === "Escape") el.textContent = format(s.get());
      if (e.key !== "Enter" && e.key !== "Escape") return;
      e.preventDefault();
      el.blur(); // commits
      return;
    }
    const keys: Record<string, number> = {
      ArrowRight: s.get() + s.step,
      ArrowUp: s.get() + s.step,
      ArrowLeft: s.get() - s.step,
      ArrowDown: s.get() - s.step,
      PageUp: s.get() + s.step * 10,
      PageDown: s.get() - s.step * 10,
      Home: s.min,
      End: s.max,
    };
    if (e.key === "Enter") edit();
    else if (e.key in keys) set(keys[e.key]);
    else return;
    e.preventDefault();
  });

  el.addEventListener("dblclick", edit);
  el.addEventListener("blur", () => {
    if (!el.isContentEditable) return;
    el.contentEditable = "false";
    const typed = parseFloat(el.textContent ?? "");
    if (Number.isFinite(typed)) set(typed);
    else show();
  });

  function edit() {
    el.contentEditable = "true";
    el.focus();
    getSelection()?.selectAllChildren(el);
  }

  show();
  return { show };
}
