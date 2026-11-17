import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { SidebarLinksProvider } from "../context/SidebarLinksContext";

const SERVER_LINKS = [
  { id: "alpha", name: "Alpha Module", url: "https://alpha.example/" },
  { id: "beta", name: "Beta Module", url: "https://beta.example/" },
];

// This jsdom setup does not provide localStorage, so give the components a simple in-memory one.
function memoryStorage() {
  const data = new Map();
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  };
}

function renderSidebar() {
  return render(
    <MemoryRouter>
      <SidebarLinksProvider>
        <Sidebar />
      </SidebarLinksProvider>
    </MemoryRouter>
  );
}

const FIXED_NAV = [
  "Dashboard",
  "Profile Search",
  "Network Analysis",
  "Geo Intelligence",
  "National Source Systems",
  "Integrations",
  "AI Pipeline",
  "Governance",
  "Alerts",
  "Settings",
];

describe("Sidebar", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", memoryStorage());
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ links: SERVER_LINKS }) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows fixed HTML tabs with added modules between primary and integrations groups", async () => {
    renderSidebar();
    await screen.findByText("Alpha Module");
    const labels = screen.getAllByRole("link").map((link) => link.textContent.trim().replace(/\d+$/, ""));
    expect(labels).toEqual([
      "Dashboard",
      "Profile Search",
      "Network Analysis",
      "Geo Intelligence",
      "Alpha Module",
      "Beta Module",
      "National Source Systems",
      "Integrations",
      "AI Pipeline",
      "Governance",
      "Alerts",
      "Settings",
    ]);
  });

  it("keeps Integrations entry for the link manager", async () => {
    renderSidebar();
    await screen.findByText("Alpha Module");
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("keeps fixed nav order when there are no added modules", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ links: [] }) })));
    renderSidebar();
    const labels = screen.getAllByRole("link").map((link) => link.textContent.trim().replace(/\d+$/, ""));
    expect(labels).toEqual(FIXED_NAV);
  });
});
