export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  role?: string;
  fleetSize?: string;
};

const leads: LeadPayload[] = [];

export function addLead(lead: LeadPayload) {
  leads.push(lead);
  return { id: `${Date.now()}`, ...lead, createdAt: new Date().toISOString() };
}

export function getLeads() {
  return leads;
}
