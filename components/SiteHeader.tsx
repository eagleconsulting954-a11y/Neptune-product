import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">◈</span>
          <span>NEPTUNE<small>Vessel Command CRM</small></span>
        </Link>
        <nav className="nav-links">
          <Link href="/#command">Command</Link>
          <Link href="/#departments">Departments</Link>
          <Link href="/#workflows">Workflows</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/login">Login</Link>
          <Link className="btn gold" href="/login">Open dashboard</Link>
        </nav>
      </div>
    </header>
  );
}
