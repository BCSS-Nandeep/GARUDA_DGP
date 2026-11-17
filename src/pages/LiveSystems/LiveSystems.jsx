import { RadioTower } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useSidebarLinks } from "../../context/SidebarLinksContext";
import styles from "./LiveSystems.module.css";

export function LiveSystems() {
  const { links } = useSidebarLinks();
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader
        icon={RadioTower}
        title="Live Systems"
        description="Systems added from Integrations. Open any module from the sidebar dropdown or below."
        actions={
          <Button variant="secondary" onClick={() => navigate("/integrations")}>
            Manage in Integrations
          </Button>
        }
      />

      <Card>
        {links.length === 0 ? (
          <p className={styles.empty}>No live systems yet. Add a name and URL from Integrations.</p>
        ) : (
          <div className={styles.list}>
            {links.map((link) => (
              <button key={link.id} type="button" className={styles.row} onClick={() => navigate(`/links/${link.id}`)}>
                <span className={styles.name}>{link.name}</span>
                <span className={styles.url}>{link.url}</span>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
