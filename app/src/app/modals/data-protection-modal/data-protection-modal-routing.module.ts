import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataProtectionModalPage } from './data-protection-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DataProtectionModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DataProtectionModalPageRoutingModule {}
