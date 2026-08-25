// Synthetic demo data — no real subjects, cases, or records.
export const searchSystems = [
  { key: "cctns", label: "CCTNS" },
  { key: "icjs", label: "ICJS" },
  { key: "rta", label: "RTA" },
  { key: "vahan", label: "VAHAN" },
  { key: "cdr", label: "CDR / IPDR" },
  { key: "dopams", label: "DOPAMS" },
  { key: "financial", label: "Financial" },
  { key: "prison", label: "Prison" },
];

export const profiles = [
  {
    id: "GID-004821",
    name: "Rafiq Ahmed Sheikh",
    aliases: ["Raffi", "Ahmed R.S."],
    dob: "1988-03-14",
    gender: "Male",
    domains: ["CRIMINAL", "VEHICLE", "TELECOM", "FINANCIAL"],
    riskScore: 87,
    riskCategory: "CRITICAL",
    confidence: 92,
    knownAddresses: ["12-4-118, Old City, Hyderabad, TS"],
    photo: null,
  },
  {
    id: "GID-003310",
    name: "Karthik Reddy Naidu",
    aliases: ["KR Naidu"],
    dob: "1979-11-02",
    gender: "Male",
    domains: ["CRIMINAL", "FINANCIAL"],
    riskScore: 74,
    riskCategory: "HIGH",
    confidence: 88,
    knownAddresses: ["Flat 302, Jubilee Enclave, Hyderabad, TS"],
    photo: null,
  },
  {
    id: "GID-002204",
    name: "Naveen Kumar Yadav",
    aliases: [],
    dob: "1991-06-27",
    gender: "Male",
    domains: ["CRIMINAL", "VEHICLE"],
    riskScore: 52,
    riskCategory: "MODERATE",
    confidence: 81,
    knownAddresses: ["H.No 5-9-32, Nizamabad, TS"],
    photo: null,
  },
  {
    id: "GID-001187",
    name: "Priya Chandrasekhar",
    aliases: ["Priya C."],
    dob: "1995-01-19",
    gender: "Female",
    domains: ["CIVIL", "FINANCIAL"],
    riskScore: 21,
    riskCategory: "LOW",
    confidence: 76,
    knownAddresses: ["Plot 44, Kondapur, Hyderabad, TS"],
    photo: null,
  },
  {
    id: "GID-005510",
    name: "Mohammed Irfan Baig",
    aliases: ["Irfan", "M.I. Baig"],
    dob: "1984-09-08",
    gender: "Male",
    domains: ["CRIMINAL", "TELECOM", "FINANCIAL", "VEHICLE"],
    riskScore: 91,
    riskCategory: "CRITICAL",
    confidence: 95,
    knownAddresses: ["8-2-293, Banjara Hills, Hyderabad, TS", "Camp Road, Warangal, TS"],
    photo: null,
  },
];

const detailFor = (base) => ({
  ...base,
  riskFactors: [
    { label: "Active Cases", points: 24 },
    { label: "Warrants", points: 18 },
    { label: "Network Centrality", points: 17 },
    { label: "Recent Activity", points: 14 },
    { label: "Financial Indicators", points: 14 },
  ],
  cases: [
    {
      firNumber: "FIR-2026-01147",
      section: "IPC 420, 468, 471",
      policeStation: "Old City PS, Hyderabad",
      status: "Under Investigation",
      courtStatus: "Charges Pending",
      warrantStatus: "Non-Bailable Warrant Issued",
      filedOn: "2026-01-22",
    },
    {
      firNumber: "FIR-2025-08812",
      section: "IPC 379",
      policeStation: "Nampally PS, Hyderabad",
      status: "Chargesheet Filed",
      courtStatus: "Trial in Progress",
      warrantStatus: "Executed",
      filedOn: "2025-08-04",
    },
  ],
  vehicles: [
    {
      regNo: "TS-09-EF-4421",
      make: "Honda Activa",
      owner: base.name,
      associatedPersons: ["Naveen Kumar Yadav"],
      lastSeen: "2026-08-20T14:22:00",
      seizureHistory: "Seized 2025-11-02, released on bond",
      registrationStatus: "Active",
    },
  ],
  telecom: [
    {
      number: "9840XXXXXX",
      subscriber: base.name,
      simStatus: "Active",
      lastSeen: "2026-08-23T21:40:00",
      tower: "Malakpet Tower T-114",
      cdrRelationship: "42 calls with GID-003310 (last 30 days)",
    },
  ],
  financial: [
    {
      accountMasked: "XXXX-XXXX-4421",
      bank: "State Union Bank",
      linkedEntities: ["Crescent Traders Pvt Ltd"],
      suspiciousTxns: 6,
      totalFlagged: 4620000,
    },
  ],
  civilLinkages: [{ type: "Property Dispute", caseRef: "CIV-2024-1187", status: "Pending Hearing" }],
  timeline: [
    { date: "2026-08-20", label: "Sighted near geo-fence — Old City Perimeter", source: "H-TRAX" },
    { date: "2026-08-04", label: "High-value transaction flagged", source: "BANK" },
    { date: "2026-01-22", label: "FIR-2026-01147 registered", source: "CCTNS" },
    { date: "2025-11-02", label: "Vehicle TS-09-EF-4421 seized", source: "RTA" },
  ],
  sources: [
    { system: "CCTNS", updated: "4 min ago", confidence: 98 },
    { system: "RTA / VAHAN", updated: "1 hr ago", confidence: 95 },
    { system: "CDR / IPDR", updated: "6 hr ago", confidence: 82 },
    { system: "BANK", updated: "1 day ago", confidence: 90 },
  ],
});

export const profileDetails = Object.fromEntries(profiles.map((p) => [p.id, detailFor(p)]));

export function getProfileById(id) {
  return profileDetails[id] || null;
}
