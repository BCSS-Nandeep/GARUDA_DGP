import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PermissionGate } from "./PermissionGate";
import { AuthContext } from "../../context/AuthContext";
import { ROLES } from "../../utils/constants";
import { roleHasPermission } from "../../utils/permissions";

function renderWithRole(role, ui) {
  const value = { hasPermission: (permission) => roleHasPermission(role, permission) };
  return render(<AuthContext.Provider value={value}>{ui}</AuthContext.Provider>);
}

describe("PermissionGate", () => {
  it("renders children when the role has the permission", () => {
    renderWithRole(ROLES.SENIOR_INVESTIGATOR, (
      <PermissionGate permission="profile.reveal">
        <span>Sensitive content</span>
      </PermissionGate>
    ));
    expect(screen.getByText("Sensitive content")).toBeInTheDocument();
  });

  it("renders the fallback when the role lacks the permission", () => {
    renderWithRole(ROLES.INVESTIGATOR, (
      <PermissionGate permission="profile.reveal" fallback={<span>Hidden</span>}>
        <span>Sensitive content</span>
      </PermissionGate>
    ));
    expect(screen.queryByText("Sensitive content")).not.toBeInTheDocument();
    expect(screen.getByText("Hidden")).toBeInTheDocument();
  });

  it("renders nothing by default when denied and no fallback is given", () => {
    const { container } = renderWithRole(ROLES.INVESTIGATOR, (
      <PermissionGate permission="governance.export">
        <span>Export button</span>
      </PermissionGate>
    ));
    expect(container).toBeEmptyDOMElement();
  });
});
