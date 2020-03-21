import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardHistoryPageRoutingModule } from './reward-history-routing.module';

import { RewardHistoryPage } from './reward-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardHistoryPageRoutingModule
  ],
  declarations: [RewardHistoryPage]
})
export class RewardHistoryPageModule {}
