import Link from "next/link";

const links = [
  ["/admin", "Command Dashboard"],
  ["/admin/crm", "CRM"],
  ["/admin/subscriptions", "Subscriptions"],
  ["/admin/traffic", "Website Traffic"]
];

export function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <Link className="brand" href="/admin">
        <span className="brand-mark">◈</span>
        <span>NEPTUNE<small>Admin Console</small></span>
      </Link>
      <nav className="admin-nav">
        {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </aside>
  );
}
