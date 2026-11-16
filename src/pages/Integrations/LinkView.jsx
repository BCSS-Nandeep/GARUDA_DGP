import { ExternalLink } from "lucide-react";
import { useParams } from "react-router-dom";
import { useSidebarLinks } from "../../context/SidebarLinksContext";
import styles from "./LinkView.module.css";

export function LinkView() {
  const { id } = useParams();
  const { links } = useSidebarLinks();
  const link = links.find((item) => item.id === id);

  if (!link) {
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
      <iframe className={styles.frame} title={link.name} src={link.url} />
    </div>
  );
}
