import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "neptune_session_v2";
const secret = () => process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-change-this-secret";

type SessionPayload = { userId: string; orgId: string; role: string; exp: number };

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">, hours = 12) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + hours * 60 * 60 * 1000 })).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token?: string): SessionPayload | null {
  if (!token || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  const expected = sign(body);
  const safe = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  if (!safe) return null;
  const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayload;
  if (payload.exp < Date.now()) return null;
  return payload;
}

export async function getSession() {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value) || verifySessionToken(jar.get("neptune_session")?.value);
}

export async function setSession(payload: Omit<SessionPayload, "exp">) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(payload), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 12 });
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}
