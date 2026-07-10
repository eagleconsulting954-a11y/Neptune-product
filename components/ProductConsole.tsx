"use client";

import { useEffect, useMemo, useState } from "react";

type Data = {
  kpis: { vessels: number; duties: number; critical: number; readiness: number; crmValue: number };
  vessels: any[];
  duties: any[];
  events: any[];
};

const empty: Data = { kpis: { vessels: 0, duties: 0, critical: 0, readiness: 0, crmValue: 0 }, vessels: [], duties: [], events: [] };

export function ProductConsole() {
  const [data, setData] = useState<Data>(empty);
  const [tab, setTab] = useState("Command");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    await fetch("/api/bootstrap");
    const res = await fetch("/api/v1/dashboard", { cache: "no-store" });
    setData(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addDuty(category: string) {
    const body = category === "Hot Work"
      ? { category, title: "Hot work permit", owner: "Chief Officer", location: "Engine workshop", status: "Master approval", severity: "critical", due_at: "Today" }
      : { category, title: "Inspection round", owner: "Safety Officer", location: "Main deck", status: "Open", severity: "normal", due_at: "Today" };
    await fetch("/api/v1/duties", { method: "POST", body: JSON.stringify(body), headers: { "content-type": "application/json" } });
    setMessage(`${category} duty created and assigned.`);
    await load();
  }

  async function addVessel() {
    await fetch("/api/v1/vessels", { method: "POST", body: JSON.stringify({ name: "New Neptune Vessel", type: "General Cargo", status: "Onboarding", readiness: 70, eta: "TBD" }), headers: { "content-type": "application/json" } });
    setMessage("Vessel account created.");
    await load();
  }

  const tabs = ["Command", "Vessels", "Delegation", "CRM", "Activity"];
  const activeDuties = useMemo(() => data.duties.filter(d => tab === "Delegation" || d.severity === "critical"), [data, tab]);

  return (
    <section className="product-console glass premium-glow">
      <div className="console-toolbar">
        <div><p className="eyebrow">Production Console</p><h1>Neptune operating system</h1></div>
        <div className="console-actions"><button className="btn" onClick={addVessel}>Add vessel</button><button className="btn gold" onClick={() => addDuty("Hot Work")}>Delegate hot work</button><button className="btn" onClick={() => addDuty("Inspection")}>Assign inspection</button></div>
      </div>
      <nav className="console-tabs">{tabs.map(item => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</nav>
      {message && <div className="form-success">{message}</div>}
      {loading ? <p className="lede small-lede">Loading backend data...</p> : (
        <>
          <div className="kpi-grid">
            <div className="kpi"><span>Vessels</span><b>{data.kpis.vessels}</b></div>
            <div className="kpi"><span>Duties</span><b>{data.kpis.duties}</b></div>
            <div className="kpi"><span>Critical</span><b>{data.kpis.critical}</b></div>
            <div className="kpi"><span>Readiness</span><b>{data.kpis.readiness}%</b></div>
          </div>
          {tab === "Vessels" && <div className="data-grid"><table><thead><tr><th>Vessel</th><th>Type</th><th>Status</th><th>Readiness</th><th>ETA</th></tr></thead><tbody>{data.vessels.map(v => <tr key={v.id}><td>{v.name}</td><td>{v.type}</td><td>{v.status}</td><td>{v.readiness}%</td><td>{v.eta}</td></tr>)}</tbody></table></div>}
          {tab === "Delegation" && <div className="data-grid"><table><thead><tr><th>Duty</th><th>Category</th><th>Owner</th><th>Location</th><th>Status</th><th>Due</th></tr></thead><tbody>{data.duties.map(d => <tr key={d.id}><td>{d.title}</td><td>{d.category}</td><td>{d.owner}</td><td>{d.location}</td><td>{d.status}</td><td>{d.due_at}</td></tr>)}</tbody></table></div>}
          {tab === "CRM" && <div className="data-grid"><table><thead><tr><th>Company</th><th>Contact</th><th>Stage</th><th>Value</th></tr></thead><tbody>{(data as any).crm?.map((r: any) => <tr key={r.id}><td>{r.company}</td><td>{r.contact}</td><td>{r.stage}</td><td>${Number(r.value).toLocaleString()}</td></tr>)}</tbody></table></div>}
          {tab === "Activity" && <div className="ops-list">{data.events.map(e => <div className="ops-row" key={e.id}><div><b>{e.label}</b><span>{e.body}</span></div><em>Logged</em></div>)}</div>}
          {tab === "Command" && <div className="grid-3">{activeDuties.slice(0, 3).map(d => <article className="card premium-card" key={d.id}><h3>{d.title}</h3><p>{d.category} · {d.owner} · {d.location}</p><span className="status">{d.status}</span></article>)}</div>}
        </>
      )}
    </section>
  );
}
