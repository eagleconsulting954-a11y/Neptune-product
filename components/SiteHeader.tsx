import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">◈</span>
          <span>NEPTUNE<small>Maritime Intelligence</small></span>
        </Link>
        <nav className="nav-links">
          <Link href="/#platform">Platform</Link>
          <Link href="/#lead-magnet">Playbook</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
          <Link className="btn gold" href="/#lead-magnet">Get the playbook</Link>
        </nav>
      </div>
    </header>
  );
}
