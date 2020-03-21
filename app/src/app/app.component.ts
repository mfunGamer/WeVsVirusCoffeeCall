import { Component} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']

})
export class AppComponent {

    navigate : any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
  ) {

      this.sideMenu();
      this.initializeApp();

  }

  sideMenu(){
      this.navigate =
          [
              {
                  title : "Home",
                  url   : "home",
                  icon  : "home-outline"
              },
              {
                  title : "Create Account",
                  url   : "create-account",
                  icon  : "key-outline"
              },
              {
                  title : "Settings",
                  url   : "settings",
                  icon  : "settings-outline"
              },
          ]
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isOnHomePage(): boolean {
      const parts = this.router.url.split('/');
      return parts[parts.length - 1] === 'home';
  }

  onHomeButton(){
      this.menu.close();
  }

}
