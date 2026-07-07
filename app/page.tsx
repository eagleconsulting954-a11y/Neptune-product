import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const departmentCards = [
  ["Captain", "One command view for vessel readiness, port-call risk, open approvals, certificates, incidents, and department status."],
  ["Chief Engineer", "Machinery health, planned maintenance, defects, spares, work orders, bunker records, and class-critical actions."],
  ["Chief Officer", "Deck operations, cargo readiness, safety rounds, permits, inspections, drills, and document evidence."],
  ["Crewing / HR", "Crew certificates, contracts, rest-hour exceptions, medicals, travel, onboarding, and watch readiness."],
  ["Procurement", "Purchase requests, vendor status, inventory thresholds, delivery windows, and vessel requisitions."],
  ["Shore Management", "Fleet-level oversight, escalation dashboards, audit trails, compliance posture, and executive reporting."]
];

const workflowCards = [
  ["Vessel CRM", "Every vessel becomes an account record with contacts, history, open actions, visits, documents, and operational context."],
  ["Department Handover", "Standardized handover boards keep the Captain, Chief Engineer, Chief Officer, and shore team aligned."],
  ["Approval Center", "Centralize permit, purchase, defect, inspection, certificate, and incident approvals with owners and timestamps."],
  ["Evidence Vault", "Attach certificates, photos, forms, checklists, and notes directly to vessel and department workflows."],
  ["Readiness Scoring", "Turn scattered operational data into a clear readiness score for port calls, audits, inspections, and management review."],
  ["Operational Memory", "Build a searchable history of what happened, who approved it, what was attached, and what needs attention next."]
];

const opsRows = [
  ["MT Atlantic Pioneer", "Captain", "PSC readiness review", "Due today"],
  ["MV Neptune Trader", "Engineering", "Aux generator work order", "Parts pending"],
  ["MV Meridian Star", "Deck", "Hot work permit approval", "Master signoff"],
  ["MT Pacific Crown", "Procurement", "Critical spares reorder", "Vendor quote"]
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero product-hero" id="command">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Vessel Command CRM</div>
              <h1>The operating dashboard for captains and department heads.</h1>
              <p className="lede">Neptune is a login-gated maritime CRM and vessel command platform built for the people running the ship: Captains, Chief Engineers, Chief Officers, crewing teams, procurement, and shore management.</p>
              <p className="lede small-lede">It replaces scattered spreadsheets, email threads, document folders, and manual follow-ups with one premium command center for vessel readiness, department workflows, approvals, evidence, and operational history.</p>
              <div className="hero-actions">
                <Link href="/login" className="btn gold">Open dashboard</Link>
                <Link href="/#departments" className="btn">View departments</Link>
                <Link href="/pricing" className="btn">Pricing</Link>
              </div>
              <div className="trust-strip">
                <span>Built for vessel operations</span>
                <span>Role-based dashboards</span>
                <span>Audit-ready history</span>
              </div>
            </div>
            <div className="command-console panel">
              <div className="console-top">
                <div><span className="eyebrow">Live Vessel View</span><h3>MT Atlantic Pioneer</h3></div>
                <span className="status green-status">Ready 92%</span>
              </div>
              <div className="console-grid">
                <div className="console-metric"><span>Open actions</span><b>18</b><small>6 critical</small></div>
                <div className="console-metric"><span>Certificates</span><b>3</b><small>expiring soon</small></div>
                <div className="console-metric"><span>Work orders</span><b>11</b><small>4 overdue</small></div>
                <div className="console-metric"><span>Approvals</span><b>7</b><small>Captain queue</small></div>
              </div>
              <div className="ops-list">
                {opsRows.map(([vessel, department, action, state]) => (
                  <div className="ops-row" key={action}>
                    <div><b>{action}</b><span>{vessel} · {department}</span></div>
                    <em>{state}</em>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section product-section" id="departments">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">Department Command</div><h2>One system for every onboard department.</h2></div>
              <p>Neptune is not a generic CRM. It is structured around how a vessel actually operates: command, engineering, deck, crew, safety, procurement, and shore-side oversight.</p>
            </div>
            <div className="role-grid">
              {departmentCards.map(([title, text]) => (
                <article className="role-card" key={title}>
                  <span className="role-kicker">Role workspace</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-section" id="workflows">
          <div className="container split-showcase">
            <div>
              <div className="eyebrow">Operational CRM</div>
              <h2>Vessel records, workflows, and evidence in one place.</h2>
              <p className="lede small-lede">Instead of treating CRM as only sales contacts, Neptune treats every vessel, department, vendor, certificate, work order, inspection, and approval as connected operating intelligence.</p>
              <div className="workflow-stack">
                {workflowCards.slice(0, 3).map(([title, text]) => (
                  <div className="workflow-item" key={title}><b>{title}</b><span>{text}</span></div>
                ))}
              </div>
            </div>
            <div className="panel vessel-card">
              <div className="vessel-header"><span className="brand-mark mini">◈</span><div><span className="eyebrow">Vessel Account</span><h3>MV Neptune Trader</h3></div></div>
              <div className="vessel-timeline">
                <div><b>07:10</b><span>Chief Engineer opened main engine defect record.</span></div>
                <div><b>08:35</b><span>Captain approved hot work permit with attached checklist.</span></div>
                <div><b>10:45</b><span>Procurement matched critical spare to vendor quote.</span></div>
                <div><b>13:20</b><span>Shore manager reviewed PSC readiness evidence pack.</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section product-section">
          <div className="container">
            <div className="section-head">
              <div><div className="eyebrow">Core Modules</div><h2>Built like a premium maritime operating system.</h2></div>
              <p>The landing page now explains Neptune as the actual product: a CRM and dashboard for captains and department heads, not a lead-generation site.</p>
            </div>
            <div className="grid-3 premium-grid">
              {workflowCards.map(([title, text], i) => (
                <article className="card premium-card" key={title}>
                  <div className="icon">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="container panel cta-panel">
            <div><div className="eyebrow">Neptune Product</div><h2>Move from demo UI to a real vessel command platform.</h2><p>Next we connect real authentication, database-backed vessel records, role permissions, and department workflows.</p></div>
            <Link className="btn gold" href="/login">Enter admin dashboard</Link>
          </div>
        </section>
      </main>
    </>
  );
}
