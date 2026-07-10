import { NextResponse } from "next/server";
import { setSession } from "@/src/lib/server/auth";
import { ensureSchema } from "@/src/lib/server/store";

export async function POST(request: Request) {
  const body = await request.json();
  const email = process.env.DEMO_ADMIN_EMAIL || "admin@neptune.local";
  const password = process.env.DEMO_ADMIN_PASSWORD || "neptune-admin";
  if (body.email !== email || body.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  await ensureSchema();
  await setSession({ userId: "usr_admin", orgId: "org_demo", role: "admin" });
  const response = NextResponse.json({ ok: true, user: { id: "usr_admin", orgId: "org_demo", role: "admin", email } });
  response.cookies.set("neptune_session", "demo-admin", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
