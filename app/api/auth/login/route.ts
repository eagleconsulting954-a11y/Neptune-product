import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const email = process.env.DEMO_ADMIN_EMAIL || "admin@neptune.local";
  const password = process.env.DEMO_ADMIN_PASSWORD || "neptune-admin";
  if (body.email !== email || body.password !== password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set("neptune_session", "demo-admin", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return response;
}
