"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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

export default function EditEmailButton({
  currentEmail,
}: {
  currentEmail: string;
}) {
  const supabase = createClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState(currentEmail);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  function close() {
    setOpen(false);
    setEmail(currentEmail);
    setError(null);
    setMessage(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email can't be blank");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.updateUser({ email });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setMessage(
      "Check your new inbox to confirm this change — your email won't update until you click the confirmation link.",
    );
    router.refresh();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-foreground"
      >
        Edit
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-border bg-surface p-7 sm:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="font-display text-lg font-bold uppercase tracking-tight">
                Edit email
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            {message ? (
              <p className="mt-5 text-sm text-accent">{message}</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                <div>
                  <label
                    htmlFor="edit-email"
                    className="font-mono text-xs uppercase tracking-wide text-muted"
                  >
                    Email
                  </label>
                  <input
                    id="edit-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                    className={`mt-2 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60 ${
                      error ? "border-red-400/60" : "border-border"
                    }`}
                  />
                  {error && (
                    <p className="mt-1.5 text-xs text-red-400">{error}</p>
                  )}
                  <p className="mt-2 text-xs text-muted">
                    This email is used for sign-in and order updates.
                  </p>
                </div>

                <div className="mt-2 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={close}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                  >
                    {submitting ? "Saving…" : "Save"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
