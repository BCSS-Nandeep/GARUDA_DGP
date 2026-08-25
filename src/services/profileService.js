import { mockDelay } from "./api";
import { getProfileById } from "../data/profileData";

export async function getProfile(id) {
  const profile = getProfileById(id);
  if (!profile) return mockDelay(null, 300);
  return mockDelay(profile, 550);
}
