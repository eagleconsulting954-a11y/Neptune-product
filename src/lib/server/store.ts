import { Pool } from "pg";

export type DbRow = Record<string, any>;

const memory = {
  orgs: [{ id: "org_demo", name: "Neptune Fleet Group", plan: "fleetops", status: "active" }],
  users: [{ id: "usr_admin", org_id: "org_demo", name: "Fleet Admin", email: "admin@neptune.local", role: "admin" }],
  vessels: [
    { id: "vsl_001", org_id: "org_demo", name: "MT Atlantic Pioneer", type: "Tanker", imo: "IMO-9040011", status: "En route", readiness: 92, eta: "Santos +38h" },
    { id: "vsl_002", org_id: "org_demo", name: "MV Pacific Meridian", type: "Container", imo: "IMO-9040012", status: "Voyage ops", readiness: 88, eta: "Singapore 4d" },
    { id: "vsl_003", org_id: "org_demo", name: "MT Aurora Spirit", type: "Product Tanker", imo: "IMO-9040013", status: "At anchor", readiness: 81, eta: "Houston hold" }
  ],
  duties: [
    { id: "dty_001", org_id: "org_demo", vessel_id: "vsl_001", category: "Hot Work", title: "Hot work permit HW-104", owner: "Chief Officer", location: "Engine workshop", status: "Master approval", severity: "critical", due_at: "Today 16:00" },
    { id: "dty_002", org_id: "org_demo", vessel_id: "vsl_003", category: "Inspection", title: "Aux generator inspection", owner: "2nd Engineer", location: "Engine room", status: "Evidence needed", severity: "attention", due_at: "Tomorrow" },
    { id: "dty_003", org_id: "org_demo", vessel_id: "vsl_002", category: "Inspection", title: "Main deck safety round", owner: "Bosun", location: "Main deck", status: "Open", severity: "normal", due_at: "Today 18:00" }
  ],
  crm: [
    { id: "crm_001", org_id: "org_demo", company: "Atlantic Bulk Lines", contact: "Maria Santos", stage: "Demo booked", value: 96000 },
    { id: "crm_002", org_id: "org_demo", company: "HarborBridge Logistics", contact: "David Chen", stage: "Qualified", value: 42000 }
  ],
  events: [
    { id: "evt_001", org_id: "org_demo", label: "PTW #0047 submitted", body: "Awaiting Master signature", created_at: new Date().toISOString() },
    { id: "evt_002", org_id: "org_demo", label: "Certificate pack validated", body: "No blocking errors", created_at: new Date().toISOString() }
  ]
};

let pool: Pool | null = null;
function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined });
  return pool;
}

export async function query<T extends DbRow = DbRow>(sql: string, params: any[] = []): Promise<T[]> {
  const db = getPool();
  if (!db) return [];
  const result = await db.query(sql, params);
  return result.rows as T[];
}

export async function ensureSchema() {
  const db = getPool();
  if (!db) return { ok: true, mode: "memory" };
  await db.query(`
    create table if not exists organizations (id text primary key, name text not null, plan text not null default 'trial', status text not null default 'trial', created_at timestamptz not null default now());
    create table if not exists users (id text primary key, org_id text not null references organizations(id), name text not null, email text unique not null, role text not null default 'member', password_hash text, created_at timestamptz not null default now());
    create table if not exists vessels (id text primary key, org_id text not null references organizations(id), name text not null, type text, imo text, status text, readiness int default 0, eta text, created_at timestamptz not null default now());
    create table if not exists duties (id text primary key, org_id text not null references organizations(id), vessel_id text references vessels(id), category text not null, title text not null, owner text, location text, status text not null default 'open', severity text not null default 'normal', due_at text, created_at timestamptz not null default now());
    create table if not exists crm_accounts (id text primary key, org_id text not null references organizations(id), company text not null, contact text, stage text, value numeric default 0, created_at timestamptz not null default now());
    create table if not exists activity_events (id text primary key, org_id text not null references organizations(id), label text not null, body text, created_at timestamptz not null default now());
    insert into organizations(id,name,plan,status) values('org_demo','Neptune Fleet Group','fleetops','active') on conflict (id) do nothing;
  `);
  return { ok: true, mode: "postgres" };
}

const id = (prefix: string) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

export async function listVessels(orgId = "org_demo") {
  const db = getPool();
  if (!db) return memory.vessels.filter(v => v.org_id === orgId);
  await ensureSchema();
  return query("select * from vessels where org_id=$1 order by created_at desc", [orgId]);
}

export async function createVessel(input: DbRow, orgId = "org_demo") {
  const row = { id: id("vsl"), org_id: orgId, name: input.name || "New Vessel", type: input.type || "General", imo: input.imo || "", status: input.status || "Active", readiness: Number(input.readiness || 75), eta: input.eta || "TBD" };
  const db = getPool();
  if (!db) { memory.vessels.unshift(row as any); return row; }
  await ensureSchema();
  const [created] = await query("insert into vessels(id,org_id,name,type,imo,status,readiness,eta) values($1,$2,$3,$4,$5,$6,$7,$8) returning *", [row.id,row.org_id,row.name,row.type,row.imo,row.status,row.readiness,row.eta]);
  return created;
}

export async function listDuties(orgId = "org_demo") {
  const db = getPool();
  if (!db) return memory.duties.filter(d => d.org_id === orgId);
  await ensureSchema();
  return query("select * from duties where org_id=$1 order by created_at desc", [orgId]);
}

export async function createDuty(input: DbRow, orgId = "org_demo") {
  const row = { id: id("dty"), org_id: orgId, vessel_id: input.vessel_id || "vsl_001", category: input.category || "Inspection", title: input.title || "New Duty", owner: input.owner || "Captain", location: input.location || "Vessel", status: input.status || "Open", severity: input.severity || "normal", due_at: input.due_at || "Today" };
  const db = getPool();
  if (!db) { memory.duties.unshift(row as any); return row; }
  await ensureSchema();
  const [created] = await query("insert into duties(id,org_id,vessel_id,category,title,owner,location,status,severity,due_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *", [row.id,row.org_id,row.vessel_id,row.category,row.title,row.owner,row.location,row.status,row.severity,row.due_at]);
  return created;
}

export async function dashboard(orgId = "org_demo") {
  const vessels = await listVessels(orgId);
  const duties = await listDuties(orgId);
  const db = getPool();
  const crm = db ? await query("select * from crm_accounts where org_id=$1", [orgId]) : memory.crm;
  const events = db ? await query("select * from activity_events where org_id=$1 order by created_at desc limit 8", [orgId]) : memory.events;
  const avgReadiness = Math.round(vessels.reduce((s: number, v: any) => s + Number(v.readiness || 0), 0) / Math.max(vessels.length, 1));
  return { orgId, kpis: { vessels: vessels.length, duties: duties.length, critical: duties.filter((d: any) => d.severity === "critical").length, readiness: avgReadiness, crmValue: crm.reduce((s: number, r: any) => s + Number(r.value || 0), 0) }, vessels, duties, crm, events };
}
