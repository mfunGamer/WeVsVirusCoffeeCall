import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DataProtectionModalPageRoutingModule } from './data-protection-modal-routing.module';

import { DataProtectionModalPage } from './data-protection-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DataProtectionModalPageRoutingModule
  ],
  declarations: [DataProtectionModalPage]
})
export class DataProtectionModalPageModule {}
