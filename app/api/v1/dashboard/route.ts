import { NextResponse } from "next/server";
import { dashboard } from "@/src/lib/server/store";

export async function GET() {
  return NextResponse.json(await dashboard());
}
