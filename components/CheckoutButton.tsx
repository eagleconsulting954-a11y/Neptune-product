"use client";

import { useState } from "react";

export function CheckoutButton({ label = "Continue to payment", plan = "fleetops" }: { label?: string; plan?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function startCheckout() {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/stripe/checkout", { method: "POST", body: JSON.stringify({ plan }), headers: { "content-type": "application/json" } });
    const data = await res.json();
    if (data.mode === "demo") setMessage(data.message);
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  async function unlockDemo() {
    setLoading(true);
    setMessage(`Activating ${plan} demo access...`);
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
