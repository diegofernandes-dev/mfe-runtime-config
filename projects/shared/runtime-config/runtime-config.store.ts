import { InjectionToken, inject } from '@angular/core';
import type { RuntimeConfig } from './runtime-config.schema';

export const RUNTIME_CONFIG = new InjectionToken<RuntimeConfig>('RUNTIME_CONFIG');
export const runtimeConfig = () => inject(RUNTIME_CONFIG);
