import { NextResponse } from "next/server";
import { createVessel, listVessels } from "@/src/lib/server/store";

export async function GET() {
  return NextResponse.json({ vessels: await listVessels() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ vessel: await createVessel(body) }, { status: 201 });
}
