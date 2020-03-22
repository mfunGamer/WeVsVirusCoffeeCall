import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyInfoPage } from './company-info.page';
import {PayPal} from "@ionic-native/paypal/ngx";

const routes: Routes = [
  {
    path: '',
    component: CompanyInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
    providers: [PayPal]
})
export class CompanyInfoPageRoutingModule {}
