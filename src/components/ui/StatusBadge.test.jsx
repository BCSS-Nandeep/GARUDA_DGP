import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders the mapped label for a known status", () => {
    render(<StatusBadge status="ONLINE" />);
    expect(screen.getByText("Online")).toBeInTheDocument();
  });

  it("renders a degraded status distinctly from online", () => {
    render(<StatusBadge status="DEGRADED" />);
    expect(screen.getByText("Degraded")).toBeInTheDocument();
  });

  it("falls back to the raw status string when unmapped", () => {
    render(<StatusBadge status="SOMETHING_UNKNOWN" />);
    expect(screen.getByText("SOMETHING_UNKNOWN")).toBeInTheDocument();
  });

  it("prefers an explicit label override when provided", () => {
    render(<StatusBadge status="ONLINE" label="Custom Label" />);
    expect(screen.getByText("Custom Label")).toBeInTheDocument();
  });
});
