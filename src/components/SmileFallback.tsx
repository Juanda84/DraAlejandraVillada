"use client";

/** A native-SVG fallback for reduced motion or unavailable WebGL. */
export default function SmileFallback() {
  const teeth = Array.from({ length: 12 }, (_, i) => {
    const x = i - 5.5;
    const edge = Math.abs(x) / 5.5;
    const width = edge > 0.67 ? 28 : edge > 0.36 ? 35 : 41;
    const height = edge > 0.65 ? 59 : 72;
    return { x: 360 + x * 43, y: 135 + edge * edge * 65, width, height, rot: x * 2.1 };
  });

  return (
    <svg className="fallback-smile" viewBox="0 0 720 400" role="img" aria-label="Ilustración conceptual de una arcada dental armonizada">
      <defs>
        <linearGradient id="toothShade" x1="0" y1="0" x2="0.85" y2="1">
          <stop stopColor="#fff" />
          <stop offset="0.65" stopColor="#f8f8f4" />
          <stop offset="1" stopColor="#d4b8a1" />
        </linearGradient>
      </defs>
      <path d="M84 258 Q360 364 636 258" fill="none" stroke="#d4b8a1" strokeWidth="1" opacity=".35" />
      {teeth.map((t, i) => (
        <rect
          key={i}
          x={t.x - t.width / 2}
          y={t.y}
          width={t.width}
          height={t.height}
          rx={t.width * .28}
          fill="url(#toothShade)"
          stroke="#cbb9ac"
          strokeWidth="1.5"
          transform={`rotate(${t.rot} ${t.x} ${t.y})`}
        />
      ))}
    </svg>
  );
}
