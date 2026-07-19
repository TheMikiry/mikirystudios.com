"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { GLASS_PANEL } from "@/lib/ui";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function BrowseLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
    >
      {label}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<"cart" | "viewed">("cart");

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
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-y-0 right-0 z-[65] flex w-96 max-w-[88vw] flex-col border-l border-border ${GLASS_PANEL}`}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-6">
                <button
                  type="button"
                  onClick={() => setTab("cart")}
                  className={`font-display text-xl font-bold uppercase tracking-tight transition-colors ${
                    tab === "cart" ? "text-foreground" : "text-muted"
                  }`}
                >
                  Cart
                </button>
                <button
                  type="button"
                  onClick={() => setTab("viewed")}
                  className={`font-display text-xl font-bold uppercase tracking-tight transition-colors ${
                    tab === "viewed" ? "text-foreground" : "text-muted"
                  }`}
                >
                  Recently viewed
                </button>
              </div>
              <button
                type="button"
                aria-label="Close cart"
                onClick={onClose}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
              >
                <CloseIcon className="h-[18px] w-[18px]" />
              </button>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-12 text-center">
              {tab === "cart" ? (
                <>
                  <p className="font-display text-2xl font-bold uppercase tracking-tight text-balance">
                    Your cart is empty
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-sm text-muted">
                      Not sure where to start?
                    </p>
                    <BrowseLink href="/store" label="Browse the store" />
                    <BrowseLink href="/store/mkrhub" label="Get mkrHub" />
                  </div>
                </>
              ) : (
                <>
                  <p className="font-display text-2xl font-bold uppercase tracking-tight text-balance">
                    Nothing viewed yet
                  </p>
                  <div className="flex w-full flex-col gap-3">
                    <p className="text-sm text-muted">
                      Products you look at will show up here.
                    </p>
                    <BrowseLink href="/store" label="Browse the store" />
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
