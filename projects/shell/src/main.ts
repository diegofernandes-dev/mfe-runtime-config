import { initFederation } from '@angular-architects/native-federation';
import { loadRuntimeConfig, toFederationManifest } from '@mfe/runtime-config';

async function main(): Promise<void> {
  try {
    const config = await loadRuntimeConfig();
    await initFederation(toFederationManifest(config));
    const { bootstrap } = await import('./bootstrap');
    await bootstrap(config);
  } catch (error) {
    console.error('[bootstrap] Shell failed to start', error);
    renderFatalStartupError();
  }
}

function renderFatalStartupError(): void {
  const host = document.querySelector('app-root');
  if (host) host.innerHTML = '<main class="fatal"><h1>Application unavailable</h1><p>Startup configuration could not be loaded. Contact support with the browser timestamp.</p></main>';
}

void main();
