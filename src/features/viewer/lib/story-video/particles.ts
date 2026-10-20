export type ParticleKind = "confetti" | "petals" | "sparkles" | "motes";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  phase: number;
  amp: number;
  color: string;
  shape: number;
}

const COLORS: Record<ParticleKind, string[]> = {
  confetti: ["#f43f5e", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#fb7185"],
  petals: ["#fda4af", "#fb7185", "#fecdd3", "#f9a8d4"],
  sparkles: ["#fcd34d", "#fde68a", "#fbbf24", "#86a96b", "#a3b18a"],
  motes: ["#ffffff", "#e0e7ff", "#fef3c7"],
};

export function kindForOccasion(occasion: string): ParticleKind {
  if (occasion === "birthday" || occasion === "congratulations") return "confetti";
  if (occasion === "anniversary") return "petals";
  if (occasion === "thank-you" || occasion === "thankyou") return "sparkles";
  return "motes";
}

/** Small seeded PRNG so the same wish always renders the same particles. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function createParticles(kind: ParticleKind): Particle[] {
  const rand = mulberry32(20240607);
  const colors = COLORS[kind];
  const count = kind === "confetti" ? 70 : 34;
  return Array.from({ length: count }, () => {
    // Prefer the side bands so the centre text stays readable.
    const edge = rand() < 0.6;
    const x = edge ? (rand() < 0.5 ? rand() * 0.18 : 0.82 + rand() * 0.18) : rand();
    return {
      x,
      y: rand(),
      size: (kind === "motes" ? 14 : 18) + rand() * (kind === "confetti" ? 22 : 26),
      speed: kind === "motes" ? 0.02 + rand() * 0.03 : 0.05 + rand() * 0.06,
      phase: rand() * Math.PI * 2,
      amp: 0.01 + rand() * 0.03,
      color: colors[Math.floor(rand() * colors.length)] ?? "#ffffff",
      shape: Math.floor(rand() * 2),
    };
  });
}

function heart(ctx: CanvasRenderingContext2D, s: number): void {
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.5, -s * 0.8, 0, -s * 0.3);
  ctx.bezierCurveTo(s * 0.5, -s * 0.8, s, -s * 0.2, 0, s * 0.35);
  ctx.fill();
}

function star(ctx: CanvasRenderingContext2D, s: number): void {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 === 0 ? s : s * 0.22;
    const a = (i * Math.PI) / 4 - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fill();
}

function drawShape(
  ctx: CanvasRenderingContext2D,
  kind: ParticleKind,
  p: Particle,
  s: number,
  t: number,
): void {
  const spin = t * (0.8 + p.speed * 10) + p.phase;
  if (kind === "confetti") {
    ctx.rotate(spin);
    ctx.scale(1, Math.cos(spin * 1.7));
    ctx.fillRect(-s / 2, -s / 4, s, s / 2);
  } else if (kind === "petals") {
    ctx.rotate(Math.sin(spin) * 0.8);
    if (p.shape === 0) heart(ctx, s);
    else {
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === "sparkles") {
    if (p.shape === 0) star(ctx, s * (0.6 + 0.4 * Math.sin(spin * 2)));
    else {
      ctx.rotate(spin * 0.5);
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.5, s * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    g.addColorStop(0, p.color);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, s, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawParticles(
  ctx: CanvasRenderingContext2D,
  kind: ParticleKind,
  particles: Particle[],
  t: number,
  w: number,
  h: number,
): void {
  const k = w / 1080;
  const rising = kind === "motes" || kind === "sparkles";
  for (const p of particles) {
    const travel = (p.y + p.speed * t) % 1.2;
    const fy = (rising ? 1.1 - travel : travel - 0.1) * h;
    const fx = (p.x + Math.sin(t * 0.9 + p.phase) * p.amp) * w;
    const nx = fx / w;
    const ny = fy / h;
    const overText = nx > 0.16 && nx < 0.84 && ny > 0.18 && ny < 0.82;
    const twinkle = 0.65 + 0.35 * Math.sin(t * 2 + p.phase);
    ctx.save();
    ctx.globalAlpha = (overText ? 0.2 : 0.85) * twinkle;
    ctx.fillStyle = p.color;
    ctx.translate(fx, fy);
    ctx.scale(k, k);
    drawShape(ctx, kind, p, p.size, t);
    ctx.restore();
  }
}
