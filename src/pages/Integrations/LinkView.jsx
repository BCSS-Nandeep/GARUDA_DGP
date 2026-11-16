import { ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSidebarLinks } from "../../context/SidebarLinksContext";
import styles from "./LinkView.module.css";

export function LinkView() {
  const { id } = useParams();
  const { links, loading } = useSidebarLinks();
  const link = links.find((item) => item.id === id);

  if (!link) {
    // On a fresh browser the shared list is still loading; don't claim the link is gone yet.
    if (loading) return <div className={styles.missing}>Loading…</div>;
    return (
      <div className={styles.missing}>
        This sidebar link is no longer available. Add it again from Integrations.
      </div>
    );
  }

  return (
    <div className={styles.frameWrap}>
      <div className={styles.bar}>
        <span className={styles.name}>{link.name}</span>
        <a className={styles.open} href={link.url} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={14} strokeWidth={2} />
          Open in new tab
        </a>
      </div>
      <iframe
        className={styles.frame}
        title={link.name}
        src={link.url}
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
      />
    </div>
  );
}
