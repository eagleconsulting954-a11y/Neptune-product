import { traffic } from "@/src/lib/mock-data";

export default function TrafficPage() {
  return (
    <>
      <div className="admin-top"><div><div className="eyebrow">Website Traffic</div><h1 style={{fontSize:52}}>Traffic and conversion.</h1><p className="lede" style={{fontSize:16}}>Understand which pages and channels are generating qualified Neptune demand.</p></div></div>
      <div className="data-grid"><table><thead><tr><th>Page</th><th>Visitors</th><th>Conversion</th><th>Primary Source</th></tr></thead><tbody>{traffic.map(row => <tr key={row.page}><td>{row.page}</td><td>{row.visitors}</td><td><span className="status">{row.conversion}</span></td><td>{row.source}</td></tr>)}</tbody></table></div>
    </>
  );
}
