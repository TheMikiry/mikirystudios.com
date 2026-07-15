import Reveal from "@/components/Reveal";
import SignOutButton from "@/components/SignOutButton";
import EditEmailButton from "@/components/EditEmailButton";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Reveal>
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight">
          Profile
        </h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-base font-semibold">Contact</p>
          {user?.email && <EditEmailButton currentEmail={user.email} />}
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="font-mono text-xs uppercase tracking-wide text-muted">
            Email
          </p>
          <p className="mt-2 text-sm">{user?.email}</p>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2 text-sm text-muted">
          <SignOutButton className="transition-colors hover:text-red-400" />
          <span>/</span>
          <SignOutButton
            allDevices
            className="transition-colors hover:text-red-400"
          />
        </div>
      </Reveal>
    </div>
  );
}
