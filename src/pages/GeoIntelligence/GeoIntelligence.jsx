import { useEffect, useState } from "react";
import { MapPinned, Plus } from "lucide-react";
import styles from "./GeoIntelligence.module.css";
import { PageHeader } from "../../components/ui/PageHeader";
import { Button } from "../../components/ui/Button";
import { Skeleton } from "../../components/ui/Skeleton";
import { MapView } from "./MapView";
import { LayerControls } from "./LayerControls";
import { GeoEventPanel } from "./GeoEventPanel";
import { GeoFenceWorkflow } from "./GeoFenceWorkflow";
import { ActiveGeoFences } from "./ActiveGeoFences";
import { MovementTrail } from "./MovementTrail";
import { PermissionGate } from "../../components/ui/PermissionGate";
import { useNotifications } from "../../context/NotificationContext";
import { geoLayers, geoPoints as staticPoints, geoEvents as staticEvents } from "../../data/geoData";
import { getGeoEvents, getGeoPoints, createGeofence } from "../../services/geoService";

const DEFAULT_DRAFT = { entityId: null, center: null, radius: 500, expiry: "", purpose: "" };

export function GeoIntelligence() {
  const [points, setPoints] = useState(null);
  const [events, setEvents] = useState(null);
  const [activeLayers, setActiveLayers] = useState(geoLayers.map((l) => l.key));
  const [fences, setFences] = useState(staticPoints.geoFences);

  const [workflowOpen, setWorkflowOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [pickMode, setPickMode] = useState(false);
  const [creating, setCreating] = useState(false);

  const notifications = useNotifications();

  useEffect(() => {
    getGeoPoints().then(setPoints);
    getGeoEvents().then(setEvents);
  }, []);

  function toggleLayer(key) {
    setActiveLayers((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function openWorkflow() {
    setDraft(DEFAULT_DRAFT);
    setStep(0);
    setWorkflowOpen(true);
  }

  function closeWorkflow() {
    setWorkflowOpen(false);
    setPickMode(false);
  }

  function handlePick(point) {
    setDraft((prev) => ({ ...prev, center: point }));
    setPickMode(false);
    setStep(2);
  }

  async function handleCreate() {
    setCreating(true);
    const created = await createGeofence({
      label: `Custom Fence — ${draft.entityId}`,
      position: draft.center,
      radius: draft.radius,
      expiry: draft.expiry,
    });
    setFences((prev) => [...prev, created]);
    setCreating(false);
    closeWorkflow();
    notifications.success("Geo-fence created", `${created.label} · radius ${created.radius}m`);
  }

  return (
    <div className={styles.page}>
      <PageHeader
        icon={MapPinned}
        title="Geo Intelligence"
        description="Live subject locations, CDR trails, vehicle sightings, and geo-fenced surveillance zones."
        actions={
          <PermissionGate permission="geo.geofence.create">
            <Button variant="primary" icon={Plus} onClick={openWorkflow}>
              New Geo-Fence
            </Button>
          </PermissionGate>
        }
      />

      <div className={styles.geoGrid}>
        <div className={styles.geoMainCol}>
          {!points ? (
            <Skeleton height={600} radius={12} />
          ) : (
            <div className={styles.mapStage}>
              <MapView
                points={points}
                activeLayers={activeLayers}
                pickMode={pickMode}
                onPick={handlePick}
                previewFence={step === 1 || step === 2 || step >= 2 ? { center: draft.center, radius: draft.radius } : null}
                existingFences={fences}
              />
              <LayerControls activeLayers={activeLayers} onToggle={toggleLayer} />
              {workflowOpen && (
                <GeoFenceWorkflow
                  draft={draft}
                  onDraftChange={setDraft}
                  step={step}
                  onStepChange={setStep}
                  pickMode={pickMode}
                  onRequestPickMode={setPickMode}
                  onClose={closeWorkflow}
                  onCreate={handleCreate}
                  creating={creating}
                />
              )}
            </div>
          )}
        </div>
        <div className={styles.geoSideCol}>
          <ActiveGeoFences />
          <MovementTrail />
        </div>
      </div>

      <div className={styles.eventsSection}>
        <h2 className={styles.eventsTitle}>Recent Geo Events</h2>
        <GeoEventPanel
          events={events || staticEvents}
          onViewSubject={(e) => notifications.info("Opening subject profile", e.subject)}
          onViewLocation={(e) => notifications.info("Centering map on location", e.location)}
        />
      </div>
    </div>
  );
}
