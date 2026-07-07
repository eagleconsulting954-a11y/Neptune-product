import { subscriptions } from "@/src/lib/mock-data";

export default function SubscriptionsPage() {
  return (
    <>
      <div className="admin-top"><div><div className="eyebrow">Subscriptions</div><h1 style={{fontSize:52}}>Revenue and renewals.</h1><p className="lede" style={{fontSize:16}}>Monitor plan mix, MRR, trials, renewal windows, and expansion signals.</p></div></div>
      <div className="data-grid"><table><thead><tr><th>Customer</th><th>Plan</th><th>Status</th><th>MRR</th><th>Renewal</th></tr></thead><tbody>{subscriptions.map(row => <tr key={row.customer}><td>{row.customer}</td><td>{row.plan}</td><td><span className="status">{row.status}</span></td><td>{row.mrr}</td><td>{row.renewal}</td></tr>)}</tbody></table></div>
    </>
  );
}
