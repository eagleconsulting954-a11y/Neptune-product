"use client";

import { useState } from "react";

export function CheckoutButton({ label = "Continue to Stripe", plan = "fleetops" }: { label?: string; plan?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCheckout() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      body: JSON.stringify({ plan }),
      headers: { "content-type": "application/json" }
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    setMessage(data.message || "Stripe is not configured yet.");
    setLoading(false);
  }

  async function unlockDemo() {
    setLoading(true);
    await fetch("/api/billing/activate", { method: "POST" });
    window.location.href = "/admin";
  }

  return (
    <div className="checkout-actions">
      <button className="btn gold" onClick={startCheckout} disabled={loading}>{loading ? "Preparing..." : label}</button>
      <button className="btn" onClick={unlockDemo} disabled={loading}>Demo unlock</button>
      {message && <p className="small-lede">{message}</p>}
    </div>
  );
}
