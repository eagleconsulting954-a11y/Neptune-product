import { NextResponse } from "next/server";
import { addLead, getLeads } from "@/src/lib/lead-store";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name || !body.email || !body.company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const lead = addLead(body);
  return NextResponse.json({ ok: true, lead });
}

export async function GET() {
  return NextResponse.json({ leads: getLeads() });
}
