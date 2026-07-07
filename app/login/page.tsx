import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="panel login-card">
        <Link className="brand" href="/"><span className="brand-mark">◈</span><span>NEPTUNE<small>Admin Login</small></span></Link>
        <h1 style={{fontSize: 44}}>Admin access.</h1>
        <p className="lede" style={{fontSize: 15}}>This demo is gated with a cookie login. Production auth will move to Supabase/Auth.js.</p>
        <LoginForm />
      </div>
    </main>
  );
}
