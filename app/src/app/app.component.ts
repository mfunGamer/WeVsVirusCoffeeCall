import { Component} from '@angular/core';
import { NavController , Platform } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {HomePage} from "./home/home.page";
import {SettingsPage} from "./settings/settings.page";
import {LegalNoticePage} from "./legal-notice/legal-notice.page";
import {DataProtectionPage} from "./data-protection/data-protection.page";
import {CreateAccountPage} from "./create-account/create-account.page";
import {RewardHistoryPage} from "./reward-history/reward-history.page";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {


  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public navCtrl: NavController
  ) {
    this.initializeApp();

    this.pages = [

        { title: 'Home', component: HomePage },
        { title: 'Create Account', component: CreateAccountPage},
        { title: 'Fotos', component: RewardHistoryPage},
        { title: 'Datenschutz', component: DataProtectionPage},
        { title: 'Impressum', component: LegalNoticePage},
        { title: 'Settings', component: SettingsPage},

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page){
      console.log(page.component.name + " pushed");
      //this.navCtrl.push(page.component);

  }


}
