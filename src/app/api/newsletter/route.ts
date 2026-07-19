import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { syncMailchimpSubscriber } from "@/lib/mailchimp";

export async function POST(request: Request) {
  const { subscribed } = await request.json();
  if (typeof subscribed !== "boolean") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({ user_id: user.id, marketing_opt_in: subscribed });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await syncMailchimpSubscriber(user.email, subscribed);
  } catch (err) {
    // The opt-in preference is already saved in Supabase at this point —
    // don't fail the request over a Mailchimp hiccup, just log it.
    console.error(err);
  }

  return NextResponse.json({ ok: true });
}
