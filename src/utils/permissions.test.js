import { describe, expect, it } from "vitest";
import { roleHasPermission } from "./permissions";
import { ROLES } from "./constants";

describe("roleHasPermission", () => {
  it("grants an investigator the permissions on their list", () => {
    expect(roleHasPermission(ROLES.INVESTIGATOR, "dashboard.view")).toBe(true);
    expect(roleHasPermission(ROLES.INVESTIGATOR, "profile.search")).toBe(true);
  });

  it("denies an investigator permissions reserved for higher roles", () => {
    expect(roleHasPermission(ROLES.INVESTIGATOR, "profile.reveal")).toBe(false);
    expect(roleHasPermission(ROLES.INVESTIGATOR, "governance.view")).toBe(false);
  });

  it("grants administrators every permission via the wildcard", () => {
    expect(roleHasPermission(ROLES.ADMIN, "profile.reveal")).toBe(true);
    expect(roleHasPermission(ROLES.ADMIN, "settings.admin")).toBe(true);
    expect(roleHasPermission(ROLES.ADMIN, "anything.at.all")).toBe(true);
  });

  it("returns false for an unknown role", () => {
    expect(roleHasPermission("Not A Real Role", "dashboard.view")).toBe(false);
  });
});
