import Reveal from "@/components/Reveal";
import SignOutButton from "@/components/SignOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Reveal>
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
          Profile
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-6">
        <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            Email
          </p>
          <p className="mt-2 text-sm">{user?.email}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div className="flex items-center gap-x-6">
            <SignOutButton />
            <SignOutButton allDevices />
          </div>
          <a
            href="mailto:support@mikirystudios.com?subject=Delete my account"
            className="text-sm text-red-400/60 transition-colors hover:text-red-400"
          >
            Delete account
          </a>
        </div>
      </Reveal>
    </div>
  );
}
