import { readFileSync, writeFileSync } from 'node:fs';

// Rebuilds the flat SVG logo into a *closed*, organically-inflated low-poly head.
//
// Instead of a fixed dome, depth comes from SDF inflation (a la Igarashi's
// "Teddy"): every welded vertex gets z proportional to sqrt(distance to the
// silhouette boundary). Narrow regions — the ears — come out thin slabs; the
// wide skull comes out round. On top of that, a weld-aware luminance relief
// recesses dark facets (eyes, nose, inner-ear shadows) into actual sockets,
// computed per shared vertex so adjacent facets never crack apart.
//
//   - front : original SVG facets, baked shades kept, inflated + relief
//   - back  : same silhouette mirrored to negative z, rounder, fur grey
//   - sides : thin rim wall bridging front and back silhouette rings
//
// Output is non-indexed (per-face vertices) so flatShading gives crisp facets.

const svg = readFileSync('public/dark-logo.svg', 'utf8');

const pathRe = /<path d="([^"]+)"[^>]*fill="([^"]+)"/g;
/** @type {{pts:[number,number][], c:[number,number,number]}[]} */
const facets = [];
for (const match of svg.matchAll(pathRe)) {
  const pts = parsePath(match[1]);
  if (pts.length < 3) continue;
  facets.push({ pts, c: hexToRgb(match[2]) });
}

function parsePath(d) {
  const tok = d.match(/[MLHVZ]|-?\d*\.?\d+/g) ?? [];
  const pts = [];
  let cx = 0;
  let cy = 0;
  let cmd = '';
  let i = 0;
  while (i < tok.length) {
    const t = tok[i];
    if (/[MLHVZ]/.test(t)) {
      cmd = t;
      i++;
      if (cmd === 'Z') continue;
    }
    if (cmd === 'M' || cmd === 'L') {
      cx = parseFloat(tok[i++]);
      cy = parseFloat(tok[i++]);
      pts.push([cx, cy]);
    } else if (cmd === 'H') {
      cx = parseFloat(tok[i++]);
      pts.push([cx, cy]);
    } else if (cmd === 'V') {
      cy = parseFloat(tok[i++]);
      pts.push([cx, cy]);
    } else i++;
  }
  // Drop a duplicate closing point.
  const out = [];
  for (const p of pts) {
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  return out;
}

function hexToRgb(hex) {
  const named = { white: '#ffffff', black: '#000000' };
  const h = (named[hex] || hex).replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const n = parseInt(full, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

// ---- coordinate mapping ------------------------------------------------------
const W = 365;
const SCALE = 2 / W; // model x spans ~[-1, 1]
const cX = W / 2;
const cY = 290; // vertical model origin sits on the face

const vx = (x) => (x - cX) * SCALE;
const vy = (y) => -(y - cY) * SCALE;

// ---- weld vertices, find silhouette boundary ----------------------------------
const key = (x, y) => `${x.toFixed(2)},${y.toFixed(2)}`;
const uniq = new Map(); // key -> {x, y}
for (const f of facets) {
  for (const p of f.pts) {
    const k = key(p[0], p[1]);
    if (!uniq.has(k)) uniq.set(k, { x: p[0], y: p[1] });
  }
}

// ---- T-junction resolution ------------------------------------------------------
// The SVG triangulation has vertices that sit in the middle of a neighboring
// facet's edge. Once z becomes a nonlinear function of (x, y), those edges tear
// open into cracks. Split every triangle whose edge hosts another vertex until
// the mesh is conforming (watertight under any per-vertex z).
const EPS_PERP = 0.35; // max perpendicular distance (svg units) to count as "on edge"
function onSegment(v, a, b) {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len = Math.hypot(abx, aby);
  if (len < 1e-6) return false;
  const t = ((v.x - a.x) * abx + (v.y - a.y) * aby) / (len * len);
  if (t < 0.001 || t > 0.999) return false;
  const cross = Math.abs((v.x - a.x) * aby - (v.y - a.y) * abx) / len;
  return cross < EPS_PERP;
}

// Signed area in SVG coordinates (y-down). Model space negates y, so a tri
// that should be CCW (front-facing +z) in model space must be CW (negative
// area) here.
const svgArea = (ka, kb, kc) => {
  const a = uniq.get(ka);
  const b = uniq.get(kb);
  const c = uniq.get(kc);
  return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
};

// Front triangles carry their facet color through the splitting. The SVG has
// mixed path windings and literal duplicate paths; normalize here — otherwise
// CW facets get backface-culled into holes and duplicates z-fight.
const triById = new Map();
for (const f of facets) {
  const ks = f.pts.map((p) => key(p[0], p[1]));
  for (let k = 1; k < ks.length - 1; k++) {
    const t = [ks[0], ks[k], ks[k + 1]];
    if (Math.abs(svgArea(t[0], t[1], t[2])) < 0.5) continue; // degenerate sliver
    // Duplicate paths: SVG paint order means the *last* one wins.
    triById.set([...t].sort().join('~'), { k: t, c: f.c });
  }
}
let fTris = [...triById.values()];

const allKeys = [...uniq.keys()];
let changed = true;
let splitCount = 0;
while (changed) {
  changed = false;
  const out = [];
  for (const t of fTris) {
    let split = null;
    for (const vk of allKeys) {
      if (t.k.includes(vk)) continue;
      const v = uniq.get(vk);
      for (let e = 0; e < 3; e++) {
        if (onSegment(v, uniq.get(t.k[e]), uniq.get(t.k[(e + 1) % 3]))) {
          split = { vk, e };
          break;
        }
      }
      if (split) break;
    }
    if (split) {
      const A = t.k[split.e];
      const B = t.k[(split.e + 1) % 3];
      const C = t.k[(split.e + 2) % 3];
      out.push({ k: [A, split.vk, C], c: t.c }, { k: [split.vk, B, C], c: t.c });
      changed = true;
      splitCount++;
    } else out.push(t);
  }
  fTris = out;
}

// Enforce front-facing winding: model-space CCW == svg-space CW (area < 0).
for (const t of fTris) {
  if (svgArea(t.k[0], t.k[1], t.k[2]) > 0) [t.k[1], t.k[2]] = [t.k[2], t.k[1]];
}

// Boundary edges belong to exactly one triangle -> the outer silhouette.
// Computed on the conforming, consistently-wound mesh, keeping the *direction*
// each edge has inside its triangle so the rim walls can face outward.
const edgeCount = new Map();
const edgeKey = (a, b) => (a < b ? `${a}|${b}` : `${b}|${a}`);
const directedEdges = new Set();
for (const t of fTris) {
  const [a, b, c] = t.k;
  for (const [p, q] of [
    [a, b],
    [b, c],
    [c, a],
  ]) {
    const ek = edgeKey(p, q);
    edgeCount.set(ek, (edgeCount.get(ek) ?? 0) + 1);
    directedEdges.add(`${p}|${q}`);
  }
}
const boundary = []; // directed [from, to] as wound in its (CCW-model) triangle
for (const [ek, n] of edgeCount) {
  if (n !== 1) continue;
  const [a, b] = ek.split('|');
  boundary.push(directedEdges.has(`${a}|${b}`) ? [a, b] : [b, a]);
}

// ---- SDF inflation -------------------------------------------------------------
// Distance from a point to a segment, in SVG units.
function distToSegment(px, py, ax, ay, bx, by) {
  const abx = bx - ax;
  const aby = by - ay;
  const len2 = abx * abx + aby * aby;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * abx + (py - ay) * aby) / len2));
  const dx = px - (ax + t * abx);
  const dy = py - (ay + t * aby);
  return Math.hypot(dx, dy);
}

const boundarySegs = boundary.map(([ka, kb]) => {
  const a = uniq.get(ka);
  const b = uniq.get(kb);
  return [a.x, a.y, b.x, b.y];
});

// Per welded vertex: distance to nearest silhouette edge.
const sdf = new Map(); // key -> d (svg units)
let dMax = 0;
for (const [k, { x, y }] of uniq) {
  let d = Infinity;
  for (const [ax, ay, bx, by] of boundarySegs) {
    const dd = distToSegment(x, y, ax, ay, bx, by);
    if (dd < d) d = dd;
  }
  sdf.set(k, d);
  if (d > dMax) dMax = d;
}

// inflate(d): sqrt profile -> round rim falloff, ears (small d) stay thin.
const inflate = (k) => Math.sqrt(sdf.get(k) / dMax);

// ---- luminance relief -----------------------------------------------------------
// Per welded vertex: average luminance of the front facets touching it. Dark
// features (eyes, nose, inner ear) sink; recessing per shared vertex keeps the
// surface watertight (no per-facet cracks).
const lumSum = new Map();
const lumCount = new Map();
for (const f of facets) {
  const lum = 0.2126 * f.c[0] + 0.7152 * f.c[1] + 0.0722 * f.c[2];
  for (const p of f.pts) {
    const k = key(p[0], p[1]);
    lumSum.set(k, (lumSum.get(k) ?? 0) + lum);
    lumCount.set(k, (lumCount.get(k) ?? 0) + 1);
  }
}
const vertexLum = (k) => (lumSum.get(k) ?? 1) / (lumCount.get(k) ?? 1);

// ---- depth model -----------------------------------------------------------------
const FRONT_BASE = 0.09; // rim half-thickness, front side
const FRONT_PEAK = 0.46; // max skull bulge
const BACK_BASE = 0.09;
const BACK_PEAK = 0.72; // back of the skull is rounder than the face
const RELIEF = 0.12; // how deep the eye sockets sink

// Muzzle: a gaussian bump centered on the nose so the black nose tip is the
// forward-most point of the face, the way an actual snout works.
const NOSE_X = 182.5;
const NOSE_Y = 415; // svg coords of the nose tip
const MUZZLE = 0.24;
const MUZZLE_R = 60;
const EYE_MAX_Y = 360; // dark facets above this line are eyes -> recess

const muzzle = (x, y) =>
  MUZZLE * Math.exp(-(((x - NOSE_X) ** 2 + (y - NOSE_Y) ** 2) / (MUZZLE_R * MUZZLE_R)));

const frontZ = (k) => {
  const { x, y } = uniq.get(k);
  const socket = y < EYE_MAX_Y ? RELIEF * (1 - vertexLum(k)) : 0;
  return FRONT_BASE + FRONT_PEAK * inflate(k) + muzzle(x, y) - socket;
};
const backZ = (k) => -(BACK_BASE + BACK_PEAK * inflate(k));

// ---- emit geometry -----------------------------------------------------------------
const positions = [];
const colors = [];
const pushV = (x, y, z, c) => {
  positions.push(x, y, z);
  colors.push(c[0], c[1], c[2]);
};
const tri = (A, B, C, c) => {
  pushV(A[0], A[1], A[2], c);
  pushV(B[0], B[1], B[2], c);
  pushV(C[0], C[1], C[2], c);
};

const frontP = (k) => {
  const { x, y } = uniq.get(k);
  return [vx(x), vy(y), frontZ(k)];
};
const backP = (k) => {
  const { x, y } = uniq.get(k);
  return [vx(x), vy(y), backZ(k)];
};

// Front — conforming triangulation, shared inflated z per welded vertex.
for (const t of fTris) tri(frontP(t.k[0]), frontP(t.k[1]), frontP(t.k[2]), t.c);

// Back — same conforming mesh mirrored, reversed winding, uniform fur grey.
const BACK_COLOR = [0.8, 0.8, 0.82];
for (const t of fTris) tri(backP(t.k[2]), backP(t.k[1]), backP(t.k[0]), BACK_COLOR);

// Sides — thin rim wall bridging the front and back silhouette rings. With the
// directed (model-CCW) boundary, (fA, bB, fB) / (fA, bA, bB) wind outward.
const SIDE_COLOR = [0.62, 0.62, 0.66];
for (const [ka, kb] of boundary) {
  tri(frontP(ka), backP(kb), frontP(kb), SIDE_COLOR);
  tri(frontP(ka), backP(ka), backP(kb), SIDE_COLOR);
}

const triTotal = positions.length / 9;
const out = `// AUTO-GENERATED by scripts/generate-bunny-geometry.mjs from public/dark-logo.svg.
// Do not edit by hand — rerun: node scripts/generate-bunny-geometry.mjs
// Closed low-poly bunny head, SDF-inflated (thin ears, round skull) with
// luminance relief (eyes/nose recessed); solid from every angle.
export const POSITIONS = new Float32Array([
${chunk(positions)}
]);
export const COLORS = new Float32Array([
${chunk(colors)}
]);
export const TRI_COUNT = ${triTotal};
`;

function chunk(arr) {
  const lines = [];
  for (let i = 0; i < arr.length; i += 9) {
    lines.push(
      '  ' +
        arr
          .slice(i, i + 9)
          .map((v) => Number(v.toFixed(4)))
          .join(', ') +
        ','
    );
  }
  return lines.join('\n');
}

writeFileSync('src/components/BunnyHead/geometry.ts', out);
console.log(
  `facets=${facets.length} tJunctionSplits=${splitCount} boundaryEdges=${boundary.length} dMax=${dMax.toFixed(1)} triangles=${triTotal} verts=${positions.length / 3}`
);
