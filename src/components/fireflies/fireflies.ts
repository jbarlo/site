import {
  avoidCursor,
  clockRunsOut,
  drift,
  noticesCursor,
  rippleReaches,
} from "./rules";
import type { Description } from "./sim";

export const fireflies: Description = {
  count: 150,
  pixel: 2,
  color: "--color-subdomain",

  // times in seconds, brightness 0..1
  glow: {
    every: 5,
    rise: 0.45,
    fade: 0.6,
    peak: 0.65,
    rest: 0.02,
    vary: 0.3,
    skipChance: 0.08,
  },

  depth: { mostlyFar: 1.6, bigFrom: 0.8, dimmest: 0.55 },

  moves: [
    drift({ speed: 3, nearerFaster: 12, wander: 3 }),
    avoidCursor({ within: 100, speed: 70 }),
  ],

  flashesWhen: [
    clockRunsOut(),
    noticesCursor({ within: 100, forgetsAfter: 130 }),
    rippleReaches({ ragged: 14 }),
  ],

  neighbours: { within: 110, nudge: 0.01, noticeChance: 0.8 },

  startles: { every: [10, 22], reach: 90, speed: 160 },
};
