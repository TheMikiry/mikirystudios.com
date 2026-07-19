"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterToggle({ userId }: { userId: string }) {
  const supabase = createClient();
  const [optedIn, setOptedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<"subscribed" | "unsubscribed" | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only mount check, required for the portal target (document.body) to exist.
    setMounted(true);
  }, []);

  useEffect(() => {
    supabase
      .from("profiles")
      .select("marketing_opt_in")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data }) => {
        setOptedIn(data?.marketing_opt_in ?? false);
        setLoading(false);
      });
  }, [supabase, userId]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  async function handleToggle() {
    if (saving) return;
    const next = !optedIn;
    setSaving(true);
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscribed: next }),
    });
    setSaving(false);
    if (!res.ok) return;
    setOptedIn(next);
    setToast(next ? "subscribed" : "unsubscribed");
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm">Product updates & news</p>
      <button
        type="button"
        role="switch"
        aria-checked={optedIn}
        onClick={handleToggle}
        disabled={loading || saving}
        className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150 disabled:opacity-60 ${
          optedIn ? "bg-accent" : "bg-border"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white shadow transition-transform duration-150 ${
            optedIn ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="fixed left-1/2 top-6 z-[100] -translate-x-1/2 rounded-2xl border border-border bg-background/60 px-9 py-5 text-lg font-medium text-foreground shadow-2xl backdrop-blur-md"
              >
                {toast === "subscribed" ? (
                  <>
                    You&apos;ve been{" "}
                    <span className="text-accent">Subscribed</span> to Mikiry
                    Studios Newsletter!
                  </>
                ) : (
                  <>
                    You&apos;ve been{" "}
                    <span className="text-accent">unsubscribed</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
