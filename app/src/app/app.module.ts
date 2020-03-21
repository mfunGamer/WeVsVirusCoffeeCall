import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomePage} from "./pages/home/home.page";
import {SettingsPage} from "./pages/settings/settings.page";
import {RewardHistoryPage} from "./pages/reward-history/reward-history.page";
import {LegalNoticePage} from "./pages/legal-notice/legal-notice.page";
import {DataProtectionPage} from "./pages/data-protection/data-protection.page";
import {CreateAccountPage} from "./pages/create-account/create-account.page";
import {HomePageModule} from "./pages/home/home.module";
import {SettingsPageModule} from "./pages/settings/settings.module";
import {RewardHistoryPageModule} from "./pages/reward-history/reward-history.module";
import {LegalNoticePageModule} from "./pages/legal-notice/legal-notice.module";
import {DataProtectionPageModule} from "./pages/data-protection/data-protection.module";
import {CreateAccountPageModule} from "./pages/create-account/create-account.module";
import {PaymentPage} from "./pages/payment/payment.page";
import {PaymentPageModule} from "./pages/payment/payment.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
      HomePage,
      SettingsPage,
      RewardHistoryPage,
      LegalNoticePage,
      DataProtectionPage,
      CreateAccountPage,
      PaymentPage

  ],

  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HomePageModule,
      SettingsPageModule,
      RewardHistoryPageModule,
      LegalNoticePageModule,
      DataProtectionPageModule,
      CreateAccountPageModule,
      PaymentPageModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
