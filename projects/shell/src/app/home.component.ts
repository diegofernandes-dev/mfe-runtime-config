import { Component } from '@angular/core';
import { runtimeConfig } from '@mfe/runtime-config';

@Component({ selector: 'app-home', standalone: true, template: `<section class="card"><h1>Runtime-configured MFE platform</h1><p>Same shell image can be promoted through environments without rebuilding.</p><dl><dt>API</dt><dd>{{ config.api.baseUrl }}</dd><dt>Commit</dt><dd>{{ config.release.commitSha }}</dd></dl></section>` })
export class HomeComponent { readonly config = runtimeConfig(); }
