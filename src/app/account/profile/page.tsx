import Reveal from "@/components/Reveal";
import EditEmailButton from "@/components/EditEmailButton";
import NewsletterToggle from "@/components/NewsletterToggle";
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
          <p className="text-base font-semibold">Email</p>
          {user?.email && <EditEmailButton currentEmail={user.email} />}
        </div>

        <div className="mt-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <p className="text-sm">{user?.email}</p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <p className="text-base font-semibold">Newsletter</p>
        <div className="mt-4 rounded-2xl border border-border bg-surface p-5 sm:p-6">
          {user?.id && <NewsletterToggle userId={user.id} />}
        </div>
      </Reveal>
    </div>
  );
}
