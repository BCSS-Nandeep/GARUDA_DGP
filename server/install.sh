#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

sudo mkdir -p /var/lib/garuda /opt/garuda-links
sudo cp "$ROOT/server/links_api.py" /opt/garuda-links/links_api.py
if [ ! -f /var/lib/garuda/links.json ]; then
  sudo cp "$ROOT/server/links.json" /var/lib/garuda/links.json
fi
sudo chown -R ec2-user:ec2-user /var/lib/garuda /opt/garuda-links
sudo cp "$ROOT/server/garuda-links.service" /etc/systemd/system/garuda-links.service
sudo systemctl daemon-reload
sudo systemctl enable garuda-links
sudo systemctl restart garuda-links

sudo python3 -c 'from pathlib import Path
p = Path("/etc/nginx/nginx.conf")
text = p.read_text()
needle = "        location /assets/ {"
snippet = "        location /api/ {\n            proxy_pass http://127.0.0.1:8787;\n            proxy_set_header Host $host;\n        }\n\n"
if "location /api/" not in text:
    if needle not in text:
        raise SystemExit("assets location missing")
    p.write_text(text.replace(needle, snippet + needle, 1))
    print("nginx patched")
else:
    print("nginx already proxies /api/")
'

sudo nginx -t
sudo systemctl reload nginx
curl -fsS http://127.0.0.1:8787/api/links
echo
echo LINKS_OK
