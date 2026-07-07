import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const plans = [
  { name: "Starter", price: "$499", description: "For early operators validating the Neptune workflow.", features: ["1 admin user", "CRM and leads", "Traffic dashboard", "Lead magnet capture"] },
  { name: "FleetOps", price: "$1,499", description: "For growing maritime teams that need business and ops visibility.", features: ["5 admin users", "CRM and subscriptions", "Fleet module roadmap", "Priority onboarding"] },
  { name: "Enterprise", price: "Custom", description: "For multi-fleet operators, agencies, and enterprise SaaS deployments.", features: ["Unlimited workspaces", "Custom integrations", "SSO and audit logs", "Executive reporting"] }
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="section"><div className="container"><div className="eyebrow">Pricing</div><h1>Plans for every stage of Neptune.</h1><p className="lede">Start with CRM, subscriptions, and traffic intelligence. Expand into fleet operations, AI, and enterprise workflows.</p><div className="pricing-grid">{plans.map(plan => <article className="card price" key={plan.name}><h3>{plan.name}</h3><strong>{plan.price}</strong><p>{plan.description}</p><ul>{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul><Link href="/#lead-magnet" className="btn gold">Request access</Link></article>)}</div></div></main>
    </>
  );
}
