"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import OtpCodeInput from "./OtpCodeInput";

const RESEND_COOLDOWN_SECONDS = 30;

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

function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        className="opacity-25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="opacity-90"
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
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const cooldownActive = resendCooldown > 0;

  useEffect(() => {
    if (!cooldownActive) return;
    const id = setInterval(() => {
      setResendCooldown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [cooldownActive]);

  async function sendCode() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    return error;
  }

  async function handleSendCode(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const error = await sendCode();
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setStep("code");
    setCode("");
    setResetKey((k) => k + 1);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
  }

  async function handleVerify(fullCode: string) {
    setError(null);
    setSubmitting(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: fullCode,
      type: "email",
    });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      setCode("");
      setResetKey((k) => k + 1);
      return;
    }
    onSignedIn?.();
  }

  function handleCodeComplete(fullCode: string) {
    if (submitting) return;
    handleVerify(fullCode);
  }

  function handleChangeEmail() {
    setStep("email");
    setCode("");
    setError(null);
    setResendCooldown(0);
  }

  async function handleResend() {
    if (cooldownActive || submitting) return;
    setError(null);
    setSubmitting(true);
    const error = await sendCode();
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setCode("");
    setResetKey((k) => k + 1);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
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
      {step === "email" ? (
        <>
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

          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <div className="relative">
              <input
                id="email"
                type="email"
                required
                autoFocus
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                className="w-full rounded-full border border-border bg-background py-3 pl-5 pr-14 text-sm outline-none transition-colors focus:border-accent disabled:opacity-60"
              />
              <button
                type="submit"
                aria-label="Continue"
                disabled={submitting}
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-background transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
              >
                {submitting ? (
                  <SpinnerIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRightIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}
          </form>
        </>
      ) : (
        <div className="flex flex-col gap-5">
          <div>
            <p className="font-display text-xl font-bold uppercase tracking-tight">
              Enter code
            </p>
            <p className="mt-1 text-sm text-muted">
              Sent to <span className="text-foreground">{email}</span>{" "}
              <button
                type="button"
                onClick={handleChangeEmail}
                className="text-accent transition-colors hover:underline"
              >
                Change
              </button>
            </p>
          </div>

          <OtpCodeInput
            key={resetKey}
            value={code}
            onChange={setCode}
            onComplete={handleCodeComplete}
            disabled={submitting}
            hasError={!!error}
          />

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="button"
            onClick={handleResend}
            disabled={cooldownActive || submitting}
            className="self-start text-xs text-muted transition-colors hover:text-foreground disabled:opacity-60"
          >
            {cooldownActive
              ? `Resend code in ${resendCooldown}s`
              : "Resend code"}
          </button>

          <p className="text-xs text-muted">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-accent hover:underline">
              Terms of service
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
