const PALETTES = [
  ["#3a2a45", "#d98a3d"],
  ["#1f2e3a", "#4fa3a0"],
  ["#2e1f2a", "#c65a4a"],
  ["#233225", "#8fae5b"],
  ["#251f3a", "#8a6fd8"],
  ["#3a2a1f", "#e0b25a"],
] as const;

function hashSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function PlaceholderCover({
  seed,
  title,
  label,
  className = "",
}: {
  seed: string;
  title?: string;
  label?: string;
  className?: string;
}) {
  const palette = PALETTES[hashSeed(seed) % PALETTES.length];
  const angle = hashSeed(seed + "a") % 360;

  return (
    <div
      className={`relative flex flex-col justify-end overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${palette[0]}, ${palette[1]})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.45), transparent 40%), radial-gradient(circle at 80% 75%, rgba(0,0,0,0.55), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10" />

      {label && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-black/30 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-sm">
          {label}
        </span>
      )}

      {title && (
        <span className="relative z-10 p-4 text-lg font-semibold leading-tight text-balance text-white/95">
          {title}
        </span>
      )}
    </div>
  );
}
