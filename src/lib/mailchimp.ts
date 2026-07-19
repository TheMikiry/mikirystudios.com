import { createHash } from "crypto";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const SERVER_PREFIX = process.env.MAILCHIMP_API_SERVER_PREFIX;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

// Mailchimp identifies audience members by the MD5 hash of their
// lowercased email — this lets the same PUT call both create and update.
function subscriberHash(email: string) {
  return createHash("md5").update(email.toLowerCase()).digest("hex");
}

export async function syncMailchimpSubscriber(
  email: string,
  subscribed: boolean,
) {
  if (!API_KEY || !SERVER_PREFIX || !AUDIENCE_ID) {
    throw new Error("Mailchimp env vars are not configured");
  }

  const hash = subscriberHash(email);
  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${hash}`;

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: subscribed ? "subscribed" : "unsubscribed",
      status: subscribed ? "subscribed" : "unsubscribed",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mailchimp sync failed (${res.status}): ${body}`);
  }
}
