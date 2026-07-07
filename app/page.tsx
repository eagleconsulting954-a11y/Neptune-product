import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

const moduleGroups = [
  ["Command", "Fleet overview, vessel accounts, live risk, approvals, and executive readiness."],
  ["Voyage Ops", "Voyages, navigation, cargo, port calls, ETA windows, and agent coordination."],
  ["Crew", "Crew lists, certificates, watch schedules, medicals, travel, and rest-hour visibility."],
  ["Maintenance", "PMS, work orders, machinery status, inventory risk, and critical quotes."],
  ["Safety & Compliance", "PTW, inspections, incidents, eORB, certificates, audit trails, and evidence packs."],
  ["Workspace", "Resources, analytics, settings, permissions, subscription, and operational memory."]
];

const activity = [
  ["14:11", "Chief Mate submitted PTW #0047", "Awaiting Master signature"],
  ["13:45", "Certificate pack validated", "No blocking errors"],
  ["11:20", "Critical quote updated", "19 items matched"],
  ["09:05", "eORB entry locked", "Countersign recorded"]
];

const resources = [
  ["Captain handover board", "Make every watch change, port call, and operational action visible in one place."],
  ["PSC readiness pack", "Turn certificates, photos, checklists, and approvals into inspection-ready evidence."],
  ["Engineering work queue", "Prioritize machinery defects, PMS actions, spares, running hours, and class-critical work."],
  ["Procurement control", "Connect purchase requests, critical quotes, vendors, delivery status, and vessel needs."]
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero premium-hero" id="platform">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Premium Vessel Command CRM</div>
              <h1>The Neptune1 command UI, rebuilt as the real product.</h1>
              <p className="lede">Neptune is the login-gated operating layer for captains, heads of department, and shore managers. It brings vessel accounts, approvals, evidence, crew, maintenance, compliance, and port-call activity into one premium mobile-first command center.</p>
              <div className="hero-actions">
                <Link className="btn gold" href="/checkout">Start with Stripe</Link>
                <Link className="btn" href="/resources">View resources</Link>
                <Link className="btn" href="/login">Login</Link>
              </div>
              <div className="trust-strip"><span>Paywalled dashboard</span><span>Captain-first workflows</span><span>Audit-ready records</span></div>
            </div>
            <div className="phone-frame glass premium-glow">
              <div className="phone-top"><button>☰</button><span>⌘ Search vessel records...</span><button>🔔</button></div>
              <div className="phone-hero"><p className="eyebrow">Live Command Center</p><h3>Every vessel, approval, and risk signal.</h3></div>
              <div className="phone-metrics"><div><b>6</b><span>Vessels</span></div><div><b>97%</b><span>Health</span></div><div><b>3</b><span>Approvals</span></div><div><b>38h</b><span>ETA</span></div></div>
              <div className="phone-map"><i style={{left:"22%",top:"38%"}}>Atlantic</i><i style={{left:"56%",top:"25%"}}>Pacific</i><i style={{left:"68%",top:"62%"}}>Aurora</i></div>
            </div>
          </div>
        </section>

        <section className="section compact-section" id="modules">
          <div className="container">
            <div className="section-head"><div><div className="eyebrow">Condensed Command Modules</div><h2>Clean grouped navigation instead of a crowded sidebar.</h2></div><p>The real product keeps the Neptune1 premium feel while grouping the operating system into fewer, clearer sections for mobile crews and shore teams.</p></div>
            <div className="grid-3 premium-grid">
              {moduleGroups.map(([title, text]) => <article className="card premium-card" key={title}><div className="icon">✦</div><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section compact-section">
          <div className="container split-showcase">
            <div className="glass command-console premium-glow">
              <div className="console-top"><div><span className="eyebrow">MT Atlantic Pioneer</span><h3>Captain Command Queue</h3></div><span className="status green-status">Ready 92%</span></div>
              <div className="ops-list">{activity.map(([time, title, status]) => <div className="ops-row" key={title}><div><b>{title}</b><span>{time} · {status}</span></div><em>Open</em></div>)}</div>
            </div>
            <div>
              <div className="eyebrow">Why it matters</div>
              <h2>Operational memory for every vessel.</h2>
              <p className="lede small-lede">Every approval, certificate, inspection, incident, work order, quote, and handover stays connected to the vessel record. Neptune turns daily shipboard work into searchable, auditable intelligence.</p>
              <Link href="/checkout" className="btn gold">Unlock the dashboard</Link>
            </div>
          </div>
        </section>

        <section className="section compact-section">
          <div className="container">
            <div className="section-head"><div><div className="eyebrow">Resources</div><h2>Built-in operating playbooks.</h2></div><Link className="btn" href="/resources">Open resources</Link></div>
            <div className="grid-3 resource-grid">{resources.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <section className="section final-cta">
          <div className="container panel cta-panel premium-glow">
            <div><div className="eyebrow">Stripe Paywall Ready</div><h2>Access starts at checkout.</h2><p>Visitors can explore the landing page and resources. The dashboard is gated behind login and subscription status.</p></div>
            <Link className="btn gold" href="/checkout">Go to payment</Link>
          </div>
        </section>
      </main>
    </>
  );
}
