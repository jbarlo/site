// per-fly state lives in each closure

import { between, type FlashRule, type Fly, type Move } from "./sim";

const still = { x: 0, y: 0 };

// moves

/** speed, nearerFaster: px/s */
export const drift = (o: {
  speed: number;
  nearerFaster: number;
  wander: number;
}): Move => {
  const headings = new WeakMap<Fly, number>();
  return (fly, { dt }) => {
    const turn = (Math.random() - 0.5) * o.wander * dt;
    const heading = (headings.get(fly) ?? Math.random() * 2 * Math.PI) + turn;
    headings.set(fly, heading);
    const speed = o.speed + fly.depth * o.nearerFaster;
    return { x: Math.cos(heading) * speed, y: Math.sin(heading) * speed * 0.6 }; // mostly sideways
  };
};

/** within: px; speed: px/s */
export const avoidCursor =
  (o: { within: number; speed: number }): Move =>
  (fly, swarm) => {
    if (!swarm.cursor) return still;
    const { dx, dy, distance } = between(fly, swarm.cursor, swarm);
    if (distance >= o.within) return still;
    const push = (o.speed * (1 - distance / o.within)) / (distance || 1);
    return { x: dx * push, y: dy * push };
  };

// flash rules

export const clockRunsOut = (): FlashRule => (fly) => fly.clock >= 1;

/** px. forgetsAfter > within (hysteresis, stops flicker) */
export const noticesCursor = (o: {
  within: number;
  forgetsAfter: number;
}): FlashRule => {
  const noticing = new WeakSet<Fly>();
  return (fly, swarm) => {
    const distance = swarm.cursor
      ? between(fly, swarm.cursor, swarm).distance
      : Infinity;
    if (distance > o.forgetsAfter) noticing.delete(fly);
    if (distance >= o.within || noticing.has(fly)) return false;
    noticing.add(fly);
    return true;
  };
};

/** ragged: px */
export const rippleReaches = (o: { ragged: number }): FlashRule => {
  const jitter = new WeakMap<Fly, number>();
  return (fly, swarm) => {
    if (!jitter.has(fly)) jitter.set(fly, (Math.random() * 2 - 1) * o.ragged);
    return swarm.ripples.some((ripple) => {
      const distance = between(fly, ripple, swarm).distance + jitter.get(fly)!;
      const justPassed =
        distance < ripple.radius &&
        distance >= ripple.radius - ripple.speed * swarm.dt;
      const strength = 1 - distance / ripple.reach;
      return justPassed && strength > 0 && Math.random() < strength ** 0.7;
    });
  };
};
