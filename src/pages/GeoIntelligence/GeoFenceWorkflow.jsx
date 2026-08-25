import { MapPin, X, ArrowLeft, ArrowRight, Crosshair } from "lucide-react";
import styles from "./GeoIntelligence.module.css";
import { Button } from "../../components/ui/Button";
import { DatePicker } from "../../components/ui/DatePicker";
import { geoPoints } from "../../data/geoData";

const STEPS = ["Select Entity", "Draw Geo-Fence", "Set Radius", "Set Expiry", "Set Purpose", "Review"];
const ENTITY_OPTIONS = geoPoints.subjects.map((s) => ({ id: s.id, label: s.label }));

export function GeoFenceWorkflow({ draft, onDraftChange, step, onStepChange, pickMode, onRequestPickMode, onClose, onCreate, creating }) {
  const canNext =
    (step === 0 && draft.entityId) ||
    (step === 1 && draft.center) ||
    step === 2 ||
    (step === 3 && draft.expiry) ||
    (step === 4 && draft.purpose.trim());

  function next() {
    if (step < STEPS.length - 1) onStepChange(step + 1);
  }
  function back() {
    if (step > 0) onStepChange(step - 1);
  }

  return (
    <div className={styles.workflowPanel}>
      <div className={styles.workflowHeader}>
        <span className={styles.workflowTitle}>
          <MapPin size={14} strokeWidth={2} /> New Geo-Fence
        </span>
        <button className={styles.workflowClose} onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className={styles.stepDots}>
        {STEPS.map((s, i) => (
          <span key={s} className={[styles.stepDot, i === step ? styles.stepDotActive : "", i < step ? styles.stepDotDone : ""].join(" ")} />
        ))}
      </div>
      <div className={styles.stepLabel}>
        Step {step + 1} of {STEPS.length} — {STEPS[step]}
      </div>

      <div className={styles.stepBody}>
        {step === 0 && (
          <div className={styles.entityList}>
            {ENTITY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                className={[styles.entityOption, draft.entityId === opt.id ? styles.entityOptionActive : ""].join(" ")}
                onClick={() => onDraftChange({ ...draft, entityId: opt.id })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <p className={styles.stepHint}>Click anywhere on the map to place the geo-fence center.</p>
            <Button
              variant={pickMode ? "primary" : "outline"}
              size="sm"
              icon={Crosshair}
              onClick={() => onRequestPickMode(true)}
              fullWidth
            >
              {pickMode ? "Click the map now..." : "Start placing point"}
            </Button>
            {draft.center && (
              <div className={styles.coordChip}>
                {draft.center[0].toFixed(4)}, {draft.center[1].toFixed(4)}
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <div className={styles.radiusRow}>
              <span>Radius</span>
              <span className={styles.radiusValue}>{draft.radius}m</span>
            </div>
            <input
              type="range"
              min={100}
              max={3000}
              step={50}
              value={draft.radius}
              onChange={(e) => onDraftChange({ ...draft, radius: Number(e.target.value) })}
              className={styles.radiusSlider}
            />
          </div>
        )}

        {step === 3 && <DatePicker label="Expires on" value={draft.expiry} onChange={(v) => onDraftChange({ ...draft, expiry: v })} />}

        {step === 4 && (
          <textarea
            className={styles.purposeInput}
            rows={4}
            placeholder="State the investigative purpose for this geo-fence..."
            value={draft.purpose}
            onChange={(e) => onDraftChange({ ...draft, purpose: e.target.value })}
          />
        )}

        {step === 5 && (
          <div className={styles.reviewList}>
            <div className={styles.reviewRow}>
              <span>Entity</span>
              <span>{ENTITY_OPTIONS.find((o) => o.id === draft.entityId)?.label}</span>
            </div>
            <div className={styles.reviewRow}>
              <span>Center</span>
              <span>{draft.center?.map((c) => c.toFixed(4)).join(", ")}</span>
            </div>
            <div className={styles.reviewRow}>
              <span>Radius</span>
              <span>{draft.radius}m</span>
            </div>
            <div className={styles.reviewRow}>
              <span>Expires</span>
              <span>{draft.expiry || "—"}</span>
            </div>
            <div className={styles.reviewRow}>
              <span>Purpose</span>
              <span>{draft.purpose || "—"}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.workflowFooter}>
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={back} disabled={step === 0}>
          Back
        </Button>
        {step < STEPS.length - 1 ? (
          <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right" onClick={next} disabled={!canNext}>
            Next
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onCreate} loading={creating}>
            Create Geo-Fence
          </Button>
        )}
      </div>
    </div>
  );
}
