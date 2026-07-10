import { NextResponse } from "next/server";
import { ensureSchema } from "@/src/lib/server/store";

export async function POST() {
  const result = await ensureSchema();
  return NextResponse.json(result);
}

export async function GET() {
  const result = await ensureSchema();
  return NextResponse.json(result);
}
