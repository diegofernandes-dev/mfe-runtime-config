import { z } from 'zod';

const absoluteHttpUrl = z.string().url().refine((value) => value.startsWith('http://') || value.startsWith('https://'), 'Expected an absolute HTTP(S) URL');

export const remoteSchema = z.object({
  name: z.string().min(1),
  remoteEntry: absoluteHttpUrl,
  exposedModule: z.string().startsWith('./'),
  route: z.string().regex(/^[a-z0-9-]+$/),
  enabled: z.boolean(),
});

export const runtimeConfigSchema = z.object({
  schemaVersion: z.literal('1'),
  environment: z.enum(['local', 'dev', 'hml', 'prd']),
  release: z.object({ application: z.string().min(1), version: z.string().min(1), commitSha: z.string().min(7) }),
  api: z.object({ baseUrl: absoluteHttpUrl, timeoutMs: z.number().int().positive().max(60000) }),
  observability: z.object({ otelEndpoint: absoluteHttpUrl.optional(), logLevel: z.enum(['debug', 'info', 'warn', 'error']) }),
  features: z.record(z.string(), z.boolean()),
  remotes: z.array(remoteSchema).min(1),
}).strict();

export type RuntimeConfig = z.infer<typeof runtimeConfigSchema>;
export type RemoteConfig = z.infer<typeof remoteSchema>;
