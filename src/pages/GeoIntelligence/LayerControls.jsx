import { Layers } from "lucide-react";
import styles from "./GeoIntelligence.module.css";
import { geoLayers } from "../../data/geoData";

export function LayerControls({ activeLayers, onToggle }) {
  return (
    <div className={styles.layerPanel}>
      <div className={styles.layerHeader}>
        <Layers size={14} strokeWidth={2} />
        Layers
      </div>
      {geoLayers.map((layer) => (
        <label key={layer.key} className={styles.layerRow}>
          <input type="checkbox" checked={activeLayers.includes(layer.key)} onChange={() => onToggle(layer.key)} />
          <span className={styles.layerDot} style={{ background: layer.color }} />
          <span className={styles.layerLabel}>{layer.label}</span>
        </label>
      ))}
    </div>
  );
}
