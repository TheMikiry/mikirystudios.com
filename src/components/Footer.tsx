export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} mikirystudios</span>
        <span>Rigging &amp; tools for 3D games &amp; animation</span>
      </div>
    </footer>
  );
}
