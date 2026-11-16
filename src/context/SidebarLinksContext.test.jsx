import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { normalizeUrl, SidebarLinksProvider, useSidebarLinks } from "./SidebarLinksContext";
import { LinkView } from "../pages/Integrations/LinkView";

const A = { id: "a", name: "Alpha", url: "https://a.example/" };
const B = { id: "b", name: "Beta", url: "https://b.example/" };
const C = { id: "c", name: "Gamma", url: "https://c.example/" };

// This jsdom setup does not provide localStorage, so give the components a simple in-memory one.
function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
    clear: () => data.clear(),
  };
}

// A tiny stand-in for the /api/links server: GET returns the list, PUT replaces it.
function fakeServer(initial) {
  const state = { links: initial, puts: [] };
  const fetchMock = vi.fn(async (_url, options = {}) => {
    if (options.method === "PUT") {
      const body = JSON.parse(options.body);
      state.puts.push(body.links);
      state.links = body.links;
    }
    return { ok: true, json: async () => ({ links: state.links }) };
  });
  return { state, fetchMock };
}

let ctx;
function Probe() {
  ctx = useSidebarLinks();
  return <ul>{ctx.links.map((link) => <li key={link.id}>{link.name}</li>)}</ul>;
}

function renderProvider() {
  return render(
    <SidebarLinksProvider>
      <Probe />
    </SidebarLinksProvider>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("normalizeUrl", () => {
  it("rejects an empty URL with a clear message", () => {
    expect(() => normalizeUrl("   ")).toThrow("Enter a URL.");
  });

  it("adds https when the protocol is missing", () => {
    expect(normalizeUrl("example.com")).toBe("https://example.com/");
  });

  it("rejects text that is not a URL", () => {
    expect(() => normalizeUrl("not a url")).toThrow("Enter a valid http or https URL.");
  });
});

describe("SidebarLinksProvider", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", memoryStorage());
  });

  it("does not push links remembered by the browser back to the server", async () => {
    // The browser still remembers Alpha, but it was removed from the server on purpose.
    vi.stubGlobal("localStorage", memoryStorage({ "garuda.sidebarLinks": JSON.stringify([A, B]) }));
    const { state, fetchMock } = fakeServer([B]);
    vi.stubGlobal("fetch", fetchMock);

    renderProvider();
    await waitFor(() => expect(ctx.loading).toBe(false));

    expect(screen.queryByText("Alpha")).not.toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(state.puts).toHaveLength(0);
    expect(state.links).toEqual([B]);
  });

  it("reports loading until the server list arrives", async () => {
    const { fetchMock } = fakeServer([A]);
    vi.stubGlobal("fetch", fetchMock);

    renderProvider();
    expect(ctx.loading).toBe(true);
    await waitFor(() => expect(ctx.loading).toBe(false));
  });

  it("stops loading and keeps the browser copy when the server is unreachable", async () => {
    vi.stubGlobal("localStorage", memoryStorage({ "garuda.sidebarLinks": JSON.stringify([A]) }));
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));

    renderProvider();
    await waitFor(() => expect(ctx.loading).toBe(false));
    expect(screen.getByText("Alpha")).toBeInTheDocument();
  });

  it("adds on top of the latest server list so another person's link is not lost", async () => {
    const { state, fetchMock } = fakeServer([A]);
    vi.stubGlobal("fetch", fetchMock);

    renderProvider();
    await waitFor(() => expect(ctx.loading).toBe(false));

    // Someone else adds Gamma on the server while this page still shows only Alpha.
    state.links = [A, C];
    await act(async () => {
      await ctx.addLink("Beta", "b.example");
    });

    expect(state.puts).toHaveLength(1);
    expect(state.puts[0].map((link) => link.name)).toEqual(["Alpha", "Gamma", "Beta"]);
  });

  it("removes only the chosen link from the latest server list", async () => {
    const { state, fetchMock } = fakeServer([A, B]);
    vi.stubGlobal("fetch", fetchMock);

    renderProvider();
    await waitFor(() => expect(ctx.loading).toBe(false));

    state.links = [A, B, C];
    await act(async () => {
      await ctx.removeLink("a");
    });

    expect(state.puts[0].map((link) => link.name)).toEqual(["Beta", "Gamma"]);
  });

  it("does not call the server when the URL is empty", async () => {
    const { state, fetchMock } = fakeServer([A]);
    vi.stubGlobal("fetch", fetchMock);

    renderProvider();
    await waitFor(() => expect(ctx.loading).toBe(false));

    await expect(ctx.addLink("Beta", "")).rejects.toThrow("Enter a URL.");
    expect(state.puts).toHaveLength(0);
  });
});

describe("LinkView", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", memoryStorage());
  });

  function renderAt(path) {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <SidebarLinksProvider>
          <Routes>
            <Route path="/links/:id" element={<LinkView />} />
          </Routes>
        </SidebarLinksProvider>
      </MemoryRouter>
    );
  }

  it("shows Loading, not 'no longer available', while the list is still loading", async () => {
    let release;
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        await gate;
        return { ok: true, json: async () => ({ links: [A] }) };
      })
    );

    renderAt("/links/a");
    expect(screen.getByText("Loading…")).toBeInTheDocument();
    expect(screen.queryByText(/no longer available/i)).not.toBeInTheDocument();

    release();
    expect(await screen.findByTitle("Alpha")).toHaveAttribute("src", A.url);
  });

  it("says the link is gone once the list has loaded without it", async () => {
    const { fetchMock } = fakeServer([A]);
    vi.stubGlobal("fetch", fetchMock);

    renderAt("/links/missing");
    expect(await screen.findByText(/no longer available/i)).toBeInTheDocument();
  });
});
