#!/usr/bin/env python3
"""Shared sidebar-link store. Listens on localhost and reads one JSON file."""

import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

FILE = os.environ.get("LINKS_FILE", "/var/lib/garuda/links.json")
HOST = "127.0.0.1"
PORT = int(os.environ.get("LINKS_PORT", "8787"))
MAX_LINKS = 100


def load():
    if not os.path.exists(FILE):
        return []
    with open(FILE, "r", encoding="utf-8") as handle:
        data = json.load(handle)
    links = data.get("links", []) if isinstance(data, dict) else data
    return links if isinstance(links, list) else []


def save(links):
    os.makedirs(os.path.dirname(FILE), exist_ok=True)
    temporary = FILE + ".tmp"
    with open(temporary, "w", encoding="utf-8") as handle:
        json.dump({"links": links}, handle, indent=2)
        handle.write("\n")
    os.replace(temporary, FILE)


def valid_link(item):
    if not isinstance(item, dict):
        return None
    link_id = str(item.get("id", "")).strip()
    name = str(item.get("name", "")).strip()
    url = str(item.get("url", "")).strip()
    if not link_id or len(link_id) > 80 or not name or len(name) > 80:
        return None
    if not (url.startswith("http://") or url.startswith("https://")) or len(url) > 2000:
        return None
    return {"id": link_id, "name": name, "url": url}


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload):
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if urlparse(self.path).path != "/api/links":
            self._send(404, {"error": "not found"})
            return
        self._send(200, {"links": load()})

    def do_PUT(self):
        if urlparse(self.path).path != "/api/links":
            self._send(404, {"error": "not found"})
            return
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length > 200000:
            self._send(413, {"error": "too large"})
            return
        try:
            data = json.loads(self.rfile.read(length).decode() or "{}")
        except (UnicodeDecodeError, json.JSONDecodeError):
            self._send(400, {"error": "invalid json"})
            return
        raw = data.get("links") if isinstance(data, dict) else None
        if not isinstance(raw, list) or len(raw) > MAX_LINKS:
            self._send(400, {"error": "invalid links"})
            return
        cleaned = []
        for item in raw:
            link = valid_link(item)
            if not link:
                self._send(400, {"error": "invalid link"})
                return
            cleaned.append(link)
        save(cleaned)
        self._send(200, {"links": cleaned})

    def log_message(self, fmt, *args):
        return


if __name__ == "__main__":
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
