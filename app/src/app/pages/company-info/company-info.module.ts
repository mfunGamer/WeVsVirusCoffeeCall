import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyInfoPageRoutingModule } from './company-info-routing.module';

import { CompanyInfoPage } from './company-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyInfoPageRoutingModule
  ],
  declarations: [CompanyInfoPage]
})
export class CompanyInfoPageModule {}
