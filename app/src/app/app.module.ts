import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomePage} from './home/home.page';
import {SettingsPage} from './settings/settings.page';
import {RewardHistoryPage} from './reward-history/reward-history.page';
import {LegalNoticePage} from './legal-notice/legal-notice.page';
import {DataProtectionPage} from './data-protection/data-protection.page';
import {CreateAccountPage} from './create-account/create-account.page';
import {HomePageModule} from './home/home.module';
import {SettingsPageModule} from './settings/settings.module';
import {RewardHistoryPageModule} from './reward-history/reward-history.module';
import {LegalNoticePageModule} from './legal-notice/legal-notice.module';
import {DataProtectionPageModule} from './data-protection/data-protection.module';
import {CreateAccountPageModule} from './create-account/create-account.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
      HomePage,
      SettingsPage,
      RewardHistoryPage,
      LegalNoticePage,
      DataProtectionPage,
      CreateAccountPage

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

      HttpClientModule,
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
