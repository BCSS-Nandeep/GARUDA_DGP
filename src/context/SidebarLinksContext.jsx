import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "garuda.sidebarLinks";

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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
}

export function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const parsed = new URL(withProtocol);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("URL must start with http or https");
  }
  return parsed.href;
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

const SidebarLinksContext = createContext(null);

export function SidebarLinksProvider({ children }) {
  const [links, setLinks] = useState(readLinks);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/links", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        const serverLinks = Array.isArray(data.links) ? data.links : [];
        const known = new Set(serverLinks.map((item) => item.url));
        const extras = readLinks().filter((item) => item.url && !known.has(item.url));
        const merged = extras.length ? await writeServer([...serverLinks, ...extras]) : serverLinks;
        if (!cancelled) {
          setLinks(merged);
          remember(merged);
        }
      } catch {
        // Keep the browser copy if the shared file cannot be reached.
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(
    () => ({
      links,
      async addLink(name, url) {
        const item = { id: crypto.randomUUID(), name: name.trim(), url: normalizeUrl(url) };
        const next = await writeServer([...links, item]);
        setLinks(next);
        remember(next);
        return next.find((entry) => entry.id === item.id) || item;
      },
      async updateLink(id, name, url) {
        const nextItem = { id, name: name.trim(), url: normalizeUrl(url) };
        const next = await writeServer(links.map((item) => (item.id === id ? nextItem : item)));
        setLinks(next);
        remember(next);
        return nextItem;
      },
      async removeLink(id) {
        const next = await writeServer(links.filter((item) => item.id !== id));
        setLinks(next);
        remember(next);
      },
    }),
    [links]
  );

  return <SidebarLinksContext.Provider value={value}>{children}</SidebarLinksContext.Provider>;
}

export function useSidebarLinks() {
  const ctx = useContext(SidebarLinksContext);
  if (!ctx) throw new Error("useSidebarLinks must be used within SidebarLinksProvider");
  return ctx;
}
