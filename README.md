# Angular MFE Runtime Config Template

Production-oriented reference for squads building Angular micro-frontends with **Native Federation** and **runtime configuration**. It deliberately separates deployment configuration from compiled application code.

## Architecture

```text
browser
  └─ shell
      ├─ GET /assets/runtime-config.json   (no-store; validated before bootstrap)
      ├─ Native Federation manifest built from validated `remotes`
      ├─ platform concerns / navigation / error boundary
      └─ payments remote                  (independently built/deployed)
```

The shell does **not** compile environment-specific URLs. The same immutable artifact can be promoted from DEV → HML → PRD. Deployment injects API and remote URLs at container startup.

## Why this is not a toy example

- Angular 21 LTS baseline with Native Federation; Angular 22 support exists, but this template intentionally uses the mature 21.2 line for a squad baseline.
- Runtime config has a strict, versioned Zod contract and rejects unknown fields.
- Configuration is loaded with `cache: no-store` **before Angular and federation bootstrap**.
- Remote metadata lives in the platform contract, while Native Federation receives only the `{ remoteName: remoteEntry }` manifest it expects.
- Federation shares are explicit. `shareAll` is intentionally avoided.
- Remote failure degrades the feature, not the entire shell.
- Runtime config is explicitly non-secret. Anything delivered to a browser is public to that browser.
- Static assets are immutable-cacheable; runtime config is not cached.
- Container startup fails if mandatory deployment variables are missing.
- CI validates contract tests and production builds.

## Repository layout

```text
projects/
  shared/runtime-config/   versioned config contract, loader and DI token
  shell/                   composition root / dynamic host
  payments/                example squad-owned remote
deploy/
  nginx/                   cache behavior
  shell/                   image + runtime config renderer
  k8s/                     deployment-owned values
```

## Local development

```bash
npm ci
npm run start:all
```

Open `http://localhost:4200`. The shell reads `projects/shell/public/assets/runtime-config.json` and discovers the Payments remote at runtime.

## Production lifecycle

1. Build shell and remote independently.
2. Publish immutable images/artifacts.
3. Promote the **same shell image** between environments.
4. Supply `APP_ENVIRONMENT`, `APP_VERSION`, `APP_COMMIT_SHA`, `API_BASE_URL`, and `PAYMENTS_REMOTE_ENTRY` at deployment time.
5. Container startup renders `/assets/runtime-config.json`.
6. Browser fetches and validates config before initializing federation.

A rollback can therefore repoint `PAYMENTS_REMOTE_ENTRY` to a previously known-good remote without rebuilding the shell, provided the exposed contract remains compatible.

## Runtime config contract

`schemaVersion` is intentionally explicit. Breaking changes require a new schema version instead of silently changing the meaning of existing fields.

Remote entries contain operational metadata (`route`, `enabled`, `exposedModule`) in the platform config. Before Native Federation starts, the shell projects this richer model to the simple manifest required by the federation runtime.

## Guardrails for squads

1. **No secrets** in runtime config, feature flags, HTML, JavaScript bundles or federation manifests.
2. Treat exposed remote modules as public contracts. Prefer coarse-grained page/route boundaries over sharing internal services.
3. Keep Angular/RxJS versions compatible across host/remotes when using strict singletons.
4. Do not use runtime config as a message bus between MFEs.
5. Prefer backwards-compatible remote contracts so shell and remote can roll independently.
6. Pin production dependencies and update through controlled PRs.
7. Validate CSP/connect-src against the actual remote/CDN domains in each environment; the local CSP in this repo is development-only.

## Known limitations

- Native Federation still requires compatibility discipline for shared dependencies; runtime discovery does not solve binary/runtime incompatibility.
- A remote entry can be changed without rebuilding the shell, but changing the expected exposed module or component contract can still break composition.
- Browser runtime config cannot protect confidential values.
- CSP cannot be safely made environment-dynamic with the static development meta tag used here; production should set CSP as an HTTP response header at ingress/CDN/web-server level.

## Suggested next extensions

- publish a reusable `@company/mfe-contracts` package instead of the workspace-local shared path;
- add OpenTelemetry browser instrumentation and a federation-load metric;
- contract-test shell ↔ remote compatibility in CI;
- add signed release metadata / provenance and image SBOM;
- expose a Backstage template that scaffolds a new remote with these guardrails.
