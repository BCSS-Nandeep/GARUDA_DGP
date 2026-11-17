import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Sidebar.module.css";
import { NAV_GROUPS } from "../utils/constants";
import { useSidebarLinks } from "../context/SidebarLinksContext";
import { useAlertsBadge } from "../hooks/useAlertsBadge";

const OPEN_KEY = "garuda.sidebarOpen";
const LIVE_OPEN_KEY = "garuda.liveSystemsOpen";

function Item({ item, onNavigate, linkLabel = false, badgeValue }) {
  const Icon = Icons[item.icon] || Icons.AppWindow;
  return (
    <NavLink
      to={item.path}
      title={item.label}
      onClick={onNavigate}
      className={({ isActive }) => [styles.navItem, isActive ? styles.active : ""].filter(Boolean).join(" ")}
    >
      <Icon size={18} strokeWidth={2} className={styles.navIcon} />
      <span className={[styles.navLabel, linkLabel ? styles.linkLabel : ""].filter(Boolean).join(" ")}>
        {item.label}
        {badgeValue > 0 && <span className={styles.navBadge}>{badgeValue}</span>}
      </span>
    </NavLink>
  );
}

function LiveSystemsMenu({ links, onNavigate }) {
  const location = useLocation();
  const onLiveRoute = location.pathname.startsWith("/links/") || location.pathname === "/live-systems";
  const [manualOpen, setManualOpen] = useState(() => localStorage.getItem(LIVE_OPEN_KEY) === "1");
  const [forceClosed, setForceClosed] = useState(false);
  const open = forceClosed ? false : onLiveRoute || manualOpen;

  useEffect(() => {
    setForceClosed(false);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem(LIVE_OPEN_KEY, manualOpen ? "1" : "0");
  }, [manualOpen]);

  const Chevron = open ? Icons.ChevronDown : Icons.ChevronRight;
  const parentActive = onLiveRoute;

  return (
    <div className={styles.liveGroup}>
      <div className={[styles.navItem, styles.liveParent, parentActive ? styles.active : ""].filter(Boolean).join(" ")}>
        <NavLink
          to="/live-systems"
          title="Live Systems"
          onClick={onNavigate}
          className={styles.liveParentLink}
        >
          <Icons.RadioTower size={18} strokeWidth={2} className={styles.navIcon} />
          <span className={styles.navLabel}>Live Systems</span>
        </NavLink>
        <button
          type="button"
          className={styles.liveToggle}
          aria-label={open ? "Collapse Live Systems" : "Expand Live Systems"}
          aria-expanded={open}
          onClick={() => {
            if (open) {
              setForceClosed(true);
              setManualOpen(false);
            } else {
              setForceClosed(false);
              setManualOpen(true);
            }
          }}
        >
          <Chevron size={14} strokeWidth={2} />
        </button>
      </div>

      {open && (
        <div className={styles.liveChildren}>
          {links.length === 0 ? (
            <div className={styles.liveEmpty} title="Add systems from Integrations">
              <Icons.AppWindow size={16} strokeWidth={2} className={styles.navIcon} />
              <span className={[styles.navLabel, styles.linkLabel].join(" ")}>No systems yet</span>
            </div>
          ) : (
            links.map((link) => (
              <NavLink
                key={link.id}
                to={`/links/${link.id}`}
                title={link.name}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [styles.navItem, styles.liveChild, isActive ? styles.active : ""].filter(Boolean).join(" ")
                }
              >
                <Icons.AppWindow size={16} strokeWidth={2} className={styles.navIcon} />
                <span className={[styles.navLabel, styles.linkLabel].join(" ")}>{link.name}</span>
              </NavLink>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function NavItems({ links, unreadAlerts, onNavigate }) {
  const [primary, middle, footer] = NAV_GROUPS;
  return (
    <nav className={styles.nav}>
      <div className={styles.group}>
        {primary.items.map((item) =>
          item.key === "live-systems" ? (
            <LiveSystemsMenu key={item.key} links={links} onNavigate={onNavigate} />
          ) : (
            <Item key={item.key} item={item} onNavigate={onNavigate} />
          )
        )}
      </div>

      <div className={styles.group}>
        <div className={styles.divider} />
        {middle.items.map((item) => (
          <Item key={item.key} item={item} onNavigate={onNavigate} />
        ))}
      </div>

      <div className={styles.group}>
        <div className={styles.divider} />
        {footer.items.map((item) => (
          <Item
            key={item.key}
            item={item}
            onNavigate={onNavigate}
            badgeValue={item.badgeKey === "alerts" ? unreadAlerts : undefined}
          />
        ))}
      </div>
    </nav>
  );
}

function ToggleButton({ open, onClick }) {
  const Icon = open ? Icons.ChevronsLeft : Icons.ChevronsRight;
  return (
    <button type="button" className={styles.toggle} onClick={onClick} aria-label={open ? "Close sidebar" : "Open sidebar"}>
      <Icon size={18} strokeWidth={2} className={styles.navIcon} />
      <span className={styles.navLabel}>{open ? "Close" : "Open"}</span>
    </button>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }) {
  const { links } = useSidebarLinks();
  const unreadAlerts = useAlertsBadge();
  const location = useLocation();
  const [open, setOpen] = useState(() => localStorage.getItem(OPEN_KEY) !== "0");

  useEffect(() => {
    localStorage.setItem(OPEN_KEY, open ? "1" : "0");
  }, [open]);

  useEffect(() => {
    onCloseMobile?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <aside className={[styles.sidebar, open ? styles.sidebarOpen : ""].filter(Boolean).join(" ")}>
        <NavItems links={links} unreadAlerts={unreadAlerts} />
        <ToggleButton open={open} onClick={() => setOpen((value) => !value)} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.target === e.currentTarget && onCloseMobile?.()}
          >
            <motion.aside
              className={styles.mobileDrawer}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <NavItems links={links} unreadAlerts={unreadAlerts} onNavigate={onCloseMobile} />
              <ToggleButton open onClick={onCloseMobile} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
