"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon, InstagramIcon, YouTubeIcon, DiscordIcon } from "./SocialIcons";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

const socials = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "YouTube", href: "#", Icon: YouTubeIcon },
  { label: "Discord", href: "#", Icon: DiscordIcon },
];

function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      {...props}
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      {...props}
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

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm sm:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 left-0 z-[65] flex w-72 max-w-[82vw] flex-col border-r border-border bg-background/80 backdrop-blur-md sm:hidden"
          >
            <nav className="flex flex-1 flex-col gap-1 px-6 py-8 text-xl font-semibold">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`rounded-lg py-3 transition-colors hover:text-accent ${
                      active ? "text-foreground" : "text-foreground/90"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center justify-center gap-6 border-t border-border px-6 py-6">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount check, required for the portal target (document.body) to exist.
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const logo = (
    <Link
      href="/"
      onClick={() => setOpen(false)}
      className="text-sm font-semibold tracking-[0.15em] uppercase"
    >
      mikiry<span className="text-accent">studios</span>
    </Link>
  );

  const hamburger = (
    <button
      type="button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      onClick={() => setOpen((v) => !v)}
      className="relative z-[70] flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-border"
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
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6 py-4">
        {/* Desktop / tablet */}
        <div className="hidden items-center gap-4 sm:grid sm:grid-cols-[1fr_auto_1fr]">
          {logo}

          <nav className="flex items-center gap-8 text-sm text-muted">
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
            <Link
              href="/account"
              aria-label="Account"
              className="text-muted transition-colors hover:text-foreground"
            >
              <UserIcon className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              aria-label="Cart"
              className="relative text-muted transition-colors hover:text-foreground"
            >
              <CartIcon className="h-[18px] w-[18px]" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-background">
                0
              </span>
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:hidden">
          {hamburger}
          <div className="justify-self-center">{logo}</div>
          <div className="flex items-center justify-self-end gap-4">
            <Link href="/account" aria-label="Account" className="text-muted">
              <UserIcon className="h-[18px] w-[18px]" />
            </Link>
            <button type="button" aria-label="Cart" className="relative text-muted">
              <CartIcon className="h-[18px] w-[18px]" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-mono text-[9px] text-background">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <MobileMenu
            open={open}
            onClose={() => setOpen(false)}
            pathname={pathname}
          />,
          document.body,
        )}
    </header>
  );
}
