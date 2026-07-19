"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { GLASS_PANEL } from "@/lib/ui";
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
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const panelRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount check, required for the portal target (document.body) to exist.
    setMounted(true);
  }, []);

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
      const target = e.target as Node;
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        panelRef.current &&
        !panelRef.current.contains(target)
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

  function toggleOpen() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 12,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((v) => !v);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-label="Account"
        onClick={toggleOpen}
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

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ top: coords.top, right: coords.right }}
                className={`fixed z-[70] w-80 max-w-[88vw] rounded-2xl border border-border p-5 shadow-2xl ${GLASS_PANEL}`}
              >
                {!checkedAuth ? (
                  <div className="h-40 animate-pulse rounded-xl border border-border bg-surface" />
                ) : user ? (
                  <>
                    <div className="relative mb-1 flex items-center">
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
                        Account
                      </p>
                      <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setOpen(false)}
                        className="absolute right-0 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mb-4 truncate text-left text-base font-medium text-muted">
                      {user.email}
                    </p>
                    <div className="flex flex-col items-center divide-y divide-border">
                      <Link
                        href="/account/profile"
                        onClick={() => setOpen(false)}
                        className="w-full py-4 text-center text-base font-medium transition-colors hover:text-accent"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/account/library"
                        onClick={() => setOpen(false)}
                        className="w-full py-4 text-center text-base font-medium transition-colors hover:text-accent"
                      >
                        Library
                      </Link>
                    </div>
                  </>
                ) : (
                  <AuthForm
                    variant="plain"
                    onClose={() => setOpen(false)}
                    onSignedIn={() => {
                      setOpen(false);
                      router.refresh();
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
