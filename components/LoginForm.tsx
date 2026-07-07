"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(formData: FormData) {
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "content-type": "application/json" }
    });
    if (!res.ok) return setError("Invalid demo credentials.");
    router.push("/admin");
    router.refresh();
  }
  return (
    <form className="form" action={submit}>
      <label>Email<input required name="email" type="email" defaultValue="admin@neptune.local" /></label>
      <label>Password<input required name="password" type="password" defaultValue="neptune-admin" /></label>
      {error && <div className="form-success" style={{borderColor:"rgba(255,91,99,.35)",background:"rgba(255,91,99,.1)"}}>{error}</div>}
      <button className="btn gold" type="submit">Enter admin dashboard</button>
    </form>
  );
}
