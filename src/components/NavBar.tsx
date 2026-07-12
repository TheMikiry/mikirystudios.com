"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-[18px] w-[18px]"
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      className="h-[18px] w-[18px]"
    >
      <circle cx="9" cy="20.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20.5" r="1" fill="currentColor" stroke="none" />
      <path
        d="M2.5 3.5h2l2.2 11.6a1.8 1.8 0 0 0 1.77 1.4h8.66a1.8 1.8 0 0 0 1.77-1.44L20.5 7.5H6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-4 px-6 py-4 sm:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-semibold tracking-[0.15em] uppercase"
        >
          mikiry<span className="text-accent">studios</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted sm:flex">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-foreground ${
                  active ? "text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            aria-label="Log in"
            className="hidden text-muted transition-colors hover:text-foreground sm:block"
          >
            <UserIcon />
          </button>
          <button
            type="button"
            aria-label="Cart"
            className="relative hidden text-muted transition-colors hover:text-foreground sm:block"
          >
            <CartIcon />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-background">
              0
            </span>
          </button>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-border sm:hidden"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
              className="h-px w-4 bg-foreground"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              className="h-px w-4 bg-foreground"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
              className="h-px w-4 bg-foreground"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border sm:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4 text-sm">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex items-center gap-4 border-t border-border px-3 pt-4">
                <button
                  type="button"
                  aria-label="Log in"
                  className="flex items-center gap-2 text-muted"
                >
                  <UserIcon />
                  <span>Log in</span>
                </button>
                <button
                  type="button"
                  aria-label="Cart"
                  className="flex items-center gap-2 text-muted"
                >
                  <CartIcon />
                  <span>Cart (0)</span>
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
