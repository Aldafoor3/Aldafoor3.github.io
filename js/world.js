/* Block world: procedural pixel textures, terrain, 7 stations, avatar, camera travel.
   Public API on window.World (see bottom). All textures are drawn in code. */
(function () {
  'use strict';
  const World = (window.World = { ok: false, onPick: null });

  const SECTION_COUNT = 7;
  const STATION_R = 13.5;   // ring where buildings stand
  const WALK_R = 9.8;       // path the avatar walks on
  const FLAT_H = 3;         // ground height (in blocks) around the ring
  const AVATAR_OFFSET = 0.24; // avatar stands this far (radians) left of the station
  const WATER_Y = 1;        // layer index of the pond surface block

  /* ---------- small helpers ---------- */
  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const stationAngle = (i) => Math.PI / 2 + (i * Math.PI * 2) / SECTION_COUNT;
  function wrapAngle(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  /* ---------- pixel textures (2D canvas, no THREE needed) ---------- */
  const CANVAS = {};
  function cnv(w, h) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h || w;
    return c;
  }
  function shade(rgb, k, a) {
    const v = rgb.map((x) => clamp(Math.round(x * k), 0, 255));
    return a === undefined ? `rgb(${v})` : `rgba(${v},${a})`;
  }
  function noise(g, rgb, vary, r, x0 = 0, y0 = 0, w = 16, h = 16) {
    for (let y = y0; y < y0 + h; y++)
      for (let x = x0; x < x0 + w; x++) {
        g.fillStyle = shade(rgb, 1 + (r() - 0.5) * vary);
        g.fillRect(x, y, 1, 1);
      }
  }
  function specks(g, rgb, n, r, size = 1) {
    for (let i = 0; i < n; i++) {
      g.fillStyle = shade(rgb, 0.85 + r() * 0.3);
      g.fillRect(Math.floor(r() * 16), Math.floor(r() * 16), size, size);
    }
  }
  function oreSpots(g, rgb, r) {
    for (let i = 0; i < 6; i++) {
      const x = 1 + Math.floor(r() * 13), y = 1 + Math.floor(r() * 13);
      g.fillStyle = shade(rgb, 0.75); g.fillRect(x, y, 2, 2);
      g.fillStyle = shade(rgb, 1.15); g.fillRect(x, y, 1, 1);
      if (r() > 0.5) { g.fillStyle = shade(rgb, 1); g.fillRect(x + 2, y + 1, 1, 1); }
    }
  }
  function bevel(g, light, dark) {
    g.fillStyle = light; g.fillRect(0, 0, 16, 1); g.fillRect(0, 0, 1, 16);
    g.fillStyle = dark; g.fillRect(0, 15, 16, 1); g.fillRect(15, 0, 1, 16);
  }

  const GREEN = [95, 159, 53];
  const DRAW = {
    grass(g, r) { noise(g, GREEN, 0.3, r); },
    dirt(g, r) { noise(g, [134, 96, 67], 0.35, r); specks(g, [92, 64, 44], 12, r); },
    grassSide(g, r) {
      DRAW.dirt(g, r);
      for (let x = 0; x < 16; x++) {
        const d = 2 + Math.floor(r() * 3) + (r() > 0.85 ? 2 : 0);
        for (let y = 0; y < d; y++) { g.fillStyle = shade(GREEN, 1 + (r() - 0.5) * 0.3); g.fillRect(x, y, 1, 1); }
      }
    },
    path(g, r) { noise(g, [150, 122, 68], 0.22, r); specks(g, [120, 96, 55], 14, r); },
    stone(g, r) { noise(g, [125, 125, 125], 0.2, r); specks(g, [102, 102, 102], 14, r, 2); },
    cobble(g, r) {
      noise(g, [72, 72, 72], 0.2, r);
      for (let gy = 0; gy < 4; gy++)
        for (let gx = 0; gx < 4; gx++) {
          const x = gx * 4 + (gy % 2 ? 1 : 0), w = r() > 0.4 ? 3 : 4, h = r() > 0.5 ? 3 : 2;
          noise(g, [128, 128, 128], 0.3, r, x % 16, gy * 4, Math.min(w, 16 - (x % 16)), h);
        }
    },
    sand(g, r) { noise(g, [219, 207, 163], 0.12, r); specks(g, [196, 182, 140], 10, r); },
    water(g, r) { noise(g, [52, 95, 215], 0.18, r); for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(160,200,255,.6)'; g.fillRect(Math.floor(r() * 14), Math.floor(r() * 16), 3, 1); } },
    planks(g, r) {
      noise(g, [162, 130, 78], 0.14, r);
      g.fillStyle = shade([112, 86, 50], 1);
      for (let row = 0; row < 4; row++) {
        g.fillRect(0, row * 4 + 3, 16, 1);
        const sx = row % 2 ? 4 : 11;
        g.fillRect(sx, row * 4, 1, 3);
      }
    },
    roof(g, r) {
      noise(g, [96, 70, 44], 0.16, r);
      g.fillStyle = shade([62, 44, 26], 1);
      for (let row = 0; row < 4; row++) { g.fillRect(0, row * 4 + 3, 16, 1); g.fillRect(row % 2 ? 6 : 13, row * 4, 1, 3); }
    },
    logSide(g, r) {
      for (let x = 0; x < 16; x++) {
        const k = x % 4 === 0 ? 0.72 : x % 3 === 0 ? 0.88 : 1;
        for (let y = 0; y < 16; y++) { g.fillStyle = shade([104, 82, 52], k * (1 + (r() - 0.5) * 0.18)); g.fillRect(x, y, 1, 1); }
      }
    },
    logTop(g, r) {
      for (let y = 0; y < 16; y++)
        for (let x = 0; x < 16; x++) {
          const d = Math.max(Math.abs(x - 7.5), Math.abs(y - 7.5));
          const base = d > 6.5 ? [104, 82, 52] : Math.floor(d) % 2 ? [176, 141, 86] : [150, 116, 70];
          g.fillStyle = shade(base, 1 + (r() - 0.5) * 0.12); g.fillRect(x, y, 1, 1);
        }
    },
    leaves(g, r) { noise(g, [58, 135, 38], 0.55, r); specks(g, [28, 78, 20], 34, r); },
    glass(g) {
      g.clearRect(0, 0, 16, 16);
      g.fillStyle = 'rgba(200,232,245,.16)'; g.fillRect(1, 1, 14, 14);
      g.fillStyle = 'rgba(225,245,250,.95)'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16);
      g.fillStyle = 'rgba(255,255,255,.8)'; g.fillRect(3, 4, 1, 1); g.fillRect(4, 3, 1, 1); g.fillRect(4, 5, 1, 1); g.fillRect(5, 4, 1, 1); g.fillRect(10, 10, 1, 1); g.fillRect(11, 9, 1, 1);
    },
    gold(g, r) { noise(g, [249, 214, 70], 0.12, r); bevel(g, 'rgb(255,250,170)', 'rgb(190,140,30)'); specks(g, [255, 240, 140], 8, r); },
    obsidian(g, r) { noise(g, [22, 16, 34], 0.5, r); specks(g, [70, 44, 110], 9, r); },
    portal(g, r) {
      for (let y = 0; y < 16; y++)
        for (let x = 0; x < 16; x++) {
          const k = 0.75 + 0.35 * Math.sin(x * 0.9 + Math.sin(y * 0.7) * 2) + (r() - 0.5) * 0.15;
          g.fillStyle = shade([128, 44, 220], k, 0.82); g.fillRect(x, y, 1, 1);
        }
    },
    chestSide(g, r) {
      noise(g, [164, 108, 42], 0.15, r);
      g.fillStyle = 'rgb(66,40,12)';
      g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); g.fillRect(0, 5, 16, 1);
    },
    chestTop(g, r) { noise(g, [170, 112, 46], 0.15, r); g.fillStyle = 'rgb(66,40,12)'; g.fillRect(0, 0, 16, 1); g.fillRect(0, 15, 16, 1); g.fillRect(0, 0, 1, 16); g.fillRect(15, 0, 1, 16); },
    chestFront(g, r) { DRAW.chestSide(g, r); g.fillStyle = 'rgb(40,40,40)'; g.fillRect(6, 3, 4, 5); g.fillStyle = 'rgb(200,200,200)'; g.fillRect(7, 4, 2, 3); },
    craftTop(g, r) {
      DRAW.planks(g, r);
      g.fillStyle = 'rgb(90,60,30)'; g.fillRect(0, 0, 16, 2); g.fillRect(0, 14, 16, 2); g.fillRect(0, 0, 2, 16); g.fillRect(14, 0, 2, 16);
      g.fillStyle = 'rgb(120,86,48)'; g.fillRect(5, 2, 1, 12); g.fillRect(10, 2, 1, 12); g.fillRect(2, 5, 12, 1); g.fillRect(2, 10, 12, 1);
    },
    craftSide(g, r) {
      DRAW.planks(g, r);
      g.fillStyle = 'rgb(90,60,30)'; g.fillRect(0, 0, 16, 3);
      g.fillStyle = 'rgb(150,150,150)'; g.fillRect(3, 6, 4, 2); g.fillRect(4, 8, 2, 5);
      g.fillStyle = 'rgb(110,80,40)'; g.fillRect(10, 5, 1, 8); g.fillStyle = 'rgb(160,160,160)'; g.fillRect(9, 5, 4, 2);
    },
    furnace(g, r) {
      DRAW.cobble(g, r);
      g.fillStyle = 'rgb(20,20,20)'; g.fillRect(4, 8, 8, 6);
      g.fillStyle = 'rgb(255,150,40)'; g.fillRect(5, 12, 6, 2); g.fillStyle = 'rgb(255,220,90)'; g.fillRect(6, 13, 2, 1); g.fillRect(9, 12, 1, 1);
      g.fillStyle = 'rgb(60,60,60)'; g.fillRect(3, 3, 10, 2);
    },
    flowerRed(g) {
      g.clearRect(0, 0, 16, 16);
      g.fillStyle = 'rgb(60,130,40)'; g.fillRect(7, 8, 2, 8); g.fillRect(9, 11, 2, 2); g.fillRect(5, 12, 2, 2);
      g.fillStyle = 'rgb(220,30,30)'; g.fillRect(6, 3, 4, 4); g.fillRect(5, 4, 6, 2); g.fillRect(7, 2, 2, 6);
      g.fillStyle = 'rgb(255,220,60)'; g.fillRect(7, 4, 2, 2);
    },
    flowerYellow(g) {
      g.clearRect(0, 0, 16, 16);
      g.fillStyle = 'rgb(60,130,40)'; g.fillRect(7, 9, 2, 7); g.fillRect(9, 12, 2, 2);
      g.fillStyle = 'rgb(250,220,40)'; g.fillRect(6, 5, 4, 4); g.fillRect(7, 4, 2, 6); g.fillRect(5, 6, 6, 2);
    },
    tallGrass(g, r) {
      g.clearRect(0, 0, 16, 16);
      for (let i = 0; i < 9; i++) {
        const x = 1 + Math.floor(r() * 14), h = 5 + Math.floor(r() * 9);
        g.fillStyle = shade([88, 150, 50], 0.8 + r() * 0.4); g.fillRect(x, 16 - h, 1, h);
      }
    }
  };
  const ORES = { coalOre: [38, 38, 38], ironOre: [216, 175, 147], goldOre: [252, 238, 75], redstoneOre: [230, 20, 20], lapisOre: [35, 70, 190], diamondOre: [92, 219, 213], emeraldOre: [23, 221, 98] };
  Object.keys(ORES).forEach((k) => { DRAW[k] = (g, r) => { DRAW.stone(g, r); oreSpots(g, ORES[k], r); }; });

  function canvasFor(name) {
    if (CANVAS[name]) return CANVAS[name];
    const c = cnv(16);
    const g = c.getContext('2d');
    let seed = 0;
    for (const ch of name) seed = (seed * 31 + ch.charCodeAt(0)) | 0;
    DRAW[name](g, rng(seed));
    return (CANVAS[name] = c);
  }

  /* Isometric block icon for the UI hotbar: top / left / right faces */
  const ICONS = {
    grass: ['grass', 'grassSide', 'grassSide'],
    planks: ['planks', 'planks', 'planks'],
    cobble: ['cobble', 'cobble', 'cobble'],
    diamondOre: ['diamondOre', 'diamondOre', 'diamondOre'],
    chestFront: ['chestTop', 'chestFront', 'chestSide'],
    gold: ['gold', 'gold', 'gold'],
    portalIcon: ['portal', 'obsidian', 'obsidian'],
    craft: ['craftTop', 'craftSide', 'craftSide'],
    furnace: ['cobble', 'furnace', 'cobble']
  };
  const iconCache = {};
  World.iconURL = function (name) {
    if (iconCache[name]) return iconCache[name];
    const faces = ICONS[name] || [name, name, name];
    const c = cnv(48, 52);
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = false;
    const draw = (tex, m, dark) => {
      g.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      g.drawImage(canvasFor(tex), 0, 0);
      if (dark) { g.fillStyle = `rgba(0,0,0,${dark})`; g.fillRect(0, 0, 16, 16); }
    };
    draw(faces[0], [1.5, 0.75, -1.5, 0.75, 24, 0], 0);
    draw(faces[1], [1.5, 0.75, 0, 1.75, 0, 12], 0.22);
    draw(faces[2], [1.5, -0.75, 0, 1.75, 24, 24], 0.4);
    g.setTransform(1, 0, 0, 1, 0, 0);
    return (iconCache[name] = c.toDataURL());
  };
  World.patternURL = (name) => canvasFor(name).toDataURL();

  /* ---------- everything below needs THREE ---------- */
  let THREE, renderer, scene, camera, clock;
  let hemi, sun, sunMesh, moonMesh, stars, clouds = [], fog;
  let waterTex, portalTex, portalParticles, beam;
  let avatar, limbs = {};
  const chests = {};          // id -> {lid, group, open}
  const pickables = [];       // meshes with userData.section / userData.project
  let hoverBox;
  const raycaster = { ray: null };
  const pointer = { x: 0, y: 0, active: false, moved: false };
  let opts = {};
  let layout = 'left';
  let night = false, nightMix = 0;
  let current = 0;
  let travel = null;          // {from, to, t0, dur}
  let intro = null;
  let camTheta = stationAngle(0), avatarTheta = stationAngle(0);
  let avatarFacing = 0, walkPhase = 0, walking = 0;
  let running = false;
  const tmp = {};

  const texCache = {};
  function tex(name) {
    if (texCache[name]) return texCache[name];
    const t = new THREE.CanvasTexture(canvasFor(name));
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    return (texCache[name] = t);
  }
  const matCache = {};
  function mat(name, extra) {
    const key = name + (extra ? JSON.stringify(extra) : '');
    if (matCache[key]) return matCache[key];
    return (matCache[key] = new THREE.MeshLambertMaterial(Object.assign({ map: tex(name) }, extra || {})));
  }
  /* BoxGeometry face order: +x, -x, +y, -y, +z, -z */
  function blockMaterial(type) {
    switch (type) {
      case 'grass': return [mat('grassSide'), mat('grassSide'), mat('grass'), mat('dirt'), mat('grassSide'), mat('grassSide')];
      case 'path': return [mat('dirt'), mat('dirt'), mat('path'), mat('dirt'), mat('dirt'), mat('dirt')];
      case 'log': return [mat('logSide'), mat('logSide'), mat('logTop'), mat('logTop'), mat('logSide'), mat('logSide')];
      case 'craft': return [mat('craftSide'), mat('craftSide'), mat('craftTop'), mat('planks'), mat('craftSide'), mat('craftSide')];
      case 'furnace': return [mat('cobble'), mat('cobble'), mat('cobble'), mat('cobble'), mat('furnace'), mat('cobble')];
      case 'water': return mat('water', { transparent: true, opacity: 0.78 });
      case 'glass': return mat('glass', { transparent: true, alphaTest: 0.05 });
      default: return mat(type);
    }
  }

  /* ---------- terrain ---------- */
  function hash2(x, z, s) {
    const v = Math.sin(x * 127.1 + z * 311.7 + s * 74.7) * 43758.5453;
    return v - Math.floor(v);
  }
  function vnoise(x, z, cell, s) {
    const gx = x / cell, gz = z / cell;
    const x0 = Math.floor(gx), z0 = Math.floor(gz);
    const fx = gx - x0, fz = gz - z0;
    const sx = fx * fx * (3 - 2 * fx), sz = fz * fz * (3 - 2 * fz);
    const a = hash2(x0, z0, s), b = hash2(x0 + 1, z0, s), c = hash2(x0, z0 + 1, s), d = hash2(x0 + 1, z0 + 1, s);
    return (a + (b - a) * sx) * (1 - sz) + (c + (d - c) * sx) * sz;
  }

  const cells = new Map();    // "x,y,z" -> [type, x, y, z]; first writer wins unless forced
  const solid = { has: (k) => cells.has(k) };
  function put(type, x, y, z, force) {
    const k = x + ',' + y + ',' + z;
    if (cells.has(k) && !force) return;
    cells.set(k, [type, x, y, z]);
  }

  let stations = [];
  function buildStations() {
    stations = [];
    for (let i = 0; i < SECTION_COUNT; i++) {
      const a = stationAngle(i);
      const cx = Math.round(Math.cos(a) * STATION_R), cz = Math.round(Math.sin(a) * STATION_R);
      // face the pond, snapped to 90 degrees so blocks stay on the grid
      const facing = Math.atan2(-Math.cos(a), -Math.sin(a));
      const k = ((Math.round(facing / (Math.PI / 2)) % 4) + 4) % 4;
      stations.push({ i, a, cx, cz, k });
    }
  }
  function nearestStation(x, z) {
    let best = 1e9;
    for (const s of stations) best = Math.min(best, Math.hypot(x - s.cx, z - s.cz));
    return best;
  }

  let N, HALF, heights;
  function heightAt(x, z) {
    if (x < -HALF || x >= HALF || z < -HALF || z >= HALF) return 0;
    return heights[(x + HALF) * N + (z + HALF)];
  }

  function buildTerrain() {
    N = opts.mobile ? 44 : 58;
    HALF = N / 2;
    heights = new Int8Array(N * N);
    const tops = [];
    for (let x = -HALF; x < HALF; x++)
      for (let z = -HALF; z < HALF; z++) {
        const r = Math.hypot(x, z);
        const ns = nearestStation(x, z);
        let h, top = 'grass';
        if (r < 4.6) { h = 1; top = 'sand'; }
        else if (r < 5.9) { h = 2; top = 'sand'; }
        else if (r < 11.3 || ns < 4.3) {
          h = FLAT_H;
          if (r >= 9.1 && r <= 10.5) top = 'path';
        } else {
          const t = clamp(Math.min(r - 11.3, ns - 4.3) / 5, 0, 1);
          const n = vnoise(x, z, 9, 1) * 0.7 + vnoise(x, z, 4, 2) * 0.3;
          h = FLAT_H + Math.round(n * 7 * t);
        }
        heights[(x + HALF) * N + (z + HALF)] = h;
        tops.push([x, z, h, top]);
      }
    for (const [x, z, h, top] of tops) {
      const minN = Math.min(heightAt(x + 1, z), heightAt(x - 1, z), heightAt(x, z + 1), heightAt(x, z - 1));
      const from = Math.max(0, Math.min(minN, h - 1) - (Math.hypot(x, z) < 6 ? 1 : 0));
      for (let y = from; y < h; y++) {
        let type = 'stone';
        if (y === h - 1) type = top;
        else if (y >= h - 3) type = top === 'sand' ? 'sand' : 'dirt';
        put(type, x, y, z);
      }
      if (Math.hypot(x, z) < 4.6) put('water', x, WATER_Y, z);
    }
  }

  function tree(x, z, r, base) {
    const h = base === undefined ? heightAt(x, z) : base;
    const trunk = 4 + Math.floor(r() * 2);
    for (let y = 0; y < trunk; y++) put('log', x, h + y, z);
    const top = h + trunk;
    for (let y = top - 2; y <= top + 1; y++) {
      const rad = y >= top ? 1 : 2;
      for (let dx = -rad; dx <= rad; dx++)
        for (let dz = -rad; dz <= rad; dz++) {
          const corner = Math.abs(dx) === rad && Math.abs(dz) === rad;
          if (corner && (y === top + 1 || r() > 0.45)) continue;
          if (y === top + 1 && rad === 1 && (dx !== 0 && dz !== 0)) continue;
          put('leaves', x + dx, y, z + dz);
        }
    }
  }

  function buildTrees() {
    const r = rng(42);
    const taken = [];
    for (let x = -HALF + 2; x < HALF - 2; x++)
      for (let z = -HALF + 2; z < HALF - 2; z++) {
        const d = Math.hypot(x, z);
        if (d < 16.5 || nearestStation(x, z) < 6) continue;
        if (r() > 0.045) continue;
        if (taken.some(([tx, tz]) => Math.abs(tx - x) < 4 && Math.abs(tz - z) < 4)) continue;
        taken.push([x, z]);
        tree(x, z, r);
      }
  }

  /* ---------- stations ---------- */
  // local (lx, lz) of a station -> world grid coords, rotated by k * 90deg
  function toWorld(s, lx, lz) {
    const a = (s.k * Math.PI) / 2;
    const c = Math.round(Math.cos(a)), sn = Math.round(Math.sin(a));
    return [s.cx + lx * c + lz * sn, s.cz - lx * sn + lz * c];
  }
  function sPut(s, type, lx, ly, lz, force) {
    const [x, z] = toWorld(s, lx, lz);
    put(type, x, FLAT_H + ly, z, force);
  }
  function stationGroup(s) {
    const g = new THREE.Group();
    g.position.set(s.cx, FLAT_H, s.cz);
    g.rotation.y = (s.k * Math.PI) / 2;
    scene.add(g);
    return g;
  }
  function hitBox(s, w, h, d) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ visible: false }));
    m.position.set(s.cx, FLAT_H + h / 2, s.cz);
    m.userData.section = s.i;
    scene.add(m);
    pickables.push(m);
  }

  function textCanvas(text, w, h, opt) {
    const c = cnv(w, h);
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.drawImage(canvasFor('planks'), 0, 0, w, h);
    g.fillStyle = opt && opt.color ? opt.color : '#2b1d0e';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    let size = opt && opt.size ? opt.size : Math.floor(h * 0.42);
    g.font = `${size}px "Press Start 2P", monospace`;
    while (g.measureText(text).width > w - 12 && size > 8) { size -= 1; g.font = `${size}px "Press Start 2P", monospace`; }
    g.fillText(text, w / 2, h / 2 + 1);
    return c;
  }
  function sign(parent, text, x, z, rotY, height) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, height || 1, 0.12), mat('logSide'));
    post.position.set(x, (height || 1) / 2, z);
    parent.add(post);
    const t = new THREE.CanvasTexture(textCanvas(text, 128, 64));
    t.magFilter = THREE.NearestFilter; t.minFilter = THREE.LinearFilter;
    const face = new THREE.MeshLambertMaterial({ map: t });
    const board = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.08), [mat('planks'), mat('planks'), mat('planks'), mat('planks'), face, mat('planks')]);
    board.position.set(x, (height || 1) + 0.25, z);
    board.rotation.y = rotY || 0;
    board.castShadow = true;
    parent.add(board);
    return board;
  }

  function buildHome(s) {
    const g = stationGroup(s);
    const r = rng(7);
    const [tx, tz] = toWorld(s, -2, -1);
    tree(tx, tz, r, FLAT_H);
    sign(g, 'SPAWN', 1.6, -0.4, 0, 1.1);
    hitBox(s, 6, 7, 6);
  }

  function buildHouse(s) {
    for (let lx = -2; lx <= 2; lx++)
      for (let lz = -2; lz <= 2; lz++) {
        const edge = Math.abs(lx) === 2 || Math.abs(lz) === 2;
        if (!edge) continue;
        const corner = Math.abs(lx) === 2 && Math.abs(lz) === 2;
        for (let ly = 0; ly < 3; ly++) {
          if (lx === 0 && lz === 2 && ly < 2) continue; // door
          const win = ly === 1 && !corner && ((Math.abs(lx) === 2 && lz === 0) || (lz === -2 && lx === 0) || (lz === 2 && Math.abs(lx) === 1));
          sPut(s, corner ? 'log' : win ? 'glass' : 'planks', lx, ly, lz);
        }
      }
    for (let ly = 3, rad = 3; rad >= 0; ly++, rad--)
      for (let lx = -rad; lx <= rad; lx++)
        for (let lz = -rad; lz <= rad; lz++)
          if (Math.abs(lx) === rad || Math.abs(lz) === rad || rad === 0) sPut(s, 'roof', lx, ly, lz);
    for (let lx = -1; lx <= 1; lx++) for (let lz = -1; lz <= 1; lz++) sPut(s, 'planks', lx, 2, lz); // ceiling
    const g = stationGroup(s);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.95, 0.12), mat('roof'));
    door.position.set(0, 0.98, 2.4);
    g.add(door);
    const knob = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.06), new THREE.MeshLambertMaterial({ color: 0x333333 }));
    knob.position.set(0.28, 1, 2.48);
    g.add(knob);
    hitBox(s, 7, 8, 7);
  }

  function buildJourney(s) {
    const cols = [[-2, 1, '2018'], [0, 2, '2021'], [2, 3, '2023']];
    for (const [lx, h] of cols) for (let ly = 0; ly < h; ly++) sPut(s, ly === h - 1 && h === 3 ? 'gold' : 'cobble', lx, ly, 0);
    sPut(s, 'cobble', -1, 0, 0); sPut(s, 'cobble', 1, 0, 0); sPut(s, 'cobble', 1, 1, 0);
    const g = stationGroup(s);
    cols.forEach(([lx, h, year]) => sign(g, year, lx, 1.3, 0, 0.9 + (h - 1) * 0.15));
    hitBox(s, 7, 6, 5);
  }

  function buildSkills(s) {
    const pattern = [
      'S c S i S S r',
      'S S d S g S S',
      'l S S e S c S',
      'S g S S d S i'
    ];
    const map = { S: 'stone', c: 'coalOre', i: 'ironOre', g: 'goldOre', r: 'redstoneOre', l: 'lapisOre', d: 'diamondOre', e: 'emeraldOre' };
    pattern.forEach((row, idx) => {
      const ly = 3 - idx;
      row.split(' ').forEach((ch, j) => sPut(s, map[ch], j - 3, ly, -1));
    });
    for (let lx = -3; lx <= 3; lx += 6) for (let ly = 0; ly < 3; ly++) sPut(s, 'stone', lx, ly, 0);
    sPut(s, 'craft', -1, 0, 1);
    sPut(s, 'furnace', 1, 0, 1);
    hitBox(s, 8, 6, 5);
  }

  function chest(parent, id, x) {
    const group = new THREE.Group();
    group.position.set(x, 0, 0);
    const side = mat('chestSide'), top = mat('chestTop');
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.875, 0.62, 0.875), [side, side, top, top, side, side]);
    base.position.y = 0.31;
    base.castShadow = true;
    group.add(base);
    const pivot = new THREE.Group();
    pivot.position.set(0, 0.62, -0.4375);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.875, 0.25, 0.875), [side, side, top, top, side, side]);
    lid.position.set(0, 0.125, 0.4375);
    lid.castShadow = true;
    pivot.add(lid);
    const latch = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.24, 0.07), new THREE.MeshLambertMaterial({ color: 0xc8c8c8 }));
    latch.position.set(0, 0.02, 0.9);
    pivot.add(latch);
    group.add(pivot);
    parent.add(group);
    [base, lid, latch].forEach((m) => { m.userData.project = id; pickables.push(m); });
    chests[id] = { pivot, group, open: 0, target: 0 };
  }

  function buildProjects(s) {
    const g = stationGroup(s);
    const ids = window.PROJECTS.map((p) => p.id);
    const labels = { daylight: 'DAYLIGHT', glucose: 'GLUCOSE', generio: 'GENERIO', gruppe: 'GRUPPE-I', bolleye: 'BÖLLEYE', mon: 'MON' };
    const half = Math.ceil((ids.length - 1) * 0.85) + 1; // floor reaches one block past the outer chests
    ids.forEach((id, n) => {
      const x = (n - (ids.length - 1) / 2) * 1.7;
      chest(g, id, x);
      sign(g, labels[id] || id.toUpperCase(), x, -0.95, 0, 1.25);
    });
    for (let lx = -half; lx <= half; lx++) for (let lz = -1; lz <= 1; lz++) sPut(s, 'planks', lx, -1, lz, true); // floor under the chests
    hitBox(s, half * 2 + 1, 4, 4);
  }

  function buildBeacon(s) {
    for (let lx = -1; lx <= 1; lx++) for (let lz = -1; lz <= 1; lz++) sPut(s, 'gold', lx, 0, lz);
    const g = stationGroup(s);
    const shell = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat('glass', { transparent: true, alphaTest: 0.05 }));
    shell.position.set(0, 1.5, 0);
    g.add(shell);
    const core = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.MeshBasicMaterial({ color: 0x8ff6ff }));
    core.position.copy(shell.position);
    g.add(core);
    beam = new THREE.Mesh(new THREE.BoxGeometry(0.4, 60, 0.4), new THREE.MeshBasicMaterial({ color: 0x9ff7ff, transparent: true, opacity: 0.45, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }));
    beam.position.set(0, 32, 0);
    g.add(beam);
    const light = new THREE.PointLight(0x8ff6ff, 0.9, 10);
    light.position.set(0, 2.2, 0);
    g.add(light);
    hitBox(s, 4, 6, 4);
  }

  function buildPortal(s) {
    for (let lx = -2; lx <= 2; lx++) { sPut(s, 'obsidian', lx, 0, 0); sPut(s, 'obsidian', lx, 4, 0); }
    for (let ly = 1; ly <= 3; ly++) { sPut(s, 'obsidian', -2, ly, 0); sPut(s, 'obsidian', 2, ly, 0); }
    const g = stationGroup(s);
    portalTex = tex('portal').clone();
    portalTex.needsUpdate = true;
    portalTex.wrapS = portalTex.wrapT = THREE.RepeatWrapping;
    portalTex.repeat.set(3, 3);
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), new THREE.MeshBasicMaterial({ map: portalTex, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthWrite: false }));
    plane.position.set(0, 2.5, 0);
    g.add(plane);
    const light = new THREE.PointLight(0xb055ff, 1.1, 9);
    light.position.set(0, 2.5, 1.2);
    g.add(light);
    const count = 50, pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) { pos[i * 3] = (Math.random() - 0.5) * 3.2; pos[i * 3 + 1] = Math.random() * 4.5; pos[i * 3 + 2] = (Math.random() - 0.5) * 1.2; }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    portalParticles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xd08cff, size: 0.09, transparent: true, opacity: 0.9 }));
    portalParticles.position.y = 0.5;
    g.add(portalParticles);
    hitBox(s, 6, 6, 3);
  }

  /* ---------- plants (crossed quads) ---------- */
  function crossGeometry() {
    const a = new THREE.PlaneGeometry(0.9, 0.9);
    a.rotateY(Math.PI / 4);
    const b = new THREE.PlaneGeometry(0.9, 0.9);
    b.rotateY(-Math.PI / 4);
    const geo = new THREE.BufferGeometry();
    const merge = (attr) => {
      const x = a.attributes[attr].array, y = b.attributes[attr].array;
      const out = new Float32Array(x.length + y.length);
      out.set(x); out.set(y, x.length);
      return new THREE.BufferAttribute(out, a.attributes[attr].itemSize);
    };
    geo.setAttribute('position', merge('position'));
    geo.setAttribute('normal', merge('normal'));
    geo.setAttribute('uv', merge('uv'));
    const ia = a.index.array, ib = b.index.array, offset = a.attributes.position.count;
    geo.setIndex(Array.from(ia).concat(Array.from(ib).map((v) => v + offset)));
    geo.translate(0, 0.45, 0);
    return geo;
  }
  function buildPlants() {
    const r = rng(99);
    const lists = { flowerRed: [], flowerYellow: [], tallGrass: [] };
    for (let x = -HALF + 1; x < HALF - 1; x++)
      for (let z = -HALF + 1; z < HALF - 1; z++) {
        const d = Math.hypot(x, z);
        if (d < 6.2 || (d >= 8.8 && d <= 10.8) || nearestStation(x, z) < 3.8) continue;
        const h = heightAt(x, z);
        if (solid.has(x + ',' + h + ',' + z)) continue;
        const roll = r();
        if (roll < 0.025) lists.flowerRed.push([x, h, z]);
        else if (roll < 0.05) lists.flowerYellow.push([x, h, z]);
        else if (roll < 0.16) lists.tallGrass.push([x, h, z]);
      }
    const geo = crossGeometry();
    const dummy = new THREE.Object3D();
    Object.keys(lists).forEach((name) => {
      const list = lists[name];
      if (!list.length) return;
      const m = new THREE.InstancedMesh(geo, new THREE.MeshLambertMaterial({ map: tex(name), transparent: true, alphaTest: 0.5, side: THREE.DoubleSide }), list.length);
      list.forEach(([x, y, z], i) => { dummy.position.set(x, y, z); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); });
      scene.add(m);
    });
  }

  function buildBlockMeshes() {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const dummy = new THREE.Object3D();
    const blocks = {};
    cells.forEach(([type, x, y, z]) => (blocks[type] = blocks[type] || []).push([x, y, z]));
    Object.keys(blocks).forEach((type) => {
      const list = blocks[type];
      const m = new THREE.InstancedMesh(geo, blockMaterial(type), list.length);
      list.forEach(([x, y, z], i) => { dummy.position.set(x, y + 0.5, z); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); });
      const see = type === 'water' || type === 'glass';
      m.castShadow = !see && !opts.mobile;
      m.receiveShadow = !see;
      if (type === 'water') { waterTex = m.material.map; waterTex.wrapS = waterTex.wrapT = THREE.RepeatWrapping; }
      scene.add(m);
    });
  }

  /* ---------- avatar ---------- */
  function pixTex(rows, legend) {
    const h = rows.length, w = rows[0].length;
    const c = cnv(w, h);
    const g = c.getContext('2d');
    rows.forEach((row, y) => [...row].forEach((ch, x) => { g.fillStyle = legend[ch]; g.fillRect(x, y, 1, 1); }));
    const t = new THREE.CanvasTexture(c);
    t.magFilter = t.minFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    return new THREE.MeshLambertMaterial({ map: t });
  }
  function buildAvatar() {
    const L = { H: '#1a1411', h: '#2a201b', S: '#c98f6b', s: '#b77d5b', G: '#202226', W: '#f2f2f2', E: '#3a2416', N: '#a86e4e', B: '#2b1c14', M: '#7a3b2e', P: '#8db8e0', p: '#6f9cc9', J: '#2c3e66', j: '#24345a', K: '#2a2a2a' };
    const face = pixTex(['HHHHHHHH', 'HhSHHShH', 'SSSSSSSS', 'SGGSSGGS', 'GWEGGEWG', 'SSSNNSSS', 'BSMMMMSB', 'BBBBBBBB'], L);
    const side = pixTex(['HHHHHHHH', 'HHHHHHHH', 'HHHhHHHS', 'HHSSSSSG', 'HSSSSSSS', 'SSSSSSSS', 'SSSSSSBB', 'SSSSSBBB'], L);
    const back = pixTex(['HHHHHHHH', 'HhHHHhHH', 'HHHHHHHH', 'HHhHHHHh', 'HHHHHHHH', 'HHHHHHHH', 'SSSSSSSS', 'SSSSSSSS'], L);
    const top = pixTex(['HhHHhHHH', 'HHHHHHhH', 'HHhHHHHH', 'HHHHhHHH', 'hHHHHHHh', 'HHHhHHHH', 'HHHHHHhH', 'HhHHHHHH'], L);
    const chin = pixTex(['BBBBBBBB'], L);
    const shirtFront = pixTex(['PPPWWPPP', 'PPPpPPPP', 'PPPpPPPP', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP', 'PPPPPPPP', 'pppppppp'], { ...L, W: '#d6e6f5' });
    const shirt = new THREE.MeshLambertMaterial({ color: 0x8db8e0 });
    const skin = new THREE.MeshLambertMaterial({ color: 0xc98f6b });
    const jeans = new THREE.MeshLambertMaterial({ color: 0x2c3e66 });
    const shoe = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
    const hairM = new THREE.MeshLambertMaterial({ color: 0x1a1411 });

    const g = new THREE.Group();
    const box = (w, h, d, m, x, y, z, parent) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      b.position.set(x, y, z);
      b.castShadow = true;
      (parent || g).add(b);
      return b;
    };
    // legs
    ['L', 'R'].forEach((side_, n) => {
      const pivot = new THREE.Group();
      pivot.position.set(n ? 0.125 : -0.125, 0.75, 0);
      box(0.25, 0.65, 0.25, jeans, 0, -0.325, 0, pivot);
      box(0.26, 0.1, 0.27, shoe, 0, -0.7, 0.005, pivot);
      g.add(pivot);
      limbs['leg' + side_] = pivot;
    });
    box(0.5, 0.75, 0.25, [shirt, shirt, shirt, shirt, shirtFront, shirt], 0, 1.125, 0);
    ['L', 'R'].forEach((side_, n) => {
      const pivot = new THREE.Group();
      pivot.position.set(n ? 0.375 : -0.375, 1.5, 0);
      box(0.25, 0.3, 0.25, shirt, 0, -0.15, 0, pivot);
      box(0.24, 0.45, 0.24, skin, 0, -0.525, 0, pivot);
      g.add(pivot);
      limbs['arm' + side_] = pivot;
    });
    const head = new THREE.Group();
    head.position.set(0, 1.5, 0);
    box(0.5, 0.5, 0.5, [side, side, top, chin, face, back], 0, 0.25, 0, head);
    const r = rng(5);
    for (let i = 0; i < 16; i++) {
      const s = 0.12 + r() * 0.06;
      const onTop = i < 10;
      const x = (r() - 0.5) * 0.46, z = onTop ? (r() - 0.6) * 0.46 : -0.25 - s / 3;
      const y = onTop ? 0.5 + s / 3 : 0.2 + r() * 0.28;
      box(s, s, s, hairM, x, y, z, head);
    }
    g.add(head);
    limbs.head = head;
    g.scale.setScalar(0.95);
    scene.add(g);
    return g;
  }

  /* ---------- sky ---------- */
  const SKY_DAY = new Float32Array([0.56, 0.78, 1]), SKY_NIGHT = new Float32Array([0.04, 0.06, 0.15]);
  function buildSky() {
    hemi = new THREE.HemisphereLight(0xdcefff, 0x5a4630, 0.8);
    scene.add(hemi);
    sun = new THREE.DirectionalLight(0xffffff, 0.85);
    sun.position.set(26, 46, 18);
    if (!opts.mobile) {
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      const sc = sun.shadow.camera;
      sc.left = -36; sc.right = 36; sc.top = 36; sc.bottom = -36; sc.near = 1; sc.far = 120;
      sun.shadow.bias = -0.0006;
    }
    scene.add(sun);
    sunMesh = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), new THREE.MeshBasicMaterial({ color: 0xfff3a0, fog: false }));
    sunMesh.position.set(70, 60, -90);
    sunMesh.lookAt(0, 0, 0);
    scene.add(sunMesh);
    moonMesh = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ color: 0xe8ecff, fog: false }));
    moonMesh.position.set(-70, 55, -90);
    moonMesh.lookAt(0, 0, 0);
    scene.add(moonMesh);
    const count = 500, pos = new Float32Array(count * 3), r = rng(3);
    for (let i = 0; i < count; i++) {
      const th = r() * Math.PI * 2, ph = r() * Math.PI * 0.45;
      pos[i * 3] = Math.cos(th) * Math.sin(ph) * 140; pos[i * 3 + 1] = Math.cos(ph) * 140 + 5; pos[i * 3 + 2] = Math.sin(th) * Math.sin(ph) * 140;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    stars = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 2, sizeAttenuation: false, transparent: true, opacity: 0, fog: false }));
    scene.add(stars);
    const cloudMat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x666666, transparent: true, opacity: 0.88 });
    const cr = rng(11);
    for (let i = 0; i < 14; i++) {
      const c = new THREE.Group();
      const parts = 2 + Math.floor(cr() * 3);
      for (let p = 0; p < parts; p++) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(3 + Math.floor(cr() * 6), 1, 2 + Math.floor(cr() * 4)), cloudMat);
        m.position.set(p * 2.5 - parts, 0, (cr() - 0.5) * 3);
        c.add(m);
      }
      c.position.set((cr() - 0.5) * 100, 24 + cr() * 4, (cr() - 0.5) * 90);
      scene.add(c);
      clouds.push(c);
    }
  }

  /* ---------- camera framing ---------- */
  // per-station camera: distance behind the pond centre, height, look offset, and avatar offset (radians)
  function stationView(i) {
    if (i === 0) return { back: 7, h: 11, look: 2.9, off: AVATAR_OFFSET };
    if (i === 4) return layout === 'bottom' // chests are small: come closer, avatar steps aside (phones need the whole row in a narrow view)
      ? { back: 2.2, h: 7.6, look: 2.8, off: 0.46 }
      : { back: -2.2, h: 6.6, look: 2.6, off: 0.46 };
    return { back: 2.4, h: 7.2, look: 4.2, off: AVATAR_OFFSET };
  }
  function camAt(theta, view, out) {
    const c = Math.cos(theta), s = Math.sin(theta);
    const side = layout === 'bottom' ? 0 : layout === 'right' ? 0.28 : -0.28;
    out.pos.set(-c * view.back, view.h, -s * view.back);
    const lt = theta + side;
    const down = layout === 'bottom' ? 2.6 : 0;
    out.look.set(Math.cos(lt) * 12.2, view.look - down, Math.sin(lt) * 12.2);
    return out;
  }
  function mixView(a, b, t) {
    return { back: a.back + (b.back - a.back) * t, h: a.h + (b.h - a.h) * t, look: a.look + (b.look - a.look) * t, off: a.off + (b.off - a.off) * t };
  }

  /* ---------- picking ---------- */
  let ray, ndc;
  function pick() {
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(pickables, false);
    return hits.length ? hits[0].object : null;
  }
  function onPointerMove(e) {
    const rect = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    pointer.moved = true;
  }
  function onClick(e) {
    onPointerMove(e);
    const obj = pick();
    if (!obj || !World.onPick) return;
    if (obj.userData.project) World.onPick({ project: obj.userData.project });
    else if (obj.userData.section !== undefined) World.onPick({ section: obj.userData.section });
  }
  function updateHover() {
    if (!pointer.moved) return;
    pointer.moved = false;
    const obj = pick();
    renderer.domElement.style.cursor = obj ? 'pointer' : '';
    if (obj && obj.userData.project) {
      const c = chests[obj.userData.project];
      c.group.getWorldPosition(hoverBox.position);
      hoverBox.position.y += 0.45;
      hoverBox.rotation.y = c.group.parent.rotation.y;
      hoverBox.visible = true;
    } else hoverBox.visible = false;
  }

  /* ---------- loop ---------- */
  const view = { pos: null, look: null };
  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const now = performance.now();

    // travel
    let walkSpeed = 0;
    if (travel) {
      const p = clamp((now - travel.t0) / travel.dur, 0, 1);
      const e = ease(p);
      camTheta = travel.from + travel.delta * e;
      const prev = avatarTheta;
      const pa = clamp((now - travel.t0) / (travel.dur * 0.92), 0, 1);
      const v = mixView(stationView(travel.fromIndex), stationView(travel.toIndex), e);
      avatarTheta = travel.from + travel.delta * ease(pa) - v.off;
      walkSpeed = Math.abs(avatarTheta - prev) / Math.max(dt, 0.001);
      camAt(camTheta, v, view);
      if (p >= 1) travel = null;
    } else {
      camTheta = stationAngle(current);
      const v = stationView(current);
      avatarTheta = camTheta - v.off;
      camAt(camTheta, v, view);
    }
    if (intro) {
      const p = clamp((now - intro.t0) / intro.dur, 0, 1);
      const e = ease(p);
      view.pos.lerpVectors(intro.pos, view.pos, e);
      view.look.lerpVectors(intro.look, view.look, e);
      avatar.scale.setScalar(0.95 * clamp((p - 0.55) / 0.3, 0, 1));
      if (p >= 1) intro = null;
    }
    // gentle idle sway of the camera
    if (!opts.reducedMotion) view.pos.y += Math.sin(t * 0.6) * 0.08;
    camera.position.copy(view.pos);
    camera.lookAt(view.look);

    // avatar position + facing
    const ax = Math.cos(avatarTheta) * WALK_R, az = Math.sin(avatarTheta) * WALK_R;
    avatar.position.set(ax, FLAT_H, az);
    walking += ((walkSpeed > 0.05 ? 1 : 0) - walking) * Math.min(1, dt * 8);
    let face;
    if (walkSpeed > 0.05 && travel) {
      const dir = Math.sign(travel.delta);
      face = Math.atan2(-Math.sin(avatarTheta) * dir, Math.cos(avatarTheta) * dir);
    } else face = Math.atan2(camera.position.x - ax, camera.position.z - az);
    avatarFacing += wrapAngle(face - avatarFacing) * Math.min(1, dt * 6);
    avatar.rotation.y = avatarFacing;
    walkPhase += dt * 10 * walking;
    const swing = Math.sin(walkPhase) * 0.7 * walking;
    limbs.legL.rotation.x = swing; limbs.legR.rotation.x = -swing;
    limbs.armL.rotation.x = -swing * 0.85 + (1 - walking) * Math.sin(t * 1.2) * 0.04;
    limbs.armR.rotation.x = swing * 0.85 - (1 - walking) * Math.sin(t * 1.2) * 0.04;
    limbs.head.rotation.y = (1 - walking) * Math.sin(t * 0.5) * 0.3;

    // chests
    Object.values(chests).forEach((c) => {
      c.open += (c.target - c.open) * Math.min(1, dt * 7);
      c.pivot.rotation.x = -c.open * 1.25;
    });

    // ambient motion
    if (!opts.reducedMotion) {
      clouds.forEach((c) => { c.position.x += dt * 0.7; if (c.position.x > 60) c.position.x = -60; });
      if (waterTex) waterTex.offset.x = (t * 0.03) % 1;
      if (portalTex) portalTex.offset.y = (t * 0.25) % 1;
      if (portalParticles) {
        const a = portalParticles.geometry.attributes.position;
        for (let i = 0; i < a.count; i++) { let y = a.getY(i) + dt * 0.5; if (y > 4.5) y = 0; a.setY(i, y); }
        a.needsUpdate = true;
      }
    }

    // day / night blend
    const target = night ? 1 : 0;
    nightMix += (target - nightMix) * Math.min(1, dt * 3);
    const k = nightMix;
    const sky = tmp.sky || (tmp.sky = new THREE.Color());
    sky.setRGB(SKY_DAY[0] + (SKY_NIGHT[0] - SKY_DAY[0]) * k, SKY_DAY[1] + (SKY_NIGHT[1] - SKY_DAY[1]) * k, SKY_DAY[2] + (SKY_NIGHT[2] - SKY_DAY[2]) * k);
    scene.background.copy(sky);
    fog.color.copy(sky);
    hemi.intensity = 0.8 - 0.3 * k;
    sun.intensity = 0.85 - 0.5 * k;
    sun.color.setRGB(1 - 0.35 * k, 1 - 0.25 * k, 1);
    stars.material.opacity = k;
    sunMesh.visible = k < 0.5;
    moonMesh.visible = k >= 0.5;
    if (beam) beam.material.opacity = 0.3 + 0.35 * k;

    updateHover();
    renderer.render(scene, camera);
  }

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.9 ? 72 : 55;
    camera.updateProjectionMatrix();
  }

  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 30)));

  /* ---------- public API ---------- */
  World.init = async function (o) {
    opts = o || {};
    THREE = window.THREE;
    const progress = opts.onProgress || (() => {});
    if (!THREE) return false;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: opts.canvas, antialias: window.devicePixelRatio < 2, powerPreference: 'high-performance' });
    } catch (err) {
      return false;
    }
    if (!renderer.getContext()) return false;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.mobile ? 1.5 : 2));
    renderer.shadowMap.enabled = !opts.mobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8fc7ff);
    fog = new THREE.Fog(0x8fc7ff, 32, 80);
    scene.fog = fog;
    camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
    clock = new THREE.Clock();
    ray = new THREE.Raycaster();
    ndc = new THREE.Vector2(-2, -2);
    view.pos = new THREE.Vector3();
    view.look = new THREE.Vector3();
    if (document.fonts && document.fonts.load) {
      try { await Promise.race([document.fonts.load('16px "Press Start 2P"'), new Promise((r) => setTimeout(r, 1500))]); } catch (e) { /* font is optional */ }
    }

    progress(0);
    await nextFrame();
    buildStations();
    buildTerrain();
    progress(1);
    await nextFrame();
    buildTrees();
    buildHome(stations[0]);
    buildHouse(stations[1]);
    buildJourney(stations[2]);
    buildSkills(stations[3]);
    progress(2);
    await nextFrame();
    buildProjects(stations[4]);
    buildBeacon(stations[5]);
    buildPortal(stations[6]);
    buildBlockMeshes();
    buildPlants();
    buildSky();
    progress(3);
    await nextFrame();
    avatar = buildAvatar();
    hoverBox = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.95, 0.95, 0.95)), new THREE.LineBasicMaterial({ color: 0x000000 }));
    hoverBox.visible = false;
    scene.add(hoverBox);

    resize();
    window.addEventListener('resize', resize);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) running = false;
      else if (!running && World.ok) { running = true; clock.getDelta(); frame(); }
    });
    World.ok = true;
    running = true;
    camAt(stationAngle(current), stationView(current), view);
    frame();
    progress(4);
    return true;
  };

  World.intro = function () {
    if (!World.ok || opts.reducedMotion) return;
    const th = stationAngle(current);
    intro = {
      t0: performance.now(), dur: 2600,
      pos: new THREE.Vector3(-Math.cos(th) * 30, 34, -Math.sin(th) * 30),
      look: new THREE.Vector3(0, 0, 0)
    };
  };

  World.goTo = function (i, instant) {
    if (!World.ok) { current = i; return; }
    if (i === current && !travel) return;
    const fromTheta = travel ? camTheta : stationAngle(current);
    const fromIndex = current;
    current = i;
    if (instant || opts.reducedMotion) { travel = null; return; }
    const delta = wrapAngle(stationAngle(i) - fromTheta);
    const steps = Math.abs(delta) / ((Math.PI * 2) / SECTION_COUNT);
    travel = { from: fromTheta, delta, t0: performance.now(), dur: 1300 + steps * 450, fromIndex, toIndex: i };
  };

  World.setNight = function (v) { night = !!v; };
  World.setLayout = function (mode) { layout = mode; };
  World.openChest = function (id, open) { if (chests[id]) chests[id].target = open ? 1 : 0; };
})();
