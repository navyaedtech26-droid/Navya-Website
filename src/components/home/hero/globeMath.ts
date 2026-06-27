import {
  ACCENT,
  CARD_ACCENT,
  CARD_NODE,
  CITY_COLOR,
  type Projected,
  type SphereDot,
} from "./data";

/** Even-ish lat/long grid of dots covering the sphere. */
export function buildGridDots(): SphereDot[] {
  const dots: SphereDot[] = [];
  for (let lat = -80; lat <= 80; lat += 14) {
    const r = Math.cos((lat * Math.PI) / 180);
    const count = Math.max(1, Math.round(r * 22));
    for (let i = 0; i < count; i++) {
      const lng = (i / count) * 360 - 180;
      dots.push({
        lat: (lat * Math.PI) / 180,
        lng: (lng * Math.PI) / 180,
        type: "grid",
      });
    }
  }
  return dots;
}

export function project3D(
  lat: number,
  lng: number,
  rotY: number,
  rotX: number,
  R: number
): Projected {
  const x = Math.cos(lat) * Math.sin(lng);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lng);
  // rotate Y
  const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
  const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
  // rotate X
  const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  return { x: x1 * R, y: -y2 * R, z: z2, visible: z2 > -0.1 };
}

// Point along a lifted great-circle-ish arc between two sphere dots
export function arcPoint(
  p1: SphereDot,
  p2: SphereDot,
  t: number,
  rotY: number,
  rotX: number,
  R: number,
  CX: number,
  CY: number
) {
  const lat = p1.lat + (p2.lat - p1.lat) * t;
  const lng = p1.lng + (p2.lng - p1.lng) * t;
  const lift = Math.sin(t * Math.PI) * 0.18;
  const pr = project3D(lat, lng, rotY, rotX, R);
  return {
    sx: CX + pr.x,
    sy: CY + pr.y - lift * R * 0.3,
    z: pr.z,
    visible: pr.visible,
  };
}

// Resolve a city node's base accent: card-linked nodes match their tether,
// a few others are sprinkled green/gold, the rest stay blue.
export function cityBaseColor(di: number): string {
  const ci = CARD_NODE.indexOf(di);
  if (ci >= 0) return CARD_ACCENT[ci];
  return CITY_COLOR[di] ?? ACCENT.blue;
}

export const qbez = (a: number, b: number, c: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;

export const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
