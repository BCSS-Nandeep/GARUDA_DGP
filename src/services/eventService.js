import { WS_URL } from "../utils/constants";

/**
 * Real-time event abstraction. No live WebSocket/SSE backend exists yet, so
 * `subscribe` currently no-ops (or can be pointed at a local interval by
 * callers for demo purposes). Once WS_URL is live, this is the only file
 * that needs to change — consumers only ever see subscribe/unsubscribe.
 */
class EventService {
  constructor() {
    this.listeners = new Map();
    this.socket = null;
  }

  connect() {
    if (!WS_URL || this.socket) return;
    this.socket = new WebSocket(WS_URL);
    this.socket.onmessage = (msg) => {
      try {
        const { channel, payload } = JSON.parse(msg.data);
        this.emit(channel, payload);
      } catch {
        // ignore malformed frames
      }
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  subscribe(channel, handler) {
    if (!this.listeners.has(channel)) this.listeners.set(channel, new Set());
    this.listeners.get(channel).add(handler);
    return () => this.listeners.get(channel)?.delete(handler);
  }

  emit(channel, payload) {
    this.listeners.get(channel)?.forEach((handler) => handler(payload));
  }
}

export const eventService = new EventService();
