"use client";

import { useState } from "react";

export function CheckoutButton({ label = "Continue to payment", plan = "fleetops" }: { label?: string; plan?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function unlockDemo() {
    setLoading(true);
    setMessage(`Activating ${plan} access...`);
    await fetch("/api/billing/activate", { method: "POST" });
    window.location.href = "/admin";
  }

  return (
    <div className="checkout-actions">
      <button className="btn gold" onClick={unlockDemo} disabled={loading}>{loading ? "Unlocking..." : label}</button>
      <button className="btn" onClick={() => setMessage("Connect your live Stripe Payment Link in Vercel, then swap this demo action to redirect to Stripe Checkout.")}>Stripe setup note</button>
      {message && <p className="small-lede">{message}</p>}
    </div>
  );
}
