import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { runtimeConfig } from '@mfe/runtime-config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <strong>Platform Shell</strong>
      <nav><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a><a routerLink="/payments" routerLinkActive="active">Payments</a></nav>
      <span class="env">{{ config.environment }} · {{ config.release.version }}</span>
    </header>
    <main><router-outlet /></main>
  `,
})
export class AppComponent { readonly config = runtimeConfig(); }
