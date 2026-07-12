import Link from "next/link";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/mkrhub", label: "mkrHub" },
  { href: "/about", label: "About" },
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.15em] uppercase">
          mikiry<span className="text-accent">studios</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
