import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Strava push subscription callback.
 *
 * GET  — hub verification (echo hub.challenge as JSON)
 * POST — activity/athlete event → trigger GitHub repository_dispatch (async sync)
 *
 * Env (Vercel):
 *   STRAVA_VERIFY_TOKEN
 *   GITHUB_DISPATCH_TOKEN  — PAT with `repo` scope (workflow trigger)
 *   GITHUB_REPO            — owner/name (default rajasekharreddykannapu/reddy-portfolio)
 */

function verifyToken() {
  return process.env.STRAVA_VERIFY_TOKEN || "";
}

function githubRepo() {
  return process.env.GITHUB_REPO || "rajasekharreddykannapu/reddy-portfolio";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const challenge = searchParams.get("hub.challenge");
  const token = searchParams.get("hub.verify_token");

  if (mode === "subscribe" && challenge && token === verifyToken()) {
    return NextResponse.json({ "hub.challenge": challenge });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  let body: {
    object_type?: string;
    object_id?: number | string;
    aspect_type?: string;
    owner_id?: number;
    subscription_id?: number;
    event_time?: number;
    updates?: Record<string, string>;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Acknowledge immediately — Strava requires 200 within ~2s.
  // Kick off GitHub Action without blocking the response path too long.
  const dispatchToken = process.env.GITHUB_DISPATCH_TOKEN;
  if (
    dispatchToken &&
    body.object_type === "activity" &&
    (body.aspect_type === "create" ||
      body.aspect_type === "update" ||
      body.aspect_type === "delete")
  ) {
    // Fire-and-forget; errors are logged but must not fail the webhook ACK.
    void triggerSync(dispatchToken, body).catch((err) => {
      console.error("[strava webhook] dispatch failed", err);
    });
  }

  return NextResponse.json({ ok: true });
}

async function triggerSync(
  token: string,
  payload: {
    object_type?: string;
    object_id?: number | string;
    aspect_type?: string;
    owner_id?: number;
    event_time?: number;
  },
) {
  const repo = githubRepo();
  const res = await fetch(`https://api.github.com/repos/${repo}/dispatches`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "strava-activity",
      client_payload: {
        object_id: String(payload.object_id ?? ""),
        aspect_type: payload.aspect_type ?? "",
        owner_id: String(payload.owner_id ?? ""),
        event_time: String(payload.event_time ?? ""),
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub dispatch ${res.status}: ${text}`);
  }
}
