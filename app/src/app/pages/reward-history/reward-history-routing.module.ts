import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardHistoryPage } from './reward-history.page';

const routes: Routes = [
  {
    path: '',
    component: RewardHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewardHistoryPageRoutingModule {}
