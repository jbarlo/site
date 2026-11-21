export type Point = { x: number; y: number };

export type Fly = Point & {
  depth: number; // 0..1, far..near
  clock: number; // 0..1, flashes at 1
  period: number; // s
  litAt: number; // s
  strength: number; // 0..1
};

export type Ripple = Point & { radius: number; reach: number; speed: number };

/** -> velocity, px/s */
export type Move = (fly: Fly, swarm: Swarm) => Point;
/** called for every fly every tick, so it may keep state */
export type FlashRule = (fly: Fly, swarm: Swarm) => boolean;

export type Description = {
  count: number;
  pixel: number;
  color: string; // CSS custom property name
  glow: {
    every: number;
    rise: number;
    fade: number;
    peak: number;
    rest: number;
    vary: number;
    skipChance: number;
  };
  depth: { mostlyFar: number; bigFrom: number; dimmest: number };
  moves: Move[]; // non-empty
  flashesWhen: FlashRule[];
  neighbours: { within: number; nudge: number; noticeChance: number };
  startles: { every: [number, number]; reach: number; speed: number };
};

const LIT = 0.1; // glow above this is never restarted (anti-strobe)
const RELINK_EVERY = 0.5; // s
const MAX_DT = 0.05; // s

export class Swarm {
  width = 0;
  height = 0;
  now = 0; // s
  dt = 0; // s
  flies: Fly[] = [];
  ripples: Ripple[] = [];
  cursor: Point | null = null;

  private neighbours = new Map<Fly, Fly[]>();
  private linkedAt = -Infinity;
  private nextStartle: number | null = null;

  constructor(private d: Description) {}

  resize(width: number, height: number) {
    for (const fly of this.flies) {
      fly.x *= width / (this.width || width);
      fly.y *= height / (this.height || height);
    }
    this.width = width;
    this.height = height;
    this.refresh();
  }

  /** call after changing the description */
  refresh() {
    this.populate();
    this.link();
  }

  /** now: s, monotonic */
  tick(now: number) {
    this.dt = Math.min(now - this.now, MAX_DT);
    this.now = now;
    if (now - this.linkedAt > RELINK_EVERY) this.link();

    this.moveFlies();
    this.maybeStartle();
    this.spreadRipples();
    this.cascade(this.readyToFlash());
  }

  private moveFlies() {
    for (const fly of this.flies) {
      const velocity = this.d.moves
        .map((move) => move(fly, this))
        .reduce((sum, v) => ({ x: sum.x + v.x, y: sum.y + v.y }));
      fly.x = wrap(fly.x + velocity.x * this.dt, this.width);
      fly.y = wrap(fly.y + velocity.y * this.dt, this.height);
      fly.clock += this.dt / fly.period;
    }
  }

  private maybeStartle() {
    const { every, reach, speed } = this.d.startles;
    const later = () =>
      this.now + every[0] + Math.random() * (every[1] - every[0]);
    if (this.nextStartle === null) this.nextStartle = later();
    if (this.now < this.nextStartle || !this.flies.length) return;

    const fly = this.flies[Math.floor(Math.random() * this.flies.length)];
    this.ripples.push({ x: fly.x, y: fly.y, radius: 0, reach, speed });
    this.nextStartle = later();
  }

  private spreadRipples() {
    for (const ripple of this.ripples) ripple.radius += ripple.speed * this.dt;
    this.ripples = this.ripples.filter((r) => r.radius < r.reach + 20); // +ragged slack
  }

  private readyToFlash() {
    // map, not some: every rule must run (stateful)
    return this.flies.filter((fly) =>
      this.d.flashesWhen.map((rule) => rule(fly, this)).includes(true),
    );
  }

  private cascade(flashing: Fly[]) {
    const { nudge, noticeChance } = this.d.neighbours;
    const done = new Set<Fly>();
    while (flashing.length) {
      const fly = flashing.pop()!;
      if (done.has(fly)) continue;
      done.add(fly);
      this.flash(fly);

      for (const other of this.neighbours.get(fly) ?? []) {
        if (done.has(other) || Math.random() > noticeChance) continue;
        other.clock += other.clock * nudge; // proportional: needed to converge
        if (other.clock >= 1) flashing.push(other);
      }
    }
  }

  private flash(fly: Fly) {
    const natural = fly.clock >= 1;
    fly.clock = 0;
    if (fly.strength * this.glowLevel(fly) > LIT) return;

    fly.litAt = this.now;
    const skips = natural && Math.random() < this.d.glow.skipChance; // forced flashes never skip
    const { dimmest } = this.d.depth;
    const byDepth = dimmest + (1 - dimmest) * fly.depth;
    fly.strength = skips ? 0 : byDepth * (1 - Math.random() * this.d.glow.vary);
  }

  /** -> alpha, 0..1 */
  brightness(fly: Fly) {
    const rest = this.d.glow.rest * (0.5 + fly.depth);
    const lit = this.d.glow.peak * fly.strength;
    return rest + (lit - rest) * this.glowLevel(fly);
  }

  /** -> 0..1, 1 at peak */
  private glowLevel(fly: Fly) {
    const { rise, fade } = this.d.glow;
    const age = this.now - fly.litAt;
    if (!(age >= 0) || !Number.isFinite(age)) return 0;
    if (age < rise) return smootherstep(age / rise);
    return Math.exp(-(age - rise) / fade);
  }

  private populate() {
    while (this.flies.length < this.d.count) this.flies.push(this.spawn());
    this.flies.length = this.d.count;
    this.flies.sort((a, b) => a.depth - b.depth); // draw order: far first
  }

  private spawn(): Fly {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      depth: Math.random() ** this.d.depth.mostlyFar,
      clock: Math.random(),
      period: this.d.glow.every * (0.95 + Math.random() * 0.1),
      litAt: -Infinity,
      strength: 0,
    };
  }

  private link() {
    const within = this.d.neighbours.within;
    this.neighbours = new Map(
      this.flies.map((fly) => [
        fly,
        this.flies.filter(
          (other) =>
            other !== fly && between(fly, other, this).distance < within,
        ),
      ]),
    );
    this.linkedAt = this.now;
  }
}

/** a - b, shortest way round the wrapped field */
export function between(a: Point, b: Point, swarm: Swarm) {
  const shortest = (d: number, size: number) => d - size * Math.round(d / size);
  const dx = shortest(a.x - b.x, swarm.width);
  const dy = shortest(a.y - b.y, swarm.height);
  return { dx, dy, distance: Math.hypot(dx, dy) };
}

function wrap(value: number, size: number) {
  return ((value % size) + size) % size;
}

/** u: 0..1 */
function smootherstep(u: number) {
  return u * u * u * (u * (u * 6 - 15) + 10);
}
