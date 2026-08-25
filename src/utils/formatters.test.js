import { describe, expect, it } from "vitest";
import { formatCurrency, formatNumber, formatPercent, maskAccount, maskPhone } from "./formatters";

describe("maskPhone", () => {
  it("keeps the first 4 digits and masks the rest", () => {
    expect(maskPhone("9840112233")).toBe("9840-XXXXXX");
  });

  it("returns short input unchanged", () => {
    expect(maskPhone("123")).toBe("123");
  });

  it("returns an empty string for empty input", () => {
    expect(maskPhone("")).toBe("");
  });
});

describe("maskAccount", () => {
  it("keeps only the last 4 digits visible", () => {
    expect(maskAccount("123456784421")).toBe("XXXX-XXXX-4421");
  });
});

describe("formatCurrency / formatNumber / formatPercent", () => {
  it("formats a number with Indian grouping", () => {
    expect(formatNumber(1284)).toBe("1,284");
  });

  it("renders an em dash for null/undefined", () => {
    expect(formatNumber(undefined)).toBe("—");
    expect(formatCurrency(null)).toBe("—");
    expect(formatPercent(undefined)).toBe("—");
  });

  it("formats a percentage with the requested precision", () => {
    expect(formatPercent(4.8, 1)).toBe("4.8%");
    expect(formatPercent(71)).toBe("71%");
  });
});
