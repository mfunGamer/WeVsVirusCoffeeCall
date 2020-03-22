import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomePage} from './pages/home/home.page';
import {RewardHistoryPage} from './pages/reward-history/reward-history.page';
import {LegalNoticePage} from './pages/legal-notice/legal-notice.page';
import {DataProtectionPage} from './pages/data-protection/data-protection.page';
import {CreateAccountPage} from './pages/create-account/create-account.page';
import {HomePageModule} from './pages/home/home.module';
import {RewardHistoryPageModule} from './pages/reward-history/reward-history.module';
import {LegalNoticePageModule} from './pages/legal-notice/legal-notice.module';
import {DataProtectionPageModule} from './pages/data-protection/data-protection.module';
import {CreateAccountPageModule} from './pages/create-account/create-account.module';
import {HttpClientModule} from '@angular/common/http';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {UserDataService} from './services/UserDataService';
import {IonicStorageModule} from '@ionic/storage';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
      HomePage,
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
      RewardHistoryPageModule,
      LegalNoticePageModule,
      DataProtectionPageModule,
      CreateAccountPageModule,
      IonicStorageModule.forRoot(),
      HttpClientModule,
  ],

  providers: [
      Geolocation,
      StatusBar,
      UserDataService,
      SplashScreen,
      SocialSharing,
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
