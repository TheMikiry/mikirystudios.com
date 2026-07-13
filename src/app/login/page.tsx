import Reveal from "@/components/Reveal";
import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Account
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance">
          Sign in
        </h1>
        <p className="mt-3 text-sm text-muted">
          One account for mkrHub downloads, and future courses and
          mentorships.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <AuthForm />
      </Reveal>
    </div>
  );
}
