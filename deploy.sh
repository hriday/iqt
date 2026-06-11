#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
HOST=root@143.110.208.106 # iqt.moosha.org

npm test
npm run build

ssh "$HOST" 'mkdir -p /opt/iqt'
rsync -az --delete dist/ "$HOST":/opt/iqt/dist/
rsync -az Dockerfile docker-compose.yml "$HOST":/opt/iqt/
ssh "$HOST" 'cd /opt/iqt && docker compose up -d --build'

# one-time Caddy vhost
ssh "$HOST" 'grep -q "iqt.moosha.org" /etc/caddy/Caddyfile || {
  cat >> /etc/caddy/Caddyfile <<'"'"'EOF'"'"'

iqt.moosha.org {
	reverse_proxy localhost:8015
	encode gzip zstd
	header {
		X-Content-Type-Options nosniff
		X-Frame-Options DENY
		Referrer-Policy strict-origin-when-cross-origin
		Strict-Transport-Security "max-age=31536000"
		-Server
	}
	@static path /assets/*
	header @static Cache-Control "public, max-age=604800, immutable"
}
EOF
  systemctl reload caddy
}'
echo "✅ https://iqt.moosha.org"
