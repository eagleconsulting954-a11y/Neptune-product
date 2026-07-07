import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const resources = [
  ["Captain Handover Board", "A clear watch-to-watch command view for approvals, risks, port-call status, and unresolved department actions."],
  ["PSC Readiness Pack", "A structured evidence pack for certificates, safety rounds, inspection notes, photos, and audit history."],
  ["Engineering Work Queue", "A department workspace for machinery defects, PMS due tasks, running hours, spares, and closeout evidence."],
  ["Procurement Control", "A quote and requisition board connecting critical spares, vendors, delivery windows, and approval status."],
  ["Crew Readiness", "A single view of crew certificates, medicals, contracts, rest-hour exceptions, travel, and watch coverage."],
  ["Port Call Brief", "A port-call packet for ETA, agent messages, local requirements, cargo documents, crew changes, and signatures."]
];

export default function ResourcesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero premium-hero">
          <div className="container">
            <div className="eyebrow">Neptune Resources</div>
            <h1>Operating playbooks for captains and department heads.</h1>
            <p className="lede">Use these resources as the foundation for Neptune workflows. Each playbook maps directly into the command dashboard, vessel CRM, and evidence records.</p>
            <div className="hero-actions"><Link className="btn gold" href="/checkout">Unlock dashboard</Link><Link className="btn" href="/pricing">Pricing</Link></div>
          </div>
        </section>
        <section className="section compact-section">
          <div className="container grid-3 resource-grid">
            {resources.map(([title, text]) => <article className="card premium-card" key={title}><div className="icon">✦</div><h3>{title}</h3><p>{text}</p><Link href="/checkout" className="btn">Use in Neptune</Link></article>)}
          </div>
        </section>
      </main>
    </>
  );
}
