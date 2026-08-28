import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';
import { HomeComponent } from './home.component';
import { RemoteUnavailableComponent } from './remote-unavailable.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  {
    path: 'payments',
    loadComponent: () => loadRemoteModule('payments', './Routes').then((m) => m.PaymentsPageComponent).catch((error) => {
      console.error('[federation] payments failed to load', error);
      return RemoteUnavailableComponent;
    }),
  },
  { path: '**', redirectTo: '' },
];
