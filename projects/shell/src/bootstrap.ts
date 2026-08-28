import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { RUNTIME_CONFIG, type RuntimeConfig } from '@mfe/runtime-config';
import { correlationInterceptor } from './app/platform/correlation.interceptor';

export function bootstrap(config: RuntimeConfig) {
  return bootstrapApplication(AppComponent, {
    providers: [
      { provide: RUNTIME_CONFIG, useValue: config },
      provideRouter(routes),
      provideHttpClient(withInterceptors([correlationInterceptor])),
    ],
  });
}
