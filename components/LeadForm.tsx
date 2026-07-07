"use client";

import { useState } from "react";

export function LeadForm() {
  const [done, setDone] = useState(false);
  async function submit(formData: FormData) {
    await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(formData)),
      headers: { "content-type": "application/json" }
    });
    setDone(true);
  }
  if (done) return <div className="form-success">Playbook request captured. In production this will sync into CRM and email automation.</div>;
  return (
    <form className="form" action={submit}>
      <label>Name<input required name="name" placeholder="Your name" /></label>
      <label>Work email<input required name="email" type="email" placeholder="name at company" /></label>
      <label>Company<input required name="company" placeholder="Company name" /></label>
      <label>Fleet size<select name="fleetSize"><option>1-5 vessels</option><option>6-25 vessels</option><option>26-100 vessels</option><option>100+ vessels</option></select></label>
      <button className="btn gold" type="submit">Send me the playbook</button>
    </form>
  );
}
