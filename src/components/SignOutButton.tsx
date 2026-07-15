"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton({
  allDevices = false,
  className = "text-sm text-muted transition-colors hover:text-foreground",
  onDone,
}: {
  allDevices?: boolean;
  className?: string;
  onDone?: () => void;
}) {
  const supabase = createClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut(allDevices ? { scope: "global" } : undefined);
    onDone?.();
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handleSignOut} className={className}>
      {allDevices ? "Sign out of all devices" : "Sign out"}
    </button>
  );
}
