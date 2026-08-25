import { mockDelay } from "./api";
import { geoLayers, geoPoints, geoEvents, mapCenter } from "../data/geoData";

export async function getGeoLayers() {
  return mockDelay(geoLayers, 300);
}

export async function getGeoPoints() {
  return mockDelay(geoPoints, 500);
}

export async function getGeoEvents() {
  return mockDelay(geoEvents, 350);
}

export async function getMapCenter() {
  return mockDelay(mapCenter, 100);
}

let geofenceSeq = 100;
export async function createGeofence(payload) {
  geofenceSeq += 1;
  return mockDelay({ id: `GF-${geofenceSeq}`, ...payload, createdAt: Date.now() }, 500);
}
