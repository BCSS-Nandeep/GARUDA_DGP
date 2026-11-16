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

const SidebarLinksContext = createContext(null);

export function SidebarLinksProvider({ children }) {
  const [links, setLinks] = useState(readLinks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const value = useMemo(
    () => ({
      links,
      addLink(name, url) {
        const item = { id: crypto.randomUUID(), name: name.trim(), url: normalizeUrl(url) };
        setLinks((current) => [...current, item]);
        return item;
      },
      updateLink(id, name, url) {
        const next = { name: name.trim(), url: normalizeUrl(url) };
        setLinks((current) => current.map((item) => (item.id === id ? { ...item, ...next } : item)));
        return { id, ...next };
      },
      removeLink(id) {
        setLinks((current) => current.filter((item) => item.id !== id));
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
