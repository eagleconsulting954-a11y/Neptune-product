import { crmLeads, subscriptions, traffic } from "@/src/lib/mock-data";

export default function AdminHome() {
  const kpis = [
    ["Pipeline", "$156k", "Qualified annual value"],
    ["MRR", "$18.4k", "Active and trial revenue"],
    ["Visitors", "5,063", "Last 30 days"],
    ["Conversion", "8.7%", "Lead magnet blended rate"]
  ];
  return (
    <>
      <div className="admin-top"><div><div className="eyebrow">Admin Command</div><h1 style={{fontSize:52}}>Neptune business dashboard.</h1><p className="lede" style={{fontSize:16}}>CRM, subscriptions, traffic, and commercial operating metrics behind a login gate.</p></div></div>
      <div className="kpi-grid">{kpis.map(([label, value, note]) => <div className="kpi" key={label}><span>{label}</span><b>{value}</b><p>{note}</p></div>)}</div>
      <div className="grid-3"><section className="card"><h3>Top CRM lead</h3><p>{crmLeads[2].company} is in {crmLeads[2].stage} with {crmLeads[2].value} potential.</p></section><section className="card"><h3>Subscription signal</h3><p>{subscriptions[0].customer} is active on {subscriptions[0].plan} at {subscriptions[0].mrr} MRR.</p></section><section className="card"><h3>Traffic winner</h3><p>{traffic[2].page} is converting at {traffic[2].conversion} from {traffic[2].source}.</p></section></div>
    </>
  );
}
