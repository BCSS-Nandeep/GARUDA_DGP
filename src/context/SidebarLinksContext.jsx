import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "garuda.sidebarLinks";

// The browser copy is only a cache so the sidebar is not empty while the server list loads.
// The server file is the single source of truth; the browser copy is never pushed back to it.
function readLinks() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && item.id && item.name && item.url);
  } catch {
    return [];
  }
}

function remember(links) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // Storage can be blocked or full; the shared server copy still works.
  }
}

export function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Enter a URL.");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let parsed;
  try {
    parsed = new URL(withProtocol);
  } catch {
    throw new Error("Enter a valid http or https URL.");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("URL must start with http or https");
  }
  return parsed.href;
}

async function readServer() {
  const response = await fetch("/api/links", { cache: "no-store" });
  if (!response.ok) throw new Error("Could not load the saved links.");
  const data = await response.json();
  return Array.isArray(data.links) ? data.links : [];
}

async function writeServer(links) {
  const response = await fetch("/api/links", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ links }),
  });
  if (!response.ok) throw new Error("Could not save the link.");
  const data = await response.json();
  return Array.isArray(data.links) ? data.links : links;
}

// Apply a change on top of the latest server list, not this browser's possibly stale copy,
// so two people editing at the same time do not wipe out each other's links.
async function change(current, apply) {
  let latest;
  try {
    latest = await readServer();
  } catch {
    latest = current;
  }
  return writeServer(apply(latest));
}

const SidebarLinksContext = createContext(null);

export function SidebarLinksProvider({ children }) {
  const [links, setLinks] = useState(readLinks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const serverLinks = await readServer();
        if (!cancelled) {
          setLinks(serverLinks);
          remember(serverLinks);
        }
      } catch {
        // Keep the browser copy if the shared file cannot be reached.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    function apply(next) {
      setLinks(next);
      remember(next);
      return next;
    }

    return {
      links,
      loading,
      async addLink(name, url) {
        const item = { id: crypto.randomUUID(), name: name.trim(), url: normalizeUrl(url) };
        const next = apply(await change(links, (latest) => [...latest, item]));
        return next.find((entry) => entry.id === item.id) || item;
      },
      async updateLink(id, name, url) {
        const nextItem = { id, name: name.trim(), url: normalizeUrl(url) };
        apply(
          await change(links, (latest) =>
            latest.some((item) => item.id === id)
              ? latest.map((item) => (item.id === id ? nextItem : item))
              : [...latest, nextItem]
          )
        );
        return nextItem;
      },
      async removeLink(id) {
        apply(await change(links, (latest) => latest.filter((item) => item.id !== id)));
      },
    };
  }, [links, loading]);

  return <SidebarLinksContext.Provider value={value}>{children}</SidebarLinksContext.Provider>;
}

export function useSidebarLinks() {
  const ctx = useContext(SidebarLinksContext);
  if (!ctx) throw new Error("useSidebarLinks must be used within SidebarLinksProvider");
  return ctx;
}
