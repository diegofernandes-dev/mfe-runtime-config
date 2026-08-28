import { runtimeConfigSchema, type RuntimeConfig } from './runtime-config.schema';

export class RuntimeConfigError extends Error {
  constructor(message: string, readonly cause?: unknown) { super(message); this.name = 'RuntimeConfigError'; }
}

export async function loadRuntimeConfig(url = '/assets/runtime-config.json'): Promise<RuntimeConfig> {
  let response: Response;
  try {
    response = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
  } catch (cause) {
    throw new RuntimeConfigError(`Runtime config request failed: ${url}`, cause);
  }
  if (!response.ok) throw new RuntimeConfigError(`Runtime config returned HTTP ${response.status}: ${url}`);
  const payload: unknown = await response.json();
  const parsed = runtimeConfigSchema.safeParse(payload);
  if (!parsed.success) throw new RuntimeConfigError(`Invalid runtime config: ${zodIssues(parsed.error.issues)}`, parsed.error);
  return Object.freeze(parsed.data);
}

function zodIssues(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>): string {
  return issues.map((i) => `${i.path.join('.') || '<root>'}: ${i.message}`).join('; ');
}

export function toFederationManifest(config: RuntimeConfig): Record<string, string> {
  return Object.fromEntries(config.remotes.filter((r) => r.enabled).map((r) => [r.name, r.remoteEntry]));
}
