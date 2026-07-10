import { NextResponse } from "next/server";

function activate(redirect?: string) {
  const response = redirect ? NextResponse.redirect(new URL(redirect, process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")) : NextResponse.json({ ok: true });
  response.cookies.set("neptune_paid", "active", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });
  return response;
}

export async function POST() {
  return activate();
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  return activate(url.searchParams.get("redirect") || "/admin");
}
