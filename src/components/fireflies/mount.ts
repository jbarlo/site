import { Swarm, type Description } from "./sim";

export function mount(canvas: HTMLCanvasElement, d: Description) {
  const swarm = new Swarm(d);
  const ctx = canvas.getContext("2d")!;
  const color = cssVar(d.color) || "#ff9e33";
  const paint = () => draw(ctx, swarm, d, color);

  new ResizeObserver(() => {
    const [width, height] = [canvas.clientWidth, canvas.clientHeight];
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    swarm.resize(width, height);
    paint();
  }).observe(canvas);

  canvas.addEventListener("pointermove", (e) => {
    swarm.cursor = { x: e.offsetX, y: e.offsetY };
  });
  canvas.addEventListener("pointerleave", () => {
    swarm.cursor = null;
  });

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const loop = (ms: number) => {
      swarm.tick(ms / 1000);
      paint();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  return {
    /** after changing the description */
    refresh() {
      swarm.refresh();
      paint();
    },
  };
}

/** edge-straddling flies drawn on both sides */
function draw(
  ctx: CanvasRenderingContext2D,
  swarm: Swarm,
  d: Description,
  color: string,
) {
  const { width, height } = swarm;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = color;

  for (const fly of swarm.flies) {
    const alpha = swarm.brightness(fly);
    if (!(alpha > 0)) continue;
    ctx.globalAlpha = alpha;

    const size = fly.depth >= d.depth.bigFrom ? d.pixel * 2 : d.pixel;
    const x = Math.floor(fly.x / d.pixel) * d.pixel;
    const y = Math.floor(fly.y / d.pixel) * d.pixel;
    const xs = x + size > width ? [x, x - width] : [x];
    const ys = y + size > height ? [y, y - height] : [y];
    for (const sx of xs) for (const sy of ys) ctx.fillRect(sx, sy, size, size);
  }
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}
