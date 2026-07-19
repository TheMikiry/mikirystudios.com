import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountNav from "@/components/AccountNav";
import SignOutButton from "@/components/SignOutButton";

export default async function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Account
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-balance">
            {user.email}
          </h1>
        </div>
        <SignOutButton className="rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:border-red-400 hover:text-red-400" />
      </div>

      <div className="mt-8 border-t border-border" />

      <div className="mt-12 grid grid-cols-[200px_1fr] gap-16 max-sm:grid-cols-1 max-sm:gap-8">
        <AccountNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
