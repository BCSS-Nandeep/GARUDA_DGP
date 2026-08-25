import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import styles from "./AppLayout.module.css";
import { Header } from "./Header";
import { Ticker } from "./Ticker";
import { Sidebar } from "./Sidebar";
import { ToastContainer } from "./ToastContainer";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import { prefersReducedMotion } from "../utils/motion";

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const contentRef = useRef(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // Key the page transition by section only (not the full path) so opening a
  // detail drawer via a route param (e.g. /integrations/:id, /network/:id)
  // doesn't remount the whole page and reset its in-flight data fetch.
  const sectionKey = `/${location.pathname.split("/")[1] || ""}`;

  useKeyboardShortcuts({
    "g d": () => navigate("/dashboard"),
    "g p": () => navigate("/profile-search"),
    "g n": () => navigate("/network"),
    "g g": () => navigate("/geo"),
  });

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const wrapper = contentRef.current;
    if (!wrapper) return;

    const lenis = new Lenis({
      wrapper,
      content: wrapper.firstElementChild,
      duration: 1.1,
      smoothWheel: true,
    });

    let frameId;
    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.shell}>
      <Header onOpenNav={() => setMobileNavOpen(true)} />
      <Ticker />
      <div className={styles.body}>
        <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
        <main className={styles.content} ref={contentRef}>
          <div className={styles.contentInner}>
            <AnimatePresence mode="wait">
              <motion.div
                key={sectionKey}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
