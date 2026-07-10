import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const plan = body.plan || "fleetops";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ mode: "demo", message: "STRIPE_SECRET_KEY is not configured. Use demo unlock until live billing is connected.", url: `${appUrl}/checkout?stripe=demo` });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const prices: Record<string, number> = { starter: 49900, fleetops: 149900, enterprise: 500000 };
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${appUrl}/api/billing/activate?redirect=/admin`,
    cancel_url: `${appUrl}/checkout?cancelled=true`,
    line_items: [{ price_data: { currency: "usd", product_data: { name: `Neptune ${plan}` }, unit_amount: prices[plan] || prices.fleetops }, quantity: 1 }],
    metadata: { plan }
  });
  return NextResponse.json({ url: session.url });
}
