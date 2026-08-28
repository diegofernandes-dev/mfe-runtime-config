import { Component } from '@angular/core';
import { PaymentsPageComponent } from './payments-page.component';
@Component({ selector:'payments-root', standalone:true, imports:[PaymentsPageComponent], template:`<payments-page />` })
export class AppComponent {}
