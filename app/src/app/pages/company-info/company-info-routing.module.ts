import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyInfoPage } from './company-info.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyInfoPageRoutingModule {}
