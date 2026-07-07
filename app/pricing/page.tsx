import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const plans = [
  { name: "Captain", price: "$499", description: "For one vessel or one department team starting with command visibility.", features: ["1 vessel workspace", "Captain dashboard", "Certificates and approvals", "Resources library"] },
  { name: "FleetOps", price: "$1,499", description: "For active vessel teams that need CRM, approvals, subscriptions, and operations visibility.", features: ["5 admin users", "Fleet and vessel CRM", "PMS, PTW, eORB, inventory", "Admin CRM and subscription dashboard"] },
  { name: "Enterprise", price: "Custom", description: "For multi-fleet operators, agencies, and managed maritime groups.", features: ["Unlimited workspaces", "Custom roles and permissions", "Executive reporting", "Integrations and onboarding"] }
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="section">
        <div className="container">
          <div className="eyebrow">Pricing</div>
          <h1>Plans for vessel command teams.</h1>
          <p className="lede">Start with the premium command dashboard and expand into fleet operations, safety, compliance, maintenance, and admin intelligence.</p>
          <div className="pricing-grid">{plans.map(plan => <article className="card price premium-card" key={plan.name}><h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href="/checkout" className="btn gold">Unlock {plan.name}</Link></article>)}</div>
        </div>
      </main>
    </>
  );
}
