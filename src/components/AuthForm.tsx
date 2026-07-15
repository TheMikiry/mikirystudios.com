"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.07-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.4c-.2-.7-.4-1.4-.4-2.4s.1-1.6.4-2.4V6.5H1.4C.5 8.2 0 10.1 0 12s.5 3.8 1.4 5.5l4-3.1z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.5l4 3.1c.9-2.8 3.5-4.8 6.6-4.8z"
      />
    </svg>
  );
}

export default function AuthForm({
  variant = "card",
  onSignedIn,
}: {
  variant?: "card" | "plain";
  onSignedIn?: () => void;
}) {
  const supabase = createClient();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (mode === "sign-in") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      onSignedIn?.();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${location.origin}/auth/callback` },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setMessage("Check your email to confirm your account.");
    }
  }

  async function handleGoogle() {
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  }

  return (
    <div
      className={
        variant === "card"
          ? "flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
          : "flex flex-col gap-5"
      }
    >
      <button
        type="button"
        onClick={handleGoogle}
        className="flex items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium transition-colors hover:border-foreground"
      >
        <GoogleIcon />
        Continue with Google
      </button>

      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="flex rounded-full border border-border p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode("sign-in")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            mode === "sign-in"
              ? "bg-accent text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("sign-up")}
          className={`flex-1 rounded-full py-2 transition-colors ${
            mode === "sign-up"
              ? "bg-accent text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            id="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>
        <div>
          <input
            id="password"
            placeholder="Password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
        {message && <p className="text-xs text-accent">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {loading
            ? "Please wait…"
            : mode === "sign-in"
              ? "Sign in"
              : "Create account"}
        </button>
      </form>
    </div>
  );
}
