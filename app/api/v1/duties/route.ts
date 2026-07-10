import { NextResponse } from "next/server";
import { createDuty, listDuties } from "@/src/lib/server/store";

export async function GET() {
  return NextResponse.json({ duties: await listDuties() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ duty: await createDuty(body) }, { status: 201 });
}
