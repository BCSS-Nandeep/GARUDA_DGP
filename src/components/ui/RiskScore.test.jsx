import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RiskScore } from "./RiskScore";

describe("RiskScore", () => {
  it("renders the numeric score, category, and confidence", () => {
    render(<RiskScore score={87} category="CRITICAL" confidence={92} />);
    expect(screen.getByText("87")).toBeInTheDocument();
    expect(screen.getByText("CRITICAL")).toBeInTheDocument();
    expect(screen.getByText("Confidence 92%")).toBeInTheDocument();
  });

  it("omits the confidence line when confidence is not provided", () => {
    render(<RiskScore score={21} category="LOW" />);
    expect(screen.queryByText(/Confidence/)).not.toBeInTheDocument();
  });
});
