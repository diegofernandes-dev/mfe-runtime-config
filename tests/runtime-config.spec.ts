import { describe, expect, it } from 'vitest';
import { runtimeConfigSchema, toFederationManifest } from '../projects/shared/runtime-config';

const valid = {
  schemaVersion:'1', environment:'prd', release:{application:'shell',version:'1.4.0',commitSha:'abcdef123'},
  api:{baseUrl:'https://api.example.com',timeoutMs:10000}, observability:{logLevel:'info'}, features:{payments:true},
  remotes:[{name:'payments',remoteEntry:'https://payments.example.com/remoteEntry.json',exposedModule:'./Routes',route:'payments',enabled:true}]
};

describe('runtime config contract', () => {
  it('accepts a production config', () => expect(runtimeConfigSchema.safeParse(valid).success).toBe(true));
  it('rejects unknown top-level fields', () => expect(runtimeConfigSchema.safeParse({...valid, secret:'do-not-do-this'}).success).toBe(false));
  it('rejects relative remote URLs', () => expect(runtimeConfigSchema.safeParse({...valid, remotes:[{...valid.remotes[0],remoteEntry:'/remoteEntry.json'}]}).success).toBe(false));
  it('excludes disabled remotes from federation manifest', () => expect(toFederationManifest({...valid, remotes:[{...valid.remotes[0],enabled:false}]} as never)).toEqual({}));
});
