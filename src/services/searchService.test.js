import { describe, expect, it } from "vitest";
import { quickSearch, advancedSearch } from "./searchService";

describe("quickSearch", () => {
  it("matches profiles by partial, case-insensitive name", async () => {
    const results = await quickSearch("rafiq");
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.name.toLowerCase().includes("rafiq"))).toBe(true);
  });

  it("matches profiles by alias", async () => {
    const results = await quickSearch("raffi");
    expect(results.some((p) => p.name === "Rafiq Ahmed Sheikh")).toBe(true);
  });

  it("matches profiles by GARUDA ID", async () => {
    const results = await quickSearch("GID-004821");
    expect(results.map((p) => p.id)).toContain("GID-004821");
  });

  it("returns an empty array for a blank query", async () => {
    expect(await quickSearch("   ")).toEqual([]);
  });

  it("returns an empty array when nothing matches", async () => {
    expect(await quickSearch("no-such-subject-xyz")).toEqual([]);
  });
});

describe("advancedSearch", () => {
  it("filters by domain in addition to the text query", async () => {
    const results = await advancedSearch({ query: "", domains: ["FINANCIAL"] });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.domains.includes("FINANCIAL"))).toBe(true);
  });

  it("treats an ALL domain filter as no filter", async () => {
    const all = await advancedSearch({ query: "", domains: ["ALL"] });
    const unfiltered = await advancedSearch({ query: "", domains: [] });
    expect(all.length).toBe(unfiltered.length);
  });
});
