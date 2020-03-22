import { Component} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import { UserDataService} from "./services/UserDataService";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {

    navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController,
    public udService: UserDataService
  ) {

      this.sideMenu();
      this.initializeApp();

  }

  sideMenu() {
      this.navigate =
          [
              {
                  title : 'Home',
                  url   : 'home',
                  icon  : 'home-outline'
              },
              {
                  title : 'Create Account',
                  url   : 'create-account',
                  icon  : 'key-outline'
              },
              {
                  title : "RewardHistory",
                  url   : "reward-history",
                  icon  : "trophy-outline"
              },
              {
                  title : "LegalNotice",
                  url   : "legal-notice",
                  icon  : "alert-circle-outline"
              },
              {
                  title : "DataProtection",
                  url   : "data-protection",
                  icon  : "shield-checkmark-outline"
              },
          ];
  }


  initializeApp() {
    this.platform.ready().then(() => {


        this.udService.getUserName().then((val)=>{
            if(val == null || val.length == 0){
               this.router.navigateByUrl('/create-account');
            } else {
               this.router.navigateByUrl('/');
        }
        });



      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isOnHomePage(): boolean {
      const parts = this.router.url.split('/');
      return parts[parts.length - 1] === 'home';
  }

  onHomeButton() {
      this.menu.close();
  }

}
