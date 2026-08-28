#!/bin/sh
set -eu
: "${APP_ENVIRONMENT:?APP_ENVIRONMENT is required}"
: "${APP_VERSION:?APP_VERSION is required}"
: "${APP_COMMIT_SHA:?APP_COMMIT_SHA is required}"
: "${API_BASE_URL:?API_BASE_URL is required}"
: "${PAYMENTS_REMOTE_ENTRY:?PAYMENTS_REMOTE_ENTRY is required}"
cat > /usr/share/nginx/html/assets/runtime-config.json <<EOF
{
  "schemaVersion":"1",
  "environment":"${APP_ENVIRONMENT}",
  "release":{"application":"mfe-shell","version":"${APP_VERSION}","commitSha":"${APP_COMMIT_SHA}"},
  "api":{"baseUrl":"${API_BASE_URL}","timeoutMs":10000},
  "observability":{"logLevel":"info"},
  "features":{"payments":true},
  "remotes":[{"name":"payments","remoteEntry":"${PAYMENTS_REMOTE_ENTRY}","exposedModule":"./Routes","route":"payments","enabled":true}]
}
EOF
