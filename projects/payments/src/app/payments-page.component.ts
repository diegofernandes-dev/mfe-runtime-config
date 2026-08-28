import { Component } from '@angular/core';

@Component({
  selector: 'payments-page',
  standalone: true,
  template: `<section class="payments"><div><span class="eyebrow">REMOTE · PAYMENTS SQUAD</span><h1>Payments</h1><p>This component was built and deployed independently from the shell.</p></div><div class="summary"><strong>R$ 18.420,50</strong><span>processed today</span></div></section>`,
  styles: [`.payments{display:flex;justify-content:space-between;gap:32px;padding:28px;background:white;border:1px solid #e4e7ec;border-radius:14px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.12em;color:#475467}.summary{display:flex;flex-direction:column;align-items:flex-end}.summary strong{font-size:28px}`]
})
export class PaymentsPageComponent {}
