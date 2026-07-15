"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import AuthForm from "./AuthForm";

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
      <path
        d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

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

export default function AccountMenu() {
  const supabase = createClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckedAuth(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null),
    );
    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const initial = user?.email?.[0]?.toUpperCase() ?? "";

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label="Account"
        onClick={() => setOpen((v) => !v)}
        className="text-muted transition-colors hover:text-foreground"
      >
        {user ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-semibold text-background">
            {initial}
          </span>
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[calc(100%+12px)] z-[70] w-80 max-w-[88vw] rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-md"
          >
            {!checkedAuth ? (
              <div className="h-40 animate-pulse rounded-xl border border-border bg-surface" />
            ) : user ? (
              <>
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-display text-2xl font-bold uppercase tracking-tight">
                    Account
                  </p>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
                <p className="mb-4 truncate text-sm text-muted">
                  {user.email}
                </p>
                <div className="flex flex-col divide-y divide-border">
                  <Link
                    href="/account/profile"
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm font-medium transition-colors hover:text-accent"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/account/library"
                    onClick={() => setOpen(false)}
                    className="py-3 text-sm font-medium transition-colors hover:text-accent"
                  >
                    Library
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-lg font-bold uppercase tracking-tight">
                    Sign in
                  </p>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>
                <AuthForm
                  variant="plain"
                  onSignedIn={() => {
                    setOpen(false);
                    router.push("/account");
                    router.refresh();
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
