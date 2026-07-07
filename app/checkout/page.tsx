import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckoutButton } from "@/components/CheckoutButton";

const included = ["Paywalled command dashboard", "Captain and HOD workspaces", "Fleet and vessel modules", "Resources and operating playbooks", "Admin CRM and subscriptions dashboard"];

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="section">
        <div className="container checkout-grid">
          <section className="glass checkout-card premium-glow">
            <span className="paywall-badge">Checkout</span>
            <h1>Unlock Neptune FleetOps.</h1>
            <p className="lede small-lede">Use this premium checkout page to connect live card payment later. For preview, the button activates demo access and opens the paywalled dashboard.</p>
            <div className="payment-line"><span>Plan</span><b>FleetOps</b></div>
            <div className="payment-line"><span>Billing</span><b>Monthly</b></div>
            <div className="payment-line"><span>Access</span><b>Captain + Department Dashboard</b></div>
            <div className="payment-line"><span>Total today</span><b>$1,499</b></div>
            <CheckoutButton label="Unlock FleetOps" plan="fleetops" />
          </section>
          <aside className="card checkout-card">
            <div className="eyebrow">Included</div>
            <h2>What unlocks after payment</h2>
            <ul className="premium-list">{included.map(item => <li key={item}>{item}</li>)}</ul>
            <Link href="/pricing" className="btn">Compare plans</Link>
          </aside>
        </div>
      </main>
    </>
  );
}
