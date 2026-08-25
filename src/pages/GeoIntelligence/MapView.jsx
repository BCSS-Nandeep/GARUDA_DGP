import { useEffect } from "react";
import { Circle, CircleMarker, MapContainer, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./GeoIntelligence.module.css";
import { geoLayers, mapCenter } from "../../data/geoData";

function ClickCapture({ onPick }) {
  useMapEvents({
    click(e) {
      onPick?.([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function RecenterOnPick({ point }) {
  const map = useMap();
  useEffect(() => {
    if (point) map.panTo(point);
  }, [point, map]);
  return null;
}

export function MapView({ points, activeLayers, pickMode, onPick, previewFence, existingFences }) {
  const layerColor = Object.fromEntries(geoLayers.map((l) => [l.key, l.color]));

  return (
    <div className={[styles.mapWrap, pickMode ? styles.pickMode : ""].join(" ")}>
      <MapContainer center={mapCenter} zoom={13} className={styles.map} zoomControl={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {activeLayers.includes("geoFences") &&
          existingFences.map((f) => (
            <Circle
              key={f.id}
              center={f.position}
              radius={f.radius}
              pathOptions={{ color: "#34d399", fillColor: "#34d399", fillOpacity: 0.08, weight: 1.5 }}
            >
              <Popup>
                <strong>{f.label}</strong>
                <br />
                Expires {f.expiry}
              </Popup>
            </Circle>
          ))}

        {Object.entries(points).map(([layerKey, layerPoints]) =>
          activeLayers.includes(layerKey)
            ? layerPoints.map((p) => (
                <CircleMarker
                  key={p.id}
                  center={p.position}
                  radius={7}
                  pathOptions={{ color: layerColor[layerKey], fillColor: layerColor[layerKey], fillOpacity: 0.85, weight: 2 }}
                >
                  <Popup>
                    <strong>{p.label}</strong>
                    {p.detail && (
                      <>
                        <br />
                        {p.detail}
                      </>
                    )}
                  </Popup>
                </CircleMarker>
              ))
            : null
        )}

        {previewFence?.center && (
          <Circle
            center={previewFence.center}
            radius={previewFence.radius}
            pathOptions={{ color: "#22d3ee", fillColor: "#22d3ee", fillOpacity: 0.12, dashArray: "6 6" }}
          />
        )}

        {pickMode && <ClickCapture onPick={onPick} />}
        {previewFence?.center && <RecenterOnPick point={previewFence.center} />}
      </MapContainer>
    </div>
  );
}
