import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import { SidebarLinksProvider } from "../context/SidebarLinksContext";

const SERVER_LINKS = [
  { id: "alpha", name: "Alpha Module", url: "https://alpha.example/" },
  { id: "beta", name: "Beta Module", url: "https://beta.example/" },
];

// This jsdom setup does not provide localStorage, so give the components a simple in-memory one.
function memoryStorage(seed = {}) {
  const data = new Map(Object.entries(seed));
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  };
}

function renderSidebar({ path = "/", storage = {} } = {}) {
  vi.stubGlobal("localStorage", memoryStorage(storage));
  return render(
    <MemoryRouter initialEntries={[path]}>
      <SidebarLinksProvider>
        <Sidebar />
      </SidebarLinksProvider>
    </MemoryRouter>
  );
}

const FIXED_TOP_LEVEL = [
  "Dashboard",
  "Profile Search",
  "Network Analysis",
  "Geo Intelligence",
  "Live Systems",
  "National Source Systems",
  "Integrations",
  "AI Pipeline",
  "Governance",
  "Alerts",
  "Settings",
];

describe("Sidebar", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ links: SERVER_LINKS }) }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("nests Integration modules under Live Systems dropdown", async () => {
    renderSidebar({ storage: { "garuda.liveSystemsOpen": "1", "garuda.sidebarOpen": "1" } });
    await screen.findByText("Alpha Module");

    const labels = screen.getAllByRole("link").map((link) => link.textContent.trim().replace(/\d+$/, ""));
    expect(labels).toEqual([
      "Dashboard",
      "Profile Search",
      "Network Analysis",
      "Geo Intelligence",
      "Live Systems",
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

  it("expands Live Systems when toggling the chevron", async () => {
    renderSidebar({ storage: { "garuda.sidebarOpen": "1" } });
    await screen.findByText("Live Systems");
    expect(screen.queryByText("Alpha Module")).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Expand Live Systems"));
    expect(await screen.findByText("Alpha Module")).toBeInTheDocument();
    expect(screen.getByText("Beta Module")).toBeInTheDocument();
  });

  it("keeps Integrations entry for the link manager", async () => {
    renderSidebar();
    await screen.findByText("Live Systems");
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("keeps fixed top-level nav when there are no added modules", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ links: [] }) })));
    renderSidebar();
    const labels = screen.getAllByRole("link").map((link) => link.textContent.trim().replace(/\d+$/, ""));
    expect(labels).toEqual(FIXED_TOP_LEVEL);
  });
});
