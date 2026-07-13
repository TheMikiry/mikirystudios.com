/**
 * Viewport-selection style corner marks — a nod to framing a shot in the
 * 3D viewport. Place inside a `relative` container.
 */
export default function FrameCorners({
  color = "border-accent/70",
  size = "h-3 w-3",
  visible = true,
}: {
  color?: string;
  size?: string;
  visible?: boolean;
}) {
  const base = `pointer-events-none absolute ${size} ${color} transition-opacity duration-300 ${
    visible ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

  return (
    <>
      <span className={`${base} left-2 top-2 border-l border-t`} />
      <span className={`${base} right-2 top-2 border-r border-t`} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} />
    </>
  );
}
