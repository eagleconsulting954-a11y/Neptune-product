import { NextResponse } from "next/server";
import { clearSession } from "@/src/lib/server/auth";

export async function POST() {
  await clearSession();
  const response = NextResponse.json({ ok: true });
  response.cookies.set("neptune_session", "", { path: "/", maxAge: 0 });
  return response;
}
