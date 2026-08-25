import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Gavel,
  Car,
  Phone,
  Landmark,
  Scale,
  Share2,
  MapPinned,
  History,
  Database,
  Printer,
  FileText,
  FileEdit,
  Flag,
  FileStack,
} from "lucide-react";
import styles from "./ProfileDetails.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Tabs } from "../../components/ui/Tabs";
import { Button } from "../../components/ui/Button";
import { Skeleton } from "../../components/ui/Skeleton";
import { ErrorState } from "../../components/ui/ErrorState";
import { EmptyState } from "../../components/ui/EmptyState";
import { IdentityCard } from "./IdentityCard";
import { RiskSection } from "./RiskSection";
import { CriminalIntelligence } from "./CriminalIntelligence";
import { VehicleIntelligence } from "./VehicleIntelligence";
import { TelecomIntelligence } from "./TelecomIntelligence";
import { FinancialIntelligence } from "./FinancialIntelligence";
import { CivilLinkages } from "./CivilLinkages";
import { ActivityTimeline } from "./ActivityTimeline";
import { SourceRecords } from "./SourceRecords";
import { getProfile } from "../../services/profileService";
import { useNotifications } from "../../context/NotificationContext";

const TABS = [
  { key: "criminal", label: "Criminal", icon: Gavel },
  { key: "vehicles", label: "Vehicles", icon: Car },
  { key: "telecom", label: "Telecom", icon: Phone },
  { key: "financial", label: "Financial", icon: Landmark },
  { key: "civil", label: "Civil Linkages", icon: Scale },
  { key: "timeline", label: "Activity Timeline", icon: History },
  { key: "sources", label: "Source Records", icon: Database },
];

export function ProfileDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notifications = useNotifications();
  const [profile, setProfile] = useState(undefined);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("criminal");

  useEffect(() => {
    let active = true;
    setProfile(undefined);
    setError(null);
    getProfile(id)
      .then((data) => active && setProfile(data))
      .catch(() => active && setError("failed"));
    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return <ErrorState title="Could not load profile" description="This subject's record could not be retrieved from connected sources." onRetry={() => window.location.reload()} />;
  }

  if (profile === undefined) {
    return (
      <div>
        <Skeleton height={32} width={280} />
        <div style={{ marginTop: "var(--sp-4)" }}>
          <Skeleton height={140} radius={12} />
        </div>
      </div>
    );
  }

  if (profile === null) {
    return (
      <EmptyState
        title="Profile not found"
        description={`No subject matches GARUDA ID ${id}.`}
        actionLabel="Back to search"
        onAction={() => navigate("/profile-search")}
      />
    );
  }

  return (
    <div>
      <PageHeader
        title={profile.name}
        breadcrumb={
          <button className={styles.backLink} onClick={() => navigate("/profile-search")}>
            ← Profile Search
          </button>
        }
        description={`GARUDA ID ${profile.id} · Unified intelligence profile`}
        actions={
          <>
            <Button variant="secondary" icon={Share2} onClick={() => navigate("/network")}>
              Network View
            </Button>
            <Button variant="secondary" icon={MapPinned} onClick={() => navigate("/geo")}>
              Geo View
            </Button>
            <Button variant="primary" icon={Printer} onClick={() => notifications.success("Report generation queued", profile.name)}>
              Generate Report
            </Button>
          </>
        }
      />

      <div className={styles.topGrid}>
        <IdentityCard profile={profile} />
        <RiskSection profile={profile} />
      </div>

      <div className={styles.tabsWrap}>
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={styles.tabPanel}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === "criminal" && <CriminalIntelligence cases={profile.cases} />}
            {tab === "vehicles" && <VehicleIntelligence vehicles={profile.vehicles} />}
            {tab === "telecom" && <TelecomIntelligence telecom={profile.telecom} />}
            {tab === "financial" && <FinancialIntelligence financial={profile.financial} />}
            {tab === "civil" && <CivilLinkages civilLinkages={profile.civilLinkages} />}
            {tab === "timeline" && <ActivityTimeline timeline={profile.timeline} />}
            {tab === "sources" && <SourceRecords sources={profile.sources} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <Card className={styles.actionBarCard}>
        <div className={styles.actionBar}>
          <Button variant="primary" icon={FileText} onClick={() => notifications.success("Full intelligence report queued", profile.name)}>
            Full Intelligence Report
          </Button>
          <Button variant="gold" icon={FileEdit} onClick={() => notifications.success("IR template auto-filled", profile.name)}>
            Auto-Fill IR Template
          </Button>
          <Button variant="danger" icon={Flag} onClick={() => notifications.warning("Subject flagged for watch list", profile.name)}>
            Flag for Watch List
          </Button>
          <Button variant="green" icon={Share2} onClick={() => navigate(`/network/${profile.id}`)}>
            View Network Graph
          </Button>
          <Button variant="primary" icon={MapPinned} onClick={() => navigate("/geo")}>
            Geo-Fence Target
          </Button>
          <Button variant="gold" icon={FileStack} onClick={() => notifications.success("BC Roll generated", profile.name)}>
            Generate BC Roll
          </Button>
        </div>
      </Card>
    </div>
  );
}
