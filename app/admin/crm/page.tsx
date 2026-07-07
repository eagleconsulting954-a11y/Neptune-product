import { crmLeads } from "@/src/lib/mock-data";

export default function CRMPage() {
  return (
    <>
      <div className="admin-top"><div><div className="eyebrow">CRM</div><h1 style={{fontSize:52}}>Pipeline and leads.</h1><p className="lede" style={{fontSize:16}}>Track captured leads, account value, source, and sales stage.</p></div></div>
      <div className="data-grid"><table><thead><tr><th>Name</th><th>Company</th><th>Source</th><th>Stage</th><th>Value</th></tr></thead><tbody>{crmLeads.map(lead => <tr key={lead.company}><td>{lead.name}</td><td>{lead.company}</td><td>{lead.source}</td><td><span className="status">{lead.stage}</span></td><td>{lead.value}</td></tr>)}</tbody></table></div>
    </>
  );
}
