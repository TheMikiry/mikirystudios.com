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
  label,
  className = "",
}: {
  seed: string;
  label?: string;
  className?: string;
}) {
  const palette = PALETTES[hashSeed(seed) % PALETTES.length];
  const angle = hashSeed(seed + "a") % 360;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${palette[0]}, ${palette[1]})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.5), transparent 45%)",
        }}
      />
      {label && (
        <span className="relative z-10 px-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
          {label}
        </span>
      )}
    </div>
  );
}
