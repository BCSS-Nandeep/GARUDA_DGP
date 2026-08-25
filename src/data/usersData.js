import { ROLES } from "../utils/constants";

// Single hardcoded officer — GARUDA has no login flow, matching the reference UI.
export const currentOfficer = {
  id: "U-0001",
  name: "DCP SMIT",
  role: ROLES.ADMIN,
  badge: "HCPC · LEVEL-5",
  station: "GARUDA Ops Center",
};
