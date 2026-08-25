import { API_BASE_URL } from "../utils/constants";

/**
 * Thin fetch wrapper. Not yet wired to a live backend — services currently
 * resolve mock data instead of calling `request()`. Once a backend exists,
 * individual service functions can switch to `request(...)` without any
 * change to the components that consume them.
 */
export async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const error = new Error(`Request failed: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

/** Simulates network latency for mock services so loading states are exercised. */
export function mockDelay(data, ms = 500) {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
