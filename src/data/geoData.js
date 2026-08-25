// Synthetic demo data. Coordinates are illustrative, centered on Hyderabad, TS.
export const mapCenter = [17.385, 78.4867];

export const geoLayers = [
  { key: "subjects", label: "Subjects", color: "#f87171" },
  { key: "cdrTrails", label: "CDR Trails", color: "#22d3ee" },
  { key: "vehicles", label: "Vehicle Sightings", color: "#fbbf24" },
  { key: "seizures", label: "Seizures", color: "#a78bfa" },
  { key: "geoFences", label: "Geo-Fences", color: "#34d399" },
  { key: "hTrax", label: "H-TRAX", color: "#60a5fa" },
  { key: "policeStations", label: "Police Stations", color: "#93a6c2" },
  { key: "cases", label: "Cases", color: "#f97316" },
];

export const geoPoints = {
  subjects: [
    { id: "GID-004821", position: [17.372, 78.4747], label: "Rafiq Ahmed Sheikh", detail: "Last seen 12 min ago" },
    { id: "GID-005510", position: [17.412, 78.4483], label: "Mohammed Irfan Baig", detail: "Last seen 2 hr ago" },
  ],
  cdrTrails: [
    { id: "t1", position: [17.372, 78.4747], label: "Tower T-114" },
    { id: "t2", position: [17.381, 78.462], label: "Tower T-108" },
    { id: "t3", position: [17.394, 78.451], label: "Tower T-092" },
  ],
  vehicles: [
    { id: "VEH-118820", position: [17.399, 78.474], label: "TS-09-EF-4421", detail: "ANPR sighting, 22 min ago" },
  ],
  seizures: [{ id: "SZ-4402", position: [17.365, 78.492], label: "Seizure Zone SZ-4402", detail: "₹18,40,000 seized" }],
  geoFences: [
    { id: "GF-001", position: [17.372, 78.4747], radius: 900, label: "Old City Perimeter", expiry: "2026-09-01" },
  ],
  hTrax: [{ id: "HT-771", position: [17.404, 78.478], label: "H-TRAX Event 771", detail: "Motion detected 4 min ago" }],
  policeStations: [
    { id: "PS-01", position: [17.379, 78.4747], label: "Old City PS" },
    { id: "PS-02", position: [17.4239, 78.4738], label: "Nampally PS" },
  ],
  cases: [{ id: "CASE-01147", position: [17.372, 78.4747], label: "FIR-2026-01147" }],
};

export const geoEvents = [
  {
    id: "GE-5521",
    subject: "Rafiq Ahmed Sheikh",
    subjectId: "GID-004821",
    location: "Old City Perimeter",
    timestamp: Date.now() - 4 * 60 * 1000,
    distance: "40m inside fence",
    source: "H-TRAX",
    severity: "CRITICAL",
  },
  {
    id: "GE-5518",
    subject: "TS-09-EF-4421",
    subjectId: "VEH-118820",
    location: "Malakpet Junction ANPR",
    timestamp: Date.now() - 22 * 60 * 1000,
    distance: "N/A",
    source: "RTA / ANPR",
    severity: "HIGH",
  },
];
