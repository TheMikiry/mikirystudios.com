import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AccountNav from "@/components/AccountNav";

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
    <div className="mx-auto max-w-4xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        Account
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-balance">
        {user.email}
      </h1>

      <div className="mt-6 border-t border-border" />

      <div className="mt-12 grid grid-cols-[160px_1fr] gap-12 max-sm:grid-cols-1 max-sm:gap-8">
        <AccountNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
