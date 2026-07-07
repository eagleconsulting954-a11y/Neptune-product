import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { LeadForm } from "@/components/LeadForm";

const features = [
  ["CRM", "Capture shipping leads, manage accounts, demo stages, renewals, and follow-up tasks."],
  ["Subscriptions", "Track plans, trials, MRR, renewal dates, expansion opportunities, and customer health."],
  ["Website Traffic", "See landing page traffic, conversion rates, lead magnet performance, and source quality."],
  ["Login-Gated Admin", "Protect the internal product dashboard while public pages remain open."],
  ["Fleet Operations", "Roadmap-ready modules for vessels, voyages, safety, maintenance, inventory, and documents."],
  ["Neptune AI", "Future copilot layer for lead qualification, workflow summaries, and reporting."]
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Maritime Intelligence Platform</div>
              <h1>Run your maritime business from one command center.</h1>
              <p className="lede">Neptune combines a premium landing experience, lead capture, CRM, subscription visibility, website traffic intelligence, and a login-gated admin console for maritime operators and SaaS teams.</p>
              <div className="hero-actions">
                <Link href="/#lead-magnet" className="btn gold">Get the playbook</Link>
                <Link href="/pricing" className="btn">View pricing</Link>
                <Link href="/login" className="btn">Admin login</Link>
              </div>
            </div>
            <div className="panel hero-card dashboard-preview">
              <div className="preview-row">
                <div className="metric"><span>MRR</span><b>$18.4k</b></div>
                <div className="metric"><span>Leads</span><b>327</b></div>
                <div className="metric"><span>Conversion</span><b>8.7%</b></div>
              </div>
              <div className="table-card">
                <div><span>Atlantic Bulk Lines</span><span className="status">Demo booked</span><b>$96k</b></div>
                <div><span>HarborBridge Logistics</span><span className="status">Trial</span><b>$42k</b></div>
                <div><span>Bluewater Fleet Co.</span><span className="status">Qualified</span><b>$18k</b></div>
              </div>
            </div>
          </div>
        </section>
        <section className="section" id="platform"><div className="container"><div className="section-head"><div><div className="eyebrow">Product foundation</div><h2>Start with the business layer.</h2></div><p>Before fleet modules go deep, Neptune needs the commercial engine: marketing, pricing, leads, CRM, subscriptions, and traffic analytics.</p></div><div className="grid-3">{features.map(([title, text], i)=><article className="card" key={title}><div className="icon">{i+1}</div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
        <section className="section" id="lead-magnet"><div className="container lead-magnet"><div className="card"><div className="eyebrow">Lead magnet</div><h2>Maritime Ops Automation Playbook</h2><p>Capture high-intent operators with a downloadable guide explaining how fleet teams can reduce manual work, improve approval cycles, and centralize operational intelligence.</p><p>Included: workflow map, buyer pain points, ROI checklist, and implementation roadmap.</p></div><div className="card"><LeadForm /></div></div></section>
      </main>
    </>
  );
}
