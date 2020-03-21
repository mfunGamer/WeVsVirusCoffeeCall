import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';
import {PayPal} from '@ionic-native/paypal/ngx';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PayPal]
})
export class PaymentPageRoutingModule {}
