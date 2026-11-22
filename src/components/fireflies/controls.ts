import { fireflies } from "./fireflies";

// at: dotted path to the value; step: per drag notch / arrow key
export const controls = {
  fireflies: { at: "count", min: 1, max: 500, step: 10, whole: true },
  reach: { at: "neighbours.within", min: 0, max: 400, step: 5, whole: true },
  px: { at: "pixel", min: 1, max: 12, step: 1, whole: true },
} as const;

export type ControlName = keyof typeof controls;
export const controlNames = Object.keys(controls) as ControlName[];

export function readControl(name: ControlName): number {
  const { parent, key } = locate(controls[name].at);
  return parent[key];
}

/** clamps to range; rounds if whole */
export function writeControl(name: ControlName, value: number) {
  const control = controls[name];
  const v = control.whole ? Math.round(value) : value;
  const { parent, key } = locate(control.at);
  parent[key] = Math.min(control.max, Math.max(control.min, v));
}

/** "a.b" -> { parent: a, key: "b" } */
function locate(path: string) {
  const keys = path.split(".");
  const key = keys.pop()!;
  const parent = keys.reduce<any>((o, k) => o[k], fireflies);
  return { parent: parent as Record<string, number>, key };
}
