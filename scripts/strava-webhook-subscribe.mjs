#!/usr/bin/env node
/**
 * Create (or list/delete) the Strava push subscription for this site.
 *
 * Env:
 *   STRAVA_CLIENT_ID
 *   STRAVA_CLIENT_SECRET
 *   STRAVA_VERIFY_TOKEN
 *   STRAVA_CALLBACK_URL  — default https://krajasekharreddy.com/api/strava/webhook
 *
 * Usage:
 *   node scripts/strava-webhook-subscribe.mjs          # create
 *   node scripts/strava-webhook-subscribe.mjs list
 *   node scripts/strava-webhook-subscribe.mjs delete <id>
 */

const CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const VERIFY_TOKEN = process.env.STRAVA_VERIFY_TOKEN || "reddy-portfolio-strava";
const CALLBACK =
  process.env.STRAVA_CALLBACK_URL ||
  "https://krajasekharreddy.com/api/strava/webhook";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Missing STRAVA_CLIENT_ID or STRAVA_CLIENT_SECRET");
  process.exit(1);
}

const cmd = process.argv[2] || "create";

async function list() {
  const url = new URL("https://www.strava.com/api/v3/push_subscriptions");
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("client_secret", CLIENT_SECRET);
  const res = await fetch(url);
  const text = await res.text();
  console.log(res.status, text);
}

async function create() {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    callback_url: CALLBACK,
    verify_token: VERIFY_TOKEN,
  });
  const res = await fetch("https://www.strava.com/api/v3/push_subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  const text = await res.text();
  console.log(res.status, text);
  if (!res.ok) process.exit(1);
  console.log("\nSubscription created. Strava will POST activity events to:");
  console.log(CALLBACK);
}

async function del(id) {
  if (!id) {
    console.error("Usage: node scripts/strava-webhook-subscribe.mjs delete <id>");
    process.exit(1);
  }
  const url = new URL(`https://www.strava.com/api/v3/push_subscriptions/${id}`);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("client_secret", CLIENT_SECRET);
  const res = await fetch(url, { method: "DELETE" });
  console.log(res.status, await res.text());
}

if (cmd === "list") await list();
else if (cmd === "delete") await del(process.argv[3]);
else await create();
